import React from "react";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import MenuGrid from "./MenuGrid";
import { div } from "framer-motion/client";

export default function ArtisanGrid({ providers }) {
  return (
    <div>
      <MenuGrid providers={providers} />
    </div>
  );
}
