using System.Windows;

namespace Lab3
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        public void WelcomeWin_Btn(object sender, RoutedEventArgs e)
        {
            LoginUserControl userControl = new LoginUserControl();

            MainWindow welcomewWin = new MainWindow();
            welcomewWin.Content = userControl;
            welcomewWin.Show();
            
        }

    }
}
