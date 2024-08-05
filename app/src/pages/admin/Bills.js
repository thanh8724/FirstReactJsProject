import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PaginatedTableBIllsComponent from "../../components/TableComponents/PaginatedTableBIllsComponent";
import { useDispatch, useSelector } from "react-redux";
import {  updateBill } from "../../redux/slices/billSlice";
import "../../assets/stylesAdmin/section-update.css";

const Bills = () => {
  const dataBills = useSelector((state) => state.bills.bills);
  const dispatch = useDispatch();
  const [isShowPopupUpdate, setIsShowPopupUpdate] = useState(false);
  const billUpdate = useRef([null]);
  const hanleTogglePopupUpdate = (id) => {
    isShowPopupUpdate
      ? setIsShowPopupUpdate(false)
      : setIsShowPopupUpdate(true);
    billUpdate.current = dataBills.bills.filter((bill) => bill.id === id);
  };
  const { control, handleSubmit } = useForm({
    defaultValues: {
      status: billUpdate?.current[0]?.status?.toString() || "",
    },
  });

  const onSubmit = async (data) => {
    if (data.status) {
      await dispatch(
        updateBill({ status: data.status, id: billUpdate.current[0].id })
      );
      setIsShowPopupUpdate(false);
    }
  };
  console.log();
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto flex flex-col gap-4">
        <div className="w-full h-auto flex justify-between items-center gap-3">
          <div className="text-xl font-bold pt-2 text">
            <h6>Danh sách đơn hàng</h6>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 ps">
                  <PaginatedTableBIllsComponent
                    bills={dataBills.bills}
                    productBill={dataBills.productBill}
                    hanleTogglePopupUpdate={hanleTogglePopupUpdate}
                  ></PaginatedTableBIllsComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* popup update */}
      <div
        className={`w-screen h-screen fixed top-0 left-0 z-30 popupContainer flex justify-center items-center ${
          isShowPopupUpdate ? "show-popup" : ""
        }`}
        onClick={hanleTogglePopupUpdate}
      >
        <div
          className="bg-white px-[20px] py-[40px] rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container__content--orders  flex flex-col gap-[30px]">
            <div
              className="content__orders--top"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="content__orders--top-left">
                <h3 className="content__orders--top-text1">
                  Detail &amp; Updates
                </h3>
                <span className="content__orders--top-text2">
                  Dashboard /{" "}
                  <span style={{ color: "#de2e6c" }}>Update Order</span>
                </span>
              </div>
            </div>
            {billUpdate.current?.length > 0 ? (
              <div className="content__orders--bottom content__orders--bottom2">
                <div className="content__orders--bottom-left width35">
                  <span className="content__orders--bottom-left--title">
                    Người nhận
                  </span>
                  <div className="boxInfomation-order">
                    <div className="boxInfomation-order--item">
                      <span>
                        Tên người nhận: {billUpdate?.current[0]?.receiver}
                      </span>
                      <span className="nameReceiver infoReceiver" />
                    </div>
                    <div className="boxInfomation-order--item">
                      <span>
                        Email: {billUpdate?.current[0]?.emailReceiver}
                      </span>
                      <span className="emailReceiver infoReceiver" />
                    </div>
                    <div className="boxInfomation-order--item">
                      <span>
                        Điện thoại: {billUpdate?.current[0]?.phoneReceiver}
                      </span>
                      <span className="phoneReceiver infoReceiver" />
                    </div>
                    <div className="boxInfomation-order--item">
                      <span>Địa chỉ:</span>
                      <span className="addressReceiver infoReceiver">
                        {" "}
                        {billUpdate?.current[0]?.adderssSpecific}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="content__orders--bottom-right width65 flex flex-col gap-[30px]">
                  <span className="content__orders--bottom-left--title">
                    Thông tin đơn hàng
                  </span>
                  <div className="boxInfomation-order boxInfomation-order2">
                    <div className="boxInfomation-order--item">
                      <span>Tên mặt hàng:</span>
                      {dataBills.productBill ? (
                        <div className="flex flex-col">
                          {dataBills.productBill
                            .filter(
                              (item) =>
                                item.idBill ===
                                Number(billUpdate.current[0]?.id)
                            )
                            .map((item) => (
                              <span
                                className="!text-sm !font-medium"
                                key={item.id}
                              >
                                {item.nameProduct}
                              </span>
                            ))}
                        </div>
                      ) : null}
                    </div>
                    <div className="boxInfomation-order--item">
                      <span>Phương thức vận chuyển:</span>
                      <span className="infoReceiver infoShipping">
                        {Number(billUpdate.current[0]?.shipping) === 0
                          ? "Miễn phí vận chuyển"
                          : Number(billUpdate.current[0]?.shipping) === 30000
                          ? "Giao hàng nhanh"
                          : Number(billUpdate.current[0]?.shipping) === 50000
                          ? "Hỏa tốc"
                          : ""}
                      </span>
                    </div>
                    <div className="boxInfomation-order--item">
                      <span>Mã giảm giá:</span>
                      <span className="infoReceiver">Không có</span>
                    </div>
                    <div className="boxInfomation-order--item">
                      <span>Phương thức thanh toán:</span>
                      <span className="infoReceiver infoPayment">Tiền mặt</span>
                    </div>
                    <div className="boxInfomation-order--item">
                      <span>
                        Ngày Đặt Hàng:{" "}
                        {billUpdate.current[0]?.timeOrder.split("T")[0]}
                      </span>
                      <span className="infoReceiver infoTime" />
                    </div>
                    <div className="boxInfomation-order--item">
                      <span>Địa chỉ nhận:</span>
                      <span className="infoReceiver infoAddress">
                        {billUpdate?.current[0]?.adderssSpecific},
                        {billUpdate?.current[0]?.address}
                      </span>
                    </div>
                    {/* <div class="boxQrCode">
                    <img src="/images/qrCode.jpg" alt="" />
                  </div> */}
                    {/* select options */}
                    {billUpdate?.current.length === 1 ? (
                      <form
                        className="flex flex-col gap-2"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <label className="text-[15px] font-semibold">
                          Trạng thái đơn hàng
                        </label>
                        <Controller
                          name="status"
                          control={control}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="bg-gray-50 border border-[#182132] text-gray-900 mb-6 text-sm rounded-lg block w-full p-2.5 cursor-pointer"
                            >
                              {Number(billUpdate?.current[0]?.status) === 1 ? (
                                <>
                                  <option value="1">Chờ xác nhận</option>
                                  <option value="2">Đang giao</option>
                                  <option value="3">Đã giao</option>
                                </>
                              ) : Number(billUpdate?.current[0]?.status) ===
                                2 ? (
                                <>
                                  <option value="2">Đang giao</option>
                                  <option value="3">Đã giao</option>
                                </>
                              ) : Number(billUpdate?.current[0]?.status) ===
                                3 ? (
                                <option value="3">Đã giao</option>
                              ) : (
                                ""
                              )}
                            </select>
                          )}
                        />
                      </form>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {/* box button */}
            <div className="content__orders--bottom2-boxAction pt-6">
              <span
                className="exitUpdate cursor-poiter"
                onClick={hanleTogglePopupUpdate}
              >
                <ion-icon name="arrow-forward-outline" />
                Exit
              </span>
              <button
                onClick={handleSubmit(onSubmit)}
                className="buttonUpdate"
                id="buttonUpdateOrder"
                style={{ backgroundColor: "#AECCCF", color: "black" }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bills;
