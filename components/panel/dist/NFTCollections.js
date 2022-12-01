"use strict";
exports.__esModule = true;
exports.NFTCollections = void 0;
var react_1 = require("react");
var swr_1 = require("swr");
var nftscan_1 = require("../apis/nftscan");
var CollectionSwitcher_1 = require("./CollectionSwitcher");
var ipfs_1 = require("../../utils/ipfs");
var Empty_1 = require("../shared/Empty");
var Error_1 = require("../shared/Error");
var NFTAssetPlayer_1 = require("../shared/NFTAssetPlayer");
var utils_1 = require("../../utils/utils");
function useCollections(address) {
    var _a = swr_1["default"](nftscan_1.NFTSCAN_BASE_API_ENDPOINT + ("account/own/all/" + address + "?erc_type=erc721"), nftscan_1.NFTSCANFetcher), data = _a.data, error = _a.error;
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    };
}
var RenderNFTCollections = function (props) {
    var onShowDetail = props.onShowDetail, identity = props.identity;
    var _a = react_1.useState([]), collections = _a[0], setCollections = _a[1];
    var _b = react_1.useState(""), anchorName = _b[0], setAnchorName = _b[1];
    var _c = useCollections(identity.identity), data = _c.data, isLoading = _c.isLoading, isError = _c.isError;
    var _d = react_1.useState(null), activeCollection = _d[0], setActiveCollection = _d[1];
    var scrollContainer = react_1.useRef(null);
    react_1.useEffect(function () {
        var container = scrollContainer.current;
        if (data && data.data) {
            setCollections(data.data.map(function (x) { return ({
                key: x.contract_address,
                name: x.contract_name,
                url: x.logo_url
            }); }));
            if (anchorName) {
                var anchorElement = document.getElementById(anchorName);
                if (anchorElement) {
                    anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
                }
            }
            var lazyLoad_1 = function () {
                var lazyloadImages = container.querySelectorAll("img");
                var imageObserver = new IntersectionObserver(function (entries, overver) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            var img = entry.target;
                            img.src = img.dataset.src;
                            imageObserver.unobserve(img);
                        }
                    });
                });
                lazyloadImages.forEach(function (image) {
                    imageObserver.observe(image);
                });
            };
            if (container) {
                container.addEventListener("scroll", function () { return utils_1.throttle(lazyLoad_1, 100); });
            }
            lazyLoad_1();
            return function () {
                return container.removeEventListener("scroll", function () { return utils_1.throttle(lazyLoad_1, 100); });
            };
        }
    }, [data, anchorName]);
    // if (isLoading) return <Loading />;
    if (isError)
        return React.createElement(Error_1.Error, { text: isError });
    if (!data || !data.data)
        return React.createElement(Empty_1.Empty, null);
    var resolveMediaURL = function (asset) {
        var _a, _b;
        if (asset && asset.metadata_json && utils_1.isValidJson(asset.metadata_json)) {
            var json = JSON.parse(asset.metadata_json);
            var origin = json.image || json.content_uri;
            if (origin) {
                return origin.includes("base64") ? origin : ipfs_1.resolveIPFS_URL(origin);
            }
        }
        if (asset && ["video/mp4"].includes(asset.content_type)) {
            return ipfs_1.resolveIPFS_URL((_a = asset.content_uri) !== null && _a !== void 0 ? _a : asset.image_uri);
        }
        return ipfs_1.resolveIPFS_URL((_b = asset.image_uri) !== null && _b !== void 0 ? _b : asset.content_uri);
    };
    return (React.createElement(React.Fragment, null,
        collections && collections.length > 0 && (React.createElement(CollectionSwitcher_1.CollectionSwitcher, { collections: collections, currentSelect: activeCollection !== null && activeCollection !== void 0 ? activeCollection : collections[0], onSelect: function (v) {
                setActiveCollection(v);
                setAnchorName(v.key);
            } })),
        React.createElement("div", { ref: scrollContainer, className: "nft-collection" },
            React.createElement("div", { className: "nft-collection-list" }, data.data.map(function (x, idx) {
                return (React.createElement("div", { className: "nft-collection-item", key: idx, id: x.contract_address },
                    React.createElement("div", { className: "collection-title" },
                        React.createElement(NFTAssetPlayer_1.NFTAssetPlayer, { type: "image/png", className: "collection-logo", src: x.logo_url }),
                        React.createElement("div", { className: "collection-name" },
                            " ",
                            x.contract_name)),
                    React.createElement("div", { className: "nft-list" }, x.assets.map(function (y, ydx) {
                        var mediaURL = resolveMediaURL(y);
                        return (React.createElement("div", { key: ydx, className: "nft-container c-hand", onClick: function () {
                                return onShowDetail({
                                    collection: {
                                        url: x.logo_url,
                                        name: x.contract_name
                                    },
                                    asset: y,
                                    mediaURL: mediaURL
                                });
                            } },
                            React.createElement("div", { className: "nft-item" },
                                React.createElement(NFTAssetPlayer_1.NFTAssetPlayer, { className: "img-container", type: y.content_type, src: mediaURL }),
                                React.createElement("div", { className: "collection-name" }, x.contract_name),
                                React.createElement("div", { className: "nft-name" }, y.name))));
                    }))));
            })))));
};
exports.NFTCollections = react_1.memo(RenderNFTCollections);
