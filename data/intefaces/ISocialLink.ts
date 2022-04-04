
export enum SocialLinkType {
  Twitter = 'twitter',
  LinkedId = 'linkedin',
  Facebook = 'facebook',
  Instagram = 'instagram',
  Web = 'web',
}

export class SocialLink {
  type: SocialLinkType;
  link: string;
}
