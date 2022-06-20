import FaviconData from './utilities/favicon_data.ts';

export interface Settings {
  siteList: FaviconData[];
  ignoreList: FaviconData[];

  features: {
    enableFaviconAutofill?: boolean;
    enableSiteIgnore?: boolean;
    enableOverrideAll?: boolean;
  };
}

/**
 * Video, Image, Emoji are all pointers to source
 * This is so we can point multiple ids to the same data
 */
export interface Source {
  id: string; // Generated by DB
  data: string; // emoji string or base64 image
}

export const defaultSettings: Settings = {
  siteList: [],
  ignoreList: [],

  features: {
    enableFaviconAutofill: false,
    enableSiteIgnore: false,
    enableOverrideAll: false,
  },
};

export const STORAGE_KEYS = Object.freeze([
  'siteList',
  'ignoreList',
  'features',
]);
