'use client';

import { useCallback, useEffect, useState } from 'react';

export type MatchPlayerDto = {
  account_id: number | null;
  player_slot: number;
  hero_id: number;
  kills: number;
  deaths: number;
  assists: number;
  last_hits: number;
  denies: number;
  gold_per_min: number;
  xp_per_min: number;
  net_worth: number;
  level: number;
  hero_damage: number;
  tower_damage: number;
  hero_healing: number;
  personaname: string | null;
  item_0: number;
  item_1: number;
  item_2: number;
  item_3: number;
  item_4: number;
  item_5: number;
};

export type MatchDetailDto = {
  match_id: number;
  radiant_win: boolean;
  duration: number;
  start_time: number;
  game_mode: number;
  radiant_score: number;
  dire_score: number;
  patch: number;
  players: MatchPlayerDto[];
};

export const useDotaMatch = (matchId: number | null) => {
  const [match, setMatch] = useState<MatchDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMatch = useCallback(() => {
    if (!matchId) return;

    setIsLoading(true);
    setError(null);
    setMatch(null);

    fetch(`https://api.opendota.com/api/matches/${matchId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Fetch match fail');
        return res.json() as Promise<MatchDetailDto>;
      })
      .then((data) => setMatch(data))
      .catch((err) => {
        console.error('error useDotaMatch', err);
        setError('Falha ao carregar detalhes da partida');
      })
      .finally(() => setIsLoading(false));
  }, [matchId]);

  useEffect(() => {
    loadMatch();
  }, [loadMatch]);

  return { match, isLoading, error };
};
