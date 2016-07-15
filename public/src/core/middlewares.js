const middlewares = {

    NetworkFirst: function(req, res) {
        Debug.log("network", req);

        if(!navigator.onLine) return middlewares.CacheFirst(req, res);

        var options = {
            method: req.method,
            headers: req.headers
        };

        if(req.mode && req.mode == "cors") {
            options.mode = "cors";
        }

        Debug.log(options);

        return fetch(req, options)
            .then((response) => {
                var cacheCopy = response.clone();

                caches
                    .open(req.settings.version + "::" + req.settings.name)
                    .then(function add(cache) {
                        cache.put(req, cacheCopy); //send it to the cache
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
        Debug.log("cache", req);

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