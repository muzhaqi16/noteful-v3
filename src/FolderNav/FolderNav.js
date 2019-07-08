import React from 'react';
import ApiContext from '../ApiContext';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './FolderNav.css';

export default class FolderNav extends React.Component {
    static contextType = ApiContext;

    render() {
        const { folders = [], notes = [] } = this.context;
        return (
            <ul className="folderList">
                {folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink to={`/folders/${folder.id}`}>
                            <FontAwesomeIcon icon="folder" className="closedFolder" />
                            <FontAwesomeIcon icon="folder-open" className="openFolder" />
                            {' '}
                            {folder.name}
                            <span className="noteCount">
                                {(notes.filter(note => note.folderid === folder.id)).length}
                            </span>
                        </NavLink>
                    </li>
                )}
                <li>
                    <NavLink to="/add-folder"><FontAwesomeIcon icon="folder-plus" /> Add Folder</NavLink>
                </li>
            </ul>
        )
    }
}