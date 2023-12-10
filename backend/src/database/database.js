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

export async function createApartment(startDate, floorNumber, price, street, neighborhood){  
    const [result] = await pool.query(`
    INSERT INTO apartments (startDate, floorNumber, price, street, neighborhood)
    VALUES (?, ?, ?, ?, ?)
    `, [startDate, floorNumber, price, street, neighborhood])
    return result.insertId
}

 async function startFunction(){
    const data = await start();
    const dataText = data.choices[0].text
    console.log("this is the data coming from createApartment", dataText);
    const listing = JSON.parse(dataText)
    for (const item of listing) {
        createApartment(item.startDate, item.floorNumber, item.price, item.street, item.neighborhood)
        console.log("apartment added")
    }
 }
    startFunction();