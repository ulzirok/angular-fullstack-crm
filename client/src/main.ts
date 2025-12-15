import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';


import 'materialize-css/dist/js/materialize.js'

platformBrowser().bootstrapModule(AppModule, {
  
})
  .catch(err => console.error(err));
