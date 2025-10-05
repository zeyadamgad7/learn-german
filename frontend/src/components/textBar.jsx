import React from 'react'
import useStore from './store';
import { useState } from 'react';
import { handleSubmit } from '../functions/handleSubmit';
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

    // const handleSubmit = async () => {
    //     console.log(action)
    //     try {
    //         const endpoint = action === 'Analyze' ? '/analyze' : action === 'Translate' ? '/translate' : ''

    //         const body = action === 'Analyze'
    //             ? { text }
    //             : action === 'Translate'
    //                 ? {
    //                     original_text: original_text,
    //                     source_language: source_language,
    //                     target_language: target_language,
    //                 }
    //                 : (() => { throw new Error("Unknown action type") })();

    //         const response = await fetch(`http://localhost:8000${endpoint}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(body),
    //         });
    //         if (!response.ok) throw new Error('Request failed');

    //         const data = await response.json();
    //         if (endpoint === '/analyze') {
    //             setAnalysis(data); // store the result
    //         }
    //         else if (endpoint === '/translate') {
    //             setTranslation(data);
    //         }


    //     } catch (err) {
    //         console.error('Error:', err);
    //     }
    // };

    const debouncedSubmit = useCallback(
        debounce(async (value) => {
            setLoading(true);
            setOriginalText(value);
            const data = await handleSubmit({
                action,
                text,
                original_text: value,
                source_language,
                target_language,
                setAnalysis,
                setTranslation,
                setSourceLanguage,
                setTargetLanguage
            });

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
            setLoading(false);
        }, 500),
        [action, text, source_language, target_language, setAnalysis, setTranslation, setSourceLanguage, setTargetLanguage]
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
                            handleSubmit({ action, text, original_text, source_language, target_language, setAnalysis, setTranslation });
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
                            handleSubmit({ action, text, original_text, source_language, target_language, setAnalysis, setTranslation, reviewText, setCorrection, setWrongWords, setCorrectedWords, setReviewExplanation });
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
