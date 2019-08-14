const express = require('express');
const layout = require('express-ejs-layouts');
const methodOverride = require('method-override');


//instantiate the express app
const app = express();

//middleware
app.set('view engine', 'ejs');
//Body parser middleware that puts the form data into req.body
app.use(express.urlencoded({extended: false}));
//method override middleware intercepts incoming POST requests
//and if they have _method=PUT  or DELETE in the query string
//It'll handle it as the respective HTTP verb
app.use(methodOverride('_method'));



//controller route
app.use('/dinosaurs', require('./controllers/dinosaurs'));
app.use('/cryptids', require('./controllers/cryptids'))

//add in routes
app.get('/', (req, res) => {
	res.render('home');
})

app.get('*', (req, res) => {
	res.render('404');
})





//listen on a port
app.listen(3000, () => {
	console.log("server is live at 3000");
});