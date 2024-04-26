const express = require("express");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employeeRoutes.js");
const departmentRoutes = require("./routes/departmentRoutes.js");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://jcrr1985:Tumama4$@cluster0.zi7qsgn.mongodb.net/fullapp",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", employeeRoutes);
app.use("/", departmentRoutes);

app.use("/uploads", express.static("uploads"));
const port = 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
