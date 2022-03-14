

const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const { send, nextTick } = require("process");
require("dotenv").config();
const path = require('path');
const http = require('http'); 


const app = express();


app.use(express.static(path.join(__dirname, 'public')));

//make the contact page the the first page on the app
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});


app.get("/volunteer", function (req, res,html) {
  res.sendFile(process.cwd() + "/public/views/volunteer.html");
});

app.get("/vendor", function (req, res,html) {
  res.sendFile(process.cwd() + "/public/views/vendor.html");
});

app.get("/itinerary", function (req, res,html) {
  res.sendFile(process.cwd() + "/public/views/itinerary.html");
});


app.post("/send", (req, res) => {
    res.sendFile(process.cwd() + "/public/views/send.html");
    //1.
    let form = new multiparty.Form();
    let data = {

    };
    form.parse(req, function (err, fields) {
      console.log(fields);
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
  
      //2. You can configure the object however you want
      const mail = {
        group: data.patrons,
        from: data.email,
        fname: data.fname,
        lname: data.lname,
        to: process.env.EMAIL,
        subject: data.subject,
        text: `Patron: ${data.patrons} \n${data.fname}  ${data.lname} <${data.email}> \n\n${data.message}`
      };
  
      //3.
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } else {
          res.status(200).send("Email successfully sent to recipient!");
        }
      });
    });
  });


//port will be 5000 for testing
const PORT = process.env.PORT || 5000;

// app.use("/public/css",function(req, res){

// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
 
});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //replace with your email provider
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  }); 

  



