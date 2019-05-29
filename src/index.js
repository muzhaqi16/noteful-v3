import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faFolder, faFolderOpen, faFolderPlus, faStickyNote, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import App from './App';
library.add(faTrash, faFolder, faFolderOpen, faFolderPlus, faStickyNote, faArrowLeft);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));