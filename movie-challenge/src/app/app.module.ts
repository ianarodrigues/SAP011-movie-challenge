import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/commons/menu/menu.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { MovieDetailsModule } from './components/pages/movie-details/movie-details.module';
import { TmdbService } from './services/tmdb/tmdb.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, MenuComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MovieDetailsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule, 
  ],
  providers: [TmdbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
