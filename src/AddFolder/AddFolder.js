import React from 'react';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError';

import './AddFolder.css';

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameValid: false,
            validationMessages: {
                name: "The folder name can not be empty"
            }
        }
    }
    static defaultProps = {
        history: {
            push: () => { }
        },
    }
    static contextType = ApiContext;

    validateName(fieldValue) {
        const fieldErrors = { ...this.state.validationMessages };
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldErrors.name = 'Name is required';
            hasError = true;
        } else {
            if (fieldValue.length < 3) {
                fieldErrors.name = 'Name must be at least 3 characters long';
                hasError = true;
            } else {
                fieldErrors.name = '';
                hasError = false;
            }
        }

        this.setState({
            validationMessages: fieldErrors,
            nameValid: !hasError
        });
    }
    handleSubmit = e => {
        e.preventDefault()
        if (this.state.nameValid) {
            const folder = {
                name: e.target['folder-name'].value
            }
            fetch(`https://afternoon-shelf-12998.herokuapp.com/folders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(folder),
            })
                .then(res => {
                    if (!res.ok)
                        return res.json().then(e => Promise.reject(e))
                    return res.json()
                })
                .then(folder => {
                    this.context.addFolder(folder)
                    this.props.history.push(`/folders/${folder.id}`)
                })
                .catch(error => {
                    console.error({ error })
                })
        }
    }
    render() {
        return (
            <section className='NoteListMain'>
                <div className="addFolder">
                    <h2>Create a folder</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className='inputLabel'>
                            <label htmlFor='folder-name-input'>
                                Name
                        </label>
                            <input type='text' id='folder-name-input' name='folder-name' onChange={(e) => this.validateName(e.target.value)} />
                        </div>
                        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />
                        <div className='button'>
                            <button type='submit'>
                                Add folder
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}