const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose
.connect("mongodb://localhost:27017/restapi", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded());
    
    var methodOverride = require('method-override')
    app.use(methodOverride('_method'));
    app.use("/rest", routes);

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });

async function getUsers() {
    let result = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
                getUsers {
                    amountOfHours
                    id
                    name
                }
            }
            `,
        }),
      })
    let users = await result.json();
    return users.data.getUsers;
}

async function fillTable() {
    let usersArray = await getUsers();

    console.log(usersArray);

    usersArray.forEach(user => {
        console.log(user);
        let table = document.getElementById("user-table");

        let row = table.insertRow(1);

        let name = row.insertCell(0);
        let amountOfHours = row.insertCell(1);

        name.innerHTML = user.name;
        amountOfHours.innerHTML = user.amountOfHours
    });
}

fillTable();



