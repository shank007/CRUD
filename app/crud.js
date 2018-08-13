/**
 * @author Girijashankar Mishra
 * @version 1.0.0
 * @since 13-August-2018
 */
var express = require('express');
var router = express.Router();
var Q = require('q');
var config = require('../config.json');
var mongo = require('mongoskin');

router.post('/create', create);
// router.get('/readById', readById);
router.get('/readByCondition', readByCondition);

router.put('/update', updateData);
router.delete('/delete', deleteData);

//export this router to use in our server.js
module.exports = router;

/**
 * @author Girijashankar Mishra
 * @description Insert data in MongoDB
 * @param {dbName,collectionName,jsonData} req 
 * @param {JSONObject} res 
 */
function create(req, res) {
    var deferred = Q.defer();
    var dbName = req.body.dbName;
    var collectionName = req.body.collectionName;
    var jsonData = req.body.jsonData;
    var db = mongo.db(config.connectionString + dbName, {
        native_parser: true
    });
    db.bind(collectionName);
    db.collectionName.insert(
        jsonData,
        function (err, result) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            console.log("doc created =", result);
            deferred.promise(result);
        });
    db.close();
    return deferred.promise;
}



/**
 * @author Girijashankar Mishra
 * @description Read Data from MongoDB using condition
 * @param {dbName,collectionName,condition} req 
 * @param {JSONObject} res 
 */
function readByCondition(req, res) {
    var deferred = Q.defer();
    var dbName = req.body.dbName;
    var collectionName = req.body.collectionName;
    var condition = req.body.condition;
    var db = mongo.db(config.connectionString + dbName, {
        native_parser: true
    });
    db.bind(collectionName);
    db.collectionName.find(condition).toArray(function (err, result) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        console.log("read result =", result);
        deferred.promise(result);
    });
    db.close();
    return deferred.promise;
}

/**
 * @author Girijashankar Mishra
 * @description Update Data in MongoDB using condition
 * @param {dbName,collectionName,jsonData,condition} req 
 * @param {JSONObject} res 
 */
function updateData(req, res) {
    var deferred = Q.defer();
    var dbName = req.body.dbName;
    var collectionName = req.body.collectionName;
    var jsonData = req.body.jsonData;
    var condition = req.body.condition;
    var db = mongo.db(config.connectionString + dbName, {
        native_parser: true
    });
    db.bind(collectionName);
    db.collectionName.update(condition, {$set:jsonData}, function(err, result) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        console.log("update result =", result);
        deferred.promise(result);
    });
    db.close();
    return deferred.promise;
}

/**
 * @author Girijashankar Mishra
 * @description Read Data from MongoDB using condition
 * @param {dbName,collectionName,jsonData,condition} req 
 * @param {JSONObject} res 
 */
function deleteData(req, res) {
    var deferred = Q.defer();
    var dbName = req.body.dbName;
    var collectionName = req.body.collectionName;
    var condition = req.body.condition;
    var db = mongo.db(config.connectionString + dbName, {
        native_parser: true
    });
    db.bind(collectionName);
    db.collectionName.remove(condition,  function(err, result) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        console.log("delete result =", result);
        deferred.promise(result);
    });
    db.close();
    return deferred.promise;
}