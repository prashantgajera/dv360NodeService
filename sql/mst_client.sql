USE dv360_db;

CREATE TABLE `mst_client`(
	`client_id` int AUTO_INCREMENT NOT NULL,
	`c_name` varchar(200) NOT NULL,
	`address` varchar(1000) NOT NULL,
	`city` varchar(200) NOT NULL,
	`state` varchar(200) NOT NULL,
	`country` varchar(200) NOT NULL,
	`phone_no` varchar(200) NOT NULL,
	`contact_person_name` varchar(200) NOT NULL,
	`contact_person_mobile` varchar(200) NOT NULL,
	`email_id` varchar(200) NOT NULL,
	`pan_no` varchar(200) NULL,
	`gst_no` varchar(200) NULL,
	`acc_no` varchar(200) NULL,
	`ifsc_code` varchar(200) NULL,
	`bank_name` varchar(200) NULL,
	`bank_branch` varchar(200) NULL,
	`created` datetime(3) NOT NULL DEFAULT now(3),
	`modified` datetime(3) NULL,
	`remarks` varchar(200) NULL,
	CONSTRAINT `pk_mst_client` PRIMARY KEY (`client_id` ASC)
);