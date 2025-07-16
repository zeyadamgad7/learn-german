import React from 'react';
import useStore from './store';

const OutputContainer = () => {
    const analysis = useStore((state) => state.analysis);

    return (
        <>
        <div className="fixed left-[400px] bottom-[50px] w-1/2 mt-4 p-3 border border-gray-300 rounded-t-lg bg-gray-50 min-h-[170px] shadow-lg z-[1000]">
            
            {analysis && (
                <div>

                    {analysis.analysis.map((item, i) => (
                        <React.Fragment key={i}>
                            <h1 className="text-gray-500 font-bold">{item.word} </h1>
                            <h3>
                                {item.role}
                                {item.case ? `, ${item.case}` : ''} <br/>
                                {`- ${item.explanation}`}
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