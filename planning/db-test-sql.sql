CREATE TABLE `testimonials`(
    `testimonial_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `testimonial_review` TEXT NOT NULL,
    `testimonial_rating` INT NOT NULL,
    `fk_user_id` INT NOT NULL
);
ALTER TABLE
    `testimonials` ADD PRIMARY KEY(`testimonial_id`);
ALTER TABLE
    `testimonials` ADD INDEX `testimonials_fk_user_id_index`(`fk_user_id`);
CREATE TABLE `jobs_applied`(
    `job_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `job_title` VARCHAR(255) NOT NULL,
    `job_company` VARCHAR(255) NOT NULL,
    `job_date_applied` DATE NOT NULL,
    `job_link` VARCHAR(255) NOT NULL,
    `job_status` VARCHAR(255) NOT NULL,
    `job_location` VARCHAR(255) NOT NULL,
    `fk_user_id` INT NOT NULL
);
ALTER TABLE
    `jobs_applied` ADD PRIMARY KEY(`job_id`);
ALTER TABLE
    `jobs_applied` ADD INDEX `jobs_applied_fk_user_id_index`(`fk_user_id`);
CREATE TABLE `resume`(
    `resume_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `resume_file` BINARY(16) NOT NULL,
    `fk_job_id` INT NOT NULL
);
ALTER TABLE
    `resume` ADD PRIMARY KEY(`resume_id`);
ALTER TABLE
    `resume` ADD INDEX `resume_fk_job_id_index`(`fk_job_id`);
CREATE TABLE `users`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `users` ADD PRIMARY KEY(`user_id`);
CREATE TABLE `resources`(
    `resource_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `resource_title` VARCHAR(255) NOT NULL,
    `resource_link` VARCHAR(255) NOT NULL,
    `resource_type` VARCHAR(255) NOT NULL,
    `fk_user_id` INT NOT NULL
);
ALTER TABLE
    `resources` ADD PRIMARY KEY(`resource_id`);
ALTER TABLE
    `resources` ADD INDEX `resources_fk_user_id_index`(`fk_user_id`);
ALTER TABLE
    `testimonials` ADD CONSTRAINT `testimonials_fk_user_id_foreign` FOREIGN KEY(`fk_user_id`) REFERENCES `users`(`user_id`);
ALTER TABLE
    `resources` ADD CONSTRAINT `resources_fk_user_id_foreign` FOREIGN KEY(`fk_user_id`) REFERENCES `users`(`user_id`);
ALTER TABLE
    `jobs_applied` ADD CONSTRAINT `jobs_applied_fk_user_id_foreign` FOREIGN KEY(`fk_user_id`) REFERENCES `users`(`user_id`);
ALTER TABLE
    `resume` ADD CONSTRAINT `resume_fk_job_id_foreign` FOREIGN KEY(`fk_job_id`) REFERENCES `jobs_applied`(`job_id`);