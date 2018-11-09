$(document).ready(function () {

    $('body').bootstrapMaterialDesign();   
    console.log("Material Bootstrap is Running");

  $("nav").on('click', '#collapse', function () {
    $(this).toggleClass('active');
    $("nav").toggleClass('active');
    $("app-root").toggleClass('active');
  });

});

