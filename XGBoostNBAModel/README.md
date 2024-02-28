# NBA Game Outcome Predictions

## Project Overview
This project utilizes machine learning and ensemble learning techniques to predict NBA game outcomes. By analyzing historical game data, player statistics, and team matchups, and combining predictions from various models, it aims to enhance prediction accuracy.

### Features
- Analysis of historical NBA games and player statistics.
- Data scraping for real-time game information.
- Ensemble learning to leverage multiple model predictions.
- Visualizations of model performance and feature importance.

## Installation

### Prerequisites
- Python 3.8+
- Pip for Python package installation

### Required Python Modules
Install the necessary modules using the command:

```sh
pip install requests beautifulsoup4 pandas numpy xgboost
```

### Usage
**Preparing the Environment**
1. Unzip the project files into your working directory.
1. Install all required Python modules as mentioned above.
   
**Data Preparation and Analysis**
   <ol>
  <li>Historical and Player Stats Analysis:</li>
    <ol>
      <li>Launch Jupyter Notebook/Lab in the Games_History and Player_stats_ready folders.</li>
      <li>Execute all cells in Games_History.ipynb and Player_stats.ipynb.</li>
    </ol>
  </li>
</ol>
   
### File Movement Instructions
**Before running the Python scripts, ensure the following files are moved to their correct locations:**

1. Move updated_nba_data.csv from the Games_History folder to the same directory as ".py" files.
1. Move ready_team_stats_matchup.csv from the Player_stats_ready folder to the same directory as ".py" files.
1. Move both the trained models (xgboost_history_trained_model.pkl and Team_lvl_matchup_xgboost_model.pkl) and the encoder (history_xgboost_encoder.pkl) for the historical model to the directory where 5_XGBoost_NBA_future_games_pred.py is located.
1. Running the Scripts
1. Execute the Python scripts in sequence from the project directory
