const fetch = require('node-fetch')

exports.handler = async (event) => {
    const eventQueryStringPar = event.queryStringParameters
    const DISCOGS_API = `https://api.discogs.com/database/search?genre=Jazz&year=${eventQueryStringPar.year}&sort=have&token=${process.env.DISCOGS_TOKEN}`

    const response = await fetch(DISCOGS_API)
    const data = await response.json()

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}