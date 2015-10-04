function render() {
  return h('div',
    h('h1', 'ckeditor'),
    h('textarea', {binding: [this, 'html']}),
    ckeditor({binding: [this, 'html']})
  );
}
render();