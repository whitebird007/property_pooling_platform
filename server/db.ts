import { eq, and, or, desc, asc, sql, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, properties, investments, transactions, 
  marketOrders, trades, investorProfiles, kycDocuments,
  propertyDocuments, dueDiligenceChecklist, spvs, tenants,
  maintenanceRequests, rentalPayments, airbnbBookings,
  propertyVotes, voteResponses, educationalContent, salesMaterials,
  dividends, auditLogs
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ==================== USER OPERATIONS ====================
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "phone", "loginMethod"] as const;
  textFields.forEach(field => {
    const value = user[field];
    if (value !== undefined) {
      values[field] = value ?? null;
      updateSet[field] = value ?? null;
    }
  });

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = 'admin';
    updateSet.role = 'admin';
  }

  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt));
}

// ==================== INVESTOR PROFILE OPERATIONS ====================
export async function getOrCreateInvestorProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const existing = await db.select().from(investorProfiles).where(eq(investorProfiles.userId, userId)).limit(1);
  if (existing.length > 0) return existing[0];
  
  await db.insert(investorProfiles).values({ userId });
  const created = await db.select().from(investorProfiles).where(eq(investorProfiles.userId, userId)).limit(1);
  return created[0] || null;
}

export async function updateInvestorProfile(userId: number, data: Partial<typeof investorProfiles.$inferInsert>) {
  const db = await getDb();
  if (!db) return;
  await db.update(investorProfiles).set(data).where(eq(investorProfiles.userId, userId));
}

// ==================== PROPERTY OPERATIONS ====================
export async function getAllProperties(status?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (status) {
    return db.select().from(properties).where(eq(properties.status, status as any)).orderBy(desc(properties.createdAt));
  }
  return db.select().from(properties).orderBy(desc(properties.createdAt));
}

export async function getPropertyById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
  return result[0] || null;
}

export async function createProperty(data: typeof properties.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(properties).values(data);
  return result[0].insertId;
}

export async function updateProperty(id: number, data: Partial<typeof properties.$inferInsert>) {
  const db = await getDb();
  if (!db) return;
  await db.update(properties).set(data).where(eq(properties.id, id));
}

// ==================== INVESTMENT OPERATIONS ====================
export async function getUserInvestments(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(investments).where(eq(investments.userId, userId)).orderBy(desc(investments.createdAt));
}

export async function getPropertyInvestors(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(investments).where(eq(investments.propertyId, propertyId));
}

export async function createInvestment(data: typeof investments.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(investments).values(data);
  return result[0].insertId;
}

export async function updateInvestment(id: number, data: Partial<typeof investments.$inferInsert>) {
  const db = await getDb();
  if (!db) return;
  await db.update(investments).set(data).where(eq(investments.id, id));
}

// ==================== TRANSACTION OPERATIONS ====================
export async function getUserTransactions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(transactions).where(eq(transactions.userId, userId)).orderBy(desc(transactions.createdAt));
}

export async function createTransaction(data: typeof transactions.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(transactions).values(data);
  return result[0].insertId;
}

// ==================== MARKET ORDER OPERATIONS ====================
export async function getPropertyOrders(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(marketOrders)
    .where(and(eq(marketOrders.propertyId, propertyId), eq(marketOrders.status, 'open')))
    .orderBy(desc(marketOrders.createdAt));
}

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(marketOrders).where(eq(marketOrders.userId, userId)).orderBy(desc(marketOrders.createdAt));
}

export async function createMarketOrder(data: typeof marketOrders.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(marketOrders).values(data);
  return result[0].insertId;
}

export async function updateMarketOrder(id: number, data: Partial<typeof marketOrders.$inferInsert>) {
  const db = await getDb();
  if (!db) return;
  await db.update(marketOrders).set(data).where(eq(marketOrders.id, id));
}

export async function getOrderById(orderId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(marketOrders).where(eq(marketOrders.id, orderId)).limit(1);
  return result[0] || null;
}

export async function getAllOpenOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(marketOrders)
    .where(or(eq(marketOrders.status, 'open'), eq(marketOrders.status, 'partial')))
    .orderBy(desc(marketOrders.createdAt));
}

