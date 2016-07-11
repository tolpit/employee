const middlewares = {

    OFFLINE: function(req, res) {

    },

    ONLINE: function(req, res) {

    },

    NetworkFirst: function(req, res) {
        fetch(req)
            .then((response) => {
                var cacheCopy = response.clone();

                caches
                    .open(req.settings.version + "::" + req.settings.name)
                    .then(function add(cache) {
                        cache.put(req, cacheCopy);
                    })
                    .then(function() {
                        // return res.network(response);
                    });

                return res.network(response);
        })
    },

    CacheFirst: function(req, res) {
        return res.cache(caches.match(req));
    },

    unableToResolve: function(req, res) {

    }

};

export default middlewares;