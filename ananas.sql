-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th9 05, 2024 lúc 02:56 AM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ananas`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accounts`
--

CREATE TABLE `accounts` (
  `id` int NOT NULL,
  `nameAccount` varchar(255) CHARACTER SET utf16 COLLATE utf16_unicode_ci DEFAULT NULL,
  `emailAccount` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `passwordAccount` int NOT NULL,
  `phoneAccount` int DEFAULT NULL,
  `avatarAccount` varchar(255) CHARACTER SET utf16 COLLATE utf16_unicode_ci DEFAULT NULL,
  `roleAccount` varchar(50) CHARACTER SET utf16 COLLATE utf16_unicode_ci NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `accounts`
--

INSERT INTO `accounts` (`id`, `nameAccount`, `emailAccount`, `passwordAccount`, `phoneAccount`, `avatarAccount`, `roleAccount`) VALUES
(1, 'Nguyen Thah', 'quocthanhn87@gmail.com', 1234567890, NULL, 'https://i.pinimg.com/564x/cc/2c/f1/cc2cf1509516b0fe79b2c4b64e642a0d.jpg', 'user'),
(2, 'Thanh Quoc', 'admin@gmail.com', 1234567890, NULL, 'https://i.pinimg.com/564x/95/db/9e/95db9e90b0ce8f5f8dff5801e1ab8617.jpg', 'admin'),
(16, 'Nguyễn Thành', 'user1@gmail.com', 123456790, NULL, NULL, 'user');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bills`
--

CREATE TABLE `bills` (
  `id` int NOT NULL,
  `idAccount` int NOT NULL,
  `receiver` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `emailReceiver` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `phoneReceiver` int NOT NULL,
  `address` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `adderssSpecific` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `totalAmount` int NOT NULL,
  `shipping` int NOT NULL,
  `status` varchar(50) CHARACTER SET utf16 COLLATE utf16_unicode_ci NOT NULL DEFAULT '1' COMMENT '1: chờ xác nhận, 2: đang giao, 3: đã giao',
  `timeOrder` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paymentMethod` varchar(50) CHARACTER SET utf16 COLLATE utf16_unicode_ci NOT NULL DEFAULT 'Tiền mặt'
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `bills`
--

INSERT INTO `bills` (`id`, `idAccount`, `receiver`, `emailReceiver`, `phoneReceiver`, `address`, `adderssSpecific`, `totalAmount`, `shipping`, `status`, `timeOrder`, `paymentMethod`) VALUES
(1, 1, 'Quoc Thanh', 'quocthanhn87@gmail.com', 352431477, 'truong chinh', 'tay than, truong chinh', 810000, 0, '3', '2024-04-06 16:00:43', 'Tiền mặt'),
(2, 1, 'Quoc Thanh', 'quocthanhn87@gmail.com', 352431477, 'truong chinh', 'tay than, truong chinh', 1940000, 0, '3', '2024-04-06 16:03:08', 'Tiền mặt'),
(3, 1, 'Nguyen Thah', 'quocthanhn87@gmail.com', 352431477, 'truong chinh', 'tay than, truong chinh', 400000, 50000, '3', '2024-04-08 14:16:17', 'Tiền mặt'),
(4, 1, 'Nguyen Thah', 'quocthanhn87@gmail.com', 352431477, 'truong chinh', 'truonwg chinh tay thanh tan phu', 420000, 30000, '1', '2024-08-02 14:58:02', 'Tiền mặt'),
(5, 1, 'Nguyen Thah', 'quocthanhn87@gmail.com', 352431477, 'truong chinh', 'truonwg chinh tay thanh tan phu', 420000, 30000, '1', '2024-08-02 14:58:15', 'Tiền mặt'),
(6, 1, 'Nguyen Thah', 'quocthanhn87@gmail.com', 352431477, 'truong chinh', 'truonwg chinh tay thanh tan phu', 420000, 30000, '1', '2024-08-02 14:58:18', 'Tiền mặt'),
(7, 1, 'Nguyen Thah', 'quocthanhn87@gmail.com', 352431477, 'truong chinh', 'truonwg chinh tay thanh tan phu', 420000, 30000, '1', '2024-08-02 15:00:19', 'Tiền mặt'),
(8, 1, 'Nguyen Thah', 'quocthanhn87@gmail.com', 352431477, 'truong chinh', 'truonwg chinh tay thanh tan phu', 400000, 50000, '3', '2024-08-02 15:01:08', 'Tiền mặt'),
(9, 1, 'Nguyen Thah', 'quocthanhn87@gmail.com', 352431477, 'truong chinh', 'truonwg chinh tay thanh tan phu', 400000, 50000, '2', '2024-08-03 22:41:27', 'Tiền mặt');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` int NOT NULL,
  `idUser` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cartitem`
--

CREATE TABLE `cartitem` (
  `id` int NOT NULL,
  `idCart` int NOT NULL,
  `idProduct` int NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(2) COLLATE utf16_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `nameCategory` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `imageCategory` varchar(255) CHARACTER SET utf16 COLLATE utf16_unicode_ci NOT NULL DEFAULT 'https://cdn4.iconfinder.com/data/icons/picture-sharing-sites/32/No_Image-1024.png',
  `descriptionCategory` varchar(255) COLLATE utf16_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `nameCategory`, `imageCategory`, `descriptionCategory`) VALUES
(1, 'GIÀY', 'https://ananas.vn/wp-content/uploads/Menu_Nam.jpg', ''),
(2, 'ÁO', 'https://ananas.vn/wp-content/uploads/Thumbnail-1.jpg', ''),
(3, 'OUTLET SALE', 'https://ananas.vn/wp-content/uploads/Menu_Sale-off.jpg', ''),
(4, 'THỜI TRANG & PHỤ KIỆN', 'https://ananas.vn/wp-content/uploads/Menu_Phu-kien.jpg', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `imageproducts`
--

CREATE TABLE `imageproducts` (
  `id` int NOT NULL,
  `imageDetail` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `idProduct` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `imageproducts`
--

INSERT INTO `imageproducts` (`id`, `imageDetail`, `idProduct`) VALUES
(24, '/images-detail/pro_A6T009_1.jpg', 17),
(25, '/images-detail/pro_A6T009_2.jpg', 17),
(26, '/images-detail/pro_A6T009_3.jpg', 17),
(27, '/images-detail/pro_A6T009_4.jpg', 17),
(28, '/images-detail/pro_A6T009_5.jpg', 17);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productbill`
--

CREATE TABLE `productbill` (
  `id` int NOT NULL,
  `nameProduct` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `idBill` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `productbill`
--

INSERT INTO `productbill` (`id`, `nameProduct`, `idBill`) VALUES
(6, 'HIPHOP GRAPHIC TEE - OUTLINE TYPO - KETCHUP', 1),
(7, 'BASAS RAW - LOW TOP - RUSTIC', 1),
(8, 'TRACK 6 JAZICO - LOW TOP - ROYAL WHITE', 2),
(9, 'PATTAS TOMO - HIGH TOP - OFFWHITE', 2),
(11, 'LONG SLEEVE GRAPHIC TEE - LOVE, PEACE & MUSIC - JET BLACK', 5),
(12, 'LONG SLEEVE GRAPHIC TEE - LOVE, PEACE & MUSIC - JET BLACK', 6),
(13, 'LONG SLEEVE GRAPHIC TEE - LOVE, PEACE & MUSIC - JET BLACK', 7),
(14, 'GRAPHIC TEE - DANCE TILL SUNRISE - JET BLACK', 8),
(15, 'GRAPHIC TEE - LOGOS PACKED - SNOW WHITE', 9);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `imageProduct` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `nameProduct` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `priceProduct` int NOT NULL,
  `viewProduct` int DEFAULT '0',
  `quantitySold` int DEFAULT '0',
  `categoriesProduct` int NOT NULL,
  `descriptionProduct` varchar(255) CHARACTER SET utf16 COLLATE utf16_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `imageProduct`, `nameProduct`, `priceProduct`, `viewProduct`, `quantitySold`, `categoriesProduct`, `descriptionProduct`) VALUES
(1, '/images-product/Pro_AV00149_1.jpg', 'BASAS WORKADAY - LOW TOP - BLACK', 580000, 500, 400, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(2, '/images-product/Pro_AV00150_1.jpg', 'BASAS WORKADAY - LOW TOP - REAL TEAL', 580000, 600, 340, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(3, '/images-product/Pro_AV00151_1.jpg', 'BASAS WORKADAY - HIGH TOP - REAL TEAL', 650000, 1200, 300, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(4, '/images-product/Pro_AV00152_1.jpg', 'BASAS WORKADAY - HIGH TOP - BLACK', 650000, 900, 300, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(5, '/images-product/pro_AV00142_1.jpg', 'BASAS EVERGREEN - LOW TOP - EVERGREEN', 580000, 500, 100, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(6, '/images-product/pro_AV00144_1.jpg', 'BASAS EVERGREEN - MULE - EVERGREEN', 580000, 850, 800, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(7, '/images-product/pro_AV00146_1.jpg', 'BASAS EVERGREEN - HIGH TOP - EVERGREEN', 650000, 980, 340, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(8, '/images-product/pro_AV00136_1.jpg', 'BASAS RAW - HIGH TOP - RUSTIC', 650000, 1290, 900, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(9, '/images-product/pro_AV00135_1.jpg', 'BASAS RAW - LOW TOP - RUSTIC', 610000, 800, 120, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(10, '/images-product/Pro_AV00099_1.jpg', 'BASAS BUMPER GUM EXT NE - HIGH TOP - BLACK/GUM', 650000, 1300, 500, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(11, '/images-product/Pro_AV00098_1.jpg', 'BASAS BUMPER GUM EXT NE - LOW TOP - BLACK/GUM', 580000, 890, 90, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(12, '/images-product/Pro_AV00198_1.jpg', 'URBAS SC - MULE - ALOE WASH', 580000, 1300, 699, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(13, '/images-product/Pro_AV00202_1.jpg', 'URBAS SC - MULE - DUSTY BLUE', 620000, 450, 50, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(14, '/images-product/Pro_A6T015_1.jpeg', 'TRACK 6 2.BLUES - LOW TOP - BLUEWASH', 1290000, 2500, 1299, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(15, '/images-product/Pro_A6T016_1.jpeg', 'TRACK 6 JAZICO - LOW TOP - ROYAL WHITE', 1190000, 2300, 1199, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(16, '/images-product/Pro_AV00182_1.jpeg', 'PATTAS TOMO - HIGH TOP - OFFWHITE', 750000, 1909, 1309, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(17, '/images-product/pro_A6T009_1.jpg', 'TRACK 6 CLASS E - LOW TOP - CRAFTSMAN BLUE', 1190000, 8009, 2009, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(18, '/images-product/pro_A6T010_1.jpg', 'TRACK 6 CLASS E - LOW TOP - BOTANIST GREEN', 1190000, 4879, 2004, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(19, '/images-product/pro_track6_A6T002_1.jpg', 'TRACK 6 TRIPLE WHITE - LOW TOP - WHITE', 990000, 879, 204, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(20, '/images-product/pro_A67008_1.jpg', 'TRACK 6 UTILITY GUM SOLE - LOW TOP - NAVY PEONY/GUM', 1090000, 479, 298, 1, 'Gender: Unisex Size run: 35 – 46 Upper: Canvas NE Outsole: Rubber Có thêm 01 bộ dây đi kèm'),
(21, '/images-product/Thumbnail-1.jpg', 'GRAPHIC TEE - LOGOS PACKED - SNOW WHITE', 350000, 2000, 1850, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(22, '/images-product/Thumbnail.jpg', 'GRAPHIC TEE - SKATE 4P - SNOW WHITE', 350000, 3479, 498, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(23, '/images-product/Thumbnail-2.jpg', 'GRAPHIC TEE - DANCE TILL SUNRISE - JET BLACK', 350000, 1099, 998, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(24, '/images-product/Thumbnail-3.jpg', 'GRAPHIC TEE - THE GUITAR SINGS - JET BLACK', 350000, 1299, 798, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(25, '/images-product/Thumbnail-5.jpg', 'GRAPHIC TEE - 3 DAYS TO REMEMBER - VIBRANT ORANGE', 350000, 999, 548, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(26, '/images-product/pro_basictee_ABT00011_1-1.jpg', 'BASIC TEE - ANANAS CROPPED SYMBOL - BUNGEE CORD', 150000, 479, 298, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(27, '/images-product/Hover-5.jpg', 'GRAPHIC TEE - LOGOS PACKED - VIBRANT ORANGE', 350000, 1979, 998, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(28, '/images-product/Thumbnail-7-1.jpg', 'LONG SLEEVE GRAPHIC TEE - LOVE, PEACE & MUSIC - WHITE', 390000, 879, 550, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(29, '/images-product/Thumbnail-7-2.jpg', 'LONG SLEEVE GRAPHIC TEE - LOVE, PEACE & MUSIC - JET BLACK', 390000, 979, 798, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(30, '/images-product/pro_AGT0020_1.jpg', 'GRAPHIC POCKET TEE - DORAEMON 50 YEARS - CLOUD DANCER', 390000, 779, 333, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(31, '/images-product/AGT0012_1.jpg', 'HIPHOP GRAPHIC TEE - EST. 17\' ANANAS - ERMINE', 200000, 479, 299, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(32, '/images-product/AGT0011_1-1.jpg', 'HIPHOP GRAPHIC TEE - EST. \'17 ANANAS - BLACK', 200000, 1079, 998, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(33, '/images-product/AGT0008_1.jpg', 'HIPHOP GRAPHIC TEE - OUTLINE TYPO - KETCHUP', 200000, 1099, 900, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(34, '/images-product/AGT0009_2.jpg', 'HIPHOP GRAPHIC TEE - ANANAS SYMBOL - KETCHUP', 200000, 679, 598, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.'),
(35, '/images-product/AGT0018_1.jpg', 'GRAPHIC TEE - LUCKY LUKE TYPO - CHILI PEPPER', 200000, 799, 498, 2, 'Giới tính: Unisex Form dáng: Regular Chất liệu: Single Jersey, định lượng 220GSM Thành phần chất liệu: 100% Cotton Size: S – M – L – XL Hoạ tiết: Logos Packed Sử dụng phương pháp in lụa.');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bill_account` (`idAccount`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cart_user` (`idUser`);

--
-- Chỉ mục cho bảng `cartitem`
--
ALTER TABLE `cartitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cartItem_cart` (`idCart`),
  ADD KEY `fk_cartItem_product` (`idProduct`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `imageproducts`
--
ALTER TABLE `imageproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_image_product` (`idProduct`);

--
-- Chỉ mục cho bảng `productbill`
--
ALTER TABLE `productbill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_bill` (`idBill`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_categories` (`categoriesProduct`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT cho bảng `cartitem`
--
ALTER TABLE `cartitem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT cho bảng `imageproducts`
--
ALTER TABLE `imageproducts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT cho bảng `productbill`
--
ALTER TABLE `productbill`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `fk_bill_account` FOREIGN KEY (`idAccount`) REFERENCES `accounts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_cart_user` FOREIGN KEY (`idUser`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `cartitem`
--
ALTER TABLE `cartitem`
  ADD CONSTRAINT `fk_cartItem_cart` FOREIGN KEY (`idCart`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cartItem_product` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `imageproducts`
--
ALTER TABLE `imageproducts`
  ADD CONSTRAINT `fk_image_product` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `productbill`
--
ALTER TABLE `productbill`
  ADD CONSTRAINT `fk_product_bill` FOREIGN KEY (`idBill`) REFERENCES `bills` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_categories` FOREIGN KEY (`categoriesProduct`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
