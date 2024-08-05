import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/styles/shop.css";
import {
  getDataShopById,
  getDataShopByKeyword,
} from "../../services/ShopServices";
import LoadingTruck from "../../components/LoadingComponent/LoadingTruck";

const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idCategory = searchParams.get("id");
  const keyword = searchParams.get("keyword");
  const [dataShop, setDataShop] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const componentRef = useRef(null);
  const handleToggleFilter = () => {
    !showFilter ? setShowFilter(true) : setShowFilter(false);
  };
  const like = (e) => {
    e.preventDefault();
    e.target.classList.toggle("love");
  };
  useEffect(() => {
    const fechtDataShop = async () => {
      try {
        if (idCategory && keyword == null) {
          const fechtedShop = await getDataShopById(idCategory);
          setDataShop(fechtedShop);
        } else {
          const fechtedShop = await getDataShopByKeyword(keyword);
          setDataShop(fechtedShop);
        }
        if (componentRef.current) {
          componentRef.current.scrollIntoView({ behavior: "smooth" }); // Cuộn lên đầu trang
        }
      } catch (err) {
        console.error(err);
      }
    };
    fechtDataShop();
  }, [idCategory, keyword]);
  return (
    <main className="main" ref={componentRef}>
      <section className="main__content-shop">
        {dataShop.products ? (
          dataShop.products.length === 0 ? (
            <LoadingTruck></LoadingTruck>
          ) : (
            <>
              <div className="main__content-shop--top">
                <div className="container__filter">
                  <div className="show-hiddenFilter">
                    <button
                      className="show-hiddenFilter--btn"
                      onClick={handleToggleFilter}
                    >
                      <ion-icon name="filter-outline" />
                      <span className="show-hiddenFilter_text">
                        {showFilter ? "Ẩn Filter" : "Hiện Filter"}
                      </span>
                    </button>
                  </div>
                  <div
                    className={`container__filter--main ${
                      showFilter ? "show" : ""
                    }`}
                  >
                    <button className="show__filter__list">
                      <ion-icon name="caret-down-outline" />
                      <span className="show__filter__list-title">Giá</span>
                      <ul className="filter__list">
                        <li className="filter__list--item">
                          <input
                            className="filter__list--item-input"
                            type="checkbox"
                          />
                          <span className="filter__list--item-name">
                            Giảm dần
                          </span>
                        </li>
                        <li className="filter__list--item">
                          <input
                            className="filter__list--item-input"
                            type="checkbox"
                          />
                          <span className="filter__list--item-name">
                            Tăng dần
                          </span>
                        </li>
                      </ul>
                    </button>
                    <button className="show__filter__list">
                      <ion-icon name="caret-down-outline" />
                      <span className="show__filter__list-title">Danh mục</span>
                      <ul className="filter__list">
                        <li className="filter__list--item">
                          <input
                            className="filter__list--item-input"
                            type="checkbox"
                          />
                          <span className="filter__list--item-name">
                            Bán chạy
                          </span>
                        </li>
                        <li className="filter__list--item">
                          <input
                            className="filter__list--item-input"
                            type="checkbox"
                          />
                          <span className="filter__list--item-name">
                            Giảm giá
                          </span>
                        </li>
                        <li className="filter__list--item">
                          <input
                            className="filter__list--item-input"
                            type="checkbox"
                          />
                          <span className="filter__list--item-name">Mới</span>
                        </li>
                      </ul>
                    </button>
                    <button className="show__filter__list">
                      <ion-icon name="caret-down-outline" />
                      <span className="show__filter__list-title">Tên</span>
                      <ul className="filter__list">
                        <li className="filter__list--item">
                          <input
                            className="filter__list--item-input"
                            type="checkbox"
                          />
                          <span className="filter__list--item-name">A-Z</span>
                        </li>
                        <li className="filter__list--item">
                          <input
                            className="filter__list--item-input"
                            type="checkbox"
                          />
                          <span className="filter__list--item-name">Z-A</span>
                        </li>
                      </ul>
                    </button>
                  </div>
                </div>
              </div>
              <div className="main__content-shop--bottom">
                <div className="container__products showContentShop">
                  {/* DOM SHOW */}
                  {dataShop.products
                    ? dataShop.products.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.categoriesProduct}/${product.id}`}
                          className="product__link"
                        >
                          <div className="container__product--item">
                            <div className="product__item--boxImg">
                              <img src={product.imageProduct} alt="" />
                              <div className="product__item--boxAction">
                                <ion-icon
                                  className="icon-share"
                                  name="share-social-outline"
                                />
                                <ion-icon
                                  onClick={(e) => like(e)}
                                  className="icon-heart"
                                  name="heart"
                                />
                                <ion-icon
                                  className="icon-addcart"
                                  name="bag-add-outline"
                                />
                              </div>
                            </div>
                            <div className="product__item--content">
                              <span className="name__product">
                                {product.nameProduct}
                              </span>
                              <span className="price__product text-orange-600">
                                {product.priceProduct.toLocaleString("vi-VN")} đ
                              </span>
                              <div className="product__content--bottom">
                                <span className="views__product">
                                  {product.viewProduct}+ views
                                </span>
                                <span className="evaluate">
                                  <span>{product.quantitySold} đã bán</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    : null}
                </div>
              </div>
            </>
          )
        ) : (
          <LoadingTruck></LoadingTruck>
        )}
      </section>
      <section className="main__shop--banner2">
        <div className="shop__banner2--content">
          <div className="shop__banner2--content-left">
            <img
              src="../images/Logo_Ananas_Footer.svg"
              alt=""
              className="logo__banner-shop"
            />
            <div className="shop__banner2--content-bottom">
              <img src="../images/Logo_Ananas_Header.svg" alt="" />
              <span>/2024</span>
            </div>
          </div>
          <div className="shop__banner2--content-right">
            <span className="content__right-top">
              GIẢM GIÁ CỰC SỐC &amp; MIỄN PHÍ VẬN CHUYỂN
            </span>
            <span className="content__right-bottom">Với hóa đơn từ 900k!</span>
          </div>
        </div>
      </section>
      <section className="container__article">
        <div className="container__article--box">
          <span className="container__article--title">TIN TỨC</span>
          <span className="container__article--title2">
            VÔ VÀN ƯU ĐÃI HẤP DẪN CÙNG
            <br />
            <span className="ananas_highlight">ANANAS!</span>
          </span>
          <span className="article-line" />
          <span className="container__article--content">
            Chúng tôi rất vui mừng thông báo rằng bộ sưu tập giày mới của chúng
            tôi sẽ ra mắt vào ngày 3 tháng 8 năm 2023. Bộ sưu tập này bao gồm
            một loạt các kiểu dáng và màu sắc mới, phù hợp với mọi sở thích và
            phong cách. Bộ sưu tập mới được lấy cảm hứng từ những xu hướng thời
            trang mới nhất, với các kiểu dáng hiện đại và thời trang. Các màu
            sắc được lựa chọn cẩn thận để phù hợp với mọi tông da và phong cách.
            Chúng tôi tin rằng bộ sưu tập mới này sẽ là một bổ sung tuyệt vời
            cho tủ quần áo của bạn. Hãy nhớ đặt hàng sớm để đảm bảo bạn có được
            đôi giày yêu thích của mình!
          </span>
          <div className="container__article--boxButton">
            <a className="button__discover" href="#">
              Khám phá ngay
            </a>
            <a className="button__contact" href="#">
              Liên hệ
            </a>
          </div>
        </div>
        <div className="container__article--box">
          <span className="container__article--title">BÀI VIẾT</span>
          <div className="container__article--items">
            <div className="container__article--item">
              <div className="article--item__boxImg">
                <a href="#">
                  <img
                    src="https://ananas.vn/wp-content/uploads/kvngang_mobile_web-300x160.jpg"
                    alt=""
                  />
                </a>
              </div>
              <a className="article--item__title" href="#">
                URBAS CORLURAY PACK
              </a>
              <p className="article--item__content">
                Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết
                hợp 5 gam màu mang sắc thu; phù hợp với những người trẻ năng
                động, mong muốn thể...
              </p>
              <a href="#" className="article--item__content-more">
                Đọc thêm
              </a>
            </div>
            <div className="container__article--item">
              <div className="article--item__boxImg">
                <a href="#">
                  <img
                    src="https://ananas.vn/wp-content/uploads/Mobile_Blog-1980s_0-300x160.jpg"
                    alt=""
                  />
                </a>
              </div>
              <a className="article--item__title" href="#">
                VINTAS SAIGON 1980s
              </a>
              <p className="article--item__content">
                Với bộ 5 sản phẩm, Vintas Saigon 1980s Pack đem đến một sự lựa
                chọn “cũ kỹ thú vị” cho những người trẻ sống giữa thời hiện đại
                nhưng lại yêu nét...
              </p>
              <a href="#" className="article--item__content-more">
                Đọc thêm
              </a>
            </div>
          </div>
          <div className="container__article--items">
            <div className="container__article--item">
              <div className="article--item__boxImg">
                <a href="#">
                  <img
                    src="https://ananas.vn/wp-content/uploads/peeping_pattas01-300x160.jpg"
                    alt=""
                  />
                </a>
              </div>
              <a className="article--item__title" href="#">
                SNEAKER FEST VIETNAM VÀ SỰ KẾT HỢP
              </a>
              <p className="article--item__content">
                Việc sử dụng dáng giày Vulcanized High Top của Ananas trong
                thiết kế và cảm hứng bắt nguồn từ linh vật Peeping - đại diện
                cho tinh thần xuyên...
              </p>
              <a href="#" className="article--item__content-more">
                Đọc thêm
              </a>
            </div>
            <div className="container__article--item">
              <div className="article--item__boxImg">
                <a href="#">
                  <img
                    src="https://ananas.vn/wp-content/uploads/shoes-anatomy-thumbnail-300x160.jpg"
                    alt=""
                  />
                </a>
              </div>
              <a className="article--item__title" href="#">
                "GIẢI PHẪU" GIÀY VULCANIZED
              </a>
              <p className="article--item__content">
                Trong phạm vi bài viết ngắn, hãy cùng nhau tìm hiểu cấu tạo giày
                Vulcanized Sneaker - loại sản phẩm mà Ananas đã chọn làm "cốt
                lõi" để theo đuổi trong...
              </p>
              <a href="#" className="article--item__content-more">
                Đọc thêm
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
