/*jslint this: true, browser: true*/
/*global $, jQuery, Math, color, identique, isset, parseInt, score, scores*/
/*property
    Event, abs, hide, show, color, css, downTimer, each, empty, eq, floor, html, keyCode,
    keydown, length, mouseup, offsetLeft, offsetTop, ok, on, pageX, pageY,
    preventDefault, push, random, ready, reload, reverse, sort, text, trigger, forEach,
*/

function color() {
    'use strict';
    $(".grid-cell").each(function () {
        $(this).css({"background-color": ""});

        switch ($(this).text()) {
        case '':
            $(this).css({"background-color": ""});
            break;
        case '2':
            $(this).css({"background-color": "rgb(238, 228, 218"});
            break;
        case '4':
            $(this).css({"background-color": "rgb(237, 224, 200)"});
            break;
        case '8':
            $(this).css({"background-color": "rgb(242, 177, 121)"});
            break;
        case '16':
            $(this).css({"background-color": "rgb(245, 149, 99)"});
            break;
        case '32':
            $(this).css({"background-color": "rgb(246, 124, 95)"});
            break;
        case '64':
            $(this).css({"background-color": "rgb(246, 94, 59)"});
            break;
        case '128':
            $(this).css({"background-color": "rgb(237, 207, 114)"});
            break;
        case '256':
            $(this).css({"background-color": "rgb(237, 204, 97)"});
            break;
        case '512':
            $(this).css({"background-color": "rgb(237, 200, 80)"});
            break;
        case '1024':
            $(this).css({"background-color": "rgb(237, 196, 63)"});
            break;
        case '2048':
            $(this).css({"background-color": "rgb(237, 194, 46)"});
            break;
        default:
            $(this).css({"background-color": "rgb(237, 194, 30)"});
        }

        if ($(this).text() === '4' || $(this).text() === '2') {
            $(this).css({"color": "rgb(119, 110, 101"});
        } else {
            $(this).css({"color": "white"});
        }
    });
}

function isset(pos) {
    'use strict';
    return $(".grid-cell").eq(pos).text();
}

function identique(tab1, tab2) {
    'use strict';
    var i = 0;
    if (tab1.length !== tab2.length) {
        return false;
    }
    while (i < tab1.length) {
        if (tab1[i] !== tab2[i]) {
            return false;
        }
        i += 1;
    }
    return true;
}

var cote = 4;
var score = 0;

function scores(mult) {
    'use strict';
    score += parseInt(isset(mult));
    $('#score').text(score);
    var best = $('#best').text();
    if (score >= best) {
        $('#best').text(score);
    }
}

