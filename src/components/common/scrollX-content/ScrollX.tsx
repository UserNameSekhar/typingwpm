import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MovieCard from "../../movies/MovieCard";
import ArtistCard from "../../artists/ArtistCard";
import { IMovie } from "../../../models/movies/IMovie";
import { IArtist } from "../../../models/artists/IArtist";

interface ScrollXProps {
  filteredItems: any;
  displayedItems: any;
  type: string;
  filterBy?: string;
}

const ScrollX: React.FC<ScrollXProps> = ({
  filteredItems,
  displayedItems,
  type,
  filterBy,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // const updateScrollButtons = () => {
  //   if (scrollRef.current) {
  //     const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
  //     setCanScrollLeft(scrollLeft > 0);
  //     setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  //   }
  // };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  // const scroll = (direction: "left" | "right") => {
  //   if (scrollRef.current) {
  //     const scrollAmount = direction === "left" ? -300 : 300;
  //     scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  //   }
  // };

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth / 2;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   updateScrollButtons();
  //   const handleResize = () => updateScrollButtons();
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {
    updateScrollButtons();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          className="absolute -left-5 hidden sm:block top-1/2 transform -translate-y-1/2 bg-light-textPrimary/30 hover:bg-light-textPrimary/20 text-white hover:text-white  transition-all ease-in-out duration-100 delay-75 hover:transition-all font-bold font-accent   rounded-full shadow-md p-2 z-10"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <ChevronLeft fontSize="large" />
        </button>
      )}
      {canScrollRight && (
        <button
          className="absolute -right-5 hidden sm:block top-1/2 transform -translate-y-1/2 bg-light-textPrimary/30 hover:bg-light-textPrimary/20 text-white/90 hover:text-white transition-all ease-in-out duration-100 delay-75 hover:transition-all font-bold font-accent   rounded-full shadow-md p-2 z-10"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <ChevronRight fontSize="large" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide my-2 py-2"
      >
        {filteredItems.length > 0 ? (
          displayedItems.map((item: any, index: number) =>
            type === "movies" ? (
              <MovieCard key={index} movie={item as IMovie} />
            ) : (
              <ArtistCard key={index} artist={item as IArtist} />
            )
          )
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-32 font-medium text-light-textSecondary/60 dark:text-dark-textSecondary/60 space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              className="h-10 w-10"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m6-2h.01M15 10h.01M9 15h6"
              />
            </svg>
            <p className="text-center">
              No {type === "movies" ? "movies" : filterBy} added/found in this
              section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollX;
