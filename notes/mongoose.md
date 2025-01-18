for mongodb connection url use 127.0.0.1 because nodejs 18 and up prefer ipv6 addresses which means when we'll
give localhost it will reslove it to localhost to the IPv6 address ::1 and Mongoose will be unable to connect,
unless the mongodb instance is running with ipv6 enabled.

on a successfull request it returns connected event
on getting disconnected it returns disconnected event
on getting any error it returns error event

and we can use these use .on method

### dotenv

const result = dotenv.config()

if (result.error) {
throw result.error
}

console.log(result.parsed)

## path

# Default: path.resolve(process.cwd(), '.env')

# Specify a custom path if your file containing environment variables is located elsewhere.

require('dotenv').config({ path: '/custom/path/to/.env' })
