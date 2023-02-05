import React from 'react';
import './styles/home.css';
import { useNavigate } from "react-router-dom";
const AdminHome = () => {

    return (
        <div className="wrapper">
      <Card
        img="https://previews.123rf.com/images/niratpix/niratpix1604/niratpix160400028/54932976-hands-businessman-searching-through-file-folders-with-personal-finance-documents.jpg"
        title="חפש קבצים"
        description="לחיפוש קבצים"
      />

      <Card
        img="data:image/png;base64,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"
        title="הוסף משתמש"
        description="על מנת להוסיף משתמש חדש לאפליקציה לחברה שכבר קיימת"
      />

      
      <Card
        img="https://icon-library.com/images/team-icon-png/team-icon-png-13.jpg"
        title="הוסף חברה"
        description="להוספת חברה חדשה למשרד רואה החשבון"
        path='/group'
        
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
      <button   className="card__btn">לחץ כאן</button>
    </div>
        
    );
};

export default AdminHome;