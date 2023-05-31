drop database if exists ghosted;
create database ghosted;
use ghosted;

-- create tables
create table `user` (
	user_id int primary key auto_increment,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    username varchar(255) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);


create table `role` (
    role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table user_role (
    user_id int not null,
    role_id int not null,
    constraint pk_user_role
        primary key (user_id, role_id),
    constraint fk_user_role_user_id
        foreign key (user_id)
        references user(user_id),
    constraint fk_user_role_role_id
        foreign key (role_id)
        references `role`(role_id)
);

create table `resource` (
	resource_id int primary key auto_increment,
    resource_title varchar(255) not null,
    resource_link varchar(255) not null,
    resource_type varchar(255) not null,
    user_id int not null,
    constraint fk_resource_user_id
		foreign key (user_id)
        references `user`(user_id)
);

create table cover_letter (
	cover_id int primary key auto_increment,
    cover_file binary not null,
    cover_name varchar(255) null,
    user_id int not null,
    constraint fk_cover_letter_user_id
		foreign key (user_id)
        references `user`(user_id)
);

create table testimonial (
	testimonial_id int primary key auto_increment,
    testimonial_review text not null,
    testimonial_rating int not null,
    user_id int not null,
    constraint fk_testimonial_user_id
		foreign key (user_id)
        references `user`(user_id)
);

create table `resume` (
	resume_id int primary key auto_increment,
    resume_file binary null,
    resume_name varchar(255) null,
    user_id int not null,
    constraint fk_resume_user_id
		foreign key (user_id)
        references `user`(user_id)
);

create table job_applied (
	job_id int primary key auto_increment,
    job_title varchar(255) not null,
    job_company varchar(255) not null,
    job_date_applied date not null,
    job_link varchar(255) not null,
    job_status varchar(15) not null,
    job_location varchar(255) null,
    resume_id int not null,
    constraint fk_job_applied_resume_id
		foreign key (resume_id)
        references `resume`(resume_id)
);


-- insert mock data

insert into `role` (`name`) values
    ('USER'),
    ('ADMIN');
    
-- passwords are set to "P@ssw0rd!"
insert into `user` (first_name, last_name, username, password_hash, enabled)
    values
    ('John', 'Smith', 'john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('Sally', 'Jones', 'sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);
    
insert into user_role
    values
    (1, 2),
    (2, 1);
    
insert into `resume`(resume_id, resume_file, resume_name, user_id) values
        (1, null, 'Joe\'s Resume', 1),
        (2, null, 'Someone\'s Resume', 2);
    
insert into job_applied(job_id, job_title, job_company, job_date_applied, job_link, job_status, job_location, resume_id) values
        (1, 'Junior Developer', 'Dev10', '2020-01-01', 'https://www.dev-10.com', 'pending', null, 1),
        (2, 'Instructor', 'Dev10', '2022-01-01', 'https://www.dev-10.com', 'pending', null, 2);
        
insert into `resource` (resource_id, resource_title, resource_link, resource_type, user_id)
	values
	(1, '6 Ways to Take Initiative at Work', 'https://jobs.washingtonpost.com/article/6-ways-to-take-initiative-at-work/?s=3', 'article', 1),
	(2, 'A Five-Week Guide to Getting a Job', 'https://hbr.org/2021/03/a-five-week-guide-to-getting-a-job', 'article', 2);
        
insert into testimonial (testimonial_id, testimonial_review, testimonial_rating, user_id) 
	values
		(1,'This website is great, I got a Job!', 5, 1),
		(2,'I don\'t like this website, I didn\'t get a job', 1, 2),
		(3,'I love this site!, I almost got a job', 4, 1);
