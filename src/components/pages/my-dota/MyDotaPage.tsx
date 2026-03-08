'use client';

import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { motion } from 'motion/react';
import { ExternalLink, MapPin, Skull, Star, Swords, Trophy, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useDota, type DotaMatchDto } from './use-dota';
import { useDotaHeroes, type HeroInfo } from './use-dota-heroes';
import MatchDetail from './MatchDetail';

const RANK_MEDALS: Record<number, { name: string; color: string }> = {
  1: { name: 'Herald', color: 'text-gray-400' },
  2: { name: 'Guardian', color: 'text-green-400' },
  3: { name: 'Crusader', color: 'text-cyan-400' },
  4: { name: 'Archon', color: 'text-blue-400' },
  5: { name: 'Legend', color: 'text-purple-400' },
  6: { name: 'Ancient', color: 'text-rose-400' },
  7: { name: 'Divine', color: 'text-yellow-300' },
  8: { name: 'Immortal', color: 'text-orange-400' },
};

function getRankInfo(rankTier: number | null) {
  if (!rankTier) return null;
  const medal = Math.floor(rankTier / 10);
  const stars = rankTier % 10;
  return { medal, stars, ...RANK_MEDALS[medal] };
}

function isWin(match: DotaMatchDto) {
  const isRadiant = match.player_slot < 128;
  return isRadiant ? match.radiant_win : !match.radiant_win;
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-900">
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="mt-1 text-lg font-bold dark:text-gray-100">{value}</p>
  </div>
);

type MatchRowProps = {
  match: DotaMatchDto;
  index: number;
  hero: HeroInfo | undefined;
  onClick: (match: DotaMatchDto) => void;
};

const MatchRow = ({ match, index, hero, onClick }: MatchRowProps) => {
  const won = isWin(match);
  return (
    <motion.button
      onClick={() => onClick(match)}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3
        text-left transition-colors hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-500"
    >
      <span
        className={cn(
          'w-8 shrink-0 rounded px-1 py-0.5 text-center text-xs font-bold',
          won ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        )}
      >
        {won ? 'W' : 'L'}
      </span>

      {/* Hero icon + name */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {hero?.icon ? (
          <Image src={hero.icon} width={28} height={28} alt={hero.name} className="shrink-0 rounded-sm" unoptimized />
        ) : (
          <div className="h-7 w-7 shrink-0 rounded-sm bg-gray-700" />
        )}
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold dark:text-gray-100">{hero?.name ?? '—'}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Swords size={10} className="text-green-400" />
            <span>{match.kills}</span>
            <Skull size={10} className="text-red-400" />
            <span>{match.deaths}</span>
            <span>/</span>
            <span>{match.assists}</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDuration(match.duration)}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(match.start_time)}</p>
      </div>
    </motion.button>
  );
};

const MyDotaPage = () => {
  const { player, matches, isLoading, error } = useDota();
  const { heroes } = useDotaHeroes();
  const [selectedMatch, setSelectedMatch] = useState<DotaMatchDto | null>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-sm text-red-400">{error ?? 'Dados indisponíveis'}</p>
      </div>
    );
  }

  const rank = getRankInfo(player.rank_tier);
  const { profile, mmr_estimate, leaderboard_rank } = player;

  const recentMatches = matches.slice(0, 10);
  const wins = recentMatches.filter(isWin).length;
  const winRate = recentMatches.length > 0 ? Math.round((wins / recentMatches.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-1 text-lg font-bold dark:text-gray-200">Dota 2</h2>
      <p className="mb-6 text-xs text-gray-500 dark:text-gray-400">
        minhas estatísticas como melhor jogador do meu prédio
      </p>

      {/* Perfil */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex items-center gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-900"
      >
        <a href={profile.profileurl} target="_blank" rel="noopener noreferrer">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Image
              src={profile.avatarfull}
              width={72}
              height={72}
              alt={profile.personaname}
              className="rounded-full"
              unoptimized
            />
          </motion.div>
        </a>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-bold dark:text-gray-100">{profile.personaname}</p>
            {profile.plus && (
              <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-400">
                Plus
              </span>
            )}
          </div>
          {profile.loccountrycode && (
            <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <MapPin size={12} />
              {profile.loccountrycode}
            </p>
          )}
          <a
            href={profile.profileurl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
          >
            Ver no Steam
            <ExternalLink size={11} />
          </a>
        </div>
      </motion.div>

      {/* Rank */}
      {/* {rank && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-900"
        >
          <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">Rank</p>
          <div className="flex items-center gap-3">
            <Trophy size={28} className={rank.color} />
            <div>
              <p className={cn('text-xl font-bold', rank.color)}>{rank.name}</p>
              {rank.medal < 8 && (
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < rank.stars ? rank.color : 'text-gray-600'}
                      fill={i < rank.stars ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )} */}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6 grid grid-cols-2 gap-3"
      >
        {mmr_estimate?.estimate > 0 && <StatCard label="MMR Estimado" value={mmr_estimate.estimate} />}
        {leaderboard_rank && <StatCard label="Leaderboard" value={`#${leaderboard_rank}`} />}
        {player.solo_competitive_rank && <StatCard label="Solo MMR" value={player.solo_competitive_rank} />}
        {player.competitive_rank && <StatCard label="Party MMR" value={player.competitive_rank} />}
        {recentMatches.length > 0 && (
          <>
            <StatCard label="Vitórias (últimas 10)" value={`${wins}W ${recentMatches.length - wins}L`} />
            <StatCard label="Win Rate" value={`${winRate}%`} />
          </>
        )}
      </motion.div>

      {/* Últimas partidas */}
      {recentMatches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">Últimas partidas</p>
          <div className="flex flex-col gap-2">
            {recentMatches.map((match, i) => (
              <MatchRow key={match.match_id} match={match} index={i} hero={heroes.get(match.hero_id)} onClick={setSelectedMatch} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Drawer de detalhes */}
      <Drawer open={!!selectedMatch} onOpenChange={(open) => !open && setSelectedMatch(null)}>
        <DrawerContent className="mx-auto flex max-h-[85vh] max-w-md flex-col bg-white dark:bg-black">
          <DrawerHeader className="flex shrink-0 flex-row items-center justify-between">
            <DrawerTitle className="text-sm text-gray-500 dark:text-gray-400">
              #{selectedMatch?.match_id}
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="text-gray-400 hover:text-gray-200">
                <X size={16} />
              </button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            {selectedMatch && (
              <MatchDetail
                matchId={selectedMatch.match_id}
                myAccountId={profile.account_id}
                isWin={isWin(selectedMatch)}
                heroes={heroes}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MyDotaPage;
