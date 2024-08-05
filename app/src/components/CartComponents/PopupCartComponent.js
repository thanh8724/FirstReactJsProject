import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemCart } from "../../redux/slices/cartSlice";
import "./PopupCart.css";
import { Link } from "react-router-dom";

const PopupCartComponent = (probs) => {
  const dispatch = useDispatch();
  const [toggleBoxTotal, setToggleBoxTotal] = useState(false);
  const dataCart = probs?.cartStore?.listProducts;
  let total = 0;
  dataCart.map((product) => {
    return (total += product.quantityProduct * product.priceProduct);
  });
  const handleToggle = (event) => {
    toggleBoxTotal ? setToggleBoxTotal(false) : setToggleBoxTotal(true);
  };
  const handleDeleteItem = async (idItemCart) => {
    const data = {
      idItemCart,
      idUser: probs.idUser,
      cartStore: probs.cartStore.listProducts,
    };
    await dispatch(deleteItemCart(data));
  };
  return (
    <>
      <section
        className={`popup-cart ${probs.isShow ? "showPopup" : ""}`}
        onClick={probs.handleTogglePopupCart}
      >
        {dataCart.length > 0 ? (
          <div
            className="popup__cart--container !translate-x-[460px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup__cart--top">
              <ion-icon
                id="close-popup"
                name="close-outline"
                onClick={probs.handleTogglePopupCart}
              />
              <span className="popup__cart--title">GIỎ HÀNG</span>
            </div>
            <div className="popup__cart--banner">
              <span className="popup__cart--banner--text">
                MIỄN PHÍ VẬN CHUYỂN CHO ĐƠN TỪ 1 TRIỆU!
              </span>
            </div>
            <div className="container__showProducts">
              {/* item */}
              {dataCart.map((product) => (
                <div
                  key={product.idProduct * Math.random()}
                  className="container__showProducts--item relative"
                >
                  <div className="box__image--item">
                    <img src={product.imageProduct} alt="" />
                  </div>
                  <div className="max-w-[170px]">
                    <span className="name__item--popup !text-[14px] w-[160px]">
                      {product.nameProduct}
                    </span>
                    <div className="mt-2">
                      <span className="text-[12px] text-orange-600">
                        Giá: {product?.priceProduct?.toLocaleString()} đ
                      </span>
                      <span className="text-[12px] ml-2 text-purple-600">
                        Size: {product.sizeProduct}
                      </span>
                    </div>
                  </div>
                  <input
                    className="number__item--popup"
                    defaultValue={product.quantityProduct}
                    type="number"
                    name=""
                    id=""
                  />
                  <span className="price__product--popup text-base">
                    {(
                      product.quantityProduct * product.priceProduct
                    ).toLocaleString()}
                  </span>
                  <ion-icon
                    onClick={() => handleDeleteItem(product.idCartItem)}
                    id="delete__product-popup"
                    name="close-outline"
                  />
                </div>
              ))}
            </div>
            <div
              className={`cartPopup__bottom ${
                toggleBoxTotal ? "transformHiddenY" : ""
              }`}
            >
              <span className="noti_point">
                Bạn sẽ được cộng 100 điểm cho mỗi đơn hàng.
              </span>
              <div className="box__totalPopup-cart">
                <span className="total-popup-title">TỔNG TIỀN: </span>
                <span className="total-popup">
                  {total.toLocaleString()} VNĐ
                </span>
              </div>
              <span className="payment-on-delivery">
                Giá chưa tính phí vận chuyển
                <ion-icon name="alert-circle-outline" />
              </span>
              <Link to="/cart" className="button__checkOut">
                <ion-icon name="bag-check-outline" />
                Chi Tiết Giỏ Hàng
              </Link>
              <span className="cartPopup__bottom--noti">
                Vận chuyển, thuế và giảm giá được thêm vào khi thanh toán.
              </span>
            </div>
            <ion-icon
              id="hidden__cartPopup--bottom"
              name={`chevron-${toggleBoxTotal ? "up" : "down"}-outline`}
              onClick={handleToggle}
            />
          </div>
        ) : (
          <div className="popupCart-empty" onClick={(e) => e.stopPropagation()}>
            <div className="boximg__cartEmpty">
              <img src="/images/cartEmpty.jpg" alt="" />
            </div>
            <div className="cartEmpty__text">
              <span className="cartEmpty__text1">
                Ohhh... Giỏ hàng bạn trống!!
              </span>
              <span className="cartEmpty__text2">
                Hãy thêm những sản phẩm yêu thích nào!
              </span>
            </div>
            <button className="buyNow" onClick={probs.handleTogglePopupCart}>
              Tiếp tục mua hàng
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default PopupCartComponent;
