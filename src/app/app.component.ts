import { Component } from '@angular/core';

export class Meme {
  title: string;
  description: string;
  url: string;
}
const MEMES: Meme[] = [
  {title: 'test', description: 'descrition text', url: 'www.test.com'},
  {title: 'test2', description: 'descrition text2', url: 'www.test.com2'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
              '../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AppComponent {
  title = 'app works!';
  memes = MEMES;
}
