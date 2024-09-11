const env = process.env;

export const MONGO_DB_URL = env.MONGO_DB_URL
  ? env.MONGO_DB_URL
  : "mongodb+srv://sales-db:1234567890@sales-db.byr93.mongodb.net/?retryWrites=true&w=majority&appName=sales-db";

export const API_SECRET = env.API_SECRET
  ? env.API_SECRET
  : "YXV0aC1hcGktc2VjcmV0LWRldi0xMjM0NTY=";

export const RABBIT_MQ_URL = env.RABBIT_MQ_URL
  ? env.RABBIT_MQ_URL
  : "amqps://jwqzlzca:Pfn868xuZxcXNHxdHdrIW07CQK06t3Jy@prawn.rmq.cloudamqp.com/jwqzlzca";

export const PRODUCT_API_URL = env.PRODUCT_API_URL
  ? env.PRODUCT_API_URL
  : "http://localhost:8081/api/product";
