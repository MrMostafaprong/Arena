import { useEffect, useState } from "react";
import { RIVAL_CHAMPIONS, computeFighterDerivedStats } from "./data/gameCatalog";
import { usePlayerProgress } from "./hooks/usePlayerProgress";
import { useMultiplayerSocket } from "./hooks/useMultiplayerSocket";
import { TopNav } from "./components/TopNav";
import { BattleHub } from "./components/BattleHub";
import { AvatarForge } from "./components/AvatarForge";
import { ArmoryView } from "./components/ArmoryView";
import { RewardsView } from "./components/RewardsView";
import { PvpCompetitionView } from "./components/PvpCompetitionView";
import { ArenaCombatView } from "./components/ArenaCombatView";
import { StoryPrologueModal } from "./components/StoryPrologueModal";
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
    setFavoriteArena
  } = usePlayerProgress();
  const mp = useMultiplayerSocket();
  const [destination, setDestination] = useState("hub");
  const [selectedArena, setSelectedArena] = useState(profile.favoriteArena);
  const [selectedMode, setSelectedMode] = useState("unified_clash");
  const [activeRival, setActiveRival] = useState(RIVAL_CHAMPIONS[0]);
  const [localP2Avatar, setLocalP2Avatar] = useState(RIVAL_CHAMPIONS[1].avatar);
  const [showStoryModal, setShowStoryModal] = useState(false);
  useEffect(() => {
    if (mp.activeRoom && destination !== "combat") {
      setSelectedArena(mp.activeRoom.arenaId);
      setSelectedMode("pvp_online");
      setDestination("combat");
    }
  }, [mp.activeRoom, destination]);
  const handleSelectArena = (arenaId) => {
    setSelectedArena(arenaId);
    setFavoriteArena(arenaId);
  };
  const handleStartCombat = (mode, arenaId) => {
    setSelectedMode(mode);
    setSelectedArena(arenaId);
    if (mode === "pvp_ranked") {
      const sorted = [...RIVAL_CHAMPIONS].sort(
        (a, b) => Math.abs(a.rating - profile.rating) - Math.abs(b.rating - profile.rating)
      );
      setActiveRival(sorted[0]);
    }
    setDestination("combat");
  };
  const handleChallengeChampion = (champion, arenaId) => {
    setActiveRival(champion);
    setSelectedMode("pvp_ranked");
    setSelectedArena(arenaId);
    setDestination("combat");
  };
  const handleStartLocalPvp = (p2Champion, arenaId) => {
    setLocalP2Avatar(p2Champion.avatar);
    setSelectedMode("pvp_local");
    setSelectedArena(arenaId);
    setDestination("combat");
  };
  const handleCreateOnlineRoom = (roomName, arenaId) => {
    const lv = profile.weaponLevels[profile.avatar.weaponId] || 1;
    const derived = computeFighterDerivedStats(profile.avatar, lv, profile.equippedGear);
    mp.createRoom({
      roomName,
      arenaId,
      avatar: profile.avatar,
      maxHp: derived.maxHp,
      weaponLevel: lv
    });
  };
  const handleJoinOnlineRoom = (codeOrId) => {
    const lv = profile.weaponLevels[profile.avatar.weaponId] || 1;
    const derived = computeFighterDerivedStats(profile.avatar, lv, profile.equippedGear);
    mp.joinRoom({
      codeOrId,
      avatar: profile.avatar,
      maxHp: derived.maxHp,
      weaponLevel: lv
    });
  };
  const handleMatchComplete = (result) => {
    recordMatchResult(result);
    const nextRating = Math.max(800, profile.rating + result.ratingDelta);
    const nextWins = profile.wins + (result.victory ? 1 : 0);
    mp.reportLeaderboard({
      id: mp.playerId || `local_${profile.avatar.name}`,
      name: profile.avatar.name,
      rating: nextRating,
      wins: nextWins,
      weaponId: profile.avatar.weaponId,
      rankTitle: profile.avatar.title
    });
  };
  const handleExitCombat = () => {
    if (selectedMode === "pvp_online") {
      mp.leaveRoom();
    }
    setDestination("hub");
  };
  const handleWarpFromWorld = (nextArenaId) => {
    setSelectedArena(nextArenaId);
    setFavoriteArena(nextArenaId);
    setSelectedMode("unified_clash");
  };
  const handleCompleteIntro = (blessing) => {
    completeIntro(blessing);
    setShowStoryModal(false);
  };
  const handleToggleSystemTheme = () => {
    setSystemTheme(profile.systemTheme === "royal_cyan" ? "crimson_abyss" : "royal_cyan");
  };
  return <div
    data-system-theme={profile.systemTheme}
    className={`min-h-screen isekai-rune-bg text-[#F1F5F9] flex flex-col ${destination !== "combat" ? "pb-16 md:pb-0 landscape-phone-root" : ""}`}
  >
      {destination !== "combat" && <TopNav
    active={destination}
    profile={profile}
    systemTheme={profile.systemTheme}
    onToggleSystemTheme={handleToggleSystemTheme}
    onNavigate={setDestination}
    onQuickFight={() => handleStartCombat(selectedMode, selectedArena)}
  />}

      {destination === "hub" && <BattleHub
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
  />}

      {destination === "forge" && <AvatarForge
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
  />}

      {destination === "armory" && <ArmoryView
    profile={profile}
    onUnlockOrEquip={unlockOrEquipWeapon}
    onUpgradeWeapon={upgradeWeapon}
    onUnlockOrEquipGear={unlockOrEquipGear}
    onUnequipGear={unequipGearSlot}
    onBuyConsumable={buyConsumable}
    onBuyChest={buyChest}
  />}

      {destination === "rewards" && <RewardsView
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
  />}

      {destination === "pvp" && <PvpCompetitionView
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
  />}

      {destination === "combat" && <ArenaCombatView
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
    onDiscoverRegion={(regionId, _name, gold, xp) => recordRegionDiscovery(regionId, gold, xp)}
    onOpenWorldChest={(chest) => recordWorldChestOpened(chest.id, chest.gold, chest.gems, chest.xp)}
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
  />}

      <StoryPrologueModal
    open={(!profile.hasSeenIntro || showStoryModal) && destination !== "combat"}
    playerName={profile.avatar.name}
    hasSeenIntro={profile.hasSeenIntro}
    onCompleteIntro={handleCompleteIntro}
    onClose={() => setShowStoryModal(false)}
  />

      {destination !== "combat" && <footer className="mt-auto border-t border-[#E6B85C]/15 bg-[#0B101D]/65 py-5 px-4 sm:px-6 text-xs text-[#94A3B8]">
          <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3">
            <span>ميدان الأبطال — عالم إيثيريا المفتوح ببث القطاعات (14,000م · 100×) وساحات 3D</span>
            <span>
              {profile.deviceMode === "mobile" ? "\u0648\u0636\u0639 \u0627\u0644\u0647\u0627\u062A\u0641 \u0646\u0634\u0637: \u0639\u0635\u0627 \u062A\u062D\u0643\u0645 360\xB0 + \u062E\u0627\u0646\u0627\u062A \u0645\u0647\u0627\u0631\u0627\u062A 1\u20134 + \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0623\u0641\u0642\u064A" : "\u0648\u0636\u0639 \u0627\u0644\u062D\u0627\u0633\u0648\u0628: WASD \u062D\u0631\u0643\u0629 \xB7 Space \u0647\u062C\u0648\u0645 \xB7 Q/R/Z/X \u0645\u0647\u0627\u0631\u0627\u062A \xB7 C \u0631\u0643\u0636 \xB7 M \u062E\u0631\u064A\u0637\u0629 \xB7 G \u062A\u0641\u0627\u0639\u0644 \xB7 V \u0643\u0627\u0645\u064A\u0631\u0627"}
            </span>
          </div>
        </footer>}
    </div>;
}
export default App;
