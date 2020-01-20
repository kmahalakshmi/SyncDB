DROP TABLE IF EXISTS "student";

CREATE TABLE "student" (
  id SERIAL PRIMARY KEY,
  stdname varchar(255) default NULL,
  stdaddress varchar(255)
);

INSERT INTO "student" (stdname,stdaddress) VALUES ('Odysseus Mccoy','Termeno sulla strada del vino/Tramin an der Weinstrasse'),('Vernon Case','Cavallino'),('Owen Albert','Liverpool'),('Cameron Velasquez','Holman'),('Ross Duran','Gjoa Haven'),('Harlan Donaldson','Great Yarmouth'),('Warren Skinner','Brest'),('Keane Clarke','Sukabumi'),('Oliver Carter','Chandannagar'),('Uriel Baird','Novy Oskol');
INSERT INTO "student" (stdname,stdaddress) VALUES ('Bruce Barrera','Wijshagen'),('Finn Hewitt','Huesca'),('Buckminster Graves','Chelsea'),('Chester Flowers','Osnabrück'),('Clarke Mcgowan','Chillán Viejo'),('Maxwell Snider','Carovilli'),('Gray Estrada','Mathura'),('Avram Houston','Ciudad Santa Catarina'),('Otto Woodard','Oudegem'),('Raymond Rivera','Rouyn-Noranda');
INSERT INTO "student" (stdname,stdaddress) VALUES ('Ian Mitchell','Rockford'),('Rajah Ellis','Verdun'),('Jelani Holmes','Opdorp'),('Reuben Watts','San Sostene'),('Kyle Graham','Township of Minden Hills'),('Ross Maddox','Rezzoaglio'),('Erasmus Mack','Hollogne-sur-Geer'),('Orson Cruz','Waitakere'),('Kermit Patton','Vehari'),('Calvin Mcdowell','Provo');
INSERT INTO "student" (stdname,stdaddress) VALUES ('Chaim Howard','Baltimore'),('Walter Goff','Kerkrade'),('Kato Mcknight','Amiens'),('Cyrus Watkins','Esneux'),('Tiger Hensley','Fahler'),('Tobias Tran','Itajaí'),('Seth Raymond','Chiaromonte'),('Brock Richards','Houston'),('Isaac Stafford','Warszawa'),('Lamar Floyd','Alkmaar');
INSERT INTO "student" (stdname,stdaddress) VALUES ('Trevor Hill','Charny'),('Dane Terrell','Bremerhaven'),('Nasim Keller','Puerto Guzmán'),('Duncan Moss','Gimpo'),('Keefe Brooks','Lissewege'),('Dale Houston','Urbe'),('Ishmael James','Chiavari'),('Keane Vaughan','Rotello'),('Rigel Lancaster','Tirrases'),('Quentin Sullivan','Bergama');
INSERT INTO "student" (stdname,stdaddress) VALUES ('Joshua Hunt','Satka'),('Ivan Duran','Awka'),('Crhgaig Clarke','Ebenthal in Kärnten'),('Fletcher Mayo','Luttre'),('Otto Lancaster','Gold Coast'),('Lester Payne','Catanzaro'),('Ezra Sanford','Grayvoron'),('Tanek Booker','Homburg'),('Linus Chavez','Dornoch'),('Maxwell Leach','Baiso');
INSERT INTO "student" (stdname,stdaddress) VALUES ('Harper Adkins','Suarlee'),('Noah Vincent','Yeongcheon'),('Cairo Melton','Villavicencio'),('Coby Wyatt','Chepén'),('Flynn Fletcher','Bois-de-Villers'),('Henry Davenport','Kasterlee'),('Cameron Cross','White Rock'),('Dalton Ashley','Northumberland'),('Slade Webster','Habay-la-Vieille'),('John Kemp','Township of Minden Hills');
INSERT INTO "student" (stdname,stdaddress) VALUES ('Asher Black','Strijtem'),('Walker Trujillo','Sambhal'),('Alfonso Mcdonald','Southwell'),('Gary Suarez','Orosei'),('Forrest Deleon','Bowling Green'),('Erich Cox','Annapolis Royal'),('Victor Valentine','Guysborough'),('Avram Cline','Litueche'),('Jermaine Kelly','Auburn'),('Stewart Maddox','Blehen');
INSERT INTO "student" (stdname,stdaddress) VALUES ('Marsden Nieves','Viggianello'),('Lawrence Sandoval','Rijkevorsel'),('Jonah Dorsey','Galashiels'),('Graham Mcdonald','Woodstock'),('Zachary Bennett','Stalhille'),('Martin Lopez','Momignies'),('Lane Dorsey','Calder'),('Marsden Mcdonald','Massarosa'),('Malcolm Bond','Sherbrooke'),('Graham Burns','Schwedt');
INSERT INTO "student" (stdname,stdaddress) VALUES ('Dennis Baxter','Patarrá'),('Nolan Mcdaniel','Champlain'),('Macon Riddle','Aosta'),('Gil Suarez','Baddeck'),('Barclay Cooke','Marburg'),('Yardley Rutledge','Camponogara'),('Curran Church','Wolvertem'),('Ryan Reese','Carterton'),('Solomon Rodriquez','Ostellato'),('Graiden Alford','Gliwice');



