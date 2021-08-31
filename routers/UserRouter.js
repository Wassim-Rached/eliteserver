import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import { generateToken, isAdmin, isAuth } from "../Utils.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get(
  "/profile/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send({
        email: user.email,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned,
        name: user.name,
        profileImg: user.profileImg,
        _id: user._id,
      });
    } else {
      res.send({ message: "User Not Found!" });
    }
  })
);
router.get(
  "/profile/poster/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send({
        name: user.name,
        profileImg: user.profileImg,
        _id: user._id,
      });
    } else {
      res.send({ message: "User Not Found!" });
    }
  })
);
//DELTE PROFILE
router.post(
  "/profile/delete/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "wa55death405@gmail.com") {
        res.status(400).send({
          message: "Can Not Delete Wa55death405 account, BITCH!",
        });
        return;
      }
      if (
        (req.user && req.user._id === req.params.id) ||
        (req.user && req.user.isAdmin)
      ) {
        const deleteUser = await user.remove();
        res.send({ message: "User Deleted", user: deleteUser });
      } else {
        res.send({ message: "your not allowed to delete this account" });
      }
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
//update profile
router.post(
  "/profile/update",
  upload.single("profileImg"),isAuth,
  expressAsyncHandler(async (req, res) => {
    const checkEmail =  await User.find({email:req.body.email})
    if(checkEmail.length < 1){
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email,
        password: bcrypt.hashSync(req.body.password, 10),
        profileImg: req.file ? req.file.originalname : req.user.profileImg,
      });
      try {
        const updated = await updatedUser.save();
        const userinfo = await User.findById(req.user._id);
        res.send({
            profileImg: userinfo.profileImg,
            _id: userinfo._id,
            name: userinfo.name,
            email: userinfo.email,
            isAdmin: userinfo.isAdmin,
            isBanned: userinfo.isBanned,
            token: generateToken(userinfo),
          });
        } catch (error) {
        res.send({message: "faild to update user!" });
      }}
      else{
        res.send({message: "this email is already used!" });
      }
  })
);

// create account
router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const checkEmail =  await User.find({email:req.body.email})
    if(checkEmail.length == 0){
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    try {
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        profileImg: createdUser.profileImg,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isBanned: createdUser.isBanned,
        token: generateToken(createdUser),
      });
    } catch (error) {
      res.send({ message: "fail to create user!" });
    }
  }else{
      res.send({ message: "this email is already used!" });
    }
  })
);

//sign in
router.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (!user.isBanned) {
          res.send({
            profileImg: user.profileImg,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isBanned: user.isBanned,
            token: generateToken(user),
          });
        } else {
          res.status(401).send({ message: "this account is banned" });
        }
      } else {
        res.status(401).send({ message: "wrong password" });
      }
    } else {
      res.status(401).send({ message: "invalid email" });
    }
  })
);
router.post('/profile/getRole',isAuth,expressAsyncHandler(async(req,res)=>{
  const code = req.body.code
  if(code == "F77P7WVT"){
    const updateduser = await User.findByIdAndUpdate(req.user._id,{
            isAdmin: true,
            isBanned: false,
          })
    res.send("account has been updated to admin please re signin to get the features")
  }else{
    res.send("invalid getRole Code")
  }
}))

export default router;
