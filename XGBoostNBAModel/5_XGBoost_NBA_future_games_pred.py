import pandas as pd
import numpy as np
import pickle

# Function to load models and encoders
def load_model(filename):
    with open(filename, 'rb') as file:
        return pickle.load(file)

# Preprocess data with encoder for categorical features
def preprocess_data(data, encoder=None, date_column='GAME_DATE_TIMESTAMP', filter_years=[2024], categorical_features=None):
    data['GAME_DATE'] = pd.to_datetime(data[date_column], unit='s')
    data_filtered = data[data['GAME_DATE'].dt.year.isin(filter_years)]
    if encoder and categorical_features:
        data_filtered[categorical_features] = data_filtered[categorical_features].fillna('missing')
        encoded_features = encoder.transform(data_filtered[categorical_features])
        encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(), index=data_filtered.index)
        data_filtered = pd.concat([data_filtered.drop(categorical_features, axis=1), encoded_df], axis=1)
    return data_filtered

# Prepare features for prediction, excluding specified features
def prepare_features(data, features_to_exclude):
    return data.drop(columns=features_to_exclude, errors='ignore')

# Predict with model and calculate certainty
def predict_with_model(model, features):
    predictions = model.predict(features)
    probabilities = model.predict_proba(features)
    certainty = np.max(probabilities, axis=1) * 100
    return predictions, certainty

# Combine and calculate weighted certainty
def combine_predictions(row, historical_weight=0.65, team_matchup_weight=0.87):
    weighted_certainty = (row['Historical_Certainty'] * historical_weight + row['Team_Matchup_Certainty'] * team_matchup_weight) / (historical_weight + team_matchup_weight)
    return weighted_certainty

# Calculate final prediction based on individual predictions and certainty
def calculate_final_prediction(row):
    P_h, P_t = row['Historical_Prediction'], row['Team_Matchup_Prediction']
    C_h, C_t = row['Historical_Certainty'], row['Team_Matchup_Certainty']
    W_c = row['Weighted_Certainty']
    certainty_threshold = 10  # Define a threshold for "significant difference"
    significant_difference = abs(C_h - C_t) > certainty_threshold
    if P_h == P_t or significant_difference:
        return P_h if C_h > C_t else P_t
    else:
        weighted_certainty_threshold = 55  # Define what consider as leaning towards historical
        return P_h if W_c >= weighted_certainty_threshold else P_t

# Load data and models
historical_data = pd.read_csv('enriched_future_games.csv')
team_stats_data = pd.read_csv('team_lvl_future_games.csv')
historical_model = load_model("xgboost_history_trained_model.pkl") # Move from Games_history folder
team_matchup_model = load_model("team_lvl_matchup_xgboost_model.pkl") # # Move from Player_stats folder
historical_encoder = load_model("history_xgboost_encoder.pkl") # Move from Games_history folder

# Preprocess and prepare features for prediction
historical_features = preprocess_data(historical_data, historical_encoder, date_column='GAME_DATE_TIMESTAMP', categorical_features=['Type', 'OT', 'Month', 'Team1', 'Team2', 'Regular_Wins_Team1_total', 'Regular_Losses_Team1_total', 'Playoff_Wins_Team1_total', 'Playoff_Losses_Team1_total'])
features_to_predict_historical = prepare_features(historical_features, ['Win', 'Team1_Score', 'Team2_Score']).drop(columns=['GAME_DATE'], errors='ignore')

team_stats_features = preprocess_data(team_stats_data, date_column='GAME_DATE_TIMESTAMP')
features_to_predict_team_stats = prepare_features(team_stats_features, ['WL']).select_dtypes(include=['number', 'bool', 'category'])

features_to_predict_historical = features_to_predict_historical.select_dtypes(include=['number', 'bool'])
features_to_predict_team_stats = features_to_predict_team_stats.select_dtypes(include=['number', 'bool'])

# Make predictions
historical_predictions, historical_certainty = predict_with_model(historical_model, features_to_predict_historical)
team_matchup_predictions, team_matchup_certainty = predict_with_model(team_matchup_model, features_to_predict_team_stats)

