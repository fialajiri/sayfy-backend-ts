import { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { UserDoc, User } from "../../models/user/user";
import { COOKIE_OPTIONS } from "../../services/constants/cookie-options";
import { jwtService, userPayload } from "../../services/jwt";

const signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  let existingUser: (UserDoc & { _id: any }) | null;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    throw new DatabaseConnectionError();
  }

  if (existingUser) {
    throw new BadRequestError("Uživatel s tímto emailem již existuje. Zkuste se přihlásit");
  }

  const newUser = User.build({
    email,
    password,
    username,
  });

  await newUser.save();

  const payload = {
    id: newUser.id,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  } as userPayload;

  const userJwt = jwtService.getToken(payload);

  req.session = {
    jwt: userJwt,
  };

  res.status(201).cookie("jwt", userJwt, COOKIE_OPTIONS).send(newUser);
};

export default signup;
