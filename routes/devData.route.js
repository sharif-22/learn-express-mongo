import express from "express";

import {
  getDevDatas,
  getDevDetails,
  postDevDetails,
  putDevDetails,
  deleteDevDetails,
} from "../controllers/devData.controller.js";

const router = express.Router();

router.get("/", getDevDatas);
router.get("/:id", getDevDetails);
router.post("/", postDevDetails);
router.put("/", putDevDetails);
router.delete("/:id", deleteDevDetails);

export default router;
