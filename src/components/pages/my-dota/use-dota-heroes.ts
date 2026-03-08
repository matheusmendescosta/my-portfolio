'use client';

import { useCallback, useEffect, useState } from 'react';

const STEAM_CDN = 'https://cdn.cloudflare.steamstatic.com';

type HeroStatDto = {
  id: number;
  localized_name: string;
  img: string;
  icon: string;
};

export type HeroInfo = {
  name: string;
  img: string;
  icon: string;
};

export const useDotaHeroes = () => {
  const [heroes, setHeroes] = useState<Map<number, HeroInfo>>(new Map());

  const loadHeroes = useCallback(() => {
    fetch('https://api.opendota.com/api/heroStats')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch heroStats fail');
        return res.json() as Promise<HeroStatDto[]>;
      })
      .then((data) => {
        const map = new Map(
          data.map((h) => [
            h.id,
            {
              name: h.localized_name,
              img: `${STEAM_CDN}${h.img}`,
              icon: `${STEAM_CDN}${h.icon}`,
            },
          ])
        );
        setHeroes(map);
      })
      .catch((err) => console.error('error useDotaHeroes', err));
  }, []);

  useEffect(() => {
    loadHeroes();
  }, [loadHeroes]);

  return { heroes };
};
