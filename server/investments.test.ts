import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database module
vi.mock("./db", () => ({
  getUserInvestments: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      propertyId: 1,
      sharesOwned: 10,
      totalInvested: "500000",
      currentValue: "550000",
      createdAt: new Date(),
    },
  ]),
  getOrCreateInvestorProfile: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    kycStatus: "verified",
    walletBalance: "100000",
    totalInvested: "500000",
    totalReturns: "50000",
  }),
  updateInvestorProfile: vi.fn().mockResolvedValue(undefined),
  createInvestment: vi.fn().mockResolvedValue(1),
  updateInvestment: vi.fn().mockResolvedValue(undefined),
  getPropertyById: vi.fn().mockResolvedValue({
    id: 1,
    title: "Test Property",
    availableShares: 100,
    sharePrice: "50000",
    status: "active",
  }),
  updateProperty: vi.fn().mockResolvedValue(undefined),
  createTransaction: vi.fn().mockResolvedValue(1),
  getUserTransactions: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      transactionType: "deposit",
      amount: "100000",
      status: "completed",
      createdAt: new Date(),
    },
  ]),
  getDividendHistory: vi.fn().mockResolvedValue([]),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(kycStatus: string = "verified"): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("investments router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("investments.myInvestments", () => {
    it("returns user investments for authenticated user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.investments.myInvestments();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("sharesOwned");
      expect(result[0]).toHaveProperty("totalInvested");
    });

    it("rejects unauthenticated users", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.investments.myInvestments()).rejects.toThrow();
    });
  });
});

describe("transactions router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("transactions.myTransactions", () => {
    it("returns transaction history for authenticated user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.transactions.myTransactions();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it("rejects unauthenticated users", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.transactions.myTransactions()).rejects.toThrow();
    });
  });
});
