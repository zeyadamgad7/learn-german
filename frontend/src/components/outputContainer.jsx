import React from 'react';
import useStore from '../store/store';
import translate from '../pages/translate';

const OutputContainer = ({ className = "" }) => {
    const text = useStore((state) => state.text);
    const analysis = useStore((state) => state.analysis);
    const enterPressed = useStore((state) => state.enterPressed);
    const checked_part_of_speech = useStore((state) => state.checked_part_of_speech);
    const checked_case = useStore((state) => state.checked_case);
    const checked_role = useStore((state) => state.checked_role);
    const checked_explanation = useStore((state) => state.checked_explanation);
    const action = useStore((state) => state.action)
    const translation = useStore((state) => state.translation)
    const loading = useStore((state) => state.loading)
    const correction = useStore((state) => state.correction);

    return (
        <>
            <div className={`${className} bg-base-100 rounded-box p-6 overflow-y-auto`}>

                {action === 'Analyze' ? (

                    enterPressed && !analysis ? (
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

                            {analysis ?
                                <div className="flex justify-center divider"></div>
                                : ''}
                            {analysis?.analysis?.map((item, i) => (
                                <React.Fragment key={i}>
                                    <h1 className="font-bold">{item.word} </h1>
                                    <h3>
                                        {checked_part_of_speech ? (
                                            <>
                                                {item.part_of_speech ? (
                                                    <>
                                                        <span className='text-base-100 bg-gray-400 px-1 rounded mr-1'>Part of speech</span>
                                                        <span>{item.part_of_speech ? `${item.part_of_speech}` : ''}</span><br />
                                                    </>) : ''}
                                            </>
                                        ) : ''}
                                        {checked_case ? (
                                            <>
                                                {item.case ? (
                                                    <>
                                                        <span className='text-base-100 bg-gray-400 px-1 rounded mr-1'>Case</span>
                                                        <span>{item.case ? `${item.case}` : ''}</span><br />
                                                    </>
                                                ) : ''}
                                            </>
                                        ) : ''}
                                        {checked_role ? (
                                            <>
                                                {item.role ? (
                                                    <>
                                                        <span className='text-base-100 bg-gray-400 px-1 rounded mr-1'>Role</span>
                                                        <span>{item.role ? `${item.role}` : ''}</span><br />
                                                    </>
                                                ) : ''}
                                            </>
                                        ) : ''}
                                        {checked_explanation ? (
                                            <>
                                                {item.explanation ? (
                                                    <>
                                                        <span className='text-base-100 bg-gray-400 px-1 rounded mr-1'>Explanation</span>
                                                        <span>{item.explanation ? `${item.explanation}` : ''}</span><br />
                                                    </>
                                                ) : ''}
                                            </>
                                        ) : ''}
                                        <div className="flex justify-center divider"></div>
                                    </h3>
                                </React.Fragment>
                            ))}

                        </div>
                    )

                ) : action === 'Translate'
                    ? (
                        loading ? (
                            <span className="loading loading-dots loading-sm"></span>
                        ) : (
                            <div>

                                {translation?.translation?.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <h1 >{item.translated_text} </h1>
                                    </React.Fragment>
                                ))}

                            </div>
                        )

                    )
                    : action === 'Review' ? (
                        false ? (
                            <span className="loading loading-dots loading-sm"></span>
                        ) : (
                            <div>
                                {correction?.review?.map((item, i) => (
                                    <div key={i} className="flex flex-row items-start text-lg">
                                        <span className="flex flex-wrap text-left">
                                            {item.original_text.split(' ').map((word, j) => {
                                                const isWrong = item.wrong_words?.includes(word);
                                                return (
                                                    <span
                                                        key={j}
                                                        className={[isWrong ? 'bg-red-400' : '', "px-1 rounded mr-1"].join(' ')}
                                                    >
                                                        {word}
                                                    </span>
                                                );
                                            })}
                                        </span>
                                     <div className="divider divider-horizontal h-32 mx-auto"></div>
                                        <span className="flex flex-wrap text-left">
                                            {item.corrected_text.split(' ').map((word, j) => {
                                                const isCorrect = item.corrected_words?.includes(word);
                                                return (
                                                    <span
                                                        key={j}
                                                        className={[isCorrect ? 'bg-green-400' : '', "px-1 rounded mr-1"].join(' ')}
                                                    >
                                                        {word}
                                                    </span>
                                                );
                                            })}
                                        </span>

                                        <span>{item.explanation}</span>

                                    </div>
                                ))}
                            </div>
                        )
                    ) : ''
                }

            </div>
        </>
    );
};

export default OutputContainer;