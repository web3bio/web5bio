import Link from "next/link";
import SVG from "react-inlinesvg";
import Markdown from "react-markdown";
import { NFTAssetPlayer } from "../shared/NFTAssetPlayer";
import { CollectionAbout } from "./CollectionAbout";
import { PlatformType, SocialPlatformMapping } from "../utils/platform";
import { getSocialMediaLink } from "../utils/utils";
import useSWR from "swr";
import { Network, NetworkMapping } from "../utils/network";
import { SIMPLEHASH_URL, SimplehashFetcher } from "../apis";

const renderSocialMediaLinks = (_collection) => {
  const renderArr = {
    [PlatformType.website]: _collection?.external_url,
    [PlatformType.twitter]: _collection?.twitter_username,
    [PlatformType.medium]: _collection?.medium_username,
    [PlatformType.telegram]: _collection?.telegram_url,
    [PlatformType.opensea]: _collection?.marketplace_pages?.find(
      (x) => x.marketplace_id === PlatformType.opensea
    )?.collection_url,
    [PlatformType.discord]: _collection?.discord_url,
    [PlatformType.instagram]: _collection?.instagram_username,
  };

  return Object.entries(renderArr).map(([key, item]) => {
    if (item) {
      return (
        <Link
          onClick={(e) => e.stopPropagation()}
          href={getSocialMediaLink(item, key as PlatformType) || ""}
          className="btn"
          key={key}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SVG
            src={`../${SocialPlatformMapping(key as PlatformType).icon}`}
            fill="#121212"
            width={18}
            height={18}
          />
        </Link>
      );
    }
  });
};

export default function NFTModalContentRender(props) {
  const { onClose, asset } = props;

  const resolvedNetwork = (() => {
    if (asset.network?.includes("arbitrum")) {
      return Network.arbitrum;
    }
    return asset.network;
  })();

  const { data: fetchedAsset } = useSWR(
    asset?.remoteFetch
      ? SIMPLEHASH_URL +
          `/api/v0/nfts/${resolvedNetwork}/${asset.contractAddress}/${asset.tokenId}`
      : null,
    SimplehashFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!asset || (asset.remoteFetch && !fetchedAsset)) return null;

  const _asset = fetchedAsset || asset.asset;
  const _collection = fetchedAsset
    ? fetchedAsset.collection
    : _asset.collection;

  const attributes = _asset.extra_metadata?.attributes || [];
  const mediaURL =
    _asset?.video_url ||
    _asset?.previews?.image_large_url ||
    _asset?.image_url ||
    asset.mediaURL;

  return (
    <>
      <div className="modal-actions">
        <button className="btn btn-close" onClick={onClose}>
          <SVG src={"/icons/icon-close.svg"} width="20" height="20" />
        </button>
      </div>
      <div
        id="nft-dialog"
        className="nft-preview"
        style={{
          ["--nft-primary-color" as string]:
            _asset.previews?.predominant_color || "#000",
        }}
      >
        <div className="preview-container">
          <div
            className="preview-overlay"
            style={{
              backgroundImage: "url(" + _asset.previews?.image_medium_url + ")",
            }}
            onClick={onClose}
          ></div>
          <div className="preview-image">
            <NFTAssetPlayer
              className="img-container"
              type={
                _asset.video_url
                  ? _asset.video_properties.mime_type || "video/mp4"
                  : "image/png"
              }
              src={mediaURL}
              placeholder={true}
              alt={_collection?.name + _asset.name}
              poster={_asset.previews?.image_large_url}
            />

            <div
              className={`preview-network ${_asset.chain}`}
              title={NetworkMapping(_asset.chain).label}
              style={{ backgroundColor: NetworkMapping(_asset.chain).bgColor }}
            >
              <SVG
                fill={NetworkMapping(_asset.chain).primaryColor}
                src={NetworkMapping(_asset.chain).icon || ""}
                className="preview-network-icon"
              />
              <span className="preview-network-name">
                {NetworkMapping(_asset.chain).label}
              </span>
            </div>
          </div>
          <div className="preview-main">
            <div className="preview-content">
              <div className="panel-section">
                <div className="panel-section-content">
                  <div className="nft-collection">
                    <NFTAssetPlayer
                      type={"image/png"}
                      className="collection-logo"
                      src={_collection?.image_url}
                      alt={_collection?.name}
                      width={24}
                      height={24}
                    />
                    <div className="collection-name text-ellipsis">
                      {_collection?.name}
                    </div>
                  </div>
                  <div className="nft-name h4">
                    {_asset.name || `${_collection?.name} #${_asset.token_id}`}
                  </div>
                  <div className="nft-description">
                    <Markdown>
                      {_asset.description || _collection?.description}
                    </Markdown>
                  </div>

                  <div className="btn-group">
                    {renderSocialMediaLinks(_collection)}
                  </div>
                </div>
              </div>

              {attributes.length > 0 && (
                <div className="panel-section">
                  <div className="panel-section-title collection-title">
                    Attributes
                  </div>
                  <div className="panel-section-content">
                    <div className="traits-cards">
                      {attributes.map((x, idx) => {
                        return (
                          <div
                            key={(x.attribute_name || x.trait_type) + idx}
                            className="traits-card"
                          >
                            <div className="trait-type">
                              {x.attribute_name || x.trait_type}
                            </div>
                            <div className="trait-value">
                              {x.attribute_value || x.value}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="divider mt-4 mb-4"></div>
              
              <CollectionAbout collection={_collection} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
