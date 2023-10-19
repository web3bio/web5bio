"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RssItem(props) {
  const { data } = props;
  return (
    <Link href={data.link} className="rss-item" target={"_blank"}>
      {data.itunes_image && (
        <img
          src={data.itunes_image}
          className="rss-item-img"
          alt={data.title}
        />
      )}
      <div className="rss-item-title">
        {data.title ? data.title : "Untitled"}
      </div>
      {/* <div className="rss-item-date">{dateString}</div> */}
      <div className="rss-item-content text-assistive">
        {typeof data.description === "string" ? data.description : ""}
      </div>
    </Link>
  );
}
