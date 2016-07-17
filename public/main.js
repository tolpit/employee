if('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then((serviceWorkerRegistration) => {
            window.serviceWorkerRegistration = serviceWorkerRegistration;
        })
        .catch(function(err) {
            console.error(err);
        });
}

var req = new XMLHttpRequest();

req.onload = function() {
    var img = document.createElement('img');
        img.src = 'https://pbs.twimg.com/media/CnQCSU9W8AAJbCv.jpg';

    document.body.appendChild(img);
};

req.open('GET', 'https://pbs.twimg.com/media/CnQCSU9W8AAJbCv.jpg', true);
req.send(null);


