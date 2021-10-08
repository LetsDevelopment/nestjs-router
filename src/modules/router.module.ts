import { Module, DynamicModule } from '@nestjs/common'
import * as path from 'path'
import * as mkdirp from 'mkdirp'

import { getAllFiles } from '../utils/get-all-files.util'

@Module({})
export class RouterModule {

    static ROUTE_PATH = `${path.resolve()}/dist/src/routes`

    public static async forRoot(): Promise<DynamicModule> {

        const files = getAllFiles(RouterModule.ROUTE_PATH, [], '.js')
            , controllers = []

        mkdirp.sync(RouterModule.ROUTE_PATH)

        for (const file of files) {

            const module = await import(file)

            if (module.default) {

                controllers.push(module.default)
            }
        }

        return {
            module: RouterModule,
            controllers
        }
    }
}