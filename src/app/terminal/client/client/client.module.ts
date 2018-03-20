import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ClientService } from './../client.service';
import { ClientDataService } from './../client-data.service';
import { ComponentsGuard } from './../components.guard';

// ATM ROUTER MODULE
import { ClientRoutingModule } from './../routing/client-routing.module';

// COMPONENTS
import { ClientComponent } from './../client.component';
import { UssdEmulatorComponent } from './../ussd-emulator/ussd-emulator.component';
import { LoginComponent } from './../login/login.component';
import { SignupComponent } from './../signup/signup.component';
import { AccountComponent } from './../account/account.component';
import { ToolbarComponent } from './../toolbar/toolbar.component';
import { AboutComponent } from './../about/about.component';
import { LogoutComponent } from './../logout/logout.component';
import { TransactionsListComponent } from './../transactions-list/transactions-list.component';
import { AddAccountComponent } from './../add-account/add-account.component';
import { HomeComponent } from './../home/home.component';
import { WalletComponent } from './../wallet/wallet.component';

import { TokenComponent } from './../wallet/tokens.component';
import { OnPendingTransactionsComponent } from './../wallet/on-pending-transactions.component';
import { FormatCurrency } from './../format-currency.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ClientComponent,
    AccountComponent,
    UssdEmulatorComponent,
    AboutComponent,
    LogoutComponent,
    LoginComponent,
    SignupComponent,
    ToolbarComponent,
    TransactionsListComponent,
    AddAccountComponent,
    HomeComponent,
    WalletComponent,
    OnPendingTransactionsComponent,
    FormatCurrency,
    TokenComponent
  ],
  providers: [ClientService, ComponentsGuard, ClientDataService]
})
export class ClientModule {}
