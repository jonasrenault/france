import { FrancePage } from './app.po';

describe('france App', function() {
  let page: FrancePage;

  beforeEach(() => {
    page = new FrancePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
