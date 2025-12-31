import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

// ==================== USER & AUTH ====================
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).unique(), // Made optional for local auth
  name: text("name"),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: varchar("password", { length: 255 }), // NEW: Hashed password for local auth
  phone: varchar("phone", { length: 20 }),
  loginMethod: mysqlEnum("loginMethod", ["email", "google", "microsoft", "apple"]).default("email").notNull(),
  role: mysqlEnum("role", ["user", "admin", "sales"]).default("user").notNull(),
  language: mysqlEnum("language", ["en", "ur"]).default("en").notNull(),
  emailVerified: boolean("emailVerified").default(false), // NEW: Email verification status
  verificationToken: varchar("verificationToken", { length: 255 }), // NEW: Email verification token
  resetPasswordToken: varchar("resetPasswordToken", { length: 255 }), // NEW: Password reset token
  resetPasswordExpires: timestamp("resetPasswordExpires"), // NEW: Password reset expiry
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

// ==================== KYC & VERIFICATION ====================
export const kycDocuments = mysqlTable("kyc_documents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  documentType: mysqlEnum("documentType", ["cnic", "passport", "bank_statement", "proof_of_address"]).notNull(),
  documentNumber: varchar("documentNumber", { length: 50 }),
  documentUrl: text("documentUrl"),
  status: mysqlEnum("status", ["pending", "verified", "rejected"]).default("pending").notNull(),
  rejectionReason: text("rejectionReason"),
  verifiedAt: timestamp("verifiedAt"),
  verifiedBy: int("verifiedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const investorProfiles = mysqlTable("investor_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  kycStatus: mysqlEnum("kycStatus", ["not_started", "pending", "verified", "rejected"]).default("not_started").notNull(),
  walletBalance: decimal("walletBalance", { precision: 15, scale: 2 }).default("0").notNull(),
  totalInvested: decimal("totalInvested", { precision: 15, scale: 2 }).default("0").notNull(),
  totalReturns: decimal("totalReturns", { precision: 15, scale: 2 }).default("0").notNull(),
  riskProfile: mysqlEnum("riskProfile", ["conservative", "moderate", "aggressive"]),
  investmentGoals: text("investmentGoals"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ==================== PROPERTIES & SPV ====================
export const properties = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleUrdu: varchar("titleUrdu", { length: 255 }),
  description: text("description"),
  descriptionUrdu: text("descriptionUrdu"),
  propertyType: mysqlEnum("propertyType", ["residential", "commercial", "mixed_use", "vacation_rental"]).notNull(),
  status: mysqlEnum("status", ["sourcing", "due_diligence", "funding", "active", "sold"]).default("sourcing").notNull(),
  
  // Location
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  area: varchar("area", { length: 100 }),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  
  // Financial
  totalValue: decimal("totalValue", { precision: 15, scale: 2 }).notNull(),
  totalShares: int("totalShares").notNull(),
  sharePrice: decimal("sharePrice", { precision: 15, scale: 2 }).notNull(),
  availableShares: int("availableShares").notNull(),
  minInvestment: decimal("minInvestment", { precision: 15, scale: 2 }).notNull(),
  
  // Projections
  expectedRentalYield: decimal("expectedRentalYield", { precision: 5, scale: 2 }),
  expectedAppreciation: decimal("expectedAppreciation", { precision: 5, scale: 2 }),
  holdingPeriod: int("holdingPeriod"), // in months
  
  // Media
  images: json("images").$type<string[]>(),
  virtualTourUrl: text("virtualTourUrl"),
  floorPlanUrl: text("floorPlanUrl"),
  
  // Specs
  sizeSqFt: int("sizeSqFt"),
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  yearBuilt: int("yearBuilt"),
  
  // Management
  rentalType: mysqlEnum("rentalType", ["long_term", "short_term", "mixed"]).default("long_term"),
  managedBy: varchar("managedBy", { length: 255 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const spvs = mysqlTable("spvs", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  spvName: varchar("spvName", { length: 255 }).notNull(),
  registrationNumber: varchar("registrationNumber", { length: 100 }),
  secpRegistrationDate: timestamp("secpRegistrationDate"),
  status: mysqlEnum("status", ["pending", "registered", "active", "dissolved"]).default("pending").notNull(),
  legalStructure: text("legalStructure"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ==================== DOCUMENTS & VERIFICATION ====================
export const propertyDocuments = mysqlTable("property_documents", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  documentType: mysqlEnum("documentType", [
    "title_deed", "fard", "registry", "noc", "building_plan",
    "valuation_report", "fbr_valuation", "legal_opinion", "spv_certificate",
    "rental_agreement", "insurance", "other"
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  documentUrl: text("documentUrl"),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "flagged"]).default("pending").notNull(),
  verifiedBy: int("verifiedBy"),
  verifiedAt: timestamp("verifiedAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const dueDiligenceChecklist = mysqlTable("due_diligence_checklist", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  checkItem: varchar("checkItem", { length: 255 }).notNull(),
  category: mysqlEnum("category", ["legal", "financial", "physical", "regulatory"]).notNull(),
  status: mysqlEnum("status", ["pending", "in_progress", "completed", "failed"]).default("pending").notNull(),
  assignedTo: int("assignedTo"),
  completedAt: timestamp("completedAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ==================== INVESTMENTS & SHARES ====================
export const investments = mysqlTable("investments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  propertyId: int("propertyId").notNull(),
  sharesOwned: int("sharesOwned").notNull(),
  totalInvested: decimal("totalInvested", { precision: 15, scale: 2 }).notNull(),
  averageBuyPrice: decimal("averageBuyPrice", { precision: 15, scale: 2 }).notNull(),
  currentValue: decimal("currentValue", { precision: 15, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["active", "sold", "pending"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  propertyId: int("propertyId"),
  transactionType: mysqlEnum("transactionType", [
    "deposit", "withdrawal", "share_purchase", "share_sale",
    "dividend", "rental_income", "fee", "refund"
  ]).notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  shares: int("shares"),
  pricePerShare: decimal("pricePerShare", { precision: 15, scale: 2 }),
  status: mysqlEnum("status", ["pending", "completed", "failed", "cancelled"]).default("pending").notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  referenceNumber: varchar("referenceNumber", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const dividends = mysqlTable("dividends", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  totalAmount: decimal("totalAmount", { precision: 15, scale: 2 }).notNull(),
  amountPerShare: decimal("amountPerShare", { precision: 15, scale: 2 }).notNull(),
  period: varchar("period", { length: 50 }).notNull(), // e.g., "2024-Q1"
  distributionDate: timestamp("distributionDate").notNull(),
  status: mysqlEnum("status", ["pending", "distributed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ==================== SECONDARY MARKET ====================
export const marketOrders = mysqlTable("market_orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  propertyId: int("propertyId").notNull(),
  orderType: mysqlEnum("orderType", ["buy", "sell"]).notNull(),
  shares: int("shares").notNull(),
  pricePerShare: decimal("pricePerShare", { precision: 15, scale: 2 }).notNull(),
  filledShares: int("filledShares").default(0).notNull(),
  status: mysqlEnum("status", ["open", "partial", "filled", "cancelled"]).default("open").notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const trades = mysqlTable("trades", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  buyOrderId: int("buyOrderId").notNull(),
  sellOrderId: int("sellOrderId").notNull(),
  buyerId: int("buyerId").notNull(),
  sellerId: int("sellerId").notNull(),
  shares: int("shares").notNull(),
  pricePerShare: decimal("pricePerShare", { precision: 15, scale: 2 }).notNull(),
  totalAmount: decimal("totalAmount", { precision: 15, scale: 2 }).notNull(),
  platformFee: decimal("platformFee", { precision: 15, scale: 2 }).notNull(),
  executedAt: timestamp("executedAt").defaultNow().notNull(),
});

// ==================== PROPERTY MANAGEMENT ====================
export const tenants = mysqlTable("tenants", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  leaseStartDate: timestamp("leaseStartDate").notNull(),
  leaseEndDate: timestamp("leaseEndDate").notNull(),
  monthlyRent: decimal("monthlyRent", { precision: 15, scale: 2 }).notNull(),
  securityDeposit: decimal("securityDeposit", { precision: 15, scale: 2 }),
  status: mysqlEnum("status", ["active", "ended", "evicted"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const maintenanceRequests = mysqlTable("maintenance_requests", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  tenantId: int("tenantId"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).default("medium").notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "completed", "cancelled"]).default("open").notNull(),
  estimatedCost: decimal("estimatedCost", { precision: 15, scale: 2 }),
  actualCost: decimal("actualCost", { precision: 15, scale: 2 }),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const rentalPayments = mysqlTable("rental_payments", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  tenantId: int("tenantId").notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  dueDate: timestamp("dueDate").notNull(),
  paidDate: timestamp("paidDate"),
  status: mysqlEnum("status", ["pending", "paid", "overdue", "partial"]).default("pending").notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const airbnbBookings = mysqlTable("airbnb_bookings", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  guestName: varchar("guestName", { length: 255 }).notNull(),
  checkInDate: timestamp("checkInDate").notNull(),
  checkOutDate: timestamp("checkOutDate").notNull(),
  nightlyRate: decimal("nightlyRate", { precision: 15, scale: 2 }).notNull(),
  totalAmount: decimal("totalAmount", { precision: 15, scale: 2 }).notNull(),
  platformFee: decimal("platformFee", { precision: 15, scale: 2 }),
  cleaningFee: decimal("cleaningFee", { precision: 15, scale: 2 }),
  status: mysqlEnum("status", ["confirmed", "checked_in", "completed", "cancelled"]).default("confirmed").notNull(),
  bookingSource: varchar("bookingSource", { length: 50 }), // airbnb, booking.com, direct
  externalBookingId: varchar("externalBookingId", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ==================== VOTING & GOVERNANCE ====================
export const propertyVotes = mysqlTable("property_votes", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  voteType: mysqlEnum("voteType", ["sale", "renovation", "management_change", "rent_adjustment", "other"]).notNull(),
  status: mysqlEnum("status", ["active", "passed", "rejected", "expired"]).default("active").notNull(),
  requiredQuorum: decimal("requiredQuorum", { precision: 5, scale: 2 }).default("51").notNull(), // percentage
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const voteResponses = mysqlTable("vote_responses", {
  id: int("id").autoincrement().primaryKey(),
  voteId: int("voteId").notNull(),
  userId: int("userId").notNull(),
  response: mysqlEnum("response", ["yes", "no", "abstain"]).notNull(),
  sharesAtVote: int("sharesAtVote").notNull(), // voting power based on shares owned
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ==================== EDUCATIONAL CONTENT ====================
export const educationalContent = mysqlTable("educational_content", {
  id: int("id").autoincrement().primaryKey(),
  category: mysqlEnum("category", [
    "shariah_compliance", "platform_guide", "risk_disclosure",
    "investment_basics", "market_comparison", "faq"
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  titleUrdu: varchar("titleUrdu", { length: 255 }),
  content: text("content").notNull(),
  contentUrdu: text("contentUrdu"),
  order: int("order").default(0).notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ==================== SALES TRAINING ====================
export const salesMaterials = mysqlTable("sales_materials", {
  id: int("id").autoincrement().primaryKey(),
  category: mysqlEnum("category", [
    "pitch_script", "objection_handling", "comparison_chart",
    "success_story", "presentation", "training_video"
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  fileUrl: text("fileUrl"),
  order: int("order").default(0).notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ==================== AUDIT TRAIL ====================
export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entityType", { length: 50 }).notNull(),
  entityId: int("entityId"),
  oldValue: json("oldValue"),
  newValue: json("newValue"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ==================== SUPPORT & CHAT ====================
export const supportTickets = mysqlTable("support_tickets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: mysqlEnum("category", ["general", "investment", "technical", "kyc", "payment", "other"]).default("general").notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).default("medium").notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "waiting", "resolved", "closed"]).default("open").notNull(),
  assignedTo: int("assignedTo"),
  resolvedAt: timestamp("resolvedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const ticketMessages = mysqlTable("ticket_messages", {
  id: int("id").autoincrement().primaryKey(),
  ticketId: int("ticketId").notNull(),
  senderId: int("senderId").notNull(),
  senderType: mysqlEnum("senderType", ["user", "admin", "system"]).default("user").notNull(),
  message: text("message").notNull(),
  isInternal: boolean("isInternal").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ==================== TYPE EXPORTS ==
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;
export type Investment = typeof investments.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type MarketOrder = typeof marketOrders.$inferSelect;
export type Trade = typeof trades.$inferSelect;
export type SupportTicket = typeof supportTickets.$inferSelect;
export type TicketMessage = typeof ticketMessages.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
