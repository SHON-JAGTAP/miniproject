-- MySQL dump 10.13  Distrib 9.0.1, for Win64 (x86_64)
--
-- Host: localhost    Database: new_turf
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `age` int NOT NULL,
  `experience` int DEFAULT '0',
  `position` varchar(50) NOT NULL,
  `skill` int NOT NULL,
  `credits` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `players_chk_1` CHECK (((`skill` >= 1) and (`skill` <= 10)))
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'shon jagtap',18,0,'Defender',5,24,'2025-11-07 19:46:13'),(2,'atharv',17,2,'Defender',9,31,'2025-11-07 19:56:16'),(3,'om',19,6,'Forward',7,30,'2025-11-07 19:56:34'),(4,'jay',18,5,'Midfielder',7,30,'2025-11-07 19:57:32'),(5,'adafsf',18,5,'Forward',5,30,'2025-11-07 19:57:40'),(6,'dffef',18,5,'Goalkeeper',5,30,'2025-11-07 19:57:57'),(7,'ereeee',18,3,'Midfielder',4,30,'2025-11-07 19:58:18'),(8,'qafqwfwf',18,0,'Forward',5,30,'2025-11-07 19:58:24'),(9,'erfearere',18,0,'Forward',5,30,'2025-11-07 19:58:29'),(10,'efefererer',18,0,'Forward',5,30,'2025-11-07 19:58:33'),(11,'gggggg',18,0,'Forward',5,30,'2025-11-07 19:58:39'),(12,'bbbbffxv',18,4,'Forward',5,30,'2025-11-07 19:59:01'),(13,'b',18,8,'Forward',5,30,'2025-11-07 19:59:10'),(14,'gh',18,9,'Defender',5,30,'2025-11-07 19:59:25'),(15,'hdmsbdsabm',18,10,'Forward',5,30,'2025-11-07 19:59:35'),(16,'efje',18,20,'Forward',5,30,'2025-11-07 19:59:54'),(17,'fgfg',18,6,'Forward',5,30,'2025-11-07 20:00:16'),(18,'vvv',18,5,'Forward',5,30,'2025-11-07 20:00:24'),(19,'bbbb',18,9,'Forward',5,30,'2025-11-07 20:00:33'),(20,'hjhj',18,9,'Forward',5,30,'2025-11-07 20:00:44'),(21,'ds',18,8,'Forward',5,30,'2025-11-07 20:00:53'),(22,'atharv',20,3,'Forward',6,30,'2025-11-09 07:13:06');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricing_rules`
--

DROP TABLE IF EXISTS `pricing_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pricing_rules` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `turf_id` bigint NOT NULL,
  `base_price` decimal(10,2) NOT NULL DEFAULT '1000.00',
  `weather_condition` enum('perfect','normal','cloudy','rainy','hot','cold') NOT NULL,
  `price_multiplier` decimal(3,2) NOT NULL DEFAULT '1.00',
  `time_slot` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `turf_id` (`turf_id`),
  CONSTRAINT `pricing_rules_ibfk_1` FOREIGN KEY (`turf_id`) REFERENCES `turf` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricing_rules`
--

