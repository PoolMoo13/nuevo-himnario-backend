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

async function updateItem(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    console.log("🚀 ~ file: hymnals.ts:35 ~ updateItem ~ req.body:", req.body); // Añadir registro de req.body
    const body = matchedData(req, { locations: ['body'] }); 
    console.log("🚀 ~ file: hymnals.ts:39 ~ updateItem ~ body:", body);

    if (Object.keys(body).length === 0) {
      console.log("🚀 ~ file: hymnals.ts:41 ~ updateItem ~ El cuerpo de la solicitud está vacío");
      res.status(400).send({ error: 'El cuerpo de la solicitud está vacío' });
      return;
    }

    const data = await tracksModel.findByIdAndUpdate(
      id, 
      body, 
      { new: true }
    );

    if (!data) {
      res.status(404).send({ error: 'Hymnal not found' });
      return;
    }

    res.send({ data });
    console.log("🚀 ~ file: hymnals.ts:53 ~ updateItem ~ data:", data);
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
}


async function deleteItem(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params; 
    const deleteResponse = await tracksModel.deleteOne({ _id: id });
    console.log("🚀 ~ file: hymnals.ts:51 ~ deleteItem ~ id:", id)
    const data = {
      deleted: deleteResponse.deletedCount
    };
    res.send({ data });
    console.log("🚀 ~ file: hymnals.ts:55 ~ deleteItem ~ data:", data)
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};


export { getItems, getItem, createItem, updateItem, deleteItem };