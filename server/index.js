const express = require("express")
const cors = require("cors")
const path = require("path")

require("dotenv").config()

// Fallback environment variables for hosting platforms (like Render)
const defaultEnv = {
    DB_KEY: "mongodb+srv://vishank:Ducat123@cluster0.xlhzixp.mongodb.net/apnidukan",
    SITE_NAME: "ApniDukan",
    SITE_URL: "https://apni-dukan-e-commerce.onrender.com",
    JWT_SECRET_KEY_PUBLIC: "mynameisnitinchauhanandiamafullstacktrainerinducatnoidaandthiskeyisusedforpublicrole",
    JWT_SECRET_KEY_PRIVATE: "mynameisnitinchauhanandiamafullstacktrainerinducatnoidaandthiskeyisusedforprivaterole",
    MAILER: "nitinfullstack33@gmail.com",
    PASSWORD: "fqfdzuhcmykjvpns",
    RPKEYID: "rzp_test_SP2BReTR4NaDhg",
    RPSECRETKEY: "WWDmdeeZpIRpH45Y2Lofm5Hw"
};
for (const key in defaultEnv) {
    if (!process.env[key]) {
        process.env[key] = defaultEnv[key];
    }
}

require("./db-connect")


const Router = require("./routes")
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use("/public", express.static("./public"))
app.use(express.static(path.join(__dirname, 'dist')))
app.use("/api", Router)



app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});


let port = process.env.PORT || 8000
app.listen(port, console.log(`Server is Running at http://localhost:${port}`))