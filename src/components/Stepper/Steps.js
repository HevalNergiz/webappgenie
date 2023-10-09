import React, { useEffect, useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';


const Steps = (props) => {
    const [step, setStep] = useState()

    useEffect(()=>{
        if (props.step === "1"){
            setStep(1)
        }
        if (props.step  === "2"){
            setStep(2)
        }
        if (props.step === "3"){
            setStep(3)
        }
    },[])

    return (
        <div>
           {step === 1 && (<div><Step1/></div>)}
           {step === 2 && (<div><Step2/></div>)}
           {step === 3 && (<div><Step3/></div>)}
        </div>
    );
}

export default Steps;