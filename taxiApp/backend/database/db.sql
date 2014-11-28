
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
				geoLocationStartTime timestamp,
				geoLocationEnd char (40) not null,
				geoLocationEndTime timestamp,
				capacity int not null, 
				primary key (id)
			);
			create table employer
				{
					id int not null auto_increment,
					employerName char (100) ,
					employerlastName char (100) ,
					employerContacts int not null,
					primary key (id)
	
				};


);
