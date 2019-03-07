import React from 'react';

const ListItem = props => {
  return (
    <div className="listItem" onClick={()=>props.handleClick(props.index)}>
      <p>{props.data.name}</p>
      <p>{props.data.location.address1}</p>
      <p>{props.data.rating} {props.data.price}</p>
    </div>
  );
};

export default ListItem;