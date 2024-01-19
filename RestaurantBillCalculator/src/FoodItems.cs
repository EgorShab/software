using System.Collections.Generic;

namespace Lab3
{
    internal class FoodItems
    {
        public class FoodItem
        {
            public string Name { get; set; }
            public double Price { get; set; }
            public int Quantity { get; set; }
            public string Category { get; set; }
            public string DisplayProp { get { return this.Name + "   " + this.Price + "$"; } }
        }
        public static class FoodItemInitializer
        {

            public static List<FoodItem> Beverages;
            public static List<FoodItem> Dessert;
            public static List<FoodItem> Appetizer;
            public static List<FoodItem> MainCourse;

            //fill data
            static FoodItemInitializer()
            {
                //fill beverage
                Beverages = new List<FoodItem> {
                new FoodItem{Name="Soda",Price=1.95, Category=Constants.Beverage},
                new FoodItem{Name="Tea",Price=1.50, Category=Constants.Beverage},
                new FoodItem{Name="Coffee",Price=1.25, Category=Constants.Beverage},
                new FoodItem{Name="Mineral Water",Price=2.95, Category=Constants.Beverage},
                new FoodItem{Name="Juice",Price=2.50, Category=Constants.Beverage},
                new FoodItem{Name="Milk",Price=1.50, Category=Constants.Beverage}
            };

                //fill appetizer
                Appetizer = new List<FoodItem> {
                new FoodItem{Name="Buffalo Wings",Price=5.95,Category=Constants.Appetizer},
                new FoodItem{Name="Buffalo Fingers",Price=6.95,Category=Constants.Appetizer},
                new FoodItem{Name="Potato Skins",Price=8.95,Category=Constants.Appetizer},
                new FoodItem{Name="Nachos",Price=8.95,Category=Constants.Appetizer},
                new FoodItem{Name="Mushroom Caps",Price=10.95,Category=Constants.Appetizer},
                new FoodItem{Name="Shrimp Cocktail",Price=12.95,Category=Constants.Appetizer},
                new FoodItem{Name="Chips and Salsa",Price=6.95,Category=Constants.Appetizer}
            };

                //fill main course
                MainCourse = new List<FoodItem> {
                new FoodItem{Name="Seafood Alfredo",Price=15.95,Category=Constants.MainCourse},
                new FoodItem{Name="Chicken Alfredo",Price=13.95,Category=Constants.MainCourse},
                new FoodItem{Name="Chicken Picatta",Price=13.95,Category=Constants.MainCourse},
                new FoodItem{Name="Turkey Club",Price=11.95,Category=Constants.MainCourse},
                new FoodItem{Name="Lobster Pie",Price=19.95,Category=Constants.MainCourse},
                new FoodItem{Name="Prime Rib",Price=20.95,Category=Constants.MainCourse},
                new FoodItem{Name="Shrimp Scampi",Price=18.95,Category=Constants.MainCourse},
                new FoodItem{Name="Turkey Dinner",Price=13.95,Category=Constants.MainCourse},
                new FoodItem{Name="Stuffed Chicken",Price=14.95,Category=Constants.MainCourse}
            };

                //fill dessert
                Dessert = new List<FoodItem> {
                new FoodItem{Name="Apple Pie",Price=5.95,Category=Constants.Dessert},
                new FoodItem{Name="Sundae",Price=3.95,Category=Constants.Dessert},
                new FoodItem{Name="Carrot Cake",Price=5.95,Category=Constants.Dessert},
                new FoodItem{Name="Mud Pie",Price=4.95,Category=Constants.Dessert},
                new FoodItem{Name="Apple Crisp",Price=5.95,Category=Constants.Dessert}
            };
            }
        }
    }
}
