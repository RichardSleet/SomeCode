class EventEmitter {
    constructor(){
        this.obj = {};
        this.listener = [];
    }
    on (eventName, callback) {
        if (typeof callback !== 'function') throw new TypeError('Function!')
        if (!this.obj[eventName]) this.obj[eventName] = [];
        this.obj[eventName].push(callback);
    }
    emit (eventName) {
        var eventName = Array.prototype.shift.call( arguments );
        if (this.obj[eventName]) {
            this.obj[eventName].forEach((callback) => {
                callback.apply(this, arguments);
            });
        }
    }
    off (eventName, callback) {
        if( this.obj[eventName] ){
            this.obj[eventName].splice(this.obj[eventName].indexOf(callback), 1);
            return true;
        }
        return false;
    }
}
const emitter = new EventEmitter()
const sayHi = (name) => console.log(`Hello ${name}`)
const sayHi2 = (name) => console.log(`Good night, ${name}`)

emitter.on('hi', sayHi)
emitter.on('hi', sayHi2)
emitter.emit('hi', 'ScriptOJ')
// => Hello ScriptOJ
// => Good night, ScriptOJ

emitter.off('hi', sayHi)
emitter.emit('hi', 'ScriptOJ')
// => Good night, ScriptOJ

const emitter2 = new EventEmitter()
emitter2.on('hi', (name, age) => {
  console.log(`I am ${name}, and I am ${age} years old`)
})
emitter2.emit('hi', 'Jerry', 12)

