import { MemeStackPage } from './app.po';

describe('meme-stack App', () => {
  let page: MemeStackPage;

  beforeEach(() => {
    page = new MemeStackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
