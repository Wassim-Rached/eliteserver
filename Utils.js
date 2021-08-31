import jwt from "jsonwebtoken";
import mg from "mailgun-js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender:user.gender,
      profileImg:user.profileImg,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      isBanned: user.isBanned,
    },
    process.env.JWT_SECRET,
    {}
  );
};
export const isAuth = (req, res, next) => {
  // console.log(req.headers)
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isBanned = (req, res, next) => {
    if (req.user && req.user.isBanned) {
        res.status(401).send({ message: 'your account is banned!' });
    } else {
        next();
    }
  };
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };