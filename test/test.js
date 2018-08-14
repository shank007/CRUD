var crud = require('../app/crud-wo-express.js');
var assert = require('assert');
var chai = require('chai');
var should = chai.should();



describe('Create', function () {
    var connectionString = "mongodb://localhost:27017/";
    var dbName = "PET";
    var collectionName = "PetStore";
    it('create an entry in mongodb', function (done) {
        crud.create(connectionString, dbName, collectionName, {
            "petId": "C001",
            "petType": "Cat",
            "petName": "Karla",
            "petBreed": "Persian"
        }, function (err, data) {
            if (err) {
                console.error(err);
            }
            done();
        });
    });

});

describe('Update', function () {
    var connectionString = "mongodb://localhost:27017/";
    var dbName = "PET";
    var collectionName = "PetStore";
    it('Update existing document in mongodb', function (done) {
        crud.update(connectionString, dbName, collectionName, {
            "petName": "Billy"
        }, {
            "petId": "C001",
            "petBreed": "Persian"
        }, function (err, result) {
            if (err) console.error(err);
            done();
        });
    });
});

describe('Create For Delete', function () {
    var connectionString = "mongodb://localhost:27017/";
    var dbName = "PET";
    var collectionName = "PetStore";
    it('create an entry to delete later', function (done) {
        crud.create(connectionString, dbName, collectionName, {
            "petId": "D001",
            "petType": "Dog",
            "petName": "Bruno",
            "petBreed": "Lab"
        }, function (err, data) {
            if (err) {
                console.error(err);
            }
            done();
        });
    });
});

describe('ReadByCondition', function () {
    var connectionString = "mongodb://localhost:27017/";
    var dbName = "PET";
    var collectionName = "PetStore";
    it('read by condition', function (done) {
        crud.readByCondition(connectionString, dbName, collectionName, {
            "petId": "C001"
        }, function (err, data) {
            if (err) {
                console.error(err);
            }
            done();
        });
    });
});

describe('Delete', function () {
    var connectionString = "mongodb://localhost:27017/";
    var dbName = "PET";
    var collectionName = "PetStore";
    it('Delete document in mongodb', function (done) {
        crud.delete(connectionString, dbName, collectionName, {
            "petId": "D001"
        }, function (err, result) {
            if (err) console.error(err);
            done();
        });
    });
});