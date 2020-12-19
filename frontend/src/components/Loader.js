import { ClipLoader, } from 'react-spinners';
import React from 'react'

const Loader = () => {
    return (
        <div className="center">
            <ClipLoader 
            size={100}
            color={"#8e8e8e"}/>
            <h4 className="text-secondary">Loading...</h4>
        </div>
    )
}

export default Loader
