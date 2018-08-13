/**
 * @author Girijashankar Mishra
 * @version 1.0.0
 * @since 13-August-2018
 */
var express = require('express');
var router = express.Router();
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
    var dbName = req.body.dbName;
    var collectionName = req.body.collectionName;
    var jsonData = req.body.jsonData;
    var db = mongo.db(config.connectionString + dbName, {
        native_parser: true
    });
    db.bind(collectionName);

    db.collection(collectionName).insert(
        jsonData,
        function (errs, result) {
            var result = {};
            if (errs) {
                res.send(errs);
            }

            console.log("doc created =", result);
            result["status"] = "200";
            result["message"] = "Data Stored in DB";
            res.send(result);
        });

    db.close();
}

/**
 * @author Girijashankar Mishra
 * @description Read Data from MongoDB using condition
 * @param {dbName,collectionName,condition} req 
 * @param {JSONObject} res 
 */
function readByCondition(req, res) {
    var dbName = req.query.dbName;
    var collectionName = req.query.collectionName;
    var condition = req.query.condition;
    var db = mongo.db(config.connectionString + dbName, {
        native_parser: true
    });
    db.bind(collectionName);
    console.log(dbName);
    console.log(collectionName);
    console.log(JSON.parse(JSON.stringify(condition)));

    db.collection(collectionName).find(JSON.stringify(condition)).toArray(function (errs, result) {
        console.error('errs == ' + errs)
        if (errs) {
            res.send(errs);
        }
        console.log('read result = ', result);
        res.send(result);
    });
    db.close();
}

/**
 * @author Girijashankar Mishra
 * @description Update Data in MongoDB using condition
 * @param {dbName,collectionName,jsonData,condition} req 
 * @param {JSONObject} res 
 */
function updateData(req, res) {
    var dbName = req.body.dbName;
    var collectionName = req.body.collectionName;
    var jsonData = req.body.jsonData;
    var condition = req.body.condition;
    var db = mongo.db(config.connectionString + dbName, {
        native_parser: true
    });
    db.bind(collectionName);
    db.collection(collectionName).update(condition, {
        $set: jsonData
    }, function (err, result) {
        var result = {};
        if (err) {
            res.send(err);
        }

        console.log("doc created =", result);
        result["status"] = "200";
        result["message"] = "Data Updated in DB";
        res.send(result);
    });
    db.close();
}

/**
 * @author Girijashankar Mishra
 * @description Read Data from MongoDB using condition
 * @param {dbName,collectionName,jsonData,condition} req 
 * @param {JSONObject} res 
 */
function deleteData(req, res) {
    var dbName = req.body.dbName;
    var collectionName = req.body.collectionName;
    var condition = req.body.condition;
    var db = mongo.db(config.connectionString + dbName, {
        native_parser: true
    });
    db.bind(collectionName);
    db.collection(collectionName).remove(condition, function (err, result) {
        var result = {};
        if (err) {
            res.send(err);
        }

        console.log("doc created =", result);
        result["status"] = "200";
        result["message"] = "Data Deleted from DB";
        res.send(result);
    });
    db.close();
}