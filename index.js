const axios = require('axios');
const cheerio = require('cheerio');

const getPostTitles = async (search) => {
	try {
		const { data } = await axios.get(
			'https://bbc.co.uk/news'
		);
		const $ = cheerio.load(data);
		const postTitles = [];
    const eventDecription = []
    const corona_info = []

		$('.gs-c-promo-heading').each((_idx, el) => {
			const postTitle = $(el).text()
			postTitles.push(postTitle)
		});

    $('.gs-c-promo-summary').each((_idx, el) => {
			const postTitle = $(el).text()
			eventDecription.push(postTitle)
		});

    postTitles.forEach(title => {
      const num = eventDecription.length
      for(let i = 0; i < num; i++){
        corona_info.push([title, eventDecription[i]])
      }
    })

    return postTitles;
	} catch (error) {
		throw error;
	}
};




getPostTitles()
.then((postTitles) => console.log(postTitles));