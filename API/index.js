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



