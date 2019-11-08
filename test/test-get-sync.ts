import test from 'ava'
import { Just, Nothing } from 'purify-ts/Maybe'


/**
 * Library under test
 */

import { secrets } from '../src/docker-secrets'


test('should get secrets from provided dir', async t => {
    t.deepEqual(
        Just('deadbeef'),
        secrets.getFromSync ('./test/res') ('secret_a')
    )
})

test('should get known env-var when secret DNE', async t => {
    t.deepEqual(
        Just('deadbeef'),
        secrets.getSync('SECRET_ENV')
    )
})

test('should return Nothing when secret and env-var DNE', async t => {
    t.deepEqual(
        Nothing,
        secrets.getSync('secret_dne')
    )
})
