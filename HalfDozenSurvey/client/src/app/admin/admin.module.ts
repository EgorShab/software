import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { RegisterComponent } from './register/register.component';

const routing = RouterModule.forChild([
    { path: 'register', component: RegisterComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'main', component: AdminComponent, canActivate: [AuthGuard],
        children: [
            { path: '**', redirectTo: 'book-list' }
        ]
    },
    { path: '**', redirectTo: 'auth' },
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing],
    providers: [AuthGuard],
    declarations: [AuthComponent, AdminComponent, RegisterComponent]
})
export class AdminModule {}