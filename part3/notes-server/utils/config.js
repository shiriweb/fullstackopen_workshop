require("dotenv").config();

const PORT = process.env.PORT ? process.env.PORT : 3001;
const MONGODB_URI =
  process.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URL
    : process.env.MONGODB_URI;

module.exports = { MONGODB_URI, PORT };
