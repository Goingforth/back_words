const pool = require('../config/db');
// const pako = require('pako');
const zlib = require('zlib');

exports.createTableGlossary = async (req, res) => {
    //const { name, email } = req.body;
    try {
        const result = await pool.query(`
            DROP TABLE IF EXISTS words;
            CREATE TABLE words (
            word_id serial PRIMARY KEY,
            word character varying(40) NOT NULL,
            transcription character varying(40) NOT NULL,
            translation character varying(50),
            passed boolean DEFAULT false

        )`);
        res.status(201).json({ message: "Table 'words' created successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createGlossary = async (req, res) => {

    const { word, transcription, translation } = req.body;
    try {
        const result = await pool.query('INSERT INTO glossary (word, transcription, translation) VALUES($1,$2,$3) RETURNING *', [word, transcription, translation]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.clearGlossary = async (req, res) => {


    try {
        const result = await pool.query('TRUNCATE TABLE words RESTART IDENTITY ');
        res.status(204).json({ message: 'Table "words" cleared successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.viewGlossary = async (req, res) => {


    try {
        const result = await pool.query('SELECT * FROM words');
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getSizeGlossary = async (req, res) => {

    try {
        const result = await pool.query('SELECT count(*) FROM words');
        res.status(200).json(result.rows[0].count)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.viewGlossaryByParts = async (req, res) => {
    const { idWord, step } = req.query;


    try {
        const result = await pool.query(`SELECT * FROM words WHERE word_id >= ${idWord} ORDER BY word_id LIMIT ${step} `);
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// exports.newGlossary = async (req, res) => {
//     // const { id } = req.params;
//     //... fill input data here

//     const receivedData = req.body.data; // Access the parsed JSON data
//     try {

//         // console.log('Received data:', receivedData);
//         //const output = pako.inflate(receivedData);
//         // const output = JSON.parse(
//         //     inflate(new Uint8Array(receivedData), {
//         //         raw: true,
//         //         to: "string",
//         //     })
//         // )
//         // console.log('Received data:', output);
//         console.log('Received data :', receivedData);
//         console.log('Received data type:', typeof receivedData);
//         res.json({ message: 'Data received successfully!' });


//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };



//Assuming you're using Express and body-parser for handling request bodies
exports.newGlossary = async (req, res) => {

    const compressedBuffer = Buffer.from(req.body.data, 'base64'); // Convert base64 string to Buffer

    // console.log('Received compressed data:', compressedBuffer);

    zlib.gunzip(compressedBuffer, (err, decompressedBuffer) => {
        if (!err) {
            const decompressedString = decompressedBuffer.toString('utf8');
            // const jsonData = JSON.parse(decompressedString);
            pool.query(`INSERT INTO words(word, transcription, translation)
    SELECT word, transcription, translation
    FROM json_populate_recordset(NULL:: words, '${decompressedString}') RETURNING * `)
                ;
            res.send('Data received and decompressed successfully!');
        } else {
            console.error('Decompression error:', err);
            res.status(500).send('Error decompressing data.');
        }
    });
};

exports.setPassedWord = async (req, res) => {
    const { word_id } = req.body;
    try {
        const result = await pool.query(`UPDATE words SET passed = true WHERE word_id = ${word_id} RETURNING *`);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAmountPassed = async (req, res) => {
    try {
        const result = await pool.query('SELECT count(*) FROM words WHERE passed = true');
        res.status(200).json(result.rows[0].count)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// exports.getUsers = async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM users');
//         res.status(200).json(result.rows);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.createUser = async (req, res) => {
//     const { name, email } = req.body;
//     try {
//         const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
//         res.status(201).json(result.rows[0]);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.createUser = async (req, res) => {
//     const { name } = req.body;
//     try {
//         const result = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
//         res.status(201).json(result.rows[0]);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { name, email } = req.body;
//     try {
//         const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
//         res.status(200).json(result.rows[0]);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     const { id } = req.params;
//     try {
//         await pool.query('DELETE FROM users WHERE id = $1', [id]);
//         res.status(204).send();
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };