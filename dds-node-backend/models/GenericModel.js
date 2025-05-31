const mongoose = require('mongoose');

const GenericSchema = new mongoose.Schema({}, { strict: false });
module.exports = (collectionName) => mongoose.model(collectionName, GenericSchema, collectionName);