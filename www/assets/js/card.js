const iosocket = io.connect();

const urlParams = new URLSearchParams(window.location.search);
var query = urlParams.get('query');
console.log(query);

var cardImg = document.getElementById('category-img'),
cardTitle = document.getElementById('idea-name'),
cardName = document.getElementById('cardName'),
description = document.getElementById('description'),
hiddenUrl = document.getElementsByClassName('hide')[0],
cardCategory = document.getElementById('cardCategory'),
upvoteBtn = document.getElementById('upvotes'),
upvoteNumber = document.getElementById('number'),
views = document.getElementById('number-of-views'),
cardId = query,
upvoted = false;

var images = {
    Games : "https://66.media.tumblr.com/5c759e49bc792499a41f8acc1e02d47d/tumblr_pnk8roipcC1v5jdoy_540.jpg",
    Arts : "https://i.pinimg.com/originals/15/a5/b5/15a5b5b9082b4c2d6042879657711554.jpg",
    Music : "https://i.pinimg.com/originals/fc/69/98/fc69986f8742023918e1e44fb441a7c4.jpg",
    Cooking : "https://c.stocksy.com/a/JY2600/z9/1439783.jpg",
    DIY : "https://cdn.shopify.com/s/files/1/1087/8400/files/Mortise_and_Tenon_Mike_Updegraff_Antique_Furniture-3.jpg?v=1517428400",
    Mathsci : "https://www.theparisreview.org/blog/wp-content/uploads/2019/07/istock-512102071.jpg",
    Movies : "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80",
    Programming : "assets/img/programming.jpg", 
    Others : "https://66.media.tumblr.com/ff9d36e792ce79cd1406466bed141bde/tumblr_p71wimTDxQ1x6lzc3o1_1280.png",
    Fashion : "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", 
    Nature : "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
    Wellness : "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1931&q=80"
};

$( document ).ready(function() {
    iosocket.on('connect', function() {
        console.log("Yo.........connected!");

        if (isNaN(query)) query = 'random';
        iosocket.emit('getCard', query);

        iosocket.on('recCard', function(entry) {
            cardTitle.innerHTML = entry.idea;
            cardName.innerHTML = `Submitted by: ${entry.name}`;
            description.innerHTML = entry.description;
            cardCategory.innerHTML = `Category: ${entry.category}`;
            upvoteNumber.innerHTML = entry.upvotes;
            console.log(upvoteBtn);
            views.innerHTML = `Number of views: ${entry.views}`;
            cardId = entry.id;

            if (entry.imageurl != "NIL" && entry.imageurl != "") {
                var url = entry.imageurl;
                if (/http:\/\//.test(url) == false && /https:\/\//.test(url) == false){
                    url = `https://${url}`;
                };
                cardImg.src = url;
            } else {
                cardImg.src = images[entry.category];
            }
            
            if (entry.url != "NIL") {
                var url = entry.url;
                if (/http:\/\//.test(url) == false && /https:\/\//.test(url) == false){
                    url = `https://${url}`;
                };
                // hiddenUrl.className = "d-block";
                // const btn = hiddenUrl.getElementsByClassName('btn')[0];
                // btn.setAttribute("href", url);
                // btn.setAttribute("target", "_blank");
                // btn.setAttribute("rel", "noopener noreferrer");
                
                const displayBlock = document.getElementById("display-block");

                var extURL = document.createElement("small");
                extURL.setAttribute("class", "d-block");

                var extURLButton = document.createElement("a");
                extURLButton.setAttribute("class", "btn btn-sm btn-gray200");
                extURLButton.setAttribute("href", url);
                extURLButton.setAttribute("target", "_blank");
                extURLButton.setAttribute("rel", "noopener noreferrer");
                extURLButton.innerText = "Visit Website ";

                var extURLIcon = document.createElement("i");
                extURLIcon.setAttribute("class", "fa fa-external-link");

                extURLButton.appendChild(extURLIcon);
                extURL.appendChild(extURLButton);
                displayBlock.appendChild(extURL);
            }

            console.log(`Entry printed!`);
        });

        upvoteBtn.addEventListener("click", function(){ 
            if (!upvoted) {
                iosocket.emit('upvote', cardId);
                upvoteNumber.innerHTML = parseInt(upvoteNumber.innerHTML) + 1;
                upvotes.children[1].setAttribute("class", "bi bi-caret-up hide");
                upvotes.children[2].setAttribute("class", "bi bi-caret-up-fill");
                upvoted = true;
                console.log(`upvoted ${cardId}`);
            } else {
                iosocket.emit('unupvote', cardId);
                upvoteNumber.innerHTML = parseInt(upvoteNumber.innerHTML) - 1;
                upvotes.children[1].setAttribute("class", "bi bi-caret-up");
                upvotes.children[2].setAttribute("class", "bi bi-caret-up-fill hide");
                upvoted = false;
                console.log(`un-upvoted ${cardId}`);
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