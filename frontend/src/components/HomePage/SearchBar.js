
import { useDispatch, useSelector } from "react-redux";
import { allSongs } from "../../store/songs";
import '../HomePage/homePage.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function SearchBar({allSongs}){
    const [search, setSearch] = useState([]);
    // const [close, setClose] = useState(true);
    const sessionUser = useSelector(state => state.session.user)

    const handleSearch = (e) => {
        const searchWord = e.target.value;
        const newSearch = allSongs.filter((song) => {
            return song.title.toLowerCase().includes(searchWord.toLowerCase())
        })
        if (searchWord === ''){
            setSearch([])
        }else{
            setSearch(newSearch)
        }
    }




    return(
        <div className="searchBar">
        <div className='searchAndCreate'>
            <label className="search">
                <input
                type='text'
                onChange={handleSearch}
                placeholder="Search for songs"
                className="searchInput"
                >
                </input>
                <button type='button' className="searchSubmit"><i className="fas fa-search"></i></button>
                {search.length !== 0 &&
                <div className="dataResults">
                    {search.map((song, i) => {
                        return (
                            <div className="data" key={i}>
                                <Link to = {`api/songs/${song.id}`} className="songLink">
                                    {song.title}
                                </Link>
                            </div>
                        )
                    })}
                </div>
                }
            </label>
                <p className="orText">or</p>
                {sessionUser ? <Link to='/api/songs/create'><button className="uploadButton">Upload Your Own</button></Link> : <button className="uploadButton">Upload Your Own</button>}

        </div>
        </div>


    )
}

export default SearchBar;
