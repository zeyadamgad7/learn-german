import React, { use, useState } from 'react'
import useStore from '../store/store'
import { submitGermanText } from '../services/api';

function dropDown({ setLanguage, label, setLabel}) {

    const text = useStore((state) => state.text); // to get text input
    const original_text = useStore((state) => state.original_text)
    const source_language = useStore((state) => state.source_language)
    const target_language = useStore((state) => state.target_language)
    const setAnalysis = useStore((state) => state.setAnalysis); // to store backend result
    const setTranslation = useStore((state => state.setTranslation))
    const action = useStore((state) => state.action)

    const [searchInput, setsearchInput] = useState("")
    // const [isOpen, setIsOpen] = useState(true)

    const lang = ["German", "English", "French", "Arabic"]

    const handleSelect = (language) => {
        setLanguage(language)
        setLabel(language)
        setsearchInput('')
        submitGermanText({action, text, original_text, source_language, target_language: language, setAnalysis, setTranslation})
    }

    const search = (
        lang.filter(lang => lang.toLowerCase().includes(searchInput.toLowerCase()))
    )

    return (
        <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1 bg-base-100" >{label}</div>

            

            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li>
                    <input type="text" placeholder='Search' className='border-1 border-base-200' value={searchInput} onChange={(e) => setsearchInput(e.target.value)}/>
                </li>
                
                {search.map((lang) => (
                    <li key={lang}>
                        <a onClick={() => {handleSelect(lang)}}>{lang}</a>
                    </li>
                ))}
            </ul> 
            
            
            
        </div>
    )
}

export default dropDown



// function dropDown({ label, handleSelect }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isOpen, setIsOpen] = useState(false);

//   const languages = ["German", "English", "French", "Arabic"];

//   const filteredLanguages = languages.filter(lang =>
//     lang.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleClick = (lang) => {
//     handleSelect(lang);
//     setIsOpen(false); // collapse on select
//     setSearchTerm(''); // optional: clear search
//   };

//   return (
//     <div
//       className={`dropdown dropdown-bottom ${isOpen ? 'dropdown-open' : ''}`}
//     >
//       <div
//         tabIndex={0}
//         role="button"
//         className="btn m-1"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {label}
//       </div>

//       <ul
//         tabIndex={0}
//         className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
//       >
//         <li>
//           <input
//             type="searchInput"
//             placeholder="Search..."
//             className="input input-bordered w-full mb-1"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </li>
//         {filteredLanguages.map((lang) => (
//           <li key={lang}>
//             <a onClick={() => handleClick(lang)}>{lang}</a>
//           </li>
//         ))}
//         {filteredLanguages.length === 0 && (
//           <li className="searchInput-center searchInput-sm searchInput-gray-400">No results</li>
//         )}
//       </ul>
//     </div>