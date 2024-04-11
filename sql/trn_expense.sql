USE dv360_db;

CREATE TABLE `trn_expense`(
	`expense_id` bigint NOT NULL,
	`expense_name` varchar(200) NOT NULL,
	`amount` numeric(18, 2) NOT NULL,
	`user_id` int NOT NULL,
	`created` datetime(3) NOT NULL DEFAULT now(3),
	`modified` datetime(3) NULL,
	`remarks` varchar(200) NULL,
	`expense_date` datetime(3) NOT NULL,
	CONSTRAINT `pk_trn_expense` PRIMARY KEY (`expense_id` ASC)
);