CREATE TABLE "employee" (
  id SERIAL PRIMARY KEY,
  empname varchar(255) default NULL,
  empaddress varchar(255)
);


INSERT INTO "employee" (empname,empaddress) VALUES ('Eagan Oneal','Turbo'),('Nigel Anthony','Zandvoorde'),('Walter Mccray','Scarborough'),('Damian Butler','San Esteban'),('Josiah Klein','Borsbeek'),('Gage Cervantes','Coutisse'),('Colby Moran','Mal'),('Marvin Mann','Lübeck'),('Brandon Keller','Shahjahanpur'),('Gareth Lloyd','Rosenheim');
INSERT INTO "employee" (empname,empaddress) VALUES ('Gabriel Kaufman','Kawawachikamach'),('Stuart Acevedo','San Juan (San Juan de Tibás)'),('Aristotle Abbott','Mission'),('Reed Mcintosh','MabomprŽ'),('Boris Small','Jamshedpur'),('Acton Bishop','Pontevedra'),('Bernard Ramos','Den Helder'),('Dieter Kirby','Terzorio'),('Daniel Hall','Freirina'),('Vaughan Sellers','Sromness');
INSERT INTO "employee" (empname,empaddress) VALUES ('Ali Sexton','South Jakarta'),('Wade Potter','Sooke'),('Wesley Osborne','Verdun'),('Clayton Knox','Villers-la-Ville'),('Gary Mcmahon','Pievepelago'),('Dale Cole','Bellante'),('Timon Farrell','Tubeke Tubize'),('Jakeem Justice','Denver'),('Kamal Berg','Herne'),('Porter Harmon','Villach');
INSERT INTO "employee" (empname,empaddress) VALUES ('Ashton Roblegfs','Chimay'),('Hoyt Dyer','Sydney'),('Galvin Arnold','Salem'),('Richard Suarez','Vosselaar'),('Jarrod Love','Cantalupo in Sabina'),('Baxter Wyatt','Forst'),('Wade Garza','Kawerau'),('Victor Christian','Irricana'),('Malcolm Conley','Contagem'),('Ryder Bowers','Lens-Saint-Remy');
INSERT INTO "employee" (empname,empaddress) VALUES ('Brendan Pace','Kaduna'),('Berk Slater','Tufara'),('Kennan Roberts','Vicuña'),('Hayes Pacheco','Ponoka'),('Ivor Davenport','Luziânia'),('Macon Fry','Sapele'),('Keaton Conley','Balashikha'),('Clarke Witt','Jasper'),('Joshua Cross','Bromyard'),('Arsenio Burnett','Comox');




