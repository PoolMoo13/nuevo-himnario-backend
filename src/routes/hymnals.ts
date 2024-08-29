import express from "express";
const router = express.Router();
import { createItem, deleteItem, getItem, searchByTitle, getItems, updateItem } from "../controllers/hymnals";

router.get("/search", searchByTitle);
router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

export {router};