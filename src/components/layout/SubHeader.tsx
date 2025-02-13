import { motion } from "framer-motion"; // Import Framer Motion
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"; // Import necessary icons
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IArtist } from "../../models/artists/IArtist";
import { IMovie } from "../../models/movies/IMovie";
import { getAllArtistsThunk } from "../../redux/actions/artistActions";
import { getAllMoviesThunk } from "../../redux/actions/movieActions";
import { AppDispatch, RootState, useAppDispatch } from "../../redux/store";

interface MenuItem {
  id: number;
  label: string;
  link: string;
}

const menuItems: MenuItem[] = [
  { id: 1, label: "Upcoming Movies", link: "upcoming" },
  { id: 2, label: "Recently Released", link: "recently-released" },
  { id: 3, label: "Actors", link: "actors" },
  { id: 4, label: "Actresses", link: "actresses" },
  { id: 5, label: "Directors", link: "directors" },
  { id: 6, label: "Musicians", link: "musicians" },
];

interface IProps {
  selectedLanguage: string;
}

const SubHeader: React.FC<IProps> = ({ selectedLanguage }) => {
  const dispatch: AppDispatch = useAppDispatch();
  const { movies } = useSelector((state: RootState) => state.movie);
  const { artists } = useSelector((state: RootState) => state.artist);

  useEffect(() => {
    dispatch(getAllMoviesThunk());
    dispatch(getAllArtistsThunk());
  }, [dispatch]);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [activeNavItem, setActiveNavItem] = useState<string | undefined>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<{
    movies: IMovie[];
    artists: {
      actors: IArtist[];
      musicians: IArtist[];
      directors: IArtist[];
      actresses: IArtist[];
    };
  }>({
    movies: [],
    artists: { actors: [], musicians: [], directors: [], actresses: [] },
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check if menu items overflow and update scrollability
  const checkOverflow = () => {
    const menu = menuRef.current;
    if (menu) {
      setIsOverflowing(menu.scrollWidth > menu.clientWidth);
      setCanScrollLeft(menu.scrollLeft > 0);
      setCanScrollRight(menu.scrollLeft + menu.clientWidth < menu.scrollWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    const menu = menuRef.current;
    if (menu) {
      menu.addEventListener("scroll", checkOverflow);
      window.addEventListener("resize", checkOverflow);
    }
    return () => {
      if (menu) menu.removeEventListener("scroll", checkOverflow);
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  // Scroll menu left
  const handleScrollLeft = () => {
    const menu = menuRef.current;
    if (menu) {
      const scrollAmount = menu.clientWidth * 0.8; // Scroll by 80% of the visible area
      menu.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      checkOverflow(); // Ensure overflow states are updated after scrolling
    }
  };

  // Scroll menu right
  const handleScrollRight = () => {
    const menu = menuRef.current;
    if (menu) {
      const scrollAmount = menu.clientWidth * 0.8; // Scroll by 80% of the visible area
      menu.scrollBy({ left: scrollAmount, behavior: "smooth" });
      checkOverflow(); // Ensure overflow states are updated after scrolling
    }
  };

  const industryMapping: { [key: string]: string } = {
    Telugu: "Tollywood",
    Tamil: "Kollywood",
    Hindi: "Bollywood",
    Malayalam: "Mollywood",
    Kannada: "Sandalwood",
    English: "Hollywood",
  };

  const textWood = industryMapping[selectedLanguage] || "Unknown Wood";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredResults({
        movies: [],
        artists: { actors: [], musicians: [], directors: [], actresses: [] },
      });
      setIsDropdownOpen(false);
      return;
    }

    // console.log(selectedLanguage, "Selected Lang")

    // Filter Movies
    const filteredMovies = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) &&
        movie.industryType?.toLowerCase() === textWood?.toLowerCase()
    );

    // Filter Artists by Type
    const filteredActors = artists.filter(
      (artist) =>
        artist.artistType === "actor" &&
        artist.language?.toLowerCase() === selectedLanguage?.toLowerCase() &&
        artist.name.toLowerCase().includes(query.toLowerCase())
    );
    const filteredMusicians = artists.filter(
      (artist) =>
        artist.artistType === "musician" &&
        artist.language?.toLowerCase() === selectedLanguage?.toLowerCase() &&
        artist.name.toLowerCase().includes(query.toLowerCase())
    );
    const filteredDirectors = artists.filter(
      (artist) =>
        artist.artistType === "director" &&
        artist.language?.toLowerCase() === selectedLanguage?.toLowerCase() &&
        artist.name.toLowerCase().includes(query.toLowerCase())
    );
    const filteredActresses = artists.filter(
      (artist) =>
        artist.artistType === "actress" &&
        artist.language?.toLowerCase() === selectedLanguage?.toLowerCase() &&
        artist.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredResults({
      movies: filteredMovies,
      artists: {
        actors: filteredActors,
        musicians: filteredMusicians,
        directors: filteredDirectors,
        actresses: filteredActresses,
      },
    });
    setIsDropdownOpen(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredResults({
      movies: [],
      artists: { actors: [], musicians: [], directors: [], actresses: [] },
    });
    setIsDropdownOpen(false);
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    clearSearch();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNavItem(entry.target.id);
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.8, // Trigger when 60% of the section is in view
      }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect(); // Cleanup the observer
  }, []);

  return (
    <nav
      className={`${
        isSearchOpen ? "h-[52px]" : "h-[52px]"
      } bg-light-card dark:bg-dark-card py-2 shadow-sm relative px-4`}
      style={{ userSelect: "none" }}
    >
      {!isSearchOpen ? (
        <div className="flex h-full items-center justify-center px-4 container mx-auto relative">
          {/* Search Icon */}
          <Search
            className="absolute left-0  md:left-0 bg-light-card dark:bg-dark-card text-light-primary dark:text-dark-primary cursor-pointer mr-4 text-lg sm:text-xl md:text-2xl truncate tracking-tighter"
            onClick={() => setIsSearchOpen(true)}
            style={{ userSelect: "none" }}
          />

          {/* Left Chevron Icon */}
          {isOverflowing && canScrollLeft && (
            <ChevronLeft
              className="absolute  left-6 bg-light-card dark:bg-dark-card text-light-primary dark:text-dark-primary cursor-pointer z-10 mr-2 text-2xl sm:text-3xl"
              onClick={handleScrollLeft}
            />
          )}

          {/* Menu Items */}
          <ul
            ref={menuRef}
            className="flex pl-6 items-center justify-start space-x-4 sm:space-x-4 md:space-x-6 text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary overflow-auto scrollbar-hide"
          >
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  const section = document.getElementById(item.link);
                  setActiveNavItem(section?.id);
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
                className={`filter hover:brightness-110 font-medium cursor-pointer tracking-normal text-nowrap ${
                  item.link === activeNavItem
                    ? "text-light-primary dark:text-dark-primary hover:text-light-primary dark:hover:text-dark-primary"
                    : ""
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* Right Chevron Icon */}
          {isOverflowing && canScrollRight && (
            <ChevronRight
              className="absolute right-0 bg-light-card dark:bg-dark-card text-light-primary dark:text-dark-primary cursor-pointer z-10 text-2xl sm:text-3xl"
              onClick={handleScrollRight}
            />
          )}
        </div>
      ) : (
        <motion.div
          className="absolute inset-0 bg-light-card dark:bg-dark-card flex items-center container mx-auto px-4 md:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transform: "translateY(-10px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <X
            className="text-light-primary dark:text-dark-primary cursor-pointer transition-transform hover:scale-110"
            onClick={() => {
              setIsDropdownOpen(false), setIsSearchOpen(false);
            }}
          />
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Movies and Artists..."
              className="w-full h-10 px-4 dark:focus:outline-stone-900 focus:outline-white border focus:border-gray-200 dark:border-gray-600 dark:focus:border-gray-700 pr-10 mx-2 rounded-full bg-light-bg dark:bg-dark-bg text-light-textPrimary dark:text-dark-textPrimary focus:outline-none transition-all duration-300"
            />
            {searchQuery && (
              <X
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary cursor-pointer hover:text-light-primary dark:hover:text-dark-primary"
                onClick={clearSearch}
              />
            )}
            {isDropdownOpen && (
              <motion.div
                className="absolute mt-2 w-full bg-light-bg dark:bg-dark-bg text-light-textPrimary dark:text-dark-textPrimary rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Movies Section */}
                {filteredResults.movies.length > 0 && (
                  <div>
                    <h3 className="px-4 py-2 text-lg font-bold text-light-primary dark:text-dark-primary">
                      Movies
                    </h3>
                    {filteredResults.movies.map((movie, index: number) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-light-card dark:hover:bg-dark-card cursor-pointer transition-all rounded"
                        onClick={() =>
                          handleResultClick(`/movies/${movie._id}/details`)
                        }
                      >
                        {movie.title}
                      </div>
                    ))}
                  </div>
                )}

                {/* Artists Section */}
                {filteredResults.artists.actors.length > 0 && (
                  <div>
                    <h3 className="px-4 py-2 text-lg font-bold text-light-primary dark:text-dark-primary">
                      Actors
                    </h3>
                    {filteredResults.artists.actors.map(
                      (actor, index: number) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-light-card dark:hover:bg-dark-card cursor-pointer transition-all rounded"
                          onClick={() =>
                            handleResultClick(`/artists/actor/${actor._id}`)
                          }
                        >
                          {actor.name}
                        </div>
                      )
                    )}
                  </div>
                )}

                {filteredResults.artists.actresses.length > 0 && (
                  <div>
                    <h3 className="px-4 py-2 text-lg font-bold text-light-primary dark:text-dark-primary">
                      Actresses
                    </h3>
                    {filteredResults.artists.actresses.map(
                      (actress, index: number) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-light-card dark:hover:bg-dark-card cursor-pointer transition-all rounded"
                          onClick={() =>
                            handleResultClick(`/artists/actor/${actress._id}`)
                          }
                        >
                          {actress.name}
                        </div>
                      )
                    )}
                  </div>
                )}

                {filteredResults.artists.musicians.length > 0 && (
                  <div>
                    <h3 className="px-4 py-2 text-lg font-bold text-light-primary dark:text-dark-primary">
                      Musicians
                    </h3>
                    {filteredResults.artists.musicians.map(
                      (musician, index: number) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-light-card dark:hover:bg-dark-card cursor-pointer transition-all rounded"
                          onClick={() =>
                            handleResultClick(
                              `/artists/musician/${musician._id}`
                            )
                          }
                        >
                          {musician.name}
                        </div>
                      )
                    )}
                  </div>
                )}

                {filteredResults.artists.directors.length > 0 && (
                  <div>
                    <h3 className="px-4 py-2 text-lg font-bold text-light-primary dark:text-dark-primary">
                      Directors
                    </h3>
                    {filteredResults.artists.directors.map(
                      (director, index: number) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-light-card dark:hover:bg-dark-card cursor-pointer transition-all rounded"
                          onClick={() =>
                            handleResultClick(
                              `/artists/director/${director._id}`
                            )
                          }
                        >
                          {director.name}
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* No Results */}
                {filteredResults.movies.length === 0 &&
                  filteredResults.artists.actors.length === 0 &&
                  filteredResults.artists.musicians.length === 0 &&
                  filteredResults.artists.directors.length === 0 &&
                  filteredResults.artists.actresses.length === 0 && (
                    <div className="px-4 py-2 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <Search name="Search" className="mr-2 w-5 h-5" />
                      No results found
                    </div>
                  )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default SubHeader;
