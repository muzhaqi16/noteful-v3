import React from 'react';
import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NoteNav.css';
export default class NoteNav extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;

    render() {

        return (
            <section className='NoteNav'>
                <Link to="" onClick={() => this.props.history.goBack()}><FontAwesomeIcon icon="arrow-left" /> Go Back</Link>
            </section>
        )
    }
}