// const app = require('./app');
// const { Client } = require('pg');
// const fs = require('fs');


// const { DB_USER, DB_PORT, DB_HOST, DB_NAME, DB_PASSWORD } = process.env;
// // SSH
// // Настройка подключения к базе данных
// const client = new Client({
//     user: DB_USER,
//     host: DB_HOST,
//     database: DB_NAME,
//     password: DB_PASSWORD,
//     port: DB_PORT,
// });

// async function connectAndQuery() {
//     try {
//         await client.connect();
//         const res = await client.query('SELECT NOW()');
//         console.log(res.rows[0]);
//     } catch (err) {
//         console.error('Error connecting or querying:', err);
//     } finally {
//         await client.end();
//     }
// }
// // const { NodeSSH } = require('ssh2');
// const { NodeSSH } = require('node-ssh');
// const ssh = new NodeSSH();
// //


// const filePath = 'c:/keys/id_rsa'; // Замените на нужный путь

// if (fs.existsSync(filePath)) {
//     console.log(`Файл по пути ${filePath} существует`);
// } else {
//     console.log(`Файл по пути ${filePath} не существует`);
// }
//
// ssh.connect({
//     host: "93.127.134.207",
//     // host: "goingforth.site",
//     port: 64,
//     username: 'base ',
//     //  privateKey: require('fs').readFileSync('c:/keys/id_rsa')
//     privateKeyPath: "c:/keys/id_rsa"// Путь к вашему приватному ключу

//     //privateKeyPath: "/tempory/keys_base/id_rsa"
//     //password: "base"  // Или privateKey: '...'
// })
//     .then(() => {
//         console.log('SSH connection established');
//         //  connectAndQuery();
//         // client.connect()
//         //     .then(() => console.log('Connected to the database'))
//         //     .catch(err => console.error('Connection error', err.stack));
//     })
//     .catch(err => { console.log('SSH connection error', err); });


// conn.on('ready', () => {
//     console.log('Client :: ready');
//     // Здесь можно выполнять команды, пересылать файлы и т.д.
//     conn.end();
// });

// conn.on('error', (err) => {
//     console.error('Client :: error', err);
// });

// conn.connect({
//     host: "93.127.134.207",
//     port: 64,
//     username: 'Alex',
//     privateKey: '../../../../../alex/Documents/bitvise/alex/privat_alex.pub', // Путь к вашему приватному ключу
//     //  password: 'your_password'  // Или privateKey: '...'
// });



