a simple simulate project
using RabbitMQ, Firebase, MySQL and Node
the Express is for simulate Rabbit publish situation

Setup Todo List:
1.replace the parameter in .env

Rabbit: set the host string
Firebase: set the config json
MySQL: set the host string, user, password, and database string

Test Guide
use 
> node index.js

to start the app

the express use the localhost:3000 to listen the test event
can use POST /sendFCM
to send json format message to Rabbit Queue
message format is
{
    “identifier”: “fcm-msg-a1beff5ac”,
    “type”: “device”,
    “deviceId”: “string”,
    “text”: “Notification message”
}

Firebase use the Queue message index deviceId as the registration token

