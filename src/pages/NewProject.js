import React from 'react';
import HorizontalStepper from '../components/Stepper';
import { useParams } from 'react-router-dom';

function NewProject() {
    const { projectId } = useParams();

    return (
        <div> 
           <HorizontalStepper projectId={projectId}/>
        </div>
    );
}

export default NewProject;