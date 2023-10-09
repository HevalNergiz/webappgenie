import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import Steps from "./Stepper/Steps";

const steps = [
  "Select the color palette",
  "Select your style",
  "Specify the pages",
];

export default function HorizontalStepper({ projectId }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const history = useHistory();

  const goToAddComponents = () => {
    history.push(`/add-components/${projectId}`);
  };
  
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep + 1 === 1 && <Steps step="1" />}
            {activeStep + 1 === 2 && <Steps step="2" />}
            {activeStep + 1 === 3 && <Steps step="3" />}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              class="btn btn-primary"
              onClick={
                activeStep === steps.length - 1 ? goToAddComponents : handleNext
              }
            >
              {activeStep === steps.length - 1 ? "Select Pages" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </>
  );
}
