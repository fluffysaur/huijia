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
    games : "https://66.media.tumblr.com/5c759e49bc792499a41f8acc1e02d47d/tumblr_pnk8roipcC1v5jdoy_540.jpg",
    arts : "https://i.pinimg.com/originals/15/a5/b5/15a5b5b9082b4c2d6042879657711554.jpg",
    music : "https://i.pinimg.com/originals/fc/69/98/fc69986f8742023918e1e44fb441a7c4.jpg",
    cooking : "https://c.stocksy.com/a/JY2600/z9/1439783.jpg",
    diy : "https://cdn.shopify.com/s/files/1/1087/8400/files/Mortise_and_Tenon_Mike_Updegraff_Antique_Furniture-3.jpg?v=1517428400",
    mathsci : "https://www.theparisreview.org/blog/wp-content/uploads/2019/07/istock-512102071.jpg",
    movies : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    programming : "assets/img/programming.jpg", 
    others : "https://66.media.tumblr.com/ff9d36e792ce79cd1406466bed141bde/tumblr_p71wimTDxQ1x6lzc3o1_1280.png",
    fashion : "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", 
    nature : "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
    wellness : "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1931&q=80"
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
                var url = entry.url;
                if (/http\/\//.test(url) == false && /https\/\//.test(url) == false){
                    url = `https://${url}`;
                };
                hiddenUrl.className = "d-block";
                const btn = hiddenUrl.getElementsByClassName('btn')[0];
                btn.setAttribute("href", randomEntry.url);
                console.log(hiddenUrl);
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