import { Request, Response } from "express";
import mongoose from "mongoose";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { StaticPage, StaticPageDoc } from "../../models/static-page/static-page";

const getStaticPageByParam = async (req: Request, res: Response) => {
  const { staticPageParam } = req.params;

  let staticPage: (StaticPageDoc & { _id: any }) | null;

  if (mongoose.isValidObjectId(staticPageParam)) {
    try {
      staticPage = await StaticPage.findById(staticPageParam);      
    } catch (err) {      
      throw new DatabaseConnectionError();
    }
  } else {
    try {
      staticPage = await StaticPage.findOne({ staticPageUrl: staticPageParam });      
    } catch (err) {      
      throw new DatabaseConnectionError();
    }
  }

  if (!staticPage) {
    throw new NotFoundError();
  }

  res.status(200).send(staticPage);
};

export default getStaticPageByParam;
