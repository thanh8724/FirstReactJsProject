import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dataHome } from "../../services/HomeServices";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const slideProductSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const [dataHomePage, setDataHomePage] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fectedProducts = await dataHome();
        setDataHomePage(fectedProducts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="main">
      <div className="main__banner">
        <div className="main__banner--boxImg">
          <Slider {...settings}>
            <img
              loading="lazy"
              src="https://ananas.vn/wp-content/uploads/Web1920-1.jpeg"
              alt=""
            />
            <img
              loading="lazy"
              src="https://ananas.vn/wp-content/uploads/Hi-im-Mule_1920x1050-Desktop.jpg"
              alt=""
            />
          </Slider>
        </div>
      </div>
      <section className="main__content1">
        <div className="main__content1--bottom">
          <span className="main__content--title">DANH MỤC MUA HÀNG</span>
          <div className="main__content1--bottom---items">
            <div className="main__content1--bottom---item">
              <div className="item-bgr">
                <img
                  src="https://ananas.vn/wp-content/uploads/gi%C3%A0y-nam-e1720844745768.jpg"
                  alt=""
                />
              </div>
              <ul className="item-list">
                <li>
                  <a href="#" className="item-list__title">
                    GIÀY NAM
                  </a>
                </li>
                <li>
                  <a className="item-list_name" href="#">
                    Sản phẩm mới
                  </a>
                </li>
                <li>
                  <a className="item-list_name" href="">
                    Bán chạy
                  </a>
                </li>
                <li>
                  <a className="item-list_name" href="">
                    Giảm giá
                  </a>
                </li>
              </ul>
            </div>
            <div className="main__content1--bottom---item">
              <div className="item-bgr">
                <img
                  src="https://ananas.vn/wp-content/uploads/DSC6813-3-copy-e1720844894780.jpg"
                  alt=""
                />
              </div>
              <ul className="item-list">
                <li>
                  <a href="" className="item-list__title">
                    GIÀY NỮ
                  </a>
                </li>
                <li>
                  <a className="item-list_name" href="">
                    Sản phẩm mới
                  </a>
                </li>
                <li>
                  <a className="item-list_name" href="">
                    Bán chạy
                  </a>
                </li>
                <li>
                  <a className="item-list_name" href="">
                    Giảm giá
                  </a>
                </li>
              </ul>
            </div>
            <div className="main__content1--bottom---item">
              <div className="item-bgr">
                <img
                  src="https://ananas.vn/wp-content/uploads/312051553_3195731920685758_2796978630271241540_n-e1720845005261.jpg"
                  alt=""
                />
              </div>
              <ul className="item-list">
                <li>
                  <a href="" className="item-list__title">
                    DÒNG SẢN PHẨM
                  </a>
                </li>
                <li>
                  <a className="item-list_name" href="">
                    Basas
                  </a>
                </li>
                <li>
                  <a className="item-list_name" href="">
                    Vintas
                  </a>
                </li>
                <li>
                  <a className="item-list_name" href="">
                    Urbas
                  </a>
                </li>
                <li>
                  <a className="item-list_name" href="">
                    Pattas
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container__products pd-top80">
          <span className="container__products--title">SẢN PHẨM</span>
          <span className="container__products--title2">
            Những sản phẩm mà bạn có thể yêu thích
          </span>
          <div className="box__showProducts">
            <div className="box__showProducts--top">
              <span className="box__showProducts--top-name">BÁN CHẠY</span>
              <Link to="/shop?id=5">
                <span className="box__showProducts--top-link">
                  <ion-icon name="arrow-forward-outline" />
                  Xem nhiều hơn
                </span>
              </Link>
            </div>
            <div className="box__showProducts--items show__bestSale">
              <Slider {...slideProductSettings}>
                {dataHomePage.bestSaleProducts &&
                  dataHomePage.bestSaleProducts.map((product) => (
                    <div className="product__item" key={product.id}>
                      <Link
                        to={`product/${product.categoriesProduct}/${product.id}`}
                        className="product__link"
                      >
                        <div className="container__product--item">
                          <div className="product__item--boxImg">
                            <img
                              loading="lazy"
                              className="imgProduct"
                              src={product.imageProduct}
                              alt=""
                            />
                            <div className="product__item--boxAction">
                              <ion-icon
                                className="icon-share"
                                name="share-social-outline"
                              />
                              <ion-icon
                                onclick="like(this)"
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
                              {product.priceProduct.toLocaleString()} đ
                            </span>
                            <div className="product__content--bottom">
                              <span className="views__product">
                                {product.viewProduct} views
                              </span>
                              <span className="evaluate">
                                <span>{product.quantitySold} đã bán</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
          <div className="box__showProducts">
            <div className="box__showProducts--top">
              <span className="box__showProducts--top-name">ĐƯỢC QUAN TÂM</span>
              <Link to={`/shop?id=6`} className="box__showProducts--top-link">
                <ion-icon name="arrow-forward-outline" />
                Xem nhiều hơn
              </Link>
            </div>
            <div className="box__showProducts--items show__showProductsOfInterest">
              {/* DOM display */}
              <Slider {...slideProductSettings}>
                {dataHomePage.concernedProducts &&
                  dataHomePage.concernedProducts.map((product) => (
                    <div className="product__item" key={product.id}>
                      <Link
                        to={`product/${product.categoriesProduct}/${product.id}`}
                        className="product__link"
                      >
                        <div className="container__product--item">
                          <div className="product__item--boxImg">
                            <img
                              loading="lazy"
                              className="imgProduct"
                              src={product.imageProduct}
                              alt=""
                            />
                            <div className="product__item--boxAction">
                              <ion-icon
                                className="icon-share"
                                name="share-social-outline"
                              />
                              <ion-icon
                                onclick="like(this)"
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
                              {product.priceProduct.toLocaleString()} đ
                            </span>
                            <div className="product__content--bottom">
                              <span className="views__product">
                                {product.viewProduct} views
                              </span>
                              <span className="evaluate">
                                <span>{product.quantitySold} đã bán</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <div className="box__banner2">
        <img
          loading="lazy"
          src="https://ananas.vn/wp-content/uploads/Desktop_Homepage_Banner01.jpg"
          alt=""
          className="banner2__img"
        />
      </div>
      {/* bottom */}
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

export default Home;
