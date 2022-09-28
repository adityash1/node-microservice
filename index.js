import express from "express";
const app = express();
import "express-async-errors";
import { userExtractor } from "./utils/middleware.js";

app.use(express.json());

// app.get("/", (_, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

app.use("/login", userExtractor, loginRouter);
app.use("/signup", userExtractor, usersRouter);
app.use("/thumbnail", userExtractor, thumbnailRouter);

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
