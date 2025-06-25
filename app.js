const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000; 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
      res.render('index');
});

// get digimon json (.content[?] take digifrom this array inside)
app.post('/digimon' ,(req, res) => {
    console.log(req.body.Digimon);
    res.status(200);
})


app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});



