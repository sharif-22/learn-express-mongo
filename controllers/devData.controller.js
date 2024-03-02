// model
import DevData from "../models/devData.model.js";

const getDevDatas = async (req, res) => {
  try {
    const devDetails = await DevData.find({});
    res.status(200).json(devDetails);
  } catch (error) {
    res.json({ status: 200, message: error.message });
  }
};

const getDevDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const devDetails = await DevData.findById(id);
    res.status(200).json(devDetails);
  } catch (error) {
    res.json({ status: 200, message: error.message });
  }
};

const postDevDetails = async (req, res) => {
  try {
    const devData = await DevData.create(req.body);
    res.status(200).json(devData);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const putDevDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const devDetails = await DevData.findByIdAndUpdate(id, req.body);

    if (!devDetails) {
      return res
        .status(404)
        .json({ message: "developer details not found in DB" });
    }

    const updatedDevDetails = await DevData.findById(id);
    res.status(200).json(updatedDevDetails);
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

const deleteDevDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const devDetails = await DevData.findByIdAndDelete(id, req.body);

    if (!devDetails) {
      return res
        .status(404)
        .json({ message: "developer details not found in DB" });
    }
    res
      .status(200)
      .json({ status: 200, message: "developer details deleted from server" });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

export {
  getDevDatas,
  getDevDetails,
  postDevDetails,
  putDevDetails,
  deleteDevDetails,
};