LOCK TABLES `pricing_rules` WRITE;
/*!40000 ALTER TABLE `pricing_rules` DISABLE KEYS */;
INSERT INTO `pricing_rules` VALUES (5,1759600312644,1000.00,'perfect',1.20,'morning','2025-11-09 09:03:55'),(6,1759600312644,1000.00,'normal',1.00,'morning','2025-11-09 09:03:55'),(7,1759600312644,1000.00,'cloudy',0.90,'morning','2025-11-09 09:03:55'),(8,1759600312644,1000.00,'rainy',0.70,'morning','2025-11-09 09:03:55'),(9,1759600312644,1000.00,'hot',0.80,'afternoon','2025-11-09 09:03:55'),(10,1759600312644,1000.00,'cold',0.80,'evening','2025-11-09 09:03:55'),(11,1759682644514,1000.00,'perfect',1.20,'morning','2025-11-09 09:03:55'),(12,1759682644514,1000.00,'normal',1.00,'morning','2025-11-09 09:03:55'),(13,1759682644514,1000.00,'cloudy',0.90,'morning','2025-11-09 09:03:55'),(14,1759682644514,1000.00,'rainy',0.70,'morning','2025-11-09 09:03:55'),(15,1759682644514,1000.00,'hot',0.80,'afternoon','2025-11-09 09:03:55'),(16,1759682644514,1000.00,'cold',0.80,'evening','2025-11-09 09:03:55');
/*!40000 ALTER TABLE `pricing_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `team_name` varchar(100) NOT NULL,
  `players` json NOT NULL,
  `total_credits` int DEFAULT '0',
  `performance_data` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turf`
--

DROP TABLE IF EXISTS `turf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turf` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=1759682644515 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turf`
--

LOCK TABLES `turf` WRITE;
/*!40000 ALTER TABLE `turf` DISABLE KEYS */;
INSERT INTO `turf` VALUES (1759600312644,'shon jagtap','at post datodi','nwe branded',1300.00,'nsdhshdk','cricket','/uploads/1759600312634.png'),(1759682644514,'hyper','west side of bandra','fsfsf',1200.00,'synthetic turf','football only','/uploads/1759682644492.png');
/*!40000 ALTER TABLE `turf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','owner') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'hak@gmail.com','$2b$10$rZBvXVsq9zxcGkZoKmdx9OXzGIIPXrMO/Gz6WyEcb7y9RujVbu126','user','2025-09-27 09:09:45','hfjt'),(2,'shon@gmail.com','$2b$10$xSoGXV.tXUkJovhwESOgee/fpDNTSjDOo0vki68Fj4bvGK/GqMlKG','user','2025-09-27 09:10:19','om'),(3,'om@gmail.com','$2b$10$i53D7WhHyxLTr/3YorQuqeAEFgoWTmg.YmreGnMAJZR9e1SYgUQGC','user','2025-09-27 09:12:14','ommm'),(4,'ffgg@gdfg','$2b$10$UvIeI0c/vkb0BsRs5zOsPeg66rW38kSxyD3WleNdo9zgpyIwUeu9O','user','2025-09-27 17:40:28','fhrturu'),(5,'hyper@gmail.com','$2b$10$lolCT0wDjKnVuu1Ms1cOQOYRAU.tu3OxMeOOG5gqjJw5cfZnVMoKe','user','2025-09-27 17:41:33','hyper'),(6,'sar@gmail.com','$2b$10$dEEUSl9cwmngGAXs3xBwsOmxnoLC2qDaniRlySz0cFxpamlmNeaXq','user','2025-09-28 14:03:05','sarthak'),(7,'sho@gmail.com','$2b$10$JPdPJUc3pIessxPUM.8b1.mSjqsLa156mktirKCa9eGjr1RIFzdx6','user','2025-09-28 14:36:39','sho'),(8,'own@gmail.com','$2b$10$vRSUdAImYx3.mPLc7fUwF.4liLqpteMO.LZsjdZJJaQ.adL5H1Gm6','owner','2025-09-30 07:48:35','owner'),(9,'mam@gmail.com','$2b$10$IzRMjRTteoJPIBBw3R0MTuXnLJT2SuEwQWuRdbNaZLvvUFmT1nSqG','owner','2025-10-04 13:06:42','mam'),(10,'dot@gmail.com','$2b$10$6.rIjptyfBoDoKY7HTDTyO9VbGe/VMqek76lHmSxV9QF2c4U5z/gC','user','2025-11-06 18:15:09','dot'),(11,'tom@gmail.com','$2b$10$VsvRVlSG.mk5qPWnPiSSDO5r7H52Zt/lDnMxaCJji.nf7eE0MMr62','user','2025-11-08 09:31:00','tom'),(12,'jaydeep@gmail.com','$2b$10$0sfIdQYGmmy2it3GkLjcGuCkocTypA0BVHKNx0k79BrPjL1w.gfO2','user','2026-01-09 16:46:53','jaydeep');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-03 10:36:24
