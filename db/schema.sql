DROP DATABASE IF EXISTS zoo_db;
CREATE DATABASE zoo_db;
USE zoo_db;

CREATE TABLE animalTypes (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE animals (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  age INT,
  animalTypeId INT NOT NULL,
  hasOwner BOOLEAN DEFAULT false,
  PRIMARY KEY (id),
  FOREIGN KEY (animalTypeId) REFERENCES animalTypes(id)
);
