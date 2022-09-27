import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { StaticPage, StaticPageDoc } from "../../models/static-page/static-page";

const updateStaticPage = async (req: Request, res: Response) => {
  const { staticPageId } = req.params;
  const { title, perex, text, assets } = req.body;

  let staticPage: (StaticPageDoc & { _id: any }) | null;

  try {
    staticPage = await StaticPage.findById(staticPageId);
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  if (!staticPage) {
    throw new NotFoundError();
  }

  staticPage.set({ title, perex, text, assets });

  try {
    await staticPage.save();
  } catch (err) {
    throw new DatabaseConnectionError("Statickou stranu se nepodařilo updatovat");
  }

  res.status(200).send(staticPage);
};

export default updateStaticPage;
