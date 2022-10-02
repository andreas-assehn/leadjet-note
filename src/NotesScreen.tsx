import React, { useEffect, useState } from 'react';
import NoteCard from './NoteCard';
import './NotesScreen.css';
import { Note } from './NoteType';

function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://challenge.leadjet.io/cph/notes');
      const jsonNotes = await data.json();
      setNotes(jsonNotes);
    };

    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <img
        src='https://uploads-ssl.webflow.com/5fbc0d068c247eca8397bc5c/621f334c2dcd4c5e5dc1dc9b_Logo%20Original.svg'
        alt='leadjet-logo'
      />
      <div className='container'>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </>
  );
}

export default NotesScreen;
