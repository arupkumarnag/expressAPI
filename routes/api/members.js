//To make the ex[res router work, we have to do a couple of things.

const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');   //Bringing in the "Members.js" to render the JSON Arrays. We have to go outside the folder.


//This Gets All Members. [We are using Postman to make the get request]. When we use Express Router we handle it with "router."
//Since we have the route "api/members" in index.js, We dont need them in the members.js file. So we just replace them with a '/'.

router.get('/', (req, res) => {   //This route will fetch the JSON Array. "/api/members" is the get req. We will use this with Postman.
res.json(members);              //We put res.json to render JSON file. We dont have to use stringify becoz they are JS Obects.
});

//Get Single Member
//We want to get the member with their ID.
//We will aslo pass a message if the user with the given ID does not exist.

router.get('/:id', (req, res) => {         // ':id' is a url parameter. We can use req parameter to get whatever is in there.
    const found = members.some(member => member.id === parseInt(req.params.id));    //9. We are checking if the mem ID matches or not. True or False.

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id))); //We will use the filter method. This will take an Array and filter                                                                                out based on a condition.
    } else {
        res.status(400).json({ msg: `No member found with the id ${req.params.id}` });     //This will give error msg 400 (bad request) if mem not found.
    }          
});

//Creating Member: (Here we will do a Post Req).
//-'/' becoz we want to hit the "/api/members". We can use it here becoz we are using differnt HTTP Methods (get, post). We can use the same routes as long as long as they are different methods.
//Usually wehen we are dealing with IDs and using a database lile MongoDb, MySQL, Postgres, they usually creates an ID for us but we are not using a database so we will need to install "uuid" which will generate a Random ID for us. 

router.post('/', (req, res) => {    //"http://localhost:5000/api/members" and send some data.
    const newMember = {             //We will set this to be an Object.
        id: uuid.v4(),              //This will generate a uniqe random universal ID. uuid.v4 is a method.
        name: req.body.name,        //we get name from req.body.name.                          
        email: req.body.email,       //We are sending the email to the req.body.name as well.
        status: 'active'           //Thestatus will remain active whenever a new member is created. 
    } 

    //Now we want to add this new member to the Array however we want to make sure that the name and the email are sent with the request.
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    members.push(newMember);        //We are taking the newMember and pushing it to the Array to get added. However we need to send back a response.
    res.json(members);       //This is the response we put here. We can do any response we want. Commented out to redirect the JSON.
    //res.redirect('/');      //This will redirect us to the same page of the browser. Redirected from res.json   
});

//Update Member: [When we update something on the server, its going to be a Put Request. ]
//NOTE: If we are using a database or intend to use one, the entire stuff below will be different and we have to change the below things. Thats it.


router.put('/:id', (req, res) => {         // ':id' is a url parameter. We can use req parameter to get whatever is in there.
    const found = members.some(member => member.id === parseInt(req.params.id));    //9. We are checking if the mem ID matches or not. True or False.

    if(found) {
        const updMember = req.body;     //We will get the email and the name from the req.body.
        members.forEach(member => {     //forEach loop. We will loop through the members to check if its present in the DB that we want to update.
            if(member.id ==parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member Updated', member});
            }
        });        

    } else {
        res.status(400).json({ msg: `No member found with the id ${req.params.id}` });     //This will give error msg 400 (bad request) if mem not found.
    }          
});

//Delete Member: THis will be a delete request.

router.delete('/:id', (req, res) => {         // ':id' is a url parameter. We can use req parameter to get whatever is in there.
    const found = members.some(member => member.id === parseInt(req.params.id));    //9. We are checking if the mem ID matches or not. True or False.

//We will use the filter method. This will take an Array and filter out based on a condition. We will filter out with ID.    
    if(found) {
        res.json({ msg: 'Member Deleted', members: members.filter(member => member.id !== parseInt(req.params.id))}); 
    } else {
        res.status(400).json({ msg: `No member found with the id ${req.params.id}` });     //This will give error msg 400 (bad request) if mem not found.
    }          
});

module.exports = router;