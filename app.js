


const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const { send, nextTick } = require("process");
require("dotenv").config();
const path = require('path');
const app = express();

 
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('NodeJS server running on Shared Hosting\n');
// });

// server.listen(port, hostname, () => {
//   console.log('Server running at http://${hostname}:${port}/');
// var port = process.env.PORT || 3000,
//     http = require('http'),
//     fs = require('fs'),
//     html = fs.readFileSync('/public/index.html');

// var log = function(entry) {
//     fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
// };

// var server = http.createServer(function (req, res) {
//     if (req.method === 'POST') {
//         var body = '';

//         req.on('data', function(chunk) {
//             body += chunk;
//         });

//         req.on('end', function() {
//             if (req.url === '/') {
//                 log('Received message: ' + body);
//             } else if (req.url = '/scheduled') {
//                 log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
//             }

//             res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
//             res.end();
//         });
//     } else {
//         res.writeHead(200);
//         res.write(html);
//         res.end();
//     }
// });

// Listen on port 3000, IP defaults to 127.0.0.1
// server.listen(port);

// Put a friendly message on the terminal
// console.log('Server running at http://127.0.0.1:' + port + '/');

// });

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //replace with your email provider
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  }); 

 

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

  