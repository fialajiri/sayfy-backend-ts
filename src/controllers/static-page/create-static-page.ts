import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { StaticPage } from "../../models/static-page/static-page";

const createStaticPage = async (req: Request, res: Response) => {
  const { title, perex, text, assets } = req.body;

  const newStaticPage = StaticPage.build({
    title,
    perex,
    text,
    assets,
  });

  try {
    await newStaticPage.save();
  } catch (err) {
    throw new DatabaseConnectionError("Statickou stranu se nepodařilo uložit");
  }

  res.status(201).send(newStaticPage);
};

export default createStaticPage;
