import { join } from "lodas-es";
import { logA } from "../components";

var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
];
console.log("entry A", join(['a', 'b'], '-'));
logA();
