import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

declare const module: any

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.use(cookieParser())

    // hbs 세팅
    app.useStaticAssets(join(__dirname, '..', 'public'))
    app.setBaseViewsDir(join(__dirname, '..', 'views'))
    app.setViewEngine('hbs')

    await app.listen(process.env.PORT)

    if (module.hot) {
        module.hot.accept()
        module.hot.dispose(() => app.close())
    }
}
bootstrap()
