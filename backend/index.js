import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"sapulidi1995",
    database:"list_app"
});

app.get("/", (req,res)=>{
    res.json("Hello this is the backend")
});

app.get("/books", (req, res) =>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    });
});


app.post("/books", (req, res) => {
    console.log(req.body);
    const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)";
    const values = [
       req.body.title,
       req.body.desc,
       req.body.cover,
       req.body.price,
    ];

    db.query(q,[values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Books has been created successfully!");
    });
});

app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data)=>{
        if (err) return res.json(err);
        return res.json("Books has been Deleted successfully!");
    })
})

app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?,`desc` = ?,`cover` = ?,`price` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
     ];

    db.query(q, [...values,bookId], (err, data)=>{
        if (err) return res.json(err);
        return res.json("Books has been Updated successfully!");
    })
})

app.listen(8800, ()=>{
    console.log("Connected to Backend!");
});