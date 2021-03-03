import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {AppRoutingModule, routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SocialLoginModule, SocialAuthServiceConfig,
  FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './shared/material/material.module';
import {AdminDashboardComponent} from './components/admin/admin-dashboard/admin-dashboard.component';
import {AirlineDashboardComponent} from './components/airline/airline-dashboard/airline-dashboard.component';
import {SharedModule} from './shared/shared.module';
import {AirlineModule} from './components/airline/airline.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// eslint-disable-next-line new-cap
@NgModule({
  declarations: [
    AppComponent,
    AirlineDashboardComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    CoreModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    SharedModule,
    AirlineModule,
    ServiceWorkerModule.register(
        'ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
            // eslint-disable-next-line max-len
            '753225811123-5bm8ua2b39ronkfhphcv9g36euek2vtv.apps.googleusercontent.com',
        ),
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('230689924769090'),
      }],
    } as SocialAuthServiceConfig,
  },
  [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {}
