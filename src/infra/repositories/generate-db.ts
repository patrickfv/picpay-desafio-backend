import {DatabaseSync} from 'node:sqlite'

const fileDB = new DatabaseSync('./database.db')


fileDB.exec(`DROP TABLE IF EXISTS users`)
fileDB.exec(`
    CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    cpfCnpj TEXT NOT NULL,
    userType INTEGER NOT NULL,
    walletValue REAL NOT NULL
    ) STRICT
`)

fileDB.exec(`DROP TABLE IF EXISTS transactions`)
fileDB.exec(`
        CREATE TABLE transactions (
        id INTEGER PRIMARY KEY,
        value REAL NOT NULL,
        payee INTEGER NOT NULL,
        payer INTEGER NOT NULL,
        datetime INTEGER NOT NULL,
        FOREIGN KEY (payee) REFERENCES users (id),
        FOREIGN KEY (payer) REFERENCES users (id)
    ) STRICT
`)

const insertUser = fileDB.prepare(`
        INSERT INTO users (id, name, password, email, cpfCnpj, userType, walletValue)
        VALUES (@id, @name, @password, @email, @cpfCnpj, @userType, @walletValue)
        RETURNING id, name, walletValue
`)

const generateUsers = () => {

    let interation = 1

    while (interation <= 20) {
        const valueReal = Math.floor(Math.random() * 1000)
        const valueCents = Math.floor(Math.random() * 100)
        const pfOrPj = Math.floor(Math.random() * (3 - 1) + 1)
        const document = {
            type: pfOrPj,
            info: (pfOrPj == 2) ? `00.000.000/000${interation}-91` : `000.000.00${interation}-91`
        }
        let value = parseFloat(`${valueReal}.${valueCents}`)
        const user = {
            id: interation,
            name: `${interation}`,
            email: `${interation}@example.com`,
            password: `${interation}passwd`,
            cpfCnpj: document.info,
            userType: document.type,
            walletValue: value
        }

        insertUser.run(user)
        interation++
    }
}

generateUsers()

/*
const insertTransaction = fileDB.prepare(`
        INSERT INTO transactions (id, value, payee, payer, datetime)
        VALUES (@id, @value, @payee, @payer, @datetime)
        RETURNING id, value, datetime
`)
const generateTransation = () => {
    const transaction = { id: 10, value: 350.56, payee: 1, payer: 5, datetime: Date.now()}
    insertTransaction.run(transaction)
}
*/