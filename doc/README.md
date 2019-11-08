
docker-secrets [![Build status](https://travis-ci.org/strong-roots-capital/docker-secrets.svg?branch=master)](https://travis-ci.org/strong-roots-capital/docker-secrets) [![npm version](https://img.shields.io/npm/v/@strong-roots-capital/docker-secrets.svg)](https://npmjs.org/package/@strong-roots-capital/docker-secrets) [![codecov](https://codecov.io/gh/strong-roots-capital/docker-secrets/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/docker-secrets)
=================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

> FP loading of docker secrets, falling back on env vars

Install
-------

```shell
npm install @strong-roots-capital/docker-secrets
```

Use
---

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

Related
-------

*   [purify-ts](https://gigobyte.github.io/purify/adts/Maybe)
*   [docker-secrets-nodejs](https://github.com/zhu1230/docker-secrets-nodejs)

## Index

---

