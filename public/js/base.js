$(function () {
  app.init();
});

var app = {
  init: function () {
    this.slideToggle();
    this.resizeIframe();
    this.confirmDelete();
  },
  resizeIframe: function () {
    //1、获取浏览器的高度
    //2、设置iframe的高度
    $('#rightMain').height($(window).height() - 380);
  },
  slideToggle: function () {
    $('.aside h4').click(function () {
      $(this).siblings('ul').slideToggle();
    });
  },
};
window.onresize = function () {
  app.resizeIframe();
};
