/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _router=__webpack_require__(1);var _router2=_interopRequireDefault(_router);var _debug=__webpack_require__(2);var _debug2=_interopRequireDefault(_debug);var _response=__webpack_require__(3);var _response2=_interopRequireDefault(_response);var _db=__webpack_require__(4);var _db2=_interopRequireDefault(_db);var _store=__webpack_require__(5);var _store2=_interopRequireDefault(_store);var _middlewares=__webpack_require__(6);var _middlewares2=_interopRequireDefault(_middlewares);var _innocent=__webpack_require__(7);var _innocent2=_interopRequireDefault(_innocent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var employee=function(){function employee(){_classCallCheck(this,employee);this.middlewares=[];this.render=_innocent2.default;this.settings={"version":"1.0","name":"cache","view engine":"innocent","timeout":5000};this.attachEvents();}_createClass(employee,[{key:"attachEvents",value:function attachEvents(){self.addEventListener('install',this.handleInstall.bind(this));self.addEventListener('activate',this.handleActivate.bind(this));self.addEventListener('fetch',this.handleFetch.bind(this));}},{key:"use",value:function use(callback){this.middlewares.push(callback);}},{key:"set",value:function set(key,value){switch(key){case"static":this.setStaticBehavior(value);break;case"views":if(!value.startsWith("/"))value="/"+value;break;case"view engine":if(value!=this.settings["view engine"])this.render=self[value]||this.render;break;default:break;}this.settings[key]=value;}},{key:"get",value:function get(key){return this.settings[key];}},{key:"cacheName",value:function cacheName(){return this.get("version")+"::"+this.get("name");}},{key:"server",value:function server(){console.log(this);}},{key:"setStaticBehavior",value:function setStaticBehavior(behavior){employee.Router.get(/\.(js|css|png|jpg|jpeg|gif|webm|webp|svg|map|html|xml|json|ico|woff|woff2|eot|ttf|otf|pdf)/,behavior);}},{key:"handleInstall",value:function handleInstall(event){var _this=this;event.waitUntil(caches.open(this.cacheName()).then(function(cache){return cache.addAll(_this.get("cache"));}));}},{key:"handleActivate",value:function handleActivate(event){var _this2=this;event.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(key){return!key.startsWith(_this2.get("version"));}).map(function(key){return caches.delete(key);}));}).then(function(){console.log('WORKER: activate completed.');}));}},{key:"handleFetch",value:function handleFetch(event){//base64 data
	if(event&&event.request.url.startsWith("data:"))return;var request=event.request.clone();var response=new _response2.default(this,event);request.settings=this.settings;var mws=[];//Render when forced or when the user is offline
	if(this.get('force render')||!navigator.onLine){mws=this.middlewares.concat(_router2.default.match(request));}else{mws=[_middlewares2.default.NetworkFirst];}var index=0;while(index<mws.length){if(typeof mws[index]=="function")mws[index](request,response);index++;}}}]);return employee;}();employee.DB=_db2.default;employee.Store=_store2.default;employee.Router=_router2.default;for(var name in _middlewares2.default){employee[name]=_middlewares2.default[name];}self.employee=employee;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _debug=__webpack_require__(2);var _debug2=_interopRequireDefault(_debug);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Router={routes:{}};Router.use=function(url,method,body,callbacks){var prepareURL=url;if(typeof prepareURL=="string"&&~prepareURL.indexOf(':')){prepareURL=Router.transform(prepareURL);}Router.routes[url]={originUrl:url,url:prepareURL,method:method,body:body,middlewares:callbacks};};Router.get=function(url){for(var _len=arguments.length,callbacks=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){callbacks[_key-1]=arguments[_key];}Router.use(url,'GET',null,callbacks);};Router.put=function(url,body){for(var _len2=arguments.length,callbacks=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){callbacks[_key2-2]=arguments[_key2];}Router.use(url,'PUT',body,callbacks);};Router.post=function(url,body){for(var _len3=arguments.length,callbacks=Array(_len3>2?_len3-2:0),_key3=2;_key3<_len3;_key3++){callbacks[_key3-2]=arguments[_key3];}Router.use(url,'POST',body,callbacks);};Router.delete=function(url,body){for(var _len4=arguments.length,callbacks=Array(_len4>2?_len4-2:0),_key4=2;_key4<_len4;_key4++){callbacks[_key4-2]=arguments[_key4];}Router.use(url,'DELETE',body,callbacks);};Router.transform=function(url){return new RegExp(url.replace(/(:[\w\n\S\s\t]*)/gi,'([\\w\\n\\S\\s]*)').replace(/\//g,'\\/')+"$");};Router.extract=function(req,url,route){var params={};var keys=typeof route.originUrl=="string"?route.originUrl.match(route.url):[];var values=url.pathname.match(route.url);for(var i=1;i<keys.length;i++){params[keys[i].replace(':','')]=values[i];}req.params=params;};Router.match=function match(req){var url=new URL(req.url);var middlewares=[];for(var key in Router.routes){if(Router.routes[key]&&Router.routes[key].method==req.method&&(Router.routes[key].url instanceof RegExp?Router.routes[key].url.test(url.pathname):Router.routes[key].url==url.pathname)){Router.extract(req,url,Router.routes[key]);middlewares=middlewares.concat(Router.routes[key].middlewares);}}return middlewares;};exports.default=Router;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Debug=function(){function Debug(){_classCallCheck(this,Debug);}_createClass(Debug,null,[{key:"log",value:function log(){for(var _len=arguments.length,message=Array(_len),_key=0;_key<_len;_key++){message[_key]=arguments[_key];}setTimeout(function(){var _console;(_console=console).log.apply(_console,message);},1000);}}]);return Debug;}();self.Debug=Debug;exports.default=Debug;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var responseSettings={};var res=function(){function res(app,event){var _this=this;_classCallCheck(this,res);this.app=app;this.event=event;this.statusCode=200;this['Content-Type']='text/html';this.start=this.prepare();this.event.respondWith(this.start);this.timeout=setTimeout(function(){_this.error();},app.get('timeout'));}_createClass(res,[{key:'prepare',value:function prepare(){var _this2=this;return new Promise(function(resolve,reject){_this2.endWell=resolve;_this2.endBad=reject;});}},{key:'send',value:function send(body){clearTimeout(this.timeout);this.done=true;return this.endWell(new Response(body,{status:this.statusCode,headers:this.headers||new Headers({'Content-Type':this['Content-Type']})}));}},{key:'error',value:function error(){this.statusCode=503;this.done=true;clearTimeout(this.timeout);return this.endBad(new Response("<h1>Service Unavailable</h1>",{status:this.statusCode,statusText:'Service Unavailable',headers:this.headers||new Headers({'Content-Type':this['Content-Type']})}));}},{key:'status',value:function status(code){this.statusCode=code;}},{key:'json',value:function json(body){this['Content-Type']='application/json';return this.send(body);}},{key:'render',value:function render(name){var _this3=this;var body=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];caches.match(this.app.get('views')+'/layout.html').then(function(response){return response.text();}).then(function(layout){caches.match(_this3.app.get('views')+'/'+name+'.html').then(function(response){_this3.headers=response.headers;_this3.headers.set("x-powered-by","Employee");return response.text();}).then(function(template){_this3.send(_this3.app.render(layout,template,body));});});}},{key:'network',value:function network(res){return this.endWell(res);}},{key:'cache',value:function cache(res){Debug.log(res);return this.endWell(res);}}],[{key:'set',value:function set(key,value){responseSettings[key]=value;}},{key:'get',value:function get(key,value){}}]);return res;}();exports.default=res;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true});/* IndexDB Service: DB */var noop=function noop(){};var DB={indexedDB:indexedDB||mozIndexedDB||webkitIndexedDB||msIndexedDB,request:null,db:null,name:null,stores:[]};DB.connect=function(name,stores,callback){if(!DB.indexedDB)console.log("Your browser doesn't support IndexedDB.");//Define part
	DB.name=name;DB.stores=stores;DB.ready=false;//If database is already initalized, don't need to wait
	if(DB.db)(callback||noop)({init:true});//Launch
	DB.request=DB.indexedDB.open(name,1);DB.request.onupgradeneeded=function(e){var db=e.target.result;var tmp_stores=[];for(var i=0;i<stores.length;i++){//Pour vérifier l'existance d'un Store et définir la "clé primaire"
	if(!db.objectStoreNames.contains(stores[i])){tmp_stores[i]=db.createObjectStore(stores[i],{keyPath:"_id"});}}};DB.request.onsuccess=function(e){DB.db=e.target.result;DB.ready=true;(callback||noop)({init:true});};DB.request.onerror=function(e){console.error(e);};};DB.delete=function(callback){DB.db.close();var req=DB.indexedDB.deleteDatabase(DB.db.name);req.onerror=function(e){console.log(e);};req.onsuccess=function(e){return(callback||noop)();};};DB.define=function(key,value){if(DB[key]!==undefined)DB[key]=value;};DB.contains=function(name){return DB.db.objectStoreNames.contains(name);};exports.default=DB;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _db=__webpack_require__(4);var _db2=_interopRequireDefault(_db);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var noop=function noop(){};/* IndexDB Service: Store */function Store(name){var self=this;this.name=name;this.actions={populate:[],sort:null,exec:null};["sort","populate","exec"].forEach(function(action){self[action]=function(thing){if(Array.isArray(self.actions[action]))self.actions[action].push(thing);else self.actions[action]=thing;return self;};});return this;}Store.require=function(name){var idx;for(var i=0;i<_db2.default.stores.length;i++){if(_db2.default.stores[i]==name)idx=i;}_db2.default.stores[idx]=new Store(name);return _db2.default.stores[idx];};Store.match=function(data,query){var entry=data,keys=query?Object.keys(query):[],pass=true;if(!query){return true;}//When _id query
	if(query._id&&keys.length==1){//If "$in"
	if(query._id['$in']){if(~query._id['$in'].indexOf(data._id))return true;}else if(data._id==query._id){return true;}}//Loop of verifications
	for(var key in query){if(!pass||!entry[key]||entry[key]!=query[key])pass=false;}return pass;};Store.prototype.save=function(data,callback){var transaction=_db2.default.db.transaction([this.name],"readwrite");var store=transaction.objectStore(this.name,{keyPath:"_id"});if(Array.isArray(data)){next();}else{store.put(data).onsuccess=function(){console.log('many insert');(callback||noop)();};}//Perform the add
	function next(){if(data.length>0){var entry=data.shift();store.put(entry).onsuccess=next;}else{// complete
	console.log('insert complete');(callback||noop)();}}};Store.prototype.find=function(query,fields,callback){var self=this;var res=[];//Before fetching the data
	if(typeof fields=='function'&&!callback){callback=fields;}var transaction=_db2.default.db.transaction([this.name],"readonly");var store=transaction.objectStore(this.name);//When all the data is fetch, return all
	transaction.oncomplete=function(e){(callback||self.doExec.bind(self)||noop)(res);};//Récursive fetch
	var req=store.openCursor();//Put every entry en res
	req.onsuccess=function(e){var cursor=e.target.result;if(cursor){if(query===null&&query==={}||Store.match(cursor.value,query)){res.push(cursor.value);}cursor.continue();}};return this;};Store.prototype.findOne=function(query,callback){var self=this;this.find(query,function(res){(callback||self.doExec.bind(self)||noop)(res[0]);});return this;};Store.prototype.findById=function(id,callback){var self=this;var transaction=_db2.default.db.transaction([this.name],"readonly");var store=transaction.objectStore(this.name);//Query from id key
	var request=store.get(id);request.onerror=function(event){// Handle errors!
	console.error("Such error");};request.onsuccess=function(event){(callback||self.doExec.bind(self)||noop)(request.result);};return this;};Store.prototype.update=function(query,data,callback){var transaction=_db2.default.db.transaction([this.name],"readwrite");var store=transaction.objectStore(this.name,{keyPath:"_id"});var keys=Object.keys(data);var res=[];//When all the data have been updated
	transaction.oncomplete=function(e){(callback||noop)(res.length==1?res[0]:res);};//Cursor
	store.openCursor().onsuccess=function(event){var cursor=event.target.result;if(cursor&&Store.match(cursor.value,query)){var entry=cursor.value;if(~keys.indexOf("$push")){var action=data["$push"];var key=Object.keys(action)[0];//pure update
	if(entry[key]&&Array.isArray(entry[key])){entry[key].push(action[key]);}//new key/value
	else{entry[key]=[action[key]];}}else if(~keys.indexOf("$pull")){var action=data["$pull"];var key=Object.keys(action)[0];//pure update
	if(entry[key]&&Array.isArray(entry[key])){var index=entry[key].indexOf(action[key]);if(~index){entry[key].splice(index,1);}}}else{//Merge the old and new data
	Object.assign(entry,data);}res.push(entry);//Perform the edit
	var request=store.put(entry);request.onerror=function(e){console.error("Very Error",e.target.error.name);};request.onsuccess=function(e){cursor.continue();};}};};Store.prototype.remove=function(id,callback){var transaction=_db2.default.db.transaction([this.name],"readwrite");var store=transaction.objectStore(this.name);var req=store.delete(id);req.onsuccess=function(e){console.log('such delete ! very effective');return(callback||noop)();};};Store.prototype.count=function(query,callback){this.find(query,function(res){return(callback||noop)(res.length);});return this;};Store.prototype.doPopulate=function(storeData,callback){var self=this;if(storeData===undefined)return callback(null);var field=self.actions.populate.shift();var ref=field;if(typeof field!=="string"){ref=field.ref;field=field.field;}var secondStore=Store.require(ref);if(Array.isArray(storeData)){storeData.forEach(function(store,index){var query={"$in":!Array.isArray(store[field])?[store[field]]:store[field]};secondStore.find({"_id":query},function(res){store[field]=!Array.isArray(store[field])&&res&&res[0]?res[0]:res;//last pass
	if(index==storeData.length-1)callback(storeData);});});}else{var query={"$in":!Array.isArray(storeData[field])?[storeData[field]]:storeData[field]};secondStore.find({"_id":query},function(res){storeData[field]=res;callback(storeData);});}};Store.prototype.doExec=function(data){if(!this.actions.exec)return;//Empty res
	if(Array.isArray(data)&&data.length===0||data===null){this.actions.exec(data);this.actions.exec=null;return;}var self=this;//If we need to sort the result before
	if(this.actions.sort){var key=this.actions.sort;data.sort(function(a,b){if(a[key]<b[key])return-1;if(a[key]>b[key])return 1;return 0;});}if(this.actions.populate.length>0){this.doPopulate(data,function(res){self.doExec(res);});}else{this.actions.exec(data);this.actions.exec=null;}};exports.default=Store;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true});var middlewares={NetworkFirst:function NetworkFirst(req,res){Debug.log("network",req);if(!navigator.onLine)return middlewares.CacheFirst(req,res);return fetch(req).then(function(response){var cacheCopy=response.clone();Debug.log(response);if(response.type!=="opaque"){caches.open(req.settings.version+"::"+req.settings.name).then(function add(cache){cache.put(req,cacheCopy);//send it to the cache
	});}return res?res.network(response):response;},function(){middlewares.unableToResolve(req,res);}).catch(function(){middlewares.unableToResolve(req,res);});},CacheFirst:function CacheFirst(req,res){Debug.log("cache",req);return caches.match(req).then(function(response){if(response)return res.cache(response);else return middlewares.NetworkFirst(req,res);}).catch(function(err){console.trace(err);return middlewares.NetworkFirst(req,res);});},unableToResolve:function unableToResolve(req,res){return res.error();}};exports.default=middlewares;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();//Innocent parser
	var test=new RegExp('\\${([a-zA-Z0-9_\.\(\)\+\-]+)}','g');var testInsert=new RegExp('#block\\s(.*)\\n?','mi');var testBlock=new RegExp('#block\\s(.*)\\n?([\\w\\n\\S\\s]*)#endblock','mi');var testIf=new RegExp('#if\\s(.*)\\n?([\\w\\n\\S\\s]*)#endif','mi');var testFor=new RegExp('#for\\s([a-z]+)\\s(in|of)\\s([a-z]+)\\n?([\\w\\n\\S\\s]*)#endfor','mi');var innocent=function innocent(layout,template,context){return innocent.step(innocent.sanitize(innocent.prepare(layout,template)),context);};innocent.prepare=function prepare(layout,template){var layoutInsert=testInsert.exec(layout);var templateBlock=testBlock.exec(template);var _layoutInsert=_slicedToArray(layoutInsert,2);var layoutOrigin=_layoutInsert[0];var layoutName=_layoutInsert[1];var _templateBlock=_slicedToArray(templateBlock,3);var templateOrigin=_templateBlock[0];var blockName=_templateBlock[1];var content=_templateBlock[2];if(layoutName==blockName){return layout.replace(layoutOrigin,content);}else{return layout.replace(layoutOrigin,"");}};innocent.step=function global(text,context){var matchs=text.match(test)||[];matchs.map(function(key){return key.replace('${','').replace('}','').trim();}).filter(function(key){return context.hasOwnProperty(key);}).forEach(function(key){text=text.replace('${'+key+'}',context[key]||'');});text=innocent.if(text,context);text=innocent.for(text,context);return text;};innocent.if=function(text,context){var cond=testIf.exec(text);if(!cond)return text;var _cond=_slicedToArray(cond,3);var original=_cond[0];var condition=_cond[1];var content=_cond[2];if(condition==condition.trim()&&!context.hasOwnProperty(condition))return text.replace(original,'');else return text.replace(original,content);};innocent.for=function(text,context){var loop=testFor.exec(text);if(!loop)return text;else if(loop&&loop.length<5)return text.replace(loop[0],'');var _loop=_slicedToArray(loop,5);var original=_loop[0];var item=_loop[1];var comparator=_loop[2];var array=_loop[3];var content=_loop[4];//no data
	if(!context.hasOwnProperty(array))return text.replace(original,'');//populate the template with the data
	var forText=context[array].map(function(item){return innocent.step(content,item instanceof Object?item:{item:item});}).join("\n");return text.replace(original,forText);};innocent.body=function body(text){return text.replace(/<html[\w\S\t\n\s]+<body>/,'').replace(/<\/body>\n?<\/html>/,'');};innocent.sanitize=function sanitize(text){return text.split(/\n/).map(function(line){return line.trim();}).filter(function(line){return line!='';}).join("\n");};self.innocent=innocent;exports.default=innocent;

/***/ }
/******/ ]);
//# sourceMappingURL=employee.bundle.js.map