///////////////////////////////////////////////////////////////////////////////
//
// Might be deprecated when a real server is installed. But could always use
// firebase in addition to the web server; web server only used for serving
// app and not worrying about db stuff
//
///////////////////////////////////////////////////////////////////////////////
'use strict';

var config = require('../config');
var Firebase = require('firebase');
var Promise = require('es6-promise').Promise;

var db = new Firebase(config.dbroot);


// wrap Firebase `once` read in a promise
exports.once = function(path, type) {
  path = path || "./";
  type = type || "value";

  return new Promise((resolve, reject) => {
    db.child(path).once(type,
      (snapshot) => {
        resolve(snapshot);
      },
      (err) => {
        reject(err);
      })
  });
};

// wrap Firebase 'on' read in a promise
exports.on = function(path, type) {
  path = path || "./";
  type = type || "value";

  return new Promise((resolve, reject) => {
    db.child(path).on(type,
      (snapshot) => {
        resolve(snapshot);
      },
      (err) => {
        reject(err);
      })
  });
};

// auth wrapper
exports.auth = function(email, token) {
  return new Promise((resolve, reject) => {
    db.authWithPassword({
      email : email,
      password : token
    }, (err, payload) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(payload);
      }
    });
  })
};

// create a new user
exports.create = function(email, password) {
  return new Promise((resolve, reject) => {
    db.createUser({
      email : email,
      password : password
    }, (err, payload) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(payload);
      }
    });
  })
};

// send token in email
exports.token = function(email) {
  return new Promise((resolve, reject) => {
    db.resetPassword({
      email : email
    }, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve("sent");
      }
    })
  })
};

// update data at the specified path
exports.update = function(path, value) {
  return new Promise((resolve, reject) => {
    db.child(path).update(value, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve("success");
      }
    })
  })
}

// for anything else we might need...
exports.ref = db;