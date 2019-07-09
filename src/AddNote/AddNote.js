import React from 'react';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError';
import './AddNote.css';

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            content: '',
            nameValid: false,
            contentValid: false,
            folderValid: false,
            nameValidationMessages: {
                name: "The note name can not be empty"
            },
            contentValidationMessages: {
                name: "The note content can not be empty"
            },
            folderValidationMessages: {
                name: "Please select a folder first"
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
        const fieldErrors = { ...this.state.nameValidationMessages };
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
            nameValidationMessages: fieldErrors,
            nameValid: !hasError
        });
    }
    validateFolder(fieldValue) {
        const fieldErrors = { ...this.state.folderValidationMessages };
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue === "...") {
            fieldErrors.name = 'You must select a folder first';
            hasError = true;
        } else {
            fieldErrors.name = '';
            hasError = false;

        }

        this.setState({
            folderValidationMessages: fieldErrors,
            folderValid: !hasError
        });
    }
    validateContent(fieldValue) {
        const fieldErrors = { ...this.state.contentValidationMessages };
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldErrors.name = 'Content is required';
            hasError = true;
        } else {
            if (fieldValue.length < 10) {
                fieldErrors.name = 'Content must be at least 10 characters long';
                hasError = true;
            } else {
                fieldErrors.name = '';
                hasError = false;
            }
        }

        this.setState({
            contentValidationMessages: fieldErrors,
            contentValid: !hasError
        });
    }
    handleSubmit = e => {
        e.preventDefault()
        if (this.state.nameValid && this.state.folderValid && this.state.contentValid) {
            const newNote = {
                name: e.target['note-name'].value,
                content: e.target['note-content'].value,
                folderid: e.target['note-folder'].value,
                modified: new Date(),
            }
            fetch(`http://localhost:8000/notes`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newNote),
            })
                .then(res => {
                    if (!res.ok)
                        return res.json().then(e => Promise.reject(e))
                    return res.json()
                })
                .then(note => {
                    this.context.addNote(note)
                    this.props.history.push(`/folders/${note.folderid}`)
                })
                .catch(error => {
                    console.error({ error })
                })
        }

    }
    render() {
        let folders = this.context.folders.map(folder =>
            <option key={folder.id} value={folder.id}>{folder.name}</option>
        );
        return (
            <section className='NoteListMain'>
                <div className="addNote">
                    <h2>Create a note</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className='inputLabel'>
                            <label htmlFor='note-name-input'>
                                Name
                            </label>
                            <input type='text' id='note-name-input' name='note-name' onChange={(e) => this.validateName(e.target.value)} />
                        </div>
                        <ValidationError hasError={!this.state.nameValid} message={this.state.nameValidationMessages.name} />
                        <div className='inputLabel'>
                            <label htmlFor='note-content-input'>
                                Content
                            </label>
                            <textarea id='note-content-input' name='note-content' onChange={(e) => this.validateContent(e.target.value)} />
                        </div>
                        <ValidationError hasError={!this.state.contentValid} message={this.state.contentValidationMessages.name} />
                        <div className='inputLabel'>
                            <label htmlFor='note-folder-option'>
                                Select a folder
                            </label>
                            <select name='note-folder' id="note-folder-option" onChange={(e) => this.validateFolder(e.target.value)} >
                                <option>...</option>
                                {folders}
                            </select>
                        </div>
                        <ValidationError hasError={!this.state.folderValid} message={this.state.folderValidationMessages.name} />

                        <div className='button'>
                            <button type='submit'>
                                Add Note
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}
