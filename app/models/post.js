/*
 * This is the model for post. I'll be pretty basic for now.
 * This will contain the information about a job post that
 * we should store for later
 *
 */

var util = require("util");
var mongoClient = require("mongodb").MongoClient;
var server = "mongodb://localhost:27017/";
var collection = "posts";
var database = "scraper";
var mongodb = require('mongodb');

/*
 * Error handling function
 */
var doError(error) {
  util.debug("Error: " + error);
  throw new Error(error);
}


/*
 * For now we'll just insert an entire js object into a mongo db
 */
exports.insert = function(object, callback) {
  // connect to the db
  mongoClient.connect(server+database, function(err, db) {
    // if there is an error use the helper
    if(err) {
      doError(err);
    }
    // attempt to insert
    db.collection(collection).insert(object, function(err, crsr) {
      // if there is an error use the helper
      if(err) {
        return doError(err);
      }
      else {
        return callback(err, crsr);
      }
    });
  });
}
