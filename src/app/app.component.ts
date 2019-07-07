import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    ) {

    this.splashScreen.hide();
    this.statusBar.styleDefault();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }, 1000);

    });
  }
}
