import { Injectable } from '@angular/core';
import { Meme } from './meme';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MemeService {
    private memesUrl = '/api/memes';

    constructor (private http: Http) {}

    // get("/api/memes")
    getMemes(): Promise<Meme[]> {
      return this.http.get(this.memesUrl)
                 .toPromise()
                 .then(response => response.json() as Meme[])
                 .catch(this.handleError);
    }

    // post("/api/memes")
    createMeme(newMeme: Meme): Promise<Meme> {
      return this.http.post(this.memesUrl, newMeme)
                 .toPromise()
                 .then(response => response.json() as Meme)
                 .catch(this.handleError);
    }

    // get("/api/memes/:id") endpoint not used by Angular app

    // delete("/api/memes/:id")
    deleteMeme(delMemeId: String): Promise<String> {
      return this.http.delete(this.memesUrl + '/' + delMemeId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/memes/:id")
    updateMeme(putMeme: Meme): Promise<Meme> {
      var putUrl = this.memesUrl + '/' + putMeme._id;
      return this.http.put(putUrl, putMeme)
                 .toPromise()
                 .then(response => response.json() as Meme)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
