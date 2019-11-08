import { secrets } from '../src/docker-secrets'

async function main() {
    const name = (await secrets.get('user')).orDefault('Inigo Montoya')
    console.log(`Hello, my name is ${name}`)

    console.log(
        'You', secrets.getSync('verb'),
        'my', secrets.getSync('noun'), ',',
        'prepare to', secrets.getSync('finale')
    )
}

main()
//=>Hello, my name is eric
//=>You pet my dog , prepare to do it again
