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

                return res.network(response);
            }, () => {
                middlewares.unableToResolve(req, res);
            })
            .catch(() => {
                middlewares.unableToResolve(req, res);
            });
    },

    CacheFirst: function(req, res) {
        return res.cache(caches.match(req)) || middlewares.NetworkFirst(req, res);
    },

    unableToResolve: function(req, res) {
        return res.error();
    }

};

export default middlewares;