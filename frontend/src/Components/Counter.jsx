import { useState, useEffect } from "react";
import React from "react";

export default function Counter({ count }) {
  const [firstnum, setferstnum] = useState(0);
  const [scrolly, setscrolly] = useState(null);

  useEffect(() => {
    const handleResize = () => setscrolly(window.scrollY);
    window.addEventListener("scroll", handleResize);
    handleResize();

    if (scrolly > 91 && scrollY < 700) {
      let interval = setInterval(() => {
        setferstnum((prev) => prev + 1);
      }, 10);

      if (firstnum === count) {
        clearInterval(interval);
      }

      return () => {
        window.removeEventListener("scroll", handleResize);
        clearInterval(interval);
      };
    }
  }, [firstnum, scrolly]);

  return <>{firstnum}</>;
}
