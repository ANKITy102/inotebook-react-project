import React, { useState } from 'react'
import NoteContext from './noteContext'
const NoteState = (props) => {
    const host = "http://localhost:5000"
    // addnote api localhost:5000/api/notes/updatenote/643c32ff99e4f0fd92c5f986
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const [logOut, setLogOut] = useState(false);
    const [name, setName] = useState("nothing");

    //Get all notes fetch api'
    const getNotes = async () => {
        const response1 = await fetch(`${host}/api/notes/fetchAllnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.   credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // console.log(await response1.name)

        const json = await response1.json()
        const name = json.name;

        // console.log(response1[1].json())
        setNotes(json.notes)
        setLogOut(true);
        setName(name);
    }



    // Add a Note
    const addNote = async (title, description, tag) => {
        //todo : api call
        console.log(title, description, tag)
        // setNotes(notes.push(note))            concat returns an array whereas push updates an array
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.   credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = await response.json()

        setNotes(notes.concat(json))
        props.showAlert("Added Successfully", "success");
    }

    // Delete a Note
    const deleteNote = async (id) => {



        //todo : api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.   credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }, // body data type must match "Content-Type" header
        });
        // const json = response.json();
        // console.log(json)
        let res = response;
        res = 'fetched';
        console.log(res);
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)

    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        //Api call
        console.log("api hit", id, title, description, tag)
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.   credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        // const json = await response.json()
        // console.log(json)
        // parses JSON response into native JavaScript objects
        let res = response;
        res = 'fetched';
        console.log(res);
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = title;
                break;
            }
        }
        setNotes(newNotes);
    }
    //lgic


    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes, logOut, setLogOut, name }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
