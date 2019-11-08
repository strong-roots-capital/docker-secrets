import test from 'ava'
// TODO: cull unused imports
import { Maybe, Just, Nothing } from 'purify-ts/Maybe'


/**
 * Library under test
 */

import { secrets } from '../src/docker-secrets'


test('should get secrets from provided dir', async t => {
    t.deepEqual(
        Just('deadbeef'),
        await secrets.getFrom ('./test/res') ('secret-a')
    )
})

test('should get known env-var when secret DNE', async t => {
    t.deepEqual(
        Just('deadbeef'),
        await secrets.get ('secret-a')
    )
})


test.todo('should return Nothing when secret and env-var DNE')

test.todo('should offer synchronous API')
