USE dv360_db;

CREATE TABLE `trn_web_log_id`(
	`web_log_id` bigint AUTO_INCREMENT NOT NULL,
	`c_user_id` int NOT NULL,
	`ip_address` varchar(200) NULL,
	`created` datetime(3) NOT NULL DEFAULT now(3),
	`modified` datetime(3) NULL,
	`remarks` varchar(200) NULL,
	CONSTRAINT `pk_trn_web_log_id` PRIMARY KEY (`web_log_id` ASC)
);