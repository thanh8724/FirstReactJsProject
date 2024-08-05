import React from "react";

const FooterComponent = () => {
  return (
    <footer>
      <div className="footer__left">
        <div className="footer__left--boxImg">
          <img
            src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/shop.svg"
            alt=""
          />
        </div>
        <a href="#">TÌM CỬA HÀNG</a>
      </div>
      <div className="footer__right">
        <div className="footer__right--top">
          <ul className="footer__right--ul">
            <li>
              <a className="footer__right--li-title" href="#">
                SẢN PHẨM
              </a>
            </li>
            <li>
              <a href="#">Giày Nam</a>
            </li>
            <li>
              <a href="#">Giày Nữ</a>
            </li>
            <li>
              <a href="#">Thời Trang &amp; Phụ Kiện</a>
            </li>
            <li>
              <a href="#">Giảm Giá</a>
            </li>
          </ul>
          <ul className="footer__right--ul">
            <li>
              <a className="footer__right--li-title" href="#">
                VỀ CÔNG TY
              </a>
            </li>
            <li>
              <a href="#">Dứa tuyển dụng</a>
            </li>
            <li>
              <a href="#">Liên hệ tuyển dụng</a>
            </li>
            <li>
              <a href="#">Về Ananas</a>
            </li>
          </ul>
          <ul className="footer__right--ul">
            <li>
              <a className="footer__right--li-title" href="#">
                HỖ TRỢ
              </a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Bảo mật thông tin</a>
            </li>
            <li>
              <a href="#">Chính sách chung</a>
            </li>
            <li>
              <a href="#">Tra cứu đơn hàng</a>
            </li>
          </ul>
          <ul className="footer__right--ul">
            <li>
              <a className="footer__right--li-title" href="#">
                LIÊN HỆ
              </a>
            </li>
            <li>
              <a href="#">Email góp ý</a>
            </li>
            <li>
              <a href="#">Hotline</a>
            </li>
            <li>
              <a href="#">0352 431 4777</a>
            </li>
          </ul>
        </div>
        <div className="footer__right--bottom">
          <ul className="footer__right--ul">
            <li>
              <a className="footer__right--li-title" href="#">
                ANANAS SOCIAL
              </a>
            </li>
            <ul className="icon_link">
              <li>
                <a href="https://www.facebook.com/nqt.nguyenquocthanh/">
                  <img src="../images/icon_facebook.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../images/icon_instagram.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../images/icon_youtube.svg" alt="" />
                </a>
              </li>
            </ul>
          </ul>
          <ul className="footer__right--ul">
            <li>
              <a className="footer__right--li-title" href="#">
                ĐĂNG KÝ CHỈ VỚI EMAIL
              </a>
            </li>
            <li>
              <form action="" className="form__email--footer">
                <input
                  className="input__email--footer"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <button className="btn__submit--footer" type="submit">
                  <ion-icon name="arrow-forward-outline" />
                </button>
              </form>
            </li>
          </ul>
          <div className="boxImg__logo--footer">
            <img src="../images/Logo_Ananas_Footer.svg" alt="" />
          </div>
        </div>
        <span className="copyright">
          Copyright © 2022 Ananas. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default FooterComponent;
