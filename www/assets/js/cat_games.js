// index.js

const iosocket = io.connect();

const cardContainer = document.getElementById("cardContainer");

$( document ).ready(function() {
    // var gamesCard = document.getElementById("gamescard");
    // gamesCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});

    iosocket.on('connect', function () {
        console.log("Yo.........connected!");

        iosocket.emit('reqCards', 'games');

        iosocket.on('recCards')

        iosocket.on('disconnect', function() {
            console.log("Disconnected");
        });
    });
});