import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './helpers';
import { ScriptsComponent } from './scripts';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'scripts', component: ScriptsComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);