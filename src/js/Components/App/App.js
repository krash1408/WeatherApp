import Component from '../../framework/Component';
import {Temperature} from '../Temperature';
import Wind from '../Wind/Wind';
import WeatherForecast from '../WeaterForecast/WeatherForecast';
export default class App extends Component {
  constructor (host) {
    super(host);
  }
  render() {
    const t1 = document.createElement('div');
    new Temperature(t1, {temp: 7, unit: 'C'});
    const w1 = document.createElement('div');
    new Wind(w1, {speed: 20, unit: 'km/h'});
    return ['temperature:', 
    {
      tag: Temperature,
      props: {
        temp: 12,
        unit: 'C',
      },
    },
    {
      tag: Wind,
      props: {
        speed: 140,
        unit: 'M/h',
      },
    },
    t1,
    w1,
    {
      tag: 'div',
      content: 'I am a parent div!',
      classList: ['parent', ],
      attributes: [
        {
        name: 'title',
        value: 'Wow! Works!',
        },
      ],
      children: [
        {tag: 'div', content: 'First'},
        {
          tag: 'div',
          content: "Second",
          children: [
            {tag: 'div', content: 'First of First'},
          ],
        },
        '123'
      ],
    },
    {
      tag: 'input',
      eventHandler: [
        {
          type: 'change',
          //handler:  hint: constructor(method){this.method = this.method.bind(this)}
        },
      ],
    },
    {
      tag: WeatherForecast,
    }
  ];
  }
}
