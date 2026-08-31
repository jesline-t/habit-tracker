const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;

  console.log(authorization)

  if (!authorization || !authorization.startsWith("Bearer ")){
    //always attach bearer (is a token) infront/start when sending authorizations
    return res.status(401).json({ message: "Not authorized." });
  }

  const token = authorization.split(" ")[1]; // this part is extracting token from bearer

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: "Your login has expired." });
  }
}

module.exports = requireAuth;
