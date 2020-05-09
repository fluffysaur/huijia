// index.js

const iosocket = io.connect();

var path = window.location.pathname;
var page = path.split("/").pop();
var pageName = page.replace('.html', '');
console.log(pageName);

const cardContainer = document.getElementById("cardContainer")
, pageTitle = document.getElementById("pageTitle");

const urlParams = new URLSearchParams(window.location.search);
const paramType = urlParams.get('type');
console.log(paramType);

// pageTitle.innerHTML = pageName;

var overlays = document.getElementsByClassName("overlay");
var cardID = [];
var cards = [];
var images = {
    games : "https://images.unsplash.com/photo-1518918015065-2daef8f1ec30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
    arts : "https://images.unsplash.com/photo-1475669698648-2f144fcaaeb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    music : "https://images.unsplash.com/photo-1585298723682-7115561c51b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
    cooking : "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    diy : "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    mathsci : "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
    movies : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
};

$( document ).ready(function() {

    iosocket.on('connect', function() {
        console.log("Yo.........connected!");

        iosocket.emit('reqCards', pageName);

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
                img.setAttribute('src', images[pageName]);
                img.setAttribute('alt', 'Card Image');

                overlay = document.createElement("div");
                overlay.setAttribute('id', `${DBCards.id}`);
                overlay.setAttribute('class', 'overlay');
                overlay.setAttribute('onclick', `document.location='../card.html?query=${DBCards[i].id}'`);
                console.log(`document.location='../card.html?query=${DBCards[i].id}'`)

                var title = document.createElement("h2");
                title.setAttribute('class', 'card-title title');
                title.innerHTML = DBCards[i].idea;

                var author = document.createElement("h5");
                author.setAttribute('class', 'card-author text-muted');
                author.innerHTML = `Submitted by ${DBCards[i].name}`;

                var description = document.createElement("p");
                description.setAttribute('class', 'card-description');
                description.innerHTML = DBCards[i].description;

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