"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const webOrigin = config.get('WEB_ORIGIN', 'http://localhost:3000');
    app.enableCors({
        origin: webOrigin,
        credentials: true,
    });
    const port = Number(config.get('PORT', '3001'));
    await app.listen(port);
    console.log(`API listening on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map