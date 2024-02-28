import pandas as pd
import numpy as np

# dictionary for mapping team names to their IDs
teams_id = {
    'atlantahawks': 1610612737, 'bostonceltics': 1610612738, 'clevelandcavaliers': 1610612739,
    'neworleanspelicans': 1610612740, 'chicagobulls': 1610612741, 'dallasmavericks': 1610612742,
    'denvernuggets': 1610612743, 'goldenstatewarriors': 1610612744, 'houstonrockets': 1610612745,
    'losangelesclippers': 1610612746, 'losangeleslakers': 1610612747, 'miamiheat': 1610612748,
    'milwaukeebucks': 1610612749, 'minnesotatimberwolves': 1610612750, 'brooklynnets': 1610612751,
    'newyorkknicks': 1610612752, 'orlandomagic': 1610612753, 'indianapacers': 1610612754,
    'philadelphia76ers': 1610612755, 'phoenixsuns': 1610612756, 'portlandtrailblazers': 1610612757,
    'sacramentokings': 1610612758, 'sanantoniospurs': 1610612759, 'oklahomacitythunder': 1610612760,
    'torontoraptors': 1610612761, 'utahjazz': 1610612762, 'memphisgrizzlies': 1610612763,
    'washingtonwizards': 1610612764, 'detroitpistons': 1610612765, 'charlottehornets': 1610612766,
}

df = pd.read_csv('nba_data_2023_to_2024.csv') # Path to your data if different year range

# Function to normalize team names to their IDs
def normalize_team_name(name):
    name = name.lower().replace(" ", "")
    return teams_id.get(name, np.nan)

# Normalize 'Team1' and 'Team2' columns to team IDs
df['Team1'] = df['Team1'].apply(normalize_team_name)
df['Team2'] = df['Team2'].apply(lambda x: x.replace('@', '').replace('vs', '').strip()).apply(normalize_team_name)

# Convert 'Date' into datetime format
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')

# Handle rows with and without scores differently
has_score = df['Score'].str.contains('-', na=False)
no_score = ~df['Score'].str.contains('-', na=False)

# Process rows with scores
df.loc[has_score, 'Score'] = df.loc[has_score, 'Score'].astype(str)
score_pattern = r'(\d{2,3})\s*[-–]\s*(\d{2,3})'
scores = df.loc[has_score, 'Score'].str.extract(score_pattern)
df.loc[has_score, 'Team1_Score'] = scores[0].astype(float)
df.loc[has_score, 'Team2_Score'] = scores[1].astype(float)

# Calculate statistics for rows with scores
df.loc[has_score, 'Win'] = (df.loc[has_score, 'Team1_Score'] > df.loc[has_score, 'Team2_Score']).astype(int)
df['Score_Difference'] = np.abs(df['Team1_Score'] - df['Team2_Score'])

# Applying default values to rows without scores
default_columns = ['Win', 'Team1_Score', 'Team2_Score', 'Score_Difference']
df.loc[no_score, default_columns] = 0

# Calculate global average scores and win ratio
df['Avg_Win_Ratio'] = df.groupby('Team1')['Win'].transform('mean')  # would be 0 for rows without scores

# Calculate similarity score for all rows
max_diff = df['Score_Difference'].max()
df['Similarity_Score'] = 1 - (df['Score_Difference'] / max_diff)

# Drop unnecessary columns
df.drop(['Score_Difference'], axis=1, inplace=True)

# Display the DataFrame
print(df.head())

# Save the DataFrame to a CSV
df.to_csv('processed_nba_data.csv', index=False)
print("Processed data saved to 'processed_nba_data_empty.csv'.")
