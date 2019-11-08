/**
 * docker-secrets
 * FP loading of docker secrets, falling back on env vars
 */

import * as fs from 'fs'
import * as path from 'path'

import ow from 'ow'
import Debug from 'debug'
import { Maybe, Just } from 'purify-ts/Maybe'
import { Left, Right, Either } from 'purify-ts/Either'
import { FutureInstance } from 'fluture'
import * as Future from 'fluture'

const debug = {
    secrets: Debug('docker-secrets')
}


const defaultSecretsDir = () => '/run/secrets'

const tryCatch = <L, R>(f: () => R): Either<L, R> => {
    try {
        return Right(f())
    } catch (error) {
        return Left(error)
    }
}

const readFile: (path: string) => FutureInstance<NodeJS.ErrnoException, string> =
    Future.encaseP(
        async (file: string) => new Promise<string>(
            (resolve, reject) => fs.readFile(
                file,
                'utf8',
                (error, data) => error ? reject(error) : resolve(data)
            )
        )
    )

const readFileSync = (file: string) =>
    tryCatch<NodeJS.ErrnoException, string>(() => fs.readFileSync(file, 'utf8'))


function getEnvironmentVariable(secret: string): Maybe<string> {
    return Maybe.fromNullable(process.env[secret.toUpperCase()])
}

function getSecret<T>(
    secretGetter: (directory: string, secret: string) => T
) {

    return function getSecretFromDirectory(directory: string) {

        ow(directory, ow.string)

        return function getSecretDescribedBy(secret: string) {

            ow(secret, ow.string)
            debug.secrets(`loading secret '${secret}'`)

            return secretGetter(directory, secret)
        }
    }
}

async function getSecretAsync(
    directory: string,
    secret: string
): Promise<Maybe<string>> {

    const secretFile = path.resolve(directory, secret)

    return readFile(secretFile)
        .map(text => text.trim())
        .map(text => Just(text))
        .chainRej(() => Future.of(getEnvironmentVariable(secret)))
        .promise()
}

function getSecretSync(
    directory: string,
    secret: string
): Maybe<string> {

    const secretFile = path.resolve(directory, secret)

    return readFileSync(secretFile)
        .map(text => text.trim())
        .map(text => Just(text))
        .mapLeft(() => getEnvironmentVariable(secret))
        .extract()
}

/**
 * Get a secret asynchronously, first checking /run/secrets and then
 * falling-back to environment variables.
 */
export async function get(secret: string) {
    return getSecret (getSecretAsync) (defaultSecretsDir()) (secret)
}

/**
 * Get a secret asynchronously, first checking `directory` and then
 * falling-back to environment variables.
 */
export function getFrom(directory: string) {
    return getSecret (getSecretAsync) (directory)
}

/**
 * Get a secret synchronously, first checking /run/secrets and then
 * falling-back to environment variables.
 */
export function getSync(secret: string) {
    return getSecret (getSecretSync) (defaultSecretsDir()) (secret)
}

/**
 * Get a secret synchronously, first checking `directory` and then
 * falling-back to environment variables.
 */
export function getFromSync(directory: string) {
    return getSecret (getSecretSync) (directory)
}

/**
 * Exposed API
 */
interface Secrets {
    get: (secret: string) => Promise<Maybe<string>>;
    getSync: (secret: string) => Maybe<string>;
    getFrom: (directory: string) => (secret: string) => Promise<Maybe<string>>;
    getFromSync: (directory: string) => (secret: string) => Maybe<string>;
}

const secrets: Secrets = {
    get,
    getFrom,
    getSync,
    getFromSync
}

export { secrets }
