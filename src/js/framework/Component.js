export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this._render();
  }
  _render() {
    this.host.innerHTML = '';

    let content = this.render();
    if (typeof content === 'string') {
      content = [content];
    }
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
  // @return {string|[string|HTMLelement]}
  render() {

  }
}
