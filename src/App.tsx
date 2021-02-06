import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboard } from '@fortawesome/free-regular-svg-icons'
import TextEditor from './TextEditor';

library.add(faClipboard);

function App() {
  return (
    <div className="App">
      <TextEditor></TextEditor>
    </div>
  );
}

export default App;
