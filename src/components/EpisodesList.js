import React from "react";

const EpisodesList = ({
  episodes,
  onEpisodeSelect,
  selectedEpisode,
  selectedEpisodeIndex,
}) => {
  return (
    <div className="episode-container">
      <h1 className="text-xl font-bold mb-4">Episodes</h1>
      <ul className="episode-list">
        {episodes.map((episode, index) => (
          <li
            key={episode.id}
            onClick={() => onEpisodeSelect(index)}
            className={`episode-item ${
              selectedEpisodeIndex === index ? "selected-episode" : ""
            }`}
          >
            {episode.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodesList;
