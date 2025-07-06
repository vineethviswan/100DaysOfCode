/*------------------------------------------------------------------------
    Day 45 - Web Scraping with Cheerio
             Scrape data from websites using the Cheerio library
-------------------------------------------------------------------------*/

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://news.ycombinator.com/';

async function scrapeTitles() {
    try{
        // Fetch the HTML content of the page
        const {data} = await axios.get(url);

        // Load the HTML into Cheerio
        const $ = cheerio.load(data);

        // Select and extract the titles of the articles
        $('.titleline > a').each((index, element) => {
            const title = $(element).text();
            const link = $(element).attr('href');
            console.log(`${index + 1}: ${title} (${link})`);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Run the scraper
scrapeTitles()
    .then(() => console.log('Scraping completed'))
    .catch(error => console.error('Error during scraping:', error));