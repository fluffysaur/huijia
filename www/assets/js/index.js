// index.js

const iosocket = io.connect();

$( document ).ready(function() {
    var gamesCard = document.getElementById("gamescard");
    var musicCard = document.getElementById("musiccard");
    var artsCard = document.getElementById("artscard");
    var mathsciCard = document.getElementById("mathscicard");
    var progCard = document.getElementById("progcard");
    var diyCard = document.getElementById("diycard");
    var cookingCard = document.getElementById("cookingcard");
    var othersCard = document.getElementById("otherscard");
    var fashionCard = document.getElementById("fashioncard");
    var moviesCard = document.getElementById("moviescard");
    var natureCard = document.getElementById("naturecard");
    var wellnessCard = document.getElementById("wellnesscard");

    gamesCard.addEventListener("click", function(){window.location.href = 'categories/games.html'});
    musicCard.addEventListener("click", function(){window.location.href = 'categories/music.html'});
    artsCard.addEventListener("click", function(){window.location.href = 'categories/arts.html'});
    mathsciCard.addEventListener("click", function(){window.location.href = 'categories/mathsci.html'});
    progCard.addEventListener("click", function(){window.location.href = 'categories/programming.html'});
    diyCard.addEventListener("click", function(){window.location.href = 'categories/diy.html'});
    cookingCard.addEventListener("click", function(){window.location.href = 'categories/cooking.html'});
    othersCard.addEventListener("click", function(){window.location.href = 'categories/others.html'});
    fashionCard.addEventListener("click", function(){window.location.href = 'categories/fashion.html'});
    moviesCard.addEventListener("click", function(){window.location.href = 'categories/movies.html'});
    natureCard.addEventListener("click", function(){window.location.href = 'categories/nature.html'});
    wellnessCard.addEventListener("click", function(){window.location.href = 'categories/wellness.html'});

    iosocket.on('connect', function () {
        console.log("Yo.........connected!");

        iosocket.on('disconnect', function() {
            console.log("Disconnected");
        });
    });
});