import sharp from "sharp";
import download from "image-downloader";
import path from "path";
import User from "../model/user.js";

const thumbnailRouter = require("express").Router();

const __dirname = path.resolve();
function downloadImage(url, filepath) {
  return download.image({
    url,
    dest: __dirname + filepath,
  });
}

thumbnailRouter.get("/", (request, response) => {
  const url = request.query.url;
  console.log(url);
  downloadImage(url, "/images/image.jpg").then(({ filename }) => {
    console.log("Saved to", filename);
    sharp(filename)
      .resize(50, 50)
      .toFile("./images/thumbnail.jpg", (err, info) => {
        if (err) {
          response.status(500).send(err);
        }
        response.status(200).sendFile(__dirname + "/images/thumbnail.jpg");
      });
  });
});

export default thumbnailRouter;
