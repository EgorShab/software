# Python Web Scraper
### Overview
Scripts are part of a personal initiative to automate the process of price monitoring for marketing purposes. They are designed to efficiently gather pricing and product information from various websites, which is vital for maintaining competitiveness in business. These scripts represent a well-structured approach to web scraping, utilizing Python's powerful libraries to automate the extraction of valuable market data. By leveraging such automation, one can make informed decisions, ensuring strategic alignment with market dynamics.

### How It Works
- <b>Data Fetching:</b> Each script starts by making HTTP requests to specific web pages.
- <b>Data Parsing:</b> Upon retrieving the web page's content, BeautifulSoup is used to parse the HTML/XML. This step involves identifying and extracting the relevant pieces of information - pricing and product details.
- <b>Data Processing:</b> The extracted data is then processed.
- <b>Result:</b> The processed data is either stored for later use or outputted in a required format. This could be in the form of a JSON file, a database entry, or a simple print statement for immediate viewing.

### Technical Description

- <b>Requests:</b> This library is utilized for making HTTP requests to web pages. It is essential for accessing the content of the websites from which data is to be scraped.
- <b>BeautifulSoup:</b> A library used for parsing HTML and XML documents. It is particularly useful for extracting specific pieces of data from the web pages fetched by the Requests library.
- <b>JSON:</b> This module is used for handling JSON data. It's employed for structuring the extracted data into JSON format, which is a lightweight and widely used data interchange format.
