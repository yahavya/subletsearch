const scraper = require("./scraper.js");
// const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
var serviceAccount = require("./permissions.json");

//const functions = require('@google-cloud/functions-framework');


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

app.use(express.json());

//Routes
//Get

app.get("/api/listings", async (req, res) => {
    try {
    const page = parseInt(req.query.page) || 1;
    const listingsPerPage = 20;
    // Replace 'your-collection' with the name of your Firestore collection
    const collectionRef = admin.firestore().collection('listings');

    // Get all documents in the collection
    const snapshot = await collectionRef.limit(listingsPerPage).offset((page - 1) * listingsPerPage).get();

    // Extract data from documents
    const listings = snapshot.docs.map(doc => doc.data());

    res.json({ success: true, listings, page, listingsPerPage });

  } catch (error) {
    console.error('Error fetching entries from Firestore:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }

});

//Delete all listings
app.post("/api/delete", async (req, res) => { 
  try {
    const collectionRef = admin.firestore().collection('listings');
    await collectionRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
        });
    });
    res.json({ success: true, message: 'All listings deleted' });
  }
  catch (error) {
    console.error('Error deleting entries from Firestore:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
  )
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
                console.log(postID);
                
                // check if post already exists
                documentRef = db.collection('listings').doc('/' + postID + '/');

                const doc = await documentRef.get()
                console.log("this is doc: " + doc.exists);

                if (!doc.exists) {

                    console.log("entered the doc exist if");

                    await db.collection('listings').doc('/' + postID + '/')
                    .create({
                        id: postID,
                        postUrl: post.postUrl,
                        startDate: post.startDate || null,
                        endDate: post.endDate || null,
                        roomCount: post.roomCount || null,
                        area: post.area || null,
                        price: post.price || null,
                        floorNumber: post.floorNumber || null,    
                        postUrl: post.url || null,
                        fullText: post.fullText || null,
                        imageUrl: post.images || null,
                        post_date: new Date().toLocaleDateString(),
                        neighborhood: post.neighborhood || null,
                        street: post.street || null,
                    })
                console.log("post created");

            }
    }
        return res.status(200).send("Listings created successfully! Hooray!" + list.length);

        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

 function getURLNumber(url) {
  // Split the URL by slashes
  const segments = url.split('/');

  // Get the number after the second-to-last slash
  const secondToLastSegment = segments[segments.length - 2];
  
  // Parse the number and return
  return parseInt(secondToLastSegment, 10);
}

app.listen(3000, () => {
 console.log(`Server listening on port 3000`);
})

exports.app = functions.runWith({memory: '1GB'}).https.onRequest(app);

