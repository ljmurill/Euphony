import Navigation from "../Navigation";
import '../HomePage/homePage.css'
function Home({isLoaded}){

    return(
        <div className="homeHeader">
            <Navigation isLoaded={isLoaded}/>
        </div>
    )
}

export default Home;
