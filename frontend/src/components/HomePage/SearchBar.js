
import { useDispatch, useSelector } from "react-redux";
import LoginUploadModal from "../LoginFormModal/loginUploadSetop";

import '../HomePage/homePage.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginSearchModal from "../LoginFormModal/loginSearchSetUp";

const defaultImage = 'https://preview.redd.it/e1l2mfuraia51.jpg?width=960&crop=smart&auto=webp&s=598397a1367b7a4a7c273d10a0298d6b848a1c94';
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

                    {sessionUser && search.map((song, i) => {
                        return (
                            <div className="data" key={i}>
                                <Link to = {`api/songs/${song.id}`} className="songLink">
                                    <img className ='imageOnRightSide' alt='' src={song.imageUrl ? song.imageUrl : defaultImage}/>
                                    <div className='titleNameRight'>
                                        <div className='titleRelated'>
                                            {song.title}
                                        </div>
                                        <div className='usernameRelated'>
                                            {song.User.username}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                    {!sessionUser && search.map((song, i) => {
                        return (
                            <div key={i}>
                                <LoginSearchModal song={song}/>
                            </div>
                        )
                    })}
                </div>
                }
            </label>
                <p className="orText">or</p>
                {sessionUser ? <Link to='/songs/create'><button className="uploadButton">Upload Your Own</button></Link> : <LoginUploadModal/>}

        </div>
        </div>


    )
}

export default SearchBar;
