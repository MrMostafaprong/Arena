import React, { useEffect, useState } from 'react';
import type {
  AppDestination,
  ArenaId,
  AvatarConfig,
  GameMode,
  MatchResult,
  RivalChampion,
  StarterBlessing,
} from './types/game';
import { RIVAL_CHAMPIONS, computeFighterDerivedStats } from './data/gameCatalog';
import { usePlayerProgress } from './hooks/usePlayerProgress';
import { useMultiplayerSocket } from './hooks/useMultiplayerSocket';
import { TopNav } from './components/TopNav';
import { BattleHub } from './components/BattleHub';
import { AvatarForge } from './components/AvatarForge';
import { ArmoryView } from './components/ArmoryView';
import { RewardsView } from './components/RewardsView';
import { PvpCompetitionView } from './components/PvpCompetitionView';
import { ArenaCombatView } from './components/ArenaCombatView';
import { StoryPrologueModal } from './components/StoryPrologueModal';

export function App() {
  const {
    profile,
    completeIntro,
    updateAvatar,
    allocateStat,
    unlockOrEquipWeapon,
    upgradeWeapon,
    unlockOrEquipPower,
    unlockNextSkillSlot,
    upgradePower,
    unlockNetworkNode,
    fusePowers,
    unlockOrEquipGear,
    unequipGearSlot,
    buyConsumable,
    consumeBattleItem,
    acceptNpcJob,
    recordResourceGathered,
    completeNpcJob,
    sellSingleResource,
    sellAllResourcesForMarks,
    exchangeGuildMarks,
    recordMatchResult,
    claimQuest,
    claimMapChallenge,
    recordRegionDiscovery,
    recordWorldChestOpened,
    recordChunkExplored,
    recordCritLanded,
    recordFusionCast,
    recordSecretBossDefeated,
    recordWorldEventCompleted,
    claimDailyChallenge,
    claimAchievement,
    equipTitle,
    openChest,
    buyChest,
    setSystemTheme,
    setQuality,
    setCameraView,
    setSoundEnabled,
    setDeviceMode,
    setLandscapeLocked,
    setFavoriteArena,
  } = usePlayerProgress();

  const mp = useMultiplayerSocket();

  const [destination, setDestination] = useState<AppDestination>('hub');
  const [selectedArena, setSelectedArena] = useState<ArenaId>(profile.favoriteArena);
  const [selectedMode, setSelectedMode] = useState<GameMode>('unified_clash');
  const [activeRival, setActiveRival] = useState<RivalChampion>(RIVAL_CHAMPIONS[0]);
  const [localP2Avatar, setLocalP2Avatar] = useState<AvatarConfig>(RIVAL_CHAMPIONS[1].avatar);
  const [showStoryModal, setShowStoryModal] = useState(false);

  // Enter combat automatically once an online room is created/joined
  useEffect(() => {
    if (mp.activeRoom && destination !== 'combat') {
      setSelectedArena(mp.activeRoom.arenaId);
      setSelectedMode('pvp_online');
      setDestination('combat');
    }
  }, [mp.activeRoom, destination]);

  const handleSelectArena = (arenaId: ArenaId) => {
    setSelectedArena(arenaId);
    setFavoriteArena(arenaId);
  };

  const handleStartCombat = (mode: GameMode, arenaId: ArenaId) => {
    setSelectedMode(mode);
    setSelectedArena(arenaId);
    if (mode === 'pvp_ranked') {
      const sorted = [...RIVAL_CHAMPIONS].sort(
        (a, b) => Math.abs(a.rating - profile.rating) - Math.abs(b.rating - profile.rating)
      );
      setActiveRival(sorted[0]);
    }
    setDestination('combat');
  };

  const handleChallengeChampion = (champion: RivalChampion, arenaId: ArenaId) => {
    setActiveRival(champion);
    setSelectedMode('pvp_ranked');
    setSelectedArena(arenaId);
    setDestination('combat');
  };

  const handleStartLocalPvp = (p2Champion: RivalChampion, arenaId: ArenaId) => {
    setLocalP2Avatar(p2Champion.avatar);
    setSelectedMode('pvp_local');
    setSelectedArena(arenaId);
    setDestination('combat');
  };

  const handleCreateOnlineRoom = (roomName: string, arenaId: ArenaId) => {
    const lv = profile.weaponLevels[profile.avatar.weaponId] || 1;
    const derived = computeFighterDerivedStats(profile.avatar, lv, profile.equippedGear);
    mp.createRoom({
      roomName,
      arenaId,
      avatar: profile.avatar,
      maxHp: derived.maxHp,
      weaponLevel: lv,
    });
  };

  const handleJoinOnlineRoom = (codeOrId: string) => {
    const lv = profile.weaponLevels[profile.avatar.weaponId] || 1;
    const derived = computeFighterDerivedStats(profile.avatar, lv, profile.equippedGear);
    mp.joinRoom({
      codeOrId,
      avatar: profile.avatar,
      maxHp: derived.maxHp,
      weaponLevel: lv,
    });
  };

  const handleMatchComplete = (result: MatchResult) => {
    recordMatchResult(result);
    const nextRating = Math.max(800, profile.rating + result.ratingDelta);
    const nextWins = profile.wins + (result.victory ? 1 : 0);
    mp.reportLeaderboard({
      id: mp.playerId || `local_${profile.avatar.name}`,
      name: profile.avatar.name,
      rating: nextRating,
      wins: nextWins,
      weaponId: profile.avatar.weaponId,
      rankTitle: profile.avatar.title,
    });
  };

  const handleExitCombat = () => {
    if (selectedMode === 'pvp_online') {
      mp.leaveRoom();
    }
    setDestination('hub');
  };

  const handleWarpFromWorld = (nextArenaId: ArenaId) => {
    setSelectedArena(nextArenaId);
    setFavoriteArena(nextArenaId);
    setSelectedMode('unified_clash');
  };

  const handleCompleteIntro = (blessing: StarterBlessing) => {
    completeIntro(blessing);
    setShowStoryModal(false);
  };

  const handleToggleSystemTheme = () => {
    setSystemTheme(profile.systemTheme === 'royal_cyan' ? 'crimson_abyss' : 'royal_cyan');
  };

  return (
    <div
      data-system-theme={profile.systemTheme}
      className={`min-h-screen isekai-rune-bg text-[#F1F5F9] flex flex-col ${
        destination !== 'combat' ? 'pb-16 md:pb-0 landscape-phone-root' : ''
      }`}
    >
      {destination !== 'combat' && (
        <TopNav
          active={destination}
          profile={profile}
          systemTheme={profile.systemTheme}
          onToggleSystemTheme={handleToggleSystemTheme}
          onNavigate={setDestination}
          onQuickFight={() => handleStartCombat(selectedMode, selectedArena)}
        />
      )}

      {destination === 'hub' && (
        <BattleHub
          profile={profile}
          selectedArena={selectedArena}
          selectedMode={selectedMode}
          onlinePlayers={mp.onlinePlayers}
          onSelectArena={handleSelectArena}
          onSelectMode={setSelectedMode}
          onStartCombat={handleStartCombat}
          onNavigate={setDestination}
          onOpenStory={() => setShowStoryModal(true)}
          onChangeQuality={setQuality}
          onChangeCamera={setCameraView}
          onChangeDeviceMode={setDeviceMode}
          onToggleLandscape={setLandscapeLocked}
          onToggleSound={() => setSoundEnabled(!profile.soundEnabled)}
        />
      )}

      {destination === 'forge' && (
        <AvatarForge
          profile={profile}
          onSaveAvatar={(next) => updateAvatar(next, true)}
          onEquipTitle={equipTitle}
          onAllocateStat={allocateStat}
          onUnlockOrEquipPower={unlockOrEquipPower}
          onUnlockNextSkillSlot={unlockNextSkillSlot}
          onUpgradePower={upgradePower}
          onUnlockNetworkNode={unlockNetworkNode}
          onFusePowers={fusePowers}
          onStartCombat={() => handleStartCombat(selectedMode, selectedArena)}
        />
      )}

      {destination === 'armory' && (
        <ArmoryView
          profile={profile}
          onUnlockOrEquip={unlockOrEquipWeapon}
          onUpgradeWeapon={upgradeWeapon}
          onUnlockOrEquipGear={unlockOrEquipGear}
          onUnequipGear={unequipGearSlot}
          onBuyConsumable={buyConsumable}
          onBuyChest={buyChest}
        />
      )}

      {destination === 'rewards' && (
        <RewardsView
          profile={profile}
          onClaimQuest={claimQuest}
          onClaimChallenge={claimMapChallenge}
          onClaimDaily={claimDailyChallenge}
          onClaimAchievement={claimAchievement}
          onEquipTitle={equipTitle}
          onOpenChest={openChest}
          onBuyChest={buyChest}
          onAcceptNpcJob={acceptNpcJob}
          onCompleteNpcJob={completeNpcJob}
          onSellSingleResource={sellSingleResource}
          onSellAllResources={sellAllResourcesForMarks}
          onExchangeGuildMarks={exchangeGuildMarks}
        />
      )}

      {destination === 'pvp' && (
        <PvpCompetitionView
          profile={profile}
          connected={mp.connected}
          connectionMode={mp.connectionMode}
          customServerUrl={mp.customServerUrl}
          onSaveServerUrl={mp.setCustomServerUrl}
          onlinePlayers={mp.onlinePlayers}
          rooms={mp.rooms}
          activeRoom={mp.activeRoom}
          roomError={mp.roomError}
          leaderboard={mp.leaderboard}
          worldMessages={mp.worldMessages}
          roomMessages={mp.roomMessages}
          onRefreshRooms={mp.refreshRooms}
          onCreateOnlineRoom={handleCreateOnlineRoom}
          onJoinOnlineRoom={handleJoinOnlineRoom}
          onChallengeChampion={handleChallengeChampion}
          onStartLocalPvp={handleStartLocalPvp}
          onSendChat={mp.sendChatMessage}
        />
      )}

      {destination === 'combat' && (
        <ArenaCombatView
          profile={profile}
          mode={selectedMode}
          arenaId={selectedArena}
          rivalChampion={activeRival}
          localP2Avatar={localP2Avatar}
          onlineRoom={mp.activeRoom}
          onlineSelfId={mp.playerId}
          onlineFighters={mp.roomFighters}
          koAnnouncement={mp.koAnnouncement}
          systemTheme={profile.systemTheme}
          onToggleSystemTheme={handleToggleSystemTheme}
          chatConnected={mp.connected}
          chatMode={mp.connectionMode}
          worldMessages={mp.worldMessages}
          roomMessages={mp.roomMessages}
          onSendChat={mp.sendChatMessage}
          onOnlineStateSend={mp.sendPlayerState}
          onOnlineHitSend={mp.sendPlayerHit}
          onOnlineVfxSend={mp.sendPlayerVfx}
          onBindOnlineListeners={mp.setCombatListeners}
          onChangeQuality={setQuality}
          onChangeCamera={setCameraView}
          onChangeDeviceMode={setDeviceMode}
          onToggleLandscape={setLandscapeLocked}
          onConsumeItem={consumeBattleItem}
          onDiscoverRegion={(regionId, _name, gold, xp) =>
            recordRegionDiscovery(regionId, gold, xp)
          }
          onOpenWorldChest={(chest) =>
            recordWorldChestOpened(chest.id, chest.gold, chest.gems, chest.xp)
          }
          onGatherNode={(kind) => recordResourceGathered(kind)}
          onExploreChunk={(chunkKey) => recordChunkExplored(chunkKey)}
          onDefeatSecretBoss={recordSecretBossDefeated}
          onCompleteWorldEvent={recordWorldEventCompleted}
          onCritLanded={recordCritLanded}
          onFusionCast={recordFusionCast}
          onAcceptNpcJob={acceptNpcJob}
          onCompleteNpcJob={completeNpcJob}
          onSellSingleResource={sellSingleResource}
          onSellAllResources={sellAllResourcesForMarks}
          onExchangeGuildMarks={exchangeGuildMarks}
          onWarpFromWorld={handleWarpFromWorld}
          onToggleSound={() => setSoundEnabled(!profile.soundEnabled)}
          onMatchComplete={handleMatchComplete}
          onExit={handleExitCombat}
        />
      )}

      <StoryPrologueModal
        open={(!profile.hasSeenIntro || showStoryModal) && destination !== 'combat'}
        playerName={profile.avatar.name}
        hasSeenIntro={profile.hasSeenIntro}
        onCompleteIntro={handleCompleteIntro}
        onClose={() => setShowStoryModal(false)}
      />

      {destination !== 'combat' && (
        <footer className="mt-auto border-t border-[#E6B85C]/15 bg-[#0B101D]/65 py-5 px-4 sm:px-6 text-xs text-[#94A3B8]">
          <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3">
            <span>ميدان الأبطال — عالم إيثيريا المفتوح ببث القطاعات (14,000م · 100×) وساحات 3D</span>
            <span>
              {profile.deviceMode === 'mobile'
                ? 'وضع الهاتف نشط: عصا تحكم 360° + خانات مهارات 1–4 + الوضع الأفقي'
                : 'وضع الحاسوب: WASD حركة · Space هجوم · Q/R/Z/X مهارات · C ركض · M خريطة · G تفاعل · V كاميرا'}
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
