import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'ebank-realm',
        clientId: 'slimi-client'
      },
      initOptions: {
        //sso single sign cad s'authentifier une seul fois pour acceder a plusieur app
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}
@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    ProductsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [ {provide: APP_INITIALIZER, deps: [KeycloakService], useFactory: initializeKeycloak, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
