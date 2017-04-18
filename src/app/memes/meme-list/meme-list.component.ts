import { Component, OnInit } from '@angular/core';
import { Meme } from '../meme';
import { MemeService } from '../meme.service';
import { MemeDetailsComponent } from '../meme-details/meme-details.component';

@Component({
  selector: 'meme-list',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.css'],
  providers: [MemeService]
})

export class MemeListComponent implements OnInit {

  memes: Meme[]
  selectedMeme: Meme

  constructor(private memeService: MemeService) { }

  ngOnInit() {
     this.memeService
      .getMemes()
      .then((memes: Meme[]) => {
        this.memes = memes;
      });
  }

  private getIndexOfMeme = (memeId: String) => {
    return this.memes.findIndex((meme) => {
      return meme._id === memeId;
    });
  }

  selectMeme(meme: Meme) {
    this.selectedMeme = meme
  }

  createNewMeme() {
    var meme: Meme = {
      title: '',
      description: '',
      source: '',
      votes: 0
    };

    // By default, a newly-created meme will have the selected state.
    this.selectMeme(meme);
  }

  deleteMeme = (memeId: String) => {
    var idx = this.getIndexOfMeme(memeId);
    if (idx !== -1) {
      this.memes.splice(idx, 1);
      this.selectMeme(null);
    }
    return this.memes;
  }

  addMeme = (meme: Meme) => {
    this.memes.push(meme);
    this.selectMeme(meme);
    return this.memes;
  }

  updateMeme = (meme: Meme) => {
    var idx = this.getIndexOfMeme(meme._id);
    if (idx !== -1) {
      this.memes[idx] = meme;
      this.selectMeme(meme);
    }
    return this.memes;
  }
}
