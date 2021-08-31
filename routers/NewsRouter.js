import News from "../models/NewsModels.js";
import expressAsyncHandler from "express-async-handler";
import express from "express";
import { isAuth, isAdmin } from "../Utils.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/images/news");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/:size", async (req, res) => {
  const size = req.params.size
  const news = await News.find({},null,{ sort :{ createdAt : -1}});
  const items = news.slice(0, size)
  res.send(items);
});

router.post(
  "/add",
  upload.single("newsImage"),isAuth,isAdmin,
  expressAsyncHandler(async (req, res) => {
    const news = new News({
      title: req.body.title,
      description: req.body.description,
      image:req.file.originalname,
      posterId:req.user._id,
      posterName:req.user.name,
      posterImg:req.user.profileImg,
    });
    try {
      const createdNews = await news.save();
      res.send({ message: "News Created", news: createdNews });
    } catch (error) {
      res.send({ message: error });
    }
  })
);

export default router;
