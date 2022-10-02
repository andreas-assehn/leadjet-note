import React, { useState, useEffect } from 'react';
import { Note } from './NoteType';
import './NoteCard.css';

function NoteCard({ note }: { note: Note }) {
  const [text, setText] = useState(note.body);

  useEffect(() => {
    const updated = { body: text };
    const delayPutRequest = setTimeout(async () => {
      await fetch(`https://challenge.leadjet.io/cph/notes/${note.id}`, {
        method: 'PUT',
        body: JSON.stringify(updated),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }, 3000);

    return () => clearTimeout(delayPutRequest);
  }, [text, note.id]);

  return (
    <div className='wrapper'>
      <div className='content'>
        <p className='title'>Note Title</p>
        <p className='updated'>Last update: DD MMM, YYYY</p>
        <textarea
          className='edit-text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter text...'
        ></textarea>
      </div>
    </div>
  );
}

export default NoteCard;
