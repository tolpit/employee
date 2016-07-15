var responseSettings = {};

class res {

    constructor(app, event) {
        this.app        = app;
        this.event      = event;
        this.statusCode = 200;
        this['Content-Type'] = 'text/html';

        this.start = this.prepare();

        this.event.respondWith(this.start);

        this.timeout = setTimeout(() => {
            this.error();
        }, app.get('timeout'));
    }

    prepare() {
        return new Promise((resolve, reject) => {
            this.endWell = resolve;
            this.endBad  = reject;
        });
    }

    send(body) {
        clearTimeout(this.timeout);

        this.done = true;

        return this.endWell(new Response(body, {
            status: this.statusCode,
            headers: this.headers || new Headers({
                'Content-Type': this['Content-Type']
            })
        }));
    }

    error() {
        this.statusCode = 503;
        this.done       = true;
        clearTimeout(this.timeout);

        return this.endBad(new Response("<h1>Service Unavailable</h1>", {
            status:     this.statusCode,
            statusText: 'Service Unavailable',
            headers:    this.headers || new Headers({
                'Content-Type': this['Content-Type']
            })
        }));
    }

    status(code) {
        this.statusCode = code;
    }

    json(body) {
        this['Content-Type'] = 'application/json';

        return this.send(body);
    }

    render(name, body = {}) {
        caches.match(`${this.app.get('views')}/layout.html`)
            .then(response => response.text())
            .then((layout) => {
                caches.match(`${this.app.get('views')}/${name}.html`)
                    .then((response) => {
                        this.headers = response.headers;
                        this.headers.set("x-powered-by", "Employee");

                        return response.text();
                    })
                    .then((template) => {
                        this.send(
                            this.app.render(layout, template, body)
                        );
                    });
            });
    }

    network(res) {
        return this.endWell(res);
    }

    cache(res) {
        return this.endWell(res);
    }

    static set(key, value) {
        responseSettings[key] = value;
    }

    static get(key, value) {

    }

}

export default res;