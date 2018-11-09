/* Routes */


(function ($) {


 var routes = {},
     defaultRoute = 'home';

 routes['home'] = {
     url: '#/dashboard',
     templateUrl: 'src/dashboard/dashboard.html'
 };

 routes['servicios'] = {

     url: '#/servicios',
     templateUrl: 'src/servicios/servicios.html'
 };

  routes['servicios.resumen'] = {
      url: '#/servicios/resumen',
      templateUrl: 'src/servicios/resumen-servicios.html'
  };


 routes['reportes'] = {
     url: '#/reportes',
     templateUrl: 'src/reportes/reportes.html'
 };

  routes['configuracion'] = {
      url: '#/configuracion',
      templateUrl: 'src/configuracion/configuracion.html'
  };

routes['viajes'] = {
    url: '#/viajes',
    templateUrl: 'src/viajes/viajes.html'
};

routes['usuarios'] = {
    url: '#/usuarios',
    templateUrl: 'src/usuarios/usuarios.html'
};
 $.router
     .setData(routes)
     .setDefault(defaultRoute);

 $.when($.ready)
     .then(function () {
         $.router.run('app-root', 'home');
     });

$("nav").on('click', 'a.list-group-item', function () {
    $('a.list-group-item').removeClass('active');
    $(this).addClass('active');
    
});


// Scripts antes de la carga
$.router.onRouteBeforeChange(function (e, route, params) {
    Pace.restart();
});

// Scripts durante la renderización
$.router.onViewChange(function (e, viewRoute, route, params) {
    $('body').add('.container-fluid').bootstrapMaterialDesign();   
    console.log("router view is loaded");

    //Búsqueda en rutas
     $("#search").keyup(function () {
         var searchTerm = $("#search").val();
         var listItem = $('.table tbody').children('td');
         var searchSplit = searchTerm.replace(/ /g, "'):containsi('")

         $.extend($.expr[':'], {
             'containsi': function (elem, i, match, array) {
                 return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
             }
         });

         $(".table tbody tr").not(":containsi('" + searchSplit + "')").each(function (e) {
             $(this).attr('visible', 'false');
         });

         $(".table tbody tr:containsi('" + searchSplit + "')").each(function (e) {
             $(this).attr('visible', 'true');
         });

         var jobCount = $('.table tbody tr[visible="true"]').length;
         $('.counter').text(jobCount + ' item');

         if (jobCount == '0') {
             $('.no-result').show();
         } else {
             $('.no-result').hide();
         }
     });
     //Activar Tooltip
     $('[data-toggle="tooltip"]').tooltip();

    //Activar datepicker
    $('input.datepicker').datetimepicker({
        locale: 'es',
        ignoreReadonly: true,
        format: 'DD/MM/YYYY',

    }).on('dp.show', function () {

        $(this).next().addClass('show');

    });

});


}(jQuery));
