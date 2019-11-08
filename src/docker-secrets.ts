/**
 * docker-secrets
 * FP loading of docker secrets, falling back on env vars
 */

import * as fs from 'fs'
import * as path from 'path'

import ow from 'ow'
import Debug from 'debug'
import { Maybe, Just, Nothing } from 'purify-ts/Maybe'
import * as Future from 'fluture'

const debug = {
    secrets: Debug('docker-secrets')
}

/**
 * Exposed API
 */
interface Secrets {
    get: (secret: string) => Promise<Maybe<string>>;
    getFrom: (directory: string) => (secret: string) => Promise<Maybe<string>>;
}

const defaultSecretsDir = () => '/run/secrets'

const readFile = Future.encaseP(
    (file: string) => new Promise<string>(
        (resolve, reject) => fs.readFile(
            file,
            'utf8',
            (error, data) => error ? reject(error) : resolve(data)
        )
    )
)


function getSecret(directory: string) {

    ow(directory, ow.string)

    return function getSecretFromDirectory(secret: string): Promise<Maybe<string>> {

        ow(secret, ow.string)
        debug.secrets(`loading secret '${secret}'`)

        const secretFile = path.resolve(directory, secret)

        return new Promise(resolve => {
            readFile(secretFile)
                .map(text => text.trim())
                .fork(
                    () => resolve(Nothing),
                    (value) => resolve(Just(value))
                )
        })
    }
}

/**
 * TODO: document
 */
// function get(secret: string): Maybe<string>;
// function get(secret: string): Promise<Maybe<string>>;
function get(secret: string): Promise<Maybe<string>> /*| Maybe<string> */  {
    return getSecret (defaultSecretsDir()) (secret)
}

/**
 * TODO: document
 */
function getFrom(directory: string) {
    return getSecret(directory)
}


const secrets: Secrets = {
    get,
    getFrom
}

export { secrets }