export async function getOrderBook(propertyId: number) {
  const db = await getDb();
  if (!db) return { buyOrders: [], sellOrders: [] };
  
  const buyOrders = await db.select().from(marketOrders)
    .where(and(
      eq(marketOrders.propertyId, propertyId),
      eq(marketOrders.orderType, 'buy'),
      or(eq(marketOrders.status, 'open'), eq(marketOrders.status, 'partial'))
    ))
    .orderBy(desc(marketOrders.pricePerShare));
  
  const sellOrders = await db.select().from(marketOrders)
    .where(and(
      eq(marketOrders.propertyId, propertyId),
      eq(marketOrders.orderType, 'sell'),
      or(eq(marketOrders.status, 'open'), eq(marketOrders.status, 'partial'))
    ))
    .orderBy(asc(marketOrders.pricePerShare));
  
  return { buyOrders, sellOrders };
}

export async function getMatchingOrders(propertyId: number, orderType: 'buy' | 'sell', pricePerShare: string) {
  const db = await getDb();
  if (!db) return [];
  
  const oppositeType = orderType === 'buy' ? 'sell' : 'buy';
  const priceCondition = orderType === 'buy' 
    ? lte(marketOrders.pricePerShare, pricePerShare)
    : gte(marketOrders.pricePerShare, pricePerShare);
  
  return db.select().from(marketOrders)
    .where(and(
      eq(marketOrders.propertyId, propertyId),
      eq(marketOrders.orderType, oppositeType),
      or(eq(marketOrders.status, 'open'), eq(marketOrders.status, 'partial')),
      priceCondition
    ))
    .orderBy(orderType === 'buy' ? asc(marketOrders.pricePerShare) : desc(marketOrders.pricePerShare));
}

// ==================== TRADE OPERATIONS ====================
export async function getPropertyTrades(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(trades).where(eq(trades.propertyId, propertyId)).orderBy(desc(trades.executedAt));
}

export async function getAllTrades(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(trades).orderBy(desc(trades.executedAt)).limit(limit);
}

export async function getUserTrades(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(trades)
    .where(or(eq(trades.buyerId, userId), eq(trades.sellerId, userId)))
    .orderBy(desc(trades.executedAt));
}

export async function createTrade(data: typeof trades.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(trades).values(data);
  return result[0].insertId;
}

export async function getMarketStats() {
  const db = await getDb();
  if (!db) return { totalVolume: "0", totalTrades: 0, avgTradeSize: "0" };
  
  const [stats] = await db.select({
    totalVolume: sql<string>`COALESCE(SUM(totalAmount), 0)`,
    totalTrades: sql<number>`COUNT(*)`,
    avgTradeSize: sql<string>`COALESCE(AVG(totalAmount), 0)`,
  }).from(trades);
  
  return stats || { totalVolume: "0", totalTrades: 0, avgTradeSize: "0" };
}

// ==================== KYC OPERATIONS ====================
export async function getUserKycDocuments(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(kycDocuments).where(eq(kycDocuments.userId, userId));
}

export async function createKycDocument(data: typeof kycDocuments.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(kycDocuments).values(data);
  return result[0].insertId;
}

export async function updateKycDocument(id: number, data: Partial<typeof kycDocuments.$inferInsert>) {
  const db = await getDb();
  if (!db) return;
  await db.update(kycDocuments).set(data).where(eq(kycDocuments.id, id));
}

export async function getPendingKycDocuments() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(kycDocuments).where(eq(kycDocuments.status, 'pending')).orderBy(asc(kycDocuments.createdAt));
}

// ==================== PROPERTY DOCUMENTS ====================
export async function getPropertyDocuments(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(propertyDocuments).where(eq(propertyDocuments.propertyId, propertyId));
}

export async function createPropertyDocument(data: typeof propertyDocuments.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(propertyDocuments).values(data);
  return result[0].insertId;
}

// ==================== DUE DILIGENCE ====================
export async function getPropertyDueDiligence(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(dueDiligenceChecklist).where(eq(dueDiligenceChecklist.propertyId, propertyId));
}

export async function createDueDiligenceItem(data: typeof dueDiligenceChecklist.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(dueDiligenceChecklist).values(data);
  return result[0].insertId;
}

export async function updateDueDiligenceItem(id: number, data: Partial<typeof dueDiligenceChecklist.$inferInsert>) {
  const db = await getDb();
  if (!db) return;
  await db.update(dueDiligenceChecklist).set(data).where(eq(dueDiligenceChecklist.id, id));
}

// ==================== SPV OPERATIONS ====================
export async function getPropertySpv(propertyId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(spvs).where(eq(spvs.propertyId, propertyId)).limit(1);
  return result[0] || null;
}

export async function createSpv(data: typeof spvs.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(spvs).values(data);
  return result[0].insertId;
}

