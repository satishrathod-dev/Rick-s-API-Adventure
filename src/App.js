// import React, { useEffect, useState } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import axios from "axios";
// import EpisodesList from "./components/EpisodesList";
// import CharacterList from "./components/CharacterList";
// // import CharacterDetails from "./Routes/CharacterDetails";
// import "./App.css";

// const App = () => {
//   const [episodes, setEpisodes] = useState([]);
//   const [characters, setCharacters] = useState([]);
//   const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);
//   const [selectedEpisode, setSelectedEpisode] = useState(null);
//   const [selectedCharacter, setSelectedCharacter] = useState(null);

//   useEffect(() => {
//     // EpisodeList API
//     // (1)API-1
//     const fetchepisodes = async () => {
//       try {
//         const response = await axios.get(
//           "https://rickandmortyapi.com/api/episode"
//         );
//         // const data = await response.json();
//         // console.log(data);
//         // console.log(response);
//         setEpisodes(response.data.results);
//       } catch (error) {
//         console.error("Error fetching episodes:", error);
//       }
//     };

//     // CharacterList API
//     // (2)API-2
//     const fetchCharacters = async () => {
//       try {
//         const response = await axios.get(
//           "https://rickandmortyapi.com/api/character"
//         );
//         // const data = await response.json();
//         // console.log(response);
//         setCharacters(response.data.results);
//       } catch (error) {
//         console.error("Error fetching characters:", error);
//       }
//     };
//     fetchepisodes();
//     fetchCharacters();
//   }, []);

//   // EpisodeList handling
//   const handleEpisodeSelect = async (episode) => {
//     setSelectedEpisode(episode);
//     try {
//       const characterPromises = episode.characters.map((url) => axios.get(url));
//       const characterResponses = await Promise.all(characterPromises);
//       setCharacters(characterResponses.map((res) => res.data));
//     } catch (error) {
//       console.error("Error fetching episodes:", error);
//     }
//   };

//   // CharacterList handling
//   const navigate = useNavigate();

//   const handleCharacterSelect = (character) => {
//     console.log("Selected character:", character);
//     setSelectedCharacter(character);
//     navigate(`/character/${character.id}`);
//   };

//   const fetchCharacters = async (characterUrls) => {
//     try {
//       const characterPromises = characterUrls.map((url) => axios.get(url));
//       const characterResponses = await Promise.all(characterPromises);
//       setCharacters(characterResponses.map((res) => res.data));
//     } catch (error) {
//       console.error("Error fetching characters:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="sidebar">
//         <EpisodesList
//           episodes={episodes}
//           onEpisodeSelect={handleEpisodeSelect}
//           selectedEpisode={selectedEpisode}
//         />
//       </div>

//       {/* <div className="w-3/4">
//         <CharacterList
//           characters={characters}
//           onCharacterSelect={handleCharaterSelect}
//         />
//         {selectedCharacter && (
//           <div className="character-details">
//             <h2>{selectedCharacter.name}</h2>
//             <img src={selectedCharacter.image} alt={selectedCharacter.name} />
//             <p>Status: {selectedCharacter.status}</p>
//             <p>Species: {selectedCharacter.species}</p>
//             <p>Origin: {selectedCharacter.origin.name}</p>
//           </div>
//         )}
//       </div> */}
//       <div className="main-content">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <CharacterList
//                 characters={characters}
//                 handleCharacterSelect={handleCharacterSelect}
//                 selectedCharacter={selectedCharacter}
//               />
//             }
//           />
//           <Route
//             path="/character/:id"
//             // element={<CharacterDetails episodes={episodes} />}
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import EpisodesList from "./components/EpisodesList";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./Routes/CharacterDetails";
import Pagination from "./components/Pagination";
import "./App.css";

const App = () => {
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const charactersPerPage = 10;

  useEffect(() => {
    // Fetch all episodes
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/episode"
        );
        setEpisodes(response.data.results);
        // Fetch characters from the first episode
        if (response.data.results.length > 0) {
          fetchCharacters(response.data.results[0].characters);
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, []);

  // Fetch characters for the selected episode
  const fetchCharacters = async (characterUrls) => {
    try {
      const characterPromises = characterUrls.map((url) => axios.get(url));
      console.log(characterPromises);
      const characterResponses = await Promise.all(characterPromises);
      setCharacters(characterResponses.map((res) => res.data));
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  const handleEpisodeSelect = (index) => {
    if (episodes[index]) {
      if (selectedEpisodeIndex === index) {
        setSelectedEpisodeIndex(null);
        setCurrentPage(1);
        if (episodes.length > 0) {
          fetchCharacters(episodes[0].characters);
          setSelectedEpisodeIndex(0);
        }
      } else {
        setSelectedEpisodeIndex(index);
        fetchCharacters(episodes[index].characters);
        setCurrentPage(1); // Reset to the first page when selecting a new episode
      }
    }
  };

  //
  // const navigate = useNavigate();

  // const handleCharacterSelect = (character) => {
  //   console.log("Selected character:", character);
  //   setSelectedCharacter(character);
  //   navigate(`/character/${character.id}`);
  // };
  const navigate = useNavigate();
  const handleCharacterSelect = (character) => {
    console.log("Selected character:", character);
    setSelectedCharacter(character);
    navigate(`/character/${character.id}`);
  };

  // Pagination logic
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  const totalPages = Math.ceil(characters.length / charactersPerPage);

  return (
    <div className="container">
      <div className="sidebar">
        <EpisodesList
          episodes={episodes}
          onEpisodeSelect={handleEpisodeSelect}
          selectedEpisodeIndex={selectedEpisodeIndex}
        />
      </div>

      {/* <div className="main-content">
        <CharacterList
          handleCharacterSelect={handleCharacterSelect}
          episode={
            selectedEpisodeIndex !== null
              ? episodes[selectedEpisodeIndex]
              : null
          }
          characters={currentCharacters}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div> */}
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CharacterList
                  handleCharacterSelect={handleCharacterSelect}
                  episode={
                    selectedEpisodeIndex !== null
                      ? episodes[selectedEpisodeIndex]
                      : null
                  }
                  characters={currentCharacters}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </>
            }
          />
          <Route
            path="/character/:id"
            element={<CharacterDetails />} // This will display character details
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
