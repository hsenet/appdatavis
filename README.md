# Datavisualisation App

Datavisualisation app for Refinitiv Labs Dev challenge

## Database 

This app uses neo4j as the backend.
Download the database here: 
https://neo4j.com/download/

Install and configure the database:
A complete guide on is available here: https://neo4j.com/developer/desktop-csv-import/
Which will also tell you how to create and connect and import the CSV files.

Drop the Data CSV files into the "import" dir of the neo4j installation.

1) Login to your neo4j project and database. 

2) Run the following checks on neo4j prompt


```neo4j
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers.edges.csv' AS row 
WITH row.sourceID AS sourceID, row.end_date AS end_date, row.valid_until AS valid_until, row.END_ID AS END_ID, row.link AS link, row.START_ID AS START_ID, row.TYPE AS TYPE, row.start_date AS start_date
RETURN sourceID, end_date, valid_until, END_ID, link, START_ID, start_date
LIMIT 3;
```

```neo4j
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers.nodes.address.csv' AS row 
WITH row.sourceID AS sourceID, row.note AS note, row.valid_until AS valid_until, row.address AS address, row.name AS name, row.country_codes AS country_codes, row.countries AS countries, row.node_id AS node_id
RETURN sourceID, note, valid_until, address, name, country_codes, countries, node_id
LIMIT 3;
```

```neo4j
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers.nodes.entity.csv' AS row 
WITH row.sourceID AS sourceID, row.company_type AS company_type, row.note AS note, row.closed_date AS closed_date, row.jurisdiction AS jurisdiction, row.struck_off_date AS struck_off_date, row.service_provider AS service_provider, row.countries AS countries, row.jurisdiction_description AS jurisdiction_description, row.node_id AS node_id, row.valid_until AS valid_until, row.ibcRUC AS ibcRUC, row.name AS name, row.inactivation_date AS inactivation_date, row.country_codes AS country_codes, row.incorporation_date AS incorporation_date
RETURN sourceID,company_type, note, closed_date, jurisdiction, struck_off_date, service_provider, countries, jurisdiction_description, node_id, valid_until, ibcRUC,name, inactivation_date,country_codes, incorporation_date 
LIMIT 3;
```
etc...

If the CSV files load OK, continue loading the CSVs:
```neo4j
USING PERIODIC COMMIT 500
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers.edges.csv' AS row 
WITH row.sourceID AS sourceID, row.end_date AS end_date, row.valid_until AS valid_until, row.END_ID AS END_ID, row.link AS link, row.START_ID AS START_ID, row.TYPE AS TYPE, row.start_date AS start_date
MERGE (a:Edges {START_ID:START_ID})
SET a.sourceID=sourceID, a.end_date=end_date, a.valid_until=valid_until, a.END_ID=END_ID, a.link=link, a.START_ID=START_ID, a.TYPE=TYPE, a.start_date=start_date
RETURN count(a);
```
```neo4j
USING PERIODIC COMMIT 500
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers.nodes.address.csv' AS row 
WITH row.sourceID AS sourceID, row.note AS note, row.valid_until AS valid_until, row.address AS address, row.name AS name, row.country_codes AS country_codes, row.countries AS countries, row.node_id AS node_id
MERGE (b:Address {node_id: node_id})
SET b.sourceID=sourceID, b.note=note, b.valid_until=valid_until, b.address=address, b.name=name, b.country_codes=country_codes, b.countries=countries, b.node_id=node_id
RETURN count(b);
```
```neo4j
LOAD CSV WITH HEADERS FROM 'file:///paradise_papers.nodes.entity.csv' AS row 
WITH row.sourceID AS sourceID, row.company_type AS company_type, row.note AS note, row.closed_date AS closed_date, row.jurisdiction AS jurisdiction, row.struck_off_date AS struck_off_date, row.service_provider AS service_provider, row.countries AS countries, row.jurisdiction_description AS jurisdiction_description, row.node_id AS node_id, row.valid_until AS valid_until, row.ibcRUC AS ibcRUC, row.name AS name, row.inactivation_date AS inactivation_date, row.country_codes AS country_codes, row.incorporation_date AS incorporation_date
MATCH(c:Entity {node_id: node_id})
SET c.sourceID=sourceID,c.company_type=company_type, c.note=note, c.closed_date=closed_date, c.jurisdiction=jurisdiction, c.struck_off_date=struck_off_date, c.service_provider=service_provider, c.countries=countries, c.jurisdiction_description=jurisdiction_description, c.node_id=node_id, c.valid_until=valid_until, c.ibcRUC=ibcRUC,c.name=name, c.inactivation_date=inactivation_date,c.country_codes=country_codes, c.incorporation_date=incorporation_date 
RETURN count(c);
```
and so on.

After all are imported check if the data is available using the neo4j browser.

## Installation

Before installation, please edit
src/service/databaseService/index.js and update your neo4j database credentials

Install nodeJS and run the following command

```bash
npm install
```

## Usage

```bash
npm start

```

## License
[MIT](https://choosealicense.com/licenses/mit/)