import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { Aktualita, AktualitaDoc } from "../../models/aktualita/aktualita";

const getAktualitaById = async (req: Request, res: Response) => {
  const { aktualitaId } = req.params;

  let aktualita: (AktualitaDoc & { _id: any }) | null;

  try {
    aktualita = await Aktualita.findById(aktualitaId);
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  if (!aktualita) {
    throw new NotFoundError();
  }

  res.status(200).send(aktualita);
};

export default getAktualitaById;
