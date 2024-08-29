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
    const { id } = req.params; 

    const data = await tracksModel.findOne({ _id: id }); 

    if (!data) {
      res.status(404).send({ error: 'ITEM_NOT_FOUND' }); 
      return;
    }

    res.send({ data });
  } catch (e) {
    console.error("Error fetching item:", e);
    res.status(500).send({ error: 'ERROR_GET_ITEMS' });
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

async function updateItem(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params; 
    const body = req.body.data;

    if (!id) {
      res.status(400).send({ error: 'ID_NOT_PROVIDED' });
      return;
    }
    delete body._id;
    const data = await tracksModel.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );

    if (!data) {
      res.status(404).send({ error: 'ITEM_NOT_FOUND' });
      return;
    }
    res.send({ data });
  } catch (e) {
    res.status(500).send({ error: 'ERROR_UPDATE_ITEM' });
  }
}


async function deleteItem(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params; 
    const deleteResponse = await tracksModel.deleteOne({ _id: id });
    const data = {
      deleted: deleteResponse.deletedCount
    };
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};


export { getItems, getItem, createItem, updateItem, deleteItem };