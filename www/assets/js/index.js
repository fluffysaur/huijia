// index.js

const iosocket = io.connect();

$( document ).ready(function() {
    var gamesCard = document.getElementById("gamescard");
    var musicCard = document.getElementById("musiccard");
    var drawingCard = document.getElementById("drawingcard");
    var mathsciCard = document.getElementById("mathscicard");
    var progCard = document.getElementById("progcard");
    var handsonCard = document.getElementById("handsoncard");
    var homeimprovCard = document.getElementById("homeimprovcard");
    var foodCard = document.getElementById("foodcard");
    var othersCard = document.getElementById("otherscard");

    gamesCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});
    musicCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});
    drawingCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});
    mathsciCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});
    progCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});
    handsonCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});
    homeimprovCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});
    foodCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});
    othersCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});

    iosocket.on('connect', function () {
        console.log("Yo.........connected!");

        iosocket.on('disconnect', function() {
            console.log("Disconnected");
        });
    });
});