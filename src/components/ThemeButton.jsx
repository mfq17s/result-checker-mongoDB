import PropTypes from "prop-types";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeButton = ({ theme, toggleTheme }) => {
  return (
    <button
      className={`${
        theme === "dark"
          ? " text-white"
          : " text-gray-800"
      }`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <FaSun className="mr-2" />
      ) : (
        <FaMoon className="mr-2" />
      )}
    </button>
  );
};

ThemeButton.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default ThemeButton;
