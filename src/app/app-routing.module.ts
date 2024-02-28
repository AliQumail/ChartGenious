import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: '**', redirectTo: '/home', pathMatch: 'full' } // Redirect all other routes to /home
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }