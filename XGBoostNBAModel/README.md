# NBA Game Outcome Predictions

## Project Overview
This project leverages advanced machine learning techniques, including ensemble learning, to predict the outcomes of NBA games. Utilizing a rich dataset that comprises historical game data, player statistics, and team matchups, it synthesizes insights from various predictive models to offer accurate game outcome predictions.

### Key Features

- **Historical Analysis**: Dive into past NBA games to understand trends and patterns, leveraging historical data to inform future game outcomes.
- **Player Performance Metrics**: Detailed analysis of player statistics to gauge individual and collective team strengths, converting individual performances into a unified team-level metric for more accurate predictions.
- **Real-Time Data Scraping**: Automated retrieval of the latest game and player information to ensure predictions are based on the most current data available.
- **Ensemble Learning Models**: A sophisticated fusion of multiple predictive models, including XGBoost and other machine learning techniques, to enhance prediction accuracy by leveraging the strengths of each model.
- **Team Composition Analysis**: Evaluation of team compositions by analyzing player matchups, historical performance in similar compositions, and how changes in team rosters might impact game outcomes.
- **Visualization Tools**: Comprehensive graphical representation of model performance, feature influences, and prediction confidence levels to provide clear insights into the predictive process and outcomes.
- **Player to Team Conversion**: A specialized process that aggregates individual player statistics into team-level insights, allowing for a nuanced understanding of team capabilities and potential performance in upcoming games.
- **Predictive Analytics Dashboard**: An interactive dashboard that displays predictions, confidence scores, and historical data comparisons to facilitate easy interpretation of the predictions for analysts and enthusiasts alike.


## Installation Instructions

### Prerequisites
- Ensure Python 3.8 or newer.
- Pip should be available for installing Python packages.

### Required Dependencies
Execute the following command to install all necessary Python modules for the project:

```sh
pip install requests beautifulsoup4 pandas numpy xgboost
```

## Detailed Usage Guide

### Setting Up the Project

#### Initial Configuration:

- Extract the project files into a designated directory.
- Install the required Python modules as listed above.

#### Data Analysis and Preparation:

1. Navigate to the `Games_History` and `Player_stats_ready` directories.
2. Use Jupyter Notebook/Lab to open and execute all cells within `Games_History.ipynb` and `Player_stats.ipynb`.

### File Organization

Before executing the prediction scripts, it's crucial to organize the project files correctly:

#### Data Files:

- Move `updated_nba_data.csv` from `Games_History` to the directory containing the Python prediction scripts.
- Similarly, transfer `ready_team_stats_matchup.csv` from `Player_stats_ready`.

#### Machine Learning Models:

- Ensure the `xgboost_history_trained_model.pkl`, `Team_lvl_matchup_xgboost_model.pkl`, and `history_xgboost_encoder.pkl` are located in the same directory as `5_XGBoost_NBA_future_games_pred.py`.

### Executing the Prediction Pipeline

Run the Python scripts sequentially to process the data and generate predictions:

1. Start with `1_Get_future_Data.py` and continue through to `5_XGBoost_NBA_future_games_pred.py`, following any prompts or instructions provided by the scripts.

## Advanced Features

### Ensemble Learning Approach

This project distinguishes itself with an ensemble learning method, strategically combining predictions from historical data analysis and team matchup models. This approach not only improves prediction accuracy but also offers insights into the relative importance of various features affecting game outcomes.

## Model Metrics and Test Predictions

### Player Model Metrics

- **Accuracy**: 0.8694
- **Precision**: 0.8691
- **Recall**: 0.8687
- **F1 Score**: 0.8689
- **ROC AUC Score**: 0.9440

**Classification Report**:

|            | precision | recall | f1-score | support |
|------------|-----------|--------|----------|---------|
| **0**      | 0.86      | 0.86   | 0.86     | 2628    |
| **1**      | 0.87      | 0.88   | 0.88     | 2945    |
|            |           |        |          |         |
| **accuracy** |         |        | 0.87     | 5573    |
| **macro avg** | 0.87    | 0.87   | 0.87     | 5573    |
| **weighted avg** | 0.87 | 0.87   | 0.87     | 5573    |

**Confusion Matrix**: 

*Include image or table of confusion matrix here.*

**Feature Importance**:

