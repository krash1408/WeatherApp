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
      content.map(this._vDomElementToHtmlElement) // [string|HTMLelement] => [HTMLelement]
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
          element.content ? container.innerHTML = element.content : console.log('Have no inner content.');
          ['classList', 'attributes', 'children'].forEach(item => {
            if(element[item] && !Array.isArray(element[item])) {
              element[item] = [element[item]];
            } else {console.log(element[item])}
          })
          element.classList ? container.classList.add(...element.classList) : console.log('Have no classes.');
          element.attributes ? element.attributes.forEach(attributeSpec => {
            container.setAttribute(attributeSpec.name, attributeSpec.value);
          }) : console.log('Have no attributes.');
          if(element.children) {
            element.children.forEach(container.appendChild(this._vDomElementToHtmlElement))
          }

          return container;
        }
      }
      return element;
    }
  }
}
