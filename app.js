import appConfig from './config/appConfig.js';
import apiHandler from './routes/apiHandler.js';
import { get404 } from './routes/error.js';

import express from 'express';

export class App {

    constructor() {
        this.app = express();

        this.port = appConfig.PORT;

        this.initializeMiddlewares();
    }

    initializeMiddlewares() {

        this.app.use('/', new apiHandler().router);

        this.app.use(get404);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`=================================`);
            console.log(`App listening on the port ${this.port}`);
            console.log(`=================================`);
        });
    }
}

export default App;