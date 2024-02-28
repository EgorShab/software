import pandas as pd
import numpy as np

# Load CSV files
df1 = pd.read_csv('processed_nba_data.csv')
df2 = pd.read_csv('updated_nba_data.csv')  # Move updated_nba_data.csv from Games_history folder

# Convert 'Date' columns to datetime for easier comparison
df1['Date'] = pd.to_datetime(df1['Date'])
df2['Year'] = df2['Year'].astype(str)
df2['Month'] = df2['Month'].astype(str).str.zfill(2)
df2['Day'] = df2['Day'].astype(str).str.zfill(2)
df2['Date'] = pd.to_datetime(df2['Year'] + '-' + df2['Month'] + '-' + df2['Day'])

# Find future games (rows with empty score) in df1
future_games = df1[df1['Score'].isna() | (df1['Score'] == '')]

# Function to find the closest match in df2 based on Date, Team1, and Team2
def find_closest_match(row):
    same_teams = df2[(df2['Team1'] == row['Team1']) & (df2['Team2'] == row['Team2'])]
    if same_teams.empty:
        return pd.Series(index=df2.columns)
    # Calculate the absolute difference in days and find the row with the minimum difference
    same_teams['date_diff'] = (same_teams['Date'] - row['Date']).abs()
    closest_row = same_teams.loc[same_teams['date_diff'].idxmin()]
    return closest_row

# Apply the function to future games
matches = future_games.apply(find_closest_match, axis=1)

# Prepare the final table with headers as in df2
final_table = future_games.copy()
final_table = final_table.reindex(columns=df2.columns)

# Update the final table with values from matches
for col in ['Avg_Win_Ratio', 'Similarity_Score', 'Avg_Score_Diff', 'Regular_Wins_Team1_total', 'Regular_Losses_Team1_total', 'Playoff_Wins_Team1_total', 'Playoff_Losses_Team1_total']:
    final_table[col] = matches[col]

# Convert 'Date' column to datetime format
final_table['Date'] = pd.to_datetime(final_table['Date'])

# Extract Year, Month, and Day from the 'Date' column
final_table['Year'] = final_table['Date'].dt.year
final_table['Month'] = final_table['Date'].dt.month
final_table['Day'] = final_table['Date'].dt.day

# Convert 'Date' to Unix timestamp
final_table['GAME_DATE_TIMESTAMP'] = final_table['Date'].astype(np.int64) // 10**9

# Show the table
print(final_table)

# Save the final table to a new CSV file
final_table.to_csv('enriched_future_games.csv', index=False)
