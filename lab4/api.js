const users = [];

for (let i = 0; i < 20; i++) {
    users.push({
        firstname: "User" + i,
        lastname: "Lastname" + i,
        score: Math.floor(Math.random() * 100)
    });
}

function fetchUsers() {
    return new Promise(resolve => {
        setTimeout(() => {
            const shuffled = [...users].sort(() => 0.5 - Math.random());
            resolve(shuffled.slice(0, 10));
        }, 1000);
    });
}

function getNewUsers() {
    return users.slice(0, 5);
}