const jwt = require("jsonwebtoken");
const secretKey = "872004";
function createJWT(data) {
  let token;
  try {
    token = jwt.sign({ data }, `${secretKey}`, { expiresIn: "24h" });
  } catch (err) {
    console.log(err);
  }
  return token;
}
function JWTverify(token, secretKey) {
  let data = null;
  try {
    let decoded = jwt.verify(token, secretKey);
    data = decoded;
  } catch (err) {
    console.log(err);
  }
  return data;
}
module.exports = { createJWT, JWTverify };
