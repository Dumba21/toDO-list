import "./SearchInput.css";

const SearchInput = ({changeFunc}) => {
    const onChangeHandler = (e) => {
        changeFunc(e.target.value);
    }
    return (
        <div>
            <input onChange={e =>onChangeHandler(e)} type={"text"} className={'search-input'} placeholder={"Search note..."} />
        </div>
    )
};

export default SearchInput;