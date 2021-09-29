const fs = require('fs');

const readFile = (name) => fs.readFileSync(name, "utf8");

const createDir = (name) => {
  try {
    fs.statSync(name);
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      fs.mkdirSync(name);
    }
  }
}


const createFile = (name, text) => {
  fs.writeFile(name, text, function(error){
    console.error(error);
  })
}

module.exports = { readFile, createDir, createFile }