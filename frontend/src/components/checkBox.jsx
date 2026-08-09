import React from 'react'
import { useState } from 'react';

function checkBox({ text, checked, setChecked}) {
    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                className="checkbox checkbox-neutral rounded-field size-4.5 peer"
            />
            <span className="peer-checked:text-neutral text-neutral-content font-medium">{text}</span>
        </label>
    );
}

export default checkBox