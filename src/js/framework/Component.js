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
      this.host.innerHTML = content;
    } else {
      content.map(item => {
        if (typeof item === 'string') {
          const htmlElement = document.createElement('div');
          htmlElement.innerHTML = item;
          return htmlElement;
        } else {
          if (typeof item.tag === 'function') {
            const container = document.createElement('div');
            new item.tag(container, item.props);
            return container;
          }
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
