const dbRef = require('../db/firebaseRealtimeDB.js').dbRef;

//for adding new guests to the event being edited
const createAnonUsers = require('./userController.js').createAnonUsers;
const createGuestEmailUser = require('./userController.js').createGuestEmailUser;

//Targets all entries in DB under events tree
const EventsRef = dbRef.child('events');

//pulls in the sent object that's assigned values from the edit event form component
//this function queries the DB for the event by its name, then sets new values to it
exports.editEvent = function(req, res) {
	Promise.all([
		EventsRef.update(req.sendObj)
		])
	.then(editedEvent => {
	 console.log('successfully changed event in DB')
	 res.end()
	})
	.catch((err) => console.log('error in logging to DB : ' + err))
}