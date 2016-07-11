if('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then((serviceWorkerRegistration) => {
            window.serviceWorkerRegistration = serviceWorkerRegistration;
        })
        .catch(function(err) {
            console.error(err);
        });
}


