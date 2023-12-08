import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStore } from "@fortawesome/free-solid-svg-icons";
import PopperSearch from "~/components/Popper/Popper";
import useQueryProductsByName from "~/hooks/useQueryProductsByName";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MilkContext } from "~/components/ContextMilk/ContextMilk";
import configs from "~/configs";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);

function Search() {
  const [value, setValue] = useState();
  const { setIdProduct } = useContext(MilkContext);
  const { data } = useQueryProductsByName({ name: value });
  const handleSearchProduct = (value) => {
    setValue(value);
  };
  const handleSelectProduct = (e) => {
    setIdProduct(Number(e.currentTarget.id));
  };
  const SearchResultTippy = (attrs) => {
    return (
      <PopperSearch>
        <div className={cx("box")} tabIndex="-1" {...attrs}>
          <div className={cx("header-search")}>
            <FontAwesomeIcon className={cx("icon-shop")} icon={faStore} />
            <span className={cx("title")}>Tìm sản phẩm:{value}</span>
          </div>
          <div className={cx("search-body")}>
            {data &&
              data?.productsByName?.map((result) => (
                <NavLink
                  id={result?.id}
                  to={configs.routes.detailproduct}
                  onClick={handleSelectProduct}
                  className={cx("result-search")}
                  key={result.id}
                >
                  {result.name}
                </NavLink>
              ))}
          </div>
        </div>
      </PopperSearch>
    );
  };
  return (
    <Tippy interactive trigger="click" render={SearchResultTippy}>
      <div className={cx("search")}>
        <FontAwesomeIcon
          className={cx("icon-search")}
          icon={faMagnifyingGlass}
        />
        <input
          className={cx("search-input")}
          type="search"
          name="search"
          onChange={(e) => handleSearchProduct(e.target.value)}
        />
      </div>
    </Tippy>
  );
}

export default Search;
