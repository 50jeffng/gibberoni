import React, { useRef } from 'react';
import './TextEditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Translator from './translator';

const translator = new Translator();

function TextEditor() {
    const [inputText, setInputText] = React.useState('');
    const [outputText, setOutputText] = React.useState('');
    const [translateMode, setTranslateMode] = React.useState('bold');
    const outputTextRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        if (translator.enabled) {
            setOutputText(translator.translate(inputText, translateMode));
        }
        else {
            setOutputText(inputText);
        }
        e.preventDefault();
    };
    const copyToClipboard = () => {
        outputTextRef.current?.select();
        document.execCommand("copy");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputText} onChange={event=>setInputText(event.target.value)}/>
            <input type="submit" value="gibber it!"/>
            <div className="outputContainer">
                <input className="outputText" type="text" value={outputText} readOnly={true} ref={outputTextRef}/>
                <button className="copyBtn" title="Copy to clipboard" onClick={copyToClipboard}><FontAwesomeIcon icon={["far", "clipboard"]}/></button>
            </div>
        </form>
    );
}

export default TextEditor;