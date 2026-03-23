const express = require("express");
const app = express();

app.use(express.static("public"));
app.use("/gallery", express.static("gallery"));

const users = [];

for (let i = 0; i < 20; i++) {
    users.push({
        firstname: "User" + i,
        lastname: "Lastname" + i,
        score: Math.floor(Math.random() * 100)
    });
}

app.get("/users", (req, res) => {
    let { sortBy, order } = req.query;

    const shuffled = [...users].sort(() => 0.5 - Math.random());
    let result = shuffled.slice(0, 10);

    if (sortBy) {
        result.sort((a, b) => {
            if (order === "desc") {
                return b[sortBy].localeCompare(a[sortBy]);
            } else {
                return a[sortBy].localeCompare(b[sortBy]);
            }
        });
    }

    setTimeout(() => {
        res.json(result);
    }, 1000);
});

app.get("/new-users", (req, res) => {
    res.json(users.slice(0, 5));
});

app.get("/gallery-list", (req, res) => {
    const fs = require("fs");
    const files = fs.readdirSync("./gallery");
    res.json(files);
});

app.get("/weather", (req, res) => {
    res.json({
        city: "Kyiv",
        temperature: Math.floor(Math.random() * 31)
    });
});

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});