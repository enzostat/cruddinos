const fs = require('fs');
const router = require('express').Router();



router.get('/', (req, res) => {
	const cryptids = fs.readFileSync(__dirname +"/../cryptids.json");
	//parse the json object from that data
	const cryptidData = JSON.parse(cryptids);
	// console.log(dinoData);
	res.render('cryptids/index', {
		myCryptids: cryptidData
	});
})

router.post('/', (req, res) => {
	//read cryptids file
	var cryptids = fs.readFileSync(__dirname +"/../cryptids.json");
	var cryptidData = JSON.parse(cryptids);

	//add to the dinosaurs array
	cryptidData.push(req.body);

	//save dinosaurs to the dinosaurs.json file
	fs.writeFileSync(__dirname +"/../cryptids.json", JSON.stringify(cryptidData));


	res.redirect("/cryptids");
})

router.get('/new', (req, res) => {
	res.render('cryptids/new');
})

router.get('/:idx', (req, res) =>{
	const cryptids = fs.readFileSync(__dirname +"/../cryptids.json");
	const cryptidData = JSON.parse(cryptids);
	//get the idx value from the params
	var cryptidIndex = parseInt(req.params.idx) || 0;
	res.render('cryptids/show', {
		myCryptid: cryptidData[cryptidIndex]
	})
})


//DELETE route that removes cryptids from the DB
router.delete('/:idx', (req,res) => {
	var cryptidData = fs.readFileSync(__dirname +"/../cryptids.json");
	var cryptidJSON = JSON.parse(cryptidData);
	var idx = req.params.idx;

	//splice out that ONE cryptid
	cryptidJSON.splice(idx, 1);
	//write back to fs
	fs.writeFileSync(__dirname +"/../cryptids.json", JSON.stringify(cryptidJSON));

	//redirect to same page, to hit the get all route
	res.redirect('/cryptids');
})

//get the edit form for a particular cryptidd
router.get('/:id/edit', (req,res) => {

	var cryptidData = fs.readFileSync(__dirname +"/../cryptids.json");
	var cryptidJSON = JSON.parse(cryptidData);
	var cryptid = cryptidJSON[req.params.id];

	res.render('cryptids/edit', {
		cryptidId: req.params.id,
		cryptid: cryptid
	});
})

//UPDATE route that mutates one of the items in the DB
router.put('/:idx', (req,res) => {
	var cryptidData = fs.readFileSync(__dirname +"/../cryptids.json");
	var cryptidJSON = JSON.parse(cryptidData);


	//get the particular cryptid we want to edit
	//then change the data inside it to the contents of the form input

	cryptidJSON[req.params.idx].name = req.body.name;
	cryptidJSON[req.params.idx].img_url = req.body.img_url;

	fs.writeFileSync(__dirname +"/../cryptids.json", JSON.stringify(cryptidJSON));
	res.redirect('/cryptids');

})



module.exports = router;

















