import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const OrderStepsData = ["Cart", "Payment", "Delivery", "Done"];

function OrderSteps() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={0} alternativeLabel>
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
