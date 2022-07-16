require('dotenv').config()
const rabbit = require("rabbit.js")

class Rabbit{
    static context = null;
    static publish;
    static subscribe;
    static pub_fcm;
    static sub_done;
    
    static async init() {
        if (this.context == null) {
            try {
            this.context = rabbit.createContext(process.env.rabbit_host);
            this.publish = this.context.socket("PUBLISH");
            this.publish.connect(process.env.rabbit_publish);

            this.pub_fcm = this.context.socket("PUBLISH");
            this.pub_fcm.connect(process.env.rabbit_subscribe);
            this.sub_done = this.context.socket("SUBSCRIBE");
            this.sub_done.connect(process.env.rabbit_publish);
            this.sub_done.setEncoding("utf8");

            this.subscribe = this.context.socket("SUBSCRIBE");
            this.subscribe.connect(process.env.rabbit_subscribe);
            this.subscribe.setEncoding("utf8");

            }catch(error) {
                console.log(error)
            }
        }
    }
}

module.exports = Rabbit;
