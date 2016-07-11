#employee.js

Express like inside a service worker

```
var worker = new employee();

worker.set('cache', 'object-cache');
worker.set('version', 1.0);

worker.set('views', '/template');
worker.set('view engine', 'innocent'); //a parser who only parse plain text html, no access to the DOM inside the a service worker

worker.set('static', employee.NetworkFirst);
worker.set('cache', [
	'/template/index.html',
	'/template/object.html'
]);
```


## Routing :
```
var router = employee.Router();

router.get('/object/:id', function(req, res, next) {
	res.render('object', data);
});
```


## Use middlewares :
```
//When the user is offline
router.get('/', employee.OFFLINE, function(req, res, next) {
	res.render('index', data);
});

//When the user is online
router.get('/', employee.ONLINE, function(req, res, next) {
	res.render('index', data);
});
```

## With IndexedDB solutions:
```
var objectStore = Store.require('objects');

router.get('/', employee.OFFLINE, function(req, res, next) {
	objectStore.find(null, function(data) {
		res.render('index', data);
	});
});
```