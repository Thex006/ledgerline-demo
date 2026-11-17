"use client";

import { useEffect } from "react";

/**
 * Loads the taste-skill moment loader (public/assets/moments, an unmodified kit copy) once on the
 * client. It mounts every [data-moment] element on the page. Without JS, or under reduced motion,
 * each moment shows its finished state as written in the HTML.
 */
export function Moments() {
  useEffect(() => {
    const src = "/assets/moments/moments.js";
    import(/* webpackIgnore: true */ src).catch(() => {
      /* moment content is already readable as plain HTML */
    });
  }, []);
  return null;
}
