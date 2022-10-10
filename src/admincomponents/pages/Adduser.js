import React , { useRef, useState } from "react";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import './styles/adduser.css'


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
    styles={customStyles}
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