import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getArtistByIdThunk,
  likeArtistThunk,
} from "../../../redux/actions/artistActions";
import {
  getMovieByIdThunk,
  likeMovieThunk,
} from "../../../redux/actions/movieActions";
import { AppDispatch, RootState, useAppDispatch } from "../../../redux/store";

interface LikeBtnProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  view: string;
  id: string;
  isClicked: boolean;
}

const LikeButton: React.FC<LikeBtnProps> = ({
  setShowLogin,
  isLoggedIn,
  view,
  id,
  isClicked,
}) => {
  const dispatch: AppDispatch = useAppDispatch();
  const { artist, isLoading } = useSelector((state: RootState) => state.artist);
  const { movie } = useSelector((state: RootState) => state.movie);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (view === "movie") {
      dispatch(getMovieByIdThunk(id));
    } else {
      dispatch(getArtistByIdThunk(id));
    }
  }, [dispatch, id, view, isClicked]);

  // Determine if the current user has liked the artist
  const isArtistLiked = artist?.likedBy?.includes(user._id) ?? false;
  // Fix: Update this to check movie's likedBy
  const isMovieLiked = movie?.likedBy?.includes(user._id) ?? false;

  const handleToggleLike = async () => {
    if (!id) return;

    if (isLoggedIn) {
      try {
        if (view === "movie") {
          await dispatch(likeMovieThunk(id));
          await dispatch(getMovieByIdThunk(id));
        } else {
          await dispatch(likeArtistThunk(id));
          await dispatch(getArtistByIdThunk(id));
        }
      } catch (error) {
        console.error("Failed to like/unlike:", error);
      }
    } else {
      setShowLogin(true);
    }
  };

  return (
    <button
      aria-label={`${
        view === "movie"
          ? isMovieLiked
            ? "Unlike"
            : "Like"
          : isArtistLiked
          ? "Unlike"
          : "Like"
      } ${view}`}
      title={`${
        view === "movie"
          ? isMovieLiked
            ? "Unlike"
            : "Like"
          : isArtistLiked
          ? "Unlike"
          : "Like"
      } ${view}`}
      onClick={handleToggleLike}
      disabled={isLoading}
      className="max-w-[140px] w-full h-9 sm:h-10 flex items-center justify-start rounded-md overflow-hidden cursor-pointer shadow-md bg-transparent hover:shadow-lg transition-all duration-300 active:scale-95"
    >
      {/* Left Section */}
      <span className="w-7/12 h-full bg-[rgb(238,0,0)] dark:bg-dark-primary flex items-center justify-center gap-1.5 sm:gap-2">
        <motion.div
          animate={{
            scale: (view === "movie" ? isMovieLiked : isArtistLiked) ? 1.2 : 1, // Ensure scale is a number
            rotate: (view === "movie" ? isMovieLiked : isArtistLiked) ? 360 : 0, // Ensure rotate is a number
          }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 45,
          }}
          className="flex items-center justify-center"
        >
          <HeartIcon
            className={`w-[18px] h-[18px] sm:w-5 sm:h-5 ${
              view === "movie"
                ? isMovieLiked
                  ? "fill-white stroke-none"
                  : "fill-transparent stroke-white"
                : isArtistLiked
                ? "fill-white stroke-none"
                : "fill-transparent stroke-white"
            }`}
          />
        </motion.div>

        <span className="text-white font-semibold text-xs sm:text-sm">
          Like
        </span>
      </span>

      {/* Right Section */}
      <span className="w-5/12 h-full flex items-center justify-center text-light-bg dark:text-dark-primary font-bold bg-gray-900 dark:bg-dark-textPrimary relative text-xs sm:text-sm">
        {view === "movie" ? movie?.likes ?? 0 : artist?.likes ?? 0}
        <div className="absolute h-2 w-2 bg-gray-900 dark:bg-dark-textPrimary transform rotate-45 -left-1 top-1/2 -translate-y-1/2"></div>
      </span>
    </button>
  );
};

export default LikeButton;
