using System;
using System.Linq;
using System.Windows;
using System.Windows.Controls;

namespace TicTacToe
{
    public partial class MainWindow : Window
    {
        private bool isUserVsComputerMode = false;
        private int playerTurn;
        private int playerOWin;
        private int playerXWin;
        private Random random = new Random();

        public MainWindow()
        {
            InitializeComponent();
            UpdatePlayerTurnLabel();
        }

        private void UpdatePlayerTurnLabel()
        {
            if (playerTurn == 1)
            {
                CurrentPlayerLabel.Content = "Current Player: X";
            }
            else
            {
                CurrentPlayerLabel.Content = "Current Player: O";
            }
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            playerTurn = 1;  // X starts first
        }

        private bool Equals(object content, string value)
        {
            return content != null && content.ToString() == value;
        }

        private bool IsDraw()
        {
            foreach (Button btn in wrapPanel.Children)
            {
                if (btn.IsEnabled)
                {
                    return false;
                }
            }
            return true;
        }

        private void DisableButtons()
        {
            foreach (Button btn in wrapPanel.Children)
            {
                btn.IsEnabled = false;
            }
        }

        private bool IsWinningCondition(string playerSymbol)
        {
            return (Equals(A1.Content, playerSymbol) && Equals(B1.Content, playerSymbol) && Equals(C1.Content, playerSymbol))
               || (Equals(A1.Content, playerSymbol) && Equals(A2.Content, playerSymbol) && Equals(A3.Content, playerSymbol))
               || (Equals(A1.Content, playerSymbol) && Equals(B2.Content, playerSymbol) && Equals(C3.Content, playerSymbol))
               || (Equals(B1.Content, playerSymbol) && Equals(B2.Content, playerSymbol) && Equals(B3.Content, playerSymbol))
               || (Equals(C1.Content, playerSymbol) && Equals(C2.Content, playerSymbol) && Equals(C3.Content, playerSymbol))
               || (Equals(A2.Content, playerSymbol) && Equals(B2.Content, playerSymbol) && Equals(C2.Content, playerSymbol))
               || (Equals(A3.Content, playerSymbol) && Equals(B3.Content, playerSymbol) && Equals(C3.Content, playerSymbol))
               || (Equals(C1.Content, playerSymbol) && Equals(B2.Content, playerSymbol) && Equals(A3.Content, playerSymbol));
        }

        private void ResetGame()
        {
            foreach (Button btn in wrapPanel.Children)
            {
                btn.Content = string.Empty;
                btn.IsEnabled = true;
            }
            playerTurn = 1;  
            UpdatePlayerTurnLabel();
        }

        private void PlayAgain_Click(object sender, RoutedEventArgs e)
        {
            foreach (Button btn in wrapPanel.Children)
            {
                btn.Content = "";
                btn.IsEnabled = true;

            }
        }

        private void ResetScore_Click(object sender, RoutedEventArgs e)
        {
            playerOWin = 0;
            playerXWin = 0;
            LblOScore.Content = 0;
            LblXScore.Content = 0;
        }

        private void Exit_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Button clickedButton = sender as Button;
            if (clickedButton != null && clickedButton.IsEnabled)
            {
                if (isUserVsComputerMode && playerTurn == 2)
                {
                    // In Player vs Computer mode, ignore clicks when it's the computer's turn
                    return;
                }

                clickedButton.Content = playerTurn == 1 ? "X" : "O";
                clickedButton.IsEnabled = false;

                CheckGameStatus(clickedButton.Content.ToString());

                if (isUserVsComputerMode)
                {
                    // In Player vs Computer mode, immediately make the computer's move
                    MakeComputerMove();
                }
                else
                {
                    // Switch turn in Player vs Player mode
                    playerTurn = playerTurn == 1 ? 2 : 1;
                    UpdatePlayerTurnLabel();
                }
            }
        }

        private void MakeComputerMove()
        {
            // Determine which spaces on the board are still available for a move. Chech for enabled buttons using LINQ.
            var availableButtons = wrapPanel.Children.OfType<Button>().Where(b => b.IsEnabled).ToList();
            if (availableButtons.Count > 0)
            {
                int index = random.Next(availableButtons.Count);
                Button computerButton = availableButtons[index];
                computerButton.Content = "O";
                computerButton.IsEnabled = false;
                CheckGameStatus(computerButton.Content.ToString());

                // Switch turn back to player
                playerTurn = 1;
                UpdatePlayerTurnLabel();
            }
        }

        private void CheckGameStatus(string playerSymbol)
        {
            if (IsWinningCondition(playerSymbol))
            {
                MessageBox.Show("Player " + playerSymbol + " is the winner!", "Victory");
                if (playerSymbol == "O")
                {
                    playerXWin++;
                    LblXScore.Content = playerXWin.ToString();
                }
                else
                {
                    playerOWin++;
                    LblOScore.Content = playerOWin.ToString();
                }
                DisableButtons();
            }
            else if (IsDraw())
            {
                MessageBox.Show("It's a draw!", "Game Over");
                DisableButtons();
            }
        }

        private void ModeSwitchButton_Click(object sender, RoutedEventArgs e)
        {
            isUserVsComputerMode = !isUserVsComputerMode;
            ModeSwitchButton.Content = isUserVsComputerMode ? "Player vs Player" : "Player vs Computer";
            ResetGame();
        }
    }
}
