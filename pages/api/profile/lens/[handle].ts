import type { NextApiRequest, NextApiResponse } from "next";
import { isAddress } from "@ethersproject/address";
import {
  firstParam,
  getSocialMediaLink,
  resolveEipAssetURL,
  resolveHandle,
} from "../../../../utils/utils";
import client from "../../../../utils/apollo";
import _ from "lodash";
import { GET_PROFILE_LENS } from "../../../../utils/lens";
import { HandleResponseData } from "../../../../utils/api";
import { PlatformType, platfomData } from "../../../../utils/platform";

export const getLensProfile = async (handle: string) => {
  const fetchRes = await client.query({
    query: GET_PROFILE_LENS,
    variables: {
      handle,
    },
    context: {
      uri: process.env.NEXT_PUBLIC_LENS_GRAPHQL_SERVER,
    },
  });
  if (fetchRes) return fetchRes.data.profile;
  return null;
};

const resolveNameFromLens = async (
  handle: string,
  res: NextApiResponse<HandleResponseData>
) => {
  try {
    const response = await getLensProfile(handle);
    const pureHandle = handle.replaceAll(".lens", "");
    let LINKRES = {};
    let CRYPTORES = {
      matic: response.ownedBy,
    };
    if (response.attributes) {
      const linksRecords = response.attributes;
      const linksToFetch = linksRecords.reduce((pre, cur) => {
        if (Object.keys(platfomData).includes(cur.key)) pre.push(cur.key);
        return pre;
      }, []);

      const getLink = async () => {
        const _linkRes = {};
        for (let i = 0; i < linksToFetch.length; i++) {
          const recordText = linksToFetch[i];
          const handle = resolveHandle(
            _.find(linksRecords, (o) => o.key === recordText)?.value
          );
          if (handle) {
            const resolvedHandle =
              recordText === PlatformType.twitter
                ? handle.replaceAll("@", "")
                : handle;
            _linkRes[recordText] = {
              link: getSocialMediaLink(resolvedHandle, recordText),
              handle: resolvedHandle,
            };
          }
        }
        return _linkRes;
      };
      LINKRES = {
        [PlatformType.lenster]: {
          link: getSocialMediaLink(pureHandle, PlatformType.lenster),
          handle: pureHandle,
        },
        ...(await getLink()),
      };
    }
    const resJSON = {
      owner: response.ownedBy,
      identity: response.handle,
      displayName: response.name,
      avatar: await resolveEipAssetURL(response.picture?.original.url || null),
      email: null,
      description: response.bio,
      location: response.attributes
        ? _.find(response.attributes, (o) => o.key === "location")?.value
        : null,
      header: await resolveEipAssetURL(
        response.coverPicture?.original.url || null
      ),
      links: LINKRES,
      addresses: CRYPTORES,
    };
    res
      .status(200)
      .setHeader(
        "Cache-Control",
        `public, s-maxage=${60 * 60 * 24 * 7}, stale-while-revalidate=${60 * 30}`
      )
      .json(resJSON);
  } catch (error: any) {
    res.status(500).json({
      owner: null,
      identity: handle,
      displayName: null,
      avatar: null,
      email: null,
      description: null,
      location: null,
      header: null,
      links: {},
      addresses: {},
      error: error.message,
    });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandleResponseData>
) {
  const inputName = firstParam(req.query.handle);
  return resolveNameFromLens(inputName, res);
}
