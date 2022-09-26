import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { Aktualita, AktualitaDoc } from "../../models/aktualita/aktualita";

const deleteAktualita = async (req: Request, res: Response) => {
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

  try {
    await aktualita.deleteOne();
  } catch (err) {
    throw new DatabaseConnectionError("Aktualitu se nepodařilo smazat");
  }

  res.status(200).send();
};

export default deleteAktualita;
