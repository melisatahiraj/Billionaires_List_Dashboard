
-- DROP TABLE billionaires;
-- DROP TABLE industry;
CREATE TABLE industry (
	Industry_ID INT PRIMARY KEY,
	Industry VARCHAR(255) NOT NULL
);

CREATE TABLE billionaires (
	Billionaire_ID INT PRIMARY KEY, 
	"Rank" INT,
	"Name" VARCHAR(255),
	Net_Worth VARCHAR(100),
	Age INT,
	Country VARCHAR(100),
	"Source" VARCHAR(80),
	Net_Worth_B REAL,
	Industry_ID INT,
	FOREIGN KEY (Industry_ID) REFERENCES industry(Industry_ID)	
);

