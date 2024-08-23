import express from "express";
const router = express.Router();
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers/hymnals";


router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export {router};