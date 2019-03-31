export default class Component {
  constructor(host) {
    this.host = host;
    this._render();
  }
  _render() {
    this.host.innerHTML = '';
    this.host.innerHTML = this.render();
  }
  // @return {string|array|object}
  render() {

  }
}
