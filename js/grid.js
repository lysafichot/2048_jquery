/*jslint browser: true*/
/*global $, jQuery, cote, document, localStorage, parseInt, color, identique, isset
*/
/*property height, width, css, getItem, ready, setItem, submit, val, append
*/
var cote = 4;

$(document).ready(function () {
    'use strict';
    if (!localStorage.getItem('number')) {
        $('#number').val(cote);
    } else {
        cote = localStorage.getItem('number');
        $('#number').val(cote);
    }
    var i = cote;
    var dimension = 100 / (parseInt(cote) + 0.5);
    while (i > 0) {
        $(".grid-container").append('<div class="grid-row">');
        i -= 1;
    }
    i = cote;
    while (i > 0) {
        $('.grid-row').append('<div class="grid-cell"></div>');
        i -= 1;
    }

    $(".grid-row").css({'height': dimension + '%'});
    $(".grid-cell").css({'width': dimension + '%'});
    $(".grid-cell").css({'font-size': '300%'});

    $('#cote').submit(function () {
        var number = $('#number').val();
        localStorage.setItem('number', number);
    });
});