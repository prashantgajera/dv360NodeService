USE dv360_db;

CREATE TABLE `mst_win_user`(
	`win_user_id` int AUTO_INCREMENT NOT NULL,
	`win_user_name` varchar(200) NOT NULL,
	`win_password` varchar(200) NOT NULL,
	`is_admin` Tinyint NOT NULL DEFAULT 0,
	`is_active` Tinyint NOT NULL DEFAULT 0,
	`created` datetime(3) NOT NULL,
	`modified` datetime(3) NULL,
	`remarks` varchar(200) NULL,
	CONSTRAINT `pk_mst_win_user` PRIMARY KEY (`win_user_id` ASC)
);