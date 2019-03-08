import React from 'react';

const ListItem = props => {
  let rating;
  switch (props.data.rating) {
    case 0:
      rating = <img className="rating" src="/assets/large_0.png"/>;
      break;
    case 1:
      rating = <img className="rating" src="/assets/large_1.png"/>;
      break;
    case 1.5:
      rating = <img className="rating" src="/assets/large_1_half.png"/>;
      break;    
    case 2:
      rating = <img className="rating" src="/assets/large_2.png"/>;
      break;
    case 2.5:
      rating = <img className="rating" src="/assets/large_2_half.png"/>;
      break;
    case 3:
      rating = <img className="rating" src="/assets/large_3.png"/>;
      break;
    case 3.5:
      rating = <img className="rating" src="/assets/large_3_half.png"/>;
      break;
    case 4:
      rating = <img className="rating" src="/assets/large_4.png"/>;
      break;
    case 4.5:
      rating = <img className="rating" src="/assets/large_4_half.png"/>;
      break;
    case 5:
      rating = <img className="rating" src="/assets/large_5.png"/>;
      break;
    default:
      rating = <p>No Rating</p>;
  }

  return (
    <div className="listItem" onClick={()=>props.handleClick(props.index)}>
      <img className="listImg" src={props.data.image_url}/>
      <div className="listText">
      <p><strong>{props.data.name}</strong></p>
      <p>{props.data.location.address1}</p>
      {rating}<span>&nbsp;&nbsp;{props.data.review_count}&nbsp;Reviews</span>
      <p><span>{props.data.price}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(props.data.distance/1609).toFixed(1)}&nbsp;mi away</span></p>
      </div>
    </div>
  );
};

export default ListItem;