import React from 'react'
import { useNavigate } from 'react-router-dom';
import useStore from './store'
import { set } from 'lodash';

function leftBar() {

    const setAnalysis = useStore((state) => state.setAnalysis)
    const setEnterPressed = useStore((state) => state.setEnterPressed);

    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate('/');
    };

    const handleClickTranslate = () => {
        navigate('/translate');
    };

    const handleCLickAnalyze = () => {
        navigate('/analyze')
        setAnalysis(null)
        setEnterPressed(false)
        
    }

    const handleCLickReview = () => {
        navigate('/review')
    }

    return (
        <div className="group fixed top-1/2 left-4 transform -translate-y-1/2 w-[60px] hover:w-[200px] transition-all duration-300 flex flex-col items-center  bg-base-100 rounded-box shadow-lg p-4 space-y-1 overflow-hidden">

            <button 
                className="flex items-center space-x-2 w-full cursor-pointer"
                onClick={handleClickHome}
                >
                <img src="./src/images/home5.svg" className="w-6 h-6" />
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Home</span>
            </button>

            <div className="divider my-1" />

            <button 
                className="flex items-center space-x-2 w-full  cursor-pointer"
                onClick={handleClickTranslate}
            >
                <img src="./src/images/translate_icon.svg" className="w-6 h-6" />
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Translate</span>
            </button>

            <div className="divider my-1" />

            <button 
                className="flex items-center space-x-2 w-full  cursor-pointer"
                onClick={handleCLickAnalyze}
            >
                <img src="./src/images/analyze.svg" className="w-6 h-6" />
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Analyze</span>
            </button>

            <div className="divider my-1" />

            <button 
                className="flex items-center space-x-2 w-full  cursor-pointer"
                onClick={handleCLickReview}
            >
                <img src="./src/images/review.svg" className="w-6 h-6" />
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Review</span>
            </button>

        </div>

    )
}

export default leftBar