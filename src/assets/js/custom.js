// JavaScript Document
$(function() {
 "use strict";

  /*index : header animation*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $("header").addClass("header-fixed");
        } else {
            $("header").removeClass("header-fixed");
        }
    });
  /*end header animation*/

  // function responsive_dropdown () {
  //    /* ---- For Navbar JS Start ---- */
  //   $('.navbar-toggle').on("click", function(){
  //     var menu_id = $('#menu');
  //     var nav_icon = $('.navbar-toggle i');
  //     if(menu_id.hasClass('menu-open')){
  //       menu_id.removeClass('menu-open');
  //       nav_icon.removeClass('fa-close');
  //       nav_icon.addClass('fa-bars');
  //     }else{
  //       menu_id.addClass('menu-open');
  //       nav_icon.addClass('fa-close');
  //       nav_icon.removeClass('fa-bars');
  //     }
  //     return false;
  //   });
  //   /* ---- For Navbar JS End ---- */

  // }

  /*index : brand slider*/
    // if ($("#brand-slider").length > 0) {
    //     $("#brand-slider").owlCarousel({
    //         loop: true,
    //         autoplay: true,
    //         dots: true,
    //         nav: true,
    //         responsiveClass: true,
    //         responsive: {
    //             0: {
    //                 items: 1,
    //                 nav: false
    //             },
    //             420: {
    //                 items: 2,
    //                 loop: true,
    //                 nav: false,
    //                 dots: true,
    //                 margin: 0
    //             },
    //             575: {
    //                 items: 3,
    //                 loop: true,
    //                 nav: false,
    //                 dots: true
    //             },
    //             767: {
    //                 items: 4,
    //                 nav: false,
    //                 dots: true,
    //                 margin: 0
    //             },
    //             991: {
    //                 items: 5,
    //                 loop: true,
    //                 nav: false,
    //                 dots: true,
    //                 margin: 10
    //             },
    //             1200: {
    //                 items: 6,
    //                 loop: true,
    //                 nav: false,
    //                 margin: 0
    //             },
    //             1400: {
    //                 items: 6,
    //                 loop: true,
    //                 nav: false,
    //                 margin: 0
    //             }
    //         }
    //     });
    // }
  /*end brand slider*/

  /*click to scroll menu*/
    // $('[data-scroll]').on('click', function(event) {
    //     event.preventDefault();
    //     var $section = $($(this).attr('href'));
    //     $('html, body').animate({
    //         scrollTop: $section.offset().top - 50
    //     }, 1500);
    // });
  /*end scroll menu*/


  // $(document).ready(function() {
  //   responsive_dropdown ();
  // });

});

/*--------preloader-------*/
// $(window).on("load", function() {
//   "use strict";
//   $('#preloader').delay(2000).fadeOut(500);
// });
/*------End----------*/
