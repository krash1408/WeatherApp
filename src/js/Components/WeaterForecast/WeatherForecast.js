import { Temperature } from "../Temperature";
import Component from "../../framework/Component";

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props)
  }
  render() {
    return [
      {
        tag: Temperature,
        props: {
          temp: 17,
          unit: 'C',
        },
      },
    ]
  }
}
