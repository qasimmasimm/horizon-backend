const PropertyType = require("../models/propertytype.model");

class PropertyTypeController {
  async Create(req, res) {
    try {
      const { type } = req.body;
      if (!type) {
        return res.status(400).json({ message: "this property is required" });
      }
      const created = await PropertyType.create({ type });
      if (!created) {
        return res.status(400).json({ message: "failed to create this property" });
      }
      return res.status(201).json(created);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Interval Server Error" });
    }
  }

  async GetAll(req, res) {
    try {
      const get = await PropertyType.find();
      if (!get) {
        return res.status(400).json({ message: "failed to get types" });
      }
      return res.status(200).json(get);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Interval Server Error" });
    }
  }

  async GetById(req, res) {
    try {
      const { id } = req.params;
      const found = await PropertyType.findById(id);
      if (!found) {
        return res.status(400).json({ message: "failed to get type" });
      }
      return res.status(200).json(found);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Interval Server Error" });
    }
  }
}

module.exports = new PropertyTypeController();
