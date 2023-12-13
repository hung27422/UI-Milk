import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { gql, useMutation } from "@apollo/client";
import useReviews from "~/hooks/useReviews";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const DELETE_REVIEW = gql`
  mutation DeleteReview($input: productDeleteReviewInput!) {
    deleteReview(input: $input) {
      string
    }
  }
`;
export default function ButtonDeleteReview({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const { refetch } = useReviews();

  const handleDeleteReview = async () => {
    const productDeleteReviewInput = {
      input: {
        id: data,
      },
    };
    const result = await deleteReview({
      variables: {
        input: productDeleteReviewInput.input,
      },
    });
    setOpen(false);
    refetch();
    console.log("Xóa đánh giá thành công: ", result);
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "red",
          color: "white",
          marginLeft: "5px",
        }}
        onClick={handleOpen}
      >
        DELETE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn chắc chắn muốn xóa đánh giá này ?
          </Typography>
          <Button
            style={{
              backgroundColor: "red",
              color: "var(--white)",
            }}
            onClick={handleDeleteReview}
          >
            Chắn chắn
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
