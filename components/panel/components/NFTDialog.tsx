import { memo } from "react";
import SVG from "react-inlinesvg";
import useSWR from "swr";
import { isValidJson } from "../../../utils/utils";
import {
  NFTSCANFetcher,
  NFTSCAN_BASE_API_ENDPOINT,
  NFTSCAN_POLYGON_BASE_API
} from "../../apis/nftscan";
import { Error } from "../../shared/Error";
import { NFTAssetPlayer } from "../../shared/NFTAssetPlayer";
import { PlatformType } from "../../../utils/platform";

export const enum NFTDialogType {
  NFT = "nft",
  POAP = "poap",
}

function useAsset(
  address: string,
  tokenId: string | number,
  network: PlatformType
) {
  const baseURL =
    network === PlatformType.lens
      ? NFTSCAN_POLYGON_BASE_API
      : NFTSCAN_BASE_API_ENDPOINT;
  const { data, error } = useSWR<any>(
    baseURL + `assets/${address}/${tokenId}`,
    NFTSCANFetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
const NFTDialogRender = (props) => {
  const {
    onClose,
    asset,
    network,
    address,
    tokenId,
    type = NFTDialogType.NFT,
    poap,
  } = props;
  const { data, isError } = useAsset(address, tokenId, network);
  const resolveOpenseaLink = `https://opensea.io/assets/ethereum/${address}/${tokenId}`;
  if (isError) return <Error text={isError} />;
  if (type === "poap")
    return (
      <>
        <div
          id="nft-dialog"
          className="nft-panel"
          style={{ margin: "0 -1.5rem" }}
        >
          <div className="panel-container">
            <div className="btn btn-close" onClick={onClose}>
              <SVG src={"/icons/icon-close.svg"} width="20" height="20" />
            </div>
            <div className="panel-header">
              <NFTAssetPlayer
                className={"img-container"}
                type={"image/png"}
                src={poap.mediaURL}
                contentUrl={poap.contentURL}
                alt={poap.asset.event.name}
              />
              <div className="panel-header-content">
                <div className="nft-header-name">
                  {poap.asset.event.name || `#${asset.tokenId}`}
                </div>
                <div className="nft-header-actions">
                  <a
                    href={resolveOpenseaLink}
                    className="btn mr-2"
                    title="Open OpenSea"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SVG
                      src={"/icons/social-opensea.svg"}
                      width={20}
                      height={20}
                      className="icon"
                    />
                    <span className="ml-1">OpenSea</span>
                  </a>
                  <a
                    href={`https://etherscan.io/token/${poap.address}?a=${poap.tokenId}`}
                    className="btn"
                    title="Open Etherscan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SVG
                      src={"/icons/icon-ethereum.svg"}
                      width={20}
                      height={20}
                      className="icon"
                    />
                    <span className="ml-1">Etherscan</span>
                  </a>
                </div>
              </div>
              {poap.asset.event.description && (
                <div className="panel-widget">
                  <div className="panel-widget-title">Description</div>
                  <div className="panel-widget-content">
                    {poap.asset.event.description}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  if (!data || !data.data) return null;
  const _asset = data.data;
  const metadata = isValidJson(_asset.metadata_json)
    ? JSON.parse(_asset.metadata_json)
    : null;

  return (
    <>
      <div id="nft-dialog" className="nft-panel">
        <div className="panel-container">
          <div className="btn btn-close" onClick={onClose}>
            <SVG src={"/icons/icon-close.svg"} width="20" height="20" />
          </div>
          <div className="panel-header">
            <NFTAssetPlayer
              className={"img-container"}
              type={asset.asset.content_type}
              src={asset.mediaURL}
              contentUrl={asset.contentURL}
              alt={asset.asset.name}
            />
            <div className="panel-header-content">
              <div className="nft-header-collection collection-title">
                <NFTAssetPlayer
                  type={"image/png"}
                  className="collection-logo"
                  src={asset.collection.url}
                  alt={asset.collection.name}
                />
                <div className="collection-name text-ellipsis">
                  {asset.collection.name}
                </div>
              </div>
              <div className="nft-header-name">
                {asset.asset.name || `#${asset.asset.token_id}`}
              </div>
              <div className="nft-header-actions">
                <a
                  href={resolveOpenseaLink}
                  className="btn mr-2"
                  title="Open OpenSea"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SVG
                    src={"/icons/social-opensea.svg"}
                    width={20}
                    height={20}
                    className="icon"
                  />
                  <span className="ml-1">OpenSea</span>
                </a>
                <a
                  href={`https://etherscan.io/token/${asset.asset.contract_address}?a=${asset.asset.token_id}`}
                  className="btn"
                  title="Open Etherscan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SVG
                    src={"/icons/icon-ethereum.svg"}
                    width={20}
                    height={20}
                    className="icon"
                  />
                  <span className="ml-1">Etherscan</span>
                </a>
              </div>
            </div>
            {metadata?.description && (
              <div className="panel-widget">
                <div className="panel-widget-title">Description</div>
                <div className="panel-widget-content">
                  {metadata?.description}
                </div>
              </div>
            )}
            {metadata?.attributes && metadata?.attributes.length > 0 && (
              <div className="panel-widget">
                <div className="panel-widget-title">Attributes</div>
                <div className="panel-widget-content">
                  <div className="traits-cards">
                    {metadata.attributes.map((x, idx) => {
                      return (
                        <div key={idx} className="traits-card">
                          <div className="trait-type">{x.trait_type}</div>
                          <div className="trait-value">{x.value}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const NFTDialog = memo(NFTDialogRender);
