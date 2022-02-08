
import { useDispatch, useSelector } from "react-redux";
import { allSongs } from "../../store/songs";
import '../HomePage/homePage.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function SearchBar({allSongs}){
    const [search, setSearch] = useState([]);
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
                <input
                type='text'
                onChange={handleSearch}
                placeholder="Search for songs"
                className="searchInput"
                />
                <button type='button' className="searchSubmit"><i className="fas fa-search"></i></button>
                <p>Or</p>
                {sessionUser ? <button><Link to='/api/songs/create'>Upload Your Own</Link></button> : <button>Upload Your Own</button>}

        </div>
            {search.length !== 0 &&
            <div className="dataResults">
                {search.map((song, i) => {
                    return (
                        <a className="songLink" key={i}>
                            <p>{song.title}</p>
                        </a>
                    )
                })}
            </div>
            }
        </div>


    )
}

export default SearchBar;
