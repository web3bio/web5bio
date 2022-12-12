import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { IdentityPanel, TabsMap } from "../components/panel/IdentityPanel";
import { Loading } from "../components/shared/Loading";
import { Error } from "../components/shared/Error";
import { GET_PROFILES_DOMAIN, GET_PROFILES_QUERY } from "../utils/queries";
import { handleSearchPlatform, isDomainSearch } from "../utils/utils";

const RenderDomainPanel = (props) => {
  const {
    domain,
    asComponent,
    onClose,
    overridePlatform,
    onTabChange,
    overridePanelTab,
    toNFT,
  } = props;
  const router = useRouter();
  const [panelTab, setPanelTab] = useState(
    overridePanelTab || TabsMap.profile.key
  );
  const [platform, setPlatform] = useState(overridePlatform || "ENS");
  const { loading, error, data } = useQuery(
    isDomainSearch(platform) ? GET_PROFILES_DOMAIN : GET_PROFILES_QUERY,
    {
      variables: {
        platform: platform,
        identity: domain && domain[0],
      },
    }
  );
  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.domain) return;
    setPlatform(handleSearchPlatform(router.query.domain[0]));
    if (asComponent) return;
    window.history.replaceState(
      {},
      "",
      `/${domain[0]}${panelTab === TabsMap.profile.key ? "" : `/${panelTab}`}`
    );
  }, [domain, router.query, router.isReady, asComponent, panelTab]);

  return asComponent ? (
    <div className="web3bio-mask-cover" onClick={onClose}>
      <div
        className="profile-main"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <Error text={error} />
        ) : (
          <IdentityPanel
            toNFT={toNFT}
            asComponent
            onClose={onClose}
            curTab={panelTab}
            onTabChange={onTabChange}
            identity={
              isDomainSearch(platform) ? data.domain.owner : data.identity
            }
          />
        )}
      </div>
    </div>
  ) : (
    <div className="web3bio-container">
      <div className="web3bio-cover flare"></div>
      <div className="profile-main">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error text={error} />
        ) : (
          <IdentityPanel
            curTab={panelTab}
            toNFT={() => {
              setPanelTab(TabsMap.nfts.key);
            }}
            onTabChange={(v) => {
              setPanelTab(v);
            }}
            identity={
              isDomainSearch(platform) ? data.domain.owner : data.identity
            }
          />
        )}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [],
  };
}

export async function getStaticProps({ params }) {
  const { domain } = params;
  return {
    props: {
      domain,
    },
  };
}
export default memo(RenderDomainPanel);
