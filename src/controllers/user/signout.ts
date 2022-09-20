import { Request, Response } from "express";
import { COOKIE_OPTIONS } from "../../services/constants/cookie-options";

const signout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", COOKIE_OPTIONS);
  res.send({});
};

export default signout;
