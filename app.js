const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const blogRoute = require("./routes/blogRoute")
const app = express();

const dbURI = "mongodb://kartal:mk123456@node-tuts-shard-00-00.38uc3.mongodb.net:27017,node-tuts-shard-00-01.38uc3.mongodb.net:27017,node-tuts-shard-00-02.38uc3.mongodb.net:27017/note-tuts?ssl=true&replicaSet=atlas-djp1vq-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(8000, console.log("Server listening port :8000")))
    .catch(err => console.log(err))

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(logger("dev"))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get("/create", (req, res) => {
    res.render("create", { title: "Create New Blog" })
})

app.use('/blogs', blogRoute);




app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});