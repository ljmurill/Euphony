import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { allSongs } from "../../store/songs";
import '../HomePage/homePage.css'



function Home({isLoaded}){
    const dispatch = useDispatch();
    dispatch(allSongs());
    const songsArr = useSelector(state => console.log('hello', state.songs.songs.song))
    return(
        <div className="homeHeader">
            <Navigation isLoaded={isLoaded}/>
        </div>
    )
}

export default Home;
