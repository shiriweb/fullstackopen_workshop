require("dotenv").config();
const app = require("./app");

const config = require("./utils/config");


// Starting the Server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
