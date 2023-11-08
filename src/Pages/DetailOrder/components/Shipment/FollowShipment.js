import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Đơn hàng đã được đặt",
    description: `Đơn đã đặt`,
  },
  {
    label: "Nhân viên giao hàng đang trên đường tới kho lấy hàng",
    description: "Đang chuẩn bị",
  },
  {
    label: "Nhân viên giao hàng đã lấy hàng",
    description: `Shipper đã lấy hàng và đang vận chuyển tới bạn`,
  },
  {
    label: "Nhân viên giao hàng đang trên đường giao tới bạn",
    description: `Vui lòng để ý số điện thoại`,
  },
  {
    label: "Đã giao",
    description: `Giao hàng thành công`,
  },
];

export default function FollowShipment() {
  const [activeStep, setActiveStep] = React.useState(2);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
