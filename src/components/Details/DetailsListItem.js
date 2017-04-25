import React from "react";

/*
 * Component that renders a single item in drop details list
 */
const DetailsListItem = (props) => (
	<li>
		<span className="details-point-title">{props.name}:</span> {props.value}
	</li>
);

export default DetailsListItem;