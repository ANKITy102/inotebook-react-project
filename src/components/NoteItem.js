import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext)
    const { deleteNote } = context
    return (

        <div className="col-md-3" >
            <div className="card my-3" style={{ width: "18rem" }}>

                <div className="card-body">

                    <h5 className="card-title">{note.title} </h5>
                    <p className="card-text">{note.description}</p>
                    <i onClick={() => {
                        deleteNote(note._id);
                        props.showAlert("Deleted Successfully", "success");
                    }} className="fa-solid fa-trash mx-2 text-danger h5"></i>
                    <i className="fa-solid fa-pen-to-square text-warning mx-2 h5" onClick={() => {
                        updateNote(note);

                    }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
