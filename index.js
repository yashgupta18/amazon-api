const { response } = require('express')
const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 5000

// const apiKey = '89c7f9bd2325bf30d58da9bbcd1a6ae7'
const generateScrapeUrl = (apiKey)=>`http://api.scraperapi.com/?api_key=${apiKey}&autoparse=true`
app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome to API scraper API')
})

app.get('/products/:productId', async(req, res) => {
    const { productId } = req.params
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})
//product reviewa
app.get('/products/:productId/reviews', async(req, res) => {
    const { productId } = req.params
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

//product offers
app.get('/products/:productId/offers', async(req, res) => {
    const { productId } = req.params
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

//GET Search Results
app.get('/search/:searchQuery', async(req, res) => {
    const { searchQuery } = req.params
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})
app.listen(PORT, () => console.log(`App running on PORT ${PORT}`))