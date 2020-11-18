var points = 0;
var maxPoints = 0;

var images = {
    pmpa: [
        'images/pmpa/841276_10200419154979263_801994598_o.jpg',
        'images/pmpa/teefmardy-copy-Ro58.jpg',
        'images/pmpa/img_7210.jpg',
        'images/pmpa/305341.jpeg',
        'images/pmpa/01092013523.jpg',
        'images/pmpa/17363546.jpg',
        'images/pmpa/arvores2.jpg',
        'images/pmpa/img_7142.jpg',
        'images/pmpa/corredores_brt.jpg',
        'images/pmpa/17185016.jpg',
        'images/pmpa/16903716.jpg',
        'images/pmpa/tronco1.jpg',
        'images/pmpa/f_247152.jpg',
        'images/pmpa/fortunati_Regina_Becker_galinha.jpg',
        'images/pmpa/16840789.jpg',
        'images/pmpa/20141125-por-filipe-castilhos-_mg_0211.jpg',
        'images/pmpa/11116088_858789557527136_829399231_n.jpg',
        'images/pmpa/11118346_858789587527133_670369225_n.jpg',
        'images/pmpa/11119823_858789804193778_1890904235_n.jpg',
        'images/pmpa/11158077_858789867527105_616142091_n.jpg',
        'images/pmpa/11169036_858789820860443_781564001_n.jpg',
        'images/pmpa/rsporto-alegrecrateraninafreelaesp1.jpg',
    ],
    storm: [
        'images/storm/img_1604.jpg',
        'images/storm/chuva.jpg',
        'images/storm/img_1230.jpg',
        'images/storm/img_0656.jpg',
        'images/storm/24073361243_99cd608902_z.jpg',
        'images/storm/temporal-429492.jpg',
        'images/storm/img_0655.jpg',
        'images/storm/depois_3.jpg',
        'images/storm/CaeAw6tXEAAi-bw.jpg'
    ],
    combined: []
};

Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    if (i == 0)
        return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

function randomInt(max, min) {
    return ((min | 0) + Math.random() * (max + 1)) | 0;
}

function popRandom(arr) {
    var selected = arr.splice(randomInt(arr.length - 1, 0), 1);
    if (selected.length > 0) {
        return selected[0];
    } else {
        return null;
    }
}

function prepareGame() {
    maxPoints = 0;
    points = 0;
    $.each(images.pmpa, function (i, url) {
        images.combined.push({src: url, type: 'pmpa'});
    });
    $.each(images.storm, function (i, url) {
        images.combined.push({src: url, type: 'storm'});
    });

    images.combined = images.combined.shuffle().slice(0, 20);
    maxPoints = images.combined.length;
}

function nextImage() {
    var current = popRandom(images.combined);
    if (current === null) {
        endGame();
    }
    $('.game img.image').data('type', current.type).attr('src', current.src);
    updateProgress();
}

function updateProgress() {
    var total = maxPoints;
    var left = images.combined.length;
    var elapsed = total - left;
    var percent = (100 * elapsed) / total;

    $('.game .progress .progress-bar').css('width', percent + '%');
    $('.game .progress .images-left').html(elapsed + ' / ' + total);
}

function endGame() {
    $('.game').fadeOut(function () {
        $('.final .score .points').html(points);
        $('.final .score .maxPoints').html(maxPoints);
        $('.final').fadeIn();
    });
    ga('send', 'event', 'Game', 'end');
}

function dumpImages() {
    $('.dump img').remove();
    $.each(images.pmpa, function (i, url) {
        $('.dump .pmpa').append('<img src="' + url + '" class="img-responsive">');
    });
    $.each(images.storm, function (i, url) {
        $('.dump .storm').append('<img src="' + url + '" class="img-responsive">');
    });
    $('.dump').removeClass('hidden');
}

$(document).ready(function () {

    $('.hidden').removeClass('hidden').hide();

    $('.start').on('click', function () {
        prepareGame();
        $('.header .start').fadeOut();
        $('.final').fadeOut();

        nextImage();
        $('.game').fadeIn();
        ga('send', 'event', 'Game', 'start');
    });

    $('.game .choice').on('click', function () {
        if ($(this).val() === $('.game .image').data('type')) {
            points += 1;
        }
        nextImage();
        ga('send', 'event', 'Game', 'choice');
    });

    $('.final .share').on('click', function () {
        FB.ui({
            method: 'share',
            href: 'https://dona.to/game/',
            title: 'Prefeitura ou Catástrofe? Acertei ' + points + ' de ' + maxPoints + ' fotos!',
            caption: 'Você consegue fazer melhor?',
        }, function (response) {});
    });
});
