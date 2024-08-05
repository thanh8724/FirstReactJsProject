import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../assets/styles/checkout.css";
import ContainerToastComponent from "../../components/ToastMessageComponents/ContainerToastComponent";
import { createBill } from "../../redux/slices/billSlice";
import { AccountContext } from "../../contexts/AccountContext";
import { deleteCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  address: yup
    .string()
    .required("Tỉnh/Thành phố, Quận/Huyện, Phường/Xã là bắt buộc"),
  addressSpecific: yup.string().required("Địa chỉ cụ thể là bắt buộc"),
  emailReceiver: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  phoneReceiver: yup.string().required("Số điện thoại là bắt buộc"),
});

const CheckOut = () => {
  const navigate = useNavigate();
  const distpach = useDispatch();
  const cartStore = useSelector((state) => state.cart.listProducts);
  const { account, setAccount } = useContext(AccountContext);
  const [toasts, setToasts] = useState([]);
  const [shippingValue, setShippingValue] = useState(30000);
  const [total, setTotal] = useState(0);
  const nameProduct = cartStore.map((cart, i) => {
    return cart.nameProduct;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subtotal = cartStore.reduce(
      (total, product) =>
        total + product.priceProduct * product.quantityProduct,
      0
    );
    setTotal(subtotal);
    setShippingValue(subtotal >= 1000000 ? 0 : 30000);
  }, [cartStore]);

  const onSubmit = async (data) => {
    const dataToSend = {
      idAccount: account.dataJwt.id,
      receiver: account.dataJwt.name,
      address: data.address,
      addressSpecific: data.addressSpecific,
      emailReceiver: data.emailReceiver,
      phoneReceiver: data.phoneReceiver,
      total: total + shippingValue,
      shipping: shippingValue,
      listNameProduct: nameProduct,
    };
    await distpach(createBill(dataToSend));
    await distpach(
      deleteCart({ idUser: account.dataJwt.id, cartStore: cartStore[0] })
    );
    navigate("/");
  };

  const handleCheckOut = () => {
    handleSubmit(onSubmit)();
  };

  const handleChangeShippingMethod = (value) => {
    setShippingValue(Number(value));
  };

  return (
    <main className="main main__checkOut">
      <div className="main__checkOut--boxTitle">
        <span className="main-title">THANH TOÁN</span>
        <span className="main__checkOut--title">Thông Tin Đơn Hàng</span>
      </div>
      <div className="container__content form__checkOut">
        <section className="main__checkOut--left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container__address">
              <div className="form__group">
                <label htmlFor="address" className="form__label">
                  Tỉnh/Thành phố, Quận/Huyện, Phường/Xã{" "}
                  <span style={{ color: "#e45b8d" }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form__input address__input ${
                    errors.address && "formError"
                  }`}
                  placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                  {...register("address")}
                />
                {errors.address && (
                  <span className="form__message">
                    {errors.address.message}
                  </span>
                )}
              </div>
              <div className="form__group">
                <label htmlFor="addressSpecific" className="form__label">
                  Địa chỉ cụ thể <span style={{ color: "#e45b8d" }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form__input address__input ${
                    errors.addressSpecific && "formError"
                  }`}
                  placeholder="Địa chỉ cụ thể"
                  {...register("addressSpecific")}
                />
                {errors.addressSpecific && (
                  <span className="form__message">
                    {errors.addressSpecific.message}
                  </span>
                )}
              </div>
              <div className="form__group">
                <label htmlFor="emailReceiver" className="form__label">
                  Email <span style={{ color: "#e45b8d" }}>*</span>
                </label>
                <input
                  type="email"
                  className={`form__input address__input ${
                    errors.emailReceiver && "formError"
                  }`}
                  placeholder="Email"
                  {...register("emailReceiver")}
                />
                {errors.emailReceiver && (
                  <span className="form__message">
                    {errors.emailReceiver.message}
                  </span>
                )}
              </div>
              <div className="form__group">
                <label htmlFor="phoneReceiver" className="form__label">
                  Số điện thoại <span style={{ color: "#e45b8d" }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form__input address__input ${
                    errors.phoneReceiver && "formError"
                  }`}
                  placeholder="Số điện thoại"
                  {...register("phoneReceiver")}
                />
                {errors.phoneReceiver && (
                  <span className="form__message">
                    {errors.phoneReceiver.message}
                  </span>
                )}
              </div>
            </div>
            <div className="container__shippingMethod shippingMethodBox">
              <label className="form__label">
                Phương thức vận chuyển{" "}
                <span style={{ color: "#e45b8d" }}>*</span>
              </label>
              <div
                className={`form__group form__methodShipping form__methodShipping1 methodShipping1 ${
                  total >= 1000000
                    ? ""
                    : "opacity-50 select-none !cursor-default"
                }`}
                onClick={() => handleChangeShippingMethod(0)}
              >
                <input
                  className="form__methodShipping--input"
                  type="radio"
                  value={0}
                  checked={shippingValue === 0}
                  onChange={() => handleChangeShippingMethod(0)}
                  disabled={total < 1000000}
                />
                <div className="form__methodShipping--info">
                  <span className="name__shippingMethod">Miễn phí</span>
                  <span className="desc__shippingMethod">
                    Giành cho đơn hàng &gt; 1.000.000 Đ
                  </span>
                </div>
                <span className="price__methodShipping">0 đ</span>
              </div>
              <div
                className="form__group form__methodShipping form__methodShipping1 methodShipping2"
                onClick={() => handleChangeShippingMethod(30000)}
              >
                <input
                  className="form__methodShipping--input"
                  type="radio"
                  value={30000}
                  checked={shippingValue === 30000}
                  onChange={() => handleChangeShippingMethod(30000)}
                />
                <div className="form__methodShipping--info">
                  <span className="name__shippingMethod">Giao Hàng Nhanh</span>
                  <span className="desc__shippingMethod">
                    2-3 ngày (tùy điều kiện thực tế)
                  </span>
                </div>
                <span className="price__methodShipping">30.000 đ</span>
              </div>
              <div
                className="form__group form__methodShipping form__methodShipping1 methodShipping3"
                onClick={() => handleChangeShippingMethod(50000)}
              >
                <input
                  className="form__methodShipping--input"
                  type="radio"
                  value={50000}
                  checked={shippingValue === 50000}
                  onChange={() => handleChangeShippingMethod(50000)}
                />
                <div className="form__methodShipping--info">
                  <span className="name__shippingMethod">Hỏa Tốc</span>
                  <span className="desc__shippingMethod">
                    Nhận hàng vào ngày mai
                  </span>
                </div>
                <span className="price__methodShipping">50.000 đ</span>
              </div>
            </div>
            <div className="container__shippingMethod">
              <label className="form__label">
                Phương thức thanh toán{" "}
                <span style={{ color: "#e45b8d" }}>*</span>
              </label>
              <div className="form__group form__methodShipping paymentMethodButton">
                <input
                  className="form__paymentMethod--input"
                  type="radio"
                  value={1}
                  defaultChecked
                />
                <div className="form__methodShipping--info">
                  <span className="name__shippingMethod">Tiền mặt</span>
                  <span className="desc__shippingMethod">
                    Thanh toán khi nhận hàng (COD)
                  </span>
                </div>
              </div>
            </div>
          </form>
        </section>
        <section className="main__checkOut--right shadow-[0_0_0_1px_rgba(0,0,0,0.05)] h-[299px] pt-1 rounded-lg">
          <div className="main__info--top">
            <div className="main__info--title">
              <span className="title__cart">Thông tin đơn hàng.</span>
            </div>
          </div>
          <div className="main__info--bottom">
            <div className="info--bottom-container">
              <span className="info--bottom-container--left">Tạm tính:</span>
              <div className="info--bottom-container--right text-gradient bg-gradient-to-tr from-[#41cfe8] to-[#9b45e0]">
                <span className="container--right-price">
                  {total.toLocaleString()}
                </span>
                <div className="container--right-vnd">đ</div>
              </div>
            </div>
            <div className="info--bottom-container">
              <span className="info--bottom-container--left">
                Phí vận chuyển:
              </span>
              <div className="info--bottom-container--right text-gradient bg-gradient-to-tr from-[#41cfe8] to-[#9b45e0]">
                <span className="container--right-price">
                  {shippingValue.toLocaleString()}
                </span>
                <div className="container--right-vnd">đ</div>
              </div>
            </div>
            <div className="info--bottom-container">
              <span className="info--bottom-container--left">Thuế</span>
              <div className="info--bottom-container--right">
                <span className="container--right-price text-gradient bg-gradient-to-tr from-[#41cfe8] to-[#9b45e0]">
                  0%
                </span>
              </div>
            </div>
            <div className="box__total-cart">
              <span className="box__total--cart-left">Tổng tiền:</span>
              <div className="box__total--cart-right text-gradient bg-gradient-to-tr from-[#ff0080] to-[#7928ca]">
                <span className="total-price">
                  {(total + shippingValue).toLocaleString()}
                </span>
                <span className="box__total--cart-right-vnd">Đ</span>
              </div>
            </div>
            <button
              onClick={handleCheckOut}
              className="checkout__buttonCart !bg-gradient-to-tr from-[#ff0080] to-[#7928ca]"
            >
              Thanh Toán
            </button>
          </div>
        </section>
      </div>
      <ContainerToastComponent toastInfo={toasts} />
    </main>
  );
};

export default CheckOut;
