var points = 0;
var maxPoints = 0;

var images = {
    pmpa: [
        'https://vadebici.files.wordpress.com/2013/02/841276_10200419154979263_801994598_o.jpg',
        'http://novohamburgo.org/site/wp-content/uploads/2013/05/teefmardy-copy-Ro58.jpg',
        'https://poavive.files.wordpress.com/2013/02/img_7210.jpg',
        'http://www.gazetadopovo.com.br/ra/grande/Pub/GP/p4/2016/01/31/VidaCidadania/Imagens/Cortadas/poa_estrag31012016_518-k5cD-U102444674052li-1024x768%40GP-Web.jpeg',
        'http://multimidia.correiodopovo.com.br/thumb.aspx?Caminho=multimidia/2013/02/07/305533.JPG&Tamanho=617',
        'http://s2.glbimg.com/uM0GolfegY_mEb1oWV-3i7xVWcQ=/300x225/s.glbimg.com/jo/g1/f/original/2013/09/01/01092013523.jpg',
        'http://zh.rbsdirect.com.br/imagesrc/17363546.jpg?w=6400',
        'http://s2.glbimg.com/aiQnLt4pCCvBZVpGSnntm_5UlT0=/620x465/top/s.glbimg.com/jo/g1/f/original/2014/10/08/arvores2.jpg',
        'https://poavive.files.wordpress.com/2014/09/img_7142.jpg',
        'http://s2.glbimg.com/l792fL12TYkEAw9E8J0eaXfcZIs=/300x225/s.glbimg.com/jo/g1/f/original/2013/10/05/corredores_brt.jpg',
        'http://zerohora.clicrbs.com.br/rbs/image/17185016.jpg',
        'http://cdn.wp.clicrbs.com.br/estamosemobras/files/2014/11/16903716.jpg',
        'http://multimidia.correiodopovo.com.br/thumb.aspx?Caminho=multimidia/2015/11/17/377006.JPG&Tamanho=617',
        'http://multimidia.correiodopovo.com.br/thumb.aspx?Caminho=multimidia/2013/06/11/316268.JPG&Tamanho=617',
        'http://multimidia.correiodopovo.com.br/thumb.aspx?Caminho=multimidia/2014/03/20/332713.JPG&Tamanho=617',
        'https://portoimagem.files.wordpress.com/2014/02/tronco1.jpg',
        'http://imagem.band.com.br/f_247152.jpg',
        'http://1.bp.blogspot.com/-WqlbfWAhPmA/UkIFg1G_gEI/AAAAAAAAMuU/66Eg6nk53LM/s1600/fortunati_Regina_Becker_galinha.jpg',
        'http://zh.rbsdirect.com.br/imagesrc/16840789.jpg?w=640',
        'http://www.sul21.com.br/wp-content/uploads/2014/11/20141125-por-filipe-castilhos-_mg_0211.jpg',
        'images/11116088_858789557527136_829399231_n.jpg',
        'images/11118346_858789587527133_670369225_n.jpg',
        'images/11119823_858789804193778_1890904235_n.jpg',
        'images/11158077_858789867527105_616142091_n.jpg',
        'images/11169036_858789820860443_781564001_n.jpg',
    ],
    storm: [
        'http://multimidia.correiodopovo.com.br/thumb.aspx?Caminho=multimidia/2016/01/31/382544.JPG&Tamanho=1024',
        'http://s.glbimg.com/jo/g1/f/original/2016/02/01/img_1604.jpg',
        'http://www.correiodobrasil.com.br/wp-content/uploads/2016/02/chuva.jpg',
        'http://www.mancheteonline.com.br/wp-content/uploads/2016/02/Porto-Alegre-Chuva.jpg',
        'http://s2.glbimg.com/6-YrD29CvKv7TUAgEd3ZBg1Xjtk=/620x465/s.glbimg.com/jo/g1/f/original/2016/02/01/img_1230.jpg',
        'http://s.glbimg.com/jo/g1/f/original/2016/01/31/img_0656.jpg',
    ],
    combined: []
};

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
    $.each(images.pmpa, function (i, url) {
        images.combined.push({src: url, type: 'pmpa'});
        maxPoints += 1;
    });
    $.each(images.storm, function (i, url) {
        images.combined.push({src: url, type: 'storm'});
        maxPoints += 1;
    });
}

function nextImage() {
    var current = popRandom(images.combined);
    if (current === null) {
        endGame();
    }
    $('.game img.image').data('type', current.type).attr('src', current.src);
}

function endGame() {
    $('.game').fadeOut(function () {
        $('.final .score .points').html(points);
        $('.final .score .maxPoints').html(maxPoints);
        $('.final').fadeIn();
    });
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
    });

    $('.game .choice').on('click', function () {
        if ($(this).val() === $('.game .image').data('type')) {
            points += 1;
        }
        nextImage();
    });
});
