import { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { User, UserDoc } from "../../models/user/user";
import { COOKIE_OPTIONS } from "../../services/constants/cookie-options";
import { jwtService, userPayload } from "../../services/jwt";
import { Password } from "../../services/password";

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  

  let existingUser: (UserDoc & { __id: any }) | null;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  if (!existingUser) {
    throw new BadRequestError("Neplatné přístupové údaje");
  }

  
  const passwordMatch = await Password.compare(existingUser.password, password);

  if (!passwordMatch) {
    throw new BadRequestError("Neplatné přístupové údaje");
  }

  const payload: userPayload = {
    id: existingUser.id,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  };

  const userJwt = jwtService.getToken(payload);

  

  res.status(200).cookie("jwt", userJwt, COOKIE_OPTIONS).send(payload);
};

export default signin;