*Include image or visualization of feature importance here.*

**Best Cross-validation Score**: 0.8648775057486033

### History Model Metrics

- **Accuracy**: 0.6239819004524887
- **ROC AUC**: 0.6795541696989962

**Classification Report**:

|            | precision | recall | f1-score | support |
|------------|-----------|--------|----------|---------|
| **0**      | 0.64      | 0.62   | 0.63     | 2268    |
| **1**      | 0.61      | 0.63   | 0.62     | 2152    |
|            |           |        |          |         |
| **accuracy** |         |        | 0.62     | 4420    |
| **macro avg** | 0.62    | 0.62   | 0.62     | 4420    |
| **weighted avg** | 0.62 | 0.62   | 0.62     | 4420    |

**Confusion Matrix**: 

*Include image or table of confusion matrix here.*

### Test Predictions for Season 2023-2024

**Output History Model**

- **Win rate percentage**: 72.00%
- **Total games**: 50 | **Wins**: 36

| Readable_GAME_DATE | Team1     | Team2     | Win | Predicted_Win | Certainty_Percentage |
|---------------------|-----------|-----------|-----|---------------|----------------------|
| 2024-01-24          | minnesota timberwolves| washington wizards| 1   | 1             | 69.93%               |
| 2023-10-27          | atlanta hawks| new york knicks| 0   | 0             | 54.78%               |
| 2024-01-23          | indiana pacers| denver nuggets| 0   | 0             | 58.74%               |
| 2023-03-14          | milwaukee bucks| phoenix suns| 1   | 1             | 50.73%               |
| 2023-01-27          | indiana pacers| milwaukee bucks| 0   | 0             | 69.97%               |
| 2023-04-02          | golden state warriors| denver nuggets| 0   | 0             | 58.77%               |
| 2023-10-29          | houston rockets| golden state warriors| 0   | 0             | 71.61%               |
| 2023-01-02          | minnesota timberwolves| denver nuggets| 1   | 0             | 71.74%               |
| 2024-01-01          | minnesota timberwolves| new york knicks| 0   | 0             | 54.68%               |
| 2024-01-03          | milwaukee bucks| indiana pacers| 0   | 1             | 61.55%               |
| 2023-02-06          | utah jazz| dallas mavericks| 0   | 1             | 63.26%               |
| 2023-12-26          | minnesota timberwolves| oklahoma city thunder| 0   | 0             | 50.36%               |
| 2023-03-17          | boston celtics| portland trail blazers| 1   | 1             | 82.77%               |
| 2023-03-28          | toronto raptors| miami heat| 1   | 0             | 51.62%               |
| 2023-04-07          | atlanta hawks| philadelphia 76ers| 0   | 0             | 65.53%               |
| 2024-02-25          | washington wizards| cleveland cavaliers| 0   | 0             | 65.53%               |
| 2023-02-26          | los angeles lakers| dallas mavericks| 1   | 1             | 55.43%               |
| 2023-12-31          | oklahoma city thunder| brooklyn nets| 1   | 1             | 65.91%               |
| 2023-11-28          | golden state warriors| sacramento kings| 0   | 0             | 51.30%               |
| 2023-04-20          | brooklyn nets| philadelphia 76ers| 0   | 0             | 65.97%               |
| 2024-02-15          | golden state warriors| utah jazz| 1   | 1             | 64.20%               |
| 2023-12-06          | houston rockets| oklahoma city thunder| 1   | 0             | 56.80%               |
| 2023-02-12          | memphis grizzlies| boston celtics| 0   | 0             | 69.30%               |
| 2023-12-11          | cleveland cavaliers| orlando magic| 0   | 0             | 51.05%               |
| 2023-03-20          | utah jazz| sacramento kings| 1   | 0             | 64.75%               |
| 2023-02-03          | toronto raptors| houston rockets| 1   | 1             | 71.19%               |
| 2023-01-09          | denver nuggets| los angeles lakers| 1   | 0             | 53.39%               |
| 2023-03-02          | washington wizards| toronto raptors| 1   | 0             | 56.51%               |
| 2023-11-16          | brooklyn nets| miami heat| 0   | 0             | 56.94%               |
| 2023-03-22          | memphis grizzlies| houston rockets| 1   | 1             | 67.99%               |
| 2023-01-11          | phoenix suns| denver nuggets| 0   | 0             | 74.43%               |
| 2023-04-09          | oklahoma city thunder| memphis grizzlies| 1   | 0             | 62.61%               |
| 2024-02-05          | los angeles clippers| atlanta hawks| 1   | 1             | 53.43%               |
| 2023-12-11          | toronto raptors| new york knicks| 0   | 1             | 50.04%               |
| 2023-04-27          | boston celtics| atlanta hawks| 1   | 1             | 66.14%               |
| 2023-12-15          | atlanta hawks| toronto raptors| 1   | 0             | 54.79%               |
| 2023-02-01          | houston rockets| oklahoma city thunder| 1   | 0             | 52.79%               |
| 2023-02-23          | portland trail blazers| sacramento kings| 0   | 0             | 76.08%               |
| 2023-01-14          | minnesota timberwolves| cleveland cavaliers| 1   | 0             | 70.13%               |
| 2023-12-05          | milwaukee bucks| new york knicks| 1   | 1             | 68.01%               |
| 2024-01-10          | sacramento kings| charlotte hornets| 1   | 1             | 68.97%               |
| 2023-12-20          | los angeles lakers| chicago bulls| 0   | 1             | 52.72%               |
| 2023-05-11          | denver nuggets| phoenix suns| 1   | 1             | 58.22%               |
| 2023-04-15          | golden state warriors| sacramento kings| 0   | 0             | 50.51%               |
| 2023-01-07          | sacramento kings| los angeles lakers| 0   | 0             | 55.58%               |
| 2024-01-03          | new orleans pelicans| minnesota timberwolves| 1   | 1             | 50.67%               |
| 2023-01-27          | toronto raptors| golden state warriors| 0   | 0             | 70.41%               |
| 2023-01-28          | denver nuggets| philadelphia 76ers| 0   | 0             | 55.22%               |
| 2023-02-09          | chicago bulls| brooklyn nets| 0   | 0             | 62.10%               |
| 2023-01-08          | memphis grizzlies| utah jazz| 1   | 1             | 72.70%               |



