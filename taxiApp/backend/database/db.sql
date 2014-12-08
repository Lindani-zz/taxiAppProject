
drop table routes;
drop table vehicles;
drop table trips;
drop table driverDetails;
drop table users;

create table users
(
	id int not null auto_increment,
	firstName char (100) not null,
	lastName char (100) not null,
	userName char (100) not null,
	password char (100) not null,
	
	address1 char (100) ,
	address2 char (100),
	address3 char (100),
	postCode char(10),
	isOwner		char(100),
	primary key(id)
);



create table routes
	(
		id int not null auto_increment,
		routeName char (100) not null,
		fare numeric,
		geoLocationTripStart char (30) not null,
		geoLocationTripEnd char (30) not null,
		primary key(id)
	);
	
	create table users_routes
	(
		id int not null auto_increment,
		routeId int not null,
		userId int not null,
		
		primary key(id)

	);
	
	create table vehicles
		(
			id int not null auto_increment,
			registration char (20),
			capacity int not null,
			ownerID int (6) not null,
			primary key(id)
		);
		create table trips
			(
				id int not null auto_increment,
				geoLocationStart char (40) not null,
				dateTimeStart timestamp,
				geoLocationEnd char (40) not null,
				dateTimeEnd timestamp,
				capacity int (100)not null, 
				ownerID int (6) not null,
				routeID int(6) not null,
				status text,
				primary key (id)
			);
			create table ownerEmployer
				{
					id int not null auto_increment,
					employerName char (100) ,
					employerlastName char (100) ,
					employerContacts int ,
					primary key (id)
	
				};


);



INSERT INTO `users_routes`(`routeId`, `userId`) VALUES (1,1);
INSERT INTO `users_routes`(`routeId`, `userId`) VALUES (2,2);
INSERT INTO `users_routes`(`routeId`, `userId`) VALUES (3,1);
INSERT INTO `users_routes`(`routeId`, `userId`) VALUES (1,2);
INSERT INTO `users_routes`(`routeId`, `userId`) VALUES (3,3);
INSERT INTO `users_routes`(`routeId`, `userId`) VALUES (1,4);
INSERT INTO `users_routes`(`routeId`, `userId`) VALUES (2,3);
INSERT INTO `users_routes`(`routeId`, `userId`) VALUES (3,1);
INSERT INTO `users_routes`(`routeId`, `userId`) VALUES (1,3);


