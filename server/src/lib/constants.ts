import dotenv from "dotenv";
dotenv.config();

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const PORT = process.env.PORT || 5173;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const HASH_PREFIX = process.env.HASH_PREFIX || "xx";
export const HASH_SUFFIX = process.env.HASH_SUFFIX || "yy";
export const HASH_SALT = process.env.HASH_SALT || "zz";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const CLOUDINARY_CLOUD_NAME =
  process.env.CLOUDINARY_CLOUD_NAME || "cloud_name";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "api_key";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY;

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "access_key_id";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET || "secret";
export const AWS_S3_BUCKET= process.env.AWS_S3_BUCKET || "bucket";
export const AWS_REGION = process.env.AWS_REGION || "region";
export const AWS_S3_URL = `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com`;