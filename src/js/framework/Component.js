export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.binder();
    this._render();
  }
  _render() {
    this.host.innerHTML = '';
    let content = this.render();
    !Array.isArray(content) ? content = [content] : null;
    content.map(item => this._vDomElementToHtmlElement(item)) // item can be a string, function or object
      .forEach(domElement => {
        this.host.appendChild(domElement)
      });
  }
  // virtual dom
  
  // @return {string|[string|HTMLelement]}
  render() {
    
  }
  binder(){

  }

  _vDomElementToHtmlElement(e) { // e can be a string, array, or function
    if (typeof e === 'string') {
      const element = document.createElement('div');
      element.innerHTML = e;
      return element;
    } else {
      if(e.tag) {
        if (typeof e.tag === 'function') {
          const element = document.createElement('div');
          new e.tag(element, e.props);
          return element;
        } else {
          // string
          const element = document.createElement(e.tag)
          e.content ? element.innerHTML = e.content : null;
          ['classList', 'attributes', 'children'].forEach(item => {
            e[item] && !Array.isArray(e[item]) ? e[item] = [e[item]] : null;
          })
          e.classList ? element.classList.add(...e.classList) : null;
          e.attributes ? e.attributes.forEach(attribute => {
              element.setAttribute(attribute.name, attribute.value)
            }) : null;
          e.children ? e.children.forEach(item => {
              element.append(this._vDomElementToHtmlElement(item))
            }) : null;
          return element;
        }
      }
      return e;
    }
  }
}
