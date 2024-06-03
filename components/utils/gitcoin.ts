export enum GitcoinPassport {
  beginnerCommunityStaker = "BeginnerCommunityStaker",
  brightId = "Brightid",
  civicCaptcha = "CivicCaptchaPass",
  civicLiveness = "CivicLivenessPass",
  civicUniqueness = "CivicUniquenessPass",
  coinbaseDual = "CoinbaseDualVerification",
  discord = "Discord",
  ens = "Ens",
  ethActive50Days = "ETHDaysActive#50",
  ethGasMoreThan025 = "ETHGasSpent#0.25",
  ethTransactionsOver100 = "ETHnumTransactions#100",
  ethEnthusiast = "ETHScore#50",
  ethAdvocate = "ETHScore#75",
  ethMaxi = "ETHScore#90",
  experiencedCommunityStaker = "ExperiencedCommunityStaker",
  gitcoinGrants10 = "GitcoinContributorStatistics#totalContributionAmountGte#10",
  gitcoinGrants100 = "GitcoinContributorStatistics#totalContributionAmountGte#100",
  gitcoinGrants1000 = "GitcoinContributorStatistics#totalContributionAmountGte#1000",
  githubActivity30 = "githubContributionActivityGte#30",
  githubActivity60 = "githubContributionActivityGte#60",
  githubActivity120 = "githubContributionActivityGte#120",
  gnosisSafe = "GnosisSafe",
  google = "Google",
  guildAdmin = "GuildAdmin",
  guildMember = "GuildPassportMember",
  holonymGovIdProvider = "HolonymGovIdProvider",
  idenaStateHuman = "IdenaState#Human",
  idenaStateNewbie = "IdenaState#Newbie",
  idenaStateVerified = "IdenaState#Verified",
  lens = "Lens",
  linkdein = "Linkdein",
  nft = "NFT",
  nftScore50 = "NFTScore#50",
  nftScore75 = "NFTScore#75",
  nftScore90 = "NFTScore#90",
  selfStakingBronze = "SelfStakingBronze",
  selfStakingGold = "SelfStakingGold",
  selfStakingSilver = "SelfStakingSilver",
  snapshotProposalsProvider = "SnapshotProposalsProvider",
  trustaLabs = "TrustaLabs",
  trustedCitizen = "TrustedCitizen",
  zkSyncEra = "ZkSyncEra",
  zkSyncScore20 = "zkSyncScore#20",
  zkSyncScore50 = "zkSyncScore#50",
  zkSyncScore5 = "zkSyncScore#5",
}

