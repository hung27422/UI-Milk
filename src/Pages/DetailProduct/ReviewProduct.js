import classNames from "classnames/bind";
import styles from "./ReviewProduct.module.scss";
import useReviews from "~/hooks/useReviews";
import { useEffect } from "react";
import useQueryUsers from "~/hooks/useQueryUsers";
const cx = classNames.bind(styles);
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
function ReviewProduct({ product }) {
  const { data: dataReviews } = useReviews();
  const { data: dataUser } = useQueryUsers();
  const imgUser = dataReviews?.reviews.map((review) => {
    let stringImg = "";
    dataUser?.users.find((user) => {
      if (review?.userId === user.id) {
        stringImg = user;
      }
    });
    return stringImg;
  });
  const filteredReviews = dataReviews?.reviews.filter((review) =>
    dataUser?.users.some((user) => user.id === review.userId)
  );
  //   useEffect(() => {
  //     if (dataUser) {
  //       console.log(dataUser);
  //     }
  //   }, [dataUser]);
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Đánh giá sản phẩm</h2>
      <div className={cx("box-reviews")}>
        {filteredReviews?.map((item) => {
          if (item?.productId === product.id) {
            const userReview = imgUser.find((user) => user?.id === item.userId);
            return (
              <div
                style={{ borderBottom: "1px solid #ccc", marginBottom: "12px" }}
                key={item?.id}
              >
                <div className={cx("info-user")}>
                  <div className={cx("info-left")}>
                    <img
                      src={userReview?.imageURL}
                      alt="avt"
                      className={cx("img-user")}
                    />
                  </div>
                  <div className={cx("info-right")}>
                    <span className={cx("name-user")}>{userReview?.name}</span>
                    <span className={cx("type-review")}>
                      Loại đánh giá: <span>{item?.rating}</span>
                    </span>
                    <span className={cx("date")}>
                      {item?.updatedDate !== null
                        ? formatDate(item?.updatedDate)
                        : formatDate(item?.createdDate)}
                    </span>
                  </div>
                </div>
                <span className={cx("detail-reviews")}>{item?.detail}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default ReviewProduct;
