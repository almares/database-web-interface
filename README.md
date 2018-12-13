A website that performs CRUD operations on a database using node-sqlite3

The SQL queries and CRUD operations are in listings.server.controller.js

The SQL used to create the custom triggers and indices is as follows:
--------------------------------------------------------------------------------
CREATE INDEX nameIndex
ON SIGHTINGS(NAME);

CREATE INDEX personIndex
ON SIGHTINGS(PERSON);

CREATE INDEX locationIndex
ON SIGHTINGS(LOCATION);

CREATE INDEX sightedIndex
ON SIGHTINGS(SIGHTED);

--------------------------------------------------------------------------------
CREATE TABLE sightingsInserts (
  Flower char(50),
  Person Char(50),
  Location char(50),
  Sighted char(50)
  );


  CREATE TRIGGER sightingsTrig
  AFTER INSERT ON SIGHTINGS
  BEGIN
  	INSERT INTO sightingsInserts VALUES (NEW.NAME, NEW.PERSON, NEW.LOCATION, NEW.SIGHTED);
  END
  ;

CREATE TABLE flowersUpdates (
  Genus CHAR(50),
  Species CHAR(50),
  Comname CHAR(50)
  );

CREATE TRIGGER flowersTrig
AFTER UPDATE ON FLOWERS
WHEN (NEW.GENUS <> OLD.GENUS)
BEGIN
  INSERT INTO flowersUpdates VALUES ("*Updated* " || NEW.GENUS, NEW.SPECIES, NEW.COMNAME);
END
;

CREATE TRIGGER flowersTrig2
AFTER UPDATE ON FLOWERS
when (NEW.SPECIES <> OLD.SPECIES)
BEGIN
	INSERT INTO flowersUpdates VALUES (NEW.GENUS, "*Updated* " || NEW.SPECIES, NEW.COMNAME);
END
;

CREATE TABLE flowersDeletions (
  Genus CHAR(50),
  Species CHAR(50),
  Comname CHAR(50)
);

CREATE TRIGGER flowerDel
AFTER DELETE ON FLOWERS
BEGIN
	INSERT INTO flowersDeletions VALUES (OLD.GENUS, OLD.SPECIES, OLD.COMNAME);
END
;
