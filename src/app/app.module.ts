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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentFormComponent
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
    HttpClientModule
  ],
  entryComponents:[
    StudentFormComponent
  ],
  providers: [StudentFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
