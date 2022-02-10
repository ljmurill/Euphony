import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { allSongs } from "../../store/songs";
import '../HomePage/homePage.css'
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";





const defaultImage = "https://preview.redd.it/e1l2mfuraia51.jpg?width=960&crop=smart&auto=webp&s=598397a1367b7a4a7c273d10a0298d6b848a1c94";

function Home({isLoaded}){
    const dispatch =useDispatch();
    const songsArr = useSelector(state => state.songs.songs);
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(allSongs())
      }, [])



    return(
        <>
            <div className="homeHeader">
                <Navigation isLoaded={isLoaded}/>
                <SearchBar allSongs={songsArr}/>

            </div>

            <h3 className="titleSongs">What's new on Euphony!</h3>
            <div className="songs">
                {sessionUser && songsArr && songsArr.map((song, id) => {

                    return (id < 20 &&
                        <Link to={`/api/songs/${song.id}`} key={id} className='linkSong'>
                        <div className="songBlock">
                            <div className="imageDiv">
                                {song.imageUrl ? <img src={song.imageUrl} className='songImage'/>: <img src={defaultImage} className='songImage'/>}
                            </div>
                                <div className="optionsSongs">
                                    <div>
                                    <p className="songDetails title">{song.title}</p>
                                    <p className="songDetails username">{song.User.username}</p>
                                    </div>
                                </div>
                        </div></Link>
                    )

                })}
                {!sessionUser && songsArr && songsArr.map((song, id) => {

                    return (id < 20 &&

                        <div className="songBlock" key={id}>
                            <div className="imageDiv">
                                {song.imageUrl ? <img src={song.imageUrl} className='songImage'/>: <img src={defaultImage} className='songImage'/>}
                            </div>
                                <div className="optionsSongs">
                                    <div>
                                    <p className="songDetails title">{song.title}</p>
                                    <p className="songDetails username">{song.User.username}</p>
                                    </div>
                                </div>
                        </div>
                    )

                })};
            </div>
        </>

    )
}

export default Home;
