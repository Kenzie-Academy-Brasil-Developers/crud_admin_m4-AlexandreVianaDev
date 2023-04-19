import "express-async-errors";
import express, { Application, json } from "express";
import { errorHandler } from "./middlewares/handle.middleware";
import userRoutes from "./routers/users.routes";

const app: Application = express();
app.use(json());

app.use("/users", userRoutes);

// tem que por o .error ?
app.use(errorHandler);

export default app;
