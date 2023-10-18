import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useContext } from "react";
import { MilkContext } from "../ContextMilk/ContextMilk";

const OrderStepsData = ["Cart", "Delivery", "Payment", "Done"];

function OrderSteps() {
  const { activeStep } = useContext(MilkContext);
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {OrderStepsData.map((label) => (
          <Step key={label}>
            <StepLabel style={{ fontSize: "30px" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
export default OrderSteps;
