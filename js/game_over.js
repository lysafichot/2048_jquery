/*jslint browser: true*/
/*global $, jQuery, cote, document, localStorage, parseInt, color, identique, isset
*/

function sortByScore(key1, key2) {
    'use strict';
    return parseInt(key1.score) > parseInt(key2.score);
}
function overbook() {
    'use strict';
    var numero;
    var i = cote * cote - 1;
    while (i !== 0) {
        numero = parseInt(i) + parseInt(cote);
        if (!isset(i)) {
            return false;
        }
        if (isset(i) && isset(i) === isset(i + 1) && i % cote !== cote - 1) {
            return false;
        }
        if (isset(i) === isset(i - 1) && i % cote !== 0) {
            return false;
        }
        if (isset(i) && isset(i) === isset(i - cote) && i / cote >= 1) {
            return false;
        }
        if (isset(i) && isset(i) === isset(numero) && numero < cote * cote) {
            return false;
        }
        i -= 1;
    }
    return true;
}

$(document).ready(function () {
    'use strict';
    var cote = 4;
    var tab_best = [];
    var status = false;
    var once = false;
    var object = {};

    if (!localStorage.getItem('number')) {
        cote = 4;
    } else {
        cote = localStorage.getItem('number');
    }

    if (!localStorage.getItem('best' + cote)) {
        $('#best').text(0);
        $('#variable').append(" - " + cote + 'x' + cote);
    } else {
        tab_best = localStorage.getItem('best' + cote);
        tab_best = JSON.parse(tab_best);

        $('#variable').append(" - " + cote + 'x' + cote);
        var i = 0;
        while (i < tab_best.length) {
            if (once === false) {
                $('#best').text(tab_best[i].score);
                once = true;
            }
            if ($(".liste" + cote).length < 10) {
                $('#listes').append('<li class = "liste' + cote + '">' + tab_best[i].login + ' : ' + tab_best[i].score + '</li>');
            }
            i += 1;
        }
    }

    $("body").keydown(function () {
        if (overbook() === true) {
            if (status === false) {
                $("#game_over").css({'display': 'block'});
                $('#login').submit(function () {

                    var login = $('#pseudo').val();
                    var score = $('#score').text();
                    object.login = login;
                    object.score = score;
                    object.cote = cote;

                    if (tab_best.length === 10) {
                        if (parseInt(tab_best[tab_best.length - 1].score) < score) {
                            tab_best.pop();
                            tab_best.push(object);
                        }
                    }
                    if (tab_best.length < 10) {
                        tab_best.push(object);
                    }
                    tab_best.sort(sortByScore);
                    tab_best.reverse();
                    localStorage.setItem('best' + cote, JSON.stringify(tab_best));
                });
                status = true;
            }
        }
    });
});