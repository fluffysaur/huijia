const iosocket = io.connect();

const image = document.getElementById('category-img'),
cardTitle = document.getElementById('idea-name'),
submittedBy = document.getElementById('submitted-by'),
description = document.getElementById('description'),
hiddenUrl = document.getElementsByClassName('hide')[0];

$( document ).ready(function() {
    iosocket.on('connect', function() {
        console.log("Yo.........connected!");

        iosocket.emit('needRandomCard');

        iosocket.on('randomCard', function(randomEntry) {
            console.log("got a random card!");
            cardTitle.innerText = randomEntry.idea;
            submittedBy.innerText = "Submitted by: " + randomEntry.name;
            description.innerText = randomEntry.description;
            
            const cat = randomEntry.category;
            image.src = "assets/img/" + cat + ".jpg";

            if (randomEntry.url != "NIL") {
                hiddenUrl.className = "";

            }

            console.log(`Random entry printed!`);
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