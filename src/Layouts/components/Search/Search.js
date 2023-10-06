import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStore } from "@fortawesome/free-solid-svg-icons";
import PopperSearch from "~/components/Popper/Popper";
const cx = classNames.bind(styles);

const ResultSearch = ({ children }) => {
  return <span className={cx("result-search")}>{children}</span>;
};
const SearchResultTippy = (attrs) => {
  return (
    <PopperSearch>
      <div className={cx("box")} tabIndex="-1" {...attrs}>
        <div className={cx("header-search")}>
          <FontAwesomeIcon className={cx("icon-shop")} icon={faStore} />
          <span className={cx("title")}>Tìm sản phẩm: "Sữa"</span>
        </div>
        <div className={cx("search-body")}>
          <ResultSearch>Sữa tiệc trùng VinaMilk</ResultSearch>
          <ResultSearch>Sữa tiệc trùng TH Milk</ResultSearch>
        </div>
      </div>
    </PopperSearch>
  );
};
function Search() {
  return (
    <Tippy interactive trigger="click" render={SearchResultTippy}>
      <div className={cx("search")}>
        <FontAwesomeIcon
          className={cx("icon-search")}
          icon={faMagnifyingGlass}
        />
        <input className={cx("search-input")} type="search" name="search" />
      </div>
    </Tippy>
  );
}

export default Search;
