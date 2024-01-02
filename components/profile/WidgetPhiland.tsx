"use client";
import { useEffect, memo } from "react";
import SVG from "react-inlinesvg";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updatePhilandWidget } from "../../state/widgets/action";
import RssItem from "./RssItem";
import { QUERY_PHILAND_LIST } from "../apis/philand";
import { useQuery } from "@apollo/client";

const RenderWidgetPhiland = ({ address }) => {
  const { data, loading, error } = useQuery(QUERY_PHILAND_LIST, {
    variables: {
      address:address,
    },
    context: {
      clientName: "philand",
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) {
      dispatch(
        updatePhilandWidget({
          isEmpty: !data?.items?.length,
          initLoading: false,
        })
      );
    }
  }, [data, loading, dispatch]);

  console.log(data, "data");

  if (!data || !data?.items?.length) return null;

  // if (process.env.NODE_ENV !== "production") {
  //   console.log("RSS Data:", data);
  // }

  return (
    <div className="profile-widget-full" id="rss">
      <div className="profile-widget profile-widget-rss">
        <div className="profile-widget-header">
          <h2 className="profile-widget-title">
            <span className="emoji-large mr-2">📰 </span>
            Philand
          </h2>
          {data.description && (
            <h3 className="text-assistive">{data.description}</h3>
          )}
        </div>

        <div className="widget-rss-list noscrollbar">
          <div className="rss-website">
            <div className="rss-website-title mb-1">{data.title}</div>
            <div className="rss-website-description mb-4">
              {data.description}
            </div>
            <Link
              className="btn btn-sm"
              title="More Articles"
              href={data.link}
              target={"_blank"}
            >
              <SVG src="icons/icon-open.svg" width={20} height={20} /> More
            </Link>
          </div>
          {data?.items.map((x, idx) => {
            return <RssItem data={x} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export const WidgetPhiland = memo(RenderWidgetPhiland);
