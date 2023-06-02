drop database if exists ghosted_test;
create database ghosted_test;
use ghosted_test;

-- create tables
create table `user` (
	user_id int primary key auto_increment,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) not null unique,
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

create table testimonial (
	testimonial_id int primary key auto_increment,
    testimonial_review text not null,
    testimonial_rating int not null,
    user_id int not null,
    constraint fk_testimonial_user_id
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
    user_id int not null,
    constraint fk_job_applied_user_id
		foreign key (user_id)
        references `user`(user_id)
);


delimiter //
create procedure set_known_good_state()
begin

    delete from job_applied;
    alter table job_applied auto_increment = 1;
    delete from `resource`;
    alter table `resource` auto_increment = 1;
	delete from testimonial;
	alter table testimonial auto_increment = 1;
        
    insert into job_applied(job_id, job_title, job_company, job_date_applied, job_link, job_status, job_location, user_id) values
        (1, 'Junior Developer', 'Dev10', '2020-01-01', 'https://www.dev-10.com', 'pending', null, 1),
        (1, 'Instructor', 'Dev10', '2022-01-01', 'https://www.dev-10.com', 'pending', null, 2);
        
	insert into `resource` (resource_id, resource_title, resource_link, resource_type, user_id)
		values
	(1, '6 Ways to Take Initiative at Work', 'https://jobs.washingtonpost.com/article/6-ways-to-take-initiative-at-work/?s=3', 'article', 1),
    (2, 'A Five-Week Guide to Getting a Job', 'https://hbr.org/2021/03/a-five-week-guide-to-getting-a-job', 'article', 2),
    (3, 'Top 5 Job Search Strategies To Find A Job', 'https://www.youtube.com/watch?v=r3yiGbnPYFI', 'video', 3);
        
	insert into testimonial 
		(testimonial_review, testimonial_rating, user_id) 
	values
		(1,'This website is great, I got a Job!', 5, 1),
		(1,'I don\'t like this website, I didn\'t get a job', 1, 2),
		(1,'I love this site!, I almost got a job', 4, 1);
        
end //
-- 4. Change the statement terminator back to the original.
delimiter ;
