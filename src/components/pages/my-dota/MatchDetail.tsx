'use client';

import { cn } from '@/lib/utils';
import { ExternalLink, Shield, Sword } from 'lucide-react';
import Image from 'next/image';
import { useDotaMatch, type MatchPlayerDto } from './use-dota-match';
import { type HeroInfo } from './use-dota-heroes';

const GAME_MODES: Record<number, string> = {
  1: 'All Pick',
  2: 'Captain\'s Mode',
  3: 'Random Draft',
  4: 'Single Draft',
  5: 'All Random',
  16: 'Captain\'s Draft',
  22: 'All Pick Ranked',
  23: 'Turbo',
};

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatNumber(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

const PlayerRow = ({
  player,
  isMe,
  hero,
}: {
  player: MatchPlayerDto;
  isMe: boolean;
  hero: HeroInfo | undefined;
}) => (
  <tr className={cn('border-b border-gray-100 text-xs dark:border-gray-800', isMe && 'bg-blue-500/10')}>
    <td className="py-1.5 pr-2">
      <div className="flex items-center gap-1.5">
        {hero?.icon && (
          <Image
            src={hero.icon}
            width={20}
            height={20}
            alt={hero.name}
            className="shrink-0 rounded-sm"
            unoptimized
          />
        )}
        <div>
          <span className={cn('block truncate font-medium dark:text-gray-200', isMe && 'text-blue-400')}>
            {hero?.name ?? `Hero #${player.hero_id}`}
            {isMe && <span className="ml-1 text-[10px] text-blue-400">(Eu)</span>}
          </span>
          <span className="block truncate text-[10px] text-gray-400">{player.personaname ?? 'Anônimo'}</span>
        </div>
      </div>
    </td>
    <td className="px-1 text-center dark:text-gray-300">
      {player.kills}/{player.deaths}/{player.assists}
    </td>
    <td className="px-1 text-center dark:text-gray-400">{player.gold_per_min}</td>
    <td className="px-1 text-center dark:text-gray-400">{player.xp_per_min}</td>
    <td className="px-1 text-center dark:text-gray-400">{formatNumber(player.net_worth)}</td>
    <td className="pl-1 text-center dark:text-gray-400">{formatNumber(player.hero_damage)}</td>
  </tr>
);

const TeamTable = ({
  players,
  label,
  color,
  icon,
  myAccountId,
  heroes,
}: {
  players: MatchPlayerDto[];
  label: string;
  color: string;
  icon: React.ReactNode;
  myAccountId: number;
  heroes: Map<number, HeroInfo>;
}) => (
  <div className="mb-4">
    <div className={cn('mb-2 flex items-center gap-1.5 text-sm font-bold', color)}>
      {icon}
      {label}
    </div>
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200 text-[10px] text-gray-500 dark:border-gray-700 dark:text-gray-500">
          <th className="pb-1 text-left font-normal">Herói / Jogador</th>
          <th className="pb-1 font-normal">KDA</th>
          <th className="pb-1 font-normal">GPM</th>
          <th className="pb-1 font-normal">XPM</th>
          <th className="pb-1 font-normal">NW</th>
          <th className="pb-1 font-normal">Dano</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p) => (
          <PlayerRow
            key={p.player_slot}
            player={p}
            isMe={p.account_id === myAccountId}
            hero={heroes.get(p.hero_id)}
          />
        ))}
      </tbody>
    </table>
  </div>
);

type MatchDetailProps = {
  matchId: number;
  myAccountId: number;
  isWin: boolean;
  heroes: Map<number, HeroInfo>;
};

const MatchDetail = ({ matchId, myAccountId, isWin, heroes }: MatchDetailProps) => {
  const { match, isLoading, error } = useDotaMatch(matchId);

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-sm text-red-400">{error ?? 'Dados indisponíveis'}</p>
      </div>
    );
  }

  const radiantPlayers = match.players.filter((p) => p.player_slot < 128);
  const direPlayers = match.players.filter((p) => p.player_slot >= 128);

  return (
    <div className="px-4 pb-6">
      {/* Resultado */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className={cn('text-2xl font-bold', isWin ? 'text-green-400' : 'text-red-400')}>
            {isWin ? 'Vitória' : 'Derrota'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(match.start_time)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">{GAME_MODES[match.game_mode] ?? 'Modo desconhecido'}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{formatDuration(match.duration)}</p>
        </div>
      </div>

      {/* Placar */}
      <div className="mb-6 flex items-center justify-center gap-4 rounded-lg border
        border-gray-200 p-3 dark:border-gray-700 dark:bg-gray-900">
        <div className="text-center">
          <p className={cn('text-2xl font-bold', match.radiant_win ? 'text-green-400' : 'text-gray-400')}>
            {match.radiant_score}
          </p>
          <p className="text-xs text-green-500">Radiant</p>
        </div>
        <p className="text-gray-500">vs</p>
        <div className="text-center">
          <p className={cn('text-2xl font-bold', !match.radiant_win ? 'text-red-400' : 'text-gray-400')}>
            {match.dire_score}
          </p>
          <p className="text-xs text-red-500">Dire</p>
        </div>
      </div>

      {/* Times */}
      <TeamTable
        players={radiantPlayers}
        label="Radiant"
        color="text-green-400"
        icon={<Shield size={14} />}
        myAccountId={myAccountId}
        heroes={heroes}
      />
      <TeamTable
        players={direPlayers}
        label="Dire"
        color="text-red-400"
        icon={<Sword size={14} />}
        myAccountId={myAccountId}
        heroes={heroes}
      />

      {/* Link OpenDota */}
      <a
        href={`https://www.opendota.com/matches/${matchId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-gray-200"
      >
        Ver no OpenDota
        <ExternalLink size={11} />
      </a>
    </div>
  );
};

export default MatchDetail;
