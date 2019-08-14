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
	//read dinosaurs file
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
	var cryptidIndex = parseInt(req.params.idx);
	res.render('cryptids/show', {
		myCryptid: cryptidData[cryptidIndex]
	})
})

module.exports = router;