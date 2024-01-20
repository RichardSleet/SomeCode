import { join } from "lodash-es";
import { logB } from "../components";

var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
];
console.log("entry A", join(['a', 'b'], '-'));
logB();
