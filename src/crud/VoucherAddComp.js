import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VoucherAddComp = () => {
    const navigate = useNavigate();
    const [itemData, setItemData] = useState({ voucher_number: "" });

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setItemData({ ...itemData, [name]: value });
    };

    const addRecord = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8888/voucher`, itemData)
            .then(() => {
                window.alert("Voucher Added Successfully");
                navigate('/maindashboard/voucherdash');
            })
            .catch((error) => { console.error(error); });
    };

    return (
        <div>
            <h2>This is ProductAdd Component</h2>
            <div className='row'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
                    <form onSubmit={addRecord}>
                        <label className='form-label'>Enter Voucher</label>
                        <input type='text' name="voucher_number" onChange={inputChangeHandler} value={itemData.voucher_number} className='form-control' />
                        <button type='submit' className='btn btn-primary mt-2'>Submit</button>
                    </form>
                </div>
                <div className='col-sm-3'></div>
            </div>
        </div>
    );
};

export default VoucherAddComp;
