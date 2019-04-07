export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this._render();
  }
  _render() {
    this.host.innerHTML = '';
    let content = this.render();
    typeof content !== 'string' ? content.map(item => this._vDomElementToHtmlElement(item))
      .forEach(domElement => {
        this.host.appendChild(domElement)
      }) : this.host.innerHTML = content;
  }
  // virtual dom
  
  // @return {string|[string|HTMLelement]}
  render() {
    
  }

  _vDomElementToHtmlElement(element) {
    if (typeof element === 'string') {
      const htmlElement = document.createElement('div');
      htmlElement.innerHTML = element;
      return htmlElement;
    } else {
      if(element.tag) {
        if (typeof element.tag === 'function') {
          const container = document.createElement('div');
          new element.tag(container, element.props);
          return container;
        } else {
          // string
          const container = document.createElement(element.tag)
          element.content ? container.innerHTML = element.content : null;
          ['classList', 'attributes', 'children'].forEach(item => {
            element[item] && !Array.isArray(element[item]) ? element[item] = [element[item]] : null;
          })
          element.classList ? container.classList.add(...element.classList) : null;
          element.attributes ? element.attributes.forEach(attributeSpec => {
              container.setAttribute(attributeSpec.name, attributeSpec.value)
            }) : null;
          element.children ? element.children.forEach(item => {
              container.append(this._vDomElementToHtmlElement(item))
            }) : null;
          return container;
        }
      }
      return element;
    }
  }
}
