import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { gql, useMutation } from "@apollo/client";
import { MenuItem, TextField } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./ButtonReviewProduct.module.scss";
import { useState } from "react";
import useReviews from "~/hooks/useReviews";
import { useEffect } from "react";
import useQueryFindOrder from "~/hooks/useQueryFindOrder";
import ButtonDeleteReview from "./ButtonDeleteReview";
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
const UPDATE_REVIEW = gql`
  mutation UpdateReview($input: productUpdateReviewInput!) {
    updateReview(input: $input) {
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
  // console.log("data nè", data);
  const productId = data?.productId;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState({});
  const [createReview] = useMutation(CREATE_REVIEW);
  const [updateReview] = useMutation(UPDATE_REVIEW);
  const [reviews, setReviews] = useState([]);
  // const [productReview, setProductReview] = useState();
  const userIdLocal = localStorage.getItem("userId");
  const [productReview, setProductReview] = useState(null);
  const { data: dataReviews, refetch } = useReviews();
  const { data: dataOrders } = useQueryFindOrder({ status: "DONE" });

  const handleValueReview = (id, value) => {
    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  useEffect(() => {
    //tim` order
    dataOrders?.findOrdersByStatus?.find((order) => {
      // setReviews([...])
      //tim` review theo order
      dataReviews?.reviews?.find((review) => {
        if (Number(order?.id) === Number(review?.orderId)) {
          setReviews((reviews) => [review, ...reviews]);
        }
      });
    });
  }, [dataOrders?.findOrdersByStatus, dataReviews]);
  useEffect(() => {
    // if (reviews) {
    //   console.log("rv", reviews);
    // }
    setProductReview(
      reviews.filter((product) => productId === product.productId)?.[0]
    );
  }, [productId, reviews]);

  useEffect(() => {
    if (productReview) {
      console.log("prr", productReview);
    }
  }, [productReview]);
  const handleCreateReview = async () => {
    const productCreateReviewInput = {
      input: {
        createdDate: new Date(dateNow),
        detail: value?.detail,
        productId: Number(data?.productId),
        rating: value?.rating,
        updatedDate: new Date(dateNow),
        userId: userIdLocal,
        orderId: String(data?.orderId),
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
  const handleUpdateReview = async () => {
    const productUpdateReviewInput = {
      input: {
        detail: value?.detail || productReview?.detail,
        id: productReview?.id,
        rating: value?.rating || productReview?.rating,
      },
    };
    const result = await updateReview({
      variables: {
        input: productUpdateReviewInput.input,
      },
    });
    refetch();
    setOpen(false);
    console.log("Update đánh giá thành công", result);
  };
  return (
    <div>
      {productReview ? (
        <Button
          style={{
            backgroundColor: "var(--secondary)",
            color: "var(--white)",
          }}
          onClick={handleOpen}
        >
          Xem đánh giá
        </Button>
      ) : (
        <Button
          style={{
            backgroundColor: "var(--secondary)",
            color: "var(--white)",
          }}
          onClick={handleOpen}
        >
          Đánh giá sản phẩm
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cx("form-group")}>
            <h2 style={{ color: "var(--text-color)", marginBottom: "10px" }}>
              Đánh giá sản phẩm
            </h2>
            <div className={cx("form-item")}>
              <TextField
                className={cx("input-value")}
                id="detail"
                defaultValue={productReview?.detail ?? ""}
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
                defaultValue={productReview?.rating}
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
            {productReview ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "white",
                    marginRight: "5px",
                  }}
                  onClick={handleUpdateReview}
                >
                  UPDATE
                </Button>
                <ButtonDeleteReview data={productReview?.id} />
              </div>
            ) : (
              <Button
                style={{ backgroundColor: "var(--secondary)", color: "white" }}
                onClick={handleCreateReview}
              >
                Gửi Đánh Giá
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
