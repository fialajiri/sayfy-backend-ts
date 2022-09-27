import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { StaticPage, StaticPageDoc } from "../../models/static-page/static-page";

const getStaticPageById = async (req: Request, res: Response) => {
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

  res.status(200).send(staticPage);
};

export default getStaticPageById;
