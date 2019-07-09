import React from 'react';
import ApiContext from '../ApiContext';
import Note from '../Note/Note';
import './NoteList.css';

export default class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }
    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = ApiContext;

    handleDeleteNote = () => {
        this.props.history.push(`/`)
    }

    render() {
        const { notes = [] } = this.context;
        const { noteId } = this.props.match.params;
        const note = notes.find(note => note.id === parseInt(noteId)) || { content: '' }


        return (
            <section className='NoteListMain'>
                <ul className="noteList">
                    <Note
                        name={note.name}
                        id={String(note.id)}
                        modified={note.modified}
                        onDeleteNote={this.handleDeleteNote} />
                </ul>
                <p>{note.content}</p>
            </section>
        )
    }
}