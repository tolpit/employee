const middlewares = {

    NetworkFirst: function(req, res) {
        // Debug.log("network", req);

        if(!navigator.onLine && !res.notInCache) {
            return middlewares.CacheFirst(req, res);
        }

        return fetch(req)
            .then((response) => {
                var cacheCopy = response.clone();

                //Debug.log(response);

                if(response.type !== "opaque" && req.method == "GET") {
                    caches
                        .open(req.settings.version + "::" + req.settings.name)
                        .then(function add(cache) {
                            cache.put(req, cacheCopy); //send it to the cache
                        });
                }

                return res ? res.network(response) : response;
            }, () => {
                middlewares.unableToResolve(req, res);
            })
            .catch(() => {
                middlewares.unableToResolve(req, res);
            });
    },

    CacheFirst: function(req, res) {
        //Debug.log("cache", req);

        return caches.match(req)
            .then((response) => {
                if(response) return res.cache(response);
                else {
                    res.notInCache = true;
                    return middlewares.NetworkFirst(req, res);
                }
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