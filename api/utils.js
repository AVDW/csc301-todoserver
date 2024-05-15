const fs = require('fs').promises;


function add(a, b) {
  return a + b;
}

async function getData(){
    // read file from disk
    let data = await fs.readFile('./src/data/data.json', 'utf8');
    return JSON.parse(data);
}

function saveData(data){
    fs.writeFile('./src/data/data.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log('File has been created')
    });
}

async function updateData(data){
    let oldData = await getData();
    let newData = Object.assign(oldData, data);
    saveData(newData);
}

module.exports = {add, getData, saveData, updateData};