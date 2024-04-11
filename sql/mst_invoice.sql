USE dv360_db;

CREATE TABLE `mst_invoice`(
	`invoice_id` int AUTO_INCREMENT NOT NULL,
	`client_id` int NOT NULL,
	`total_stone` int NOT NULL,
	`total_weight` varchar(200) NOT NULL,
	`from_date` date NOT NULL,
	`to_date` date NOT NULL,
	`rate` varchar(200) NOT NULL,
	`total_amount` numeric(18, 2) NOT NULL,
	`cgst_per` numeric(18, 2) NULL,
	`sgst_per` numeric(18, 2) NULL,
	`igst_per` numeric(18, 2) NULL,
	`cgst_amount` numeric(18, 2) NULL,
	`sgst_amount` numeric(18, 2) NULL,
	`igst_amount` numeric(18, 2) NULL,
	`final_amount` numeric(18, 2) NOT NULL,
	`received_amount` numeric(18, 2) NULL,
	`pending_amount` numeric(18, 2) NULL,
	`payment_received_user_id` int NULL,
	`payment_received_date` datetime(3) NULL,
	`cheque_no` varchar(200) NULL,
	`created` datetime(3) NOT NULL DEFAULT now(3),
	`modified` datetime(3) NULL,
	`remarks` varchar(200) NULL,
	CONSTRAINT `pk_mst_invoice` PRIMARY KEY (`invoice_id` ASC)
);