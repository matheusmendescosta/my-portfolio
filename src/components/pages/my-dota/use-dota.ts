'use client';

import { useCallback, useEffect, useState } from 'react';

export type DotaPlayerDto = {
  tracked_until: string | null;
  solo_competitive_rank: number | null;
  competitive_rank: number | null;
  rank_tier: number | null;
  leaderboard_rank: number | null;
  mmr_estimate: {
    estimate: number;
  };
  profile: {
    account_id: number;
    personaname: string;
    name: string | null;
    plus: boolean;
    cheese: number;
    steamid: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    profileurl: string;
    last_login: string | null;
    loccountrycode: string | null;
    is_contributor: boolean;
    is_subscriber: boolean;
  };
};

export type DotaMatchDto = {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  duration: number;
  game_mode: number;
  lobby_type: number;
  hero_id: number;
  start_time: number;
  kills: number;
  deaths: number;
  assists: number;
  average_rank: number | null;
  leaver_status: number;
  party_size: number | null;
};

export const useDota = () => {
  const [player, setPlayer] = useState<DotaPlayerDto>();
  const [matches, setMatches] = useState<DotaMatchDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    const accountId = process.env.NEXT_PUBLIC_DOTA_ACCOUNT_ID;

    setIsLoading(true);
    setError(null);

    Promise.all([
      fetch(`https://api.opendota.com/api/players/${accountId}`).then((res) => {
        if (!res.ok) throw new Error('Fetch player fail');
        return res.json() as Promise<DotaPlayerDto>;
      }),
      fetch(`https://api.opendota.com/api/players/${accountId}/recentMatches`).then((res) => {
        if (!res.ok) throw new Error('Fetch matches fail');
        return res.json() as Promise<DotaMatchDto[]>;
      }),
    ])
      .then(([playerData, matchesData]) => {
        setPlayer(playerData);
        setMatches(matchesData);
      })
      .catch((err) => {
        console.error('error useDota', err);
        setError('Falha ao carregar dados do Dota 2');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { player, matches, isLoading, error };
};
