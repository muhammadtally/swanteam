import React , { useRef, useState } from "react";
import Swal from 'sweetalert2'
import http from "../../utils/http-common";
import './styles/addgroup.css'


const AddGroup = () => {
    const handleClick = () => {
        if(companyname.name ===  "")
    {
      Swal.fire({
        title: '!שגיאה',
        text: '!שם החברה הוא שדה חובה',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5bc4f5'
      })
    }
    else{
        const formData = new FormData();
        formData.append("groupname", companyname.name);
        http.post("http://127.0.0.1:8000/addgroup",formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response.data.token, "response.data.token");
        if (response.data.token === undefined) {
          Swal.fire({
            title: '!הוסף בהצלחה ',
            text: 'החברה נוספה בהצלחה',
            icon: 'success',
            confirmButtonText: 'אישור',
            confirmButtonColor: '#5bc4f5'
          })
        }
      })
      .catch(function (error) {
        console.log(error, "error");
      });
    }
    }


    const [companyname, setcompanyname] = useState({name: ""});


    function handlenameChange(evt) {
        setcompanyname({ name: evt.target.value })
      }

    return (
        <div class="login-box">
            <h2>הוסף חברה</h2>
            <form>
            <div class="user-box">
            <input type="text" name="" value={companyname.name} onChange={handlenameChange} />
            <label>שם החברה</label>
            </div>
            <a href="#" onClick={handleClick} role="button">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                   הוספה
            </a>
            </form>
        </div>


    )

    
}

export default AddGroup;

