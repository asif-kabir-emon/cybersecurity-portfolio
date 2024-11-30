import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Check if the current window matches the query
    setMatches(mediaQueryList.matches);

    // Add event listener to detect changes
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQueryList.addEventListener("change", listener);

    // Cleanup the event listener on unmount
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
