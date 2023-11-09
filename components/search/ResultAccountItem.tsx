import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import Clipboard from "react-clipboard.js";
import SVG from "react-inlinesvg";
import { formatText } from "../../utils/utils";
import { RenderSourceFooter } from "./SourcesFooter";
import { PlatformType } from "../../utils/platform";
import { SocialPlatformMapping } from "../../utils/utils";
import { isAddress } from "ethers";
import ModalLink from "../profile/ModalLink";

const RenderAccountItem = (props) => {
  const onCopySuccess = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };
  const { identity, sources, profile, canSkipProfile } = props;
  const [isCopied, setIsCopied] = useState(false);
  const resolvedDisplayName = profile?.displayName
    ? profile.displayName
    : identity.displayName || identity.identity;
  const displayName =
    isAddress(resolvedDisplayName) || identity.platform === PlatformType.nextid
      ? formatText(resolvedDisplayName)
      : resolvedDisplayName;
  const resolvedIdentity =
    identity.platform === PlatformType.ethereum
      ? profile?.address || identity.identity
      : identity.identity;
  switch (identity.platform) {
    case PlatformType.ethereum:
      return (
        <div className="social-item social-web3 ethereum">
          <div className="social-main">
            <div className="social">
              <div className="avatar">
                {profile?.avatar && (
                  <Image
                    width={18}
                    height={18}
                    alt="avatar"
                    src={profile?.avatar}
                    className="avatar-img"
                  />
                )}
                <div className="icon bg-pride">
                  <SVG src="icons/icon-ethereum.svg" width={20} height={20} />
                </div>
              </div>
              <div className="content">
                <div className="content-title text-bold">{displayName}</div>
                <div className="content-subtitle text-gray">
                  <div className="address hide-xs">{resolvedIdentity}</div>
                  <div className="address show-xs">
                    {formatText(resolvedIdentity)}
                  </div>
                  <Clipboard
                    component="div"
                    className="action"
                    data-clipboard-text={resolvedIdentity}
                    onSuccess={onCopySuccess}
                  >
                    <SVG src="icons/icon-copy.svg" width={20} height={20} />
                    {isCopied && <div className="tooltip-copy">COPIED</div>}
                  </Clipboard>
                </div>
              </div>
            </div>
            {identity.nft?.length > 0 && (
              <div className="nfts">
                {identity.nft.map((nft, idx) => {
                  return nft.category == "ENS" ? (
                    <Link
                      key={`${nft.uuid}-${idx}`}
                      href={{
                        pathname: "/",
                        query: { s: nft.id },
                      }}
                      prefetch={false}
                    >
                      <div className="label-ens" title={nft.id}>
                        <SVG
                          fill={SocialPlatformMapping(PlatformType.ens).color}
                          src={"/icons/icon-ens.svg"}
                          width="20"
                          height="20"
                          className="icon"
                        />
                        <span>{nft.id}</span>
                      </div>
                    </Link>
                  ) : null;
                })}
              </div>
            )}
          </div>
          {(canSkipProfile || (profile && !profile?.error)) && (
            <ModalLink
              href={`/${
                profile?.identity || identity.displayName || resolvedIdentity
              }`}
              className="social-actions"
              title="Open ENS (Ethereum Name Service) Profile"
            >
              <button className="btn btn-sm btn-link action">
                <SVG src="icons/icon-open.svg" width={20} height={20} /> <span className="hide-sm">Profile</span>
              </button>
            </ModalLink>
          )}
          <RenderSourceFooter sources={sources} />
        </div>
      );
    case PlatformType.lens:
      return (
        <div className="social-item lens">
          <div className="social-main">
            <div className="social">
              <div className="avatar">
                {profile?.avatar && (
                  <Image
                    width={36}
                    height={36}
                    alt="avatar"
                    src={profile?.avatar}
                    className="avatar-img"
                  />
                )}
                <div className="icon">
                  <SVG
                    src={SocialPlatformMapping(identity.platform)?.icon || ""}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="content">
                <div className="content-title text-bold">{displayName}</div>
                <div className="content-subtitle text-gray">
                  <div className="address">{resolvedIdentity}</div>
                  <div className="ml-1 mr-1">·</div>
                  <div className="address" title="">#{identity.uid}</div>
                </div>
              </div>
            </div>
          </div>
          <ModalLink
            href={`/${resolvedIdentity}`}
            className="social-actions"
            title="Open Lens Profile"
          >
            <button className="btn btn-sm btn-link action">
              <SVG src="icons/icon-open.svg" width={20} height={20} /> <span className="hide-sm">Profile</span>
            </button>
          </ModalLink>
          <RenderSourceFooter sources={sources} />
        </div>
      );
    case PlatformType.farcaster:
      return (
        <div className="social-item farcaster">
          <div className="social-main">
            <div className="social">
              <div className="avatar">
                {profile?.avatar && (
                  <Image
                    width={36}
                    height={36}
                    alt="avatar"
                    src={profile?.avatar}
                    className="avatar-img"
                  />
                )}
                <div className="icon">
                  <SVG
                    src={SocialPlatformMapping(identity.platform)?.icon || ""}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="content">
                <div className="content-title text-bold">{displayName}</div>
                <div className="content-subtitle text-gray">
                  <div className="address">{resolvedIdentity}</div>
                  <div className="ml-1 mr-1">·</div>
                  <div className="address" title="">#{identity.uid}</div>
                </div>
              </div>
            </div>
          </div>

          <ModalLink
            href={`/${resolvedIdentity}.farcaster`}
            className="social-actions"
            title="Open Farcaster Profile"
          >
            <button className="btn btn-sm btn-link action">
              <SVG src="icons/icon-open.svg" width={20} height={20} /> <span className="hide-sm">Profile</span>
            </button>
          </ModalLink>
          <RenderSourceFooter sources={sources} />
        </div>
      );
    case PlatformType.unstoppableDomains:
      return (
        <div className="social-item unstoppabledomains">
          <div className="social-main">
            <Link
              href={{
                pathname: "/",
                query: {
                  s: resolvedIdentity,
                },
              }}
              className="social"
              prefetch={false}
            >
              <div className="icon">
                <SVG
                  fill="#000"
                  src={SocialPlatformMapping(identity.platform)?.icon || ""}
                  width={20}
                  height={20}
                />
              </div>
              <div className="title">{displayName}</div>
            </Link>
          </div>
          <div className="social-actions actions">
            <a
              className="btn btn-sm btn-link action"
              href={`${SocialPlatformMapping(identity.platform)?.urlPrefix}${
                identity.displayName
              }`}
              title="Open Unstoppable Domains"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SVG src="icons/icon-open.svg" width={20} height={20} /> OPEN
            </a>
          </div>
          <RenderSourceFooter sources={sources} />
        </div>
      );
    case PlatformType.nextid:
      return (
        <div className="social-item nextid">
          <div className="social-main">
            <div className="social">
              <div className="avatar">
                {profile?.avatar && (
                  <Image
                    width={18}
                    height={18}
                    alt="avatar"
                    src={profile?.avatar}
                    className="avatar-img"
                  />
                )}
                <div className="icon">
                  <SVG
                    fill="#fff"
                    src={SocialPlatformMapping(identity.platform)?.icon || ""}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="content">
                <div className="content-title text-bold">{displayName}</div>
                <div className="content-subtitle text-gray">
                  <div className="address">
                    {formatText(resolvedIdentity, 10)}
                  </div>
                  <Clipboard
                    component="div"
                    className="action"
                    data-clipboard-text={resolvedIdentity}
                    onSuccess={onCopySuccess}
                  >
                    <SVG src="icons/icon-copy.svg" width={20} height={20} />
                    {isCopied && <div className="tooltip-copy">COPIED</div>}
                  </Clipboard>
                </div>
              </div>
            </div>
          </div>
          <div className="social-actions">
            <ModalLink
              className="btn btn-sm btn-link action"
              href={`/${resolvedIdentity}`}
              title="Open Next.ID Profile page"
              rel="noopener noreferrer"
            >
              <SVG src="icons/icon-open.svg" width={20} height={20} /> <span className="hide-sm">Profile</span>
            </ModalLink>
          </div>
          <RenderSourceFooter sources={sources} />
        </div>
      );
    default:
      return (
        <div className={`social-item ${identity.platform}`}>
          <div className="social-main">
            <Link
              href={{
                pathname: "/",
                query: {
                  s: resolvedIdentity,
                  platform: identity.platform,
                },
              }}
              className="social"
              prefetch={false}
            >
              <div className="icon">
                <SVG
                  fill="#000"
                  src={SocialPlatformMapping(identity.platform)?.icon || ""}
                  width={20}
                  height={20}
                />
              </div>
              <div className="title">{displayName}</div>
            </Link>
          </div>
          <div className="social-actions actions">
            <a
              className="btn btn-sm btn-link action"
              href={`${SocialPlatformMapping(identity.platform)?.urlPrefix}${
                identity.displayName
              }`}
              title="Open"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SVG src="icons/icon-open.svg" width={20} height={20} /> OPEN
            </a>
          </div>
          <RenderSourceFooter sources={sources} />
        </div>
      );
  }
};

export const ResultAccountItem = memo(RenderAccountItem);
