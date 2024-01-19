//using System;
using System.Collections.Generic;
//using System.Collections.ObjectModel;
//using System.ComponentModel;
//using System.Data;
using System.Diagnostics;
using System.Linq;
/* using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Transactions; */
using System.Windows;
using System.Windows.Controls;
/* using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes; */
using static Lab3.FoodItems;

namespace Lab3
{
    /// <summary>
    /// Interaction logic for RestaurantBillCalculator.xaml
    /// </summary>
    public partial class RestaurantBillCalculator : Window
    {
        public RestaurantBillCalculator()
        {
            InitializeComponent();
            beverageComboBox.ItemsSource = FoodItems.FoodItemInitializer.Beverages;
            beverageComboBox.DisplayMemberPath = "DisplayProp";

            appetizerCB.ItemsSource = FoodItemInitializer.Appetizer;
            appetizerCB.DisplayMemberPath = "DisplayProp";

            mainCourseCBO.ItemsSource = FoodItems.FoodItemInitializer.MainCourse;
            mainCourseCBO.DisplayMemberPath = "DisplayProp";

            dessertCBO.ItemsSource = FoodItems.FoodItemInitializer.Dessert;
            dessertCBO.DisplayMemberPath = "DisplayProp";

            MessageBox.Show("Select item(s) you want to add and click 'add items' button.", "Attention");

        }



        List<FoodItem> selectedItems2 = new List<FoodItem>();

        private double total;
        private double tax;
        private double subTotal;

        private void beverageComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

            //selected item
            var a = beverageComboBox.SelectedItem as FoodItem;

            // if list not contains selected item in beverages
            if (!selectedItems2.Contains(a))
            {

                selectedItems2.Add(a);

                a.Quantity -= 1;

                if (a.Quantity == 0)
                    a.Quantity += 1;
            }

            // if list contains selected item in beverages
            if (selectedItems2.Contains(a))
            {
                a.Quantity += 1;

                if (a.Quantity == 0)
                    a.Quantity += 1;
            }
        }

        private void appetizerCB_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

            var b = appetizerCB.SelectedItem as FoodItem;

            // if list not contains selected item in appetizer
            if (!selectedItems2.Contains(b))
            {

                selectedItems2.Add(b);

                b.Quantity -= 1;

                if (b.Quantity == 0)
                    b.Quantity += 1;
            }

            // if list contains selected item in appetizer
            if (selectedItems2.Contains(b))
            {
                b.Quantity += 1;

                if (b.Quantity == 0)
                    b.Quantity += 1;
            }
        }


        private void mainCourseCBO_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var c = mainCourseCBO.SelectedItem as FoodItem;

            // if list not contains selected item in main course
            if (!selectedItems2.Contains(c))
            {

                selectedItems2.Add(c);

                c.Quantity -= 1;

                if (c.Quantity == 0)
                    c.Quantity += 1;
            }

            // if list contains selected item in main course
            if (selectedItems2.Contains(c))
            {
                c.Quantity += 1;

                if (c.Quantity == 0)
                    c.Quantity += 1;
            }
        }

        private void dessertCBO_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var d = dessertCBO.SelectedItem as FoodItem;

            // if list not contains selected item in dessert
            if (!selectedItems2.Contains(d))
            {

                selectedItems2.Add(d);
                d.Quantity -= 1;

                if (d.Quantity == 0)
                    d.Quantity += 1;
            }

            // if list contains selected item in dessert
            if (selectedItems2.Contains(d))
            {
                d.Quantity += 1;

                if (d.Quantity == 0)
                    d.Quantity += 1;
            }

        }


        public void Button_Click(object sender, RoutedEventArgs e)
        {
            txtSubTotal.Visibility = Visibility.Hidden;
            txtTotal.Visibility = Visibility.Hidden;
            txtTax.Visibility = Visibility.Hidden;
            dataGrid.ItemsSource = selectedItems2.ToList();
            dataGrid.Columns.Last().Visibility = Visibility.Collapsed;
        }

        private void ClrBtn_Click(object sender, RoutedEventArgs e)
        {
            selectedItems2.Clear();
            dataGrid.ItemsSource = selectedItems2;

            dataGrid.Columns.Last().Visibility = Visibility.Collapsed;
        }

        private void TotalBillBtn_Click(object sender, RoutedEventArgs e)
        {

            total = 0.0;
            tax = 0.0;
            subTotal = 0.0;

            //SubTotal
            foreach (var item in selectedItems2)
            {
                subTotal += item.Price;
            }

            //Total calc
            foreach (var item in selectedItems2)
            {

                total += (((item.Price) / 100) * 13) + item.Price;

            }

            //Tax calc
            foreach (var item in selectedItems2)
            {
                tax += ((item.Price) / 100) * 13;
            }

            txtTax.Visibility = Visibility.Visible;
            txtTotal.Visibility = Visibility.Visible;
            txtSubTotal.Visibility = Visibility.Visible;

            txtSubTotal.Text = ("SUBTOTAL: " + subTotal.ToString("0.00") + "$");
            txtTax.Text = ("Taxes: " + tax.ToString("0.00") + "$");
            txtTotal.Text = ("Total: " + total.ToString("0.00") + "$");


        }

        private void Web_Btn_Click(object sender, RoutedEventArgs e)
        {
            var WebURL = new ProcessStartInfo
            {
                FileName = Constants.CollegeUrl,
                UseShellExecute = true
            };
            Process.Start(WebURL);
        }

        private void RmSelect_Click(object sender, RoutedEventArgs e)
        {
            var a = beverageComboBox.SelectedItem as FoodItem;
            var b = appetizerCB.SelectedItem as FoodItem;
            var c = mainCourseCBO.SelectedItem as FoodItem;
            var d = dessertCBO.SelectedItem as FoodItem;


            if (selectedItems2.Contains(a))
            {
                if (a.Quantity == 1)
                    selectedItems2.Remove(a);
                else
                    a.Quantity -= 1;
            }

            //duplicate a
            if (selectedItems2.Contains(a))
            {
                if (a.Quantity == 1)
                    selectedItems2.Remove(a);



                else
                    a.Quantity -= 1;
            }

            //original b
            if (selectedItems2.Contains(b))
            {
                if (b.Quantity == 1)
                    selectedItems2.Remove(b);

                else
                    a.Quantity -= 1;
            }


            //duplicate b
            if (selectedItems2.Contains(b))
            {
                if (b.Quantity == 1)
                    selectedItems2.Remove(b);



                else
                    b.Quantity -= 1;
            } 


            //original c
            if (selectedItems2.Contains(c))
            {
                if (c.Quantity == 1)
                    selectedItems2.Remove(c);

                else
                    c.Quantity -= 1;
            }


            //duplicate c
            if (selectedItems2.Contains(c))
            {
                if (c.Quantity == 1)
                    selectedItems2.Remove(c);



                else
                    c.Quantity -= 1;
            } 


            //original d
            if (selectedItems2.Contains(d))
            {
                if (d.Quantity == 1)
                    selectedItems2.Remove(d);

                else
                    d.Quantity -= 1;
            }


            //duplicate d
            if (selectedItems2.Contains(d))
            {
                if (d.Quantity == 1)
                    selectedItems2.Remove(d);



                else
                    d.Quantity -= 1;
            } 

            dataGrid.ItemsSource = selectedItems2.ToList();
            dataGrid.Columns.Last().Visibility = Visibility.Collapsed;
        }

        private void ext_Click(object sender, RoutedEventArgs e)
        {
            System.Windows.Application.Current.Shutdown();
        }
    }
}
