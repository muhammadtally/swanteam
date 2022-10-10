import React from 'react';
import './styles/home.css';
const Home = () => {


    return (
        <div className="wrapper">
      <Card
        img="https://previews.123rf.com/images/niratpix/niratpix1604/niratpix160400028/54932976-hands-businessman-searching-through-file-folders-with-personal-finance-documents.jpg"
        title="חפש קבצים"
        description="לחיפוש קבצים"
      />

      <Card
        img="https://www.lifewire.com/thmb/8MhWKwi4GEGiYRT6P56TBvyrkYA=/1326x1326/smart/filters:no_upscale()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
        title="העלאת מסמך"
        description="על מנת להעלות מסמך חדש לאפליקציה"
      />

      
    </div>
  );
}

function Card(props) {
  return (
    <div className="card">
      <div className="card__body">
        <img src={props.img} class="card__image" />
        <h2 className="card__title">{props.title}</h2>
        <p className="card__description">{props.description}</p>
      </div>
      <button  className="card__btn">לחץ כאן</button>
    </div>
        
    );
};

export default Home;