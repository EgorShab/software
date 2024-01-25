# Restaurant Bill Calculator

### Overview
Restaurant Bill Calculator is an intricately designed WPF (Windows Presentation Foundation) application, developed in C#, tailored for efficient restaurant management. This project is an embodiment of the Model-View-ViewModel (MVVM) architectural pattern, ensuring a clear separation of the graphical user interface from the business logic. This dual-layered approach integrates both front-end and back-end aspects, offering a comprehensive solution for handling various restaurant operations, from order management to bill processing. Emphasis is placed on user-friendly interaction, robust data handling, and responsive design, making it a good tool for a modern restaurant.

### Key Features
- **Order Management System:** Streamlined interface for placing and updating food orders.
- **User Authentication and Role Management:** Login system could be extended to accommodate differentiated access levels for staff, chefs, and managers in future enhancements.
- **Dynamic Bill Calculator:** Automated bill generation with real-time updates based on order changes.
- **Menu Management:** Empowers users to actively engage with the restaurant's menu by adding their preferred items, making edits to their selections, and conveniently viewing item prices.

### Interface and Functionality
Main Application Window
<div align="center">
  The central hub of the application, featuring a user-friendly dashboard that grants access to all major functionalities, including order placement, menu management, and sales reports.<br></br>
  <img src="MainApplicationWindow.png" alt="Lab3 Main Application Window" width="90%"/> 
</div>
Secure Login Interface
<div align="center">
  A meticulously designed login interface ensuring secure access, with role-based authentication for different types of users such as waitstaff, chefs, and administrators.<br></br>
  <img src="SecureLoginInterface.png" alt="Lab3 Secure Login Interface" width="90%"/> 
</div>
Restaurant Bill Calculator Interface
<div align="center">
  An intuitive and efficient bill calculator interface, allowing for quick and error-free bill generation, enhancing customer checkout experience.<br></br>
  <img src="BillCalculatorInterface.png" alt="Lab3 Restaurant Bill Calculator Interface" width="90%"/> 
</div>

<!-- ### Technologies and Architectural Pattern -->
### Application Framework and Architectural Pattern
- **WPF & C#:** Utilization of Windows Presentation Foundation and C# for constructing a dynamic desktop application.
- **MVVM Pattern:** Implementation of the Model-View-ViewModel pattern, ensuring separation of UI, business logic, and data modeling, resulting in a more maintainable and testable codebase.

### UI Design and Responsiveness
- **XAML:** Leveraging XAML for designing an aesthetically pleasing and functional user interface.
- **Data Binding:** Extensive use of data binding, a hallmark of the MVVM pattern, for real-time UI updates and synchronization with underlying data.

### Project Structure and Components
- **Constants.cs:** This file holds constant values used globally across the application, promoting code reusability and maintainability.
- **FoodItems.cs:** A class dedicated to the management of food items, pivotal for order and menu management.
- **LoginClass.cs:** Manages user authentication, a fundamental aspect of the application ensuring secure access to the system.
- **LoginUserControl.xaml & LoginUserControl.xaml.cs:** These files define the user control for login, handling the user interface and interactions for user authentication.
- **MainWindow.xaml & MainWindow.xaml.cs:** The main window of the application, acting as the primary interface for user interaction and navigation.
- **RestaurantBillCalculator.xaml & RestaurantBillCalculator.xaml.cs:** Dedicated interface components for calculating and managing restaurant bill.
