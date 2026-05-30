export type TipStatus = 'replied' | 'unreplied';

export interface TipItem {
  id: string;
  name: string;
  username: string;
  coins: number;
  avatar: string;
  status: TipStatus;
  hasCoinBadge?: boolean;
}

export interface TipStats {
  earnedCoins: string;
  equivalent: string;
  tippers: string;
}

export type SortOptionType = 'recency' | 'amountHighToLow' | 'amountLowToHigh';
