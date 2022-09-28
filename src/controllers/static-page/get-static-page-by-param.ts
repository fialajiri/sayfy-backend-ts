import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { StaticPage, StaticPageDoc } from "../../models/static-page/static-page";

const getStaticPageByParam = async (req: Request, res: Response) => {
  const { staticPageParam } = req.params;

  console.log(staticPageParam)

  let staticPage: (StaticPageDoc & { _id: any }) | null;

  try {
    staticPage = await StaticPage.findById(staticPageParam);
    console.log(staticPage)
  } catch (err) {
    console.log(err)
    throw new DatabaseConnectionError();
  }

  if (!staticPage) {
    try {
      staticPage = await StaticPage.findOne({ staticPageUrl: staticPageParam });
      console.log(staticPage)
    } catch (err) {
      console.log(err)
      throw new DatabaseConnectionError();
    }
  }

  if (!staticPage) {
    throw new NotFoundError();
  }

  res.status(200).send(staticPage);
};

export default getStaticPageByParam;
