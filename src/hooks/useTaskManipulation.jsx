import React from 'react';
import {callApi} from "../utils/callApi";
import {toast} from "react-toastify";

const useTaskManipulation = () => {
    const postManageTask = async (selectedData) => {
        console.log('selectedData',selectedData)
        const res = await callApi("POST", selectedData )
        if(res && res.status){
            return res.data.prioritizeTasks
        }else{
            toast.error('Failed');
        }
    }
    return {
        postManageTask
    };
};

export default useTaskManipulation;
