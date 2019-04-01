export default class Component {
  constructor(host) {
    this.host = host;
    this._render();
  }
  _render() {
    this.host.innerHTML = '';

    const content = this.render();
    if (typeof content === 'string') {
      this.host.innerHTML = content;
    } else {
      content.map(item => {
        if (typeof item === 'string') {
          const domElement = document.createElement('div');
          domElement.innerHTML = item;
          return domElement;
        } else {
          return item;
        }
      }) // [string|HTMLelement] => [HTMLelement]
        .forEach(domElement => {
          this.host.appendChild(domElement);
        })
      }
  }
  // @return {string|[string|HTMLelement]}
  render() {

  }
}
