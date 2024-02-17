// @external
import { PureComponent } from "react";

export default class PdfToPrint extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <>{this.props.children}</>;
  }
}
