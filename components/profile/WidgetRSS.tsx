"use client";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { Loading } from "../shared/Loading";
import { Error } from "../shared/Error";
import { RSSFetcher, RSS_ENDPOINT } from "../apis/rss";
import SVG from "react-inlinesvg";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateRssWidget } from "../../state/widgets/action";
import { handleSearchPlatform } from "../../utils/utils";
import { PlatformType } from "../../utils/platform";

function getQueryDomain(
  domain: string,
  relations: Array<{ platform: PlatformType; identity: string }>
) {
  const pureDomain = domain.endsWith(".farcaster")
    ? domain.replace(".farcaster", "")
    : domain;
  const platform = handleSearchPlatform(pureDomain);
  if ([PlatformType.ens, PlatformType.dotbit].includes(platform))
    return pureDomain;
  return (
    relations.find((x) => x.platform === PlatformType.ens)?.identity ||
    relations.find((x) => x.platform === PlatformType.dotbit)?.identity
  );
}

function useRSS(domain: string, relations, initialData, fromServer) {
  const queryDomain = getQueryDomain(domain, relations);
  const fetchUrl = (() => {
    if (!queryDomain) return null;
    return `${RSS_ENDPOINT}rss?query=${queryDomain}&mode=list`;
  })();
  const options = fromServer
    ? {
        fallbackData: initialData,
      }
    : {};
  const { data, error, isValidating } = useSWR(fetchUrl, RSSFetcher, {
    ...options,
    suspense: !fromServer,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });
  return {
    data: data || [],
    isLoading: isValidating,
    isError: error,
  };
}

export default function WidgetRss(props) {
  const { domain, relations, fromServer, rss } = props;
  const { data, isLoading, isError } = useRSS(
    domain,
    relations,
    rss,
    fromServer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && data && data?.items?.length) {
      dispatch(updateRssWidget({ isEmpty: false }));
    }
  }, [data, isLoading, dispatch]);
  if (!data || !data?.items?.length) return null;
  return (
    <div className="profile-widget-full" id="rss">
      <div className="profile-widget profile-widget-rss">
        <h2 className="profile-widget-title">
          <span className="emoji-large mr-2">📰 </span>
          {data.title}
        </h2>
        <Link
          className="action-icon btn btn-sm"
          href={data.link}
          target={"_blank"}
          title={`Click to learn more`}
        >
          <span className="action-icon-label">More</span>
          <SVG src="icons/icon-open.svg" width={20} height={20} />
        </Link>
        {data.description && (
          <h3 className="text-assistive">{data.description}</h3>
        )}

        <div className="widget-rss-list noscrollbar">
          {data?.items.map((x, idx) => {
            return (
              <Link
                href={x.link}
                key={idx}
                className="rss-item"
                target={"_blank"}
              >
                {x.itunes_image && (
                  <img
                    src={x.itunes_image}
                    className="rss-item-img"
                    alt={x.title}
                  />
                )}
                <div className="rss-item-title">
                  {x.title ? x.title : "Untitled"}
                </div>
                <div className="rss-item-date">
                  {new Date(x.published).toDateString()}
                </div>
                <div className="rss-item-content text-assistive">
                  {typeof x.description === "string" ? x.description : ""}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
