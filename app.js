const bodyParser = require("body-parser")
const express = require("express")
const request = require("request")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const LastName = req.body.lName;
  const email = req.body.email;


  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        Fname: firstName,
        Lname: LastName,
      }
    }]
  }
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/a5b76c2c87";
  const option = {
    method: "post",
    auth: "saud:faf5ec5568f661d633455c35c2fec3d7-us14"

  }
  const request = https.request(url,option,function(response){
     if (response.statusCode === 200)
     {
       res.sendFile(__dirname + "/success.html")
     }
     else {
       res.sendFile(__dirname + "/failure.html")
     }
     response.on("data",function(data){
       console.log(JSON.parse(data))
     })

  })

  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/")

})

app.listen(process.env.PORT || 3000, function() {
  console.log("server is up and running");
})



// apikey = "faf5ec5568f661d633455c35c2fec3d7-us14"
//listid = "a5b76c2c87"
