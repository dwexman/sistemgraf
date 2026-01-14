import React from "react";
import ForumCard from "./ForumCard";

export default function PublicacionesList({ items = [], onOpen }) {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ForumCard key={item.id} item={item} onOpen={onOpen} />
      ))}
    </div>
  );
}
