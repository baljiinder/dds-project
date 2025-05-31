const getModel = require('../models/GenericModel');

const viewConfig = {
  school: { collection: 'school_incidents', filters: ['school_name', 'district', 'incident_type'] },
  hospital: { collection: 'hospital_incidents', filters: ['hospital_name', 'department', 'severity'] },
  retail: { collection: 'retail_incidents', filters: ['store_location', 'incident_type'] },
  corporate: { collection: 'corporate_incidents', filters: ['office_location', 'incident_type'] },
};

exports.getData = async (req, res) => {
  const view = req.query.view;
  if (!viewConfig[view]) return res.status(400).json({ error: 'Invalid view' });

  const Model = getModel(viewConfig[view].collection);
  const data = await Model.find().limit(100);
  res.json(data);
};

exports.getFilters = async (req, res) => {
  const view = req.query.view;
  if (!viewConfig[view]) return res.status(400).json({ error: 'Invalid view' });
  res.json(viewConfig[view].filters);
};