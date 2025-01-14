import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AdminModule } from './views/admin/admin.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './views/services/auth-interceptor.service';
import { RegisterComponent } from './views/shared/register/register.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { EmployeeTasksComponent } from './views/employee-tasks/employee-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RegisterPageComponent,
    EmployeeTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule, // Importation du module Admin
    HttpClientModule,
    FormsModule,
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
