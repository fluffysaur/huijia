const iosocket = io.connect();

const image = document.getElementById('category-img'),
cardTitle = document.getElementById('idea-name'),
submittedBy = document.getElementById('submitted-by'),
description = document.getElementById('description'),
hiddenUrl = document.getElementsByClassName('hide')[0];

var images = {
    Games : "https://66.media.tumblr.com/5c759e49bc792499a41f8acc1e02d47d/tumblr_pnk8roipcC1v5jdoy_540.jpg",
    Arts : "https://i.pinimg.com/originals/15/a5/b5/15a5b5b9082b4c2d6042879657711554.jpg",
    Music : "https://i.pinimg.com/originals/fc/69/98/fc69986f8742023918e1e44fb441a7c4.jpg",
    Cooking : "https://c.stocksy.com/a/JY2600/z9/1439783.jpg",
    Diy : "https://cdn.shopify.com/s/files/1/1087/8400/files/Mortise_and_Tenon_Mike_Updegraff_Antique_Furniture-3.jpg?v=1517428400",
    Mathsci : "https://www.theparisreview.org/blog/wp-content/uploads/2019/07/istock-512102071.jpg",
    Movies : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    Programming : "assets/img/programming.jpg", 
    Others : "https://66.media.tumblr.com/ff9d36e792ce79cd1406466bed141bde/tumblr_p71wimTDxQ1x6lzc3o1_1280.png",
    Fashion : "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", 
    Nature : "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
    Wellness : "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1931&q=80"
};

$( document ).ready(function() {
    iosocket.on('connect', function() {
        console.log("Yo.........connected!");

        iosocket.emit('reqCard', "random");

        iosocket.on('recCard', function(randomEntry) {
            console.log("got a random card!");
            cardTitle.innerText = randomEntry.idea;
            submittedBy.innerText = "Submitted by: " + randomEntry.name;
            description.innerText = randomEntry.description;
            
            const cat = randomEntry.category;
            image.src = images[cat];

            if (randomEntry.url != "NIL") {
                hiddenUrl.className = "d-block";
                const btn = hiddenUrl.getElementsByClassName('btn')[0];
                btn.setAttribute("href", randomEntry.url);
                console.log(hiddenUrl);
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