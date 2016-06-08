var mongoose = require('mongoose'),  
Schema   = mongoose.Schema;

var logSchema = new Schema({  
 	TransactionID: { type: String},
	ServerID: { type: String},
	Resource: { type: String},
	StepName: { type: String},
	Direction: { type: String},
	Timestamp: { type: String},
	Headers: { type: String},
	Body: { type: String}
});

module.exports = mongoose.model('Log', logSchema);  