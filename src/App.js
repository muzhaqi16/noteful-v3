import React from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FolderNav from './FolderNav/FolderNav';
import FolderList from './FolderList/FolderList';
import NoteNav from './NoteNav/NoteNav';
import NoteList from './NoteList/NoteList';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ApiContext from './ApiContext';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import './App.css';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    const url = 'http://afternoon-shelf-12998.herokuapp.com';
    Promise.all([
      fetch(`${url}/notes`),
      fetch(`${url}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error(error.message + '. Make sure that the server is running')
      })
  }
  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={FolderNav}
          />
        )}
        <Route
          path='/notes/:noteId'
          component={NoteNav}
        />
        <Route
          path='/add-folder'
          component={FolderNav}
        />
        <Route
          path='/add-note'
          component={NoteNav}
        />
      </>
    )
  }
  renderMainRoutes() {
    return (
      <>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={FolderList}
          />
        )}
        <Route
          path='/notes/:noteId'
          component={NoteList}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }
  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <header className="App-header">
            <h1>
              <Link to='/'>Noteful: <FontAwesomeIcon icon="sticky-note" /></Link>
            </h1>
          </header>
          <div className="container">
            <nav>
              <ErrorBoundary>
                {this.renderNavRoutes()}
              </ErrorBoundary>

            </nav>
            <main>
              <ErrorBoundary>
                {this.renderMainRoutes()}
              </ErrorBoundary>

            </main>
          </div>
        </div>
      </ApiContext.Provider>
    );
  }
}
export default App;
