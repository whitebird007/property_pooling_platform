import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { authRouter } from "./authRouter";
import { z } from "zod";

// Helper for date coercion
const dateSchema = z.coerce.date();
import { TRPCError } from "@trpc/server";
import * as db from "./db";

// Admin procedure middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

// Sales procedure middleware
const salesProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin' && ctx.user.role !== 'sales') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Sales or admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: authRouter,

  // ==================== PROPERTIES ====================
  properties: router({
    list: publicProcedure
      .input(z.object({ status: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return db.getAllProperties(input?.status);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const property = await db.getPropertyById(input.id);
        if (!property) throw new TRPCError({ code: 'NOT_FOUND' });
        
        const documents = await db.getPropertyDocuments(input.id);
        const spv = await db.getPropertySpv(input.id);
        const dueDiligence = await db.getPropertyDueDiligence(input.id);
        
        return { property, documents, spv, dueDiligence };
      }),
    
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        titleUrdu: z.string().optional(),
        description: z.string().optional(),
        descriptionUrdu: z.string().optional(),
        propertyType: z.enum(['residential', 'commercial', 'mixed_use', 'vacation_rental']),
        address: z.string(),
        city: z.string(),
        area: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        totalValue: z.string(),
        totalShares: z.number(),
        sharePrice: z.string(),
        availableShares: z.number(),
        minInvestment: z.string(),
        expectedRentalYield: z.string().optional(),
        expectedAppreciation: z.string().optional(),
        holdingPeriod: z.number().optional(),
        images: z.array(z.string()).optional(),
        virtualTourUrl: z.string().optional(),
        sizeSqFt: z.number().optional(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        rentalType: z.enum(['long_term', 'short_term', 'mixed']).optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createProperty(input as any);
        return { id };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.record(z.string(), z.any()),
      }))
      .mutation(async ({ input }) => {
        await db.updateProperty(input.id, input.data);
        return { success: true };
      }),
    
    getOrders: publicProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyOrders(input.propertyId);
      }),
    
    getTrades: publicProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyTrades(input.propertyId);
      }),
    
    getVotes: protectedProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyVotes(input.propertyId);
      }),
    
    getDividends: protectedProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyDividends(input.propertyId);
      }),
  }),

  // ==================== INVESTMENTS ====================
  investments: router({
    myInvestments: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserInvestments(ctx.user.id);
    }),
    
    getPropertyInvestors: adminProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyInvestors(input.propertyId);
      }),
    
    invest: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        shares: z.number(),
        totalAmount: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Check KYC status
        const profile = await db.getOrCreateInvestorProfile(ctx.user.id);
        if (profile?.kycStatus !== 'verified') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'KYC verification required' });
        }
        
        // Check property availability
        const property = await db.getPropertyById(input.propertyId);
        if (!property) throw new TRPCError({ code: 'NOT_FOUND' });
        if (property.availableShares < input.shares) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Not enough shares available' });
        }
        
        // Create investment
        const investmentId = await db.createInvestment({
          userId: ctx.user.id,
          propertyId: input.propertyId,
          sharesOwned: input.shares,
          totalInvested: input.totalAmount,
          averageBuyPrice: property.sharePrice,
          currentValue: input.totalAmount,
          status: 'active',
        });
        
        // Create transaction record
        await db.createTransaction({
          userId: ctx.user.id,
          propertyId: input.propertyId,
          transactionType: 'share_purchase',
          amount: input.totalAmount,
          shares: input.shares,
          pricePerShare: property.sharePrice,
          status: 'completed',
        });
        
        // Update property available shares
        await db.updateProperty(input.propertyId, {
          availableShares: property.availableShares - input.shares,
        });
        
        return { investmentId };
      }),
  }),

  // ==================== TRANSACTIONS ====================
  transactions: router({
    myTransactions: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserTransactions(ctx.user.id);
    }),
    
    deposit: protectedProcedure
      .input(z.object({
        amount: z.string(),
        paymentMethod: z.string(),
        referenceNumber: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const transactionId = await db.createTransaction({
          userId: ctx.user.id,
          transactionType: 'deposit',
          amount: input.amount,
          status: 'pending',
          paymentMethod: input.paymentMethod,
          referenceNumber: input.referenceNumber,
        });
        return { transactionId };
      }),
    
    withdraw: protectedProcedure
      .input(z.object({
        amount: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const profile = await db.getOrCreateInvestorProfile(ctx.user.id);
        if (!profile || parseFloat(profile.walletBalance) < parseFloat(input.amount)) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Insufficient balance' });
        }
        
        const transactionId = await db.createTransaction({
          userId: ctx.user.id,
          transactionType: 'withdrawal',
          amount: input.amount,
          status: 'pending',
        });
        return { transactionId };
      }),
  }),

  // ==================== MARKET ORDERS ====================
  market: router({
    // Get user's own orders
    myOrders: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserOrders(ctx.user.id);
    }),
    
    // Get user's trade history
    myTrades: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserTrades(ctx.user.id);
    }),
    
    // Get order book for a property
    orderBook: publicProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getOrderBook(input.propertyId);
      }),
    
    // Get recent trades for a property
    propertyTrades: publicProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyTrades(input.propertyId);
      }),
    
    // Get marketplace stats
    stats: publicProcedure.query(async () => {
      return db.getMarketStats();
    }),
    
    // Place a buy or sell order
    placeOrder: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        orderType: z.enum(['buy', 'sell']),
        shares: z.number(),
        pricePerShare: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Verify KYC
        const profile = await db.getOrCreateInvestorProfile(ctx.user.id);
        if (profile?.kycStatus !== 'verified') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'KYC verification required' });
        }
        
        // For buy orders, verify wallet balance
        if (input.orderType === 'buy') {
          const totalCost = parseFloat(input.pricePerShare) * input.shares;
          if (!profile || parseFloat(profile.walletBalance) < totalCost) {
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Insufficient wallet balance' });
          }
        }
        
        // For sell orders, verify ownership
        if (input.orderType === 'sell') {
          const investments = await db.getUserInvestments(ctx.user.id);
          const propertyInvestment = investments.find(i => i.propertyId === input.propertyId);
          if (!propertyInvestment || propertyInvestment.sharesOwned < input.shares) {
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Insufficient shares to sell' });
          }
        }
        
        // Create the order
        const orderId = await db.createMarketOrder({
          userId: ctx.user.id,
          propertyId: input.propertyId,
          orderType: input.orderType,
          shares: input.shares,
          pricePerShare: input.pricePerShare,
          status: 'open',
        });
        
        // Try to match the order immediately
        const matchingOrders = await db.getMatchingOrders(
          input.propertyId,
          input.orderType,
          input.pricePerShare
        );
        
        let remainingShares = input.shares;
        const executedTrades: number[] = [];
        
        for (const matchOrder of matchingOrders) {
          if (remainingShares <= 0) break;
          
          const availableShares = matchOrder.shares - matchOrder.filledShares;
          const tradedShares = Math.min(remainingShares, availableShares);
          const tradePrice = matchOrder.pricePerShare; // Use the existing order's price
          const totalAmount = parseFloat(tradePrice) * tradedShares;
          const platformFee = totalAmount * 0.01; // 1% fee
          
          // Determine buyer and seller
          const buyerId = input.orderType === 'buy' ? ctx.user.id : matchOrder.userId;
          const sellerId = input.orderType === 'sell' ? ctx.user.id : matchOrder.userId;
          const buyOrderId = input.orderType === 'buy' ? orderId! : matchOrder.id;
          const sellOrderId = input.orderType === 'sell' ? orderId! : matchOrder.id;
          
          // Create the trade
          const tradeId = await db.createTrade({
            propertyId: input.propertyId,
            buyOrderId,
            sellOrderId,
            buyerId,
            sellerId,
            shares: tradedShares,
            pricePerShare: tradePrice,
            totalAmount: totalAmount.toString(),
            platformFee: platformFee.toString(),
          });
          
          if (tradeId) executedTrades.push(tradeId);
          
          // Update the matching order
          const newFilledShares = matchOrder.filledShares + tradedShares;
          const newStatus = newFilledShares >= matchOrder.shares ? 'filled' : 'partial';
          await db.updateMarketOrder(matchOrder.id, {
            filledShares: newFilledShares,
            status: newStatus,
          });
          
          remainingShares -= tradedShares;
        }
        
        // Update the new order status
        const filledShares = input.shares - remainingShares;
        if (filledShares > 0) {
          const newStatus = remainingShares <= 0 ? 'filled' : 'partial';
          await db.updateMarketOrder(orderId!, {
            filledShares,
            status: newStatus,
          });
        }
        
        return { 
          orderId, 
          filledShares,
          remainingShares,
          executedTrades,
          status: remainingShares <= 0 ? 'filled' : (filledShares > 0 ? 'partial' : 'open')
        };
      }),
    
    // Cancel an order
    cancelOrder: protectedProcedure
      .input(z.object({ orderId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const order = await db.getOrderById(input.orderId);
        if (!order) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Order not found' });
        }
        if (order.userId !== ctx.user.id) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Not your order' });
        }
        if (order.status === 'filled' || order.status === 'cancelled') {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Order cannot be cancelled' });
        }
        
        await db.updateMarketOrder(input.orderId, { status: 'cancelled' });
        return { success: true };
      }),
    
    // Admin: Get all open orders
    adminGetAllOrders: adminProcedure.query(async () => {
      return db.getAllOpenOrders();
    }),
    
    // Admin: Get all trades
    adminGetAllTrades: adminProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return db.getAllTrades(input?.limit || 50);
      }),
    
    // Admin: Cancel any order
    adminCancelOrder: adminProcedure
      .input(z.object({ orderId: z.number() }))
      .mutation(async ({ input }) => {
        await db.updateMarketOrder(input.orderId, { status: 'cancelled' });
        return { success: true };
      }),
  }),

  // ==================== KYC ====================
  kyc: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      const profile = await db.getOrCreateInvestorProfile(ctx.user.id);
      const documents = await db.getUserKycDocuments(ctx.user.id);
      return { profile, documents };
    }),
    
    submitDocument: protectedProcedure
      .input(z.object({
        documentType: z.enum(['cnic', 'passport', 'bank_statement', 'proof_of_address']),
        documentNumber: z.string().optional(),
        documentUrl: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const docId = await db.createKycDocument({
          userId: ctx.user.id,
          documentType: input.documentType,
          documentNumber: input.documentNumber,
          documentUrl: input.documentUrl,
          status: 'pending',
        });
        
        // Update profile status to pending if not already verified
        const profile = await db.getOrCreateInvestorProfile(ctx.user.id);
        if (profile?.kycStatus === 'not_started') {
          await db.updateInvestorProfile(ctx.user.id, { kycStatus: 'pending' });
        }
        
        return { documentId: docId };
      }),
    
    // Admin: Review KYC
    getPendingDocuments: adminProcedure.query(async () => {
      return db.getPendingKycDocuments();
    }),
    
    reviewDocument: adminProcedure
      .input(z.object({
        documentId: z.number(),
        status: z.enum(['verified', 'rejected']),
        rejectionReason: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateKycDocument(input.documentId, {
          status: input.status,
          rejectionReason: input.rejectionReason,
          verifiedBy: ctx.user.id,
          verifiedAt: new Date(),
        });
        return { success: true };
      }),
  }),

  // ==================== VOTING ====================
  voting: router({
    createVote: adminProcedure
      .input(z.object({
        propertyId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        voteType: z.enum(['sale', 'renovation', 'management_change', 'rent_adjustment', 'other']),
        startDate: z.date(),
        endDate: z.date(),
        requiredQuorum: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const voteId = await db.createPropertyVote(input as any);
        return { voteId };
      }),
    
    castVote: protectedProcedure
      .input(z.object({
        voteId: z.number(),
        response: z.enum(['yes', 'no', 'abstain']),
      }))
      .mutation(async ({ ctx, input }) => {
        // Get user's shares for this property
        const investments = await db.getUserInvestments(ctx.user.id);
        // For simplicity, using total shares across all properties
        const totalShares = investments.reduce((sum, inv) => sum + inv.sharesOwned, 0);
        
        const responseId = await db.createVoteResponse({
          voteId: input.voteId,
          userId: ctx.user.id,
          response: input.response,
          sharesAtVote: totalShares,
        });
        
        return { responseId };
      }),
    
    getResponses: protectedProcedure
      .input(z.object({ voteId: z.number() }))
      .query(async ({ input }) => {
        return db.getVoteResponses(input.voteId);
      }),
  }),

  // ==================== PROPERTY MANAGEMENT ====================
  propertyManagement: router({
    getTenants: adminProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyTenants(input.propertyId);
      }),
    
    addTenant: adminProcedure
      .input(z.object({
        propertyId: z.number(),
        name: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        leaseStartDate: z.date(),
        leaseEndDate: z.date(),
        monthlyRent: z.string(),
        securityDeposit: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const tenantId = await db.createTenant(input as any);
        return { tenantId };
      }),
    
    getMaintenanceRequests: adminProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyMaintenanceRequests(input.propertyId);
      }),
    
    createMaintenanceRequest: adminProcedure
      .input(z.object({
        propertyId: z.number(),
        tenantId: z.number().optional(),
        title: z.string(),
        description: z.string().optional(),
        priority: z.enum(['low', 'medium', 'high', 'urgent']),
        estimatedCost: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const requestId = await db.createMaintenanceRequest(input as any);
        return { requestId };
      }),
    
    getRentalPayments: adminProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyRentalPayments(input.propertyId);
      }),
    
    getBookings: adminProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyBookings(input.propertyId);
      }),
    
    addBooking: adminProcedure
      .input(z.object({
        propertyId: z.number(),
        guestName: z.string(),
        checkInDate: z.date(),
        checkOutDate: z.date(),
        nightlyRate: z.string(),
        totalAmount: z.string(),
        platformFee: z.string().optional(),
        cleaningFee: z.string().optional(),
        bookingSource: z.string().optional(),
        externalBookingId: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const bookingId = await db.createBooking(input as any);
        return { bookingId };
      }),
  }),

  // ==================== EDUCATIONAL CONTENT ====================
  education: router({
    getContent: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return db.getEducationalContent(input?.category);
      }),
    
    createContent: adminProcedure
      .input(z.object({
        category: z.enum(['shariah_compliance', 'platform_guide', 'risk_disclosure', 'investment_basics', 'market_comparison', 'faq']),
        title: z.string(),
        titleUrdu: z.string().optional(),
        content: z.string(),
        contentUrdu: z.string().optional(),
        order: z.number().optional(),
        isPublished: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const contentId = await db.createEducationalContent(input as any);
        return { contentId };
      }),
  }),

  // ==================== SALES MATERIALS ====================
  sales: router({
    getMaterials: salesProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return db.getSalesMaterials(input?.category);
      }),
    
    createMaterial: adminProcedure
      .input(z.object({
        category: z.enum(['pitch_script', 'objection_handling', 'comparison_chart', 'success_story', 'presentation', 'training_video']),
        title: z.string(),
        content: z.string().optional(),
        fileUrl: z.string().optional(),
        order: z.number().optional(),
        isPublished: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const materialId = await db.createSalesMaterial(input as any);
        return { materialId };
      }),
  }),

  // ==================== ADMIN ====================
  admin: router({
    getDashboardStats: adminProcedure.query(async () => {
      return db.getDashboardStats();
    }),
    
    getAllUsers: adminProcedure.query(async () => {
      return db.getAllUsers();
    }),
    
    getDueDiligence: adminProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return db.getPropertyDueDiligence(input.propertyId);
      }),
    
    createDueDiligenceItem: adminProcedure
      .input(z.object({
        propertyId: z.number(),
        checkItem: z.string(),
        category: z.enum(['legal', 'financial', 'physical', 'regulatory']),
        assignedTo: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const itemId = await db.createDueDiligenceItem(input as any);
        return { itemId };
      }),
    
    updateDueDiligenceItem: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.updateDueDiligenceItem(input.id, {
          status: input.status,
          notes: input.notes,
          completedAt: input.status === 'completed' ? new Date() : undefined,
        });
        return { success: true };
      }),
    
    createSpv: adminProcedure
      .input(z.object({
        propertyId: z.number(),
        spvName: z.string(),
        registrationNumber: z.string().optional(),
        legalStructure: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const spvId = await db.createSpv(input as any);
        return { spvId };
      }),
    
    addPropertyDocument: adminProcedure
      .input(z.object({
        propertyId: z.number(),
        documentType: z.enum([
          'title_deed', 'fard', 'registry', 'noc', 'building_plan',
          'valuation_report', 'fbr_valuation', 'legal_opinion', 'spv_certificate',
          'rental_agreement', 'insurance', 'other'
        ]),
        title: z.string(),
        documentUrl: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const docId = await db.createPropertyDocument(input as any);
        return { documentId: docId };
      }),
    
    getAuditLogs: adminProcedure
      .input(z.object({
        entityType: z.string().optional(),
        entityId: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getAuditLogs(input?.entityType, input?.entityId);
      }),
    
    createDividend: adminProcedure
      .input(z.object({
        propertyId: z.number(),
        totalAmount: z.string(),
        amountPerShare: z.string(),
        period: z.string(),
        distributionDate: z.date(),
      }))
      .mutation(async ({ input }) => {
        const dividendId = await db.createDividend(input as any);
        return { dividendId };
      }),
  }),

  // ==================== SUPPORT & CHAT ====================
  support: router({
    // Get user's tickets
    getMyTickets: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getSupportTickets(ctx.user.id);
      }),
    
    // Get single ticket with messages
    getTicket: protectedProcedure
      .input(z.object({ ticketId: z.number() }))
      .query(async ({ ctx, input }) => {
        const ticket = await db.getSupportTicketById(input.ticketId);
        if (!ticket) return null;
        // Users can only view their own tickets
        if (ticket.userId !== ctx.user.id && ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        const messages = await db.getTicketMessages(input.ticketId);
        return { ticket, messages };
      }),
    
    // Create new ticket
    createTicket: protectedProcedure
      .input(z.object({
        subject: z.string().min(5).max(255),
        description: z.string().min(10),
        category: z.enum(['general', 'investment', 'technical', 'kyc', 'payment', 'other']),
        priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const ticketId = await db.createSupportTicket({
          userId: ctx.user.id,
          subject: input.subject,
          description: input.description,
          category: input.category,
          priority: input.priority || 'medium',
        });
        // Add initial message
        if (ticketId) {
          await db.createTicketMessage({
            ticketId,
            senderId: ctx.user.id,
            senderType: 'user',
            message: input.description,
          });
        }
        return { ticketId };
      }),
    
    // Add message to ticket
    addMessage: protectedProcedure
      .input(z.object({
        ticketId: z.number(),
        message: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        const ticket = await db.getSupportTicketById(input.ticketId);
        if (!ticket) throw new TRPCError({ code: 'NOT_FOUND' });
        if (ticket.userId !== ctx.user.id && ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        const messageId = await db.createTicketMessage({
          ticketId: input.ticketId,
          senderId: ctx.user.id,
          senderType: ctx.user.role === 'admin' ? 'admin' : 'user',
          message: input.message,
        });
        // Update ticket status if admin responds
        if (ctx.user.role === 'admin' && ticket.status === 'open') {
          await db.updateSupportTicket(input.ticketId, { status: 'in_progress' });
        }
        return { messageId };
      }),
  }),

  chat: router({
    // Get chat history
    getHistory: protectedProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ ctx, input }) => {
        return db.getChatMessages(ctx.user.id, input.sessionId);
      }),
    
    // Send message and get AI response
    sendMessage: protectedProcedure
      .input(z.object({
        sessionId: z.string(),
        message: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        // Save user message
        await db.createChatMessage({
          userId: ctx.user.id,
          sessionId: input.sessionId,
          role: 'user',
          content: input.message,
        });
        
        // Get AI response using LLM
        const { invokeLLM } = await import('./_core/llm');
        const history = await db.getChatMessages(ctx.user.id, input.sessionId);
        
        const messages = [
          {
            role: 'system' as const,
            content: `You are PropertyPool's helpful AI support assistant. You help investors with questions about:
- Property investments and fractional ownership
- KYC verification process
- Wallet deposits and withdrawals
- Marketplace trading
- Returns and dividends
- Platform features

Be friendly, professional, and concise. If you cannot help with something, suggest creating a support ticket or contacting human support.

User info: ${ctx.user.name || 'Investor'}`
          },
          ...history.slice(-10).map(m => ({
            role: m.role as 'user' | 'assistant',
            content: m.content
          })),
          { role: 'user' as const, content: input.message }
        ];
        
        try {
          const response = await invokeLLM({ messages });
          const rawContent = response.choices[0]?.message?.content;
          const aiMessage = typeof rawContent === 'string' ? rawContent : "I apologize, I'm having trouble responding right now. Please try again or create a support ticket.";
          
          // Save AI response
          await db.createChatMessage({
            userId: ctx.user.id,
            sessionId: input.sessionId,
            role: 'assistant',
            content: aiMessage,
          });
          
          return { response: aiMessage };
        } catch (error) {
          const fallbackMessage = "I apologize, I'm having trouble connecting right now. Please try again in a moment or create a support ticket for assistance.";
          await db.createChatMessage({
            userId: ctx.user.id,
            sessionId: input.sessionId,
            role: 'assistant',
            content: fallbackMessage,
          });
          return { response: fallbackMessage };
        }
      }),
  }),

  // Admin support management
  adminSupport: router({
    // Get all tickets
    getAllTickets: adminProcedure
      .input(z.object({
        status: z.enum(['open', 'in_progress', 'waiting', 'resolved', 'closed']).optional(),
      }).optional())
      .query(async ({ input }) => {
        const tickets = await db.getSupportTickets();
        if (input?.status) {
          return tickets.filter(t => t.status === input.status);
        }
        return tickets;
      }),
    
    // Get ticket stats
    getStats: adminProcedure
      .query(async () => {
        return db.getTicketStats();
      }),
    
    // Update ticket status
    updateTicketStatus: adminProcedure
      .input(z.object({
        ticketId: z.number(),
        status: z.enum(['open', 'in_progress', 'waiting', 'resolved', 'closed']),
      }))
      .mutation(async ({ input }) => {
        const updateData: any = { status: input.status };
        if (input.status === 'resolved' || input.status === 'closed') {
          updateData.resolvedAt = new Date();
        }
        await db.updateSupportTicket(input.ticketId, updateData);
        return { success: true };
      }),
    
    // Assign ticket to admin
    assignTicket: adminProcedure
      .input(z.object({
        ticketId: z.number(),
        assignedTo: z.number(),
      }))
      .mutation(async ({ input }) => {
        await db.updateSupportTicket(input.ticketId, { 
          assignedTo: input.assignedTo,
          status: 'in_progress' 
        });
        return { success: true };
      }),
    
    // Reply to ticket
    replyToTicket: adminProcedure
      .input(z.object({
        ticketId: z.number(),
        message: z.string().min(1),
        isInternal: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.createTicketMessage({
          ticketId: input.ticketId,
          senderId: ctx.user.id,
          senderType: 'admin',
          message: input.message,
          isInternal: input.isInternal || false,
        });
        // Update ticket to waiting for user response
        if (!input.isInternal) {
          await db.updateSupportTicket(input.ticketId, { status: 'waiting' });
        }
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
