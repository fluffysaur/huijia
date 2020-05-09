const iosocket = io.connect();

const urlParams = new URLSearchParams(window.location.search);
var query = urlParams.get('query');
console.log(query);

const cardImg = document.getElementById('category-img'),
cardTitle = document.getElementById('idea-name'),
submittedBy = document.getElementById('submitted-by'),
description = document.getElementById('description'),
hiddenUrl = document.getElementsByClassName('hide')[0];

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

        if (isNaN(query)) query = 'random';
        iosocket.emit('getCard', query);

        iosocket.on('recCard', function(entry) {
            cardTitle.innerText = entry.idea;
            submittedBy.innerText = "Submitted by: " + entry.name;
            description.innerText = entry.description;
            cardImg.src = images[entry.category];

            if (entry.url != "NIL") {
                hiddenUrl.className = "";
            }

            console.log(`Entry printed!`);
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