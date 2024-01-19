using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Lab3
{
    internal class LoginClass
    {
        public readonly string userVal = "user"; 
        public readonly string passVal = "pass"; 

        public string Username
        {
            get { return userVal; }
        }

        public string Password
        {
            get { return passVal; }
        }
    }
}
