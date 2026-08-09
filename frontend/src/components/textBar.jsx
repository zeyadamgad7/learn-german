import React from 'react'
import useStore from '../store/store';
import { useState } from 'react';
import { submitGermanText } from '../services/api';
import { debounce, set } from 'lodash';
import { useCallback } from 'react';


function TextBar({ className = "" }) {

    const text = useStore((state) => state.text); // to get text input
    const setText = useStore((state) => state.setText); // to store text input

    const original_text = useStore((state) => state.original_text)
    const setOriginalText = useStore((state) => state.setOriginalText)

    const source_language = useStore((state) => state.source_language)
    const setSourceLanguage = useStore((state) => state.setSourceLanguage)

    const target_language = useStore((state) => state.target_language)
    const setTargetLanguage = useStore((state) => state.setTargetLanguage)

    const setAnalysis = useStore((state) => state.setAnalysis); // to store backend result
    const setEnterPressed = useStore((state) => state.setEnterPressed); // to store enter pressed state
    const setTranslation = useStore((state => state.setTranslation))

    const action = useStore((state) => state.action)

    const loading = useStore((state) => state.loading)
    const setLoading = useStore((state) => state.setLoading)

    const setSourceLabel = useStore((state) => state.setSourceLabel)
    const setTargetLabel = useStore((state) => state.setTargetLabel)

    const setReviewText = useStore((state) => state.setReviewText);
    const reviewText = useStore((state) => state.reviewText);

    const setCorrection = useStore((state) => state.setCorrection);
    const setWrongWords = useStore((state) => state.setWrongWords);

    const setCorrectedWords = useStore((state) => state.setCorrectedWords);
    const setReviewExplanation = useStore((state) => state.setReviewExplanation);

    
    const executeAction = async (currentInputValue) => {
        setLoading(true);
        try {
            const data = await submitGermanText({
                action,
                text: action === 'Analyze' ? currentInputValue : text,
                original_text: action === 'Translate' ? currentInputValue : original_text,
                source_language,
                target_language,
                reviewText: action === 'Review' ? currentInputValue : reviewText,
            });
            if (!data) return;

            console.log("Received data:", data);

            if (action === 'Analyze') {
                setAnalysis(data); // store the result
            }
            else if (action === 'Translate') {
                setTranslation(data);
                if (data && data.translation[0].source_language !== '') {
                const updatedSourceLang = data.translation[0].source_language;
                const updatedTargetLang = data.translation[0].target_language;

                setSourceLabel(updatedSourceLang);
                setTargetLabel(updatedTargetLang);
                }else{
                    setSourceLabel('Source Language');
                    setTargetLabel('Target Language');
                    setTranslation('');
                }
            }
            else if (action === 'Review') {
                // // console.log("Wrong words- ", data.review[0].wrong_words)
                // setWrongWords(data.review[0].wrong_words);

                // // console.log("corrected words- ", data.review[0].corrected_words)
                // setCorrectedWords(data.review[0].corrected_words);
                
                // // console.log("corrected text- ", data.review[0].corrected_text)
                // setCorrection(data.review[0].corrected_text);
                
                // // console.log(data.review[0].explanation)
                // setReviewExplanation(data.review[0].explanation);

                setCorrection(data);
            }
        } catch (error) {
            console.error("Action execution failed:", error);
        }
        finally {
            setLoading(false);
        }
    }

    const debouncedSubmit = useCallback(
        debounce(async (value) => {
            await executeAction(value);
        }, 500),
        [action, source_language, target_language]
    );



    return (


        <div className={`${className} bg-base-100 rounded-box border p-6`}>
            {action === 'Analyze' ? (
                <textarea
                    value={text}
                    onChange={(e) => { setText(e.target.value); setEnterPressed(false); setAnalysis(''); }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setEnterPressed(true);
                            e.preventDefault();
                            executeAction(text);
                            setText('');
                        }
                    }}
                    placeholder="Enter the sentence to analyze"
                    className="flex-1 w-full resize-none bg-transparent border-none outline-none text-gray-800 text-lg placeholder:text-gray-400"
                />
            ) : action === 'Translate' ? (
                <textarea
                    value={original_text}
                    onChange={(e) => { const newValue = e.target.value; setOriginalText(e.target.value); debouncedSubmit(newValue); }}
                    // onKeyDown={(e) => {
                    //     if (e.key === 'Enter') {
                    //         setEnterPressed(true);
                    //         e.preventDefault();
                    //         handleSubmit();
                    //     }
                    // }}
                    placeholder="Enter the sentence to translate"
                    className="flex-1 w-full resize-none bg-transparent border-none outline-none text-gray-800 text-lg placeholder:text-gray-400"
                />
            ) : action === 'Review' ? (
                <textarea
                    value={reviewText}
                    onChange={(e) => { setReviewText(e.target.value); setEnterPressed(false);}}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setEnterPressed(true);
                            e.preventDefault();
                            executeAction(reviewText);
                            // setReviewText('');
                        }
                    }}
                    placeholder="Enter the sentence to review"
                    className="flex-1 w-full resize-none bg-transparent border-none outline-none text-gray-800 text-lg placeholder:text-gray-400"
                />
            ) : null}
        </div>


    );
}

export default TextBar
