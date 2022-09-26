import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { Aktualita, AktualitaDoc } from "../../models/aktualita/aktualita";

const getAktuality = async (req: Request, res: Response) => {
  let aktuality: (AktualitaDoc & { _id: any })[];

  try {
    aktuality = await Aktualita.find();
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  res.status(200).send(aktuality);
};

export default getAktuality;
