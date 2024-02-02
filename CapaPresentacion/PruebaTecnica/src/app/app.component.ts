import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Api } from './Servicios/Api.service';
import {AngularFireAnalytics, AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {AngularFireModule} from "@angular/fire/compat";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFireAnalyticsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PruebaTecnica';

  usuarios: any;

  constructor(//analytics: AngularFireAnalytics,
    private _api: Api){
      //analytics.logEvent('app_open', {"component": "AppComponent"});
    }

  ngOnInit() {
    this._api.validarToken(()=>{});
  }
}
