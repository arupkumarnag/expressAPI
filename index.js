const express = require('express');
const path = require('path');   
const exphbs = require('express-handlebars');   
const logger = require('./middleware/logger');  
const members = require('./Members');

const app = express();   

 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');       //here we are setting the view engine.

//Body Parser Middleware.
app.use(express.json());    //This inbuilt with Express New Ver. This allows us to handle Raw Json.
app.use(express.urlencoded({extended: false}));  //To Handle form Submission. we pass in an object "extended" and set it to "false".

//Homepage Route: index.handlebars.
app.get('/', (req, res) => res.render('index', {    
    title: 'Member App',                             
    members
}));    

//Set a Static Folder. This below will change out public folder to static folder. 

app.use(express.static(path.join(__dirname, 'public')));   

//Members API Routes.

app.use('/api/members', require('./routes/api/members'));  //We put the parent route, requiring that file that we just created. 

const PORT = process.env.PORT || 5000;                           
                                        

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));  