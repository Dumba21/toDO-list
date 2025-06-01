import './SelectInput.css'
import {useEffect, useRef, useState} from "react";

const SelectInput = ({filterParam, setFilterParam}) => {
    const optionsArray = ['all', 'complete', 'incomplete'];
    const [optionBlock, setOptionBlock] = useState(false);
    const [optionValue, setOptionValue] = useState(optionsArray);
    const [selectedOption, setSelectedOption] = useState(optionsArray ? optionsArray[0] : '');
    const inputRef = useRef(null);
    const blockRef = useRef(null);


    useEffect(() => {
        function clickOut(event) {
            if (!blockRef.current.contains(event.target) ) {

                setOptionBlock(false);
            }
        }
        if(optionBlock) {
            document.addEventListener('mousedown', clickOut);
            return () => document.removeEventListener('mousedown', clickOut);

        }
    }, [optionBlock])

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        const filteredItems = optionsArray.filter((e) =>
            e.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setOptionValue(filteredItems);
    };
    const onBlurHandler = (e) => {
        e.target.value = '';
        setOptionValue(optionsArray);
    };

    const keyDownHandler = (e) => {
        if (e.key === 'Enter' && optionValue.length > 0) {
            setSelectedOption(optionValue[0]);
            setFilterParam(optionValue[0]);
            inputRef.current.blur();
            setOptionBlock(false);
        }
    }

    const mouseDownHandler = (e) => {
        setSelectedOption(e)
        setFilterParam(e);
    }

    const blurOutHandler = () => {
     if (inputRef.current === document.activeElement || optionBlock === false) {
            setOptionBlock(true);
        } else {
         setOptionBlock(false);
     }
    }

    return (
        <div>
            <div className="select-input-wrapper" ref={blockRef} onClick={blurOutHandler}>
                <input
                    type={"text"}
                    className={"select-input"}
                    onFocus={() => setOptionBlock(true)}
                    onBlur={(e) => onBlurHandler(e)}
                    placeholder={selectedOption}
                    onChange={handleInputChange}
                    onKeyDown={(e) => keyDownHandler(e)}
                    ref={inputRef}
                />
                <div className="select-input-line"></div>
                <div  style={{width: '100%'}}>

                    <svg
                        style={{transform: `translateY(-50%) rotate(${optionBlock ? '0' : '180deg'})`}} width="8"
                        height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4L1 1" stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 1L4 4" stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

            </div>
            <div style={{display: optionBlock ? 'block' : 'none', border: ' 2px solid #6c63ff',padding:'5px 0', borderRadius: '7px',position: 'absolute',background: '#fff',width:'160px'}}>
                {optionValue.length > 0 ? optionValue.map(((e, index) => (
                    <div
                        onMouseDown={() => mouseDownHandler(e)}
                        className={'option'}
                        key={index}
                        style={{backgroundColor: selectedOption === e ? '#bab8ed' : null}}>
                        {e}
                    </div>
                ))) : <div style={{padding: '7px 10px', textAlign: 'center'}}>No options</div>}
            </div>
        </div>
    )
};

export default SelectInput;