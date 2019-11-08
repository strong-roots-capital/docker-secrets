import { secrets } from '../src/docker-secrets'

async function main() {

    console.log((await secrets.get('user')).orDefault('Ishmael'))
    console.log(secrets.getSync('PWD'))

    const getFromRoot = secrets.getFrom('/root/super-secrets-do-not-share')

    console.log(await getFromRoot('launch-codes'))
    console.log(secrets.getFromSync ('/home/gob') ('illusions'))
}

main()
