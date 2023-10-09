import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CodeEditor from '../components/Editor';

function Results() {
    const history =useHistory()
    const returnto = () =>{
        history.push("/")
    }
    return (
        <div>
            <p>Your App Is Ready!</p>
            <CodeEditor />
            <Button variant='primary' onClick={returnto}>Return to home</Button>
        </div>
    );
}

export default Results;