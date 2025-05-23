const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors");

//deotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();
app.use(cors());

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes.js"));
app.use("/api/v1/admin", require("./routes/adminRoutes.js"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes.js"));

//port
const port = process.env.PORT;
//listen port
app.listen(port, () => {
  console.log(
    `server is running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
