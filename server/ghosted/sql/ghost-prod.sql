drop database if exists ghosted;
create database ghosted;
use ghosted;

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


-- insert mock data

insert into `role` (`name`) values
    ('USER'),
    ('ADMIN');
    
-- passwords are set to "P@ssw0rd!"
insert into `user` (first_name, last_name, email, password_hash, enabled)
    values
    ('John', 'Smith', 'john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('Sally', 'Jones', 'sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('Justin', 'Mitchell', 'justinmitchell@gmail.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('Brandon', 'Ricardo', 'brandon@ricardo.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('Leo', 'Brown', 'leobrown@hotmail.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('Jimmy', 'Mao', 'jimmy@mao.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into user_role
    values
    (1, 2),
    (2, 1);
    
insert into job_applied(job_id, job_title, job_company, job_date_applied, job_link, job_status, job_location, user_id) values
        (1, 'Junior Developer', 'Dev10', '2020-01-01', 'https://www.dev-10.com', 'APPLIED', null, 2),
        (2, 'Instructor', 'Dev10', '2022-01-01', 'https://www.dev-10.com', 'APPLIED', null, 2),
        (3, 'Junior Developer', 'Dev10', '2020-01-01', 'https://www.dev-10.com', 'ACCEPTED',  'On-site',  1),
		(4, 'Instructor', 'Dev10', '2022-01-01', 'https://www.dev-10.com', 'APPLIED', 'On-site', 1),
		(5, 'Software Engineer', 'Google', '2022-01-01','https://www.google.com', 'REJECTED', 'Remote', 1),
		(6, 'Software Engineer', 'Amazon', '2022-01-01', 'https://www.amazon.com', 'ACCEPTED', 'Hybrid', 1),
		(7, 'Software Engineer', 'Netflix', '2022-01-01', 'https://www.netflix.com', 'REJECTED', 'On-site', 1),
		(8, 'Software Developer', 'Twitch', '2022-01-01', 'https://www.twitch.com', 'APPLIED', 'On-site', 1);
        
insert into `resource` (resource_id, resource_title, resource_link, resource_type, user_id)
	values
	(1, '6 Ways to Take Initiative at Work', 'https://jobs.washingtonpost.com/article/6-ways-to-take-initiative-at-work/?s=3', 'TEXT', 1),
	(2, 'A Five-Week Guide to Getting a Job', 'https://hbr.org/2021/03/a-five-week-guide-to-getting-a-job', 'MEDIA', 2),
    (3, 'Everything You Need to Know About Job Searching in the Digital Age', 'https://www.businessnewsdaily.com/9358-digital-job-search-guide.html', 'TEXT', 3),
    (4, 'Didn`t Get The Job? Here`s What You Need To Do...', 'https://www.workitdaily.com/what-to-do-job-rejection', 'TEXT', 3),
    (5, 'Which keywords should you use in your resume?', 'https://www.careerbuilder.com/advice/blog/why-keywords-are-so-important-in-a-resume', 'TEXT', 4),
    (6, 'How to Get a Job With No Experience', 'https://www.youtube.com/watch?v=OF8nx8Pt0tI', 'MEDIA', 4),
    (7, 'First Job Guide: How to Get a Job - No Experience Necessary! | Indeed Career Tips', 'https://www.youtube.com/watch?v=nTRI9GJW9Y0&t=1s', 'MEDIA', 5),
    (8, 'What to Do When You Can`t Find a Job: 5 Tips', 'https://www.youtube.com/watch?v=TJqmZ0bVucw', 'MEDIA', 6);
        
insert into testimonial (testimonial_id, testimonial_review, testimonial_rating, user_id) 
	values
		(1,'Ghosted is great! It helped me get a job with all of its resources!', 5, 1),
		(2,'I love Ghosted! Do yourself a favor and use it to help your next job search!', 4, 2),
		(3,'I love this site! Its job application tracking dashboard helps me stay organized while on my job hunt.', 5, 3),
        (4,'I can\'t imagine my job search without utilizing the job archive dashboard. It took away the need of bloated CSV editors and sped up my job hunt!', 5, 4),
        (5,'Ghosted\'s application status chart has helped me stay organzied with the status of all my job applications. I definitely recommend anyone on the job hunt take advantage of it!', 5, 5),
        (6,'Ghosted has sped up my organization by allowing me to track all my applications in one place! There\'s no way I go back to the way tracked all my applications in the past.', 5, 6);
