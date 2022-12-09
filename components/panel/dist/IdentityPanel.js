"use strict";
exports.__esModule = true;
exports.IdentityPanel = exports.TabsMap = void 0;
var react_1 = require("react");
var react_inlinesvg_1 = require("react-inlinesvg");
var react_clipboard_js_1 = require("react-clipboard.js");
var utils_1 = require("../../utils/utils");
var FeedsTab_1 = require("./FeedsTab");
var NFTsTab_1 = require("./NFTsTab");
var ProfileTab_1 = require("./ProfileTab");
var NFTAssetPlayer_1 = require("../shared/NFTAssetPlayer");
var Loading_1 = require("../shared/Loading");
var utils_2 = require("../../utils/utils");
var ipfs_1 = require("../../utils/ipfs");
var router_1 = require("next/router");
var link_1 = require("next/link");
var Empty_1 = require("../shared/Empty");
exports.TabsMap = {
    profile: {
        key: "profile",
        name: "Profile"
    },
    feeds: {
        key: "feeds",
        name: "Feeds"
    },
    nfts: {
        key: "nfts",
        name: "NFTs"
    }
};
var IdentityPanelRender = function (props) {
    var identity = props.identity, onTabChange = props.onTabChange, curTab = props.curTab;
    var _a = react_1.useState(curTab), activeTab = _a[0], setActiveTab = _a[1];
    var _b = react_1.useState(null), curAsset = _b[0], setCurAsset = _b[1];
    var _c = react_1.useState(null), copied = _c[0], setCopied = _c[1];
    var router = router_1.useRouter();
    var _d = ProfileTab_1.useProfile(identity.displayName || identity.identity), profileData = _d.data, avatarLoading = _d.isLoading;
    var onCopySuccess = function () {
        setCopied(true);
        setTimeout(function () {
            setCopied(false);
        }, 1500);
    };
    var resolveMediaURL = function (asset) {
        if (asset) {
            return asset.startsWith("data:", "https:")
                ? asset
                : ipfs_1.resolveIPFS_URL(asset);
        }
        return "";
    };
    var renderContent = function () {
        var _a;
        return ((_a = {},
            _a[exports.TabsMap.profile.key] = (React.createElement(ProfileTab_1.ProfileTab, { toNFT: function () { return setActiveTab(exports.TabsMap.nfts.key); }, identity: identity })),
            _a[exports.TabsMap.feeds.key] = React.createElement(FeedsTab_1.FeedsTab, { identity: identity }),
            _a[exports.TabsMap.nfts.key] = (React.createElement(NFTsTab_1.NFTsTab, { defaultOpen: !!curAsset, onShowDetail: resolveOnShowDetail, identity: identity })),
            _a)[activeTab] || React.createElement(FeedsTab_1.FeedsTab, { identity: identity }));
    };
    var resolveOnShowDetail = function (asset) {
        // todo: to resolve url && nft dialog
    };
    if (!profileData)
        return React.createElement(Empty_1.Empty, { text: 'Profile not found' });
    return (React.createElement("div", { className: "identity-panel" },
        React.createElement("div", { className: "panel-container" },
            React.createElement("div", { className: "panel-header" },
                React.createElement("div", { className: "social" },
                    React.createElement("div", { className: "identity-avatar" }, avatarLoading ? (React.createElement(Loading_1.Loading, null)) : (React.createElement(NFTAssetPlayer_1.NFTAssetPlayer, { src: resolveMediaURL(profileData.image), alt: identity.displayName
                            ? identity.displayName
                            : utils_2.formatText(identity.identity) }))),
                    React.createElement("div", { className: "identity-content content" },
                        React.createElement("div", { className: "content-title text-bold" }, identity.displayName
                            ? identity.displayName
                            : utils_2.formatText(identity.identity)),
                        React.createElement("div", { className: "content-subtitle text-gray" },
                            React.createElement("div", { className: "address hide-xs" }, identity.identity),
                            React.createElement("div", { className: "address show-xs" }, utils_2.formatText(identity.identity)),
                            React.createElement(react_clipboard_js_1["default"], { component: "div", className: "action", "data-clipboard-text": identity.identity, onSuccess: onCopySuccess },
                                React.createElement(react_inlinesvg_1["default"], { src: "icons/icon-copy.svg", width: 20, height: 20 }),
                                copied && React.createElement("div", { className: "tooltip-copy" }, "COPIED"))))),
                router.query.s && (React.createElement(link_1["default"], { className: "btn btn-link btn-close", onClick: function () {
                        localStorage.removeItem("feeds");
                    }, href: "/?s=" + router.query.s },
                    React.createElement(react_inlinesvg_1["default"], { src: "/icons/icon-close.svg", width: "20", height: "20" }))),
                React.createElement("ul", { className: "panel-tab" }, utils_1.getEnumAsArray(exports.TabsMap).map(function (x, idx) {
                    return (React.createElement("li", { key: idx, className: activeTab === x.value.key ? "tab-item active" : "tab-item" },
                        React.createElement("a", { href: "#", onClick: function (e) {
                                e.preventDefault();
                                setActiveTab(x.value.key);
                                onTabChange(x.value.key);
                                localStorage.removeItem("feeds");
                            } }, x.value.name)));
                }))),
            React.createElement("div", { className: "panel-body" }, renderContent()))));
};
exports.IdentityPanel = react_1.memo(IdentityPanelRender);
