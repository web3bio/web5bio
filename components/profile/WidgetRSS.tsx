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

function useRSS(domain: string) {
  const { data, error, isValidating } = useSWR(
    `${RSS_ENDPOINT}rss?query=${domain}&mode=list`,
    RSSFetcher,
    {
      suspense: true,
      fallbackData: [],
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );
  return {
    data: data || [],
    isLoading: isValidating,
    isError: error,
  };
}

export default function WidgetRss(props) {
  const { domain } = props;
  const { data, isLoading, isError } = useRSS(domain);
  const dispatch = useDispatch();
  const getBoundaryRender = useCallback(() => {
    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    return null;
  }, [isLoading, isError]);

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
          {data.image ? (
            <div className="platform-icon mr-2">
              <img
                className="img-responsive"
                src={data.image}
                alt="rss-image"
              />
            </div>
          ) : (
            <span className="emoji-large mr-2">📰</span>
          )}
          {data.title}
          <Link className="action-icon btn btn-sm" href={data.link} target={"_blank"}>
            <span className="action-icon-label">More</span>
            <SVG src="icons/icon-open.svg" width={20} height={20} />
          </Link>
        </h2>
        {data.description && (
          <h3 className="text-assistive">{data.description}</h3>
        )}

        <div className="widget-rss-list noscrollbar">
          {getBoundaryRender() ||
            data?.items.map((x, idx) => {
              return (
                <Link
                  href={x.link}
                  key={idx}
                  className="rss-item"
                  target={"_blank"}
                >
                  {x.itunes_image && (
                    <img src={x.itunes_image} className="rss-item-img" alt={x.title} />
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