// ==================== TENANT OPERATIONS ====================
export async function getPropertyTenants(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tenants).where(eq(tenants.propertyId, propertyId));
}

export async function createTenant(data: typeof tenants.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(tenants).values(data);
  return result[0].insertId;
}

// ==================== MAINTENANCE OPERATIONS ====================
export async function getPropertyMaintenanceRequests(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(maintenanceRequests).where(eq(maintenanceRequests.propertyId, propertyId)).orderBy(desc(maintenanceRequests.createdAt));
}

export async function createMaintenanceRequest(data: typeof maintenanceRequests.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(maintenanceRequests).values(data);
  return result[0].insertId;
}

// ==================== RENTAL PAYMENTS ====================
export async function getPropertyRentalPayments(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(rentalPayments).where(eq(rentalPayments.propertyId, propertyId)).orderBy(desc(rentalPayments.dueDate));
}

// ==================== AIRBNB BOOKINGS ====================
export async function getPropertyBookings(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(airbnbBookings).where(eq(airbnbBookings.propertyId, propertyId)).orderBy(desc(airbnbBookings.checkInDate));
}

export async function createBooking(data: typeof airbnbBookings.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(airbnbBookings).values(data);
  return result[0].insertId;
}

// ==================== VOTING OPERATIONS ====================
export async function getPropertyVotes(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(propertyVotes).where(eq(propertyVotes.propertyId, propertyId)).orderBy(desc(propertyVotes.createdAt));
}

export async function createPropertyVote(data: typeof propertyVotes.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(propertyVotes).values(data);
  return result[0].insertId;
}

export async function getVoteResponses(voteId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(voteResponses).where(eq(voteResponses.voteId, voteId));
}

export async function createVoteResponse(data: typeof voteResponses.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(voteResponses).values(data);
  return result[0].insertId;
}

// ==================== DIVIDENDS ====================
export async function getPropertyDividends(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(dividends).where(eq(dividends.propertyId, propertyId)).orderBy(desc(dividends.distributionDate));
}

export async function createDividend(data: typeof dividends.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(dividends).values(data);
  return result[0].insertId;
}

// ==================== EDUCATIONAL CONTENT ====================
export async function getEducationalContent(category?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (category) {
    return db.select().from(educationalContent)
      .where(and(eq(educationalContent.category, category as any), eq(educationalContent.isPublished, true)))
      .orderBy(asc(educationalContent.order));
  }
  return db.select().from(educationalContent)
    .where(eq(educationalContent.isPublished, true))
    .orderBy(asc(educationalContent.order));
}

export async function createEducationalContent(data: typeof educationalContent.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(educationalContent).values(data);
  return result[0].insertId;
}

// ==================== SALES MATERIALS ====================
export async function getSalesMaterials(category?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (category) {
    return db.select().from(salesMaterials)
      .where(and(eq(salesMaterials.category, category as any), eq(salesMaterials.isPublished, true)))
      .orderBy(asc(salesMaterials.order));
  }
  return db.select().from(salesMaterials)
    .where(eq(salesMaterials.isPublished, true))
    .orderBy(asc(salesMaterials.order));
}

export async function createSalesMaterial(data: typeof salesMaterials.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(salesMaterials).values(data);
  return result[0].insertId;
}

// ==================== AUDIT LOGS ====================
export async function createAuditLog(data: typeof auditLogs.$inferInsert) {
  const db = await getDb();
  if (!db) return;
  await db.insert(auditLogs).values(data);
}

export async function getAuditLogs(entityType?: string, entityId?: number) {
  const db = await getDb();
  if (!db) return [];
  
  if (entityType && entityId) {
    return db.select().from(auditLogs)
      .where(and(eq(auditLogs.entityType, entityType), eq(auditLogs.entityId, entityId)))
      .orderBy(desc(auditLogs.createdAt));
  }
  return db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(100);
}

// ==================== DASHBOARD STATS ====================
export async function getDashboardStats() {
  const db = await getDb();
  if (!db) return null;
  
  const [propertyCount] = await db.select({ count: sql<number>`count(*)` }).from(properties);
  const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
  const [investmentSum] = await db.select({ total: sql<string>`COALESCE(SUM(totalInvested), 0)` }).from(investments);
  const [tradeCount] = await db.select({ count: sql<number>`count(*)` }).from(trades);
  
  return {
    totalProperties: propertyCount?.count || 0,
    totalUsers: userCount?.count || 0,
    totalInvested: investmentSum?.total || "0",
    totalTrades: tradeCount?.count || 0,
  };
}
