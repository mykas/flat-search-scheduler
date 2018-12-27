export const HeaderDriver = comp => ({
  getTitle: () =>
    comp
      .find('h2')
      .text()
      .trim(),
  getImage: () => comp.find('img').prop('src'),
});
