import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# Define the NBA teams
nba_teams = [
    'atlanta-hawks', 'boston-celtics', 'brooklyn-nets', 'charlotte-hornets',
    'chicago-bulls', 'cleveland-cavaliers', 'dallas-mavericks', 'denver-nuggets',
    'detroit-pistons', 'golden-state-warriors', 'houston-rockets', 'indiana-pacers',
    'los-angeles-clippers', 'los-angeles-lakers', 'memphis-grizzlies', 'miami-heat',
    'milwaukee-bucks', 'minnesota-timberwolves', 'new-orleans-pelicans', 'new-york-knicks',
    'oklahoma-city-thunder', 'orlando-magic', 'philadelphia-76ers', 'phoenix-suns',
    'portland-trail-blazers', 'sacramento-kings', 'san-antonio-spurs', 'toronto-raptors',
    'utah-jazz', 'washington-wizards'
]

# HTML table rows process
def process_game_row(tr, team):
    date = tr.find('td', class_='text-center').get_text(strip=True)
    opponent_td = tr.find_all('td', class_='text-center')[1]
    opponent_raw = opponent_td.get_text(strip=True)
    score = tr.find_all('td', class_='text-center')[2].get_text(strip=True)
    is_playoff = opponent_td.find('span', class_='fa fa-bolt') is not None
    type = "Playoff" if is_playoff else "Regular"
    win_loss = "Win" if 'W' in score else "Loss"
    team1 = team.replace('-', ' ')
    opponent = opponent_raw.replace('@ ', '').replace('vs ', '').replace('-', ' ')
    
    ot_game = 0  # Default to no OT
    expanding_td = tr.find('td', class_='expanding')
    if expanding_td and 'OT' in expanding_td.text:
        ot_game = 1  # Mark as OT game

    return {
        'Date': date, 'Score': score, 'Win': win_loss, 'Type': type,
        'Team1': team1, 'Team2': opponent, 'OT': ot_game
    }

# Data scrape year
def scrape_data_for_year(team, year):
    headers = {'User-Agent': 'Mozilla/5.0'}
    url = f"https://champsorchumps.us/team/nba/{team}/{year}"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        target_div = soup.find('div', class_='col-md-12 col-lg-8')
        if target_div:
            game_rows = target_div.find_all('tr', id=lambda x: x and x.startswith('game_'))
            print(f"Scraping data for {team}. Year {year}.")
            return [process_game_row(tr, team) for tr in game_rows if tr.find('td', class_='text-center')]
    else:
        print(f"Failed to retrieve the web page for year {year}. Status code: {response.status_code}")
        return []

# Data scrape team
def scrape_data_for_team(team, start_year, end_year):
    all_games_data = []
    for year in range(start_year, end_year + 1):
        yearly_data = scrape_data_for_year(team, year)
        all_games_data.extend(yearly_data)
        time.sleep(1)  # Delay
    return pd.DataFrame(all_games_data)

# User promt
team_selection = input("Enter 'all' for all teams or specify a team (e.g., 'los-angeles-clippers'): ").strip().lower().replace(' ', '-')
print("To scrape data faster, choose only one season e.g. 2023-2024")
start_year = int(input("Enter your start year: "))
end_year = int(input("Enter your end year: "))

master_df = pd.DataFrame()

# Handle all
if team_selection == 'all':
    for team in nba_teams:
        df = scrape_data_for_team(team, start_year, end_year)
        master_df = pd.concat([master_df, df], ignore_index=True)
else:
    if team_selection in nba_teams:
        master_df = scrape_data_for_team(team_selection, start_year, end_year)
    else:
        print("Team not found. Please ensure you've entered the team name correctly.")

# Data post-processing
master_df['Win'] = master_df['Win'].apply(lambda x: 1 if x == 'Win' else 0)
master_df['Type'] = master_df['Type'].apply(lambda x: 1 if x == 'Playoff' else 0)

# Show
print(master_df)

# Export to CSV
csv_file_name = f"nba_data_{start_year}_to_{end_year}.csv"
master_df.to_csv(csv_file_name, index=False)
print(f"CSV file generated: {csv_file_name}")