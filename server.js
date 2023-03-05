let express = require('express')
let app = express()

app.get('/', (req, res) => {
    res.send("hello")
})
const PORT = 3001;
app.listen(PORT, () => {
    console.log("server started")
})