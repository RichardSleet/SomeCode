function type(any) {
    if (typeof any === 'undefined') {
        console.log(1)
        return typeof any;
    }
    if (any === null) {
        console.log(2)
        return 'null';
    }
    return any.constructor.name.toString();
}
console.log(type('123'));
console.log(type(123));
console.log(type(() => { }));
console.log(type(true));
console.log(type(undefined));
console.log(type(null));
console.log(type([]));