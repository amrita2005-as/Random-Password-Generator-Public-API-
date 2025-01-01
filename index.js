import express from "express";
import ejs from "ejs";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;    

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.post("/generate", async (req, res) => {
    try {
        const {length, exclude_numbers, exclude_special_chars} = req.body;
        const a = await axios.get("https://api.api-ninjas.com/v1/passwordgenerator",{
            headers: { "X-Api-Key": "gnC8/fVNhR1/+i4OFWEWsg==dYJoX854WsN4ROGf" },
            params : { length : parseInt(length) || 16, 
                exclude_numbers : exclude_numbers === "on" ? true : false, 
                exclude_special_chars : exclude_special_chars === "on" ? true : false,
            }
        });
        const b = a.data.random_password;
        res.render("index.ejs",{password : b});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});