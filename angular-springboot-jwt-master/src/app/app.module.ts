import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {AgGridModule} from "ag-grid-angular/main";

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';

import {UserService} from './services/user.service';
import {AuthenticationService} from './services/authentication.service';
import {AuthGuard} from './guards/auth-guard.service';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {TOKEN_NAME} from './services/auth.constant';
import {AppDataService} from './services/app-data.service';
import { RegisterComponent } from './register/register.component';
import {AlertService} from './services/alert.service';

import { HeaderComponent } from './header/header.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { FooterComponent } from './footer/footer.component';
import { CommentsComponent } from './comments/comments.component';
import { TaskComponent } from './task/task.component';
import { TicketComponent } from './ticket/ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { OrderService } from './services/order.service';
import { WorkOrderComponent } from './work-order/work-order.component';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    FooterComponent,
    CommentsComponent,
    TaskComponent,
    TicketComponent,
    DashboardComponent,
    MyGridApplicationComponent,
    WorkOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    AuthenticationService,
    UserService,
    AuthGuard,
    AdminAuthGuard,
    AppDataService,
    OrderService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
