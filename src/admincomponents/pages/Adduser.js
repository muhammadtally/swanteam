import React , { useRef, useState } from "react";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import './styles/adduser.css'

const Adduser = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = data => console.log(data);
    
    const [selectedGroup, setSelectedGroup] = useState();
    
    const groupsoptions = [
        { value: "1", label: "סנושי" },
        { value: "2", label: "דבאח" },
        { value: "3", label: "בטון סאלים" }   
    ]
    const handleChange = e => {
        setSelectedGroup(e.label);
      }

    return (
   
    <div class="login-box">
  <h2>הוסף משתמש</h2>
  <form>
    <div class="user-box">
      <input type="text" name="" required="" />
      <label>אימייל</label>
    </div>
    <div class="user-box">
      <input type="password" name="" required="" />
      <label>סיסמה</label>
    </div>
    <Select
    options={groupsoptions}
    placeholder="בחר חברה"
    onChange={handleChange}
    width='500px'
    />
    <a href="#">
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