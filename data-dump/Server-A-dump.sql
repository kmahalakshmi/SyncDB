CREATE TABLE "sample" (
  id SERIAL PRIMARY KEY,
  FirstName varchar(255) default NULL,
  Surname varchar(255) default NULL,
  Company varchar(255),
  Phone varchar(100) default NULL
);

INSERT INTO "sample" (FirstName,Surname,Company,Phone) VALUES ('Isaac','Kely','Turpis Egestas Ltd','06 67 49 00 79'),('Imani','Garcia','Nunc Institute','05 58 78 27 43'),('Abra','','Magnis Dis Parturient Ltd','07 62 33 05 13'),('Kenyon','Underwood','Pellentesque Tellus Sem LLC','07 74 62 28 39'),('Carter Buck','','In Consequat Enim Company','06 18 11 09 28'),('Chava','Romero','Lectus Foundation','07 26 23 04 71'),('Cleo','','Augue Incorporated','03 81 97 61 01'),('Ian','','In Consulting','04 92 00 32 94'),('Reece','','Commodo Industries','04 12 92 40 81'),('Kiara','','Lacus Company','09 25 33 40 87'),('Ezra','Watson','Nisi Corporation','03 42 59 77 52'),('Leslie','','Mus Consulting','04 53 27 25 32'),('Madonna','','Velit Eu Institute','06 82 30 13 36'),('Ivan','','Quisque Company','07 29 82 98 45'),('Nigel','Flva','Rutrum Non Industries','09 87 38 43 03'),('Haley','','Et Corp.','08 57 63 26 25');

