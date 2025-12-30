CREATE TABLE `airbnb_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`guestName` varchar(255) NOT NULL,
	`checkInDate` timestamp NOT NULL,
	`checkOutDate` timestamp NOT NULL,
	`nightlyRate` decimal(15,2) NOT NULL,
	`totalAmount` decimal(15,2) NOT NULL,
	`platformFee` decimal(15,2),
	`cleaningFee` decimal(15,2),
	`status` enum('confirmed','checked_in','completed','cancelled') NOT NULL DEFAULT 'confirmed',
	`bookingSource` varchar(50),
	`externalBookingId` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `airbnb_bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`action` varchar(100) NOT NULL,
	`entityType` varchar(50) NOT NULL,
	`entityId` int,
	`oldValue` json,
	`newValue` json,
	`ipAddress` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dividends` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`totalAmount` decimal(15,2) NOT NULL,
	`amountPerShare` decimal(15,2) NOT NULL,
	`period` varchar(50) NOT NULL,
	`distributionDate` timestamp NOT NULL,
	`status` enum('pending','distributed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `dividends_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `due_diligence_checklist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`checkItem` varchar(255) NOT NULL,
	`category` enum('legal','financial','physical','regulatory') NOT NULL,
	`status` enum('pending','in_progress','completed','failed') NOT NULL DEFAULT 'pending',
	`assignedTo` int,
	`completedAt` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `due_diligence_checklist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `educational_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` enum('shariah_compliance','platform_guide','risk_disclosure','investment_basics','market_comparison','faq') NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleUrdu` varchar(255),
	`content` text NOT NULL,
	`contentUrdu` text,
	`order` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `educational_content_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `investments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`propertyId` int NOT NULL,
	`sharesOwned` int NOT NULL,
	`totalInvested` decimal(15,2) NOT NULL,
	`averageBuyPrice` decimal(15,2) NOT NULL,
	`currentValue` decimal(15,2) NOT NULL,
	`status` enum('active','sold','pending') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `investments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `investor_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`kycStatus` enum('not_started','pending','verified','rejected') NOT NULL DEFAULT 'not_started',
	`walletBalance` decimal(15,2) NOT NULL DEFAULT '0',
	`totalInvested` decimal(15,2) NOT NULL DEFAULT '0',
	`totalReturns` decimal(15,2) NOT NULL DEFAULT '0',
	`riskProfile` enum('conservative','moderate','aggressive'),
	`investmentGoals` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `investor_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `investor_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `kyc_documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`documentType` enum('cnic','passport','bank_statement','proof_of_address') NOT NULL,
	`documentNumber` varchar(50),
	`documentUrl` text,
	`status` enum('pending','verified','rejected') NOT NULL DEFAULT 'pending',
	`rejectionReason` text,
	`verifiedAt` timestamp,
	`verifiedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `kyc_documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenance_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`tenantId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`priority` enum('low','medium','high','urgent') NOT NULL DEFAULT 'medium',
	`status` enum('open','in_progress','completed','cancelled') NOT NULL DEFAULT 'open',
	`estimatedCost` decimal(15,2),
	`actualCost` decimal(15,2),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `maintenance_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `market_orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`propertyId` int NOT NULL,
	`orderType` enum('buy','sell') NOT NULL,
	`shares` int NOT NULL,
	`pricePerShare` decimal(15,2) NOT NULL,
	`filledShares` int NOT NULL DEFAULT 0,
	`status` enum('open','partial','filled','cancelled') NOT NULL DEFAULT 'open',
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `market_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleUrdu` varchar(255),
	`description` text,
	`descriptionUrdu` text,
	`propertyType` enum('residential','commercial','mixed_use','vacation_rental') NOT NULL,
	`status` enum('sourcing','due_diligence','funding','active','sold') NOT NULL DEFAULT 'sourcing',
	`address` text NOT NULL,
	`city` varchar(100) NOT NULL,
	`area` varchar(100),
	`totalValue` decimal(15,2) NOT NULL,
	`totalShares` int NOT NULL,
	`sharePrice` decimal(15,2) NOT NULL,
	`availableShares` int NOT NULL,
	`minInvestment` decimal(15,2) NOT NULL,
	`expectedRentalYield` decimal(5,2),
	`expectedAppreciation` decimal(5,2),
	`holdingPeriod` int,
	`images` json,
	`virtualTourUrl` text,
	`floorPlanUrl` text,
	`sizeSqFt` int,
	`bedrooms` int,
	`bathrooms` int,
	`yearBuilt` int,
	`rentalType` enum('long_term','short_term','mixed') DEFAULT 'long_term',
	`managedBy` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property_documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`documentType` enum('title_deed','fard','registry','noc','building_plan','valuation_report','fbr_valuation','legal_opinion','spv_certificate','rental_agreement','insurance','other') NOT NULL,
	`title` varchar(255) NOT NULL,
	`documentUrl` text,
	`verificationStatus` enum('pending','verified','flagged') NOT NULL DEFAULT 'pending',
	`verifiedBy` int,
	`verifiedAt` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `property_documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property_votes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`voteType` enum('sale','renovation','management_change','rent_adjustment','other') NOT NULL,
	`status` enum('active','passed','rejected','expired') NOT NULL DEFAULT 'active',
	`requiredQuorum` decimal(5,2) NOT NULL DEFAULT '51',
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `property_votes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rental_payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`tenantId` int NOT NULL,
	`amount` decimal(15,2) NOT NULL,
	`dueDate` timestamp NOT NULL,
	`paidDate` timestamp,
	`status` enum('pending','paid','overdue','partial') NOT NULL DEFAULT 'pending',
	`paymentMethod` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `rental_payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sales_materials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` enum('pitch_script','objection_handling','comparison_chart','success_story','presentation','training_video') NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`fileUrl` text,
	`order` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sales_materials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `spvs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`spvName` varchar(255) NOT NULL,
	`registrationNumber` varchar(100),
	`secpRegistrationDate` timestamp,
	`status` enum('pending','registered','active','dissolved') NOT NULL DEFAULT 'pending',
	`legalStructure` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `spvs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tenants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20),
	`leaseStartDate` timestamp NOT NULL,
	`leaseEndDate` timestamp NOT NULL,
	`monthlyRent` decimal(15,2) NOT NULL,
	`securityDeposit` decimal(15,2),
	`status` enum('active','ended','evicted') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tenants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trades` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`buyOrderId` int NOT NULL,
	`sellOrderId` int NOT NULL,
	`buyerId` int NOT NULL,
	`sellerId` int NOT NULL,
	`shares` int NOT NULL,
	`pricePerShare` decimal(15,2) NOT NULL,
	`totalAmount` decimal(15,2) NOT NULL,
	`platformFee` decimal(15,2) NOT NULL,
	`executedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `trades_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`propertyId` int,
	`transactionType` enum('deposit','withdrawal','share_purchase','share_sale','dividend','rental_income','fee','refund') NOT NULL,
	`amount` decimal(15,2) NOT NULL,
	`shares` int,
	`pricePerShare` decimal(15,2),
	`status` enum('pending','completed','failed','cancelled') NOT NULL DEFAULT 'pending',
	`paymentMethod` varchar(50),
	`referenceNumber` varchar(100),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vote_responses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`voteId` int NOT NULL,
	`userId` int NOT NULL,
	`response` enum('yes','no','abstain') NOT NULL,
	`sharesAtVote` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `vote_responses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','sales') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `language` enum('en','ur') DEFAULT 'en' NOT NULL;