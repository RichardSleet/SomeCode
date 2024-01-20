function type(any) {
    if (typeof any === 'undefined') {
        return typeof any;
    }
    if (any === null) {
        return 'null';
    }
    if (Array.isArray(any)) {
        return 'array';
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