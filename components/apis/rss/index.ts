export const RSS_ENDPOINT = "https://contenthash.web3.bio/api/";
export const RSSFetcher = async (url) => {
  try {
    const res = await fetch(url);
    if (res.status != 200) return [];
    return res.json();
  } catch (e) {
    return [];
  }
};