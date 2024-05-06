CREATE DATABASE IF not EXISTS orangic;

USE orangic;

CREATE TABLE `users` (
  `Id` varchar(20) NOT NULL,
  `Name` varchar(25) NOT NULL,
  `Email` varchar(60) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Rank` int DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `DeleteAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `restaurants` (
  `Id` varchar(20) NOT NULL,
  `Name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Introduction` varchar(300) DEFAULT NULL,
  `Address` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `City` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `District` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Ward` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Email` varchar(60) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `ownerID` varchar(20) NOT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `ownerID` (`ownerID`),
  CONSTRAINT `restaurants_ibfk_1` FOREIGN KEY (`ownerID`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `foods` (
  `Id` varchar(20) NOT NULL,
  `Name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Description` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `TimeMade` time DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `FeatureItem` tinyint(1) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Discount` int DEFAULT NULL,
  `RestaurantID` varchar(20) NOT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `RestaurantID` (`RestaurantID`),
  CONSTRAINT `foods_ibfk_1` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurants` (`Id`),
  CONSTRAINT `foods_chk_1` CHECK (((`Discount` >= 0) and (`Discount` <= 100)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `foods` (
  `Id` varchar(20) NOT NULL,
  `Name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Description` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `TimeMade` time DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `FeatureItem` tinyint(1) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Discount` int DEFAULT NULL,
  `RestaurantID` varchar(20) NOT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `RestaurantID` (`RestaurantID`),
  CONSTRAINT `foods_ibfk_1` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurants` (`Id`),
  CONSTRAINT `foods_chk_1` CHECK (((`Discount` >= 0) and (`Discount` <= 100)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `favlist` (
  `Id` varchar(20) NOT NULL,
  `UserID` varchar(20) NOT NULL,
  `TargetID` varchar(20) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `favlist_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `address` (
  `Id` varchar(20) NOT NULL,
  `OwnerID` varchar(20) NOT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `City` varchar(30) DEFAULT NULL,
  `District` varchar(30) DEFAULT NULL,
  `Ward` varchar(40) DEFAULT NULL,
  `Priority` tinyint DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `coupons` (
  `Id` varchar(20) NOT NULL,
  `Code` varchar(6) NOT NULL,
  `Discount` int DEFAULT NULL,
  `Type` varchar(10) DEFAULT NULL,
  `Amount` int DEFAULT NULL,
  `Start` datetime DEFAULT NULL,
  `End` datetime DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `CreateBy` varchar(20) NOT NULL,
  `UpdateBy` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CreateBy` (`CreateBy`),
  KEY `UpdateBy` (`UpdateBy`),
  CONSTRAINT `coupons_ibfk_1` FOREIGN KEY (`CreateBy`) REFERENCES `admin` (`Id`),
  CONSTRAINT `coupons_ibfk_2` FOREIGN KEY (`UpdateBy`) REFERENCES `admin` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `couponitems` (
  `Id` varchar(20) NOT NULL,
  `CouponID` varchar(20) NOT NULL,
  `FoodID` varchar(20) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `CouponID` (`CouponID`),
  KEY `FoodID` (`FoodID`),
  CONSTRAINT `couponitems_ibfk_1` FOREIGN KEY (`CouponID`) REFERENCES `coupons` (`Id`),
  CONSTRAINT `couponitems_ibfk_2` FOREIGN KEY (`FoodID`) REFERENCES `foods` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `couponuser` (
  `Id` varchar(20) NOT NULL,
  `Status` varchar(20) NOT NULL,
  `UserID` varchar(20) NOT NULL,
  `CouponID` varchar(20) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserID` (`UserID`),
  KEY `CouponID` (`CouponID`),
  CONSTRAINT `couponuser_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`Id`),
  CONSTRAINT `couponuser_ibfk_2` FOREIGN KEY (`CouponID`) REFERENCES `coupons` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `events` (
  `Id` varchar(20) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Content` varchar(300) DEFAULT NULL,
  `Start` datetime DEFAULT NULL,
  `End` datetime DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `CreateBy` varchar(20) NOT NULL,
  `UpdateBy` varchar(20) DEFAULT NULL,
  `CouponID` varchar(20) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `CreateBy` (`CreateBy`),
  KEY `UpdateBy` (`UpdateBy`),
  KEY `CouponID` (`CouponID`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`CreateBy`) REFERENCES `admin` (`Id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`UpdateBy`) REFERENCES `admin` (`Id`),
  CONSTRAINT `events_ibfk_3` FOREIGN KEY (`CouponID`) REFERENCES `coupons` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images` (
  `Id` varchar(20) NOT NULL,
  `OwnerID` varchar(20) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `Id` varchar(20) NOT NULL,
  `UserID` varchar(20) NOT NULL,
  `CouponID` varchar(20) DEFAULT NULL,
  `TotalValue` decimal(10,0) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Delivery` decimal(10,0) DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  `DeleteAt` datetime DEFAULT NULL,
  `AddressID` varchar(20) DEFAULT NULL,
  `PaymentMethod` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CouponID` (`CouponID`),
  KEY `AddressID` (`AddressID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CouponID`) REFERENCES `coupons` (`Id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`AddressID`) REFERENCES `address` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orderitems` (
  `Id` varchar(20) NOT NULL,
  `OrderID` varchar(20) NOT NULL,
  `FoodID` varchar(20) NOT NULL,
  `Quantity` int DEFAULT NULL,
  `Pick` tinyint DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Value` decimal(10,0) DEFAULT NULL,
  `ArriveAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `OrderID` (`OrderID`),
  KEY `FoodID` (`FoodID`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`Id`),
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`FoodID`) REFERENCES `foods` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reviews` (
  `Id` varchar(20) NOT NULL,
  `Point` int DEFAULT NULL,
  `UserID` varchar(20) NOT NULL,
  `TargetID` varchar(20) NOT NULL,
  `Comment` varchar(300) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `schedules` (
  `Id` varchar(20) NOT NULL,
  `AddressID` varchar(20) NOT NULL,
  `Interval` varchar(15) DEFAULT NULL,
  `Time` time DEFAULT NULL,
  `Pick` tinyint(1) DEFAULT NULL,
  `FoodID` varchar(20) NOT NULL,
  `UserID` varchar(20) NOT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserID` (`UserID`),
  KEY `FoodID` (`FoodID`),
  KEY `AddressID` (`AddressID`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`Id`),
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`FoodID`) REFERENCES `foods` (`Id`),
  CONSTRAINT `schedules_ibfk_3` FOREIGN KEY (`AddressID`) REFERENCES `address` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reports` (
  `Id` varchar(20) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Content` varchar(300) DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `ReplyAt` datetime DEFAULT NULL,
  `Reply` varchar(300) DEFAULT NULL,
  `Author` varchar(20) NOT NULL,
  `ReplyBy` varchar(20) DEFAULT NULL,
  `TargetID` varchar(20) NOT NULL,
  `ImageID` varchar(20) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Author` (`Author`),
  KEY `ReplyBy` (`ReplyBy`),
  KEY `ImageID` (`ImageID`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`Author`) REFERENCES `users` (`Id`),
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`ReplyBy`) REFERENCES `admin` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `notifications` (
  `Id` varchar(20) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Content` varchar(300) DEFAULT NULL,
  `IsRead` tinyint(1) DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `TargetID` varchar(20) NOT NULL,
  `GiftID` varchar(20) DEFAULT NULL,
  `Creator` varchar(25) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `GiftID` (`GiftID`),
  KEY `Creator` (`Creator`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`GiftID`) REFERENCES `coupons` (`Id`),
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`Creator`) REFERENCES `admin` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `confirmations` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(60) NOT NULL,
  `Token` varchar(6) NOT NULL,
  `Type` varchar(20) DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `ExpireAt` datetime DEFAULT NULL,
  `Status` tinyint DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ALTER TABLE foods
-- MODIFY Name VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
-- MODIFY Description VARCHAR(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- ALTER TABLE restaurants
-- MODIFY Name VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
-- MODIFY Address VARCHAR(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
-- MODIFY City VARCHAR(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
-- MODIFY District VARCHAR(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
-- MODIFY Ward VARCHAR(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
