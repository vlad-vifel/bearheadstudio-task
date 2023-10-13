class EventEmitter {
    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {
        if (!(event in this.events)) {
            this.events[event] = [callback];
        } else {
            this.events[event].push(callback);
        }
        return this;
    }

    unsubscribe(event, callback) {
        if (event in this.events) {
            this.events[event] = this.events[event].filter(x => x !== callback);
            if (this.events[event].length === 0) {
                delete this.events[event];
            }
        }
        return this;
    }

    emit(event) {
        if (event in this.events) {
            this.events[event].forEach(item => item());
        }
        return this;
    }

}

const eventEmitter = new EventEmitter();

function f1() {
    console.log('hello');
}

function f2() {
    console.log('world');
}

function f3() {
    console.log('some output');
}
eventEmitter.subscribe('event1', f1).subscribe('event1', f2).subscribe('event2', f3).emit('event1'); // вывод: hello, world
eventEmitter.emit('event2'); // вывод: some output
eventEmitter.unsubscribe('event1', f1).emit('event1'); // вывод: world
