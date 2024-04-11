USE dv360_db;

CREATE TABLE `trn_win_log_id`(
	`win_log_id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`created` datetime(3) NOT NULL DEFAULT now(3),
	`modified` datetime(3) NULL,
	`remarks` varchar(200) NULL,
	CONSTRAINT `pk_trn_win_log_id` PRIMARY KEY (`win_log_id` ASC)
);