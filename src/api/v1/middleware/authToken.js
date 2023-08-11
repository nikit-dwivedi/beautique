//--------------------------------------------------modules-------------------------------------------------//
import jwtPkg from "jsonwebtoken";
import bcryptjsPkg from "bcryptjs";
import { readFileSync } from "fs";
//--------------------------------------------------helpers-------------------------------------------------//
import { forbidden, unauthorized } from '../helpers/response.helper.js'
const { genSalt, hash, compare } = bcryptjsPkg
const { sign, verify } = jwtPkg


//-------------------------------------------------privateKey----------------------------------------------//
const adminPrivateKEY = readFileSync("./key/admin/root/admin.private.pem", "utf8")

//--------------------------------------------------publicKey----------------------------------------------//
const adminPublicKEY = readFileSync("./key/admin/root/admin.public.pem", "utf8")

//--------------------------------------------------options-------------------------------------------------//
const signOption = { expiresIn: "30 days", algorithm: "PS256" };
const verifyOption = { expiresIn: "30 days", algorithm: ["PS256"] };


//--------------------------------------------------generate------------------------------------------------//

export const generateAdminToken = (adminData) => {
  const data = {
    adminId: adminData.adminId,
    email: adminData.email,
    name: adminData.name
  };
  return sign(data, adminPrivateKEY, signOption);
};


// ------------------------------------------------authenticate------------------------------------------------//


export function authenticateAdmin(req, res, next) {
  let authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      verify(token, adminPublicKEY, verifyOption);
      next();
    } catch (err) {
      unauthorized(res, "invalid token");
    }
  } else {
    forbidden(res, "token not found");
  }
}



export function parseJwt(data) {
  try {
    let token = data.slice(7);
    const decode = Buffer.from(token.split(".")[1], "base64");
    const toString = decode.toString();
    return JSON.parse(toString);
  } catch (e) {
    return null;
  }
}

export async function encryption(data) {
  try {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashData = await hash(data, salt);
    return hashData;
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function checkEncryption(data, encryptData) {
  try {
    const check = await compare(data, encryptData);
    return check;
  } catch (error) {
    throw new Error(error.message)
  }
}