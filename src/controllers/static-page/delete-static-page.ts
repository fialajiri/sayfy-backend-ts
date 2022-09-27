import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { StaticPage, StaticPageDoc } from "../../models/static-page/static-page";

const deleteStaticPage = async (req: Request, res: Response) => {
  const { staticPageId } = req.params;

  let staticPage: (StaticPageDoc & { _id: any }) | null;

  try {
    staticPage = await StaticPage.findById(staticPageId);
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  if (!staticPage) {
    throw new NotFoundError();
  }

  try {
    await staticPage.deleteOne();
  } catch (err) {
    throw new DatabaseConnectionError("Statickou stranu se nepodařilo smazat");
  }

  res.status(200).send();
};

export default deleteStaticPage;
