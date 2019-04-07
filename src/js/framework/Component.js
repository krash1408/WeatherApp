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
      content.map(item => this._vDomElementToHtmlElement(item)) // [string|HTMLelement] => [HTMLelement]
        .forEach(domElement => {
          this.host.appendChild(domElement);
        })
    }
  }
  // virtual dom
  
  // @return {string|[string|HTMLelement]}
  render() {
    
  }

  _vDomElementToHtmlElement(element) {
    console.log(this)
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
          if (element.content) {
            container.innerHTML = element.content
          }
          ['classList', 'attributes',].forEach(item => {
            if(element[item] && !Array.isArray(element[item])) {
              element[item] = [element[item]];
            } else {console.log(element[item])}
          })
          if (element.classList) {
            container.classList.add(...element.classList)
          }
          if (element.attributes) {
            element.attributes.forEach(attributeSpec => {
              container.setAttribute(attributeSpec.name, attributeSpec.value)
            })
          }
          if(element.children) {
            element.children.forEach(item => {
              const htmlElement = this._vDomElementToHtmlElement(item);
              container.appendChild(htmlElement);
            })
          }
          return container;
        }
      }
      return element;
    }
  }
}
