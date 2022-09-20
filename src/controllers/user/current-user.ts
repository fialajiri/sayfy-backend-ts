import { Request, Response } from "express";

const getCurrentUser = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export default getCurrentUser;
