// index.js

const iosocket = io.connect();

const cardContainer = document.getElementById("cardContainer");
var cards = [];
var images = []
images[0]="https://images.unsplash.com/photo-1588495752527-77d65c21f7cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=313&q=80";
images[1]="https://images.unsplash.com/photo-1519326844852-704caea5679e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1134&q=80";


$( document ).ready(function() {
    // var gamesCard = document.getElementById("gamescard");
    // gamesCard.addEventListener("click", function(){window.location.href = 'cat_games.html'});

    iosocket.on('connect', function() {
        console.log("Yo.........connected!");

        iosocket.emit('reqCards', 'games');

        iosocket.on('recCards', function(DBCards) {
            document.querySelectorAll('.card').forEach(function(ent) {
                ent.remove();
            })
            cardContainer.innerHTML = ``;

            for (i=DBCards.length-1; i>=0; i--) {
                cards[i] = document.createElement("div");
                cards[i].setAttribute('id', `entry${i}`); 
                cards[i].setAttribute('class', 'card card-pin');

                var img = document.createElement("img");
                img.setAttribute('class', 'card-img');
                img.setAttribute('src', images[rollDice(1,1)]);
                img.setAttribute('alt', 'Card Image');

                var overlay = document.createElement("div");
                overlay.setAttribute('class', 'overlay');

                var title = document.createElement("h2");
                title.setAttribute('class', 'card-title title');
                title.innerHTML = DBCards[i].idea;

                var author = document.createElement("h5");
                author.setAttribute('class', 'card-author text-muted');
                author.innerHTML = `Submitted by ${DBCards[i].name}`;

                var description = document.createElement("p");
                description.setAttribute('class', 'card-description');
                description.innerHTML = DBCards[i].description;

                if (DBCards[i].url != "NIL") {
                    var url = DBCards[i].url;
                    if (/http\/\//.test(URL) == false && /https\/\//.test(URL) == false){
                        url = `https://${url}`;
                    };
                    overlay.addEventListener("click", function(){window.open(url)});
                } else {
                    overlay.style.cursor = 'default';
                }

                cardContainer.appendChild(cards[i]);
                overlay.appendChild(title);
                overlay.appendChild(author);
                overlay.appendChild(description);
                cards[i].appendChild(img);
                cards[i].appendChild(overlay);

                

                console.log(`Entry ${i} printed!`);
            }
        });

        iosocket.on('disconnect', function() {
            console.log("Disconnected");
        });
    });
});

rollDice = (min, max) => {
    var range = max-min;
    return Math.floor(Math.random()*(range+1) + min);
}