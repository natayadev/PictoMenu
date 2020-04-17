import React from "react";

export const Pic = (props) => {
  return (
    <div>
      <img
        onClick={props.seleccionarPic}
        onDrag={props.ondrag}
        draggable={true}
        width="150"
        height="150"
        id={props.id}
        src={"https://api.arasaac.org/api/pictograms/" + props.id}
        alt=""
      />
    </div>
  );
};
