import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../assets/stylesAdmin/page.css";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchAccounts } from "../redux/slices/accountsSlice";
import { fetchProducts } from "../redux/slices/productsSlice";
import { AccountContext } from "../contexts/AccountContext";
import { fetchBills } from "../redux/slices/billSlice";

const AdminPageComponet = (probs) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { account, setAccount } = useContext(AccountContext);
  useEffect(() => {
    const fectedData = async () => {
      await dispatch(fetchCategories());
      await dispatch(fetchAccounts());
      await dispatch(fetchProducts());
      await dispatch(fetchBills());
    };
    fectedData();
  }, [account, dispatch]);
  const handleLiActive = (path) => {
    return location.pathname === path
      ? "navBar-li li-active shadow-lg"
      : "navBar-li";
  };
  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("jwt");
    setAccount(null);
    navigate("/");
  };
  return (
    <>
      <div className="w-full h-auto bg-[#eeeff0] flex">
        <section className="w-[20%] bg-[#eeeff0] py-4 px-4 flex flex-col gap-[17px] overflow-hidden">
          <div className="w-full h-auto flex gap-3 py-4 px-6">
            <div className="w-[30] h-[30px] overflow-hidden">
              <img
                src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/logo-ct.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-xl text ">Dashboard</span>
          </div>
          <ul className="navBar-ul flex flex-col">
            <li className={handleLiActive("/dashboard")}>
              <Link to="/dashboard" className="text">
                <ion-icon name="home-outline" />
                <span>Trang chủ</span>
              </Link>
            </li>
            <li className={handleLiActive("/categories")}>
              <Link to="/categories" className="text">
                <ion-icon name="folder-outline" />
                <span>Danh mục</span>
              </Link>
            </li>
            <li className={handleLiActive("/products")}>
              <Link to="/products" className="text">
                <ion-icon name="grid-outline" />
                <span>Sản phẩm</span>
              </Link>
            </li>
            <li className={handleLiActive("/accounts")}>
              <Link to="/accounts" className="text">
                <ion-icon name="people-outline" />
                <span>Tài khoản</span>
              </Link>
            </li>
            <li className={handleLiActive("/bills")}>
              <Link to="/bills" className="text">
                <ion-icon name="newspaper-outline"></ion-icon>
                <span>Đơn hàng</span>
              </Link>
            </li>
            <li className={handleLiActive("/logout")} onClick={handleLogout}>
              <span className="cursor-pointer flex items-center gap-4">
                <ion-icon name="log-out-outline" />
                <span>Log Out</span>
              </span>
            </li>
          </ul>
        </section>
        <section className="w-full bg-green-[#eeeff0]">
          <header className="w-full h-16 px-[40px] bg-[#eeeff0] p-4 flex justify-between">
            <div className="w-auto h-full flex flex-col">
              <span className="text-[14px] text-gray-400">
                Pages /{" "}
                <span className="text-[16px] text">
                  {location.pathname
                    .replace(/^\/|\/$/g, "")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </span>
              <span className="text-xl font-bold pt-2 text">
                {location.pathname
                  .replace(/^\/|\/$/g, "")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-full w-auto flex items-center gap-2 headerIcon relative">
                <div className="w-8 h-8 flex justify-center items-center divIcon">
                  <ion-icon name="mail-outline" />
                </div>
                <div className="w-8 h-8 flex justify-center items-center divIcon">
                  <ion-icon name="notifications-outline" />
                  <span>1</span>
                </div>
              </div>
              <div className="flex flex-col w-auto h-full justify-center gap-1">
                <span className="text-[15px]">Quốc Thành</span>
                <span className="text-[14px] text-green-500" id="roleShow" />
              </div>
              <div className="rounded-full w-8 h-8 bg-white overflow-hidden">
                <img
                  src="https://cdn.dribbble.com/users/2400293/screenshots/15662879/media/0104d2c2c69469478553179b8e77fbab.png?resize=450x338&vertical=center"
                  className="w-full h-full overflow-hidden"
                  alt=""
                />
              </div>
            </div>
          </header>
          <main className="w-full h-[91.2vh] p-4">
            {probs.element}
            <div id="footer" className="py-4 fixed bottom-0 w-[80%]">
              <div className="w-full px-6 mx-auto">
                <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
                  <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
                    <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
                      © 2024, made with{" "}
                      <i className="fa fa-heart" aria-hidden="true"></i> by
                      <Link
                        href="https://www.creative-tim.com"
                        className="font-semibold text-slate-700"
                        target="_blank"
                      >
                        {" "}Nguyen Thanh🖖
                      </Link>
                      for Link better web.
                    </div>
                  </div>
                  <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
                    <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
                      <li className="nav-item">
                        <Link
                          href="https://www.creative-tim.com"
                          className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                          target="_blank"
                        >
                          Creative Tim
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="https://www.creative-tim.com/presentation"
                          className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                          target="_blank"
                        >
                          About Us
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="https://creative-tim.com/blog"
                          className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                          target="_blank"
                        >
                          Blog
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="https://www.creative-tim.com/license"
                          className="block px-4 pt-0 pb-1 pr-0 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                          target="_blank"
                        >
                          License
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  );
};

export default AdminPageComponet;
