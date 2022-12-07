"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
exports.__esModule = true;
exports.ProfileTab = exports.useProfile = void 0;
var react_1 = require("react");
var react_inlinesvg_1 = require("react-inlinesvg");
var react_use_1 = require("react-use");
var swr_1 = require("swr");
var ens_1 = require("../../utils/ens");
var utils_1 = require("../../utils/utils");
var ens_2 = require("../apis/ens");
var Loading_1 = require("../shared/Loading");
var NFTOverview_1 = require("./NFTOverview");
var Poaps_1 = require("./Poaps");
var socialButtonMapping = (_a = {},
    _a["com.github"] = {
        icon: "icons/icon-github.svg",
        type: "github"
    },
    _a["com.twitter"] = {
        icon: "icons/icon-twitter.svg",
        type: "twitter"
    },
    _a["vnd.github"] = {
        icon: "icons/icon-github.svg",
        type: "github"
    },
    _a["vnd.twitter"] = {
        icon: "icons/icon-twitter.svg",
        type: "twitter"
    },
    _a["com.discord"] = {
        icon: "icons/social-discord.svg",
        type: "discord"
    },
    _a["com.reddit"] = {
        icon: "icons/social-reddit.svg",
        type: "reddit"
    },
    _a["org.telegram"] = {
        icon: "icons/social-telegram.svg",
        type: "telegram"
    },
    _a["url"] = {
        icon: "icons/social-website.svg",
        type: "url"
    },
    _a);
function useProfile(domain) {
    var _a = swr_1["default"](ens_2.ENS_METADATA_END_POINT + ("/" + domain + "/meta"), ens_2.ENSFetcher), data = _a.data, error = _a.error;
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    };
}
exports.useProfile = useProfile;
var RenderProfileTab = function (props) {
    var _a;
    var identity = props.identity;
    var profileData = useProfile(identity.displayName || identity.identity).data;
    var _b = react_use_1.useAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
        var ensInstance, obj, i, value, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ensInstance = ens_1.ens.name(identity.displayName);
                    obj = {};
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < ens_1.globalRecordKeys.length)) return [3 /*break*/, 4];
                    value = ens_1.globalRecordKeys[i];
                    if (value === "vnd.twitter" && obj["com.twitter"])
                        return [2 /*return*/];
                    if (value === "vnd.github" && obj["com.github"])
                        return [2 /*return*/];
                    _a = obj;
                    _b = ens_1.globalRecordKeys[i];
                    return [4 /*yield*/, ensInstance.getText(value)];
                case 2:
                    _a[_b] = _c.sent();
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, obj];
            }
        });
    }); }), ensRecords = _b.value, recordsLoading = _b.loading;
    var openSocialMediaLink = function (url, type) {
        var resolvedURL = "";
        if (url.startsWith("https")) {
            resolvedURL = url;
        }
        else {
            resolvedURL = utils_1.resolveSocialMediaLink(url, type);
        }
        window.open(resolvedURL, "_blank");
    };
    console.log(profileData, "records", ensRecords);
    return (React.createElement("div", { className: "profile-container" },
        (profileData || ensRecords) && (React.createElement("div", { className: "profile-basic" },
            React.createElement("div", { className: "profile-description" }, (_a = profileData.description) !== null && _a !== void 0 ? _a : "no description"),
            React.createElement("div", { className: "records" }, recordsLoading ? (React.createElement("div", { className: "records-loading-placeholder" },
                React.createElement("div", { style: {
                        position: "relative",
                        width: "1rem",
                        height: "1rem"
                    } },
                    React.createElement(Loading_1.Loading, null)),
                React.createElement("div", null, "Loading Records..."))) : ensRecords ? (Object.keys(socialButtonMapping).map(function (x, idx) {
                return (ensRecords[x] && (React.createElement("button", { key: idx, className: "form-button btn", style: { position: "relative" }, onClick: function () {
                        openSocialMediaLink(ensRecords[x], socialButtonMapping[x].type);
                    } },
                    React.createElement(react_inlinesvg_1["default"], { src: socialButtonMapping[x].icon, width: 24, height: 24, className: "icon" }))));
            })) : null))),
        React.createElement("div", { className: "profile-subTitle" }, "COLLECTIONS"),
        React.createElement(NFTOverview_1.NFTOverview, { identity: identity }),
        React.createElement("div", { className: "profile-subTitle" }, "POAPS"),
        React.createElement(Poaps_1.Poaps, { identity: identity })));
};
exports.ProfileTab = react_1.memo(RenderProfileTab);
