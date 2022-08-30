import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  useEffect(() => {
    axios.get("https://keeper-app-bice.vercel.app/")
    .then(res => {
        setNotes(res.data);
    })
    .catch(err => {
        console.log(err);
    });
  });


  function deleteNote(id) {
    axios.delete(`https://keeper-app-bice.vercel.app/${id}`)
    .then(res => console.log(res.data));
    setNotes((prevNotes) => {
      return prevNotes.filter(note => note._id !== id);
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => {
        return (
          <Note
            key={note._id}
            _id={note._id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
