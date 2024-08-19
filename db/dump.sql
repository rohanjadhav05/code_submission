-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: code_champ
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `code`
--

DROP TABLE IF EXISTS `code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `code` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `problem_id` int DEFAULT NULL,
  `starter_code` json DEFAULT NULL,
  `base_code` varchar(4000) DEFAULT NULL,
  `language` enum('cpp','java','javascript','c#','python') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `problem_id` (`problem_id`),
  CONSTRAINT `code_ibfk_1` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code`
--

LOCK TABLES `code` WRITE;
/*!40000 ALTER TABLE `code` DISABLE KEYS */;
INSERT INTO `code` VALUES (1,1,'\"class Solution {\\n    public boolean lemonadeChange(int[] bills) {\\n        // Your implementation here \\n    } \\n}\"','class Main {\n    public static void main(String[] args){\n        \n        String bills_str = System.getenv(\"bills\");\n        String[] bills_str_arr = bills_str.split(\",\");\n        int[] bills = new int[bills_str_arr.length];\n        for(int i=0;i<bills.length;i++)\n          bills[i] = Integer.parseInt(bills_str_arr[i]);\n        Solution s = new Solution();\n        boolean result = s.lemonadeChange(bills);\n        boolean expected_result = Boolean. parseBoolean(args[0]);\n        if(expected_result != result){\n          try (BufferedWriter writer = new BufferedWriter(new FileWriter(\"output.txt\"))) { \n            writer.write(Boolean.toString(result)); \n          } catch (IOException e) {\n            System.out.println(\"An error occurred while writing to the file.\");        \n            e.printStackTrace();    \n          } \n        }\n        \n    }\n}','java'),(2,1,'\"class Solution {\\npublic:\\n    bool lemonadeChange(vector<int>& bills) {\\n        // write the code here\\n        return true; \\n    }\\n};\"','int main(int argc, char* argv[]) {\n    \n    string str = getenv(\"bills\");\n\n    vector<int> bills;\n    stringstream ss(str);\n    string item;\n\n    while (getline(ss, item, \',\')) {\n        bills.push_back(stoi(item));\n    }\n\n    bool expected_result = (string(argv[1]) == \"true\");\n\n    Solution s;\n    bool result = s.lemonadeChange(bills);\n\n    if (expected_result != result) {\n        ofstream outfile(\"output.txt\");\n        outfile << boolalpha << result;\n    }\n     return 0;\n}\n','cpp');
/*!40000 ALTER TABLE `code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem`
--

DROP TABLE IF EXISTS `problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `difficulty` enum('Easy','Medium','Hard') NOT NULL,
  `topic` varchar(1000) DEFAULT NULL,
  `constraints` json DEFAULT NULL,
  `base_code` json DEFAULT NULL,
  `timeout_sec` int DEFAULT NULL,
  `max_memory` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem`
--

LOCK TABLES `problem` WRITE;
/*!40000 ALTER TABLE `problem` DISABLE KEYS */;
INSERT INTO `problem` VALUES (1,'Lemonade Change','<div style=\"color: white; font-size: 0.875rem;\">\n  <p style=\"margin-bottom: 0.5rem;\">\n    At a lemonade stand, each lemonade costs <strong style=\"color: #38a169;\">$5</strong>. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills).\n  </p>\n  <p style=\"margin-bottom: 0.5rem;\">\n    Note that you do not have any change in hand at first.\n  </p>\n  <p style=\"margin-bottom: 0.5rem;\">\n    Given an integer array <code style=\"background-color: #1f2937; color: #fbbf24; padding: 0.125rem 0.25rem; border-radius: 0.25rem;\">bills</code> where <code style=\"background-color: #1f2937; color: #fbbf24; padding: 0.125rem 0.25rem; border-radius: 0.25rem;\">bills[i]</code> is the bill the ith customer pays, return <strong style=\"color: #38a169;\">true</strong> if you can provide every customer with the correct change, or <strong style=\"color: #f56565;\">false</strong> otherwise.\n  </p>\n</div>','Easy','Array, Greedy','{\"1\": \"1 <= bills.length <= 105\", \"2\": \"bills[i] is either 5, 10, or 20\"}','{\"Java\": \"class Solution {\\n public boolean lemonadeChange(int[] bills) {\\n }\\n}\"}',5,20),(2,'Two Sum','Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n You may assume that each input would have exactly one solution, and you may not use the same element twice.\n You can return the answer in any order.','Easy','Array, Hash Table','{\"1\": \"2 <= nums.length <= 104\", \"2\": \"-109 <= nums[i] <= 109\", \"3\": \"-109 <= target <= 109\", \"4\": \"Only one valid answer exists.\"}','{\"Java\": \"class Solution {\\n public int[] twoSum(iint[] nums, int target) {\\n }\\n}\"}',5,20);
/*!40000 ALTER TABLE `problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testcase`
--

DROP TABLE IF EXISTS `testcase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testcase` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `problem_id` int DEFAULT NULL,
  `input` json NOT NULL,
  `explanation` varchar(5000) DEFAULT NULL,
  `output` json DEFAULT NULL,
  `isVisible` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `problem_id` (`problem_id`),
  CONSTRAINT `testcase_ibfk_1` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testcase`
--

LOCK TABLES `testcase` WRITE;
/*!40000 ALTER TABLE `testcase` DISABLE KEYS */;
INSERT INTO `testcase` VALUES (1,1,'{\"bills\": [5, 5, 5, 10, 20]}','<p>From the first 3 customers, we collect three $5 bills in order.</p>\n     <p>From the fourth customer, we collect a $10 bill and give back a $5.</p>\n     <p>From the fifth customer, we give a $10 bill and a $5 bill.</p>\n     <p>Since all customers got correct change, we output <strong>true</strong>.</p>','[false]',1),(2,1,'{\"bills\": [5, 5, 10, 10, 20]}','<p>From the first two customers in order, we collect two $5 bills.</p>\n     <p>For the next two customers in order, we collect a $10 bill and give back a $5 bill.</p>\n     <p>For the last customer, we can not give the change of $15 back because we only have two $10 bills.</p>\n     <p>Since not every customer received the correct change, the answer is <strong>false</strong>.</p>','[false]',1);
/*!40000 ALTER TABLE `testcase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_solutions`
--

DROP TABLE IF EXISTS `user_solutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_solutions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `problem_id` int DEFAULT NULL,
  `lanugages` enum('cpp','java','javascript','c#','python') DEFAULT NULL,
  `solution` text,
  `submit_time` timestamp NULL DEFAULT NULL,
  `score` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `problem_id` (`problem_id`),
  CONSTRAINT `user_solutions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_solutions_ibfk_2` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_solutions`
--

LOCK TABLES `user_solutions` WRITE;
/*!40000 ALTER TABLE `user_solutions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_solutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `current_level` int DEFAULT NULL,
  `avatar_url` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2024-08-19 19:40:16
