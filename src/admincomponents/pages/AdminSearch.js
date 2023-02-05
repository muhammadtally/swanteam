import React, { useState } from 'react';
import {Col,Form,} from "react-bootstrap";
import './styles/search.css';
import { searchFilesAdmin } from '../../utils/API';


const AdminSearch = () => {
    // create state for holding returned filesDatabase api data
    const [searchedFiles, setSearchedFiles] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
    // create method to search for files and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        if (!searchInput) {
            return false;
        }
        try {
            const response = await searchFilesAdmin(searchInput);
    
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
    
            const { hits } = await response.json();
            
    
            const fileData = hits.map((file) => ({
                fileId: file.id,
                image: file.url,
                link: file.url,
                fileName: file.fileName,
                description: file.text,
            }));
    
            setSearchedFiles(fileData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    
    };
    return (
        <>
       <div class="mt-0 p-2 bg-primary text-white rounded text-center">
                 <div class="container-search">
                     <h1 class="h1-search">! חפש קבצים</h1>
                     <Form onSubmit={handleFormSubmit}>
                     <div class="row align-items-end" >
                         <Col  xs={12} md={4}>
                                 <button type='submit' variant='success' class="btn-search btn-lg btn-dark">חפש</button>
                         </Col>
                         <Col xs={12} md={8}>
                                 <input
                                     class="form-control form-control-lg text-end"
                                     type="text"
                                     placeholder="... חפש קבצים"
                                     onChange={(e) => setSearchInput(e.target.value)}
                                     value={searchInput}  />
                         </Col>
                    </div>
                     </Form>
                 </div>
             </div>
    
             { (
                 <div className="searchPage__results">
                     <p className="searchPage__resultCount">
                      תוצאות - {searchedFiles?.length}
                     </p>
                {searchedFiles?.map((item) => (
                <div className="searchPage__result">
                  <a href={item.link} target="_blank">
                  {item.link}
                    
                    
                  </a>
                  <a className="searchPage__resultTitle" href={item.link} target="_blank">
                    <h2>{item.fileName}</h2>
                  </a>
                  <p className="searchPage__resultSnippet">{item.description}</p>
                </div>
                ))}
                </div>
                 )}     
        </>
        );
    };
    export default AdminSearch;