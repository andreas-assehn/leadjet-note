import React, { useState, useEffect, DragEvent } from 'react';
import { Note, User } from './types';
import './NoteCard.css';
import { MentionsInput, Mention } from 'react-mentions';

function NoteCard({
  note,
  users,
  drag,
}: {
  note: Note;
  users: User[];
  drag: string;
}) {
  const [text, setText] = useState(note.body);

  // Updating note
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
    }, 2000);

    return () => clearTimeout(delayPutRequest);
  }, [text, note.id]);

  // Dealing with drop event
  const onDrop = () => {
    setText((prevState) => `${prevState}${drag}`);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className='wrapper'>
      <div className='content'>
        <p className='title'>Note Title</p>
        <p className='updated'>Last update: DD MMM, YYYY</p>

        <MentionsInput
          className='edit-text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Mention people using @'
          onDrop={onDrop}
          onDragOver={(e) => onDragOver(e)}
        >
          <Mention
            className='mention'
            trigger='@'
            data={(search, cb) => {
              search
                ? cb(
                    users.filter((user) => user.id.includes(search)).slice(0, 5)
                  )
                : cb(users.slice(0, 5));
            }}
          />
        </MentionsInput>
      </div>
    </div>
  );
}

export default NoteCard;
