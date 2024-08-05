/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fectchCarByIdUser, setCartNone } from "../redux/slices/cartSlice";
import Slider from "react-slick";
import Cookies from "js-cookie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { headerService } from "../services/HeaderServices";
import { AccountContext } from "../contexts/AccountContext";
import PopupCartComponent from "./CartComponents/PopupCartComponent";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const cartStore = useSelector((state) => state.cart);
  const { account, setAccount } = useContext(AccountContext);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowPopupCart, setIsShowPopupCart] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [dataHeader, setDataHeader] = useState([]);
  const [jwtCookie, setJwtCookie] = useState(Cookies.get("jwt"));
  useEffect(() => {
    const fetchDataHeader = async () => {
      try {
        setJwtCookie(Cookies.get("jwt"));
        const fechtedHeader = await headerService(jwtCookie);
        setDataHeader(fechtedHeader);
        setAccount(fechtedHeader.dataAccount);
        if (fechtedHeader?.dataAccount?.dataJwt?.id) {
          dispatch(fectchCarByIdUser(fechtedHeader?.dataAccount?.dataJwt?.id));
        }
        if (location.pathname === "/cart") {
          setIsShowPopupCart(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDataHeader();
  }, [jwtCookie, location.pathname]);
  const handleTogglePopupCart = (event) => {
    event.stopPropagation();
    isShowPopupCart === false
      ? setIsShowPopupCart(true)
      : setIsShowPopupCart(false);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("jwt");
    setJwtCookie(undefined);
    setAccount(null);
    dispatch(setCartNone([]));
  };
  const getKeyword = (keyword) => {
    setKeyword(keyword);
  };
  const onSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?keyword=${keyword}`);
    }
  };
  return (
    <header className="header">
      <div className="header__top">
        <div className="header__top--item">
          <ion-icon name="cube-outline" />
          <a href="#" className="header__top--item-link">
            Tra cứu đơn hàng
          </a>
        </div>
        <div className="header__top--item">
          <ion-icon name="location-outline" />
          <a href="#" className="header__top--item-link">
            Tìm cửa hàng
          </a>
        </div>
        <div className="header__top--item">
          <ion-icon name="heart-outline" />
          <a href="#" className="header__top--item-link">
            Yêu thích
          </a>
        </div>
        <div className="header__top--item h-[30px] relative group">
          <ion-icon name="person-outline" />
          <Link
            to={dataHeader.dataAccount ? `` : `/login`}
            className="header__top--item-link"
            id="link_loginHederTop"
          >
            {dataHeader.dataAccount
              ? dataHeader.dataAccount.dataJwt.name
              : "Đăng nhập"}
          </Link>
          {dataHeader.dataAccount ? (
            <div className="absolute z-50 w-[115px] bg-white rounded-md shadow-lg -top-36 opacity-0 group-hover:opacity-100 group-hover:top-[30px] transition-opacity duration-300">
              <div className="py-1">
                <Link
                  to="/userGeneral"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-center"
                >
                  Thông tin
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-gray-200 text-center text-red-500 w-full"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="header__main">
        <div className="header__main--boxLogo">
          <Link to="/">
            <img
              src="/images/Logo_Ananas_Header.svg"
              alt=""
              className="img__logo--header"
            />
          </Link>
        </div>
        <div className="header__main--menu h-full">
          <ul className="h-full">
            <li className="h-full flex items-center">
              <a
                href="#"
                className="button__drop--menu button__drop--menu1 h-full"
              >
                SẢN PHẨM
                <ion-icon
                  className="show_drop_menu"
                  name="chevron-down-outline"
                />
              </a>
              <nav className="drop__menu drop__menu1">
                <ion-icon
                  className="drop__menu1--this"
                  name="caret-up-outline"
                />
                <ul className="drop__menu--style1 drop__menu--ul">
                  {/* DOM SHow */}
                  {dataHeader.categories ? (
                    dataHeader.categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          to={`/shop?id=${category.id}`}
                          className="drop__menu--styel1-item"
                        >
                          <div className="item__box--img">
                            <img
                              src={category.imageCategory}
                              alt=""
                              className="img-itemMenu"
                            />
                          </div>
                          <span className="style1-item--title">
                            {category.nameCategory}
                          </span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <div>khong co thong tin</div>
                  )}
                </ul>
                <span className="drop__menu1--title">
                  MỌI NGƯỜI THƯỜNG GỌI CHÚNG TÔI LÀ{" "}
                  <span className="highlight"> DỨA</span> !
                </span>
              </nav>
            </li>
            <span className="space" />
            <li>
              <a href="#" className="button__drop--menu button__drop--menu2">
                NAM
                <ion-icon
                  className="show_drop_menu"
                  name="chevron-down-outline"
                />
              </a>
              <div className="drop__menu drop__menu2">
                <ion-icon
                  className="drop__menu1--this drop__menu2--this"
                  name="caret-up-outline"
                />
                <div className="drop__menu2--boxContent">
                  {/* this is content */}
                  <div className="content__drop-menu2__left">
                    <span className="content__menu2--title">NỔI BẬT</span>
                    <ul className="drop__menu2--ul drop__menu--ul">
                      <li>
                        <a href="#">Bán chạy</a>
                      </li>
                      <li>
                        <a href="#">Sản phẩm mới</a>
                      </li>
                      <li>
                        <a href="#">Giảm giá</a>
                      </li>
                    </ul>
                    <ul className="drop__menu2--ul drop__menu--ul">
                      <span className="drop__menu2--ul-title">Bộ sản phẩm</span>
                      <li>
                        <a href="#">Pattas Living Journey</a>
                      </li>
                      <li>
                        <a href="#">Pattas Polka Dots</a>
                      </li>
                      <li>
                        <a href="#">Basas Evergreen</a>
                      </li>
                      <li>
                        <a href="#">Urbas Ruler</a>
                      </li>
                      <li>
                        <a href="#">Track 6 Class E</a>
                      </li>
                    </ul>
                    <a className="drop__menu2--linked" href="">
                      Collaboration
                    </a>
                  </div>
                  <div className="content__drop-menu2__right">
                    <div className="drop__menu2--content-shoe">
                      <span className="content__menu2--title">GIÀY</span>
                      <ul className="drop__menu2--ul drop__menu--ul">
                        <span className="drop__menu2--ul-title">
                          Dòng sản phẩm
                        </span>
                        <li>
                          <a href="#">Basas</a>
                        </li>
                        <li>
                          <a href="#">Vintas</a>
                        </li>
                        <li>
                          <a href="#">Urbas</a>
                        </li>
                        <li>
                          <a href="#">Pattas</a>
                        </li>
                        <li>
                          <a href="#">Creas</a>
                        </li>
                        <li>
                          <a href="#">Track 6</a>
                        </li>
                      </ul>
                      <ul className="drop__menu2--ul drop__menu--ul">
                        <span className="drop__menu2--ul-title">Style</span>
                        <li>
                          <a href="#">Hight Top</a>
                        </li>
                        <li>
                          <a href="#">Low Top</a>
                        </li>
                        <li>
                          <a href="#">Slip - on</a>
                        </li>
                      </ul>
                      <a className="drop__menu2--linked" href="">
                        Tất cả giày
                      </a>
                    </div>
                    <div className="drop__menu2--content-fashion">
                      <span className="content__menu2--title">
                        THỜI TRANG &amp; PHỤ KIỆN
                      </span>
                      <ul className="drop__menu2--ul drop__menu--ul">
                        <span className="drop__menu2--ul-title">Nửa trên</span>
                        <li>
                          <a href="#">Basic Tee</a>
                        </li>
                        <li>
                          <a href="#">Graphic Tee</a>
                        </li>
                        <li>
                          <a href="#">Sweatshirt</a>
                        </li>
                        <li>
                          <a href="#">Hoodie</a>
                        </li>
                      </ul>
                      <ul className="drop__menu2--ul drop__menu--ul">
                        <span className="drop__menu2--ul-title">Phụ kiện</span>
                        <li>
                          <a href="#">Nón</a>
                        </li>
                        <li>
                          <a href="#">Giây dày</a>
                        </li>
                        <li>
                          <a href="#">Túi</a>
                        </li>
                        <li>
                          <a href="#">Túi Tote</a>
                        </li>
                      </ul>
                      <a className="drop__menu2--linked" href="">
                        Xem tất cả
                      </a>
                    </div>
                  </div>
                  {/* this is content */}
                </div>
                <span className="drop__menu1--title">
                  MỌI NGƯỜI THƯỜNG GỌI CHÚNG TÔI LÀ{" "}
                  <span className="highlight"> DỨA</span> !
                </span>
              </div>
            </li>
            <span className="space" />
            <li>
              <a className="button__drop--menu button__drop--menu2" href="#">
                NỮ
                <ion-icon
                  className="show_drop_menu"
                  name="chevron-down-outline"
                />
              </a>
              <div className="drop__menu drop__menu2">
                <ion-icon
                  className="drop__menu1--this drop__menu3--this"
                  name="caret-up-outline"
                />
                <div className="drop__menu2--boxContent">
                  {/* this is content */}
                  <div className="content__drop-menu2__left">
                    <span className="content__menu2--title">NỔI BẬT</span>
                    <ul className="drop__menu2--ul drop__menu--ul">
                      <li>
                        <a href="#">Bán chạy</a>
                      </li>
                      <li>
                        <a href="#">Sản phẩm mới</a>
                      </li>
                      <li>
                        <a href="#">Giảm giá</a>
                      </li>
                    </ul>
                    <ul className="drop__menu2--ul drop__menu--ul">
                      <span className="drop__menu2--ul-title">Bộ sản phẩm</span>
                      <li>
                        <a href="#">Pattas Living Journey</a>
                      </li>
                      <li>
                        <a href="#">Pattas Polka Dots</a>
                      </li>
                      <li>
                        <a href="#">Basas Evergreen</a>
                      </li>
                      <li>
                        <a href="#">Urbas Ruler</a>
                      </li>
                      <li>
                        <a href="#">Track 6 Class E</a>
                      </li>
                    </ul>
                    <a className="drop__menu2--linked" href="">
                      Collaboration
                    </a>
                  </div>
                  <div className="content__drop-menu2__right">
                    <div className="drop__menu2--content-shoe">
                      <span className="content__menu2--title">GIÀY</span>
                      <ul className="drop__menu2--ul drop__menu--ul">
                        <span className="drop__menu2--ul-title">
                          Dòng sản phẩm
                        </span>
                        <li>
                          <a href="#">Basas</a>
                        </li>
                        <li>
                          <a href="#">Vintas</a>
                        </li>
                        <li>
                          <a href="#">Urbas</a>
                        </li>
                        <li>
                          <a href="#">Pattas</a>
                        </li>
                        <li>
                          <a href="#">Creas</a>
                        </li>
                        <li>
                          <a href="#">Track 6</a>
                        </li>
                      </ul>
                      <ul className="drop__menu2--ul drop__menu--ul">
                        <span className="drop__menu2--ul-title">Style</span>
                        <li>
                          <a href="#">Hight Top</a>
                        </li>
                        <li>
                          <a href="#">Low Top</a>
                        </li>
                        <li>
                          <a href="#">Slip - on</a>
                        </li>
                      </ul>
                      <a className="drop__menu2--linked" href="">
                        Tất cả giày
                      </a>
                    </div>
                    <div className="drop__menu2--content-fashion">
                      <span className="content__menu2--title">
                        THỜI TRANG &amp; PHỤ KIỆN
                      </span>
                      <ul className="drop__menu2--ul drop__menu--ul">
                        <span className="drop__menu2--ul-title">Nửa trên</span>
                        <li>
                          <a href="#">Basic Tee</a>
                        </li>
                        <li>
                          <a href="#">Graphic Tee</a>
                        </li>
                        <li>
                          <a href="#">Sweatshirt</a>
                        </li>
                        <li>
                          <a href="#">Hoodie</a>
                        </li>
                      </ul>
                      <ul className="drop__menu2--ul drop__menu--ul">
                        <span className="drop__menu2--ul-title">Phụ kiện</span>
                        <li>
                          <a href="#">Nón</a>
                        </li>
                        <li>
                          <a href="#">Giây dày</a>
                        </li>
                        <li>
                          <a href="#">Túi</a>
                        </li>
                        <li>
                          <a href="#">Túi Tote</a>
                        </li>
                      </ul>
                      <a className="drop__menu2--linked" href="">
                        Xem tất cả
                      </a>
                    </div>
                  </div>
                  {/* this is content */}
                </div>
                <span className="drop__menu1--title">
                  MỌI NGƯỜI THƯỜNG GỌI CHÚNG TÔI LÀ{" "}
                  <span className="highlight"> DỨA</span> !
                </span>
              </div>
            </li>
            <span className="space" />
            <li>
              <a href="#">SALE OFF</a>
            </li>
            <span className="space" />
            <li>
              <a href="#">
                <div className="discover-youBox">
                  <img src="/images/DiscoverYOU.svg" alt="" />
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="header__main--left">
          <form className="box__search">
            <button className="button__search" onClick={onSearch}>
              <ion-icon name="search-outline" />
            </button>
            <input
              className="search__products"
              type="text"
              name="keyword"
              value={keyword}
              onInput={(e) => getKeyword(e.target.value)}
              placeholder="Tìm kiếm sản phẩm"
            />
          </form>
          <div className="box__cart">
            <ion-icon
              id="box__cart--icon"
              name="cart-outline"
              onClick={handleTogglePopupCart}
            />
            {cartStore?.listProducts.length > 0 ? (
              <span className="quantityCart">
                {cartStore.listProducts.length}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="header__slide">
        <Slider {...settings}>
          <div className="header__slide--box">
            <span className="header__slide--item">
              HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH
            </span>
          </div>
          <div className="header__slide--box">
            <span className="header__slide--item">
              BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN
            </span>
          </div>
        </Slider>
      </div>
      <PopupCartComponent
        isShow={isShowPopupCart}
        handleTogglePopupCart={handleTogglePopupCart}
        cartStore={cartStore}
        idUser={account?.dataJwt.id}
      ></PopupCartComponent>
    </header>
  );
};

export default HeaderComponent;
