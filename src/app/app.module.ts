import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentFormService } from './service/student-form.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RegisterComponent } from './components/register/register.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from './core/auth/auth.service';
import { AuthGuard } from './core/auth/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentFormComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  entryComponents:[
    StudentFormComponent
  ],
  providers: [StudentFormService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
