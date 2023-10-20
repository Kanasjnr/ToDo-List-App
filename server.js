const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
//render css as static file

app.use(express.static("public"));

//placeholder for task
const task = ["coding", "learning"];
//placeholder for complete
const complete = ["way to mosque"];

app.post("/addtask", function (req, res) {
  const newTask = req.body.newtask;

  if (typeof newTask !== "string" || newTask.trim() === "") {
    res
      .status(400)
      .send(
       ` <script>alert("Input something");window.location.href = "/";</script>`
      );
  } else {
    task.push(newTask);
    res.redirect("/");
  }
});
app.post("/removetask", function (req, res) {
  const completedTask = req.body.check;

  // check the "type of" the differnetn task then add it to the complete task

  if (typeof completedTask === "string") {
    complete.push(completedTask);

    task.splice(task.indexOf(completedTask), 1);
  } else if (typeof completedTask === "object") {
    for (let i = 0; i < completedTask.length; i++) {
      complete.push(completedTask[i]);
      task.splice(task.indexOf(completedTask[i]), 1);
    }
  }
  res.redirect("/");
});

//endering ejs and display added task, complete task
app.get("/", function (req, res) {
  res.render("index", { task: task, complete: complete });
});

app.listen(port, () => console.log(`server listening on PORT ${port}`));
