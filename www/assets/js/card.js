const iosocket = io.connect();

const image = document.getElementById('category-img'),
hiddenUrl = document.getElementsByClassName('hide')[0];

image.src = "https://www.theparisreview.org/blog/wp-content/uploads/2019/07/istock-512102071.jpg";

// if URL exists
hiddenUrl.className = "";