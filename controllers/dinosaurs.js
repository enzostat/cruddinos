const fs = require('fs');
const router = require('express').Router();

router.get('/', (req, res) => {
	//get data from file
	const dinosaurs = fs.readFileSync(__dirname +"/../dinosaurs.json");
	//parse the json object from that data
	const dinoData = JSON.parse(dinosaurs);
	// console.log(dinoData);
	res.render('dinosaurs/index', {
		myDinos: dinoData
	});
})

router.post('/', (req, res) => {
	//read dinosaurs file
	var dinosaurs = fs.readFileSync(__dirname +"/../dinosaurs.json");
	var dinoData = JSON.parse(dinosaurs);

	//add to the dinosaurs array
	dinoData.push(req.body);

	//save dinosaurs to the dinosaurs.json file
	fs.writeFileSync(__dirname +"/../dinosaurs.json", JSON.stringify(dinoData));


	res.redirect("/dinosaurs");
})

router.get('/new', (req, res) => {
	res.render('dinosaurs/new');
})

router.get('/:idx', (req, res) =>{
	const dinosaurs = fs.readFileSync(__dirname +"/../dinosaurs.json");
	const dinoData = JSON.parse(dinosaurs);
	//get the idx value from the params
	var dinoIndex = parseInt(req.params.idx);
	res.render('dinosaurs/show', {
		myDino: dinoData[dinoIndex]
	})
})




module.exports = router;