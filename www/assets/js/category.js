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

var cardID = [];
var cards = [];
var images = {
    games : "https://images.unsplash.com/photo-1518918015065-2daef8f1ec30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
    arts : "https://images.unsplash.com/photo-1475669698648-2f144fcaaeb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    music : "https://images.unsplash.com/photo-1585298723682-7115561c51b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
    cooking : "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    diy : "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    mathsci : "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
    movies : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    programming : "../assets/img/programming.jpg", 
    others : "https://66.media.tumblr.com/ff9d36e792ce79cd1406466bed141bde/tumblr_p71wimTDxQ1x6lzc3o1_1280.png",
    fashion : "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", 
    reading : "https://i.pinimg.com/originals/99/be/1c/99be1cdbeb0ee7b6388cacfbde20ddd1.jpg",
    wellness : "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1931&q=80"
};
var catRetriever = {
    games : 'Games',
    arts : 'Arts',
    music : 'Music',
    cooking : 'Cooking',
    diy : 'DIY',
    mathsci : 'Mathsci',
    movies : 'Movies',
    programming : 'Programming',
    reading : 'Reading',
    fashion : 'Fashion',
    wellness : 'Wellness',
    others : 'Others'
}

$( document ).ready(function() {

    iosocket.on('connect', function() {
        console.log("Yo.........connected!");

        iosocket.emit('reqCards', catRetriever[pageName]);

        iosocket.on('recCards', async function(DBCards) {
            document.querySelectorAll('.card').forEach(function(ent) {
                ent.remove();
            })

            for (i=DBCards.length-1; i>=0; i--) {
                cards[i] = document.createElement("div");
                cards[i].setAttribute('id', `entry${i}`); 
                cards[i].setAttribute('class', 'card card-pin');

                var img = document.createElement("img");
                img.setAttribute('class', 'card-img');
                if (DBCards[i].imageurl != "NIL" && DBCards[i].imageurl != "") {
                    var url = DBCards[i].imageurl;
                    if (/http:\/\//.test(url) == false && /https:\/\//.test(url) == false){
                        url = `https://${url}`;
                    };
                    checkImage(url,
                        function(){img.src = url; console.log("Image Retrieved");},
                        function(){img.src = images[pageName]; console.log(`Unable to retrieve image from ${url}. Replacing with default image.`)
                    }); // Check if image exists. If not, replace with default image.
                } else {
                    img.src = images[pageName];
                }
                img.setAttribute('alt', 'Card Image');
                
                let promise = new Promise((resolve, reject) => {
                    img.addEventListener("load", function() {
                        var numRatio = img.height/img.width;
                        resolve(numRatio);
                    });
                })

                let imgRatio = await promise;
                // console.log("imgRatio = "+imgRatio);
                
                var maxLines = Math.floor(imgRatio*5);
                // console.log("maxLines = "+maxLines);
                
                var overlay = document.createElement("div");
                overlay.setAttribute('id', `${DBCards.id}`);
                overlay.setAttribute('class', 'overlay');
                overlay.setAttribute('onclick', `document.location='../card.html?query=${DBCards[i].id}'`);
                console.log(`document.location='../card.html?query=${DBCards[i].id}'`);

                var title = document.createElement("h2");
                title.setAttribute('class', 'card-title title');
                title.innerHTML = DBCards[i].idea;

                var author = document.createElement("h5");
                author.setAttribute('class', 'card-author text-muted');
                author.innerHTML = `Submitted by ${DBCards[i].name}`;

                var description = document.createElement("p");
                description.setAttribute('class', 'card-description truncate-overflow');
                description.setAttribute('style', `-webkit-line-clamp: ${maxLines};`)
                description.innerHTML = DBCards[i].description;

                let upvoteBtn = document.createElement("a");
                upvoteBtn.setAttribute('class', 'stats badge badge-success');
                let upvoteIcon = document.createElement("span");
                upvoteIcon.setAttribute('class', 'iconic iconic-caret-up');
                upvoteIcon.setAttribute('aria-hidden', 'true');
                let upvotesCount = document.createTextNode("Upvotes: " + DBCards[i].upvotes);
                upvoteBtn.appendChild(upvoteIcon);
                upvoteBtn.appendChild(upvotesCount);

                let viewsBtn = document.createElement("a");
                viewsBtn.setAttribute('class', 'stats badge badge-secondary');
                let viewIcon = document.createElement("span");
                viewIcon.setAttribute('class', 'iconic iconic-eye-open');
                viewIcon.setAttribute('aria-hidden', 'true');
                let viewCount = document.createTextNode("Views: " + DBCards[i].views + " ");
                viewsBtn.appendChild(viewIcon);
                viewsBtn.appendChild(viewCount);

                var statsCounter = document.createElement("div");
                statsCounter.setAttribute('class', 'more');
                statsCounter.appendChild(viewsBtn);
                statsCounter.appendChild(upvoteBtn);

                cardContainer.appendChild(cards[i]);
                overlay.appendChild(title);
                overlay.appendChild(author);
                overlay.appendChild(description);
                overlay.appendChild(statsCounter);
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

checkImage = (imageSrc, good, bad) => {
    var img = new Image();
    img.src = imageSrc;
    img.onload = good; 
    img.onerror = bad;
}