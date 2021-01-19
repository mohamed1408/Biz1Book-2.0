// // Type 1: In-memory only datastore (no need to load the database)
// var Datastore = require('nedb')
//   , db = new Datastore();


// Type 2: Persistent datastore with manual loading
var Datastore = require('nedb')
    , db = new Datastore({ filename: './database.db' });
db.loadDatabase(function (err) {    // Callback is optional
    // Now commands will be executed
});

var doc = {
    hello: 'world'
    , n: 5
    , today: new Date()
    , nedbIsAwesome: true
    , notthere: null
    , notToBeSaved: undefined  // Will not be saved
    , fruits: ['apple', 'orange', 'pear']
    , infos: { name: 'nedb' }
};

db.insert(doc, function (err, newDoc) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
});
db.find({ hello: 'world' }, function (err, docs) {
    // docs is an array containing documents Mars, Earth, Jupiter
    // If no document is found, docs is equal to []
    console.log(docs)
});
// // Type 3: Persistent datastore with automatic loading
// var Datastore = require('nedb')
//   , db = new Datastore({ filename: 'path/to/datafile', autoload: true });
// // You can issue commands right away


// // Type 4: Persistent datastore for a Node Webkit app called 'nwtest'
// // For example on Linux, the datafile will be ~/.config/nwtest/nedb-data/something.db
// var Datastore = require('nedb')
//   , path = require('path')
//   , db = new Datastore({ filename: path.join(require('nw.gui').App.dataPath, 'something.db') });


// // Of course you can create multiple datastores if you need several
// // collections. In this case it's usually a good idea to use autoload for all collections.
// db = {};
// db.users = new Datastore('path/to/users.db');
// db.robots = new Datastore('path/to/robots.db');

// // You need to load each database (here we do it asynchronously)
// db.users.loadDatabase();
// db.robots.loadDatabase();