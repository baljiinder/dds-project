const mongoose = require('mongoose');
const fs = require('fs');
const getModel = require('./models/GenericModel');
require('dotenv').config();

const datasets = {
  school: './data/school.json',
  hospital: './data/hospital.json',
  retail: './data/retail.json',
  corporate: './data/corporate.json'
};

mongoose.connect(process.env.MONGO_URI).then(async () => {
  for (const [view, path] of Object.entries(datasets)) {
    const data = JSON.parse(fs.readFileSync(path));
    const Model = getModel(view + '_incidents');
    await Model.deleteMany();

    const chunkSize = 500;
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      await Model.insertMany(chunk);
    }

    console.log(`${view} data seeded.`);
  }
  process.exit();
});
