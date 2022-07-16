var express = require('express');
var app = express()

const Ajv = require('ajv');
const ajv = new Ajv();
const Rabbit = require("./model/rabbitMQ");
const Firebase = require("./model/firebase");
const DB = require('./model/db')
DB.connection.query("show tables", function(error, results, fields) {
  if (error) {
      console.log(error);
  }
  console.log(results);
})
Rabbit.init();
//recive data 
Rabbit.subscribe.on("data", async (note) => {
  const messageSchema = {
    type: "object",
    properties: {
      identifier: { type: "string" },
      type: { type: "string" },
      deviceId: { type: "string" },
      text: {type: "string"}
    },
    required: ["identifier", "type", "deviceId", "text"],
  };
  //form validate
  check = ajv.validate(messageSchema, JSON.parse(note));
  if (!check) {
    console.log(ajv.errors);
  } else {
    try {
      const {identifier, type, deviceId, text} = JSON.parse(note)

      await Firebase.sendFCM(text, deviceId);

      let job = {identifier, deliverAt: new Date().toJSON().replace('T', ' ').slice(0,-1)};
      await DB.addJob(job.identifier, job.deliverAt);

      Rabbit.publish.write(JSON.stringify(job), "utf8");
    } catch (error) {
      console.log(error);
    }
  }
})

// for simluate post queue
app.use(express.json())

app.post('/sendFCM', async (req, res) => {
  console.log(req.body)
  Rabbit.pub_fcm.write(JSON.stringify(req.body));
  res.send(JSON.stringify(req.body))
})

app.listen(3000)