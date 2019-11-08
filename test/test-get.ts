import test from 'ava'
import { Just, Nothing } from 'purify-ts/Maybe'


/**
 * Library under test
 */

import { secrets } from '../src/docker-secrets'


test('should get secrets from provided dir', async t => {
    t.deepEqual(
        Just('deadbeef'),
        await secrets.getFrom ('./test/res') ('secret_a')
    )
})

test('should get known env-var when secret DNE', async t => {
    t.deepEqual(
        Just('deadbeef'),
        await secrets.get('SECRET_ENV')
    )
})

test('should return Nothing when secret and env-var DNE', async t => {
    t.deepEqual(
        Nothing,
        await secrets.get('secret_dne')
    )
})

// test('should offer synchronous API', t => {
//     t.deepEqual(
//         Just('deadbeef'),
//         secrets.get('SECRET_ENV')
//     )
// })
