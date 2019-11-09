# docker-secrets [![Build status](https://travis-ci.org/strong-roots-capital/docker-secrets.svg?branch=master)](https://travis-ci.org/strong-roots-capital/docker-secrets) [![npm version](https://img.shields.io/npm/v/@strong-roots-capital/docker-secrets.svg)](https://npmjs.org/package/@strong-roots-capital/docker-secrets) [![codecov](https://codecov.io/gh/strong-roots-capital/docker-secrets/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/docker-secrets)

> FP loading of docker secrets, falling back on env vars

## Install

```shell
npm install @strong-roots-capital/docker-secrets
```

## Use

```typescript
import { secrets } from '@strong-roots-capital/docker-secrets'

async function main() {

    console.log((await secrets.get('user')).orDefault('Ishmael'))
    console.log(secrets.getSync('PWD'))

    const getFromRoot = secrets.getFrom('/root/super-secrets-do-not-share')

    console.log(await getFromRoot('launch-codes'))
    console.log(secrets.getFromSync ('/home/gob') ('illusions'))
}

main()
```

## Related

- [purify-ts](https://gigobyte.github.io/purify/adts/Maybe)
- [docker-secrets-nodejs](https://github.com/zhu1230/docker-secrets-nodejs)

## API

### Functions

* [get](#get)
* [getFrom](#getfrom)
* [getFromSync](#getfromsync)
* [getSync](#getsync)

---

## Functions

<a id="get"></a>

###  get

▸ **get**(secret: *`string`*): `Promise`<`Maybe`<`string`>>

*Defined in [docker-secrets.ts:100](https://github.com/strong-roots-capital/docker-secrets/blob/master/src/docker-secrets.ts#L100)*

Get a secret asynchronously, first checking /run/secrets and then falling-back to environment variables.

**Parameters:**

| Name | Type |
| ------ | ------ |
| secret | `string` |

**Returns:** `Promise`<`Maybe`<`string`>>

___
<a id="getfrom"></a>

###  getFrom

▸ **getFrom**(directory: *`string`*): `getSecretDescribedBy`

*Defined in [docker-secrets.ts:108](https://github.com/strong-roots-capital/docker-secrets/blob/master/src/docker-secrets.ts#L108)*

Get a secret asynchronously, first checking `directory` and then falling-back to environment variables.

**Parameters:**

| Name | Type |
| ------ | ------ |
| directory | `string` |

**Returns:** `getSecretDescribedBy`

___
<a id="getfromsync"></a>

###  getFromSync

▸ **getFromSync**(directory: *`string`*): `getSecretDescribedBy`

*Defined in [docker-secrets.ts:124](https://github.com/strong-roots-capital/docker-secrets/blob/master/src/docker-secrets.ts#L124)*

Get a secret synchronously, first checking `directory` and then falling-back to environment variables.

**Parameters:**

| Name | Type |
| ------ | ------ |
| directory | `string` |

**Returns:** `getSecretDescribedBy`

___
<a id="getsync"></a>

###  getSync

▸ **getSync**(secret: *`string`*): `Maybe`<`string`>

*Defined in [docker-secrets.ts:116](https://github.com/strong-roots-capital/docker-secrets/blob/master/src/docker-secrets.ts#L116)*

Get a secret synchronously, first checking /run/secrets and then falling-back to environment variables.

**Parameters:**

| Name | Type |
| ------ | ------ |
| secret | `string` |

**Returns:** `Maybe`<`string`>

___
