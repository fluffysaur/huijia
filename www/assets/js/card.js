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
views = document.getElementById('number-of-views');
// upvoted = false;

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
    Reading : "https://i.pinimg.com/originals/99/be/1c/99be1cdbeb0ee7b6388cacfbde20ddd1.jpg",
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

            if (entry.imageurl != "NIL" && entry.imageurl != "") {
                var url = entry.imageurl;
                if (/http:\/\//.test(url) == false && /https:\/\//.test(url) == false){
                    url = `https://${url}`;
                };
                checkImage(entry.imageurl,
                    function(){cardImg.src = entry.imageurl; console.log("Image Retrieved");},
                    function(){cardImg.src = images[entry.category]; console.log(`Unable to retrieve image from ${url}. Replacing with default image.`)
                }); // Check if image exists. If not, replace with default image.
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
            if (typeof(Storage) !== "undefined") { 
                if (localStorage.getItem(query) == "false") {
                    iosocket.emit('upvote', query);
                    upvoteNumber.innerHTML = parseInt(upvoteNumber.innerHTML) + 1;
                    upvotes.children[1].setAttribute("class", "bi bi-caret-up hide");
                    upvotes.children[2].setAttribute("class", "bi bi-caret-up-fill");
                    console.log(`upvoted ${query}`);
                    localStorage.setItem(query, "true");
                } else {
                    iosocket.emit('unupvote', query);
                    upvoteNumber.innerHTML = parseInt(upvoteNumber.innerHTML) - 1;
                    upvotes.children[1].setAttribute("class", "bi bi-caret-up");
                    upvotes.children[2].setAttribute("class", "bi bi-caret-up-fill hide");
                    console.log(`un-upvoted ${query}`);
                    localStorage.setItem(query, "false");
                }
            } else {
                alert("Your browser does not support this feature, sorry. We recommend Google Chrome.");
            }
        });

        function upvoteInit() {
            if (typeof(Storage) !== "undefined") {
                if (localStorage.getItem(query) == undefined) {
                    localStorage.setItem(query, "false");
                }
                if (localStorage.getItem(query) == "true") {
                    upvotes.children[1].setAttribute("class", "bi bi-caret-up hide");
                    upvotes.children[2].setAttribute("class", "bi bi-caret-up-fill");
                }
            }
        }

        upvoteInit();

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