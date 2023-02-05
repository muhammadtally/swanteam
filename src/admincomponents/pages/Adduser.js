import React , { useEffect, useState } from "react";
import Select from 'react-select';
import './styles/adduser.css';
import Swal from 'sweetalert2';
import http from "../../utils/http-common";
import httpCommon from "../../utils/http-common";


const Adduser = () => {
  
  const customStyles = {
    control: (base,state) => ({
      ...base,
      background: "#2222",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: state.isFocused ? "white" : "white",
      boxShadow: state.isFocused ? null : null,
      fontSize: 16,
      direction:"rtl",
      "&:hover": {
        borderColor: state.isFocused ? "#03e9f4" : "#03e9f4"}

    }),
    singleValue: (provided) => ({
      ...provided,
      color:'#03e9f4',
      paddingTop:'3px',
      direction:"rtl",
      textalign: "center",
    }) ,
    option: (provided, state) => ({
      ...provided,
      padding: 5,
      direction:"rtl",
      cursor: state.isDisabled ? 'not-allowed' : 'default',
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'blue' : 'black',
    }),
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
    })
  }

  const handleClick = () => {
    if(useremail.email ===  "")
    {
      Swal.fire({
        title: '!שגיאה',
        text: '!אימייל הוא שדה חובה',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5bc4f5'
      })
    }
    else if(userPass.password ===  ""){
      Swal.fire({
        title: '!שגיאה',
        text: '!לא בחרת סיסמה',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5bc4f5'
      })

    }
    else if(selectedGroup ===  undefined){
      Swal.fire({
        title: '!שגיאה',
        text: '!לא בחרת את החברה לה שייך המשתמש',
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5bc4f5'
      })
      

    }
    else{
      const formData = new FormData();
      formData.append("email", useremail.email);
      formData.append("group", selectedGroup);
      formData.append("password", userPass.password);

      http.post("http://127.0.0.1:8000/addUser",formData,
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
            text: 'המשתמש הוסף בהצלחה',
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

 
    
  const [useremail, setuseremail] = useState({email: ""});

  const [userPass, setuserPass] = useState({password: ""});


  
  const [selectedGroup, setSelectedGroup] = useState();
    
  const [groupsoptions, setgroupsoptions] = useState("[]");

    const handleChange = e => {
      setSelectedGroup(e.label);
    }

    function handlemailChange(evt) {
      setuseremail({ email: evt.target.value })
    }

    function handlepassChange(evt) {
      setuserPass({ password: evt.target.value })
    }

    const fetchData = () => {
      httpCommon.get("http://127.0.0.1:8000/folders")
        .then((response) => response.data)
        .then((actualData) => { 
          setgroupsoptions(actualData)
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
   
    <div class="login-box">
  <h2>הוסף משתמש</h2>
  <form>
    <div class="user-box">
      <input type="text" name="" value={useremail.email}  onChange={handlemailChange} />
      <label>אימייל</label>
    </div>
    <div class="user-box">
      <input type="password" name="" value={userPass.password} onChange={handlepassChange} />
      <label>סיסמה</label>
    </div>
    
    <Select
    options={groupsoptions}
    placeholder="בחר חברה"
    onChange={handleChange}
    width='500px'
    styles={customStyles}
    />
    <a href="#" onClick={handleClick} role="button">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      הוספה
    </a>
    
  </form>
</div>

    );
}

export default Adduser;