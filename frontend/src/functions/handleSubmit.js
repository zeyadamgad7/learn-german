import { act } from "react";
import review from "../pages/review";
import { set } from "lodash";


export const handleSubmit = async ({ action, text, original_text, source_language, target_language, setAnalysis, setTranslation, reviewText, setCorrection, setWrongWords, setCorrectedWords, setReviewExplanation  }) => {
    console.log(action)
    try {
        const endpoint = action === 'Analyze' ? '/analyze' : action === 'Translate' ? '/translate' : action === 'Review' ? '/review' : '';

        const body = action === 'Analyze'
            ? { text }
            : action === 'Translate'
                ? {
                    original_text: original_text,
                    source_language: source_language,
                    target_language: target_language,
                }
                : action === 'Review'
                    ? {  text: reviewText }
                    : (() => { throw new Error("Unknown action type") })();


        const response = await fetch(`http://localhost:8000${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        

        if (!response.ok) throw new Error('Request failed');

        const data = await response.json();
        if (endpoint === '/analyze') {
            setAnalysis(data); // store the result
        }
        else if (endpoint === '/translate') {
            setTranslation(data);
        }
        else if (endpoint === '/review') {
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
        return data; // Return the data for further processing if needed


    } catch (err) {
        console.error('Error:', err);
        return null; // Return null or handle the error as needed
    }
};