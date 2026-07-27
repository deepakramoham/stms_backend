require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDB, connectDBLocal } = require("./config/dbConn.js");
const { logger } = require("./middleware/logEvents.js");
const { errorHandler } = require("./middleware/errorHanlder.js");
const corsOptions = require("./config/corsOptions.js");
const credentials = require("./middleware/credentials.js");
const verifyJWT = require("./middleware/verifyJMT.js");

const PORT = process.env.PORT;

connectDB();

app.use(logger);
app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/login", require("./routes/auth.js"));
app.use("/register", require("./routes/register.js"));

app.use("/student", require("./routes/api/student.js"));
app.use("/task", require("./routes/api/task.js"));

app.use(verifyJWT);

// app.use("/v1/student", require("./routes/api/v1/student.js"));
app.use("/v1/task", require("./routes/api/v1/tasks.js"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
