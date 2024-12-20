const express = require("express");
const http = require("http");
const app = express();
const dotenv = require("dotenv");
const { userRouter } = require("./routes/user");
const { penRouter } = require("./routes/pens");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://codepen-fullstack-client.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
  })
);
app.use(cookieParser());

app.use("/api/v1", userRouter, penRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use((err, req, res, next) => {
  const { message = "internal server error", status = 500 } = err;
  res.status(status).json({
    message: message,
  });
  next(err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
