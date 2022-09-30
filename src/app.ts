import express from "express";
import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHanlder } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

import { CORS_OPTIONS } from "./services/constants/cores-options";
import { currentUser } from "./middlewares/current-user";
import { userRoutes } from "./routes/user-routes";
import { aktualitaRoutes } from "./routes/aktualita-routes";
import { galleryRoutes } from "./routes/gallery-routes";
import { staticPageRoutes } from "./routes/static-page-routes";
import { requestLogger } from "./middlewares/logger";
import { uploadRoutes } from "./routes/upload-routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));

app.use(currentUser);
app.use(requestLogger);

app.use(uploadRoutes)
app.use(userRoutes);
app.use(aktualitaRoutes);
app.use(galleryRoutes);
app.use(staticPageRoutes);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHanlder);

export { app };
