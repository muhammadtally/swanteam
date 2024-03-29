import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './drop-file-input.css';
import Swal from 'sweetalert2'
import uploadFilesService from '../../utils/upload-files.service';
import { ImageConfig } from './config/ImageConfig'; 
import uploadImg from './assest/cloud-upload-regular-240.png';
import httpCommon from "../../utils/http-common";


const DropFileInput = props => {

    const [selectedValue, setSelectedValue] = useState();
    const [selectedGroup, setSelectedGroup] = useState();

    const optionList = [
        { value: "1", label: "הכנסות" },
        { value: "2", label: "הוצאות" },
        { value: "3", label: "שעות עבודה" },
        { value: "4", label: "מסמך בנקאי" }
      ];

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

    const [groupsoptions, setgroupsoptions] = useState("[]");

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const handleClick = async() => {


        if(selectedValue === undefined)
        {
            Swal.fire({
                title: '!שגיאה',
                text: '!לא בחרת את סוג המסמך',
                icon: 'error',
                confirmButtonText: 'אישור',
                confirmButtonColor: '#5bc4f5'
              })
          
        }
        else if(selectedGroup === undefined)
        {
            Swal.fire({
                title: '!שגיאה',
                text: 'לא בחרת לאיזה חברה שייך המסמך',
                icon: 'error',
                confirmButtonText: 'אישור',
                confirmButtonColor: '#5bc4f5'
              })
        }
        else{
           
            {fileList.map((file) => {
                
                const formData = new FormData();
                formData.append("folder", selectedGroup + '/' + selectedValue);
                formData.append("fileobject", file);
                if(uploadFilesService.upload(formData)){
                    Swal.fire({
                        title: '!הוסף בהצלחה ',
                        text: 'הקובץ הועלה בהצלחה',
                        icon: 'success',
                        confirmButtonText: 'אישור',
                        confirmButtonColor: '#5bc4f5'
                      })
                }
                else{
                    Swal.fire({
                        title: 'תקלה',
                        text: 'קרתה תקלה, אנא נסה מאוחר יותר',
                        icon: 'warning',
                        confirmButtonText: 'אישור',
                        confirmButtonColor: '#5bc4f5'
                      })
                }
                const updatedList = [...fileList];
                updatedList.splice(fileList.indexOf(file), 1);
                setFileList(updatedList);
                props.onFileChange(updatedList);
            })}
            setSelectedValue()
            setSelectedGroup()
        }
        
    }

    const handleChange = e => {
        setSelectedValue(e.label);
      }
    
    const handleChange2 = r => {
        setSelectedGroup(r.label);
      }

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        if(fileList.length < 1){
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }
    else{
        Swal.fire({
            title: '!שגיאה',
            text: 'מותר להעלות רק קובץ אחד',
            icon: 'error',
            confirmButtonText: 'אישור',
            confirmButtonColor: '#5bc4f5'
          })
    }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>גרור ושחרר או לחץ כאן</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            : הקבצים המוכנים להעלאה
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <div className="dropdown-container">
                                            <Select
                                            options={optionList}
                                            placeholder="בחר את סוג המסמך"
                                            onChange={handleChange}
                                            />
                                            <Select
                                            options={groupsoptions}
                                            placeholder="בחר חברה"
                                            onChange={handleChange2}
                                            
                                            />
                                        </div>
                                        
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    
                     <button onClick = {handleClick} class="button-70" role="button">העלאה</button>
                    
                    </div>
                    
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