**Output Player Stats Model**

- **Win rate percentage**: 94.00%
- **Total games**: 50 | **Wins**: 47

| Readable_GAME_DATE | TEAM_ID   | TEAM2_ID  | Real_WL | Predicted_WL | Certainty_Percentage |
|---------------------|-----------|-----------|---------|--------------|----------------------|
| 2023-04-07          | chicago bulls| dallas mavericks| 1       | 1            | 98.21%               |
| 2023-01-07          | utah jazz| chicago bulls| 0       | 0            | 82.08%               |
| 2023-11-22          | philadelphia 76ers| minnesota timberwolves| 0       | 0            | 90.16%               |
| 2023-03-05          | phoenix suns| dallas mavericks| 1       | 1            | 91.72%               |
| 2023-11-12          | charlotte hornets| new york knicks| 0       | 0            | 99.21%               |
| 2023-01-16          | miami heat| atlanta hawks| 0       | 0            | 61.64%               |
| 2023-03-14          | san antonio spurs| orlando magic| 1       | 1            | 99.73%               |
| 2023-03-25          | brooklyn nets| miami heat| 1       | 1            | 97.98%               |
| 2023-01-22          | phoenix suns| memphis grizzlies| 1       | 0            | 62.80%               |
| 2023-02-24          | atlanta hawks| cleveland cavaliers| 1       | 1            | 99.29%               |
| 2023-11-01          | denver nuggets| minnesota timberwolves| 0       | 0            | 99.55%               |
| 2023-12-08          | denver nuggets| houston rockets| 0       | 0            | 80.38%               |
| 2023-01-16          | los angeles lakers| houston rockets| 1       | 1            | 83.11%               |
| 2023-12-15          | new york knicks| phoenix suns| 1       | 1            | 99.55%               |
| 2023-01-12          | oklahoma city thunder| philadelphia 76ers| 1       | 1            | 97.15%               |
| 2023-05-01          | boston celtics| philadelphia 76ers| 0       | 0            | 80.04%               |
| 2023-03-26          | charlotte hornets| dallas mavericks| 1       | 1            | 97.77%               |
| 2023-04-04          | orlando magic| cleveland cavaliers| 0       | 1            | 74.16%               |
| 2023-11-12          | washington wizards| brooklyn nets| 0       | 0            | 95.64%               |
| 2023-12-21          | indiana pacers| memphis grizzlies| 0       | 0            | 91.90%               |
| 2023-01-04          | new orleans pelicans| houston rockets| 1       | 1            | 87.71%               |
| 2023-03-28          | new orleans pelicans| golden state warriors| 0       | 0            | 91.33%               |
| 2023-04-23          | denver nuggets| minnesota timberwolves| 0       | 0            | 89.98%               |
| 2023-01-20          | golden state warriors| cleveland cavaliers| 1       | 1            | 94.59%               |
| 2023-12-23          | milwaukee bucks| new york knicks| 1       | 1            | 99.59%               |
| 2023-01-18          | houston rockets| charlotte hornets| 0       | 0            | 92.31%               |
| 2023-02-10          | toronto raptors| utah jazz| 0       | 0            | 90.45%               |
| 2023-01-21          | orlando magic| washington wizards| 0       | 0            | 74.40%               |
| 2023-11-14          | detroit pistons| atlanta hawks| 0       | 0            | 82.49%               |
| 2023-11-24          | washington wizards| milwaukee bucks| 0       | 0            | 66.89%               |
| 2023-11-17          | utah jazz| phoenix suns| 0       | 0            | 55.73%               |
| 2023-11-20          | new york knicks| minnesota timberwolves| 0       | 0            | 94.30%               |
| 2023-02-11          | charlotte hornets| denver nuggets| 0       | 0            | 96.12%               |
| 2023-02-04          | new york knicks| los angeles clippers| 0       | 0            | 60.63%               |
| 2023-01-13          | washington wizards| new york knicks| 0       | 0            | 85.49%               |
| 2023-03-01          | oklahoma city thunder| los angeles lakers| 0       | 0            | 67.79%               |
| 2023-03-15          | boston celtics| minnesota timberwolves| 1       | 1            | 52.82%               |
| 2023-10-07          | los angeles lakers| golden state warriors| 0       | 0            | 95.98%               |
| 2023-03-31          | los angeles lakers| minnesota timberwolves| 1       | 1            | 98.44%               |
| 2023-03-15          | san antonio spurs| dallas mavericks| 0       | 0            | 92.61%               |
| 2023-01-16          | new orleans pelicans| cleveland cavaliers| 0       | 0            | 95.43%               |
| 2023-11-15          | phoenix suns| minnesota timberwolves| 1       | 1            | 90.62%               |
| 2023-04-09          | milwaukee bucks| toronto raptors| 0       | 0            | 94.17%               |
| 2023-01-26          | new york knicks| boston celtics| 1       | 1            | 72.53%               |
| 2023-11-18          | minnesota timberwolves| new orleans pelicans| 1       | 0            | 76.00%               |
| 2023-01-20          | cleveland cavaliers| golden state warriors| 0       | 0            | 80.57%               |
| 2023-03-27          | indiana pacers| dallas mavericks| 0       | 0            | 98.37%               |
| 2023-05-11          | phoenix suns| denver nuggets| 0       | 0            | 99.43%               |
| 2023-12-13          | washington wizards| new orleans pelicans| 0       | 0            | 91.76%               |
| 2023-04-02          | san antonio spurs| sacramento kings| 1       | 1            | 92.02%               |


**Note**: The win rate percentage provided here is specific to a curated set of 50 games from the 2023-2024 season and does not represent the model's general accuracy across all games or seasons. This targeted analysis is intended to showcase the model's application in real-world scenarios and its potential predictive performance on a similar subset of games.

### Model Insights

- **Model Evaluation**: Detailed confusion matrices and accuracy metrics are provided for each model, allowing for a comprehensive evaluation of performance.
- **Feature Importance Visualization**: Gain insights into which factors most significantly impact game outcomes, informing future data collection and model refinement strategies.
- **Impact of Player Statistics on Team Performance**: Analysis of how individual player stats aggregate to affect overall team performance, offering a nuanced view of player contributions beyond traditional metrics.

**Disclaimer**

Please note that predicting NBA future game outcomes and sports betting is a difficult and risky process. This project is intended for educational purposes only and is not financial advice. Always exercise caution and conduct thorough research before engaging in sports betting.
