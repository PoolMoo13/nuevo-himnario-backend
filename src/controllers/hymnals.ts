import { Request, Response } from "express";
import tracksModel from "../models/hymnals";
import { matchedData } from "express-validator";
import { handleHttpError } from "../utils/handleError";

async function getItems(req: Request, res: Response): Promise<void> {
  try {
      const data = await tracksModel.findAllData();
      res.send({ data });
    } catch (e) {
      res.status(500)
      res.send({error:'ERROR_GET_ITEMS'})
    }
}

async function getItem(req: Request, res: Response): Promise<void> {
  try {
    const data = await tracksModel.findOne();
    res.send({ data });
  } catch (e) {
    res.status(500)
    res.send({ error: 'ERROR_GET_ITEMS' })
  }
}

async function createItem(req: Request, res: Response): Promise<void> {
  try {
    const data = await tracksModel.create(req.body);
    res.status(201).send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_CREATE_ITEM');
  }
}

async function updateItem(req: Request, res: Response) {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(
      id, body
    );
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

async function deleteItem(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = matchedData(req);
    const deleteResponse = await tracksModel.deleteOne({ _id: id });
    const data = {
      deleted: deleteResponse.deletedCount
    }
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

export { getItems, getItem, createItem, updateItem, deleteItem };