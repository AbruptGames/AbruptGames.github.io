import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv-flow';

async function bootstrap() {
    dotenv.config();

    let pfxcert;
    try {
        pfxcert = require('fs').readFileSync(process.env.CERTIFICATE_PATH);
    } catch (e) {
        console.log("Certificate not found. Running in development mode.");
    }

    const app = await NestFactory.create(AppModule, {
        httpsOptions: {
            pfx: pfxcert,
            passphrase: "jWsR2Jpvtkb6iE+3bmChouuFqgKELiMi23RoDrj9/iA="
        }
    });
    app.enableCors()
    await app.listen(3000);
}
bootstrap();
