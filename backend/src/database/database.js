import dotenv from 'dotenv';
import mysql from 'mysql2'
import start from '/Users/ron/new-sublet-search/dirot/backend/src/parserscraper-mods.js';
dotenv.config()

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getApartments() {
    const [rows] = await pool.query("SELECT * FROM apartments")
    return rows;
}

export async function createApartment(city, type, startDate, floorNumber, price, street, neighborhood){  
    const [result] = await pool.query(`
    INSERT INTO apartments (city, type, startDate, floorNumber, price, street, neighborhood)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [city, type, startDate, floorNumber, price, street, neighborhood])
    return result.insertId
}

/*export const apartments = await getApartments();
    const result = await createApartment('test', 'test', 'test');
    console.log(apartments);
    console.log(result); */

 async function startFunction(){
    const data = await start();
    const dataText = data.choices[0].text
    console.log("this is the data coming from createApartment", dataText);
    const listing = JSON.parse(dataText)
    createApartment(listing.city, listing.type, listing.startDate, listing.floorNumber, listing.price, listing.street, listing.neighborhood)
 }

startFunction();