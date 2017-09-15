// require makeDate
var makeDate = require('../scripts/date');

// connect Note model
var Note = require('../models/Note');

module.exports = {
	// find notes for specific headline
	get: function(data, cb){
		Note.find({
			_headlineId: data._id
		}, cb);
	},
	save: function(data, cb){
		// create new note
		var newNote = {
			_healdineId: data._id,
			date: makeDate(),
			noteText: data.noteText
		};

		// add new note to Note database
		Note.create(newNote, function(err, doc){
			if(err){
				console.log(err);
			} else {
				console.log(doc);
				cb(doc);
			}
		});
	},
	delete: function(data, cb){
		Note.remove({
			_id: data._id
		}, cb);
	}
};