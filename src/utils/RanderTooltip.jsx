import Tooltip from "react-bootstrap/Tooltip";

const RenderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    {props.name}
  </Tooltip>
);

export default RenderTooltip;
