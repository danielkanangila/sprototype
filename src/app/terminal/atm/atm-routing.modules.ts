import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../auth.guard';

import { AtmComponent } from './atm.component';
import { HomeComponent } from './home/home.component';
import { LanguageComponent } from './language/language.component';
import { LoginIdComponent } from './login-id/login-id.component';
import { LoginPinComponent } from './login-pin/login-pin.component';
import { AmountComponent } from './transactions/amount/amount.component';
import { DepositComponent } from './transactions/deposit/deposit.component';
import { WithdrawalComponent } from './transactions/withdrawal/withdrawal.component';
import { FeedbackComponent } from './transactions/feedback/feedback.component';
import { OrangeComponent } from './banks/orange/orange.component';
import { UnavaibleComponent } from './banks/unavaible/unavaible.component';

const atmRoutes: Routes = [
    {
        path: 'terminal/atm',
        component: AtmComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'login-id', component: LoginIdComponent },
            { path: 'login-pin', component: LoginPinComponent },
            { path: 'set-amount', component: AmountComponent },
            { path: 'deposit', component: DepositComponent },
            { path: 'withdrawal', component: WithdrawalComponent },
            { path: 'feedback/:', component: FeedbackComponent },
            { path: 'bank/orange', component: OrangeComponent },
            { path: 'bank/unavailable', component: UnavaibleComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(atmRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class AtmRoutingModule {}
