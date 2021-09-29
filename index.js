const express = require("express");
const port = 5000; //process.env.PORT ||
// const bd = require('./database/bd.json');
const fs = require('fs');
const path = require('path');
const app = express();
const { readFile, createDir, createFile } = require('./filework')
const bodyParser = require('body-parser');


app.set(`view engine`, `pug`);
app.set('views', path.join(__dirname, './client/pug'));

app.use(express.static(path.join(__dirname, 'client/')));

// app.use('/search', bodyParser.urlencoded({
//   extended: true
// }));


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

app.get('/', (req, res) => {
  // res.sendFile(`${__dirname}/database/bd.json`);
  res.render('./pages/index');
})

const responceDatabase = (name) => {
  app.get(`/${name}`, (req, res) => {
    res.sendFile(`${__dirname}/database/${name}.json`);
    // res.render('./pages/index');
  })
}


const getDatabase = () => new Promise((resolve, reject) => {
    fs.readdir('./database/', (err, files) => {
      files.forEach(file => {
        responceDatabase(file.replace('.json', ''));
      });
  
      const database = files.map(file => {
        return JSON.parse(readFile(`${__dirname}/database/${file}`));
      })

      resolve({database, files});
    });
  })

getDatabase()
  .then(data => {
    app.get(`/database`, (req, res) => {
      res.send(data.database);
    })

    data.database.forEach((arr, i) => {
      arr.forEach(product => {

        app.get(`${product.pageurl}`, (req, res) => {
          res.render(`./pages${product.pageurl}`, {
            imgurl: product.imgurl,
            title: product.name,
            description: product.description,
            cost: product.cost,
            keys: product.info.keys,
            values: product.info.values
          });
        })
      })
    })

    const urlencodedParser = bodyParser.urlencoded({ extended: true });

    app.post('/search', urlencodedParser, (req, res) => {
      console.log(req.body.input);
      res.send(data.database);
    });
  })




//   const express = require("express");
// const app = express();
// const bodyParser = require('body-parser');

// // Обратите внимание на используемый путь. Именно он задается в атрибуте action формы
// app.use('/search', bodyParser.urlencoded({
//     extended: true
// }));

// // Обратите внимание на используемый путь. Именно он задается в атрибуте action формы
// app.get('/search', (req, res, next) => {
//     // Объект req.body содержит данные из переданной формы
//     console.dir(req.body);
// });

// const layoutPath = './client/pug/layout/product.pug';
//         const layoutText = readFile(layoutPath);
//         const pagesPath = `./client/pug/pages/`;

//         createDir(`${pagesPath}/${path.dirname(product.pageurl)}/`);
//         createFile(`${pagesPath}/${product.pageurl}.pug`, layoutText);