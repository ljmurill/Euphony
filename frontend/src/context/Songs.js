// import { createContext, useContext, useEffect} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { allSongs } from '../store/songs';


// export const SongContext = createContext();

// export const useSongs = () => useContext(SongContext);

// export default function SongsProvider({ children }) {
//     const dispatch = useDispatch();
//     const songsArr = useSelector(state => state.songs.songs);

//     useEffect(() => {
//         dispatch(allSongs());
//     },[])

//   return (
//     <SongContext.Provider
//       value={{
//           songsArr
//       }}
//     >
//       {children}
//     </SongContext.Provider>
//   );
// }
