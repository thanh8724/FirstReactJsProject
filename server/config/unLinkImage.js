const path = require("path");
const fs = require("fs");

function unLinkImage(urlImage) {
  const imagePath = path.join(__dirname, "../../app/public/", urlImage);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return;
    } else {
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Lỗi khi xóa tệp tin ảnh:", unlinkErr);
        }
      });
    }
  });
}

module.exports = unLinkImage;
