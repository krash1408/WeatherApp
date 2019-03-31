import {Temperature} from '../Temperature'
export default class App {
  constructor (host) {
    host.innerHTML = '';
    
    const temperature = document.createElement('div');
    new Temperature(temperature);
    host.append(temperature);
  }
}
