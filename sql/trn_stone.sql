USE dv360_db;

CREATE TABLE `trn_stone`(
	`stone_id` bigint AUTO_INCREMENT NOT NULL,
	`stone_code` varchar(200) NOT NULL,
	`certificate_no` varchar(200) NOT NULL,
	`client_id` int NOT NULL,
	`size` varchar(200) NOT NULL,
	`shape` varchar(200) NOT NULL,
	`color` varchar(200) NOT NULL,
	`clarity` varchar(200) NOT NULL,
	`video_link` varchar(1000) NULL,
	`photo_link1` varchar(1000) NULL,
	`photo_link2` varchar(1000) NULL,
	`photo_link3` varchar(1000) NULL,
	`photo_link4` varchar(1000) NULL,
	`photo_link5` varchar(1000) NULL,
	`invoice_no` varchar(200) NULL,
	`win_user_id` int NOT NULL,
	`video_created_user_id` int NULL,
	`created` datetime(3) NOT NULL DEFAULT now(3),
	`modified` datetime(3) NULL,
	`remarks` varchar(200) NULL,
	CONSTRAINT `pk_trn_stone` PRIMARY KEY (`stone_id` ASC),
	CONSTRAINT `fk1_trn_stone` FOREIGN KEY (`win_user_id`) REFERENCES mst_win_user(`win_user_id`),
	CONSTRAINT `fk2_trn_stone` FOREIGN KEY (`client_id`) REFERENCES mst_client(`client_id`),
	CONSTRAINT `uniq1_trn_stone` UNIQUE (`client_id`, `stone_code`)
);