export const gitcoinPassportMapping = (key: GitcoinPassport) => {
  return {
    [GitcoinPassport.brightId]: {
      key: GitcoinPassport.brightId,
      weight: 0.802,
      label: "BrightID",
      type: "BrightID",
    },
    [GitcoinPassport.beginnerCommunityStaker]: {
      key: GitcoinPassport.beginnerCommunityStaker,
      weight: 1.513,
      label: "Beginner Community Staker",
      type: "GTC Staking",
    },
    [GitcoinPassport.civicCaptcha]: {
      key: GitcoinPassport.civicCaptcha,
      weight: 1.014,
      label: "Holds a Civic CAPTCHA Pass",
      type: "Civic",
    },
    [GitcoinPassport.civicLiveness]: {
      key: GitcoinPassport.civicLiveness,
      weight: 3.004,
      label: "Holds a Civic Liveness Pass",
      type: "Civic",
    },
    [GitcoinPassport.civicUniqueness]: {
      key: GitcoinPassport.civicUniqueness,
      weight: 6.005,
      label: "Holds a Civic Uniqueness Pass",
      type: "Civic",
    },
    [GitcoinPassport.coinbaseDual]: {
      key: GitcoinPassport.coinbaseDual,
      weight: 16.042,
      label: "Coinbase Dual Verification",
      type: "Coinbase",
    },
    [GitcoinPassport.discord]: {
      key: GitcoinPassport.discord,
      weight: 0.516,
      label: "Discord",
      type: "Discord",
    },
    [GitcoinPassport.ens]: {
      key: GitcoinPassport.ens,
      weight: 0.408,
      label: "ENS",
      type: "ENS",
    },
    [GitcoinPassport.ethEnthusiast]: {
      key: GitcoinPassport.ethEnthusiast,
      weight: 10.012,
      label: "ETH Enthusiast",
      type: "ETH",
    },
    [GitcoinPassport.ethAdvocate]: {
      key: GitcoinPassport.ethAdvocate,
      weight: 2.001,
      label: "ETH Advocate",
      type: "ETH",
    },
    [GitcoinPassport.ethMaxi]: {
      key: GitcoinPassport.ethMaxi,
      weight: 2.009,
      label: "ETH Maxi",
      type: "ETH",
    },
    [GitcoinPassport.ethActive50Days]: {
      key: GitcoinPassport.ethActive50Days,
      weight: 0.507,
      label: "Active on ETH over 50 distinct days",
      type: "ETH",
    },
    [GitcoinPassport.ethTransactionsOver100]: {
      key: GitcoinPassport.ethTransactionsOver100,
      weight: 0.51,
      label: "Execute over 100 transactions on ETH",
      type: "ETH",
    },
    [GitcoinPassport.ethGasMoreThan025]: {
      key: GitcoinPassport.ethGasMoreThan025,
      weight: 1.003,
      label: "Spend more than 0.25 ETH on gas:",
      type: "ETH",
    },
    [GitcoinPassport.gitcoinGrants10]: {
      key: GitcoinPassport.gitcoinGrants10,
      weight: 0.523,
      label: "Contributed at least $10 on Gitcoin Grants",
      type: "Gitcoin Grants",
    },
    [GitcoinPassport.gitcoinGrants100]: {
      key: GitcoinPassport.gitcoinGrants100,
      weight: 2.017,
      label: "Contributed at least $100 on Gitcoin Grants",
      type: "Gitcoin Grants",
    },
    [GitcoinPassport.gitcoinGrants1000]: {
      key: GitcoinPassport.gitcoinGrants1000,
      weight: 5.018,
      label: "Contributed at least $1000 on Gitcoin Grants",
      type: "Gitcoin Grants",
    },
    [GitcoinPassport.githubActivity30]: {
      key: GitcoinPassport.githubActivity30,
      weight: 2.02,
      label: "Contributions on Github at least 30 distinct days",
      type: "Github",
    },
    [GitcoinPassport.githubActivity60]: {
      key: GitcoinPassport.githubActivity60,
      weight: 2.021,
      label: "Contributions on Github at least 60 distinct days",
      type: "Github",
    },
    [GitcoinPassport.githubActivity120]: {
      key: GitcoinPassport.githubActivity120,
      weight: 3.019,
      label: "Contributions on Github at least 120 distinct days",
      type: "Github",
    },
    [GitcoinPassport.gnosisSafe]: {
      key: GitcoinPassport.gnosisSafe,
      weight: 0.822,
      label: "Gnosis Safe",
      type: "Gnosis Safe",
    },
    [GitcoinPassport.google]: {
      key: GitcoinPassport.google,
      weight: 0.525,
      label: "Google",
      type: "Google",
    },
    [GitcoinPassport.experiencedCommunityStaker]: {
      key: GitcoinPassport.experiencedCommunityStaker,
      weight: 2.515,
      label: "Experienced Community Staker",
      type: "GTC Staking",
    },
    [GitcoinPassport.trustedCitizen]: {
      key: GitcoinPassport.trustedCitizen,
      weight: 4.041,
      label: "Trusted Citizen",
      type: "GTC Staking",
    },
    [GitcoinPassport.trustaLabs]: {
      key: GitcoinPassport.trustaLabs,
      weight: 0.511,
      label: "Trusta Labs",
      type: "Trusta Labs",
    },
    [GitcoinPassport.selfStakingBronze]: {
      key: GitcoinPassport.selfStakingBronze,
      weight: 1.036,
      label: "Self Staking Bronze",
      type: "GTC Staking",
    },
    [GitcoinPassport.selfStakingSilver]: {
      key: GitcoinPassport.selfStakingSilver,
      weight: 2.038,
      label: "Self Staking Silver",
      type: "GTC Staking",
    },
    [GitcoinPassport.selfStakingGold]: {
      key: GitcoinPassport.selfStakingGold,
      weight: 3.037,
      label: "Self Staking Gold",
      type: "GTC Staking",
    },
    [GitcoinPassport.guildAdmin]: {
      key: GitcoinPassport.guildAdmin,
      weight: 0.724,
      label: "Owner or Administrator of one or more guilds",
      type: "Guild",
    },
    [GitcoinPassport.guildMember]: {
      key: GitcoinPassport.guildMember,
      weight: 0.54,
      label: "Member with 1 or more roles in Gitcoin Passport Guild",
      type: "Guild",
    },
    [GitcoinPassport.holonymGovIdProvider]: {
      key: GitcoinPassport.holonymGovIdProvider,
      weight: 16.026,
      label: "Holonym",
      type: "Holonym",
    },
    [GitcoinPassport.idenaStateHuman]: {
      key: GitcoinPassport.idenaStateHuman,
      weight: 2.027,
      label: "Idena Identity State - Human",
      type: "Idena",
    },
    [GitcoinPassport.idenaStateNewbie]: {
      key: GitcoinPassport.idenaStateHuman,
      weight: 6.028,
      label: "Idena Identity State - Newbie",
      type: "Idena",
    },
    [GitcoinPassport.idenaStateVerified]: {
      key: GitcoinPassport.idenaStateHuman,
      weight: 2.029,
      label: "Idena Identity State - Verified",
      type: "Idena",
    },
    [GitcoinPassport.lens]: {
      key: GitcoinPassport.lens,
      weight: 0.93,
      label: "Lens Handle",
      type: "Lens Handle",
    },
    [GitcoinPassport.linkdein]: {
      key: GitcoinPassport.linkdein,
      weight: 1.531,
      label: "Linkedin Account",
      type: "Linkedin Account",
    },
    [GitcoinPassport.nft]: {
      key: GitcoinPassport.nft,
      weight: 1.032,
      label: "NFT Holder",
      type: "NFT",
    },
    [GitcoinPassport.nftScore50]: {
      key: GitcoinPassport.nftScore50,
      weight: 10.033,
      label: "Digital Collector",
      type: "NFT",
    },
    [GitcoinPassport.nftScore75]: {
      key: GitcoinPassport.nftScore75,
      weight: 2.034,
      label: "Art Aficionado",
      type: "NFT",
    },
    [GitcoinPassport.nftScore90]: {
      key: GitcoinPassport.nftScore90,
      weight: 2.035,
      label: "NFT Visionary",
      type: "NFT",
    },
    [GitcoinPassport.snapshotProposalsProvider]: {
      key: GitcoinPassport.snapshotProposalsProvider,
      weight: 0.839,
      label: "Created a DAO proposal that was voted on by at least 1 account",
      type: "Snapshot",
    },
    [GitcoinPassport.zkSyncEra]: {
      key: GitcoinPassport.zkSyncEra,
      weight: 0.606,
      label: "Verified Transactor",
      type: "ZkSync",
    },
    [GitcoinPassport.zkSyncScore20]: {
      key: GitcoinPassport.zkSyncScore20,
      weight: 1.67,
      label: "Engagement Explorer",
      type: "ZkSync",
    },
    [GitcoinPassport.zkSyncScore50]: {
      key: GitcoinPassport.zkSyncScore50,
      weight: 1.67,
      label: "Blockchain Believer",
      type: "ZkSync",
    },
    [GitcoinPassport.zkSyncScore5]: {
      key: GitcoinPassport.zkSyncScore5,
      weight: 1.67,
      label: "zkSync Champion",
      type: "ZkSync",
    },
  }[key];
};
