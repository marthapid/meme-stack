import { Component, Input } from '@angular/core';
import { Meme } from '../meme';
import { MemeService } from '../meme.service';

@Component({
  selector: 'meme-details',
  templateUrl: './meme-details.component.html',
  styleUrls: ['./meme-details.component.css']
})

export class MemeDetailsComponent {
  @Input()
  meme: Meme;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private memeService: MemeService) {}

  createMeme(meme: Meme) {
    this.memeService.createMeme(meme).then((newMeme: Meme) => {
      this.createHandler(newMeme);
    });
  }

  updateMeme(meme: Meme): void {
    this.memeService.updateMeme(meme).then((updatedMeme: Meme) => {
      this.updateHandler(updatedMeme);
    });
  }

  deleteMeme(memeId: String): void {
    this.memeService.deleteMeme(memeId).then((deletedMemeId: String) => {
      this.deleteHandler(deletedMemeId);
    });
  }
}
