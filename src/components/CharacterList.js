import React from "react";

const CharacterList = ({
  episode,
  characters,
  setCurrentPage,
  currentPage,
  totalPages,
  handleCharacterSelect,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{`${
        episode?.name || "Characters"
      }`}</h2>
      <div className="character-list">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div
              onClick={() => handleCharacterSelect(character)}
              key={character.id}
              className="character-card"
            >
              <img
                src={character.image}
                alt={character.name}
                className="mt-10 mx-auto rounded-full"
              />
              <h3 className="font-semibold text-center mt-2 font-weight-bold">
                {character.name}
              </h3>
            </div>
          ))
        ) : (
          <p>No characters available for this episode.</p>
        )}
      </div>

      <div className="pagination mt-4">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default CharacterList;
