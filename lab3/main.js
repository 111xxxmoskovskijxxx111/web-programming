// ================= 1 =================
// invokeAfterDelay

function invokeAfterDelay(fn, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fn());
        }, delay);
    });
}

// Демонстрація (випадкове число 0–10)
invokeAfterDelay(() => Math.floor(Math.random() * 11), 1000)
    .then(result => {
        console.log("1:", result);
    });


// ================= 2 =================
// produceRandomAfterDelay

function produceRandomAfterDelay(delay) {
    return invokeAfterDelay(() => Math.floor(Math.random() * 11), delay);
}

Promise.all([
    produceRandomAfterDelay(1000),
    produceRandomAfterDelay(1500)
]).then(([num1, num2]) => {
    console.log("2: Sum =", num1 + num2);
});


// ================= 3 =================
// sleep

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testSleep() {
    console.log("3: Waiting 1 second...");
    await sleep(1000);
    console.log("3: Done!");
}
testSleep();


// ================= 4 =================
// getUser

const users = [
    { id: 0, name: "Dima", age: 20, city: "Kyiv" },
    { id: 1, name: "Anna", age: 22, city: "Lviv" },
    { id: 2, name: "Oleh", age: 25, city: "Odessa" },
    { id: 3, name: "Maria", age: 19, city: "Kharkiv" }
];

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id === id);
            if (user) {
                resolve(user);
            } else {
                reject("User not found");
            }
        }, 1000);
    });
}


// ================= 5 =================
// loadUsers

function loadUsers(ids) {
    return Promise.all(
        ids.map(id =>
            getUser(id).catch(error => {
                console.log("Error:", error);
                return null; // щоб Promise.all не впав
            })
        )
    );
}

loadUsers([0, 1, 5]).then(result => {
    console.log("5:", result);
});


// ================= 6 =================
// logCall

function logCall(callback) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const time = new Date().toLocaleTimeString();
            console.log("6: Time:", time);
            callback();
            resolve();
        }, 1000);
    });
}

// 4 послідовних виклики
logCall(() => console.log("Call 1"))
    .then(() => logCall(() => console.log("Call 2")))
    .then(() => logCall(() => console.log("Call 3")))
    .then(() => logCall(() => console.log("Call 4")));


// ================= 7 =================
// showUsers

async function showUsers(ids) {
    console.log("7: loading");

    try {
        const result = await loadUsers(ids);
        console.log("Users:", result);
    } catch (error) {
        console.log("Error:", error);
    } finally {
        console.log("7: loading finished");
    }
}

showUsers([0, 2, 10]);
