import { Request, Response } from "express";
import mongoose from "mongoose";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { Aktualita, AktualitaDoc } from "../../models/aktualita/aktualita";

const getAktualitaByParam = async (req: Request, res: Response) => {
  const { aktualitaParam } = req.params;

  let aktualita: (AktualitaDoc & { _id: any }) | null;

  if (aktualitaParam.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      aktualita = await Aktualita.findById(aktualitaParam);
    } catch (err) {
      throw new DatabaseConnectionError();
    }
  } else {
    try {
      aktualita = await Aktualita.findOne({ aktualitaUrl: aktualitaParam });
    } catch (err) {
      throw new DatabaseConnectionError();
    }
  }

  if (!aktualita) {
    throw new NotFoundError();
  }

  res.status(200).send(aktualita);
};

export default getAktualitaByParam;
