import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './guards/auth-guard.service';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';

import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { CommentsComponent } from './comments/comments.component';
import { TaskComponent } from './task/task.component';
import { TicketComponent } from './ticket/ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkOrderComponent } from './work-order/work-order.component';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      }
      ,
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'comments',
        component: CommentsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'task',
        component: TaskComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ticket',
        component: TicketComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'workOrder',
        component: WorkOrderComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
