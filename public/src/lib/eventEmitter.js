class EventEmitter {

    //Basic listener
    on(name, callback, context) {
        if(!this.events)
            this.events = {};

        if(!this.events[name])
            this.events[name] = [];

        this.events[name].push({
            callback: callback,
            context: context
        });
    }

    //Basic trigger
    emit(name, data) {
        if(!this.events || !this.events[name]) return;

        this.events[name].forEach((eventHandler, index) => {
            if(eventHandler.context)
                eventHandler.callback(data).bind(eventHandler.context);
            else
                eventHandler.callback(data);

            //If the event can only be trigger once
            if(eventHandler.unique) {
                this.events[name].splice(index, 1);
            }
        });
    }

    //Remove the event listener
    off(name, callback) {
        if(!this.events || !this.events[name]) return;

        //Case remove all
        if(!name && !callback) {
            this.events = {};
        }
        else if(!callback) {
            this.events[name] = [];
        }
        else {
            this.events[name].forEach((eventHandler, index) => {
                if(eventHandler.callback.toString() == callback.toString())
                    this.events[name].splice(index, 1);
            });
        }
    }

    //Can be trigger only once
    once(name, callback, context) {
        if(!this.events)
            this.events = {};

        if(!this.events[name])
            this.events[name] = [];

        this.events[name].push({
            callback: callback,
            context: context,
            unique: true
        });
    }

    //Listen for all of the instances of one object
    static listen(name, callback, context) {
        if(!this.broadcastEvents)
            this.broadcastEvents = {};

        if(!this.broadcastEvents[name])
            this.broadcastEvents[name] = [];

        this.broadcastEvents[name].push({
            callback: callback,
            context: context
        });
    }

    //Listen for all of the instances of one object
    static listenOnce(name, callback, context) {
        if(!this.broadcastEvents)
            this.broadcastEvents = {};

        if(!this.broadcastEvents[name])
            this.broadcastEvents[name] = [];

        this.broadcastEvents[name].push({
            callback: callback,
            context: context,
            unique: true
        });
    }

    //Trigger event for all of the instances of one object
    static broadcast(name, data) {
        if(!this.broadcastEvents || !this.broadcastEvents[name]) {
            return;
        }

        this.broadcastEvents[name].forEach((eventHandler, index) => {
            if(eventHandler.context)
                eventHandler.callback(data).bind(eventHandler.context);
            else
                eventHandler.callback(data);

            //If the event can only be trigger once
            if(eventHandler.unique) {
                this.broadcastEvents[name].splice(index, 1);
            }
        });
    }

    static unset(name, callback) {
        if(!this.broadcastEvents || !this.broadcastEvents[name]) return;

        //Case remove all
        if(!name && !callback) {
            this.broadcastEvents = {};
        }
        else if(!callback) {
            this.broadcastEvents[name] = [];
        }
        else {
            this.broadcastEvents[name].forEach((eventHandler, index) => {
                if(eventHandler.callback.toString() == callback.toString())
                    this.broadcastEvents[name].splice(index, 1);
            });
        }
    }

}

export default EventEmitter;