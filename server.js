import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
import fileUpload from "express-fileupload";
import path from "path";

dotenv.config();

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@memories.np8je.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

app.use(cors());

app.use(express.json());

app.use(express.static(path.resolve('./', "static")));
app.use(fileUpload({}));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use("/api", indexRouter);

app.use(errorHandler);

app.listen(
  process.env.PORT ?? 3001,
  console.log(`server working on ${process.env.PORT}`)
);
