import { Component } from '@angular/core';

export class Meme {
  title: string;
  description: string;
  source: string;
  votes: number;
}
const MEMES: Meme[] = [
  {title: 'test', description: 'descrition text', source: 'www.test.com', votes: 0},
  {title: 'test2', description: 'descrition text2', source: 'www.test.com2', votes: 0}
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


  upvote(meme: Meme): void {
    meme.votes++;
  }
  downvote(meme: Meme): void {
    meme.votes--;
  }
}