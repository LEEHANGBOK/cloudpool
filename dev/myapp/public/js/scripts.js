$(function() {
  "use strict";
  $(function() {
      $(".preloader").fadeOut();
    }),

    jQuery(document).on("click", ".mega-dropdown", function(i) {
      i.stopPropagation();
    });






  var i = function() {
    (window.innerWidth > 0 ? window.innerWidth : this.screen.width) < 0 ? ($("body").addClass("mini-sidebar"),
      $(".navbar-brand span").show(), $(".navbar-brand b").hide(), $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible"),
      $(".sidebartoggler i").addClass("ti-menu")) : ($("body").removeClass("mini-sidebar"),
      $(".navbar-brand span").hide(), $(".navbar-brand b").show());
    var i = (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
    (i -= 70) < 1 && (i = 1), i > 70 && $(".page-wrapper").css("min-height", i + "px");
  };


  $(window).ready(i), $(window).on("resize", i), $(".sidebartoggler").on("click", function() {
      $("body").hasClass("mini-sidebar") ? ($("body").trigger("resize"), $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible"),
        $("body").removeClass("mini-sidebar"), $(".navbar-brand span").hide()) : ($("body").trigger("resize"),
        $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible"),
        $("body").addClass("mini-sidebar"), $(".navbar-brand span").show() , $(".navbar-brand b").hide());
    }),



    $(".fix-header .header").stick_in_parent({}), $(".nav-toggler").click(function() {
      $("body").toggleClass("show-sidebar"), $(".nav-toggler i").toggleClass("mdi mdi-menu"),
        $(".nav-toggler i").addClass("mdi mdi-close");
    }),



    $(".search-box a, .search-box .app-search .srh-btn").on("click", function() {
      $(".app-search").slideToggle(200);
    }),



    $(".floating-labels .form-control").on("focus blur", function(i) {
      $(this).parents(".form-group").toggleClass("focused", "focus" === i.type || this.value.length > 0);
    }).trigger("blur"),

    $(function() {
      // for (var o = $("ul#sidebarnav a").filter(function() {
      //     return this.href == i;
      //   }).addClass("active")/*.parent().addClass("active")*/;;) {
      //     console.log(i);
      //     console.log(o);
      //   if (!o.is("li")) break;
      //   o = o.parent().addClass("in").parent().addClass("active");
      // }
    }),

    $(function() {
      $("ul#sidebarnav a").on('click', function(){
        var currentLocation = $(this).attr('id');
        console.log(currentLocation);
        $(this).addClass("active");
        $('.active').filter(function(){ return $(this).attr('id') != currentLocation }).removeClass("active");
      });
    }),

    $(function() {
      $("#sidebarnav").metisMenu();
    }),

    $(".scroll-sidebar").slimScroll({
      position: "left",
      size: "5px",
      height: "100%",
      color: "#dcdcdc"
    }),

    $(".message-center").slimScroll({
      position: "right",
      size: "5px",
      color: "#dcdcdc"
    }),

    $(".aboutscroll").slimScroll({
      position: "right",
      size: "5px",
      height: "80",
      color: "#dcdcdc"
    }),

    $(".message-scroll").slimScroll({
      position: "right",
      size: "5px",
      height: "570",
      color: "#dcdcdc"
    }),

    $(".chat-box").slimScroll({
      position: "right",
      size: "5px",
      height: "470",
      color: "#dcdcdc"
    }),

    $(".slimscrollright").slimScroll({
      height: "100%",
      position: "right",
      size: "5px",
      color: "#dcdcdc"
    }),



    $("body").trigger("resize"), $(".list-task li label").click(function() {
      $(this).toggleClass("task-done");
    }),



    $("#to-recover").on("click", function() {
      $("#loginform").slideUp(), $("#recoverform").fadeIn();
    }),



    $('a[data-action="collapse"]').on("click", function(i) {
      i.preventDefault(), $(this).closest(".card").find('[data-action="collapse"] i').toggleClass("ti-minus ti-plus"),
        $(this).closest(".card").children(".card-body").collapse("toggle");
    }),



    $('a[data-action="expand"]').on("click", function(i) {
      i.preventDefault(), $(this).closest(".card").find('[data-action="expand"] i').toggleClass("mdi-arrow-expand mdi-arrow-compress"),
        $(this).closest(".card").toggleClass("card-fullscreen");
    }),



    $('a[data-action="close"]').on("click", function() {
      $(this).closest(".card").removeClass().slideUp("fast");
    });

    $('#sidebarnav li a').on('click', function(){
      var content_title = $(this).children('.sidebar-item-title').text();
      $('h3.replace-title').text(content_title);
    });
    
});
