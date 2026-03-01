// ================= 1 =================
function average(...numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

console.log("1:", average(2, 4, 6, 8));


// ================= 2 =================
function values(f, low, high) {
    const result = [];
    for (let i = low; i <= high; i++) {
        result.push(f(i));
    }
    return result;
}

console.log("2:", values(x => x * x, 1, 5));


// ================= 3 =================
function callWithContext(obj, callback) {
    callback.call(obj);
}

const person = {
    name: "Dima",
    age: 20
};

function поздравлення() {
    const date = new Date().toDateString();
    console.log(`Today is ${date}! Happy birthday ${this.name}`);
}

callWithContext(person, поздравлення);


// ================= 4 =================
function createCounter() {
    let value = 0;

    return {
        increment() {
            value++;
        },
        getValue() {
            return value;
        }
    };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log("4:", counter.getValue());


// ================= 5 =================
function getGreeting() {
    let lastName = null;
    let lastResult = null;

    return function(name) {
        if (name === lastName) {
            console.log("Returning cached value...");
            return lastResult;
        }

        lastName = name;
        lastResult = `Hello ${name}`;
        return lastResult;
    };
}

const greet = getGreeting();
console.log("5:", greet("Dima"));
console.log("5:", greet("Dima")); // кеш


// ================= 6 =================
function sum(a) {
    return function(b) {
        return a + b;
    };
}

console.log("6:", sum(5)(10));
console.log("6:", sum(3)(7));


// ================= 7 =================
function createChecker(array) {
    return function(text) {
        return array.includes(text);
    };
}

const checkWord = createChecker(["apple", "banana", "orange"]);
console.log("7:", checkWord("banana"));
console.log("7:", checkWord("grape"));


// ================= 8 =================
const users = [
    { name: "dima", age: 20 },
    { name: "anna", age: 22 }
];

const updatedUsers = users.map(user => ({
    ...user,
    name: user.name.charAt(0).toUpperCase() + user.name.slice(1)
}));

console.log("8:", updatedUsers);


// ================= 9 =================
function introduce(city, country) {
    console.log(`I am ${this.name} from ${city}, ${country}`);
}

const user = { name: "Dima" };

introduce.call(user, "Kyiv", "Ukraine");
introduce.apply(user, ["Lviv", "Ukraine"]);

const boundFunction = introduce.bind(user, "Odessa", "Ukraine");
boundFunction();


// ================= 10 =================
function logExecution(callback, ...args) {
    const time = new Date();
    console.log("Function name:", callback.name);
    console.log("Arguments:", args);
    console.log("Time:", time.toLocaleString());

    return callback(...args);
}

function multiply(a, b) {
    return a * b;
}

console.log("10:", logExecution(multiply, 3, 4));


// ================= 11 =================
function cacheFor10Seconds(fn) {
    let lastArgs = null;
    let lastResult = null;
    let lastTime = 0;

    return function(...args) {
        const now = Date.now();

        if (
            lastArgs &&
            JSON.stringify(args) === JSON.stringify(lastArgs) &&
            now - lastTime < 10000
        ) {
            console.log("Returning cached value (10 sec)");
            return lastResult;
        }

        lastArgs = args;
        lastTime = now;
        lastResult = fn(...args);
        return lastResult;
    };
}

function add(a, b) {
    return a + b;
}

const cachedAdd = cacheFor10Seconds(add);

console.log("11:", cachedAdd(2, 3));
setTimeout(() => {
    console.log("11:", cachedAdd(2, 3));
}, 2000);