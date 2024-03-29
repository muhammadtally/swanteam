import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './drop-file-input.css';
import Swal from 'sweetalert2'
import { useAuthenticator } from '@aws-amplify/ui-react';
import uploadFilesService from '../../utils/upload-files.service';
import { ImageConfig } from './config/ImageConfig'; 
import uploadImg from './assest/cloud-upload-regular-240.png';

const DropFileInput = props => {

    const [selectedValue, setSelectedValue] = useState();
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [selectedgroup, setgroup] = useState();

    const optionList = [
        { value: "1", label: "הכנסות" },
        { value: "2", label: "הוצאות" },
        { value: "3", label: "שעות עבודה" },
        { value: "4", label: "מסמך בנקאי" }
      ];

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
        else{
            setgroup(user.signInUserSession.accessToken.payload["cognito:groups"][0])
            {fileList.map((file) => {
                const formData = new FormData();
                formData.append("folder", selectedgroup + '/' + selectedValue);
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
                const updatedList = [...fileList];
                updatedList.splice(fileList.indexOf(file), 1);
                setFileList(updatedList);
                props.onFileChange(updatedList);
            })}
            setSelectedValue()
        }
        
    }

    const handleChange = e => {
        setSelectedValue(e.label);
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
