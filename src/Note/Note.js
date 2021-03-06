import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import './Note.css';

export default class Note extends React.Component {
    constructor(props) {
        super(props)
        this.handleClickDelete = this.handleClickDelete.bind(this)
    }

    static contextType = ApiContext;

    handleClickDelete = e => {
        e.preventDefault()

        const noteId = this.props.id;
        const url = 'https://afternoon-shelf-12998.herokuapp.com';
        fetch(`${url}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                return res
            })
            .then(() => {
                this.context.deleteNote(noteId);
                this.props.onDeleteNote();
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const { name, id, modified } = this.props;
        return (
            <li className='Note'>
                <h2 className='title'>
                    <Link to={`/notes/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button
                    className='deleteButton'
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    <FontAwesomeIcon icon='trash' />
                </button>
                <div className='dates'>
                    <div className='dates-modified'>
                        <span className='Date'>
                            {modified}
                        </span>
                    </div>
                </div>
            </li>
        )
    }
}
Note.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string,
}
