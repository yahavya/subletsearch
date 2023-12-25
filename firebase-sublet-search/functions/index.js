/**
 * Import function triggers from their respective submodules:
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const scraper = require("./scraper.js");
// const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sublet-search.firebaseio.com",
});

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
const db = admin.firestore();

app.use(cors( {origin: true}));

//Routes
app.get("/hello-world", (req, res) => {
    res.status(200).send("Hello from Firebase!");
});

//Post
app.post("/api/create", (req, res) => {
    
    (async () => {
        const list = await scraper('https://m.facebook.com/groups/327655587294381/');
        console.log("list coming from create function " + list);
        let documentRef = db.collection("listings")

        try { 
            let postID;
            for (const post of list) {
                postID = getURLNumber(post.url);
                
                // check if post already exists
                documentRef = db.collection('listings').doc('/' + postID + '/');
                const doc = await documentRef.get()

                if (!doc.exists) {

                    await db.collection('listings').doc('/' + postID + '/')
                    .create({
                        startDate: post.startDate,
                        endDate: post.endDate,
                        roomCount: post.roomCount,
                        area: post.area,
                        price: post.price,
                        floorNumber: post.floorNumber,    
                        post_url: post.url,
                        fullText: post.fullText,
                        image_url: post.images,
                        entry_date: new Date()
                    })
            }
    }
        return res.status(200).send("Listings created successfully! Hooray!");

        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

exports.app = functions.https.onRequest(app);

 function getURLNumber(url) {
  // Split the URL by slashes
  const segments = url.split('/');

  // Get the number after the second-to-last slash
  const secondToLastSegment = segments[segments.length - 2];
  
  // Parse the number and return
  return parseInt(secondToLastSegment, 10);
}
