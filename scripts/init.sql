CREATE DATABASE IF NOT EXISTS kuclap;
USE kuclap;

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_name` text NOT NULL,
  `reviews` mediumtext NOT NULL,
  `author` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
);