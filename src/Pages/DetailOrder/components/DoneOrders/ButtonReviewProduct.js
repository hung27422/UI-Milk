import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import classNames from "classnames/bind";
import styles from "./ButtonReviewProduct.module.scss";
import { useState } from "react";
import useReviews from "~/hooks/useReviews";
import { useEffect } from "react";
const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CREATE_REVIEW = gql`
  mutation CreateReview($input: productCreateReviewInput!) {
    createReview(input: $input) {
      string
    }
  }
`;
const valueRating = [
  {
    value: "BAD",
    label: "BAD",
  },
  {
    value: "GOOD",
    label: "GOOD",
  },
  {
    value: "NORMAL",
    label: "NORMAL",
  },
  {
    value: "VERY_GOOD",
    label: "VERY_GOOD",
  },
  {
    value: "VERY_BAD",
    label: "VERY_BAD",
  },
];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const dateNow = `${currentDay}/${currentMonth}/${currentYear}`;
export default function ButtonReviewProduct({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState({});
  const [valueId, setValueId] = useState();
  const [createReview] = useMutation(CREATE_REVIEW);
  const userIdLocal = localStorage.getItem("userId");
  const { refetch } = useReviews();

  const handleChangeIdProduct = (id) => {
    setValueId(id);
    console.log(id);
  };
  const handleValueReview = (id, value) => {
    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleCreateReview = async () => {
    const productCreateReviewInput = {
      input: {
        createdDate: new Date(dateNow),
        detail: value?.detail,
        productId: Number(valueId),
        rating: value?.rating,
        updatedDate: new Date(dateNow),
        userId: userIdLocal,
      },
    };
    const result = await createReview({
      variables: {
        input: productCreateReviewInput.input,
      },
    });

    refetch();
    setOpen(false);
    console.log("Đánh giá thành công", result);
  };

  return (
    <div>
      <Button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--white)",
        }}
        onClick={handleOpen}
      >
        Đánh giá sản phẩm
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cx("form-group")}>
            <div className={cx("box-item")}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Chọn sản phẩm đánh giá
                </FormLabel>
                {data?.items?.map((item) => {
                  return (
                    <RadioGroup
                      key={item?.id}
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      defaultChecked={item[0]?.productId}
                      value={valueId}
                      onChange={(e) => handleChangeIdProduct(e.target.value)}
                    >
                      <FormControlLabel
                        value={item?.productId}
                        control={<Radio />}
                        label={item?.name}
                      />
                    </RadioGroup>
                  );
                })}
              </FormControl>
            </div>

            <div className={cx("form-item")}>
              <TextField
                className={cx("input-value")}
                id="detail"
                label="Nội dung đánh giá"
                onChange={(e) => handleValueReview("detail", e.target.value)}
                variant="outlined"
              />
            </div>
            <div className={cx("form-item")}>
              <TextField
                className={cx("input-value")}
                id="outlined-select-currency"
                select
                label="Chọn Rating"
                onChange={(e) => handleValueReview("rating", e.target.value)}
              >
                {valueRating.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className={cx("btn-action")}>
            <Button
              style={{ backgroundColor: "var(--secondary)", color: "white" }}
              onClick={handleCreateReview}
            >
              Gửi Đánh Giá
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
