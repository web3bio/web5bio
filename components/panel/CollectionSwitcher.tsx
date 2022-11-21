import { memo, useState } from "react";
import Image from "next/image";
import { NFTAssetPlayer } from "../shared/NFTAssetPlayer";

const RenderCollectionSwitcher = (props) => {
  const { collections, currentSelect, onSelect } = props;

  const [displayMenu, setDisplayMenu] = useState(false);
  const [active, setActive] = useState(currentSelect);

  const hideDropdownMenu = (v) => {
    setDisplayMenu(false);
    setActive(v);
    onSelect(v);
  };
  return (
    <div className="collection-switcher">
      <div className="collection-list">
        {collections.map((item) => (
          <div
            onClick={() => hideDropdownMenu(item)}
            className={
              item.key === active.key
                ? "collection-item active"
                : "collection-item"
            }
            key={item.key}
          >
            <NFTAssetPlayer className="collection-img" src={item.url} />
            <div className="collection-name text-assistive">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CollectionSwitcher = memo(RenderCollectionSwitcher);
