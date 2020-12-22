//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed" ,
                merge_fields: {
                    FNAME: firstName ,
                    LNAME: lastName 
                }
            }
        ]
    };

   var jsonData =  JSON.stringify(data);

    var options = {

        url: "https://us7.api.mailchimp.com/3.0/lists/34edf85827",
        method: "POST",
        headers: {
            "Authorization" : "kevinbundo 265bd6654b0d7e019b38817641d30d7d-us7"
        },
        body: jsonData
    }
    request(options, function(error, response, body){
        if(error){
            console.log(error);
        }
        else{
            console.log(response.statusCode);
        }

    });

})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

//API KEY
//265bd6654b0d7e019b38817641d30d7d-us7

//List ID
//34edf85827