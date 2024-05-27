const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

app.set('view engine', 'ejs');

// Set the directory where the template files are located
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get("/login", (req,res)=>{
  res.render("login.ejs");
});

app.get("/signup", (req,res)=>{
  res.render("signup.ejs");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});