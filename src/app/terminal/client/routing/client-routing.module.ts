import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../../../auth.guard';
import { ComponentsGuard } from './../components.guard';

import { ClientComponent } from './../client.component';
import { LoginComponent } from './../login/login.component';
import { SignupComponent } from './../signup/signup.component';

import { HomeComponent } from './../home/home.component';
import { AccountComponent } from './../account/account.component';
import { UssdEmulatorComponent } from './../ussd-emulator/ussd-emulator.component';
import { AboutComponent } from './../about/about.component';
import { LogoutComponent } from './../logout/logout.component';
import { AddAccountComponent } from './../add-account/add-account.component';
import { WalletComponent } from './../wallet/wallet.component';

const clientRoutes: Routes = [
    {
        path: 'terminal/client',
        component: ClientComponent,
        canActivate: [ComponentsGuard],
        children: [
            {
                path: '',
                canActivate: [ComponentsGuard],
                canActivateChild: [AuthGuard, ComponentsGuard],
                children: [
                    { path: 'wallet', component: WalletComponent },
                    { path: 'ussd-emulator', component: UssdEmulatorComponent },
                    { path: 'about', component: AboutComponent },
                    { path: 'logout', component: LogoutComponent },
                    { path: 'add-account', component: AddAccountComponent },
                ],
            },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: SignupComponent },
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(clientRoutes)
  ],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
