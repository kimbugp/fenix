import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './helpers';
import { ScriptComponent} from './script';
import { ScriptsComponent } from './scripts';
import { NotAuthorized } from './authorized';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'scripts/:id', component: ScriptComponent, canActivate: [AuthGuard] },
    { path: 'scripts', component: ScriptsComponent, canActivate: [AuthGuard] },
    { path: '403', component: NotAuthorized},

    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);