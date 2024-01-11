import requests
from bs4 import BeautifulSoup
import json

def fetch_data_from_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    products = soup.find_all('div', class_='col-md-3 col-sm-6 col-xs-6 element mb30')  # Adjust class name based on site structure
    product_data = []

    for product in products:
        title_element = product.find('h5')
        title = title_element.text.strip() if title_element else "Unknown Title"

        current_price = "Unknown Price"
        old_price = "No Old Price"
        
        # Locate the <h5> tag and then find <a> tag within it
        link_element = product.find('h5').find('a') if product.find('h5') else None
        title = link_element.text.strip() if link_element else "Unknown Title"

        # Extract the product URL
        product_url = link_element['href'] if link_element and 'href' in link_element.attrs else "No Product URL"
        if product_url and not product_url.startswith('http'):
            product_url = f'https://www.voxelfactory.com{product_url}'

        price_container = product.find('div', class_='price')
        if price_container:
            # Current Price
            current_price_element = price_container.find('span', class_='money')
            current_price = current_price_element.text if current_price_element else "Unknown Price"

            # Old Price if available
            old_price_element = price_container.find('span', class_='compare-price')
            old_price = old_price_element.text if old_price_element else "No Old Price"

        image_element = product.find('img')
        image_url = image_element['src'] if image_element and 'src' in image_element.attrs else "No Image URL"

        # Ensure the image URL is complete
        if image_url and not image_url.startswith('http'):
            image_url = f'https:{image_url}'

        product_data.append({
            'Title': title,
            'Current Price': current_price,
            'Old Price': old_price,
            'Image URL': image_url,
            'Product URL': product_url
        })

    return product_data, soup

# Scrape func
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
        next_page = soup.find('a', {'class': 'next'})  # Adjust based on site's next page button/link
        if not next_page or 'disabled' in next_page.get('class', []):
            break  # There is no next page, exit the loop

        page += 1

    return all_product_data

# Base URL 
base_url = 'https://www.voxelfactory.com'
all_products = scrape_all_pages(base_url)

# Save the data to JSON
with open('output.json', 'w') as file:
    json.dump(all_products, file, indent=4)









        