import { useState } from 'react';
import { categories } from "./BrowseByTopicData";
import BrowseByTopicSection from "./BrowseByTopicSection";
import ChooseACategory from "./ChooseACategory";





export default function BrowseByTopic() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const activeCategory = categories.find((category) => category.id === activeId) ?? categories[0];

  return (
    <>
      <ChooseACategory activeId={activeId} setActiveId={setActiveId} />

        <BrowseByTopicSection activeId={activeId} setActiveId={setActiveId} activeCategory={activeCategory} />
    </>
  );
}
