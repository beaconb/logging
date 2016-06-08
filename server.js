var express = require("express")  
    app = express(),
    http     = require("http"),
    server   = http.createServer(app),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
	port  	 = process.env.PORT || 7777;

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

mongoose.connect('mongodb://localhost/proves', function(err, res) {  
  	if(err) {
    	console.log('ERROR: connecting to Database. ' + err);
  	}
});
require('./model/log');
var LogCtrl = require('./controllers/logController');
var router = express.Router();

router.route('/logs').get(LogCtrl.findAllLogs).post(LogCtrl.addLog);
router.route('/logs/:id').get(LogCtrl.findById).put(LogCtrl.updateLog).delete(LogCtrl.deleteLog);


/*
router.get('/', function(req, res) {  
   res.send("Hello World!");
});
*/
app.use('/api',router);

app.listen(port, function() {  
  	console.log("Node server running on http://localhost:7777");
	});