import Debug from "./debug";

var Router = { routes: {} };

Router.use = function(url, method, body, callbacks) {
    let prepareURL = url;

    if(typeof prepareURL == "string" && ~prepareURL.indexOf(':')) {
        prepareURL = Router.transform(prepareURL);
    }

    Router.routes[url] = {
        originUrl: url,
        url: prepareURL,
        method: method,
        body: body,
        middlewares: callbacks
    }
};

Router.get = function(url, ...callbacks) {
    Router.use(url, 'GET', null, callbacks);
};

Router.put = function(url, body, ...callbacks) {
    Router.use(url, 'PUT', body, callbacks);
};

Router.post = function(url, body, ...callbacks) {
    Router.use(url, 'POST', body, callbacks);
};

Router.transform = function(url) {
    return new RegExp(url.replace(/(:[\w\n\S\s\t]*)/gi, '([\\w\\n\\S\\s]*)').replace(/\//g, '\\/') + "$");
};

Router.extract = function(req, url, route) {
    var params = {};

    var keys    = typeof route.originUrl == "string" ? route.originUrl.match(route.url) : [];
    var values  = url.pathname.match(route.url);

    for(var i = 1; i < keys.length; i++) {
        params[keys[i].replace(':', '')] = values[i];
    }

    req.params = params;
};

Router.match = function match(req) {
    let url         = new URL(req.url);
    var middlewares = [];

    for(var key in Router.routes) {
        if(Router.routes[key] && Router.routes[key].method == req.method && (Router.routes[key].url instanceof RegExp ? Router.routes[key].url.test(url.pathname) : Router.routes[key].url == url.pathname)) {
            Router.extract(req, url, Router.routes[key]);

            middlewares = middlewares.concat(Router.routes[key].middlewares);
        }
    }

    return middlewares;
};

export default Router;