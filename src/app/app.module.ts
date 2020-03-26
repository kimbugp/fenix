import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './components';
import { ScriptComponent } from './script';
import { monacoConfig } from './script/onMonacoLoad';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ScriptsComponent } from './scripts';
import { NotAuthorized } from './authorized';

import { TableModule } from 'ngx-easy-table';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
    imports: [
        BrowserModule,
        TableModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        MonacoEditorModule.forRoot(monacoConfig),
        NgxUiLoaderModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        ScriptComponent,
        ScriptsComponent,
        NotAuthorized,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };