import { ChevronsRight } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IArtist } from "../../models/artists/IArtist";
import { IMovie } from "../../models/movies/IMovie";
import { getArtistsByType } from "../../utils/artistUtil";
import {
  getRecentlyReleasedMovies,
  getUpcomingMovies,
} from "../../utils/movieUtils";
import ScrollX from "../common/scrollX-content/ScrollX";
import { AppDispatch, RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { getAllArtistsThunk } from "../../redux/actions/artistActions";
import { getAllMoviesThunk } from "../../redux/actions/movieActions";

interface SectionProps {
  id: string;
  title: string;
  type: "movies" | "artists";
  filterBy?: string;
  selectedLanguage: string;
}

const ContentSection: React.FC<SectionProps> = ({
  id,
  title,
  type,
  filterBy,
  selectedLanguage,
}) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const { artists } = useSelector((state: RootState) => state.artist);
  const { movies } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    dispatch(getAllArtistsThunk());
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  const items =
    type === "movies"
      ? movies.filter((movie) => movie.industryType?.toLowerCase() === selectedLanguage?.toLowerCase())
      : artists.filter((artist) => artist.industry?.toLowerCase() === selectedLanguage?.toLowerCase());

  // Filter items dynamically based on the filterBy prop
  const filteredItems =
    type === "movies"
      ? filterBy === "upcoming"
        ? getUpcomingMovies(items as IMovie[])
        : filterBy === "recently-released"
        ? getRecentlyReleasedMovies(items as IMovie[])
        : items
      : filterBy
      ? getArtistsByType(items as IArtist[], filterBy)
      : items;

  // Limit to 7 items for the section
  const displayedItems = filteredItems.slice(0, 7);

  return (
    <section
      id={id}
      className="section py-4 scroll-mt-[115px] md:scroll-mt-[130px]"
      aria-labelledby={`${id}-heading`}
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-4">
          <h2
            id={`${id}-heading`}
            className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-200"
            aria-label={title}
          >
            {title}
          </h2>
          {/* Conditionally render the "See More" button */}
          {filteredItems.length > 0 && (
            <button
              className="text-xs sm:text-sm md:text-base flex gap-1 justify-center items-center text-light-textSecondary dark:text-dark-textSecondary font-medium hover:text-light-primary dark:hover:text-dark-primary transition-all ease-in-out duration-150 delay-75"
              onClick={() =>
                navigate(`/${type}/${filterBy || "all"}`, {
                  state: { selectedLanguage },
                })
              }
              aria-label={`See more ${type}`}
            >
              <span>See More</span>
              <ChevronsRight />
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <ScrollX
          filteredItems={filteredItems}
          displayedItems={displayedItems}
          type={type}
          filterBy={filterBy ? filterBy : ""}
        />
      </div>
    </section>
  );
};

export default ContentSection;
