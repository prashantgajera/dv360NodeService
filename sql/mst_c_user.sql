USE dv360_db;

CREATE TABLE `mst_c_user`(
	`c_user_id` int AUTO_INCREMENT NOT NULL,
	`c_user_name` varchar(200) NOT NULL,
	`c_password` varchar(200) NOT NULL,
	`client_id` int NOT NULL,
	`is_admin` Tinyint NOT NULL DEFAULT 0,
	`is_active` Tinyint NOT NULL DEFAULT 0,
	`created` datetime(3) NOT NULL DEFAULT now(3),
	`modified` datetime(3) NULL,
	`remarks` varchar(200) NULL,
	CONSTRAINT `pk_mst_c_user` PRIMARY KEY (`c_user_id` ASC),
	CONSTRAINT `fk1_mst_c_user` FOREIGN KEY (`client_id`) REFERENCES mst_client(`client_id`),
	CONSTRAINT `uniq1_mst_c_user` UNIQUE (`c_user_name`, `client_id`)
);