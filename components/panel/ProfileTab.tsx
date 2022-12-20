import { useRouter } from "next/router";
import { cache, memo } from "react";
import SVG from "react-inlinesvg";
import { useAsync, useAsyncRetry } from "react-use";
import useSWR from "swr";
import { ens, globalRecordKeys, provider } from "../../utils/ens";
import { resolveSocialMediaLink } from "../../utils/utils";
import { ENSFetcher, ENS_METADATA_END_POINT } from "../apis/ens";
import { Empty } from "../shared/Empty";
import { Loading } from "../shared/Loading";
import { TabsMap } from "./IdentityPanel";
import { NFTOverview } from "./NFTOverview";
import { Poaps } from "./Poaps";

const socialButtonMapping = {
  ["com.github"]: {
    icon: "icons/icon-github.svg",
    type: "github",
  },
  ["com.twitter"]: {
    icon: "icons/icon-twitter.svg",
    type: "twitter",
  },
  ["vnd.github"]: {
    icon: "icons/icon-github.svg",
    type: "github",
  },
  ["vnd.twitter"]: {
    icon: "icons/icon-twitter.svg",
    type: "twitter",
  },
  ["com.instagram"]: {
    icon: "icons/icon-instagram.svg",
    type: "instagram",
  },
  ["com.discord"]: {
    icon: "icons/icon-discord.svg",
    type: "discord",
  },
  ["com.reddit"]: {
    icon: "icons/icon-reddit.svg",
    type: "reddit",
  },
  ["org.telegram"]: {
    icon: "icons/icon-telegram.svg",
    type: "telegram",
  },
  ["url"]: {
    icon: "icons/icon-web.svg",
    type: "url",
  },
};

export function useProfile(domain: string) {
  const { data, error } = useSWR<any>(
    ENS_METADATA_END_POINT + `/${domain}/meta`,
    ENSFetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export const ProfileTab = (props) => {
  const { identity, toNFT } = props;
  const domain = identity.displayName || identity.identity;
  const { value: ensRecords, loading: recordsLoading } = useAsync(async () => {
    const _domain = domain.startsWith("0x")
      ? await ens.getName(domain)
      : domain;
    if (!_domain) return;
    if (localStorage.getItem(`ens_${domain}`)) {
      const cached = JSON.parse(localStorage.getItem(`ens_${domain}`));
      if (new Date().getTime() - cached.date <= 600000) {
        return cached.value;
      }
    }

    await ens.setProvider(provider);
    const batched = await ens.batch(
      ens.getText.batch(_domain, "description"),
      ens.getText.batch(_domain, "url"),
      ens.getText.batch(_domain, "com.github"),
      ens.getText.batch(_domain, "com.twitter"),
      ens.getText.batch(_domain, "org.telegram"),
      ens.getText.batch(_domain, "com.discord"),
      ens.getText.batch(_domain, "com.reddit")
    );
    if (!batched[2]) batched[2] = await ens.getText(_domain, "vnd.github");
    if (!batched[3]) batched[3] = await ens.getText(_domain, "vnd.twitter");
    localStorage.setItem(
      `ens_${domain}`,
      JSON.stringify({
        value: batched,
        date: new Date().getTime(),
      })
    );
    return batched;
  });

  const openSocialMediaLink = (url: string, type: string) => {
    let resolvedURL = "";
    if (url.startsWith("https")) {
      resolvedURL = url;
    } else {
      resolvedURL = resolveSocialMediaLink(url, type);
    }

    return resolvedURL;
  };
  return (
    <div className="profile-container">
      {recordsLoading ? (
        <div className="profile-basic-loading-placeholder">
          <div
            style={{
              position: "relative",
              width: "1rem",
              height: "1rem",
            }}
          >
            <Loading />
          </div>

          <div>Loading Profile...</div>
        </div>
      ) : (
        <div className="profile-basic">
          <div className="profile-description">{ensRecords[0]}</div>

          <div className="records">
            {(ensRecords &&
              globalRecordKeys.map((x, idx) => {
                if (idx === 0) return null;
                return (
                  ensRecords[idx] && (
                    <a
                      key={idx}
                      className="action-btn btn"
                      style={{ position: "relative" }}
                      target="_blank"
                      rel="noreferrer"
                      href={openSocialMediaLink(
                        ensRecords[idx],
                        socialButtonMapping[x].type
                      )}
                      title={x}
                    >
                      <SVG
                        src={socialButtonMapping[x].icon}
                        width={20}
                        height={20}
                        className="icon"
                      />
                    </a>
                  )
                );
              })) ||
              null}
          </div>
        </div>
      )}

      <div className="profile-widget widget-nft">
        <div className="profile-widget-title">NFT COLLECTIONS</div>
        <div className="profile-widget-container">
          <NFTOverview identity={identity} toNFT={toNFT} />
        </div>
      </div>
      <div className="profile-widget widget-poap">
        <div className="profile-widget-title">POAPS</div>
        <div className="profile-widget-container">
          <Poaps identity={identity} />
        </div>
      </div>
    </div>
  );
};
