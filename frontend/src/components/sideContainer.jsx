import React from 'react';
import { useState } from 'react';
import CheckBox from './checkBox';
import useStore from './store';

const SideContainer = () => {

    const checked_part_of_speech = useStore((state) => state.checked_part_of_speech);
    const checked_case = useStore((state) => state.checked_case);
    const checked_role = useStore((state) => state.checked_role);
    const checked_explanation = useStore((state) => state.checked_explanation);
    const setChecked_part_of_speech = useStore((state) => state.setChecked_part_of_speech);
    const setChecked_case = useStore((state) => state.setChecked_case);
    const setChecked_role = useStore((state) => state.setChecked_role);
    const setChecked_explanation = useStore((state) => state.setChecked_explanation);
    const analysis = useStore((state) => state.analysis);

    return (
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 w-[300px] flex flex-col items-start bg-base-100 rounded-box shadow-lg p-4 space-y-2">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <h1 >Nominative</h1>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
                <h1 >Accusative</h1>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <h1 >Dative</h1>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                <h1 >Genitive</h1>
            </div>
            
            {analysis ? 
            (
                <div>
                    <div className="flex justify-center divider w-[266px]"></div>
                    <CheckBox text="Part of speech" checked={checked_part_of_speech} setChecked={setChecked_part_of_speech}/>
                    <CheckBox text="Case" checked={checked_case} setChecked={setChecked_case}/>
                    <CheckBox text="Role" checked={checked_role} setChecked={setChecked_role}/>
                    <CheckBox text="Explanation" checked={checked_explanation} setChecked={setChecked_explanation}/>
                </div>
            ) : ''}
        </div>

    );
};

export default SideContainer;