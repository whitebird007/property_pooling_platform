import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database module
vi.mock("./db", () => ({
  getAllProperties: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: "Luxury Apartment DHA Phase 5",
      titleUrdu: null,
      description: "Premium 3-bedroom apartment",
      propertyType: "residential",
      address: "Street 10, DHA Phase 5",
      city: "Lahore",
      totalValue: "50000000",
      totalShares: 1000,
      sharePrice: "50000",
      availableShares: 500,
      minInvestment: "50000",
      expectedRentalYield: "8.5",
      expectedAppreciation: "12",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getPropertyById: vi.fn().mockResolvedValue({
    id: 1,
    title: "Luxury Apartment DHA Phase 5",
    propertyType: "residential",
    city: "Lahore",
    totalValue: "50000000",
    totalShares: 1000,
    sharePrice: "50000",
    availableShares: 500,
    status: "active",
  }),
  getPropertyDocuments: vi.fn().mockResolvedValue([]),
  getPropertySpv: vi.fn().mockResolvedValue(null),
  getPropertyDueDiligence: vi.fn().mockResolvedValue([]),
  createProperty: vi.fn().mockResolvedValue(1),
  updateProperty: vi.fn().mockResolvedValue(undefined),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

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

function createAuthContext(role: "user" | "admin" = "user"): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role,
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

describe("properties router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("properties.list", () => {
    it("returns list of properties for public users", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.properties.list({});

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("title");
      expect(result[0]).toHaveProperty("totalValue");
    });

    it("returns properties with correct structure", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.properties.list({});

      const property = result[0];
      expect(property).toHaveProperty("id");
      expect(property).toHaveProperty("propertyType");
      expect(property).toHaveProperty("city");
      expect(property).toHaveProperty("sharePrice");
      expect(property).toHaveProperty("availableShares");
    });
  });

  describe("properties.getById", () => {
    it("returns property details for valid ID", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.properties.getById({ id: 1 });

      expect(result).toBeDefined();
      expect(result.property).toBeDefined();
      expect(result.property.id).toBe(1);
    });

    it("includes documents, SPV, and due diligence data", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.properties.getById({ id: 1 });

      expect(result).toHaveProperty("documents");
      expect(result).toHaveProperty("spv");
      expect(result).toHaveProperty("dueDiligence");
    });
  });

  describe("properties.create (admin only)", () => {
    it("allows admin to create property", async () => {
      const ctx = createAuthContext("admin");
      const caller = appRouter.createCaller(ctx);

      const newProperty = {
        title: "New Test Property",
        propertyType: "residential" as const,
        address: "Test Address",
        city: "Karachi",
        totalValue: "30000000",
        totalShares: 600,
        sharePrice: "50000",
        availableShares: 600,
        minInvestment: "50000",
      };

      const result = await caller.properties.create(newProperty);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
    });

    it("rejects non-admin users from creating property", async () => {
      const ctx = createAuthContext("user");
      const caller = appRouter.createCaller(ctx);

      const newProperty = {
        title: "New Test Property",
        propertyType: "residential" as const,
        address: "Test Address",
        city: "Karachi",
        totalValue: "30000000",
        totalShares: 600,
        sharePrice: "50000",
        availableShares: 600,
        minInvestment: "50000",
      };

      await expect(caller.properties.create(newProperty)).rejects.toThrow();
    });
  });
});
