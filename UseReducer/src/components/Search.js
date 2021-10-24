const Search=({searchTerm,onChange})=>{
    return(
        <>
            <label>Search for stories: </label>
            <input type="text" value={searchTerm}onChange={onChange}></input>
        </>
    )
}
export default Search