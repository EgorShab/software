import pandas as pd
import numpy as np

# Load CSV files
csv1 = pd.read_csv('enriched_future_games.csv')
csv2 = pd.read_csv('ready_team_stats_matchup.csv') # Move ready_team_stats_matchup.csv from Player_stats folder

# Rename columns in csv1 for consistency with csv2
csv1.rename(columns={'Team1': 'TEAM_ID', 'Team2': 'TEAM2_ID'}, inplace=True)

# Ensure GAME_DATE_TIMESTAMP is the correct data type
csv1['GAME_DATE_TIMESTAMP'] = pd.to_datetime(csv1['GAME_DATE_TIMESTAMP'], unit='s')
csv2['GAME_DATE_TIMESTAMP'] = pd.to_datetime(csv2['GAME_DATE_TIMESTAMP'], unit='s')

# Get the maximum SEASON_ID from CSV 2 for later use
max_season_id = csv2['SEASON_ID'].max()

# Create a new DataFrame with the structure of csv2 but with rows from csv1
new_table = pd.DataFrame(index=csv1.index, columns=csv2.columns)

# Set SEASON_ID to the max value for all rows
new_table['SEASON_ID'] = max_season_id

# Function to find the closest match in csv2
def find_closest_match(row):
    # Filter rows in csv2 by TEAM_ID and TEAM2_ID
    matches = csv2[(csv2['TEAM_ID'] == row['TEAM_ID']) & (csv2['TEAM2_ID'] == row['TEAM2_ID'])]
    if not matches.empty:
        # Avoid SettingWithCopyWarning by using a temporary variable for time differences
        time_diffs = np.abs((matches['GAME_DATE_TIMESTAMP'] - row['GAME_DATE_TIMESTAMP']).dt.total_seconds())
        # Find the index of the row with the smallest time difference
        closest_idx = time_diffs.idxmin()
        return matches.loc[closest_idx]
    return pd.Series()

# Iterate over rows in csv1 to populate new_table with matched data from csv2
for index, row in csv1.iterrows():
    match = find_closest_match(row)
    if not match.empty:
        new_table.loc[index] = match
    # Ensure GAME_DATE_TIMESTAMP from csv1 is used
    new_table.at[index, 'GAME_DATE_TIMESTAMP'] = int(row['GAME_DATE_TIMESTAMP'].timestamp())

# Show the table
print(new_table)

# Save the new table to a CSV file
new_table.to_csv('team_lvl_future_games.csv', index=False)  
print("New table has been saved successfully.")