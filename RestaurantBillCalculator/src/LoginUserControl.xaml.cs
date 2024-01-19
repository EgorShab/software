/* using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks; */
using System.Windows;
using System.Windows.Controls;
/* using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes; */

namespace Lab3
{
    /// <summary>
    /// Interaction logic for LoginUserControl.xaml
    /// </summary>
    public partial class LoginUserControl : UserControl
    {

        public LoginUserControl()
        {
            InitializeComponent();
        }

        private void Exit_Click(object sender, RoutedEventArgs e)
        {
            System.Windows.Application.Current.Shutdown();
        }

        private void Login_Click(object sender, RoutedEventArgs e)
        {
            LoginClass loginClass = new LoginClass();


            if (userText.Text == loginClass.Username && passText.Text == loginClass.Password)
            {
               RestaurantBillCalculator billCalculator= new RestaurantBillCalculator();
                
                billCalculator.Show();
            }
            else
            {
                MessageBox.Show("Invalid username or password", "ERROR");
            }
        }
    }
}
