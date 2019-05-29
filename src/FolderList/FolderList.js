import React from 'react';
import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note';
import './FolderList.css';

export default class FolderList extends React.Component {
    static contextType = ApiContext;

    render() {
        const { folderId } = this.props.match.params
        let { notes = [] } = this.context;
        if (folderId) {
            notes = notes.filter(
                note => note.folderId === folderId
            )
        }
        return (
            <section className='NoteListMain'>
                <ul className="noteList">
                    {notes.map(note =>
                        <ErrorBoundary>
                            <Note key={note.id}
                                name={note.name}
                                id={note.id}
                                modified={note.modified} />
                        </ErrorBoundary>
                    )}
                    <li className="addNoteButton">
                        <Link to="/add-note"><FontAwesomeIcon icon="sticky-note" /> Add Note</Link>
                    </li>
                </ul>
            </section>
        )
    }
}
FolderList.propTypes = {
    folderId: PropTypes.string.isRequired,
}