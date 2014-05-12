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
var doError = function(error) {
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

/*
 * attempts to insert a job without producing a duplicate
 * test function for now
 */
exports.insert_no_dup = function(object, callback) {
  mongoClient.connect(server+database, function(err, db) {
    if(err) {
      doError(err);
    }
    else {
      var crsr = db.collection(collection).find({'id': object.id});
      crsr.toArray(function(err, docs) {
        if(err) {
          doError(err);
        }
        else {
          if(docs.length == 0) {
            db.collection(collection).insert(object, function(err, crsr) {
              if(err) {
                doError(err);
              }
              else {
                return callback(err, crsr);
              }
            });
          }
          else {
            return callback(new Error('Object already exists'));
          }
        }
      });
    }
  });
}

/*
 * gets all of the posts
 */
exports.getAll = function(callback) {
  // connect to the DB
  mongoClient.connect(server+database, function(err, db) {
    // if there is an error, go to the helper
    if(err) {
      doError(err);
    }
    // get all of the posts
    var crsr = db.collection(collection).find();
    crsr.toArray(function(err, docs) {
      // if there is error go to the helper
      if(err) {
        doError(err);
      }
      callback(docs);
    });
  });
}

/*
 * Saves a post after getting it from linkedin
 */
exports.showFromSaved = function(linkedInId, callback) {
  var theId = parseInt(linkedInId);
  mongoClient.connect(server+database, function(err, db) {
    if(err) {
      doError(err);
    }
    var crsr = db.collection(collection).find({'id': theId});
    crsr.toArray(function(err, docs) {
      if(err) {
        doError(err);
      }
      callback(err, docs[0]);
    });
  });
}
