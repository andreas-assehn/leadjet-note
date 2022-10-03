import React, { DragEvent, useEffect, useState } from 'react';
import NoteCard from './NoteCard';
import './NotesScreen.css';
import { LeadjetUser, Note, User } from './types';

function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [mostMentioned, setMostMentioned] = useState<User[]>([]);
  const [drag, setDrag] = useState('');

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

  useEffect(() => {
    const fetchMostMentioned = async () => {
      const data = await fetch(
        'https://challenge.leadjet.io/users/mostMentioned'
      );
      const jsonMostMentioned = await data.json();
      const formattedUsers = jsonMostMentioned.map((user: LeadjetUser) => {
        return {
          id: `${user.first_name}_${user.last_name}`,
          display: `@${user.first_name}_${user.last_name}`,
        };
      });
      setMostMentioned(formattedUsers);
    };

    try {
      fetchMostMentioned();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch('https://challenge.leadjet.io/users');
      const jsonUsers = await data.json();
      const formattedUsers = jsonUsers.map((user: LeadjetUser) => {
        return {
          id: `${user.first_name}_${user.last_name}`,
          display: `@${user.first_name}_${user.last_name}`,
        };
      });
      setUsers(formattedUsers);
    };

    try {
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addNote = async () => {
    const newNote = await fetch('https://challenge.leadjet.io/cph/notes', {
      method: 'POST',
      body: JSON.stringify({ body: 'Init' }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const jsonNewNote = await newNote.json();
    setNotes((prevState) => [...prevState, { id: jsonNewNote.id, body: '' }]);
  };

  const onDrag = (e: DragEvent, user: User) => {
    e.preventDefault();
    setDrag(`@[${user.display}](${user.id})`);
  };

  return (
    <>
      <div className='header'>
        <img
          src='https://uploads-ssl.webflow.com/5fbc0d068c247eca8397bc5c/621f334c2dcd4c5e5dc1dc9b_Logo%20Original.svg'
          alt='leadjet-logo'
        />
        <div className='most-mentioned'>
          <span>
            {mostMentioned.map((user) => (
              <span
                className='most-mentioned-id'
                draggable='true'
                onDrag={(e) => onDrag(e, user)}
                key={user.id}
              >
                {user.id}
              </span>
            ))}
          </span>
        </div>
        <button onClick={addNote}>Add new note</button>
      </div>
      <div className='container'>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} users={users} drag={drag} />
        ))}
      </div>
    </>
  );
}

export default NotesScreen;
