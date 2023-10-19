import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Đơn hàng đã được đặt",
    description: `Đơn đã đặt`,
  },
  {
    label: "Nhân viên đang chuẩn bị đơn hàng",
    description: "Đang chuẩn bị",
  },
  {
    label: "Đang vận chuyển",
    description: `Shipper đã lấy hàng và đang vận chuyển tới bạn`,
  },
  {
    label: "Đã giao",
    description: `Giao hàng thành công`,
  },
];

export default function FollowShipment() {
  const [activeStep, setActiveStep] = React.useState(2);

  //   const handleNext = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };

  //   const handleBack = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   };

  //   const handleReset = () => {
  //     setActiveStep(0);
  //   };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {/* <Box sx={{ mb: 2 }}>
                <div>
                  <Button variant="contained" sx={{ mt: 1, mr: 1 }}>
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button disabled={index === 0} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box> */}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button sx={{ mt: 1, mr: 1 }}>Reset</Button>
        </Paper>
      )} */}
    </Box>
  );
}
