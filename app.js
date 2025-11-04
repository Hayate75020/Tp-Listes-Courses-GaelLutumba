const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const courses = require("./routes/courses");
app.use("/courses", courses);

app.listen(port, () => {
  console.log(`serveur en ligne`);
});
