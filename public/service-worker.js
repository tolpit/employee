importScripts('/src/lib/serviceworker-cache-polyfill.js');
importScripts('/dist/employee.bundle.js');

var worker = new employee();
var router = employee.Router;
var DB     = employee.DB;
var Store  = employee.Store;

//Config
worker.set('name', 'object-cache');
worker.set('version', 1.0);

worker.set('views', '/template');
worker.set('view engine', 'innocent'); //a parser who only parse plain text html, no access to the DOM inside the a service worker :/
worker.set('timeout', 3000);
//worker.set('force render', true);

DB.connect("test", [
    "data",
    "cache"
], function(db) {
    Store.require('data').save({
        _id: 1,
        name: "Foo Bar",
        text: "Lorem ispum..."
    })
});

worker.set('cache', [
    '/template/layout.html',
    '/template/index.html',
    '/template/error.html',
    '/template/object.html'
]);

//Router
router.get('/', function(req, res) {
    return res.render('index', {
        _id: 123,
        name: "Offline",
        text: "Lorem ispum...",
        img: ''
    });
});

router.get('/object/:id', function(req, res) {
    console.log(req.params.id);

    Store
        .require("data")
        .findById(req.params.id, function(data) {
            return res.render('object', data);
        });
});

//router.get(/\.js/, employee.NetworkFirst);

worker.set('static', employee.CacheFirst);

worker.server();