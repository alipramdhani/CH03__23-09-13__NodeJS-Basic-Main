// core module nodeJs
// --filesystem
const fs = require('fs');
//  --httpserver
const http = require('http');
//  --routing
const url = require('url');

// // blocking code execution => synchronous
// const textIn = fs.readFileSync('./txt/read-this.txt', 'utf-8');
// // console.log(textIn);

// // const textOut = fs.writeFileSync('./txt/output.txt', 'kalimat ini akan muncul di file output.txt');
// // console.log('--- sukses print kalimat ---');

// const textOut = `ini adalah penjelasan alpukat dalam bahasa inggris : <br> ${textIn}`;
// fs.writeFileSync('./txt/output-penjelasan.txt', textOut);
// console.log('--- sukses print kalimat ---')

// // non-blocking code execution => asynchronous
// const test = fs.readFile('./txt/start.txt', 'utf-8', (err, data)=> {
//     // console.log(data);
//     // callback function
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//         fs.writeFile(`./txt/gabungan.txt`, `${data}\n${data2}`, err => {
//             console.log('sukses menggabungkan data');
//         })
//     });
// });
// console.log('hai FSW 2 nunggu read file yah?');
// console.log(test);

// // callback hell
// const test = fs.readFile('./txt/start.txt', 'utf-8', (err, data)=> {
//     // console.log(data);
//     fs.readFile(`./txt/final.txt`, 'utf-8', (err, data3) => {
//         fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//             fs.writeFile(`./txt/gabungan2.txt`, `${data2}\n${data3}`, err => {
//                 console.log('sukses menggabungkan data');
//             })
//         })
//         // console.log(data2);
//         // return data2;
        
//     });
// });
// console.log('hai FSW 2 nunggu read file yah?');

//////////////////////////////////////
//SERVER dengan HTTP
const server = http.createServer((req, res) => {
    // console.log(req, url);
    const pathName = req.url;

    if(pathName === '/hello') {
        res.end('ini hello ke FSW 2')
    } else if (pathName === '/product') {
        res.end(JSON.stringify({
            data: 'Ini data product!',
        }));
    } else if (pathName === '/api'){
        const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
        res.writeHead(200, {
            'content-type': 'application/json'
        })
        res.end(data);
    } else if (pathName === '/overview'){
        const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`);
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end(overviewPage);
    } else {
        res.writeHead(404, {
            'content-type': 'text/html'
        })
        res.end('<h1> halaman tidak ditemukan </h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server berjalan!');
});
