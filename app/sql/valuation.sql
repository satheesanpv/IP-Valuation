-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: mysql
-- ------------------------------------------------------
-- Server version	5.5.9

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-11 13:23:51
CREATE DATABASE  IF NOT EXISTS `valuation` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `valuation`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: valuation
-- ------------------------------------------------------
-- Server version	5.5.9

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `idconfig` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `data` longtext,
  PRIMARY KEY (`idconfig`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COMMENT='Various config entries';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,'institutes','[{\"name\":\"Acharya NG Ranga Agricultural University\",\"location\":\"Rajendranagar\",\"district\":\"Hyderabad\",\"state\":\"A.P.\"},{\"name\":\"Aligarh Muslim University\",\"location\":\"\",\"district\":\"Aligarh\",\"state\":\"U.P.\"},{\"name\":\"Allahabad Agricultural Institute\",\"location\":\"\",\"district\":\"Allahabad\",\"state\":\"U.P\"},{\"name\":\"Anand Agricultural University\",\"location\":\"\",\"district\":\"Anand\",\"state\":\"Gujarat\"},{\"name\":\"Assam Agricultural University\",\"location\":\"Jorhat\",\"district\":\"Jorhat\",\"state\":\"Assam\"},{\"name\":\"Banaras Hindu University\",\"location\":\"\",\"district\":\"Varanasi\",\"state\":\"U.P.\"},{\"name\":\"Bidhan Chandra Krishi Viswavidyalaya\",\"location\":\"Mohanpur\",\"district\":\"Nadia\",\"state\":\"West Bengal\"},{\"name\":\"Birsa Agricultural University\",\"location\":\"Kanke\",\"district\":\"Ranchi\",\"state\":\"Jharkhand\"},{\"name\":\"Central Agricultural University\",\"location\":\"\",\"district\":\"Imphal\",\"state\":\"Manipur\"},{\"name\":\"Central Institute of Fisheries Education\",\"location\":\"\",\"district\":\"Mumbai\",\"state\":\"Maharashtra\"},{\"name\":\"Chandra Shekar Azad Univ. of Agriculture & Technology\",\"location\":\"\",\"district\":\"Kanpur\",\"state\":\"U.P\"},{\"name\":\"Chaudhary Charan Singh Haryana Agricultural University\",\"location\":\"\",\"district\":\"Hissar\",\"state\":\"Haryana\"},{\"name\":\"Chaudhary Sarwan Kumar Himachal Pradesh Krishi Vishvavidhalaya\",\"location\":\"Palampur\",\"district\":\"Kangra\",\"state\":\"Himachal Pradesh\"},{\"name\":\"Dr Balasaheb Sawant Konkan Krishi Vidyapeeth\",\"location\":\"Dapoli\",\"district\":\"Ratnagiri\",\"state\":\"Maharashtra\"},{\"name\":\"Dr Panjabrao Deshmukh Krishi Vidyapeeth\",\"location\":\"Krishi Nagar\",\"district\":\"Akola\",\"state\":\"Maharashtra\"},{\"name\":\"Dr Yashwant Singh Parmar Univ. of Horticulture & Forestry\",\"location\":\"Solan\",\"district\":\"Nauni\",\"state\":\"Himachal Pradesh\"},{\"name\":\"Govind Ballabh Pant University of Agriculture & Technology\",\"location\":\"Pantnagar\",\"district\":\"Udhamsingh Nagar\",\"state\":\"Uttarakhand\"},{\"name\":\"Guru Angad Dev University of Veterinary and Animal Sciences\",\"location\":\"\",\"district\":\"Ludhiana\",\"state\":\"Punjab\"},{\"name\":\"Indian Agricultural Research Institute\",\"location\":\"\",\"district\":\"Pusa\",\"state\":\"New Delhi\"},{\"name\":\"Indian Veterinary Research Institute\",\"location\":\"Izatnagar\",\"district\":\"Bareilly\",\"state\":\"U.P\"},{\"name\":\"Indira Gandhi Krishi Vishwavidyalaya\",\"location\":\"Krishak Nagar\",\"district\":\"Raipur\",\"state\":\"Chhattisgarh\"},{\"name\":\"Jawaharlal Nehru Krishi Vishwavidyalaya\",\"location\":\"Krishi Nagar\",\"district\":\"Jabalpur\",\"state\":\"M.P.\"},{\"name\":\"Junagadh Agriculture University\",\"location\":\"Moti Baug\",\"district\":\"Junagadh\",\"state\":\"Gujarat\"},{\"name\":\"Karnataka Veterinary Animal and Fisheries Science University\",\"location\":\"Nandinagar\",\"district\":\"Bidar\",\"state\":\"Karnataka\"},{\"name\":\"Kerala Agricultural University\",\"location\":\"Vellanikkara\",\"district\":\"Thrissur\",\"state\":\"Kerala\"},{\"name\":\"Maharana Pratap Univ. of Agriculture & Technology\",\"location\":\"\",\"district\":\"Udaipur\",\"state\":\"Rajasthan\"},{\"name\":\"Maharashtra Animal Science & Fishery University\",\"location\":\"\",\"district\":\"Nagpur\",\"state\":\"Maharashtra\"},{\"name\":\"Mahatma Phule Krishi Vidyapeeth\",\"location\":\"\",\"district\":\"Rahuri\",\"state\":\"Maharashtra\"},{\"name\":\"Marathwada Agricultural University\",\"location\":\"\",\"district\":\"Parbhani\",\"state\":\"Maharashtra\"},{\"name\":\"Nagaland University\",\"location\":\"\",\"district\":\"Medizipherma\",\"state\":\"Nagaland\"},{\"name\":\"Narendra Deva University of Agriculture & Technology\",\"location\":\"Kumarganj\",\"district\":\"Faizabad\",\"state\":\"U.P\"},{\"name\":\"National Dairy Research Institute\",\"location\":\"Karnal\",\"district\":\"Karnal\",\"state\":\"Haryana\"},{\"name\":\"Navsari Agricultural University\",\"location\":\"Vijalpore\",\"district\":\"Navsari\",\"state\":\"Gujarat\"},{\"name\":\"Orissa Univ. of Agriculture & Technology\",\"location\":\"Siripur\",\"district\":\"Bhubaneswar\",\"state\":\"Orissa\"},{\"name\":\"Punjab Agricultural University\",\"location\":\"\",\"district\":\"Ludhiana\",\"state\":\"Punjab\"},{\"name\":\"Rajasthan AgriculturalUniversity\",\"location\":\"Bikaner -334006\",\"district\":\"Bikaner\",\"state\":\"Rajasthan\"},{\"name\":\"Rajendra Agricultural University\",\"location\":\"Pusa\",\"district\":\"Samastipur\",\"state\":\"Bihar\"},{\"name\":\"Rajmata VRS Agricultural University\",\"location\":\"\",\"district\":\"Gwalior\",\"state\":\"Madhya Pradesh\"},{\"name\":\"Sardar Vallabh Bhai Patel Univ of Agriculture & Technology\",\"location\":\"Modipuram\",\"district\":\"Meerut\",\"state\":\"U.P\"},{\"name\":\"Sardarkrushinagar-Dantiwada Agricultural University\",\"location\":\"Sardarkrushinagar\",\"district\":\"Banaskantha\",\"state\":\"Gujarat\"},{\"name\":\"Sher-E-Kashmir Univ. of Agricultural Sciences & Technology\",\"location\":\"Railway Road\",\"district\":\"Jammu\",\"state\":\"J & K\"},{\"name\":\"Sher-E-Kashmir Univ. of Agricultural Sciences & Technology\",\"location\":\"Shalimar\",\"district\":\"Srinagar\",\"state\":\"J & K\"},{\"name\":\"Sri Venkateswara Veterinary University\",\"location\":\"Tirupati\",\"district\":\"Chittoor\",\"state\":\"A.P.\"},{\"name\":\"Tamil Nadu Agricultural University\",\"location\":\"\",\"district\":\"Coimbatore\",\"state\":\"Tamil Nadu\"},{\"name\":\"Tamil Nadu Veterinary & Animal Sciences University\",\"location\":\"Madhavaram Milk Colony\",\"district\":\"Chennai\",\"state\":\"Tamil Nadu\"},{\"name\":\"test\",\"location\":\"test\",\"district\":\"test\"},{\"name\":\"University of Agricultural Sciences\",\"location\":\"\",\"district\":\"Dharwad\",\"state\":\"Karnataka\"},{\"name\":\"University of Agricultural Sciences\",\"location\":\"Banglore- 560065\",\"district\":\"Banglore\",\"state\":\"Karnataka\"},{\"name\":\"University of Agricultural Sciences\",\"location\":\"\",\"district\":\"Raichur\",\"state\":\"Karnataka\"},{\"name\":\"University of Horticultural Sciences\",\"location\":\"Venkataramnagudem\",\"district\":\"West Godavari\",\"state\":\"A.P.\"},{\"name\":\"University of Horticultural Sciences\",\"location\":\"Navanagar\",\"district\":\"Bagalkot\",\"state\":\"Karnataka\"},{\"name\":\"UP Pandit Deen Dayal Upadhaya Pashu Chikitsa Vigyan Vishwa Vidhyalaya Evam\",\"location\":\"Go Anusandhan Sansthan\",\"district\":\"Mathura\",\"state\":\"U.P\"},{\"name\":\"Uttar Banga Krishi Vishwaviddyalaya\",\"location\":\"Pundibari\",\"district\":\"Cooch Behar\",\"state\":\"West Bengal\"},{\"name\":\"Vishwa Bharti\",\"location\":\"\",\"district\":\"Shantiniketan\",\"state\":\"West Bengal\"},{\"name\":\"West Bengal University of Animal & Fishery Sciences\",\"location\":\"68 KB Sarani\",\"district\":\"Kolkata\",\"state\":\"West Bengal\"}]');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valuation`
--

DROP TABLE IF EXISTS `valuation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `valuation` (
  `idvaluation` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `data` longtext,
  `iduser` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idvaluation`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valuation`
--

LOCK TABLES `valuation` WRITE;
/*!40000 ALTER TABLE `valuation` DISABLE KEYS */;
INSERT INTO `valuation` VALUES (1,'testing test','{\"technology\":\"Agriculture Engineering & ICT\",\"techType\":\"Machinery and Farm Equipments\",\"ipCategory\":\"Product Patent\",\"ipState\":\"Patent Granted\",\"valuationMethod\":\"Royalty Method\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"ry\":10,\"pr\":100,\"g\":100.01,\"name\":\"testing test\",\"institute\":\"terst\",\"pp\":\"59\",\"sv\":\"50000\",\"yr\":\"4\",\"dr\":\"10\",\"action\":\"CREATE\",\"results\":[{\"method\":\"Royalty Method\",\"value\":1052123.7468085}]}',1,NULL,NULL),(2,'testing test','{\"technology\":\"Agriculture Engineering & ICT\",\"techType\":\"Machinery and Farm Equipments\",\"ipCategory\":\"Product Patent\",\"ipState\":\"Patent Granted\",\"valuationMethod\":\"Royalty Method\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"ry\":10,\"pr\":100,\"g\":100.01,\"name\":\"testing test\",\"institute\":\"terst\",\"pp\":\"59\",\"sv\":\"50000\",\"yr\":\"4\",\"dr\":\"10\",\"action\":\"CREATE\",\"results\":[{\"method\":\"Royalty Method\",\"value\":631274.24808512}],\"adc\":\"10\",\"it\":\"30\"}',1,NULL,NULL),(3,'testing test','{\"technology\":\"Agriculture Engineering & ICT\",\"techType\":\"Machinery and Farm Equipments\",\"ipCategory\":\"Product Patent\",\"ipState\":\"Patent Granted\",\"valuationMethod\":\"Market Method\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"ry\":10,\"pr\":100,\"g\":100.01,\"name\":\"testing test\",\"institute\":\"terst\",\"pp\":\"10\",\"sv\":\"5000\",\"p\":\"10\",\"yr\":\"4\",\"dr\":\"10\",\"action\":\"VALUATION\",\"results\":[{\"method\":\"Market Method\",\"value\":18681.777586592}]}',3,NULL,NULL),(4,'testing test','{\"technology\":\"Agriculture Engineering & ICT\",\"techType\":\"Machinery and Farm Equipments\",\"ipCategory\":\"Product Patent\",\"ipState\":\"Patent Granted\",\"valuationMethod\":\"Market Method\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"ry\":10,\"pr\":100,\"g\":100.01,\"name\":\"testing test\",\"institute\":\"terst\",\"pp\":\"10\",\"sv\":\"5000\",\"p\":\"10\",\"yr\":\"4\",\"dr\":\"10\",\"action\":\"VALUATION\",\"results\":[{\"method\":\"Market Method\",\"value\":18681.777586592}]}',2,NULL,NULL),(5,'0','{\"technology\":\"Agriculture Engineering & ICT\",\"techType\":\"Machinery and Farm Equipments\",\"ipCategory\":\"Product Patent\",\"ipState\":\"Patent Granted\",\"valuationMethod\":\"Market Method\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"ry\":10,\"pr\":100,\"g\":100.01,\"name\":\"testing test\",\"institute\":\"terst\",\"pp\":\"10\",\"sv\":\"5000\",\"p\":\"10\",\"yr\":\"4\",\"dr\":\"10\",\"action\":\"VALUATION\",\"results\":[{\"method\":\"Market Method\",\"value\":18681.777586592}]}',1,NULL,NULL),(6,'testing test','{\"technology\":\"Agriculture Engineering & ICT\",\"techType\":\"Machinery and Farm Equipments\",\"ipCategory\":\"Product Patent\",\"ipState\":\"Patent Granted\",\"valuationMethod\":\"Cost Method\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"ry\":10,\"pr\":100,\"g\":100.01,\"name\":\"testing test\",\"institute\":\"test\",\"fcr\":\"2000\",\"ifc\":\"12333\",\"p\":\"134\",\"fxa\":\"133\",\"s\":\"10000\",\"op\":\"1\",\"t\":\"36\",\"d\":\"9.97\",\"action\":\"VALUATION\",\"results\":[{\"method\":\"Cost Method\",\"value\":103770.248634}]}',NULL,'2016-02-12 09:33:38','2016-02-12 09:33:38'),(7,'0','{\"technology\":\"Agriculture Engineering & ICT\",\"techType\":\"Machinery and Farm Equipments\",\"ipCategory\":\"Product Patent\",\"ipState\":\"Patent Granted\",\"valuationMethod\":\"Royalty Method\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"ry\":10,\"userId\":\"1\",\"pr\":100,\"g\":100.01,\"name\":\"satheesan\",\"institute\":\"IIT KGP\",\"pp\":\"156\",\"sv\":\"1234\",\"action\":\"VALUATION\",\"results\":[{\"method\":\"Royalty Method\",\"value\":87142.525120929}],\"yr\":4}',1,'2016-02-12 09:36:00','2016-02-12 09:36:00'),(8,'0','{\"technology\":\"Agriculture Engineering & ICT\",\"techType\":\"Machinery and Farm Equipments\",\"ipCategory\":\"Product Patent\",\"ipState\":\"Patent Granted\",\"valuationMethod\":\"Royalty Method\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"ry\":10,\"userId\":\"1\",\"pr\":100,\"g\":100.01,\"name\":\"testing test\",\"institute\":\"terst\",\"pp\":\"123\",\"sv\":\"123\",\"yr\":\"4\",\"action\":\"VALUATION\",\"results\":[{\"method\":\"Royalty Method\",\"value\":6848.5811336623}]}',1,'2016-02-12 09:40:35','2016-02-12 09:40:35'),(9,'sssa 124','',1,'2016-02-12 10:13:53','2016-02-12 11:00:50'),(10,'testing test','{\"name\":\"testing test\",\"institute\":\"test\",\"technology\":\"Agriculture Engineering & ICT\",\"techType\":\"Machinery and Farm Equipments\",\"ipCategory\":\"Product Patent\",\"ipState\":\"Patent Granted\",\"valuationMethod\":\"All\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"pr\":100,\"g\":100.01,\"fcr\":\"123\",\"ifc\":\"123\",\"pp\":\"10\",\"sv\":\"12\",\"p\":\"123\",\"yr\":\"4\",\"dr\":\"12\",\"adc\":\"1\",\"it\":\"12\",\"fxa\":\"13455\",\"oc\":\"3555\",\"s\":\"23455\",\"op\":\"1\",\"t\":\"36\",\"ry\":\"10\",\"psh\":\"10\",\"action\":\"VALUATION\",\"results\":[{\"method\":\"Cost Method\",\"value\":184245.945},{\"method\":\"Royalty Method\",\"value\":35.638848950202},{\"method\":\"Profit Split Method\",\"value\":0.122412480024},{\"method\":\"Market Method\",\"value\":1.1671283148731},{\"method\":\"All\",\"value\":46070.718347436}],\"d\":10,\"valuation\":46070.718347436,\"idvaluation\":\"10\"}',NULL,'2016-02-12 11:10:21','2016-02-12 12:04:21'),(11,'Madhu Parkridge','{\"technology\":\"Crop Science\",\"techType\":\"Plant varities\",\"ipCategory\":\"Process Patent\",\"ipState\":\"Patent Filed\",\"valuationMethod\":\"Royalty Method\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"ry\":10,\"userId\":\"1\",\"idvaluation\":\"11\",\"pr\":100,\"g\":100.01,\"name\":\"Madhu Parkridge\",\"institute\":\"IIT KGP\",\"pp\":\"10\",\"sv\":\"30000\",\"yr\":\"4\",\"dr\":\"10\",\"adc\":\"10\",\"it\":\"10\",\"results\":[{\"method\":\"Royalty Method\",\"value\":85596.508214932}],\"valuation\":85596.508214932}',1,'2016-02-16 05:29:31','2016-02-16 06:29:23'),(12,'testing test','{\"technology\":\"Agriculture Engineering & ICT\",\"techType\":\"Machinery and Farm Equipments\",\"ipCategory\":\"Product Patent\",\"ipState\":\"Patent Granted\",\"valuationMethod\":\"Royalty Method\",\"pricingStratagy\":\"Same as competing product\",\"expectedGrowth\":\"Business as Usual\",\"ry\":10,\"userId\":\"1\",\"idvaluation\":null,\"pr\":100,\"g\":100.01,\"institute\":\"Kerala Agricultural University, Vellanikkara, Thrissur, Kerala\",\"name\":\"testing test\",\"pp\":\"10\",\"sv\":\"20000\",\"yr\":\"5\",\"dr\":\"10\",\"results\":[{\"method\":\"Royalty Method\",\"value\":71330.423512443}],\"valuation\":71330.423512443}',1,'2016-03-03 12:00:12','2016-03-03 12:00:12');
/*!40000 ALTER TABLE `valuation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `institute` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'satheesan','satheesan','satheesan@gmail.com','09849066526','$2y$10$rROzc09o4hpZ.U4L8.F7reBz8Lxx89SKKyeu3oMfhlgX419G5c8cS','Admin','Acharya NG Ranga Agricultural University, Rajendranagar, Hyd'),(3,'test1','test user 1','test@test.com',NULL,'$2y$10$jruUapJoonIAZzSxeyMIUOi2FXVTVKjoH538DAjRTQ9iQhaPbevJC','User','IIT KGP'),(10,'satheesan1','satheesan','satheesan@gmail.com','09849066526','$2y$10$li1isZ9uA49F0TF91kEfPOsheW05NNrmEh8PmrBIITWN1PXB.5UUG','User','Assam Agricultural University, Jorhat, Jorhat, Assam'),(12,'satheesan2','satheesan','satheesan@gmail.com',NULL,'$2y$10$f4cr/6SwZnlTsHXPOUSNFOsGsIbvzYMGFX3pi10zgtYHV2q9ix1fe','User','test'),(13,'satheesan3','satheesan','satheesan@gmail.com',NULL,'$2y$10$hNpvAlrLRgDo14XFbXrrHOAZkZg3XTxlMsnQMT6heH4f0IMpglH8S','User',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-11 13:23:52
