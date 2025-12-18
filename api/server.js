const app = require("./app");
const pool = require('./config/db');

require('dotenv').config(); // Load environment variables

const port_server = process.env.PORT_SERVER || 3000;


pool.connect()
    .then(() => {
        console.log(`Connected to PostgreSQL database ${process.env.DB_NAME}`);
        // Start the server
        app.listen(port_server, () => {
            console.log(`Server running on port ${port_server}`);
        });
    })

    .catch(err => console.error(`Error connecting to PostgreSQL database ${process.env.DB_NAME}`, err));




