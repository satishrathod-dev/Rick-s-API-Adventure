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

  //  // CharacerDetails logic

  // const navigate = useNavigate();

  const handleCharacterSelect = (character) => {
    console.log("Selected character:", character);
    setSelectedCharacter(character);
    // navigate(`/character/${character.id}`);
  };

  // const navigate = useNavigate();
  // const handleCharacterSelect = (character) => {
  //   console.log("Selected character:", character);
  //   setSelectedCharacter(character);
  //   navigate(`/character/${character.id}`);
  // };

  // Pagination logic
  const charactersPerPage = 10;

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  const totalPages = Math.ceil(characters.length / charactersPerPage);

  // return (
  // Commented out handleCharacterSelect cause its causing some bug in the app for now **fix it**
  //   <div className="container">
  //     <div className="sidebar">
  //       <EpisodesList
  //         episodes={episodes}
  //         onEpisodeSelect={handleEpisodeSelect}
  //         selectedEpisodeIndex={selectedEpisodeIndex}
  //       />
  //     </div>

  //     {/* <div className="main-content">
  //       <CharacterList
  //         handleCharacterSelect={handleCharacterSelect}
  //         episode={
  //           selectedEpisodeIndex !== null
  //             ? episodes[selectedEpisodeIndex]
  //             : null
  //         }
  //         characters={currentCharacters}
  //       />
  //       <Pagination
  //         currentPage={currentPage}
  //         totalPages={totalPages}
  //         setCurrentPage={setCurrentPage}
  //       />
  //     </div> */}
  //     <div className="main-content">
  //       <Routes>
  //         <Route
  //           path="/"
  //           element={
  //             <>
  //               <CharacterList
  //                 handleCharacterSelect={handleCharacterSelect}
  //                 episode={
  //                   selectedEpisodeIndex !== null
  //                     ? episodes[selectedEpisodeIndex]
  //                     : null
  //                 }
  //                 characters={currentCharacters}
  //               />
  //               <Pagination
  //                 currentPage={currentPage}
  //                 totalPages={totalPages}
  //                 setCurrentPage={setCurrentPage}
  //               />
  //             </>
  //           }
  //         />
  //         {/* <Route
  //           path="/character/:id"
  //           element={<CharacterDetails />} // This will display character details
  //         /> */}
  //       </Routes>
  //     </div>
  //   </div>
  // );
  return (
    <div className="container">
      <div className="sidebar">
        <EpisodesList
          episodes={episodes}
          onEpisodeSelect={handleEpisodeSelect}
          selectedEpisodeIndex={selectedEpisodeIndex}
        />
      </div>

      <div className="main-content">
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
      </div>
    </div>
  );
};

export default App;
