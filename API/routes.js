const express = require("express");
const User = require("./rest/models/User");
const router = express.Router();

router.get("/users", async (req, res) => {
	const users = await User.find();

  var html = "<h1>Rest API</h1><table> <tr> <th>Naam</th> <th>Gewerkte uren</th> </tr>";
  
  for(let i = 0; i < users.length; i++) {
    html += "<tr> <td><a href='/rest/users/" + users[i]._id + "'>" + users[i].name + "</a></td> \
    <td>" + users[i].hoursWorked + "</td> \
    <td><form action='/rest/users/" + users[i]._id + "?_method=DELETE' method='post'> \
    <input type='submit' value='Verwijderen'> \
    </form></td></tr>";
  }

  html += "</table>";

  html += "<h3>Uren toevoegen</h3><form action='/rest/users' method='post'> \
    <label for='name'>Naam:</label> \
    <input type='text' id='name' name='name'><br><br> \
    <label for='hoursWorked'>Gewerkte uren:</label> \
    <input type='text' id='hoursWorked' name='hoursWorked'><br><br> \
    <input type='submit' value='Verzenden'> \
  </form>"
  res.send(html);
});

router.post("/users", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
	
  const user = new User({
		name: req.body.name != '' ? req.body.name : 'Nieuwe gebruiker',
		hoursWorked: req.body.hoursWorked ? req.body.hoursWorked : 0,
	});
	
  await user.save();
	res.redirect("/rest/users");
});

router.get("/users/:id", async (req, res) => {
	try {
        const user = await User.findOne({ _id: req.params.id });
        var html = "<h1>Rest API</h1><table> <tr> <th>Naam</th> <th>Gewerkte uren</th> </tr>";
  
        html += "<tr> <td>" + user.name + "</td><td>" + user.hoursWorked + "</td></tr>";

        html += "</table>";
        res.send(html);
    } 
    catch 
    {
        res.status(404);
        res.send({error: "User doesnt exist!"});
    }
});


router.patch("/users/:id", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
  
      if (req.body.name) {
        user.name = req.body.name;
      }
  
      if (req.body.hoursWorked) {
        user.hoursWorked = req.body.hoursWorked;
      }
  
      await user.save();
      res.send(user);
    } catch {
      res.status(404);
      res.send({ error: "User doesn't exist!" });
    }
  });

router.delete("/users/:id", async (req, res) => {
	try {
		await User.deleteOne({ _id: req.params.id });
		res.status(204).redirect("/rest/users");
	} catch {
		res.status(404);
		res.send({ error: "User doesn't exist!" });
	}
});

module.exports = router;