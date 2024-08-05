import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAndUpdateData } from "../../redux/slices/cartSlice";
import { AccountContext } from "../../contexts/AccountContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/styles/product.css";
import { ProductService } from "../../services/ProductServices";
import ContainerToastComponent from "../../components/ToastMessageComponents/ContainerToastComponent";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account, setAccount } = useContext(AccountContext);
  const cartStore = useSelector((state) => state.cart);
  const [toasts, setToasts] = useState([]);
  const dispatch = useDispatch();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
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
  const [productData, setProduct] = useState(null);
  const [count, setCount] = useState(1); // set the number of products
  const sizeProduct = useRef(null);
  const componentRef = useRef(null);
  const { id, idCate } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fectedProduct = await ProductService(idCate, id);
        setProduct(fectedProduct);
        sizeProduct.current =
          fectedProduct?.product[0]?.categoriesProduct === 2 ? "S" : "35";
        if (componentRef.current) {
          componentRef.current.scrollIntoView({ behavior: "smooth" }); // Cuộn lên đầu trang
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [idCate, id]);
  /** hàm xử lí giảm số lượng sản phẩm */
  const handleReduce = () => {
    if (count > 1) setCount(count - 1);
  };
  /** hàm xử lí tăng số lượng sản phẩm */
  const handleIncrement = () => {
    if (count < 10) setCount(count + 1);
  };
  /** xử lí size sản phẩm */
  const handleGetSizeProduct = (size) => {
    sizeProduct.current = size;
  };
  // hàm xử lí khi nhấn xem các ảnh nhỏ
  const selectedPicture = (url) => {
    document.querySelectorAll(".img__product").forEach((img) => {
      img.src = url;
    });
  };
  /** xử lí popup hình ảnh sản phẩm */
  const handlePopupPicture = () => {
    if (document.querySelector("body").style.overflow === "hidden") {
      document.querySelector("body").style.overflow = "";
      document.querySelector(".popup_imgLarge").classList.remove("show");
    } else {
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector(".popup_imgLarge").classList.add("show");
    }
  };
  /** hiển bảng hướng dẫn chọn size sản phẩm */
  const showSizeProduct = () => {
    // hiện popup chọn size
    if (document.querySelector("body").style.overflow === "hidden") {
      document.querySelector("body").style.overflow = "";
      document.querySelector(".box_img-size").classList.remove("show");
    } else {
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector(".box_img-size").classList.add("show");
    }
  };
  const handleChangeContentMenu = () => {
    const bannerMenuItems = document.querySelectorAll(".menu-content");
    const highlightIcon = document.querySelector(".line-pointer");
    bannerMenuItems.forEach((item) => {
      item.addEventListener("click", function () {
        let left = this.offsetLeft + 10;
        highlightIcon.style.left = `${left}px`;
      });
    });
    function slect_item() {
      const content = document.querySelectorAll(".content ");
      for (let index = 0; index < bannerMenuItems.length; index++) {
        bannerMenuItems[index].onclick = () => {
          content[index].classList.add("flex");
          for (let i = 0; i < content.length; i++) {
            if (content[i] != content[index]) {
              content[i].classList.remove("flex");
            }
          }
        };
      }
    }
    slect_item();
  };
  // handle click add product to cart
  const handleAddToCart = async (idProduct) => {
    let dataProduct = {
      idUser: account?.dataJwt?.id,
      idCart: cartStore?.listProducts[0]?.idCart,
      idProduct: idProduct,
      quantity: count,
      size: sizeProduct.current,
    };
    if (!account?.dataJwt?.id) {
      setToasts([
        ...toasts,
        {
          id: Date.now(),
          type: "warning",
          title: "Cảnh báo!",
          message: "Đăng nhập để thêm sản phẩm!",
        },
      ]);
      setTimeout(() => {
        navigate("/login", { state: { from: location.pathname } });
      }, 1000);
    } else {
      /** trường hợp đã đăng nhập thì lưu lên db */
      let updateQuantityProduct = false; // kiểm tra có tồn tại sản phẩm trên cart db chưa
      cartStore.listProducts.forEach((product) => {
        if (
          product.idProduct === idProduct &&
          product.sizeProduct === sizeProduct.current
        ) {
          updateQuantityProduct = true;
          dataProduct["idCartItem"] = product.idCartItem;
          if (count + product.quantityProduct > 10) {
            dataProduct["quantity"] = 10;
          } else {
            dataProduct["quantity"] = count + product.quantityProduct;
          }
        }
        return updateQuantityProduct;
      });
      dataProduct["updateQuantityProduct"] = updateQuantityProduct;
      setToasts([
        ...toasts,
        {
          id: Date.now(),
          type: "success",
          title: "Thành công",
          message: "Vui lòng kiểm tra lại giỏ hàng!",
        },
      ]);
      await dispatch(addToCartAndUpdateData(dataProduct));
    }
  };
  if (!productData) return <div>Loading</div>;
  return (
    <main className="main" ref={componentRef} onLoad={handleChangeContentMenu}>
      {/* content */}
      <div className="main__product--info">
        <div className="main__product--info-top">
          <div className="container__img--product">
            <div className="box__img--big">
              <img
                className="img__product"
                src={productData.product[0].imageProduct}
                alt=""
              />
            </div>
            <div className="container__img--product-small">
              {/* DOM SHOW */}
              {productData.imagesProduct.map((imageProduct) => (
                <div
                  key={imageProduct.id}
                  className="box__img--small"
                  onClick={() => selectedPicture(imageProduct.imageDetail)}
                >
                  <img
                    className="img_small"
                    src={imageProduct.imageDetail}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <ion-icon
              onClick={handlePopupPicture}
              id="zoom-img"
              name="expand-outline"
            />
          </div>
          <div className="container__info--product">
            <span style={{ display: "none" }} className="idProduct" />
            <span className="main__title">ANANAS / PRODUCT</span>
            <span className="info--product---name">
              {productData.product[0].nameProduct}
            </span>
            <div className="info--product---price-quantityBox">
              <div className="price__product-box">
                <span className="price__product-box-price">
                  {productData.product[0].priceProduct.toLocaleString()}
                  <sub>đ</sub>
                </span>
                <span className="line-height" />
                <span className="quantity__product">128 sản phẩm</span>
              </div>
            </div>
            <div className="box_quantity-size">
              <div className="box_quantity-size-content">
                <span className="box_quantity-size-title">Số lượng:</span>
                <button className="subtraction" onClick={handleReduce}>
                  -
                </button>
                <input
                  className="input_quantityProduct"
                  type="number"
                  min={1}
                  max={10}
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
                <button className="plus" onClick={handleIncrement}>
                  +
                </button>
              </div>
              <div className="box_quantity-size-content">
                <span className="box_quantity-size-title">Size:</span>
                {productData.product[0].categoriesProduct === 1 ? (
                  <select
                    name="size"
                    id="size"
                    className="option-sizeShoe"
                    onChange={(e) => handleGetSizeProduct(e.target.value)}
                  >
                    <option value={35}>35</option>
                    <option value={36}>36</option>
                    <option value="36.5">36.5</option>
                    <option value={37}>37</option>
                    <option value="37.5">37.5</option>
                    <option value={38}>38</option>
                    <option value="38.5">38.5</option>
                    <option value={39}>39</option>
                    <option value={40}>40</option>
                    <option value="40.5">40.5</option>
                    <option value={41}>41</option>
                    <option value={42}>42</option>
                    <option value={42.5}>42.5</option>
                    <option value={43}>43</option>
                    <option value={44}>44</option>
                    <option value="44.5">44.5</option>
                    <option value={45}>45</option>
                    <option value={46}>46</option>
                  </select>
                ) : (
                  <select
                    name="size"
                    id="size"
                    className="option-sizeTee"
                    onChange={(e) => handleGetSizeProduct(e.target.value)}
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                )}
              </div>
            </div>
            <div className="box__button--action">
              <button
                className="button-add_toCart"
                onClick={() => handleAddToCart(productData.product[0].id)}
              >
                THÊM VÀO GIỎ HÀNG
              </button>
              <button className="button__buy-now">
                <ion-icon name="arrow-forward-outline" />
                MUA NGAY
              </button>
            </div>
            <div className="box__viewers">
              <div className="box__viewers---item">
                <img
                  src="https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
              </div>
              <div className="box__viewers---item">
                <img
                  src="https://images.pexels.com/photos/16200701/pexels-photo-16200701/free-photo-of-thien-nhien-thu-v-t-ng-i-ch-u.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
              </div>
              <div className="box__viewers---item">+500</div>
            </div>
          </div>
        </div>
      </div>
      {/* list infomation product */}
      <div className="main__product--info-bottom">
        <div className="main__product--info-bottom-list">
          <ul>
            <li className="menu-content">THÔNG TIN SẢN PHẨM</li>
            <li className="menu-content">QUY ĐỊNH ĐỔI SẢN PHẨM</li>
            <li className="menu-content">BẢO HÀNH THẾ NÀO?</li>
          </ul>
        </div>
        <div className="main__product--info-bottom-showCotent">
          <div className="content content1 flex">
            <span
              className="descriptionProduct"
              style={{ width: "40%", margin: "0 auto" }}
            >
              Gender: Unisex | Size run: 35 – 46 <br />
              Upper: Canvas RAW | Outsole: Rubber
              <span className="open_popupSize" onClick={showSizeProduct}>
                Hướng dẫn chọn size
              </span>
            </span>
          </div>
          <div className="content content2 ">
            <span>
              Chỉ đổi hàng 1 lần duy nhất, mong bạn cân nhắc kĩ trước khi quyết
              định. <br />
              Thời hạn đổi sản phẩm khi mua trực tiếp tại cửa hàng là 07 ngày,
              kể từ ngày mua. Đổi sản phẩm khi mua online là 14 ngày, kể từ ngày
              nhận hàng. <br />
              Sản phẩm đổi phải kèm hóa đơn. Bắt buộc phải còn nguyên tem, hộp,
              nhãn mác. <br />
              Sản phẩm đổi không có dấu hiệu đã qua sử dụng, không giặt tẩy, bám
              bẩn, biến dạng. <br />
              Ananas chỉ ưu tiên hỗ trợ đổi size. Trong trường hợp sản phẩm hết
              size cần đổi, bạn có thể đổi sang 01 sản phẩm khác: <br />
              - Nếu sản phẩm muốn đổi ngang giá trị hoặc có giá trị cao hơn, bạn
              sẽ cần bù khoảng chênh lệch tại thời điểm đổi (nếu có). <br />
              - Nếu bạn mong muốn đổi sản phẩm có giá trị thấp hơn, chúng tôi sẽ
              không hoàn lại tiền. <br />
              Trong trường hợp sản phẩm - size bạn muốn đổi không còn hàng trong
              hệ thống. Vui lòng chọn sản phẩm khác. <br />
              Không hoàn trả bằng tiền mặt dù bất cứ trong trường hợp nào. Mong
              bạn thông cảm.
            </span>
          </div>
          <div className="content content3">
            <span>
              Mỗi đôi giày Ananas trước khi xuất xưởng đều trải qua nhiều khâu
              kiểm tra. Tuy vậy, trong quá trình sử dụng, nếu nhận thấy các lỗi:
              gãy đế, hở đế, đứt chỉ may,...trong thời gian 6 tháng từ ngày mua
              hàng, mong bạn sớm gửi sản phẩm về Ananas nhằm giúp chúng tôi có
              cơ hội phục vụ bạn tốt hơn. Vui lòng gửi sản phẩm về bất kỳ cửa
              hàng Ananas nào, hoặc gửi đến trung tâm bảo hành Ananas ngay trong
              trung tâm TP.HCM trong giờ hành chính:
              <br />
              Địa chỉ: 5C Tân Cảng, P.25, Q.Bình Thạnh , TP. Hồ Chí Minh.
              Hotline: 028 2211 0067
            </span>
          </div>
        </div>
        <span className="line-pointer" />
      </div>
      {/* comment start */}
      <div className="comment_container pd-top80">
        <h3 className="header__comment">Người Mua Nói Gì Về Sản Phẩm?</h3>
        <div className="comment__contents">
          <div className="show__box--comment">
            <div className="box__comment">
              <Slider {...settings}>
                <div className="comment__show">
                  <div className="comment__avatar">
                    <img
                      src="https://evon.dev/img-quote.png"
                      alt=""
                      className="quote"
                    />
                    <div className="box_avatar--user">
                      <img
                        src="https://cdn.dribbble.com/users/2400293/screenshots/14743996/media/84ff2a3e9945913dda969bd4f25169cd.gif"
                        alt=""
                        className="avatar"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="comment__content">
                    <h4 className="name__user">Thành Nguyễn</h4>
                    <span className="comment">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Provident, cum? Harum eum in non dicta cum soluta
                      voluptates autem deserunt unde odit quasi, recusandae
                      ullam ad dignissimos laboriosam doloribus eveniet?
                    </span>
                    <div className="comment__time">
                      <span className="time">2023-10-1</span>
                    </div>
                  </div>
                </div>
                <div className="comment__show">
                  <div className="comment__avatar">
                    <img
                      src="https://evon.dev/img-quote.png"
                      alt=""
                      className="quote"
                    />
                    <div className="box_avatar--user">
                      <img
                        src="https://images.pexels.com/photos/11909034/pexels-photo-11909034.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt=""
                        className="avatar"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="comment__content">
                    <h4 className="name__user">Panda Pư Chan</h4>
                    <span className="comment">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Provident, cum? Harum eum in non dicta cum soluta
                      voluptates autem deserunt unde odit quasi, recusandae
                      ullam ad dignissimos laboriosam doloribus eveniet?
                    </span>
                    <div className="comment__time">
                      <span className="time">2023-10-1</span>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* comment end */}
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
      {/* product rel */}
      <div className="container__products container__products--relate pd-top80 pd-bt80">
        <div className="box__showProducts">
          <div className="box__showProducts--top">
            <span className="box__showProducts--top-name">
              SẢN PHẨM LIÊN QUAN
            </span>
            <Link
              to={`/shop?id=${productData.product[0].categoriesProduct}`}
              className="box__showProducts--top-link"
            >
              <ion-icon name="arrow-forward-outline" />
              Xem nhiều hơn
            </Link>
          </div>
          <div className="box__showProducts--items showProductsRelease">
            {/* DOM SHOW */}
            <Slider {...slideProductSettings}>
              {productData.productRelate.map((product) => (
                <div className="product__item" key={product.id}>
                  <Link
                    to={`/product/${product.categoriesProduct}/${product.id}`}
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
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* popup size */}
      <div className="box_img-size">
        <ion-icon id="close" name="close-outline" onClick={showSizeProduct} />
        <div className="box_img">
          {productData.product[0].categoriesProduct === 1 ? (
            <img src="/images/size.jpg" alt="" />
          ) : (
            <img src="/images/sizeTee.jpg" alt="" />
          )}
        </div>
      </div>
      {/* popup image large */}
      <div className="popup_imgLarge">
        <ion-icon
          onClick={handlePopupPicture}
          id="close-popupImgLarge"
          name="close-outline"
        />
        <div
          className="container__img--product-small container__img--product-small2"
          style={{ left: "20px" }}
        >
          {/* dom show */}
          {productData.imagesProduct.map((imageProduct) => (
            <div
              key={imageProduct.id}
              className="box__img--small"
              style={{ width: "100px", height: "100px" }}
              onClick={() => selectedPicture(imageProduct.imageDetail)}
            >
              <img
                className="img_small"
                src={imageProduct.imageDetail}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="popup_imgLarge--show">
          <img
            src={
              productData.imagesProduct.length === 0
                ? productData.product[0].imageProduct
                : productData.imagesProduct[0].imageDetail
            }
            alt="produdctImg"
            className="img__product"
          />
        </div>
      </div>
      {/* popup add to cart */}
      <div className="popup__addtoCart">
        <div className="popup__addtoCart-container"></div>
      </div>
      <ContainerToastComponent toastInfo={toasts}></ContainerToastComponent>
    </main>
  );
};

export default Product;
