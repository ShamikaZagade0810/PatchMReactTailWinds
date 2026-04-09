import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800"
    >
      Toggle Theme
    </button>
  );
}
