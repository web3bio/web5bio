import { memo, useState } from "react";
import SVG from "react-inlinesvg";
import Clipboard from "react-clipboard.js";
import { getEnumAsArray } from "../../utils/utils";
import { FeedsTab } from "./FeedsTab";
import { NFTsTab } from "./NFTsTab";
import { ProfileTab } from "./ProfileTab";
import { useAsync } from "react-use";
import { ens } from "../../utils/ens";
import { NFTAssetPlayer } from "../shared/NFTAssetPlayer";
import { Loading } from "../shared/Loading";
import { resolveIPFS_URL } from "../../utils/ipfs";

export enum TabsMap {
  profile = "Profile",
  feeds = "Feeds",
  nfts = "NFTs",
}

const IdentityPanelRender = (props) => {
  const { onClose, identity, onTabChange, curTab } = props;
  const [activeTab, setActiveTab] = useState(curTab || TabsMap.profile);
  const [curAsset, setCurAsset] = useState(null);
  const [copied, setCopied] = useState(null);

  const { value: avatar, loading: avatarLoading } = useAsync(async () => {
    return await ens.name(identity.displayName).getText("avatar");
  });
  const onCopySuccess = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  const renderContent = () => {
    return {
      [TabsMap.profile]: <ProfileTab identity={identity} />,
      [TabsMap.feeds]: <FeedsTab identity={identity} />,
      [TabsMap.nfts]: (
        <NFTsTab
          defaultOpen={!!curAsset}
          onShowDetail={resolveOnShowDetail}
          identity={identity}
        />
      ),
    }[activeTab];
  };

  const resolveOnShowDetail = (asset) => {
    // todo: to resolve url && nft dialog
  };
  return (
    <div className="panel-container">
      <div className="close-icon-box" onClick={onClose}>
        <SVG className="close-icon" src={"/icons/icon-close.svg"} />
      </div>
      <div className="panel-identity-basic">
        <div className="identity-avatar-container">
          {avatarLoading ? <Loading /> : <NFTAssetPlayer src={resolveIPFS_URL(avatar) ?? ""} />}
        </div>
        <div className="identity-basic-info">
          <div className="displayName">{identity.displayName}</div>
          <div className="identity">
            {identity.identity}
            <Clipboard
              component="div"
              className="action"
              data-clipboard-text={identity.identity}
              onSuccess={onCopySuccess}
            >
              <SVG src="icons/icon-copy.svg" width={20} height={20} />
              {copied && <div className="tooltip-copy">COPIED</div>}
            </Clipboard>
          </div>
        </div>
      </div>
      <div className="panel-tab-contianer">
        <ul className="panel-tab">
          {getEnumAsArray(TabsMap).map((x, idx) => {
            return (
              <li
                key={idx}
                className={
                  activeTab === x.value ? "tab-item active" : "tab-item"
                }
                onClick={() => {
                  setActiveTab(x.value);
                  onTabChange(x.value);
                }}
              >
                <a href="#">{x.value}</a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="panel-body">{renderContent()}</div>
    </div>
  );
};

export const IdentityPanel = memo(IdentityPanelRender);
