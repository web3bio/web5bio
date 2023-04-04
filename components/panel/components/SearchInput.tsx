import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import {
  DomainSearchSuffix,
  fuzzyDomainSuffix,
} from "../../../utils/constants";
import { SocialPlatformMapping } from "../../../utils/platform";
import { matchQuery } from "../../../utils/queries";
import { PlatformType } from "../../../utils/type";
import { handleSearchPlatform } from "../../../utils/utils";

const isQuerySplit = (query: string) => {
  return query.includes(".") || query.includes("。");
};

export const SearchInput = (props) => {
  const { defaultValue, handleSubmit } = props;
  const [query, setQuery] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const inputRef = useRef(null);

  const emitSubmit = (e, value?) => {
    const platfrom =
      typeof value !== "string" && value.key === PlatformType.farcaster
        ? PlatformType.farcaster
        : "";
    const _value = typeof value === "string" ? value : value.label;
    handleSubmit(_value, platfrom);
    setSearchList([]);
  };

  useEffect(() => {
    if (!query || query.length > 20) {
      setSearchList([]);
      return;
    }
    const isLastDot = [".", "。"].includes(query[query.length - 1]);
    if (isQuerySplit(query) && !isLastDot) {
      if (isLastDot) return;
      const backupDomains = fuzzyDomainSuffix.map(
        (x) => matchQuery(query) + `.${x.label}`
      );
      setSearchList(
        backupDomains.reduce((pre, cur) => {
          if (cur.includes(query.replace("。", "."))) {
            pre.push({
              icon: SocialPlatformMapping(handleSearchPlatform(cur)).icon || "",
              label: cur,
            });
          }
          return pre;
        }, [])
      );
    } else {
      setSearchList(
        DomainSearchSuffix.reduce((pre, cur) => {
          const label =
            matchQuery(query) +
            (cur.label.length > 0 ? `.${cur.label}` : cur.label);
          if (!isLastDot || cur.label.length > 0) {
            pre.push({
              key: cur.key,
              icon: SocialPlatformMapping(cur.key).icon,
              label: label,
            });
          }

          return pre;
        }, [])
      );
    }

    const onKeyDown = (e) => {
      if (e.key === "Enter") {
        console.log('kkkkkk')

        const ipt = inputRef.current;
        const _value =
          activeIndex !== null ? searchList[activeIndex] : ipt ? ipt.value : "";
        emitSubmit(e, _value);
      }
      if (e.key === "ArrowUp") {
        if (!activeIndex) {
          setActiveIndex(searchList.length - 1);
        } else {
          setActiveIndex(activeIndex - 1);
        }
      }
      if (e.key === "ArrowDown") {
        if (activeIndex === null || activeIndex >= searchList.length - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex(activeIndex + 1);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown, true);

    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [query, activeIndex]);
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search ENS, Lens, Twitter, UD or Ethereum"
        defaultValue={defaultValue}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) {
            if (!inputRef.current.value) {
              return false;
            }
          }
        }}
        className="form-input input-lg"
        autoCorrect="off"
        autoFocus
        spellCheck="false"
        id="searchbox"
      />
      <button
        className="form-button btn"
        onClick={(e) => {
          const ipt = inputRef.current;
          if (!ipt) return;
          const iptValue = ipt.value;
          emitSubmit(e, iptValue);
        }}
      >
        <SVG
          src="icons/icon-search.svg"
          width={24}
          height={24}
          className="icon"
        />
      </button>
      {searchList.length > 0 && (
        <div className="search-list">
          {searchList.map((x, idx) => {
            return (
              <div
                className={
                  activeIndex === idx
                    ? "search-list-item search-list-item-active"
                    : "search-list-item"
                }
                key={x.label + idx}
                onClick={(e) => emitSubmit(e, x)}
              >
                <SVG src={x.icon} width={20} height={20} />
                {x.label}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
