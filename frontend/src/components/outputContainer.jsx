import React from 'react';
import useStore from './store';

const OutputContainer = () => {
    const analysis = useStore((state) => state.analysis);
    const enterPressed = useStore((state) => state.enterPressed);



    return (
        <>
        <div className="w-[800px] min-h-[250px] bg-base-100 rounded-xl p-6 shadow border border-base-200 text-neutral">

            {enterPressed && !analysis ? (
                <span className="loading loading-spinner loading-md"></span>
            ) : (
                <div>

                    {/* <h1>{analysis ? analysis.analysis.map((item) => item.word).join(' ') : ''}</h1> */}
                    
                    
                    {/* <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <h1>Nominative</h1>
                        <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
                        <h1>Accusative</h1>
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <h1>Dative</h1>
                        <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                        <h1>Genitive</h1>
                    </div>
                    <br /> */}
                    
                    {analysis?.analysis?.map((item, i) => (
                    <span
                        key={i}
                        className={[
                            // item.role === 'Subject'
                            //     ? "underline"
                            //     : item.role === 'Object'
                            //     ? "inline-block border rounded-full px-3 py-1"
                            //     : "",
                            item.case === 'Nominative'
                                ? "bg-red-400"
                                : item.case === 'Accusative'
                                ? "bg-yellow-200"
                                : item.case === 'Dative'
                                ? "bg-blue-400"
                                : item.case === 'Genitive'
                                ? "bg-pink-400"
                                : "",
                            "px-1 rounded mr-1", "font-bold"
                        ].filter(Boolean).join(' ')}
                    >
                        {item.word}
                    </span>
                    ))}

                    {analysis? 
                    <p>----------------------------------------------------------------------------------------------------------------</p>
                    : ''}
                    {analysis?.analysis?.map((item, i) => (
                        <React.Fragment key={i}>
                            <h1 className="text-gray-500 font-bold">{item.word} </h1>
                            <h3>
                                {/* {item.part_of_speech ? `${item.part_of_speech}` : ''} */}
                                {item.role ? `${item.role}` : ''}
                                {item.case ? `, ${item.case}` : ''} <br />
                                {`- ${item.explanation}`}
                                <p>----------------------------------------------------------------------------------------------------------------</p>
                            </h3>
                        </React.Fragment>
                    ))}
                    
                </div>
            )}
        </div>
        </>
    );
};

export default OutputContainer;