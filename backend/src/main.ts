"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv-flow").config();

async function bootstrap() {
    let pfxcert;
    try {
        pfxcert = require('fs').readFileSync(process.env.CERTIFICATE_PATH);
    }
    catch (e) {
        console.log("Certificate not found. Running in development mode.");
    }

    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions: {
            pfx: pfxcert,
            passphrase: "jWsR2Jpvtkb6iE+3bmChouuFqgKELiMi23RoDrj9/iA="
        }
    });
    
    app.enableCors()
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        const allowedOrigins = ['https://www.abruptgames.fr:403', 'https://www.abruptgames.fr'];
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    await app.listen(3000);
}
bootstrap();