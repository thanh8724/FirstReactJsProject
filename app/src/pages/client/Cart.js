import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemCart,
  handleChangeQuantity,
} from "../../redux/slices/cartSlice";
import "../../assets/styles/cart.css";
import ContainerToastComponent from "../../components/ToastMessageComponents/ContainerToastComponent";
import { AccountContext } from "../../contexts/AccountContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { account, setAccount } = useContext(AccountContext);
  const dispatch = useDispatch();
  const cartStore = useSelector((state) => state.cart);
  const [toasts, setToasts] = useState([]);
  const idUser = account?.dataJwt?.id;
  const handleIncrement = async (quantityCurrent, idCartItem) => {
    if (quantityCurrent < 10) {
      await dispatch(
        handleChangeQuantity({
          type: "increment",
          quantityCurrent,
          idCartItem,
          idUser: idUser,
        })
      );
    } else {
      setToasts([
        ...toasts,
        {
          id: Date.now(),
          type: "warning",
          title: "Cảnh báo!",
          message: "Chỉ thêm tối đa 10 sản phẩm!",
        },
      ]);
    }
  };
  const handleDecrement = async (quantityCurrent, idCartItem) => {
    if (quantityCurrent > 1) {
      await dispatch(
        handleChangeQuantity({
          type: "decrement",
          quantityCurrent,
          idCartItem,
          idUser: idUser,
        })
      );
    } else {
      setToasts([
        ...toasts,
        {
          id: Date.now(),
          type: "warning",
          title: "Cảnh báo!",
          message: "Ít nhất 1 sản phẩm!",
        },
      ]);
    }
  };
  const handleDeleteItem = async (idItemCart) => {
    const data = {
      idItemCart,
      idUser: idUser,
      cartStore: cartStore.listProducts,
    };
    await dispatch(deleteItemCart(data));
  };
  return (
    <main className="main__cart">
      {cartStore?.listProducts.length > 0 ? (
        <>
          <section className="main__content mainCart">
            <div className="main__section--title text-gradient font-bold text-2xl p-2">
              <span className="text-[50px]">
                {cartStore?.listProducts.length}
              </span>{" "}
              Sản phẩm
            </div>
            <div className="w-full h-[auto] rounded-xl">
              <table className="w-full rounded-xl">
                <thead className="">
                  <tr className="h-12">
                    <th className="p-2 font-bold text-lg text-left">
                      Thông tin sản phẩm
                    </th>
                    <th className="p-2 font-bold text-lg text-center">
                      Số lượng
                    </th>
                    <th className="p-2 font-bold text-lg text-center">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartStore?.listProducts.map((product) => (
                    <tr
                      key={product.idProduct}
                      className="relative trProduct even:bg-gray-100"
                    >
                      <td className="p-2">
                        <div className="flex items-center space-x-4  ">
                          <img
                            src={product.imageProduct}
                            alt=""
                            className="w-[110px] h-[110px] object-cover rounded-lg"
                          />
                          <div className="flex flex-col">
                            <span className="text-base font-semibold flex-wrap max-w-[290px] line-clamp-1">
                              {product.nameProduct}
                            </span>
                            <div className="flex flex-col text-[#fc6c8f] font-medium text-sm">
                              <span>Size: {product.sizeProduct}</span>
                              <span>
                                Giá: {product?.priceProduct?.toLocaleString()} đ
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center items-center space-x-2">
                          <button
                            onClick={(e) =>
                              handleDecrement(
                                product.quantityProduct,
                                product.idCartItem
                              )
                            }
                            className="text-[20px] font-semibold px-1 py-1 rounded-md flex justify-center items-center hover:bg-gray-200 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                          >
                            <ion-icon name="remove-outline"></ion-icon>
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={product.quantityProduct}
                            onChange={() => {}}
                            className="py-1 px-1 text-center border border-[#fc6c8f] text-[#fc6c8f] rounded-xl text-sm"
                          />
                          <button
                            className="text-[20px] font-semibold px-1 py-1 rounded-md flex justify-center items-center hover:bg-gray-200 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                            onClick={(e) =>
                              handleIncrement(
                                product.quantityProduct,
                                product.idCartItem
                              )
                            }
                          >
                            <ion-icon name="add-outline"></ion-icon>
                          </button>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <span className="font-bold text-center text-gradient bg-gradient-to-tr from-[#fc6c8f] to-[#ffb86c]">
                          {(
                            product.quantityProduct * product.priceProduct
                          ).toLocaleString()}{" "}
                          đ
                        </span>
                      </td>
                      <td
                        onClick={() => handleDeleteItem(product.idCartItem)}
                        className="absolute top-[2px] right-2 cursor-pointer text-red-500 text-xl w-[auto] h-[20px] rounded hover:bg-red-400 hover:text-white duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      >
                        <ion-icon name="close-outline"></ion-icon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <span className="line" />
            </div>
          </section>
          <section className="main__info mainCart">
            <div className="main__info--top">
              <div className="main__info--title">
                <span className="title__cart">Thông tin đơn hàng.</span>
              </div>
            </div>
            <div className="main__info--bottom">
              <>
                <div className="info--bottom-container">
                  <span className="info--bottom-container--left">
                    Tạm tính:
                  </span>
                  <div className="info--bottom-container--right text-gradient bg-gradient-to-tr from-[#41cfe8] to-[#9b45e0]">
                    <span className="container--right-price">
                      {cartStore.listProducts
                        .reduce(
                          (total, product) =>
                            total +
                            product.priceProduct * product.quantityProduct,
                          0
                        )
                        .toLocaleString()}
                    </span>
                    <div className="container--right-vnd">đ</div>
                  </div>
                </div>
                <div className="info--bottom-container">
                  <span className="info--bottom-container--left">
                    Phí vận chuyển:
                  </span>
                  <div className="info--bottom-container--right text-gradient bg-gradient-to-tr from-[#41cfe8] to-[#9b45e0]">
                    <span className="container--right-price">30.000</span>
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
                      {(
                        cartStore.listProducts.reduce(
                          (total, product) =>
                            total +
                            product.priceProduct * product.quantityProduct,
                          0
                        ) +
                        30000 +
                        (cartStore.listProducts.reduce(
                          (total, product) =>
                            total +
                            product.priceProduct * product.quantityProduct,
                          0
                        ) +
                          30000) *
                          0
                      ).toLocaleString()}
                    </span>
                    <span className="box__total--cart-right-vnd">Đ</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/checkOut")}
                  className="checkout__buttonCart !bg-gradient-to-tr from-[#ff0080] to-[#7928ca]"
                >
                  Thanh Toán
                </button>
              </>
            </div>
          </section>
        </>
      ) : (
        <section className="cart__empty">
          <img src="../images/cartEmpty.jpg" alt="" className="imgCart-empty" />
          <span>Giỏ Hàng Chưa Có Sản Phẩm</span>
        </section>
      )}
      <ContainerToastComponent toastInfo={toasts}></ContainerToastComponent>
    </main>
  );
};

export default Cart;
