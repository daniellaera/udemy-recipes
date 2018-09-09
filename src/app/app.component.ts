import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCe8l8a-Eo3fdSIqGI4-235UrMrlNVbvy4',
      authDomain: 'ng-recipes-45a08.firebaseapp.com',
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
