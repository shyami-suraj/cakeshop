import React, { useState } from 'react';
import './Dropdown.css'
import { Category } from '@material-ui/icons';

const Dropdown = () => {
    const [dropdownlist, setDropdownList] = useState('');
    const fetchUserData = () => {


        fetch("http://127.0.0.1:8000/api/category")
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status == "success") {
                    setDropdownList(data.data);
                    console.log("category data:", data.data);
                }
                else {
                    "Error on data fetching."
                }

            })
    }



    React.useEffect(() => {
        // Update the document title using the browser API
        fetchUserData();

    },
        []);

    return (
        <div class="dropdown">
            <button class="dropbtn">Cake</button>
            <div class="dropdown-content">

                {dropdownlist && dropdownlist.map((item, index) => (
                    <a href={'/@/category/'+item.slug} key={index} >
                        <option value={item.id}>
                            {item.name}
                        </option>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Dropdown
