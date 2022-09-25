import './styles/upload.css'
import DropFileInput from '../dropfile/DropFileInput';


const AdminUpload = () => {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <div className="box">
            <h2 className="header">
                העלאת קבצים
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
        </div>
    );
}

export default AdminUpload;
