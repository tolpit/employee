import Router       from "./core/router";
import Debug        from "./core/debug";
import res          from "./core/response";
import DB           from "./db/db";
import Store        from "./db/store";
import middlewares  from "./core/middlewares";
import innocent     from "./innocent/innocent";

class employee {

    constructor() {
        this.middlewares = [];
        this.render      = innocent;

        this.settings = {
            "version":      "1.0",
            "name":         "cache",
            "view engine":  "innocent",
            "timeout":      5000
        };

        this.attachEvents();
    }

    attachEvents() {
        self.addEventListener('install',  this.handleInstall.bind(this));
        self.addEventListener('activate', this.handleActivate.bind(this));
        self.addEventListener('fetch',    this.handleFetch.bind(this));
    }

    use(callback) {
        this.middlewares.push(callback);
    }

    set(key, value) {
        switch(key) {
            case "static":
                this.setStaticBehavior(value);
                break;

            case "views":
                if(!value.startsWith("/")) value = "/" + value;
                break;

            case "view engine":
                if(value != this.settings["view engine"]) this.render = self[value] || this.render;
                break;

            default:
                break;
        }

        this.settings[key] = value;
    }

    get(key) {
        return this.settings[key];
    }

    cacheName() {
        return this.get("version") + "::" + this.get("name");
    }

    server() {
        console.log(this);
    }

    setStaticBehavior(behavior) {
        employee.Router.get(/\.(js|css|png|jpg|jpeg|gif|webm|webp|svg|map|html|xml|json|ico|woff|woff2|eot|ttf|otf|pdf)/, behavior);
    }

    handleInstall(event) {
        event.waitUntil(
            caches
                .open(this.cacheName())
                .then((cache) => cache.addAll(this.get("cache")))
        );
    }

    handleActivate(event) {
        event.waitUntil(
            caches
                .keys()
                .then((keys) => {
                    return Promise.all(
                        keys
                            .filter(key => !key.startsWith(this.get("version")))
                            .map(key => caches.delete(key))
                    );
                })
                .then(function() {
                    console.log('WORKER: activate completed.');
                })
        );
    }

    handleFetch(event) {
        //base64 data
        if(event && event.request.url.startsWith("data:")) return;

        var request     = event.request;
        var response    = new res(this, event);

        request.settings = this.settings;

        var mws = [];

        //Render when forced or when the user is offline
        if(this.get('force render') || !navigator.onLine) {
            mws = this.middlewares.concat(Router.match(request));
        }
        else {
            mws = [middlewares.NetworkFirst];
        }

        var index = 0;

        while(index < mws.length) {
            if(typeof mws[index] == "function") mws[index](request, response);
            index++;
        }
    }

}

employee.DB     = DB;
employee.Store  = Store;
employee.Router = Router;

for(var name in middlewares) employee[name] = middlewares[name];

self.employee   = employee;