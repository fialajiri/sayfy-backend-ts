export const COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: true,
  // signed: true,
  // maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY!) * 1000,
  sameSite: "none" as "none",
};
