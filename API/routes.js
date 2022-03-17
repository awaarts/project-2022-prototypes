const express = require("express");
const User = require("./rest/models/User");
const router = express.Router();

router.get("/users", async (req, res) => {
	const users = await User.find();
	res.send(users);
});

router.post("/users", async (req, res) => {
    console.log("name: " + req.body.name);
	const user = new User({
		name: req.body.name,
		hoursWorked: req.body.hoursWorked,
	});
	await user.save();
	res.send(user);
});

router.get("/users/:id", async (req, res) => {
	try {
        const user = await User.findOne({ _id: req.params.id });
	    res.send(user);
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
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "User doesn't exist!" });
	}
});

module.exports = router;