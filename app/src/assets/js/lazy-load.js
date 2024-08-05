window.addEventListener("scroll", () => {
  loadContent1();
  loadContent2();
});
function loadContent1() {
  const box_content1Items = document.querySelectorAll(
    ".main__content1--bottom---item"
  );
  if (document.querySelector(".main__content1--bottom")) {
    const boxContainer = document
      .querySelector(".main__content1--bottom")
      .getBoundingClientRect().top;
    const triggerBottom = window.innerHeight / 2;
    box_content1Items.forEach((item) => {
      if (boxContainer < triggerBottom) {
        item.classList.add("item-lazyActive");
      } else {
        // item.classList.remove('item-lazyActive');
      }
    });
  }
}
function loadContent2() {
  const box_articleItems = document.querySelectorAll(
    ".container__article--box"
  );
  if (document.querySelector(".container__article")) {
    const boxContainer = document
      .querySelector(".container__article")
      .getBoundingClientRect().top;
    const triggerBottom = window.innerHeight;
    box_articleItems.forEach((item) => {
      if (boxContainer < triggerBottom) {
        item.classList.add("item-lazyActive");
      } else {
        // item.classList.remove('item-lazyActive');
      }
    });
  }
}
function headerShow() {
  let prevScrollpos = window.pageYOffset;
  let currentScrollPos = 0;
  window.onscroll = function () {
    currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 170) {
      if (prevScrollpos > currentScrollPos) {
        document.querySelector("header").style.top = "0";
      } else {
        document.querySelector("header").style.top = "-170px";
      }
      prevScrollpos = currentScrollPos;
    }
  };
}
headerShow();
