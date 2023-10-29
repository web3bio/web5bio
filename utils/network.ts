export enum Network {
  ethereum = "ethereum",
  binance_smart_chain = "binance_smart_chain",
  base = "base",
  arbitrum = "arbitrum",
  polygon = "polygon",
  optimism = "optimism",
  fantom = "fantom",
  zksync_era = "zksync_era",
  avalanche = "avalanche",
  crossbell = "crossbell",
  farcaster = "farcaster",
  conflux = "conflux",
  aptos = "aptos",
  arweave = "arweave",
  flow = "flow",
  gnosis = "gnosis",
  scroll = "scroll",
  zora = "zora",
  mastodon = "mastodon",
  lens = "lens",
  erc1577 = "erc1577"
}

export interface NetworkMetaData {
  key: string;
  icon: string;
  label: string;
  primaryColor: string;
  bgColor: string;
  scanPrefix: string;
}

export const NetworkData: { [key in Network]: NetworkMetaData } = {
  [Network.ethereum]: {
    key: Network.ethereum,
    icon: "icons/icon-ethereum.svg",
    label: "Ethereum",
    primaryColor: "#3741ba",
    bgColor: "#ebecf8",
    scanPrefix: "https://etherscan.io/",
  },
  [Network.polygon]: {
    key: Network.polygon,
    icon: "icons/icon-polygon.svg",
    label: "Polygon",
    primaryColor: "#7a4add",
    bgColor: "#ece5fa",
    scanPrefix: "https://polygonscan.com/",
  },
  [Network.avalanche]: {
    key: Network.avalanche,
    icon: "icons/icon-avalanche.svg",
    label: "Avalanche",
    primaryColor: "#e84142",
    bgColor: "#ffefef",
    scanPrefix: "https://avascan.info/",
  },
  [Network.aptos]: {
    key: Network.aptos,
    icon: "icons/icon-aptos.svg",
    label: "Aptos",
    primaryColor: "#6fe0b2",
    bgColor: "#e9faf3",
    scanPrefix: "https://aptoscan.com/",
  },
  [Network.arbitrum]: {
    key: Network.arbitrum,
    icon: "icons/icon-arbitrum.svg",
    label: "Arbitrum",
    primaryColor: "#223147",
    bgColor: "#9dccec",
    scanPrefix: "https://arbiscan.io/",
  },
  [Network.arweave]: {
    key: Network.arweave,
    icon: "icons/icon-arweave.svg",
    label: "Arweave",
    primaryColor: "#222326",
    bgColor: "#e1e1e1",
    scanPrefix: "https://viewblock.io/arweave/",
  },
  [Network.binance_smart_chain]: {
    key: Network.binance_smart_chain,
    icon: "icons/icon-bsc.svg",
    label: "BNB Chain",
    primaryColor: "#f0b90b",
    bgColor: "#fdf3d4",
    scanPrefix: "https://bscscan.com/",
  },
  [Network.base]: {
    key: Network.base,
    icon: "icons/icon-base.svg",
    label: "Base",
    primaryColor: "#2151f5",
    bgColor: "#e9eefe",
    scanPrefix: "https://basescan.org/",
  },
  [Network.flow]: {
    key: Network.flow,
    icon: "icons/icon-flow.svg",
    label: "Flow",
    primaryColor: "#00ef8b",
    bgColor: "#e5fdf3",
    scanPrefix: "https://www.flowdiver.io/",
  },
  [Network.conflux]: {
    key: Network.conflux,
    icon: "icons/icon-conflux.svg",
    label: "Conflux",
    primaryColor: "#1e1e2b",
    bgColor: "#e8e8ea",
    scanPrefix: "https://www.confluxscan.io/",
  },
  [Network.crossbell]: {
    key: Network.crossbell,
    icon: "icons/icon-crossbell.svg",
    label: "Crossbell",
    primaryColor: "#f7d16a",
    bgColor: "#fef8e9",
    scanPrefix: "https://scan.crossbell.io/",
  },
  [Network.fantom]: {
    key: Network.fantom,
    icon: "icons/icon-fantom.svg",
    label: "Fantom",
    primaryColor: "#0810ef",
    bgColor: "#e6e7fd",
    scanPrefix: "https://ftmscan.com/",
  },
  [Network.farcaster]: {
    key: Network.farcaster,
    icon: "icons/icon-farcaster.svg",
    label: "Farcaster",
    primaryColor: "#8a63d2",
    bgColor: "#efeaf8",
    scanPrefix: "https://casterscan.com/",
  },
  [Network.optimism]: {
    key: Network.optimism,
    icon: "icons/icon-optimism.svg",
    label: "Optimism",
    primaryColor: "#ea3431",
    bgColor: "#fdebea",
    scanPrefix: "https://optimistic.etherscan.io/",
  },
  [Network.zksync_era]: {
    key: Network.zksync_era,
    icon: "icons/icon-zksync.svg",
    label: "zkSync Era",
    primaryColor: "#3567f6",
    bgColor: "#ebf0fe",
    scanPrefix: "https://explorer.zksync.io/",
  },
  [Network.gnosis]: {
    key: Network.gnosis,
    icon: "icons/icon-gnosis.svg",
    label: "Gnosis",
    primaryColor: "#1c352a",
    bgColor: "#e8ebea",
    scanPrefix: "https://gnosisscan.io/",
  },
  [Network.scroll]: {
    key: Network.scroll,
    icon: "icons/icon-scroll.svg",
    label: "Scroll",
    primaryColor: "#b78544",
    bgColor: "#f1e7db",
    scanPrefix: "https://scrollscan.com/",
  },
  [Network.zora]: {
    key: Network.zora,
    icon: "icons/icon-zora.svg",
    label: "Zora",
    primaryColor: "#141414",
    bgColor: "#efefef",
    scanPrefix: "https://explorer.zora.energy/",
  },
  [Network.mastodon]: {
    key: Network.mastodon,
    icon: "icons/icon-mastodon.svg",
    label: "Mastodon",
    primaryColor: "#6364f6",
    bgColor: "#e8e8fe",
    scanPrefix: "",
  },
  [Network.lens]: {
    key: Network.lens,
    icon: "icons/icon-lens.svg",
    label: "Lens",
    primaryColor: "#6bc674",
    bgColor: "#d9f1dc",
    scanPrefix: "https://momoka.lens.xyz/",
  },
  [Network.erc1577]: {
    key: Network.erc1577,
    icon: "icons/icon-ethereum.svg",
    label: "ERC-1577",
    primaryColor: "#3c3c3d",
    bgColor: "#ebf3ff",
    scanPrefix: "",
  },
};

export const NetworkMapping = (network: Network) => {
  return (
    NetworkData[network] ?? {
      key: network,
      icon: "",
      label: network,
      primaryColor: "#000000",
      bgColor: "#efefef",
      scanPrefix: "",
    }
  );
};