import { ScopeOptions } from '@nestjs/common/interfaces/scope-options.interface'
import { VersionOptions } from '@nestjs/common/interfaces/version-options.interface'
import { PATH_METADATA, HOST_METADATA, SCOPE_OPTIONS_METADATA, VERSION_METADATA } from '@nestjs/common/constants'
import { isUndefined } from '@nestjs/common/utils/shared.utils'
import { locate } from 'func-loc'
import * as path from 'path'
import 'reflect-metadata'

interface FunctionLocation {
    column: number
    line: number
    path: string
    source: string
}

export interface ControllerOptions extends ScopeOptions, VersionOptions {
    /**
     * Specifies an optional HTTP Request host filter.  When configured, methods
     * within the controller will only be routed if the request host matches the
     * specified value.
     *
     * @see [Routing](https://docs.nestjs.com/controllers#routing)
     */
    host?: string | RegExp | Array<string | RegExp>;
}

/**
 * Decorator that marks a class as a Nest controller that can receive inbound
 * requests and produce responses.
 *
 * An HTTP Controller responds to inbound HTTP Requests and produces HTTP Responses.
 * It defines a class that provides the context for one or more related route
 * handlers that correspond to HTTP request methods and associated routes
 * for example `GET /api/profile`, `POST /users/resume`.
 *
 * A Microservice Controller responds to requests as well as events, running over
 * a variety of transports [(read more here)](https://docs.nestjs.com/microservices/basics).
 * It defines a class that provides a context for one or more message or event
 * handlers.
 *
 * @see [Controllers](https://docs.nestjs.com/controllers)
 * @see [Microservices](https://docs.nestjs.com/microservices/basics#request-response)
 *
 * @publicApi
 */
export function Controller(): ClassDecorator

/**
 * Decorator that marks a class as a Nest controller that can receive inbound
 * requests and produce responses.
 *
 * An HTTP Controller responds to inbound HTTP Requests and produces HTTP Responses.
 * It defines a class that provides the context for one or more related route
 * handlers that correspond to HTTP request methods and associated routes
 * for example `GET /api/profile`, `POST /users/resume`.
 *
 * A Microservice Controller responds to requests as well as events, running over
 * a variety of transports [(read more here)](https://docs.nestjs.com/microservices/basics).
 * It defines a class that provides a context for one or more message or event
 * handlers.
 *
 * @param {object} options configuration object specifying:
 *
 * - `scope` - symbol that determines the lifetime of a Controller instance.
 * [See Scope](https://docs.nestjs.com/fundamentals/injection-scopes#usage) for
 * more details.
 * - `prefix` - string that defines a `route path prefix`.  The prefix
 * is pre-pended to the path specified in any request decorator in the class.
 * - `version` - string, array of strings, or Symbol that defines the version
 * of all routes in the class. [See Versioning](https://docs.nestjs.com/techniques/versioning)
 * for more details.
 *
 * @see [Routing](https://docs.nestjs.com/controllers#routing)
 * @see [Controllers](https://docs.nestjs.com/controllers)
 * @see [Microservices](https://docs.nestjs.com/microservices/basics#request-response)
 * @see [Versioning](https://docs.nestjs.com/techniques/versioning)
 *
 * @publicApi
 */
export function Controller(options: ControllerOptions): ClassDecorator

/**
 * Decorator that marks a class as a Nest controller that can receive inbound
 * requests and produce responses.
 *
 * An HTTP Controller responds to inbound HTTP Requests and produces HTTP Responses.
 * It defines a class that provides the context for one or more related route
 * handlers that correspond to HTTP request methods and associated routes
 * for example `GET /api/profile`, `POST /users/resume`
 *
 * A Microservice Controller responds to requests as well as events, running over
 * a variety of transports [(read more here)](https://docs.nestjs.com/microservices/basics).
 * It defines a class that provides a context for one or more message or event
 * handlers.
 *
 * @param prefixOrOptions a `ControllerOptions` object.
 * A `scope` - symbol that determines the lifetime of a Controller instance.
 * [See Scope](https://docs.nestjs.com/fundamentals/injection-scopes#usage) for
 * more details.
 * - `prefix` - string that defines a `route path prefix`.  The prefix
 * is pre-pended to the path specified in any request decorator in the class.
 * - `version` - string, array of strings, or Symbol that defines the version
 * of all routes in the class. [See Versioning](https://docs.nestjs.com/techniques/versioning)
 * for more details.
 *
 * @see [Routing](https://docs.nestjs.com/controllers#routing)
 * @see [Controllers](https://docs.nestjs.com/controllers)
 * @see [Microservices](https://docs.nestjs.com/microservices/basics#request-response)
 * @see [Scope](https://docs.nestjs.com/fundamentals/injection-scopes#usage)
 * @see [Versioning](https://docs.nestjs.com/techniques/versioning)
 *
 * @publicApi
 */
export function Controller(options?: ControllerOptions) {

    const [host, scopeOptions, versionOptions] = isUndefined(options)
        ? [undefined, undefined, undefined]
        : [options.host, { scope: options.scope }, options.version]

    return (target: object) => {

        // @ts-ignore
        locate(target).then((result: FunctionLocation) => {

            let paths = result.path.replace(`${path.resolve()}/`, '').split('/')

            paths = paths.slice(paths.indexOf('routes') + 1)

            if (paths[paths.length - 1] === 'index.js') {

                paths.pop()
            }
            else if (path.extname(paths[paths.length - 1]) === '.js') {

                paths[paths.length - 1] = paths[paths.length - 1].replace(/\.[0-9a-z]+$/i, '')
            }

            Reflect.defineMetadata(PATH_METADATA, `/${paths.join('/')}`, target)
            Reflect.defineMetadata(HOST_METADATA, host, target)
            Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, scopeOptions, target)
            Reflect.defineMetadata(VERSION_METADATA, versionOptions, target)
        })
    }
}