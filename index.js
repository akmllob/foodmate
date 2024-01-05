const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const db = require('./connection')
const port = 3030

app.use(bodyParser.json())

const response = require('./response')

app.get("/", (req, res) => {
    response(200, "Database V-Home", "success", res)
})

app.get("/user-list", (req, res) => {
    const sql = "SELECT * FROM pengguna";
    db.query(sql, (err, result) => {
        if(err){ 
            response(500, "Server Error", "Cant find food-list", res)
        }
        response(200, result, "food-list", res)
    })
})

app.post("/user-list", (req, res) => {
    const {nama_pengguna, alamat_pengguna, no_hp} = req.body
    const sql = "INSERT INTO pengguna (nama_pengguna, alamat_pengguna, no_hp) VALUES (?, ?, ?)"

    db.query(sql, [nama_pengguna, alamat_pengguna, no_hp], (err, result) => {
        if (err) {
            console.error("Error inserting datas", err)
            response(500, null, "Error inserting datas")
        }else{
            const display = "SELECT * FROM pengguna"

            db.query(display, (diserr, disres) => {
                if (diserr) {
                    console.error("Error inserting data", diserr)
                    response(500, "Error inserting data", "Error", res)
                }else{
                    console.log("Inserting data succesfully!")
                    response(200, disres, "Inserting data sucessfully!", res)
                }
            })
            
        }
    })
})

app.put("/user-list/:id", (req, res) => {
    const userId = req.params.id
    const {nama_pengguna, alamat_pengguna, no_hp} = req.body

    const sql = "UPDATE pengguna SET nama_pengguna = ?, alamat_pengguna = ?, no_hp = ? WHERE id_pengguna = ?"

    db.query(sql, [nama_pengguna, alamat_pengguna, no_hp, userId], (err, result) => {
        if(err){
            console.error("Error updating data!")
            response(500, "Error updating data!", "Error", res)
        }else{
                response(200, "Success", "Updating data sucessfully!", res)
        }
    })
})

app.delete("/user-list/:id", (req, res) => {
    const userId = req.params.id
    const sql = "DELETE FROM pengguna WHERE id_pengguna = ?"

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting data!", err)
            response(500, null, "Error deleting data!", res)
        }else{
            const display = "SELECT * FROM pengguna"
            db.query(display, (diserr, disres) => {
                response(200, disres, "Deleting data successfully!", res)
            })
        }
    })
})

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
