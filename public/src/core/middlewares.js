const middlewares = {

    OFFLINE: function(req, res) {

    },

    ONLINE: function(req, res) {

    },

    NetworkFirst: function(req, res) {
        return fetch(req)
            .then((response) => {
                var cacheCopy = response.clone();

                caches
                    .open(req.settings.version + "::" + req.settings.name)
                    .then(function add(cache) {
                        cache.put(req, cacheCopy); //send it to the cache
                    })
                    .then(function() {
                        // return res.network(response);
                    });

                return res ? res.network(response) : response;
            }, () => {
                middlewares.unableToResolve(req, res);
            })
            .catch(() => {
                middlewares.unableToResolve(req, res);
            });
    },

    CacheFirst: function(req, res) {
        return caches.match(req)
            .then((response) => {
                if(response) return res.cache(response);
                else return middlewares.NetworkFirst(req, res);
            })
            .catch((err) => {
                console.trace(err);

                return middlewares.NetworkFirst(req, res);
            });
    },

    unableToResolve: function(req, res) {
        return res.error();
    }

};

export default middlewares;