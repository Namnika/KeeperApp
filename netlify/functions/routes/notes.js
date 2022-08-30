const router = require("express").Router();
const bodyParser = require("body-parser");
let Note = require("../models/note.model");

router.use(bodyParser.urlencoded({extended: true}));

router.route("/").get((req, res) => {
    Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json("Error: " + err));

});

router.route("/").post((req, res) => {
    const newNote = new Note({
        title: req.body.title, content: req.body.content
    });

    newNote.save()
    .then(()=>res.send("Note added!"))
    .catch(err => res.status(400).json("Error: " + err))
});

router.route("/:id")
    .delete((req, res) => {
    Note.findByIdAndDelete(req.params.id).then(() => res.send("Note deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
