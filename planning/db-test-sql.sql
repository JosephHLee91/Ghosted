CREATE TABLE `testimonial`(
    `testimonial_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `testimonial_review` TEXT NOT NULL,
    `testimonial_rating` INT NOT NULL,
    `fk_user_id` INT NOT NULL
);
ALTER TABLE
    `testimonial` ADD PRIMARY KEY(`testimonial_id`);
ALTER TABLE
    `testimonial` ADD INDEX `testimonial_fk_user_id_index`(`fk_user_id`);
CREATE TABLE `role`(
    `role_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `role_type` INT NOT NULL
);
ALTER TABLE
    `role` ADD PRIMARY KEY(`role_id`);
CREATE TABLE `job_applied`(
    `job_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `job_title` VARCHAR(255) NOT NULL,
    `job_company` VARCHAR(255) NOT NULL,
    `job_date_applied` DATE NOT NULL,
    `job_link` VARCHAR(255) NOT NULL,
    `job_status` VARCHAR(255) NOT NULL,
    `job_location` VARCHAR(255) NULL,
    `fk_resume_id` INT NOT NULL
);
ALTER TABLE
    `job_applied` ADD PRIMARY KEY(`job_id`);
ALTER TABLE
    `job_applied` ADD INDEX `job_applied_fk_resume_id_index`(`fk_resume_id`);
CREATE TABLE `resume`(
    `resume_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `resume_file` BINARY(16) NOT NULL,
    `resume_name` VARCHAR(255) NULL,
    `fk_user_id` INT NOT NULL
);
ALTER TABLE
    `resume` ADD PRIMARY KEY(`resume_id`);
ALTER TABLE
    `resume` ADD INDEX `resume_fk_user_id_index`(`fk_user_id`);
CREATE TABLE `user`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `user` ADD PRIMARY KEY(`user_id`);
CREATE TABLE `user_role`(
    `user_role_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `fk_role_id` INT NOT NULL,
    `fk_user_id` INT NOT NULL
);
ALTER TABLE
    `user_role` ADD PRIMARY KEY(`user_role_id`);
ALTER TABLE
    `user_role` ADD INDEX `user_role_fk_role_id_index`(`fk_role_id`);
ALTER TABLE
    `user_role` ADD INDEX `user_role_fk_user_id_index`(`fk_user_id`);
CREATE TABLE `cover_letter`(
    `cover_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `cover_file` BINARY(16) NOT NULL,
    `cover_name` VARCHAR(255) NULL,
    `fk_user_id` INT NOT NULL
);
ALTER TABLE
    `cover_letter` ADD PRIMARY KEY(`cover_id`);
ALTER TABLE
    `cover_letter` ADD INDEX `cover_letter_fk_user_id_index`(`fk_user_id`);
CREATE TABLE `resource`(
    `resource_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `resource_title` VARCHAR(255) NOT NULL,
    `resource_link` VARCHAR(255) NOT NULL,
    `resource_type` VARCHAR(255) NOT NULL,
    `fk_user_id` INT NOT NULL
);
ALTER TABLE
    `resource` ADD PRIMARY KEY(`resource_id`);
ALTER TABLE
    `resource` ADD INDEX `resource_fk_user_id_index`(`fk_user_id`);
ALTER TABLE
    `testimonial` ADD CONSTRAINT `testimonial_fk_user_id_foreign` FOREIGN KEY(`fk_user_id`) REFERENCES `user`(`user_id`);
ALTER TABLE
    `user_role` ADD CONSTRAINT `user_role_fk_role_id_foreign` FOREIGN KEY(`fk_role_id`) REFERENCES `role`(`role_id`);
ALTER TABLE
    `user_role` ADD CONSTRAINT `user_role_fk_user_id_foreign` FOREIGN KEY(`fk_user_id`) REFERENCES `user`(`user_id`);
ALTER TABLE
    `resource` ADD CONSTRAINT `resource_fk_user_id_foreign` FOREIGN KEY(`fk_user_id`) REFERENCES `user`(`user_id`);
ALTER TABLE
    `cover_letter` ADD CONSTRAINT `cover_letter_fk_user_id_foreign` FOREIGN KEY(`fk_user_id`) REFERENCES `user`(`user_id`);
ALTER TABLE
    `job_applied` ADD CONSTRAINT `job_applied_fk_resume_id_foreign` FOREIGN KEY(`fk_resume_id`) REFERENCES `resume`(`resume_id`);
ALTER TABLE
    `resume` ADD CONSTRAINT `resume_fk_user_id_foreign` FOREIGN KEY(`fk_user_id`) REFERENCES `user`(`user_id`);