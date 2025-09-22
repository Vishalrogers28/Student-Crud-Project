import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // import this

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // give HttpClient via providers
    // any other providers you need
  ]
})
.catch(err => console.error(err));
