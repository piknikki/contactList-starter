var db = require("../models");

module.exports = function(app) {
    // this route should find all contacts in the table and display them as JSON
    app.get("/api/contacts", function(req, res) {
        db.Contact.findAll({
            // order by last name and then first name
        })
            .then(function(contacts) {
                res.json(contacts);
            });
    });

    // this route should add a new contact to the table
	app.post("/api/contacts", function(req, res) {
	    // object destructuring to create variables
	    var { firstName, lastName, contactType, phoneNumber, emailAddress } = req.body;

	    // this only works if the names are the same
	    var newContact = {
	        firstName,
            lastName,
            contactType,
            phoneNumber,
            emailAddress
        }

        // console.log("original:  ", newContact)

        // this is what we want to save in the table
        db.Contact.create(newContact)

            .then(function(contact) {
                // console.log("Post post:  ", contact);
                console.log(`Added contact ${firstName} ${lastName}`)
                res.json({
                    id: contact.id
                });
            });

	    // need an ending to stop the cycle
    });

    // this route should delete a contact from the table, if the id matches the ':id' url param
	app.delete("/api/contacts/:id", function(req, res) {
        
    });
}