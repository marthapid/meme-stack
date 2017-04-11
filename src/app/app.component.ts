import { Component } from '@angular/core';

export class Meme {
  title: string;
  description: string;
  source: string;
  votes: number;
  isExpanded: boolean;
}
const MEMES: Meme[] = [
  {title: 'F1rst M3m3', description: 'descrition text', source: 'https://qph.ec.quoracdn.net/main-qimg-9af90ee3bf270ab4f98528e5bfccd5bb-c', votes: 0, isExpanded: false},
  {title: 'test2', description: 'descrition text2', source: 'www.test.com2', votes: 0, isExpanded: false}
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

  upvote(event: any, meme: Meme): void {
    event.stopPropagation();
    meme.votes++;
  }
  downvote(event: any, meme: Meme): void {
    event.stopPropagation();
    meme.votes--;
  }

  toggleExpanded(meme: Meme): void {
    meme.isExpanded = !meme.isExpanded;
  }
}