import requests
from bs4 import BeautifulSoup
import json

def fetch_data_from_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    products = soup.find_all('div', class_='col-md-4 col-sm-6 col-xs-6 element mb30')  # Adjust class name based on site structure
    product_data = []

    for product in products:
        title_element = product.find('h5')
        title = title_element.text.strip() if title_element else "Unknown Title"

        price_element = product.find('span', class_='money')
        price = price_element.text.strip() if price_element else "Unknown Price"

        image_element = product.find('img')
        image_url = image_element['src'] if image_element and 'src' in image_element.attrs else "No Image URL"

        # Ensure the image URL is complete
        if image_url and not image_url.startswith('http'):
            image_url = f'https:{image_url}'

        product_data.append({
            'Title': title,
            'Price': price,
            'Image URL': image_url
        })

    return product_data, soup

def scrape_all_pages(base_url):
    all_product_data = []
    page = 1
    while True:
        url = f"{base_url}/collections/all?page={page}"
        print(f"Scraping page {page}...")

        data, soup = fetch_data_from_page(url)
        if not data:
            break  # No more products, exit the loop

        all_product_data.extend(data)

        # Check if there is a next page
        next_page = soup.find('a', {'class': 'next'})  # Adjust based on site's next page button or link
        if not next_page or 'disabled' in next_page.get('class', []):
            break  # exit the loop if no more pages

        page += 1

    return all_product_data

# Base URL
base_url = 'https://www.digitmakers.ca'
all_products = scrape_all_pages(base_url)

# Save the data 
with open('output.json', 'w') as file:
    json.dump(all_products, file, indent=4)
