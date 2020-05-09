// submit.js

const iosocket = io.connect();

const nameField = document.getElementById('inputName')
, catField = document.getElementById('inputCategory')
, ideaField = document.getElementById('inputIdea')
, descField = document.getElementById('inputDescription')
, charCount = document.getElementById('charCount')
, urlField = document.getElementById('inputURL')
, submitBtn = document.getElementById('submitBtn')
, ideaForm = document.getElementById('ideaForm');

$( document ).ready(function() {
    'use strict';
    iosocket.on('connect', function () {
        console.log("Yo.........connected!");
    
        iosocket.emit("loadgb");

        window.addEventListener('load', function() {
            ideaForm.addEventListener("submit", function(ev){
                if (ideaForm.checkValidity() === false) {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                var inputURL = urlField.value;
                if (urlField.value == null || urlField.value == '') inputURL = "NIL";
                var entry = {
                    name : sqlTextConv(nameField.value, 'singleline'),
                    cat : catField.value,
                    idea : sqlTextConv(ideaField.value, 'singleline'),
                    desc : sqlTextConv(descField.value, 'multiline'),
                    url : sqlTextConv(inputURL, 'singleline')
                }
                if (entry.name == null || entry.name == '') entry.name = "Anonymous";
                iosocket.emit("submitidea", entry);
                return false;
            });
        });

        iosocket.on("submitFail", () => {
            alert("An error occurred. Please try again.")
        });

        iosocket.on("submitSuccess", () => {
            alert("Idea submitted! Your idea will be visible once it has been vetted.");
            location.reload();
        });
    
        iosocket.on('disconnect', function() {
            console.log("Disconnected");
        });
    });

    descField.onkeyup = () => {
        charCount.innerHTML = "Characters remaining: " + (500 - descField.value.length);
    };
});

function sqlTextConv(input, type) {
    var converted = input.replace(/\'/g,'&#39;');
    if (type = "multiline") converted = converted.replace(/\n/g,'<br>');
    return converted;
}