# Creating DataFrames for predictions and include 'Type' in historical_predictions_df
historical_predictions_df = pd.DataFrame({
    'Timestamp': historical_data['GAME_DATE_TIMESTAMP'],
    'Team1_ID': historical_data['Team1'],
    'Team2_ID': historical_data['Team2'],
    'Type': historical_data['Type'],  # Ensure 'Type' is included here
    'Historical_Prediction': historical_predictions,
    'Historical_Certainty': historical_certainty
})

team_matchup_predictions_df = pd.DataFrame({
    'Timestamp': team_stats_data['GAME_DATE_TIMESTAMP'],
    'Team1_ID': team_stats_data['TEAM_ID'],
    'Team2_ID': team_stats_data['TEAM2_ID'],
    'Team_Matchup_Prediction': team_matchup_predictions,
    'Team_Matchup_Certainty': team_matchup_certainty
})

# Merge predictions including Type from the historical data
final_df = pd.merge(
    historical_predictions_df,
    team_matchup_predictions_df,
    on=['Timestamp', 'Team1_ID', 'Team2_ID'],
    how='inner'
)

# Calculate weighted certainty and final prediction
final_df['Weighted_Certainty'] = final_df.apply(combine_predictions, axis=1)
final_df['Final_Prediction'] = final_df.apply(calculate_final_prediction, axis=1)

final_df['Date'] = pd.to_datetime(final_df['Timestamp'], unit='s')

final_df['Final_Prediction'] = final_df['Final_Prediction'].astype(int)

# Selecting the required columns for the final output
final_output_df = final_df[['Timestamp', 'Date', 'Team1_ID', 'Team2_ID', 'Type', 'Historical_Prediction', 'Team_Matchup_Prediction', 'Weighted_Certainty', 'Final_Prediction']]

# teams_id dictionary
teams_id = {
    1610612737: 'atlantahawks', 1610612738: 'bostonceltics', 1610612739: 'clevelandcavaliers',
    1610612740: 'neworleanspelicans', 1610612741: 'chicagobulls', 1610612742: 'dallasmavericks',
    1610612743: 'denvernuggets', 1610612744: 'goldenstatewarriors', 1610612745: 'houstonrockets',
    1610612746: 'losangelesclippers', 1610612747: 'losangeleslakers', 1610612748: 'miamiheat',
    1610612749: 'milwaukeebucks', 1610612750: 'minnesotatimberwolves', 1610612751: 'brooklynnets',
    1610612752: 'newyorkknicks', 1610612753: 'orlandomagic', 1610612754: 'indianapacers',
    1610612755: 'philadelphia76ers', 1610612756: 'phoenixsuns', 1610612757: 'portlandtrailblazers',
    1610612758: 'sacramentokings', 1610612759: 'sanantoniospurs', 1610612760: 'oklahomacitythunder',
    1610612761: 'torontoraptors', 1610612762: 'utahjazz', 1610612763: 'memphisgrizzlies',
    1610612764: 'washingtonwizards', 1610612765: 'detroitpistons', 1610612766: 'charlottehornets',
}

# Convert Team1_ID and Team2_ID to their corresponding team names
final_output_df['Team1'] = final_output_df['Team1_ID'].map(teams_id)
final_output_df['Team2'] = final_output_df['Team2_ID'].map(teams_id)

# Drop the original ID columns if they are no longer needed
final_output_df.drop(['Team1_ID', 'Team2_ID'], axis=1, inplace=True)

# Adjust format of the table
columns_order = [col for col in final_output_df.columns if col not in ['Type', 'Historical_Prediction', 'Team_Matchup_Prediction', 'Weighted_Certainty', 'Final_Prediction']] + ['Type', 'Historical_Prediction', 'Team_Matchup_Prediction', 'Weighted_Certainty', 'Final_Prediction']

# Reorder the DataFrame based on columns order
df = final_output_df[columns_order]

# Show final table
print(df)

print("Saved as XGBoost_NBA_predictions.csv")

# Save the final predictions to a CSV file
df.to_csv('XGBoost_NBA_predictions.csv', index=False)
