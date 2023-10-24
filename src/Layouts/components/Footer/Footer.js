import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import images from "~/assets/Images/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { client } from "~/ApolloClient";
import { gql } from "~/ApolloClient";
import { useQuery } from "@apollo/client";
const cx = classNames.bind(styles);
function Footer() {
  const { data } = useQuery(gql`
    query Users {
      users {
        email
        id
        imageURL
        name
        roleId
        token
      }
    }
  `);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("footer")}>
        <div className={cx("footer-item")}>
          <img className={cx("logo")} src={images.logo} alt="" />
          <span className={cx("description")}>
            Uống sữa là một thói quen dinh dưỡng quan trọng trong cuộc sống hàng
            ngày. Việc đổ một ly sữa tươi lạnh và thơm ngon, sau đó thưởng thức
            từng ngụm sữa béo ngon, mang lại cảm giác sảng khoái và cung cấp
            nhiều dưỡng chất quý giá cho cơ thể.
          </span>
        </div>
        {/*  */}
        <div className={cx("footer-item")}>
          <h3 className={cx("title")}>Our Menu</h3>
          <div className={cx("menu-item")}>
            <img className={cx("menu-img")} src={images.milk} alt="" />
            <span>Milk</span>
          </div>{" "}
          <div className={cx("menu-item")}>
            <img className={cx("menu-img")} src={images.yogurt} alt="" />
            <span>Yogurt</span>
          </div>{" "}
          <div className={cx("menu-item")}>
            <img className={cx("menu-img")} src={images.cream} alt="" />
            <span>Kem</span>
          </div>{" "}
          <div className={cx("menu-item")}>
            <img className={cx("menu-img")} src={images.nuocgiaikhat} alt="" />
            <span>Nước giải khát</span>
          </div>
        </div>

        <div className={cx("footer-item")}>
          <h3 className={cx("title")}>Service</h3>
          <span className={cx("service-item")}>Chăm sóc khách hàng</span>
          <span className={cx("service-item")}>Giao hàng tận nơi</span>
          <span className={cx("service-item")}>
            Chính sách và qui định chung
          </span>{" "}
        </div>
        {/*  */}
        <div className={cx("footer-item")}>
          <h3 className={cx("title")}>Get in touch</h3>
          <div className={cx("des-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faPhone} />
            <span>+0987654321</span>
          </div>
          <div className={cx("des-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faLocationDot} />
            <span>828 Sư Vạn Hạnh, Quận 10</span>
          </div>
          <div className={cx("society")}>
            <img className={cx("icon-society")} src={images.facebook} alt="" />
            <img className={cx("icon-society")} src={images.instagram} alt="" />
            <img className={cx("icon-society")} src={images.tiktok} alt="" />
            <img className={cx("icon-society")} src={images.twitter} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
