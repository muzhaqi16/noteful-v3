import React from 'react';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';
import Note from '../Note/Note';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import './NoteList.css';

export default class NoteList extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = ApiContext;

    handleDeleteNote = noteId => {
        this.props.history.push(`/`)
    }

    render() {
        const { notes = [] } = this.context;
        const { noteId } = this.props.match.params;
        const note = notes.find(note => note.id === noteId) || { content: '' }


        return (
            <section className='NoteListMain'>
                <ul className="noteList">
                    <ErrorBoundary>
                        <Note key={note.id}
                            name={note.name}
                            id={note.id}
                            modified={note.modified}
                            onDeleteNote={this.handleDeleteNote} />
                    </ErrorBoundary>
                </ul>
                <p>{note.content}</p>
            </section>
        )
    }
}
NoteList.propTypes = {
    noteId: PropTypes.string.isRequired,
}