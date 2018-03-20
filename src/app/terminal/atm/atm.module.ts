import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatOutput } from './../pad/format-output';

import { AtmRoutingModule } from './atm-routing.modules';
import { AtmService } from './atm.service';

// COMPONENTS MODULES
import { AtmComponent } from './atm.component';
import { HomeComponent } from './home/home.component';
import { LanguageComponent } from './language/language.component';
import { LoginIdComponent } from './login-id/login-id.component';
import { LoginPinComponent } from './login-pin/login-pin.component';
import { AlertComponent } from './transactions/alert/alert.component';
import { AmountComponent } from './transactions/amount/amount.component';
import { DepositComponent } from './transactions/deposit/deposit.component';
import { FeedbackComponent } from './transactions/feedback/feedback.component';
import { WithdrawalComponent } from './transactions/withdrawal/withdrawal.component';
import { EndTransactionComponent } from './end-transaction/end-transaction.component';
import { OrangeComponent } from './banks/orange/orange.component';
import { UnavaibleComponent } from './banks/unavaible/unavaible.component';
import { PadComponent } from '../pad/pad.component';
import { LoaderComponent } from './loader.component';
import { KeyboardComponent } from './../keyboard/keyboard.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AtmRoutingModule
    ],
    declarations: [
        AtmComponent,
        HomeComponent,
        LanguageComponent,
        LoginIdComponent,
        LoginPinComponent,
        AlertComponent,
        AmountComponent,
        DepositComponent,
        FeedbackComponent,
        WithdrawalComponent,
        EndTransactionComponent,
        OrangeComponent,
        UnavaibleComponent,
        PadComponent,
        LoaderComponent,
        FormatOutput,
        KeyboardComponent
    ],
    providers: [AtmService]
})
export class AtmModule {}