$(document).ready(function () {
    'use strict';
    var tab = [];
    var continu = true;

    function rand() {
        var twofour = Math.floor(Math.random() * (11 - 1) + 1);
        var len = $(".grid-cell").length;
        var random = Math.floor(Math.random() * (len - 0));
        if (!isset(random)) {
            if (twofour === 10) {
                $(".grid-cell").eq(random).html(4);
            } else {
                $(".grid-cell").eq(random).html(2);
            }
            color();
        } else {
            return rand();
        }
        tab.push(random);
    }

    function move(tab1, tab2, direction) {
        tab1.forEach(function (val) {
            var before = isset(val);
            $(".grid-cell").eq(val).empty();
            if (direction === 'left') {
                while (val % cote !== 0 && !isset(val - 1)) {
                    val -= 1;
                }
            } else if (direction === 'right') {
                while (val % cote !== cote - 1 && !isset(val + 1)) {
                    val += 1;
                }
            } else if (direction === 'top') {
                while (val / cote >= 1 && !isset(val - cote)) {
                    val = val - cote;
                }
            } else if (direction === 'bottom') {
                while (parseInt(val) + parseInt(cote) < cote * cote && !isset(parseInt(val) + parseInt(cote))) {
                    val = parseInt(val) + parseInt(cote);
                }
            }
            tab2.push(val);
            $(".grid-cell").eq(val).html(before);
        });
    }

    function merge(index, valeur, tab2, move) {
        $(".grid-cell").eq(valeur).empty();
        $(".grid-cell").eq(move).html(2 * isset(move));
        scores(move);
        tab2[index] = move;
    }

    rand();
    rand();

    $('.restart-button').on('click', function () {
        location.reload();
    });

    $('#togo').on('click', function () {
        $("#win").hide();
    });

    $("body").keydown(function (e) {

        score = parseInt($("#score").text());
        var next = [];
        var nextnext = [];
        next.length = 0;
        nextnext.length = 0;

        if (e.keyCode === 37) {
            tab.sort(function (a, b) {
                return a - b;
            });

            move(tab, next, 'left');
            jQuery.each(next, function (i, val) {
                if (isset(val) && isset(val) === isset(val - 1) && val % cote !== 0) {
                    merge(i, val, next, val - 1);
                }
            });
            move(next, nextnext, 'left');

            if (!identique(tab, nextnext)) {
                tab = nextnext;
                rand();
            }
        }

        if (e.keyCode === 39) {
            tab.sort(function (a, b) {
                return a - b;
            });
            tab.reverse();

            move(tab, next, 'right');

            jQuery.each(next, function (i, val) {
                if (isset(val) && isset(val) === isset(val + 1) && val % cote !== cote - 1) {
                    merge(i, val, next, val + 1);
                }
            });
            move(next, nextnext, 'right');

            if (!identique(tab, nextnext)) {
                tab = nextnext;
                rand();
            }
        }

        if (e.keyCode === 38) {
            tab.sort(function (a, b) {
                return a - b;
            });

            move(tab, next, 'top');

            jQuery.each(next, function (i, val) {
                if (isset(val) && isset(val) === isset(val - cote) && val / cote >= 1) {
                    merge(i, val, next, val - cote);
                }
            });
            move(next, nextnext, 'top');

            if (!identique(tab, nextnext)) {
                tab = nextnext;
                rand();
            }
        }

        if (e.keyCode === 40) {
            tab.sort(function (a, b) {
                return a - b;
            });
            tab.reverse();

            move(tab, next, 'bottom');
            jQuery.each(next, function (i, val) {
                var combien = parseInt(val) + parseInt(cote);
                if (isset(val) && isset(val) === isset(combien) && combien < cote * cote) {
                    merge(i, val, next, combien);
                }
            });
            move(next, nextnext, 'bottom');

            if (!identique(tab, nextnext)) {
                tab = nextnext;
                rand();
            }
        }

        var j = (cote * cote) - 1;
        while (j > 0) {
            if ($(".grid-cell").eq(j).text() === '2048' && continu === true) {
                $("#win").show();
                continu = false;
            }
            j -= 1;
        }

        color();
    });

    var ok = false;
    var x;
    var y;
    var xx;
    var yy;

    $(".grid-container").on("mousedown", function (e) {
        e.preventDefault();
        xx = e.pageX - this.offsetLeft;
        yy = e.pageY - this.offsetTop;

        clearTimeout(this.downTimer);

        this.downTimer = setTimeout(function () {
            ok = true;
            return ok;
        }, 300);
    }).mouseup(function (e) {
        if (ok) {
            x = e.pageX - this.offsetLeft;
            y = e.pageY - this.offsetTop;

            if (xx > x + 100 && Math.abs(yy - y) < 50) {
                e = jQuery.Event("keydown");
                e.keyCode = 37;
                $(".grid-container").trigger(e);
            } else if (xx < x + 100 && Math.abs(yy - y) < 50) {
                e = jQuery.Event("keydown");
                e.keyCode = 39;
                $(".grid-container").trigger(e);
            }
            if (yy > y + 100 && Math.abs(xx - x) < 50) {
                e = jQuery.Event("keydown");
                e.keyCode = 38;
                $(".grid-container").trigger(e);
            } else if (yy < y + 100 && Math.abs(xx - x) < 50) {
                e = jQuery.Event("keydown");
                e.keyCode = 40;
                $(".grid-container").trigger(e);
            }
        }
        clearTimeout(this.downTimer);
        ok = false;
        return ok;
    });
});