import Component from '../../framework/Component'
export default class Temperature extends Component {
  constructor (host, props) {
    super(host, props);
  }
  binder() {
    this.onClick = this.onClick.bind(this)
  }
  onClick(e){
    this.props;
  }
  render() {
    return this.props.temp + '&deg;' + this.props.unit;
  }
}
