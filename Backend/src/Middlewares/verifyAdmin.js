import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json("Not authorized");

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json("Invalid token");
    req.user = user;
    next();
  });
};

export default verifyAdmin;