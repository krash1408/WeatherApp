import Component from '../../framework/Component';
import {Temperature} from '../Temperature'
export default class App extends Component {
  constructor (host) {
    super(host);
  }
  render() {   
    const temperature = document.createElement('div');
    new Temperature(temperature);
    this.host.append(temperature);
  }
}
