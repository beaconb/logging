var mongoose = require('mongoose');  
var Log  = mongoose.model('Log');

//GET - Return all logs in the DB
exports.findAllLogs = function(req, res) {  
    Log.find(function(err, logs) {
    if(err) res.send(500, err.message);

    console.log('GET /logs')
        res.status(200).jsonp(logs);
    });
};
exports.findById = function(req, res) {  
    Log.findById(req.params.id, function(err, log) {
    if(err) return res.send(500,err.message);

    console.log('GET /log/' + req.params.id);
        res.status(200).jsonp(log);
    });
};
exports.addLog = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var log = new Log({
		TransactionID : req.body.TransactionID,
		ServerID : req.body.ServerID,
		Resource : req.body.Resource,
		StepName : req.body.StepName,
		Direction : req.body.Direction,
		Timestamp : req.body.Timestamp,
		Headers : req.body.Headers,
		Body : req.body.Body
    });

    log.save(function(err, log) {
        if(err) return res.status(500).send(err.message);
    res.status(200).jsonp(log);
    });
};
exports.updateLog = function(req, res) {  
    Log.findById(req.params.id, function(err, log) {
        log.TransactionID = req.body.TransactionID;
		log.ServerID = req.body.ServerID;
		log.Resource = req.body.Resource;
		log.StepName = req.body.StepName;
		log.Direction = req.body.Direction;
		log.Timestamp = req.body.Timestamp;
		log.Headers = req.body.Headers;
		log.Body = req.body.Body;

        log.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(log);
        });
    });
};
exports.deleteLog = function(req, res) {  
    Log.findById(req.params.id, function(err, log) {
        log.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};