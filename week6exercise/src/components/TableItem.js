import React from 'react';

const TableItem = (props) => {

    let baseURL = "https://www.youtube.com/watch?v=";
    let youTubeLink = props.vidLink;
    let newLink = baseURL + youTubeLink;
    return (
        <div className='tableItem' key={props.id}> 
            <img src={props.imgUrl}/>
            <p>Flight Name: {props.fname}</p>
            <p>Flight Number: {props.fnum} </p>
            <p><a href= {newLink} target="_blank"> Watch the Launch </a></p>

            
        </div>
    );
};

export default TableItem;