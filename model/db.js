require('dotenv').config()
const mysql = require("mysql")

class DB {
    static connection = mysql.createConnection({
        host     : process.env.mysql_host,
        user     : process.env.mysql_user,
        password : process.env.mysql_password,
        database : process.env.mysql_database,
    })

    static  {
        this.connection.connect();

        this.connection.query("CREATE TABLE IF NOT EXISTS `fcm_job`("
           + " `id` INT NOT NULL AUTO_INCREMENT,"
           + " `identifier` varchar(45) NOT NULL,"
           + " `deliverAt` datetime NOT NULL,"
           + " PRIMARY KEY (`id`)"
           + ") ENGINE=InnoDB DEFAULT CHARSET=utf8;", function (error, results, fields) {
            if (error) throw error;
           })
    }

    static async getJobs() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM fcm_job", function(error, results, fields) {
                if (error) {
                    reject(error);
                }
                resolve(results);
            })
        })
    }

    static async addJob(identifier, deliverAt) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO fcm_job (identifier, deliverAt) VALUES ('" + identifier + "', '" +deliverAt +"')";
            this.connection.query(sql, function(error, results, fields) {
                if (error) {
                    reject(error);
                }
                resolve(results);
            })
        })
    }
}

module.exports = DB;
