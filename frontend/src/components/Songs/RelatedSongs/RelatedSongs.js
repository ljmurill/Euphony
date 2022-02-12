import './relatedSongs.css'
import { Link } from "react-router-dom";

function RelatedSongs({songs}){

    const defaultImage = 'https://preview.redd.it/e1l2mfuraia51.jpg?width=960&crop=smart&auto=webp&s=598397a1367b7a4a7c273d10a0298d6b848a1c94';



    return(
        <div className='relatedSongsDiv'>
            {songs && songs.map((song, i) => (
                <Link key={i} to={`/api/songs/${song.id}`} className='relatedLink'>
                <div key={song.id} className='relatedSongsInfo'>

                    <img className ='imageOnRightSide' src={song.imageUrl ? song.imageUrl : defaultImage}/>
                    <div className='titleNameRight'>
                        <div className='titleRelated'>
                            {song.title}
                        </div>
                        <div className='usernameRelated'>
                            {song.User.username}
                        </div>
                    </div>
                </div>
                </Link>
                ))}
        </div>
    )
}

export default RelatedSongs;