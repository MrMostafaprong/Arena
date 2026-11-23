import {
  ARENAS,
  CONSUMABLES,
  MONSTERS,
  OVERWORLD_MAP,
  POWERS,
  RIVAL_CHAMPIONS,
  SECRET_WORLD_BOSSES,
  WEAPONS,
  WORLD_EVENT_ZONES,
  computeFighterDerivedStats,
  computeSkillNetworkBonuses
} from "../data/gameCatalog";
import { audioSynth } from "./audioSynth";
import { CHUNK_SIZE, ChunkWorldStreamer, classifyChunkBiome } from "./worldStreamer";
export class CombatSimulation {
  arena;
  mode;
  quality;
  cameraView;
  paused = false;
  finished = false;
  fighters = [];
  monsters = [];
  projectiles = [];
  rings = [];
  slashes = [];
  lightnings = [];
  dashTrails = [];
  pickups = [];
  particles = [];
  floatingTexts = [];
  pendingMeteors = [];
  camera;
  camYaw = 0;
  shakeTimer = 0;
  shakeIntensity = 0;
  hitstopTimer = 0;
  time = 0;
  wave = 1;
  waveDelayTimer = 0;
  hazardTimer = 5.5;
  pickupTimer = 7;
  kills = 0;
  bossKills = 0;
  monsterKillsByType = {};
  combo = 0;
  maxCombo = 0;
  comboTimer = 0;
  damageDealt = 0;
  scoreP1 = 0;
  scoreP2 = 0;
  bannerText = "";
  bannerTimer = 0;
  onlineSendTimer = 0;
  missionIndex = 0;
  missionProgress = 0;
  missionsDone = 0;
  bonusMissionGold = 0;
  localConsumables;
  keys = /* @__PURE__ */ new Set();
  virtualInput = { mx: 0, mz: 0 };
  shrineCooldowns = {};
  fpsSamples = 60;
  idCounter = 1;
  opts;
  rivalChampion;
  discoveredRegions = /* @__PURE__ */ new Set(["haven_village"]);
  discoveredWaystones = /* @__PURE__ */ new Set(["ws_haven"]);
  openedChests = /* @__PURE__ */ new Set();
  nodeRespawns = {};
  sprintActive = false;
  bufferedAction = null;
  currentRegionName = "\u0642\u0631\u064A\u0629 \u0627\u0644\u0645\u0644\u0627\u0630 \u0627\u0644\u0622\u0645\u0646\u0629";
  npcDialogue = null;
  npcDialogueTimer = 0;
  npcLineIdx = 0;
  overworldRespawnTimer = 0;
  unlockedSkillSlots = 1;
  powerLevels = {};
  unlockedNetworkNodes = ["node_core_awakening"];
  chunkStreamer = null;
  streamedProps = [];
  streamedNodes = [];
  streamedChests = [];
  streamedWaystones = [];
  currentChunkKey = "0,0";
  activeChunksCount = 9;
  currentBiomeColor = "#22C55E";
  currentBiomeSkyTint = "#18365C";
  critsLanded = 0;
  fusionCasts = 0;
  secretBossesDefeatedCount = 0;
  worldEventsCompletedCount = 0;
  defeatedSecretBossIds = /* @__PURE__ */ new Set();
  completedWorldEventIds = /* @__PURE__ */ new Set();
  activeEventZone = null;
  nearbyInteractable = null;
  constructor(opts) {
    this.opts = opts;
    this.mode = opts.mode;
    this.arena = opts.mode === "world_explore" ? OVERWORLD_MAP : ARENAS[opts.arenaId];
    this.quality = opts.quality;
    this.cameraView = opts.cameraView;
    this.rivalChampion = opts.rivalChampion || RIVAL_CHAMPIONS[0];
    this.unlockedSkillSlots = opts.unlockedSkillSlots ?? 1;
    this.powerLevels = opts.powerLevels || {};
    this.unlockedNetworkNodes = opts.unlockedNetworkNodes || ["node_core_awakening"];
    if (opts.initialDiscoveredRegions) {
      opts.initialDiscoveredRegions.forEach((id) => this.discoveredRegions.add(id));
    }
    if (opts.initialOpenedChests) {
      opts.initialOpenedChests.forEach((id) => this.openedChests.add(id));
    }
    if (opts.initialDefeatedSecretBossIds) {
      opts.initialDefeatedSecretBossIds.forEach((id) => this.defeatedSecretBossIds.add(id));
    }
    if (opts.initialCompletedWorldEventIds) {
      opts.initialCompletedWorldEventIds.forEach((id) => this.completedWorldEventIds.add(id));
    }
    this.localConsumables = {
      elixir_heal: opts.consumables?.elixir_heal ?? 2,
      scroll_energy: opts.consumables?.scroll_energy ?? 1,
      tonic_fury: opts.consumables?.tonic_fury ?? 1
    };
    if (this.mode === "world_explore") {
      this.chunkStreamer = new ChunkWorldStreamer(OVERWORLD_MAP, opts.initialExploredChunks || ["0,0"]);
    }
    this.camera = {
      pos: { x: 0, y: 10, z: 14 },
      target: { x: 0, y: 1.5, z: 0 },
      fov: 48,
      near: 0.45
    };
    this.initEntities();
  }
  nextId(prefix) {
    return `${prefix}_${this.idCounter++}`;
  }
  getTerrainHeight(x, z) {
    let h = 0;
    for (const plat of this.arena.platforms) {
      if (Math.hypot(x - plat.x, z - plat.z) <= plat.radius) {
        if (plat.height > h) h = plat.height;
      }
    }
    return h;
  }
  createFighter(id, avatar, x, z, yaw, team, weaponLevel, isAi, aiDifficulty = 0.7, isRemote = false, equippedGear) {
    const derived = computeFighterDerivedStats(avatar, weaponLevel, equippedGear);
    const netBonus = team === "player1" ? computeSkillNetworkBonuses(this.unlockedNetworkNodes) : null;
    const bonusMaxEnergy = derived.maxEnergy + (netBonus ? netBonus.bonusEnergy : 0);
    const groundY = this.getTerrainHeight(x, z);
    return {
      id,
      name: avatar.name,
      avatar,
      x,
      y: groundY,
      z,
      vx: 0,
      vy: 0,
      vz: 0,
      yaw,
      hp: derived.maxHp,
      maxHp: derived.maxHp,
      energy: bonusMaxEnergy,
      maxEnergy: bonusMaxEnergy,
      animState: "idle",
      animTime: 0,
      walkPhase: 0,
      comboStep: 0,
      hitFlash: 0,
      shieldActive: false,
      overdriveActive: false,
      frozenTimer: 0,
      team,
      attackCooldown: 0,
      heavyCooldown: 0,
      powerCooldown: 0,
      secondaryCooldown: 0,
      slotCooldowns: [0, 0, 0, 0],
      dodgeCooldown: 0,
      dodgeTimer: 0,
      invulnTimer: 0,
      shieldTimer: 0,
      overdriveTimer: 0,
      stunTimer: 0,
      magmaTickTimer: 0,
      onHighGround: groundY > 0.2,
      terrainNote: "",
      isAi,
      aiDifficulty,
      aiDecisionTimer: 0.4,
      aiStrafeDir: 1,
      weaponLevel,
      statsDerived: derived,
      isRemote
    };
  }
  initEntities() {
    const selfId = this.opts.onlineSelfId || "p1";
    const startX = this.mode === "pvp_ranked" || this.mode === "pvp_local" ? -6.8 : 0;
    const startZ = this.mode === "pvp_ranked" || this.mode === "pvp_local" ? 0 : this.mode === "world_explore" ? 8.2 : 6.2;
    const startYaw = this.mode === "pvp_ranked" || this.mode === "pvp_local" ? Math.PI / 2 : Math.PI;
    const p1 = this.createFighter(
      selfId,
      this.opts.playerAvatar,
      startX,
      startZ,
      startYaw,
      "player1",
      this.opts.playerWeaponLevel,
      false,
      0,
      false,
      this.opts.equippedGear
    );
    this.fighters.push(p1);
    if (this.mode === "world_explore") {
      this.updateOverworldStreaming(p1.x, p1.z, true);
      this.showBanner("\u0642\u0627\u0631\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627 (14,000\u0645 \xB7 \u0628\u062B \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0646\u0634\u0637) \u2014 \u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0648\u0627\u062C\u0645\u0639 \u0627\u0644\u0645\u0648\u0627\u0631\u062F!", 3.2);
    } else if (this.mode === "pvp_ranked") {
      const rival = this.createFighter(
        "rival_champ",
        this.rivalChampion.avatar,
        6.8,
        0,
        -Math.PI / 2,
        "enemy",
        Math.max(1, Math.min(4, Math.floor(this.rivalChampion.rating / 450))),
        true,
        this.rivalChampion.aiDifficulty
      );
      this.fighters.push(rival);
      this.showBanner(`\u0646\u0632\u0627\u0644 \u0645\u0635\u0646\u0641: \u0636\u062F ${this.rivalChampion.name}`, 2.6);
    } else if (this.mode === "pvp_local") {
      const p2Avatar = this.opts.localP2Avatar || RIVAL_CHAMPIONS[1].avatar;
      const p2 = this.createFighter("p2", p2Avatar, 6.8, 0, -Math.PI / 2, "player2", 2, false);
      this.fighters.push(p2);
      this.showBanner("\u0645\u0628\u0627\u0631\u0632\u0629 \u0645\u062D\u0644\u064A\u0629 1 \u0636\u062F 1 \u2014 \u0627\u0644\u062C\u0648\u0644\u0629 1", 2.6);
    } else if (this.mode === "pvp_online") {
      this.showBanner("\u0633\u0627\u062D\u0629 \u0627\u0644\u062A\u0646\u0627\u0641\u0633 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0623\u0648\u0646\u0644\u0627\u064A\u0646", 2.4);
    } else if (this.mode === "monster_raid") {
      this.spawnWave(1);
      this.showBanner("\u063A\u0627\u0631\u0629 \u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u0648\u062D\u0648\u0634 \u2014 \u0627\u0644\u0645\u0648\u062C\u0629 1 \u0645\u0646 6", 2.4);
    } else if (this.mode === "unified_clash") {
      this.spawnWave(1);
      this.showBanner("\u0627\u0644\u0645\u064A\u062F\u0627\u0646 \u0627\u0644\u0645\u0648\u062D\u062F: \u0648\u062D\u0648\u0634 + \u0623\u0628\u0637\u0627\u0644 + \u0645\u0647\u0627\u0645 \u0627\u0644\u062E\u0631\u064A\u0637\u0629!", 2.6);
    } else {
      this.spawnWave(1);
      this.showBanner("\u0642\u062A\u0627\u0644 \u062D\u0631 \u2014 \u0627\u0628\u062F\u0623 \u0627\u0644\u0633\u064A\u0637\u0631\u0629 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u062D\u0629!", 2.4);
    }
    const ambCount = this.quality === "eco" ? 6 : this.quality === "balanced" ? 16 : this.quality === "high" ? 24 : 32;
    for (let i = 0; i < ambCount; i++) {
      this.spawnAmbientMote();
    }
  }
  updateOverworldStreaming(px, pz, initial = false) {
    if (!this.chunkStreamer) return;
    const res = this.chunkStreamer.update(px, pz, this.quality);
    if (!res.changed && !initial) return;
    this.currentChunkKey = res.currentChunkKey;
    this.activeChunksCount = res.activeChunksCount;
    this.currentBiomeColor = res.currentBiomeColor;
    const biomeSpec = classifyChunkBiome(res.currentChunkCoord.cx, res.currentChunkCoord.cz);
    this.currentBiomeSkyTint = biomeSpec.skyTint;
    this.streamedProps = res.activeProps;
    this.streamedNodes = res.activeNodes;
    this.streamedChests = res.activeChests;
    this.streamedWaystones = res.activeWaystones;
    for (const nk of res.newlyEnteredKeys) {
      this.opts.onExploreChunk?.(nk);
      if (!initial && nk !== "0,0") {
        this.spawnFloatingText(px, 2.8, pz, `\u0645\u0642\u0637\u0639 \u062C\u062F\u064A\u062F [${nk}] +20 \u0630\u0647\u0628`, "#38BDF8", 1.08);
      }
    }
    const maxMonsterDist = CHUNK_SIZE * (res.streamRadiusChunks + 1.5);
    this.monsters = this.monsters.filter(
      (m) => Boolean(m.secretBossId) || Boolean(m.eventZoneId) || Math.hypot(m.x - px, m.z - pz) <= maxMonsterDist
    );
    for (const spot of res.pendingPatrols) {
      if (this.monsters.length >= 22) break;
      this.spawnSingleOverworldMonster(spot.archetype, spot.x, spot.z);
    }
  }
  spawnSingleOverworldMonster(archetype, x, z) {
    if (Math.hypot(x, z) < 22) return;
    const def = MONSTERS[archetype] || MONSTERS.ash_stalker;
    this.monsters.push({
      id: this.nextId("wmon"),
      archetype,
      name: def.name,
      x,
      y: this.getTerrainHeight(x, z),
      z,
      vx: 0,
      vy: 0,
      vz: 0,
      yaw: Math.random() * Math.PI * 2,
      hp: def.maxHp,
      maxHp: def.maxHp,
      walkPhase: Math.random() * 5,
      attackTimer: 0,
      attackCooldown: 1 + Math.random() * 0.8,
      telegraphTimer: 0,
      telegraphMax: 0.75,
      telegraphRadius: def.isBoss ? 4.8 : 2.9,
      pendingStrike: false,
      hitFlash: 0,
      frozenTimer: 0,
      stunTimer: 0,
      isBoss: def.isBoss,
      flankSlot: this.idCounter % 5,
      enraged: false
    });
  }
  spawnOverworldBiomesMonsters(targetCount) {
    const p1 = this.getPlayer1();
    const px = p1 ? p1.x : 0;
    const pz = p1 ? p1.z : 0;
    const coord = { cx: Math.round(px / CHUNK_SIZE), cz: Math.round(pz / CHUNK_SIZE) };
    const biome = classifyChunkBiome(coord.cx, coord.cz);
    if (!biome.monsters || biome.monsters.length === 0) return;
    let attempts = 0;
    while (this.monsters.length < Math.min(20, targetCount) && attempts < 14) {
      attempts++;
      const ang = Math.random() * Math.PI * 2;
      const dist = 28 + Math.random() * 75;
      const mx = px + Math.cos(ang) * dist;
      const mz = pz + Math.sin(ang) * dist;
      if (Math.hypot(mx, mz) < 26 || Math.hypot(mx, mz) > this.arena.radius - 12) continue;
      const arch = biome.monsters[Math.floor(Math.random() * biome.monsters.length)];
      this.spawnSingleOverworldMonster(arch, mx, mz);
    }
  }
  showBanner(text, duration = 2.2) {
    this.bannerText = text;
    this.bannerTimer = duration;
  }
  setKey(code, down) {
    if (down) {
      this.keys.add(code);
      this.handleInstantKeyPress(code);
    } else {
      this.keys.delete(code);
    }
  }
  setVirtualMove(mx, mz) {
    this.virtualInput.mx = mx;
    this.virtualInput.mz = mz;
  }
  rotateCameraYaw(delta) {
    this.camYaw += delta;
  }
  syncOnlineFighters(remoteSnapshots) {
    if (this.mode !== "pvp_online") return;
    const selfId = this.opts.onlineSelfId;
    const seen = /* @__PURE__ */ new Set();
    for (const snap of remoteSnapshots) {
      if (snap.id === selfId) {
        const self = this.getPlayer1();
        if (self) {
          self.hp = snap.hp;
          self.maxHp = snap.maxHp;
          this.scoreP1 = snap.kills;
        }
        continue;
      }
      seen.add(snap.id);
      const existing = this.fighters.find((f) => f.id === snap.id);
      if (existing) {
        existing.x += (snap.x - existing.x) * 0.45;
        existing.z += (snap.z - existing.z) * 0.45;
        existing.y = this.getTerrainHeight(existing.x, existing.z);
        existing.yaw = snap.yaw;
        existing.hp = snap.hp;
        existing.maxHp = snap.maxHp;
        existing.animState = snap.animState;
        existing.animTime = snap.animTimer;
        existing.comboStep = snap.comboStep;
        existing.shieldActive = snap.shieldActive;
        existing.overdriveActive = snap.overdriveActive;
      } else {
        const rf = this.createFighter(
          snap.id,
          snap.avatar,
          snap.x,
          snap.z,
          snap.yaw,
          "enemy",
          snap.weaponLevel,
          false,
          0,
          true
        );
        rf.hp = snap.hp;
        rf.maxHp = snap.maxHp;
        this.fighters.push(rf);
        this.showBanner(`\u0627\u0646\u0636\u0645 \u0627\u0644\u0645\u0642\u0627\u062A\u0644 ${snap.name} \u0625\u0644\u0649 \u0627\u0644\u0633\u0627\u062D\u0629!`, 2.2);
      }
    }
    this.fighters = this.fighters.filter((f) => !f.isRemote || seen.has(f.id));
  }
  applyOnlineDamageEvent(ev) {
    const target = this.fighters.find((f) => f.id === ev.targetId);
    if (!target) return;
    target.hp = ev.hp;
    target.hitFlash = 1;
    target.vx += ev.knockX;
    target.vz += ev.knockZ;
    this.spawnFloatingText(
      target.x,
      target.y + 2.2,
      target.z,
      ev.critical ? `\u062D\u0627\u0633\u0645\u0629 -${ev.damage}!` : `-${ev.damage}`,
      ev.critical ? "#FDE047" : "#F87171",
      ev.critical ? 1.25 : 1
    );
    this.spawnBurst(target.x, target.y + 1.2, target.z, ev.critical ? "#F59E0B" : "#EF4444", 8);
    audioSynth.playHit(ev.critical);
    if (ev.targetId === this.getPlayer1()?.id) {
      this.addCameraShake(0.2, 0.3);
    }
  }
  applyOnlineVfx(ev) {
    this.rings.push({
      x: ev.x,
      y: this.getTerrainHeight(ev.x, ev.z) + 0.08,
      z: ev.z,
      radius: 0.6,
      maxRadius: ev.radius,
      color: ev.color,
      alpha: 0.9,
      life: 0.45,
      maxLife: 0.45,
      growSpeed: ev.radius * 2.1
    });
    this.spawnBurst(ev.x, 1, ev.z, ev.color, 10);
  }
  getPlayer1() {
    return this.fighters.find((f) => f.team === "player1");
  }
  getPlayer2() {
    return this.fighters.find((f) => f.team === "player2");
  }
  toggleSprint() {
    if (this.mode !== "world_explore") return;
    this.sprintActive = !this.sprintActive;
    this.showBanner(this.sprintActive ? "\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0631\u0643\u0636 \u0627\u0644\u0633\u0631\u064A\u0639 (+75% \u0633\u0631\u0639\u0629)" : "\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0634\u064A \u0627\u0644\u0639\u0627\u062F\u064A", 1.4);
  }
  teleportPlayer(x, z, label) {
    const p1 = this.getPlayer1();
    if (!p1 || this.mode !== "world_explore") return;
    p1.x = x;
    p1.z = z;
    p1.y = this.getTerrainHeight(x, z);
    p1.vx = 0;
    p1.vz = 0;
    p1.invulnTimer = 1.5;
    audioSynth.playPower();
    this.spawnBurst(x, p1.y + 1.2, z, "#38BDF8", 18);
    this.rings.push({
      x,
      y: p1.y + 0.1,
      z,
      radius: 0.5,
      maxRadius: 4.5,
      color: "#38BDF8",
      alpha: 0.95,
      life: 0.48,
      maxLife: 0.48,
      growSpeed: 9
    });
    this.showBanner(`\u0627\u0646\u062A\u0642\u0627\u0644 \u0633\u0631\u064A\u0639 \u0625\u0644\u0649: ${label}`, 2.4);
  }
  queueOrRunPlayerAction(kind) {
    const p1 = this.getPlayer1();
    if (!p1 || p1.hp <= 0) return;
    const ran = this.executeBufferedKind(p1, kind);
    if (!ran) {
      this.bufferedAction = { kind, expiresAt: this.time + 0.16 };
    } else {
      this.bufferedAction = null;
    }
  }
  executeBufferedKind(fighter, kind) {
    if (kind === "attack") return this.triggerPrimaryAttack(fighter);
    if (kind === "heavy") return this.triggerHeavySkill(fighter);
    if (kind === "skill0") return this.triggerSkillSlot(fighter, 0);
    if (kind === "skill1") return this.triggerSkillSlot(fighter, 1);
    if (kind === "skill2") return this.triggerSkillSlot(fighter, 2);
    if (kind === "skill3") return this.triggerSkillSlot(fighter, 3);
    if (kind === "dodge") return this.triggerDodge(fighter);
    return false;
  }
  handleInstantKeyPress(code) {
    if (this.paused || this.finished) return;
    const p1 = this.getPlayer1();
    if (p1 && p1.hp > 0) {
      if (code === "Space" || code === "KeyJ") this.queueOrRunPlayerAction("attack");
      else if (code === "KeyE") this.queueOrRunPlayerAction("heavy");
      else if (code === "KeyQ") this.queueOrRunPlayerAction("skill0");
      else if (code === "KeyR") this.queueOrRunPlayerAction("skill1");
      else if (code === "KeyZ") this.queueOrRunPlayerAction("skill2");
      else if (code === "KeyX") this.queueOrRunPlayerAction("skill3");
      else if (code === "KeyC") this.toggleSprint();
      else if (code === "ShiftLeft" || code === "ShiftRight") this.queueOrRunPlayerAction("dodge");
      else if (code === "KeyG") this.triggerInteract();
      else if (code === "Digit1") this.triggerConsumable("elixir_heal");
      else if (code === "Digit2") this.triggerConsumable("scroll_energy");
      else if (code === "Digit3") this.triggerConsumable("tonic_fury");
    }
    if (this.mode === "pvp_local") {
      const p2 = this.getPlayer2();
      if (p2 && p2.hp > 0) {
        if (code === "KeyK") this.triggerPrimaryAttack(p2);
        else if (code === "KeyL") this.triggerHeavySkill(p2);
        else if (code === "KeyO") this.triggerSkillSlot(p2, 0);
        else if (code === "KeyP") this.triggerDodge(p2);
      }
    }
  }
  triggerPlayer1Action(action) {
    if (this.paused || this.finished) return;
    const p1 = this.getPlayer1();
    if (!p1 || p1.hp <= 0) return;
    if (action === "attack") this.queueOrRunPlayerAction("attack");
    else if (action === "heavy") this.queueOrRunPlayerAction("heavy");
    else if (action === "power" || action === "skill0") this.queueOrRunPlayerAction("skill0");
    else if (action === "secondary" || action === "skill1") this.queueOrRunPlayerAction("skill1");
    else if (action === "skill2") this.queueOrRunPlayerAction("skill2");
    else if (action === "skill3") this.queueOrRunPlayerAction("skill3");
    else if (action === "dodge") this.queueOrRunPlayerAction("dodge");
    else if (action === "interact") this.triggerInteract();
    else if (action === "sprint") this.toggleSprint();
    else if (action === "block_start") this.keys.add("KeyF");
    else if (action === "block_end") this.keys.delete("KeyF");
  }
  triggerInteract() {
    if (this.mode !== "world_explore" || !this.nearbyInteractable) return;
    const p1 = this.getPlayer1();
    if (!p1) return;
    const target = this.nearbyInteractable;
    if (target.kind === "chest") {
      const chestList = this.mode === "world_explore" ? this.streamedChests : this.arena.worldChests || [];
      const chest = chestList.find((c) => c.id === target.targetId);
      if (!chest || this.openedChests.has(chest.id)) return;
      this.openedChests.add(chest.id);
      this.bonusMissionGold += chest.gold;
      this.opts.onOpenWorldChest?.(chest);
      audioSynth.playReward();
      this.spawnBurst(chest.x, this.getTerrainHeight(chest.x, chest.z) + 1, chest.z, "#E6B85C", 18);
      this.rings.push({
        x: chest.x,
        y: this.getTerrainHeight(chest.x, chest.z) + 0.12,
        z: chest.z,
        radius: 0.4,
        maxRadius: 3.6,
        color: "#E6B85C",
        alpha: 0.95,
        life: 0.48,
        maxLife: 0.48,
        growSpeed: 8
      });
      this.spawnFloatingText(
        chest.x,
        this.getTerrainHeight(chest.x, chest.z) + 2.5,
        chest.z,
        `+${chest.gold} \u0630\u0647\u0628 \u0648 +${chest.gems} \u062C\u0648\u0627\u0647\u0631`,
        "#FDE047",
        1.25
      );
      const chestLabel = chest.tier === "mythic" ? "\u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A" : "\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0643\u0646\u0632";
      this.showBanner(`\u0641\u062A\u062D\u062A ${chestLabel}! (+${chest.gold} \u0630\u0647\u0628\u060C +${chest.gems} \u062C\u0648\u0627\u0647\u0631\u060C +${chest.xp} \u062E\u0628\u0631\u0629)`, 2.8);
    } else if (target.kind === "node") {
      const nodeList = this.mode === "world_explore" ? this.streamedNodes : this.arena.worldNodes || [];
      const node = nodeList.find((n) => n.id === target.targetId);
      if (!node || (this.nodeRespawns[node.id] || 0) > 0) return;
      this.nodeRespawns[node.id] = 18;
      this.opts.onGatherNode?.(node.kind, node.label);
      audioSynth.playReward();
      this.spawnBurst(node.x, 1, node.z, "#34D399", 14);
      this.spawnFloatingText(node.x, 2.2, node.z, `+1 ${node.label}`, "#34D399", 1.15);
      this.showBanner(`\u062C\u0645\u0639\u062A: ${node.label} (\u0623\u064F\u0636\u064A\u0641 \u0625\u0644\u0649 \u062D\u0642\u064A\u0628\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0648\u0639\u0642\u0648\u062F \u0627\u0644\u0646\u0642\u0627\u0628\u0629)`, 2.4);
    } else if (target.kind === "npc") {
      const npc = this.arena.worldNpcs?.find((n) => n.id === target.targetId);
      if (!npc) return;
      const line = npc.lines[this.npcLineIdx % npc.lines.length];
      this.npcLineIdx += 1;
      this.npcDialogue = `${npc.name}: \xAB${line}\xBB`;
      this.npcDialogueTimer = 6;
      const heal = Math.round(p1.maxHp * 0.25);
      p1.hp = Math.min(p1.maxHp, p1.hp + heal);
      p1.energy = p1.maxEnergy;
      audioSynth.playReward();
      this.spawnFloatingText(p1.x, p1.y + 2.4, p1.z, `\u0628\u0631\u0643\u0629 ${npc.name} (+\u0635\u062D\u0629 \u0648\u0637\u0627\u0642\u0629)`, "#38BDF8", 1.12);
      this.opts.onOpenNpcWork?.(npc.id);
    } else if (target.kind === "portal" && target.arenaId) {
      audioSynth.playPower();
      this.opts.onWarpPortal?.(target.arenaId);
    } else if (target.kind === "secret_boss") {
      const sb = SECRET_WORLD_BOSSES.find((b) => b.id === target.targetId);
      if (!sb || this.defeatedSecretBossIds.has(sb.id)) return;
      if (this.monsters.some((m) => m.secretBossId === sb.id && m.hp > 0)) return;
      const def = MONSTERS[sb.archetype] || MONSTERS.magma_boss;
      const bossHp = Math.round(def.maxHp * sb.hpMult);
      const sx = sb.x + 5.5;
      const sz = sb.z + 5.5;
      this.monsters.push({
        id: this.nextId("sboss"),
        archetype: sb.archetype,
        name: sb.name,
        x: sx,
        y: this.getTerrainHeight(sx, sz),
        z: sz,
        vx: 0,
        vy: 0,
        vz: 0,
        yaw: Math.atan2(p1.x - sx, p1.z - sz),
        hp: bossHp,
        maxHp: bossHp,
        walkPhase: 0,
        attackTimer: 0,
        attackCooldown: 1.1,
        telegraphTimer: 0,
        telegraphMax: 0.72,
        telegraphRadius: 5.2,
        pendingStrike: false,
        hitFlash: 0,
        frozenTimer: 0,
        stunTimer: 0,
        isBoss: true,
        flankSlot: 0,
        enraged: false,
        secretBossId: sb.id,
        dmgMult: sb.dmgMult
      });
      audioSynth.playWorldEventHorn();
      this.addCameraShake(0.32, 0.42);
      this.rings.push({
        x: sx,
        y: 0.14,
        z: sz,
        radius: 0.8,
        maxRadius: 9.5,
        color: sb.accentColor,
        alpha: 0.98,
        life: 0.65,
        maxLife: 0.65,
        growSpeed: 14,
        isFusion: true,
        secondaryColor: "#FEF08A"
      });
      this.spawnBurst(sx, 1.8, sz, sb.accentColor, 26);
      this.showBanner(`\u0638\u0647\u0631 \u0627\u0644\u0632\u0639\u064A\u0645 \u0627\u0644\u0633\u0631\u064A: ${sb.name} (${sb.title})!`, 3.6);
    } else if (target.kind === "event_zone") {
      const evt = WORLD_EVENT_ZONES.find((z) => z.id === target.targetId);
      if (!evt || this.completedWorldEventIds.has(evt.id) || this.activeEventZone) return;
      this.activeEventZone = { def: evt, wave: 1, waveCount: evt.waveCount };
      this.spawnWorldEventWave(evt, 1);
      audioSynth.playWorldEventHorn();
      this.addCameraShake(0.24, 0.34);
      this.rings.push({
        x: evt.x,
        y: 0.14,
        z: evt.z,
        radius: 1,
        maxRadius: evt.radius,
        color: evt.color,
        alpha: 0.94,
        life: 0.65,
        maxLife: 0.65,
        growSpeed: 22,
        isFusion: true,
        secondaryColor: "#FFFFFF"
      });
      this.showBanner(`\u0628\u062F\u0623 \u062D\u062F\u062B \u0627\u0644\u0642\u0627\u0631\u0629: ${evt.name} \u2014 \u0627\u0644\u0645\u0648\u062C\u0629 1 \u0645\u0646 ${evt.waveCount}!`, 3.4);
    }
  }
  spawnWorldEventWave(evt, wave) {
    const pool = evt.kind === "ether_storm" ? ["frost_specter", "wraith_knight", "ash_stalker"] : evt.kind === "meteor_rift" ? ["ember_imp", "obsidian_golem", "ash_stalker"] : ["wraith_knight", "venom_crawler", "obsidian_golem"];
    const count = 3 + wave;
    for (let i = 0; i < count; i++) {
      const ang = i / count * Math.PI * 2 + wave * 0.6;
      const mx = evt.x + Math.cos(ang) * 9.5;
      const mz = evt.z + Math.sin(ang) * 9.5;
      const arch = pool[(i + wave) % pool.length];
      const def = MONSTERS[arch] || MONSTERS.ash_stalker;
      const hp = Math.round(def.maxHp * (1 + wave * 0.22));
      this.monsters.push({
        id: this.nextId("evmon"),
        archetype: arch,
        name: `${def.name} (\u062D\u062F\u062B)`,
        x: mx,
        y: this.getTerrainHeight(mx, mz),
        z: mz,
        vx: 0,
        vy: 0,
        vz: 0,
        yaw: Math.random() * Math.PI * 2,
        hp,
        maxHp: hp,
        walkPhase: Math.random() * 5,
        attackTimer: 0,
        attackCooldown: 0.9 + Math.random() * 0.6,
        telegraphTimer: 0,
        telegraphMax: 0.72,
        telegraphRadius: def.isBoss ? 4.8 : 2.9,
        pendingStrike: false,
        hitFlash: 0,
        frozenTimer: 0,
        stunTimer: 0,
        isBoss: def.isBoss,
        flankSlot: i % 5,
        enraged: false,
        eventZoneId: evt.id
      });
    }
  }
  triggerConsumable(id) {
    if (this.paused || this.finished) return false;
    const p1 = this.getPlayer1();
    if (!p1 || p1.hp <= 0) return false;
    if ((this.localConsumables[id] || 0) <= 0) return false;
    if (this.opts.onConsumeItem && !this.opts.onConsumeItem(id)) {
      return false;
    }
    this.localConsumables[id] = Math.max(0, (this.localConsumables[id] || 0) - 1);
    const def = CONSUMABLES[id];
    if (id === "elixir_heal") {
      const amt = Math.round(p1.maxHp * 0.4);
      p1.hp = Math.min(p1.maxHp, p1.hp + amt);
      this.spawnFloatingText(p1.x, p1.y + 2.5, p1.z, `+${amt} \u0634\u0641\u0627\u0621 \u0645\u0644\u0643\u064A`, def.color, 1.2);
      audioSynth.playReward();
    } else if (id === "scroll_energy") {
      p1.energy = p1.maxEnergy;
      for (let i = 0; i < 4; i++) {
        p1.slotCooldowns[i] = p1.slotCooldowns[i] * 0.5;
      }
      p1.powerCooldown = p1.slotCooldowns[0];
      p1.secondaryCooldown = p1.slotCooldowns[1];
      this.spawnFloatingText(p1.x, p1.y + 2.5, p1.z, "\u0637\u0627\u0642\u0629 \u0643\u0627\u0645\u0644\u0629!", def.color, 1.2);
      audioSynth.playPower();
    } else if (id === "tonic_fury") {
      p1.overdriveTimer = Math.max(p1.overdriveTimer, 6.5);
      p1.overdriveActive = true;
      this.spawnFloatingText(p1.x, p1.y + 2.5, p1.z, "\u0625\u0643\u0633\u064A\u0631 \u0627\u0644\u063A\u0636\u0628!", def.color, 1.25);
      audioSynth.playPower();
    }
    this.spawnBurst(p1.x, p1.y + 1.1, p1.z, def.color, 12);
    this.rings.push({
      x: p1.x,
      y: p1.y + 0.1,
      z: p1.z,
      radius: 0.4,
      maxRadius: 3.2,
      color: def.color,
      alpha: 0.9,
      life: 0.4,
      maxLife: 0.4,
      growSpeed: 7.5
    });
    return true;
  }
  findNearestHostile(attacker) {
    let best = null;
    for (const m of this.monsters) {
      if (m.hp <= 0) continue;
      const d = Math.hypot(m.x - attacker.x, m.z - attacker.z);
      if (!best || d < best.dist) best = { x: m.x, z: m.z, dist: d };
    }
    for (const f of this.fighters) {
      if (f.id === attacker.id || f.team === attacker.team || f.hp <= 0) continue;
      const d = Math.hypot(f.x - attacker.x, f.z - attacker.z);
      if (!best || d < best.dist) best = { x: f.x, z: f.z, dist: d };
    }
    return best;
  }
  triggerPrimaryAttack(fighter) {
    if (fighter.attackCooldown > 0 || fighter.stunTimer > 0 || fighter.dodgeTimer > 0) return false;
    const weapon = WEAPONS[fighter.avatar.weaponId] || WEAPONS.vanguard_sword;
    const nearest = this.findNearestHostile(fighter);
    if (nearest && nearest.dist < (weapon.isRanged ? 16 : 6)) {
      fighter.yaw = Math.atan2(nearest.x - fighter.x, nearest.z - fighter.z);
    }
    fighter.comboStep = (fighter.comboStep + 1) % 3;
    const comboMult = fighter.comboStep === 2 ? 1.3 : 1;
    const overdriveMult = fighter.overdriveActive ? 1.55 : 1;
    const highGroundMult = fighter.onHighGround ? 1.12 : 1;
    const baseDmg = fighter.statsDerived.attackDamage * comboMult * overdriveMult * highGroundMult;
    const isCrit = Math.random() * 100 < fighter.statsDerived.critChance;
    const dmg = Math.round(baseDmg * (isCrit ? 1.65 : 1));
    fighter.animState = "attack";
    fighter.animTime = 0;
    fighter.attackCooldown = 1 / (weapon.attackSpeed * fighter.statsDerived.attackSpeedMult);
    audioSynth.playSwing(
      weapon.id === "shadow_daggers" || weapon.id === "crimson_wand" ? 1.45 : weapon.id === "storm_hammer" || weapon.id === "aegis_greatshield" ? 0.72 : 1
    );
    if (weapon.isRanged) {
      const speed = weapon.id === "solar_bow" ? 23 : weapon.id === "crimson_wand" ? 24 : weapon.id === "arcane_tome" ? 17 : 16;
      if (weapon.id === "arcane_tome") {
        [-0.12, 0.12].forEach((offset) => {
          const a = fighter.yaw + offset;
          this.projectiles.push({
            id: this.nextId("proj"),
            ownerId: fighter.id,
            team: fighter.team,
            x: fighter.x + Math.sin(a) * 0.9,
            y: fighter.y + 1.25,
            z: fighter.z + Math.cos(a) * 0.9,
            vx: Math.sin(a) * speed,
            vz: Math.cos(a) * speed,
            color: weapon.energyColor,
            coreColor: "#FFFFFF",
            radius: 0.25,
            kind: "orb",
            damage: Math.round(dmg * 0.62),
            knockback: weapon.knockback * 0.7,
            life: 1.4,
            homing: true,
            critical: isCrit
          });
        });
      } else {
        this.projectiles.push({
          id: this.nextId("proj"),
          ownerId: fighter.id,
          team: fighter.team,
          x: fighter.x + Math.sin(fighter.yaw) * 0.9,
          y: fighter.y + 1.25,
          z: fighter.z + Math.cos(fighter.yaw) * 0.9,
          vx: Math.sin(fighter.yaw) * speed,
          vz: Math.cos(fighter.yaw) * speed,
          color: weapon.energyColor,
          coreColor: "#FFFFFF",
          radius: weapon.role === "magic" || weapon.role === "support" ? 0.32 : 0.22,
          kind: weapon.id === "solar_bow" ? "arrow" : "orb",
          damage: dmg,
          knockback: weapon.knockback,
          life: 1.45,
          homing: weapon.id === "void_staff" || weapon.id === "astral_censer",
          critical: isCrit
        });
      }
    } else {
      fighter.vx += Math.sin(fighter.yaw) * 2.6;
      fighter.vz += Math.cos(fighter.yaw) * 2.6;
      this.slashes.push({
        x: fighter.x,
        y: fighter.y + 1.15 * fighter.avatar.heightScale,
        z: fighter.z,
        yaw: fighter.yaw,
        radius: weapon.range * 0.92,
        arcSpread: weapon.id === "dragon_spear" ? 0.85 : 2.15,
        color: weapon.energyColor,
        alpha: 0.88,
        tilt: fighter.comboStep === 1 ? -0.48 : 0.48,
        life: isCrit ? 0.28 : 0.22,
        maxLife: isCrit ? 0.28 : 0.22,
        critical: isCrit
      });
      this.applyMeleeHitCone(fighter, weapon.range, weapon.id === "dragon_spear" ? 0.65 : 1.4, dmg, weapon.knockback, isCrit);
    }
    return true;
  }
  triggerHeavySkill(fighter) {
    if (fighter.heavyCooldown > 0 || fighter.stunTimer > 0) return false;
    const weapon = WEAPONS[fighter.avatar.weaponId] || WEAPONS.vanguard_sword;
    const nearest = this.findNearestHostile(fighter);
    if (nearest && nearest.dist < 15) {
      fighter.yaw = Math.atan2(nearest.x - fighter.x, nearest.z - fighter.z);
    }
    const overdriveMult = fighter.overdriveActive ? 1.55 : 1;
    const highGroundMult = fighter.onHighGround ? 1.12 : 1;
    const isCrit = Math.random() * 100 < fighter.statsDerived.critChance + 15;
    const dmg = Math.round(fighter.statsDerived.heavyDamage * overdriveMult * highGroundMult * (isCrit ? 1.55 : 1));
    fighter.animState = "heavy";
    fighter.animTime = 0;
    fighter.heavyCooldown = 4.2 * (1 - fighter.statsDerived.cooldownReduction);
    fighter.attackCooldown = 0.28;
    audioSynth.playSwing(0.65);
    if (weapon.id === "solar_bow") {
      [-0.22, 0, 0.22].forEach((offset) => {
        const a = fighter.yaw + offset;
        this.projectiles.push({
          id: this.nextId("proj"),
          ownerId: fighter.id,
          team: fighter.team,
          x: fighter.x + Math.sin(a) * 0.9,
          y: fighter.y + 1.25,
          z: fighter.z + Math.cos(a) * 0.9,
          vx: Math.sin(a) * 24,
          vz: Math.cos(a) * 24,
          color: weapon.energyColor,
          coreColor: "#FFFFFF",
          radius: 0.24,
          kind: "arrow",
          damage: dmg,
          knockback: 4.5,
          life: 1.35,
          homing: false,
          critical: isCrit
        });
      });
    } else if (weapon.role === "magic") {
      const cx = nearest && nearest.dist < 11 ? nearest.x : fighter.x + Math.sin(fighter.yaw) * 4.5;
      const cz = nearest && nearest.dist < 11 ? nearest.z : fighter.z + Math.cos(fighter.yaw) * 4.5;
      if (weapon.id === "crimson_wand") {
        this.lightnings.push({ x: cx, z: cz, color: weapon.energyColor, alpha: 1, seed: Math.random() * 99, life: 0.36, maxLife: 0.36 });
      }
      this.rings.push({
        x: cx,
        y: this.getTerrainHeight(cx, cz) + 0.1,
        z: cz,
        radius: 0.5,
        maxRadius: 4.9,
        color: weapon.energyColor,
        alpha: 0.92,
        life: 0.42,
        maxLife: 0.42,
        growSpeed: 11.2
      });
      this.applyRadialDamage(fighter, cx, cz, 4.9, dmg, 7.5, isCrit);
      this.spawnBurst(cx, 1, cz, weapon.energyColor, 14);
    } else if (weapon.role === "support") {
      const healAmt = Math.round(fighter.maxHp * 0.18);
      fighter.hp = Math.min(fighter.maxHp, fighter.hp + healAmt);
      fighter.energy = Math.min(fighter.maxEnergy, fighter.energy + 22);
      if (weapon.id === "astral_censer") {
        fighter.shieldTimer = Math.max(fighter.shieldTimer, 3);
        fighter.shieldActive = true;
      }
      this.spawnFloatingText(fighter.x, fighter.y + 2.4, fighter.z, `+${healAmt} \u0634\u0641\u0627\u0621 \u0648\u062F\u0639\u0645`, weapon.energyColor, 1.15);
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.1,
        z: fighter.z,
        radius: 0.5,
        maxRadius: 4.8,
        color: weapon.energyColor,
        alpha: 0.92,
        life: 0.45,
        maxLife: 0.45,
        growSpeed: 10.5
      });
      this.applyRadialDamage(fighter, fighter.x, fighter.z, 4.8, dmg, 7, isCrit);
      this.spawnBurst(fighter.x, fighter.y + 1.2, fighter.z, weapon.energyColor, 14);
    } else if (weapon.role === "defense") {
      fighter.vx += Math.sin(fighter.yaw) * 6.5;
      fighter.vz += Math.cos(fighter.yaw) * 6.5;
      const rad = 4.6;
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.1,
        z: fighter.z,
        radius: 0.6,
        maxRadius: rad,
        color: weapon.energyColor,
        alpha: 0.92,
        life: 0.4,
        maxLife: 0.4,
        growSpeed: 11.5
      });
      for (const m of this.monsters) {
        if (m.hp > 0 && Math.hypot(m.x - fighter.x, m.z - fighter.z) <= rad + 0.6) {
          m.stunTimer = Math.max(m.stunTimer, 1.6);
        }
      }
      for (const f of this.fighters) {
        if (f.id !== fighter.id && f.team !== fighter.team && f.hp > 0 && Math.hypot(f.x - fighter.x, f.z - fighter.z) <= rad + 0.6) {
          f.stunTimer = Math.max(f.stunTimer, 1.1);
        }
      }
      this.applyRadialDamage(fighter, fighter.x, fighter.z, rad, dmg, weapon.knockback * 1.35, isCrit);
      if (fighter.team === "player1") this.addCameraShake(0.18, 0.3);
    } else {
      fighter.vx += Math.sin(fighter.yaw) * 7.2;
      fighter.vz += Math.cos(fighter.yaw) * 7.2;
      if (weapon.id === "storm_hammer" || weapon.id === "vanguard_sword") {
        fighter.vy = 5.4;
      }
      const radius = weapon.id === "storm_hammer" ? 4.6 : weapon.range * 1.32;
      this.slashes.push({
        x: fighter.x,
        y: fighter.y + 1.15,
        z: fighter.z,
        yaw: fighter.yaw,
        radius,
        arcSpread: weapon.id === "storm_hammer" ? Math.PI * 1.9 : 2.65,
        color: weapon.energyColor,
        alpha: 0.96,
        tilt: 0.18,
        life: isCrit ? 0.38 : 0.32,
        maxLife: isCrit ? 0.38 : 0.32,
        critical: isCrit
      });
      if (weapon.id === "storm_hammer") {
        this.rings.push({
          x: fighter.x,
          y: fighter.y + 0.08,
          z: fighter.z,
          radius: 0.6,
          maxRadius: 4.8,
          color: weapon.energyColor,
          alpha: 0.9,
          life: 0.38,
          maxLife: 0.38,
          growSpeed: 12
        });
        this.applyRadialDamage(fighter, fighter.x, fighter.z, 4.8, dmg, weapon.knockback * 1.3, isCrit);
      } else {
        this.applyMeleeHitCone(fighter, radius, 1.85, dmg, weapon.knockback * 1.4, isCrit);
      }
      if (fighter.team === "player1") this.addCameraShake(0.16, 0.28);
    }
    if (this.mode === "pvp_online" && fighter.team === "player1") {
      this.opts.onOnlineVfxSend?.({
        kind: "heavy",
        x: fighter.x,
        z: fighter.z,
        color: weapon.energyColor,
        radius: 4
      });
    }
    return true;
  }
  triggerSkillSlot(fighter, slotIdx) {
    if (fighter.team === "player1" && slotIdx >= this.unlockedSkillSlots) {
      this.showBanner(`\u0627\u0644\u062E\u0627\u0646\u0629 ${slotIdx + 1} \u0645\u0642\u0641\u0644\u0629! \u0627\u0634\u062A\u0631\u0650 \u062E\u0627\u0646\u0629 \u062C\u062F\u064A\u062F\u0629 \u0645\u0646 \u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0644\u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629.`, 2);
      return false;
    }
    const slots = fighter.avatar.powerSlots;
    const powerId = slots?.[slotIdx] || (slotIdx === 0 ? fighter.avatar.powerId : fighter.avatar.secondaryPowerId);
    const power = POWERS[powerId] || POWERS.inferno_nova;
    const skillLv = fighter.team === "player1" ? this.powerLevels[powerId] || 1 : 1;
    const netBonus = fighter.team === "player1" ? computeSkillNetworkBonuses(this.unlockedNetworkNodes) : null;
    const effEnergyCost = Math.round(power.energyCost * (netBonus ? netBonus.energyCostMult : 1));
    const effRadius = Number(
      (power.radius * (1 + (skillLv - 1) * 0.08) * (netBonus ? netBonus.radiusMult : 1)).toFixed(2)
    );
    const cd = fighter.slotCooldowns[slotIdx];
    if (cd > 0 || fighter.energy < effEnergyCost || fighter.stunTimer > 0) return false;
    fighter.energy -= effEnergyCost;
    const cdFactor = Math.max(
      0.35,
      1 - fighter.statsDerived.cooldownReduction - (netBonus ? netBonus.cdrMult : 0) - (skillLv - 1) * 0.06
    );
    const effCd = power.cooldown * cdFactor;
    fighter.slotCooldowns[slotIdx] = effCd;
    if (slotIdx === 0) fighter.powerCooldown = effCd;
    if (slotIdx === 1) fighter.secondaryCooldown = effCd;
    fighter.animState = "power";
    fighter.animTime = 0;
    const highGroundMult = fighter.onHighGround ? 1.12 : 1;
    const lvMult = 1 + (skillLv - 1) * 0.18;
    const netDmgMult = netBonus ? netBonus.dmgMult : 1;
    const fusionBonusMult = power.isFusion && netBonus ? netBonus.fusionMult : 1;
    const scaledDmg = Math.round(
      power.damage * fighter.statsDerived.powerScale * highGroundMult * lvMult * netDmgMult * fusionBonusMult
    );
    if (power.isFusion) {
      audioSynth.playFusionCast();
      if (fighter.team === "player1") {
        this.fusionCasts += 1;
        this.opts.onFusionCast?.();
        this.addCameraShake(0.32, 0.44);
      }
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.12,
        z: fighter.z,
        radius: 0.8,
        maxRadius: effRadius * 1.08,
        color: power.color,
        alpha: 0.96,
        life: 0.58,
        maxLife: 0.58,
        growSpeed: effRadius * 2.35,
        isFusion: true,
        secondaryColor: "#FDE047"
      });
    } else {
      audioSynth.playPower();
      if (fighter.team === "player1") this.addCameraShake(0.22, 0.34);
    }
    if (power.id === "inferno_nova") {
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.1,
        z: fighter.z,
        radius: 0.6,
        maxRadius: effRadius,
        color: power.color,
        alpha: 0.95,
        life: 0.48,
        maxLife: 0.48,
        growSpeed: effRadius * 2.2
      });
      this.spawnBurst(fighter.x, fighter.y + 1.2, fighter.z, "#F97316", 18);
      this.applyRadialDamage(fighter, fighter.x, fighter.z, effRadius, scaledDmg, 11, true);
    } else if (power.id === "thunder_strike") {
      const targets = [];
      for (const m of this.monsters) {
        if (m.hp <= 0) continue;
        const d = Math.hypot(m.x - fighter.x, m.z - fighter.z);
        if (d <= effRadius) {
          targets.push({
            x: m.x,
            z: m.z,
            apply: () => {
              m.stunTimer = Math.max(m.stunTimer, 1.4);
              this.damageMonster(fighter, m, scaledDmg, 3, true);
            }
          });
        }
      }
      for (const f of this.fighters) {
        if (f.id === fighter.id || f.team === fighter.team || f.hp <= 0) continue;
        const d = Math.hypot(f.x - fighter.x, f.z - fighter.z);
        if (d <= effRadius) {
          targets.push({
            x: f.x,
            z: f.z,
            apply: () => {
              f.stunTimer = Math.max(f.stunTimer, 1.1);
              this.damageFighter(fighter, f, scaledDmg, 4, true);
            }
          });
        }
      }
      targets.sort((a, b) => Math.hypot(a.x - fighter.x, a.z - fighter.z) - Math.hypot(b.x - fighter.x, b.z - fighter.z));
      const chosen = targets.slice(0, 3);
      if (chosen.length === 0) {
        this.lightnings.push({
          x: fighter.x + Math.sin(fighter.yaw) * 4,
          z: fighter.z + Math.cos(fighter.yaw) * 4,
          color: power.color,
          alpha: 1,
          seed: Math.random() * 100,
          life: 0.35,
          maxLife: 0.35
        });
      } else {
        chosen.forEach((t) => {
          this.lightnings.push({
            x: t.x,
            z: t.z,
            color: power.color,
            alpha: 1,
            seed: Math.random() * 100,
            life: 0.38,
            maxLife: 0.38
          });
          this.spawnBurst(t.x, 1.3, t.z, "#38BDF8", 10);
          t.apply();
        });
      }
    } else if (power.id === "crystal_aegis") {
      fighter.shieldTimer = 5.2;
      fighter.shieldActive = true;
      const heal = Math.round(fighter.maxHp * 0.18);
      fighter.hp = Math.min(fighter.maxHp, fighter.hp + heal);
      this.spawnFloatingText(fighter.x, fighter.y + 2.3, fighter.z, `+${heal} \u0635\u062D\u0629 \u0648\u062F\u0631\u0639`, "#10B981", 1.15);
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.1,
        z: fighter.z,
        radius: 0.5,
        maxRadius: effRadius,
        color: "#10B981",
        alpha: 0.85,
        life: 0.4,
        maxLife: 0.4,
        growSpeed: effRadius * 2.1
      });
      this.applyRadialDamage(fighter, fighter.x, fighter.z, effRadius, Math.round(scaledDmg * 0.7), 6.5, false);
    } else if (power.id === "shadow_blink") {
      const dashDist = 6.2;
      const sx = fighter.x;
      const sz = fighter.z;
      for (let k = 0; k < 3; k++) {
        this.dashTrails.push({
          x: sx + Math.sin(fighter.yaw) * (k * 2),
          y: fighter.y,
          z: sz + Math.cos(fighter.yaw) * (k * 2),
          yaw: fighter.yaw,
          color: fighter.avatar.accentColor,
          alpha: 0.85,
          hScale: fighter.avatar.heightScale,
          life: 0.35,
          maxLife: 0.35
        });
      }
      fighter.x += Math.sin(fighter.yaw) * dashDist;
      fighter.z += Math.cos(fighter.yaw) * dashDist;
      fighter.invulnTimer = 0.5;
      this.constrainToArena(fighter);
      this.spawnBurst(fighter.x, fighter.y + 1.1, fighter.z, "#E2E8F0", 14);
      this.applyRadialDamage(fighter, (sx + fighter.x) * 0.5, (sz + fighter.z) * 0.5, 3.8, scaledDmg, 5.5, true);
      this.applyRadialDamage(fighter, fighter.x, fighter.z, 3, Math.round(scaledDmg * 0.65), 5, true);
    } else if (power.id === "frost_vortex") {
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.1,
        z: fighter.z,
        radius: 0.6,
        maxRadius: effRadius,
        color: "#60A5FA",
        alpha: 0.9,
        life: 0.55,
        maxLife: 0.55,
        growSpeed: effRadius * 2
      });
      this.spawnBurst(fighter.x, fighter.y + 1.2, fighter.z, "#93C5FD", 18);
      for (const m of this.monsters) {
        if (m.hp <= 0) continue;
        if (Math.hypot(m.x - fighter.x, m.z - fighter.z) <= effRadius) {
          m.frozenTimer = 4.2;
          this.damageMonster(fighter, m, scaledDmg, 3.5, false);
        }
      }
      for (const f of this.fighters) {
        if (f.id === fighter.id || f.team === fighter.team || f.hp <= 0) continue;
        if (Math.hypot(f.x - fighter.x, f.z - fighter.z) <= effRadius) {
          f.frozenTimer = 3.2;
          this.damageFighter(fighter, f, scaledDmg, 3.5, false);
        }
      }
    } else if (power.id === "titan_overdrive") {
      fighter.overdriveTimer = 7.2;
      fighter.overdriveActive = true;
      fighter.vy = 5;
      this.spawnFloatingText(fighter.x, fighter.y + 2.6, fighter.z, "\u063A\u0636\u0628 \u0627\u0644\u0639\u0645\u0644\u0627\u0642!", "#F59E0B", 1.25);
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.1,
        z: fighter.z,
        radius: 0.6,
        maxRadius: effRadius,
        color: "#F59E0B",
        alpha: 0.92,
        life: 0.45,
        maxLife: 0.45,
        growSpeed: effRadius * 2
      });
      this.applyRadialDamage(fighter, fighter.x, fighter.z, effRadius, Math.round(scaledDmg * 0.8), 9, false);
    } else if (power.id === "meteor_rain") {
      fighter.vy = 4.5;
      this.spawnFloatingText(fighter.x, fighter.y + 2.5, fighter.z, "\u0645\u0637\u0631 \u0627\u0644\u0646\u064A\u0627\u0632\u0643!", power.color, 1.2);
      for (let i = 0; i < 4; i++) {
        const a = fighter.yaw + (i - 1.5) * 0.55;
        const dist = 3.5 + i * 1.4;
        const tx = fighter.x + Math.sin(a) * dist;
        const tz = fighter.z + Math.cos(a) * dist;
        this.pendingMeteors.push({
          x: tx,
          z: tz,
          delay: 0.15 + i * 0.22,
          damage: Math.round(scaledDmg * 0.58),
          ownerId: fighter.id,
          color: power.color
        });
      }
    } else if (power.id === "holy_sanctuary") {
      const heal = Math.round(fighter.maxHp * 0.34);
      fighter.hp = Math.min(fighter.maxHp, fighter.hp + heal);
      fighter.energy = Math.min(fighter.maxEnergy, fighter.energy + 25);
      this.spawnFloatingText(fighter.x, fighter.y + 2.5, fighter.z, `+${heal} \u0645\u0644\u0627\u0630 \u0627\u0644\u0646\u0648\u0631`, power.color, 1.22);
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.1,
        z: fighter.z,
        radius: 0.6,
        maxRadius: effRadius,
        color: power.color,
        alpha: 0.92,
        life: 0.5,
        maxLife: 0.5,
        growSpeed: effRadius * 2.1
      });
      this.spawnBurst(fighter.x, fighter.y + 1.2, fighter.z, power.color, 16);
      this.applyRadialDamage(fighter, fighter.x, fighter.z, effRadius, scaledDmg, 9.5, false);
    } else if (power.id === "iron_fortress") {
      fighter.shieldTimer = 5.5;
      fighter.shieldActive = true;
      fighter.invulnTimer = 1.4;
      this.spawnFloatingText(fighter.x, fighter.y + 2.5, fighter.z, "\u062D\u0635\u0646 \u0627\u0644\u062D\u062F\u064A\u062F!", power.color, 1.2);
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.1,
        z: fighter.z,
        radius: 0.6,
        maxRadius: effRadius,
        color: power.color,
        alpha: 0.94,
        life: 0.45,
        maxLife: 0.45,
        growSpeed: effRadius * 2.3
      });
      this.applyRadialDamage(fighter, fighter.x, fighter.z, effRadius, scaledDmg, 11.5, true);
    } else if (power.id === "arcane_beam") {
      fighter.vy = 4.2;
      [-0.24, -0.08, 0.08, 0.24].forEach((offset) => {
        const a = fighter.yaw + offset;
        this.projectiles.push({
          id: this.nextId("proj"),
          ownerId: fighter.id,
          team: fighter.team,
          x: fighter.x + Math.sin(a) * 1,
          y: fighter.y + 1.35,
          z: fighter.z + Math.cos(a) * 1,
          vx: Math.sin(a) * 20,
          vz: Math.cos(a) * 20,
          color: power.color,
          coreColor: "#FFFFFF",
          radius: 0.34,
          kind: "orb",
          damage: Math.round(scaledDmg * 0.48),
          knockback: 4.8,
          life: 1.5,
          homing: true,
          critical: true
        });
      });
    } else if (power.id === "fusion_plasma_tempest") {
      this.spawnFloatingText(fighter.x, fighter.y + 2.7, fighter.z, "\u0639\u0627\u0635\u0641\u0629 \u0627\u0644\u0628\u0644\u0627\u0632\u0645\u0627!", "#FB923C", 1.35);
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.1,
        z: fighter.z,
        radius: 0.7,
        maxRadius: effRadius,
        color: "#FB923C",
        alpha: 0.96,
        life: 0.55,
        maxLife: 0.55,
        growSpeed: effRadius * 2.1
      });
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.15,
        z: fighter.z,
        radius: 0.4,
        maxRadius: effRadius * 0.8,
        color: "#38BDF8",
        alpha: 0.9,
        life: 0.42,
        maxLife: 0.42,
        growSpeed: effRadius * 2.4
      });
      this.spawnBurst(fighter.x, fighter.y + 1.3, fighter.z, "#FB923C", 22);
      this.applyRadialDamage(fighter, fighter.x, fighter.z, effRadius, Math.round(scaledDmg * 0.75), 11.5, true);
      let lightningCount = 0;
      for (const m of this.monsters) {
        if (m.hp > 0 && Math.hypot(m.x - fighter.x, m.z - fighter.z) <= effRadius + 2 && lightningCount < 4) {
          lightningCount++;
          m.stunTimer = Math.max(m.stunTimer, 1.8);
          this.lightnings.push({ x: m.x, z: m.z, color: "#38BDF8", alpha: 1, seed: Math.random() * 100, life: 0.42, maxLife: 0.42 });
          this.damageMonster(fighter, m, Math.round(scaledDmg * 0.45), 3, true);
        }
      }
    } else if (power.id === "fusion_eternal_glacier") {
      const heal = Math.round(fighter.maxHp * 0.42);
      fighter.hp = Math.min(fighter.maxHp, fighter.hp + heal);
      fighter.shieldTimer = 5.5;
      fighter.shieldActive = true;
      this.spawnFloatingText(fighter.x, fighter.y + 2.7, fighter.z, `+${heal} \u062E\u0644\u0648\u062F \u0645\u062A\u062C\u0645\u062F!`, "#2DD4BF", 1.32);
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.12,
        z: fighter.z,
        radius: 0.6,
        maxRadius: effRadius,
        color: "#2DD4BF",
        alpha: 0.95,
        life: 0.6,
        maxLife: 0.6,
        growSpeed: effRadius * 2
      });
      this.spawnBurst(fighter.x, fighter.y + 1.2, fighter.z, "#7DD3FC", 22);
      for (const m of this.monsters) {
        if (m.hp > 0 && Math.hypot(m.x - fighter.x, m.z - fighter.z) <= effRadius) {
          m.frozenTimer = 5;
          this.damageMonster(fighter, m, scaledDmg, 5.5, true);
        }
      }
      for (const f of this.fighters) {
        if (f.id !== fighter.id && f.team !== fighter.team && f.hp > 0 && Math.hypot(f.x - fighter.x, f.z - fighter.z) <= effRadius) {
          f.frozenTimer = 4;
          this.damageFighter(fighter, f, scaledDmg, 5.5, true);
        }
      }
    } else if (power.id === "fusion_void_eclipse") {
      const sx = fighter.x;
      const sz = fighter.z;
      for (let k = 0; k < 4; k++) {
        this.dashTrails.push({
          x: sx + Math.sin(fighter.yaw) * (k * 1.9),
          y: fighter.y,
          z: sz + Math.cos(fighter.yaw) * (k * 1.9),
          yaw: fighter.yaw,
          color: "#C084FC",
          alpha: 0.92,
          hScale: fighter.avatar.heightScale,
          life: 0.42,
          maxLife: 0.42
        });
      }
      fighter.x += Math.sin(fighter.yaw) * 7.5;
      fighter.z += Math.cos(fighter.yaw) * 7.5;
      fighter.invulnTimer = 0.75;
      this.constrainToArena(fighter);
      this.spawnFloatingText(fighter.x, fighter.y + 2.6, fighter.z, "\u0634\u0642\u0651 \u0627\u0644\u0623\u0628\u0639\u0627\u062F!", "#C084FC", 1.32);
      this.applyRadialDamage(fighter, (sx + fighter.x) * 0.5, (sz + fighter.z) * 0.5, 4.5, Math.round(scaledDmg * 0.7), 6, true);
      [-0.36, -0.18, 0, 0.18, 0.36].forEach((offset) => {
        const a = fighter.yaw + offset;
        this.projectiles.push({
          id: this.nextId("proj"),
          ownerId: fighter.id,
          team: fighter.team,
          x: fighter.x + Math.sin(a) * 0.9,
          y: fighter.y + 1.35,
          z: fighter.z + Math.cos(a) * 0.9,
          vx: Math.sin(a) * 22,
          vz: Math.cos(a) * 22,
          color: "#C084FC",
          coreColor: "#F0ABFC",
          radius: 0.38,
          kind: "orb",
          damage: Math.round(scaledDmg * 0.42),
          knockback: 5.5,
          life: 1.65,
          homing: true,
          critical: true
        });
      });
    } else if (power.id === "fusion_dragon_bastion") {
      fighter.shieldTimer = 6.2;
      fighter.shieldActive = true;
      fighter.invulnTimer = 1.6;
      fighter.vy = 4.6;
      this.spawnFloatingText(fighter.x, fighter.y + 2.7, fighter.z, "\u0642\u0635\u0641 \u0627\u0644\u062A\u0646\u064A\u0646 \u0627\u0644\u0645\u062F\u0631\u0651\u0639!", "#F43F5E", 1.35);
      this.rings.push({
        x: fighter.x,
        y: fighter.y + 0.12,
        z: fighter.z,
        radius: 0.6,
        maxRadius: effRadius,
        color: "#F43F5E",
        alpha: 0.96,
        life: 0.55,
        maxLife: 0.55,
        growSpeed: effRadius * 2.2
      });
      this.applyRadialDamage(fighter, fighter.x, fighter.z, effRadius * 0.65, Math.round(scaledDmg * 0.55), 11.5, true);
      for (let i = 0; i < 5; i++) {
        const a = fighter.yaw + (i - 2) * 0.5;
        const dist = 3.2 + i * 1.35;
        this.pendingMeteors.push({
          x: fighter.x + Math.sin(a) * dist,
          z: fighter.z + Math.cos(a) * dist,
          delay: 0.12 + i * 0.18,
          damage: Math.round(scaledDmg * 0.52),
          ownerId: fighter.id,
          color: "#F43F5E"
        });
      }
    }
    if (this.mode === "pvp_online" && fighter.team === "player1") {
      this.opts.onOnlineVfxSend?.({
        kind: power.id,
        x: fighter.x,
        z: fighter.z,
        color: power.color,
        radius: effRadius
      });
    }
    return true;
  }
  triggerDodge(fighter) {
    if (fighter.dodgeCooldown > 0 || fighter.stunTimer > 0) return false;
    fighter.dodgeTimer = 0.24;
    fighter.invulnTimer = 0.38;
    fighter.attackCooldown = Math.min(fighter.attackCooldown, 0.12);
    fighter.dodgeCooldown = Math.max(0.7, 1.35 - fighter.avatar.stats.agi * 0.038);
    fighter.animState = "dodge";
    fighter.animTime = 0;
    this.dashTrails.push({
      x: fighter.x,
      y: fighter.y,
      z: fighter.z,
      yaw: fighter.yaw,
      color: fighter.avatar.accentColor,
      alpha: 0.85,
      hScale: fighter.avatar.heightScale,
      life: 0.28,
      maxLife: 0.28
    });
    fighter.vx = Math.sin(fighter.yaw) * 16;
    fighter.vz = Math.cos(fighter.yaw) * 16;
    audioSynth.playDodge();
    this.spawnBurst(fighter.x, fighter.y + 0.4, fighter.z, "#CBD5E1", 6);
    return true;
  }
  applyMeleeHitCone(attacker, range, halfAngleRad, damage, knockback, critical) {
    const fx = Math.sin(attacker.yaw);
    const fz = Math.cos(attacker.yaw);
    for (const m of this.monsters) {
      if (m.hp <= 0) continue;
      const dx = m.x - attacker.x;
      const dz = m.z - attacker.z;
      const dist = Math.hypot(dx, dz);
      const monRad = (MONSTERS[m.archetype]?.scale || 1) * 0.7;
      if (dist <= range + monRad) {
        const dot = dist > 0.01 ? (dx * fx + dz * fz) / dist : 1;
        if (dot >= Math.cos(halfAngleRad) || dist < 1.2) {
          this.damageMonster(attacker, m, damage, knockback, critical);
        }
      }
    }
    for (const f of this.fighters) {
      if (f.id === attacker.id || f.team === attacker.team || f.hp <= 0) continue;
      const dx = f.x - attacker.x;
      const dz = f.z - attacker.z;
      const dist = Math.hypot(dx, dz);
      if (dist <= range + 0.75) {
        const dot = dist > 0.01 ? (dx * fx + dz * fz) / dist : 1;
        if (dot >= Math.cos(halfAngleRad) || dist < 1.2) {
          this.damageFighter(attacker, f, damage, knockback, critical);
        }
      }
    }
  }
  applyRadialDamage(attacker, cx, cz, radius, damage, knockback, critical) {
    for (const m of this.monsters) {
      if (m.hp <= 0) continue;
      if (Math.hypot(m.x - cx, m.z - cz) <= radius + (MONSTERS[m.archetype]?.scale || 1) * 0.6) {
        this.damageMonster(attacker, m, damage, knockback, critical);
      }
    }
    for (const f of this.fighters) {
      if (f.id === attacker.id || f.team === attacker.team || f.hp <= 0) continue;
      if (Math.hypot(f.x - cx, f.z - cz) <= radius + 0.6) {
        this.damageFighter(attacker, f, damage, knockback, critical);
      }
    }
  }
  applyWeaponOnHitEffects(attacker, damage) {
    const weapon = WEAPONS[attacker.avatar.weaponId];
    if (weapon?.healOnHitPct && attacker.hp > 0) {
      const heal = Math.max(2, Math.round(damage * weapon.healOnHitPct));
      attacker.hp = Math.min(attacker.maxHp, attacker.hp + heal);
    }
    if (attacker.overdriveActive && attacker.hp > 0) {
      attacker.hp = Math.min(attacker.maxHp, attacker.hp + Math.round(damage * 0.16));
    }
  }
  damageMonster(attacker, monster, damage, knockback, critical) {
    monster.hp = Math.max(0, monster.hp - damage);
    monster.hitFlash = 1;
    if (monster.isBoss && !monster.enraged && monster.hp > 0 && monster.hp < monster.maxHp * 0.5) {
      monster.enraged = true;
      this.spawnFloatingText(monster.x, monster.y + 3.6, monster.z, "\u063A\u0636\u0628 \u0627\u0644\u0632\u0639\u064A\u0645!", "#F97316", 1.3);
      this.rings.push({
        x: monster.x,
        y: monster.y + 0.1,
        z: monster.z,
        radius: 0.6,
        maxRadius: 5.5,
        color: "#F97316",
        alpha: 0.9,
        life: 0.45,
        maxLife: 0.45,
        growSpeed: 12
      });
    }
    const dx = monster.x - attacker.x;
    const dz = monster.z - attacker.z;
    const d = Math.hypot(dx, dz) || 1;
    const kbScale = monster.isBoss ? 0.28 : 1;
    monster.vx += dx / d * knockback * kbScale;
    monster.vz += dz / d * knockback * kbScale;
    this.applyWeaponOnHitEffects(attacker, damage);
    if (attacker.team === "player1") {
      this.damageDealt += damage;
      this.combo += 1;
      this.comboTimer = 3.5;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;
      attacker.energy = Math.min(attacker.maxEnergy, attacker.energy + 7);
      if (critical) {
        this.critsLanded += 1;
        this.opts.onCritLanded?.();
        this.hitstopTimer = Math.max(this.hitstopTimer, 0.045);
        this.addCameraShake(0.14, 0.26);
        audioSynth.playCriticalSlash();
        if (this.quality !== "eco") {
          this.lightnings.push({
            x: monster.x,
            z: monster.z,
            color: "#FDE047",
            alpha: 0.82,
            seed: Math.random() * 100,
            life: 0.2,
            maxLife: 0.2
          });
        }
      }
    }
    audioSynth.playHit(critical);
    this.spawnBurst(monster.x, monster.y + 1.1, monster.z, critical ? "#FDE047" : "#F87171", critical ? 16 : 6);
    this.spawnFloatingText(
      monster.x,
      monster.y + (monster.isBoss ? 3.2 : 2.1),
      monster.z,
      critical ? `\u062D\u0627\u0633\u0645\u0629 -${damage}!` : `-${damage}`,
      critical ? "#FDE047" : "#F8FAFC",
      critical ? 1.32 : 1
    );
    if (monster.hp <= 0) {
      this.kills += 1;
      this.monsterKillsByType[monster.archetype] = (this.monsterKillsByType[monster.archetype] || 0) + 1;
      if (monster.isBoss) this.bossKills += 1;
      this.advanceMissionProgress("kill", 1);
      audioSynth.playKo();
      this.spawnBurst(monster.x, monster.y + 1.2, monster.z, MONSTERS[monster.archetype].accentColor, 20);
      if (monster.secretBossId && !this.defeatedSecretBossIds.has(monster.secretBossId)) {
        const sb = SECRET_WORLD_BOSSES.find((b) => b.id === monster.secretBossId);
        if (sb) {
          this.defeatedSecretBossIds.add(sb.id);
          this.secretBossesDefeatedCount += 1;
          this.bonusMissionGold += sb.rewardGold;
          this.opts.onDefeatSecretBoss?.(sb);
          audioSynth.playAchievementUnlock();
          this.rings.push({
            x: monster.x,
            y: 0.14,
            z: monster.z,
            radius: 0.8,
            maxRadius: 9,
            color: sb.accentColor,
            alpha: 0.98,
            life: 0.65,
            maxLife: 0.65,
            growSpeed: 14,
            isFusion: true,
            secondaryColor: "#FDE047"
          });
          this.spawnFloatingText(monster.x, 3.6, monster.z, `\u0633\u0642\u0637 ${sb.name}!`, "#FDE047", 1.4);
          this.showBanner(
            `\u0627\u0646\u062A\u0635\u0627\u0631 \u0623\u0633\u0637\u0648\u0631\u064A! \u0647\u0632\u0645\u062A \u0627\u0644\u0632\u0639\u064A\u0645 \u0627\u0644\u0633\u0631\u064A ${sb.name} (+${sb.rewardGold} \u0630\u0647\u0628\u060C +${sb.rewardGems} \u062C\u0648\u0647\u0631\u0629\u060C +${sb.rewardMarks} \u0634\u0627\u0631\u0629)`,
            4.2
          );
        }
      }
      if (Math.random() < 0.48 || monster.isBoss) {
        this.pickups.push({
          id: this.nextId("pk"),
          x: monster.x,
          z: monster.z,
          kind: Math.random() < 0.52 ? "heal" : Math.random() < 0.7 ? "energy" : "gold",
          bobPhase: Math.random() * 6
        });
      }
    }
  }
  damageFighter(attacker, target, rawDamage, knockback, critical) {
    if (target.invulnTimer > 0 || target.hp <= 0) return;
    if (this.mode === "pvp_online" && target.isRemote && attacker?.team === "player1") {
      const dx = target.x - attacker.x;
      const dz = target.z - attacker.z;
      const d = Math.hypot(dx, dz) || 1;
      this.opts.onOnlineHitSend?.({
        targetId: target.id,
        damage: rawDamage,
        critical,
        knockX: dx / d * knockback * 0.7,
        knockZ: dz / d * knockback * 0.7
      });
      this.damageDealt += rawDamage;
      this.combo += 1;
      this.comboTimer = 3.2;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;
      return;
    }
    let finalDmg = rawDamage * (1 - target.statsDerived.armorReduction);
    if (target.shieldActive) finalDmg *= 0.35;
    const targetWeapon = WEAPONS[target.avatar.weaponId];
    if (target.animState === "block") {
      finalDmg *= targetWeapon?.role === "defense" ? 0.16 : 0.28;
      audioSynth.playParry();
      this.spawnFloatingText(target.x, target.y + 2.3, target.z, "\u0635\u062F\u0651!", "#38BDF8", 1.12);
      if (attacker) {
        attacker.stunTimer = Math.max(attacker.stunTimer, targetWeapon?.role === "defense" ? 0.85 : 0.45);
        if (targetWeapon?.role === "defense") {
          const reflectDmg = Math.max(5, Math.round(rawDamage * 0.35));
          attacker.hp = Math.max(1, attacker.hp - reflectDmg);
          this.spawnFloatingText(attacker.x, attacker.y + 2.1, attacker.z, `\u0627\u0646\u0639\u0643\u0627\u0633 -${reflectDmg}`, "#60A5FA", 1);
        }
      }
    } else {
      audioSynth.playHit(critical);
    }
    const dmg = Math.max(1, Math.round(finalDmg));
    target.hp = Math.max(0, target.hp - dmg);
    target.hitFlash = 1;
    if (attacker) {
      const dx = target.x - attacker.x;
      const dz = target.z - attacker.z;
      const d = Math.hypot(dx, dz) || 1;
      target.vx += dx / d * knockback;
      target.vz += dz / d * knockback;
      this.applyWeaponOnHitEffects(attacker, dmg);
      if (attacker.team === "player1") {
        this.damageDealt += dmg;
        this.combo += 1;
        this.comboTimer = 3.4;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;
        attacker.energy = Math.min(attacker.maxEnergy, attacker.energy + 8);
        if (critical) {
          this.critsLanded += 1;
          this.opts.onCritLanded?.();
          this.hitstopTimer = Math.max(this.hitstopTimer, 0.04);
          this.addCameraShake(0.13, 0.24);
          audioSynth.playCriticalSlash();
        }
      }
    }
    if (target.team === "player1") {
      this.addCameraShake(0.14, 0.25);
    }
    this.spawnBurst(target.x, target.y + 1.2, target.z, critical ? "#F59E0B" : "#EF4444", 9);
    this.spawnFloatingText(
      target.x,
      target.y + 2.3,
      target.z,
      critical ? `\u062D\u0627\u0633\u0645\u0629 -${dmg}!` : `-${dmg}`,
      target.team === "player1" ? "#F87171" : critical ? "#FDE047" : "#F8FAFC",
      critical ? 1.22 : 1
    );
    if (target.hp <= 0) {
      target.animState = "dead";
      audioSynth.playKo();
      this.handleFighterDefeat(target);
    }
  }
  handleFighterDefeat(defeated) {
    if (this.mode === "pvp_local") {
      if (defeated.team === "player2") this.scoreP1 += 1;
      else this.scoreP2 += 1;
      if (this.scoreP1 >= 2 || this.scoreP2 >= 2) {
        this.finishMatch(this.scoreP1 >= 2);
      } else {
        this.showBanner(`\u0627\u0644\u0646\u062A\u064A\u062C\u0629 ${this.scoreP1} - ${this.scoreP2} \u2014 \u062C\u0648\u0644\u0629 \u062C\u062F\u064A\u062F\u0629!`, 2.2);
        setTimeout(() => {
          if (this.finished) return;
          const p1 = this.getPlayer1();
          const p2 = this.getPlayer2();
          if (p1) {
            p1.hp = p1.maxHp;
            p1.energy = 100;
            p1.x = -6.8;
            p1.z = 0;
            p1.animState = "idle";
          }
          if (p2) {
            p2.hp = p2.maxHp;
            p2.energy = 100;
            p2.x = 6.8;
            p2.z = 0;
            p2.animState = "idle";
          }
        }, 1200);
      }
      return;
    }
    if (this.mode === "pvp_ranked") {
      this.finishMatch(defeated.team !== "player1");
      return;
    }
    if (this.mode === "pvp_online") {
      return;
    }
    if (this.mode === "world_explore" && defeated.team === "player1") {
      defeated.hp = defeated.maxHp;
      defeated.energy = defeated.maxEnergy;
      defeated.x = 0;
      defeated.z = 5.5;
      defeated.y = this.getTerrainHeight(0, 5.5);
      defeated.vx = 0;
      defeated.vz = 0;
      defeated.invulnTimer = 2.5;
      defeated.animState = "idle";
      this.showBanner("\u0623\u064F\u0639\u064A\u062F \u0625\u062D\u064A\u0627\u0624\u0643 \u0628\u0633\u0644\u0627\u0645 \u0639\u0646\u062F \u0646\u0627\u0641\u0648\u0631\u0629 \u0642\u0631\u064A\u0629 \u0627\u0644\u0645\u0644\u0627\u0630!", 2.6);
      this.spawnBurst(defeated.x, defeated.y + 1.2, defeated.z, "#38BDF8", 16);
      return;
    }
    if (defeated.team === "player1") {
      this.finishMatch(false);
    } else {
      this.kills += 1;
      this.advanceMissionProgress("kill", 1);
      if (this.mode === "unified_clash") {
        this.scoreP1 += 1;
        this.showBanner(`\u0623\u0633\u0642\u0637\u062A \u0627\u0644\u0628\u0637\u0644 \u0627\u0644\u0645\u0646\u0627\u0641\u0633 ${defeated.name}! (+14 \u062A\u0635\u0646\u064A\u0641)`, 2.2);
        this.pickups.push({
          id: this.nextId("pk"),
          x: defeated.x,
          z: defeated.z,
          kind: "heal",
          bobPhase: 0
        });
      }
      this.fighters = this.fighters.filter((f) => f.id !== defeated.id);
    }
  }
  getActiveMissionDef() {
    if (this.mode === "pvp_ranked" || this.mode === "pvp_local" || this.mode === "pvp_online") return null;
    const cycle = this.missionIndex % 3;
    if (cycle === 0) {
      return { id: "highground", title: "\u0633\u064A\u0637\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0631\u062A\u0641\u0639 4 \u062B\u0648\u0627\u0646\u064D", target: 4, rewardText: "+80 \u0630\u0647\u0628 \u0648\u0634\u0641\u0627\u0621" };
    }
    if (cycle === 1) {
      return { id: "shrine", title: "\u0641\u0639\u0651\u0644 \u0645\u062D\u0631\u0627\u0628\u064A\u0646 \u0641\u064A \u0627\u0644\u062E\u0631\u064A\u0637\u0629", target: 2, rewardText: "+100 \u0630\u0647\u0628 \u0648\u0637\u0627\u0642\u0629" };
    }
    return { id: "kill", title: "\u0627\u0647\u0632\u0645 5 \u0623\u0639\u062F\u0627\u0621 \u0628\u0633\u0631\u0639\u0629", target: 5, rewardText: "+120 \u0630\u0647\u0628 \u0648\u063A\u0636\u0628" };
  }
  advanceMissionProgress(kind, amount) {
    const def = this.getActiveMissionDef();
    if (!def || def.id !== kind) return;
    this.missionProgress += amount;
    if (this.missionProgress >= def.target) {
      this.missionProgress = 0;
      this.missionIndex += 1;
      this.missionsDone += 1;
      const p1 = this.getPlayer1();
      if (def.id === "highground") {
        this.bonusMissionGold += 80;
        if (p1) p1.hp = Math.min(p1.maxHp, p1.hp + Math.round(p1.maxHp * 0.25));
      } else if (def.id === "shrine") {
        this.bonusMissionGold += 100;
        if (p1) p1.energy = p1.maxEnergy;
      } else {
        this.bonusMissionGold += 120;
        if (p1) {
          p1.overdriveTimer = Math.max(p1.overdriveTimer, 4.5);
          p1.overdriveActive = true;
        }
      }
      audioSynth.playReward();
      this.showBanner(`\u0623\u064F\u0646\u062C\u0632\u062A \u0627\u0644\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629! (${def.rewardText})`, 2.6);
    }
  }
  spawnWave(waveNum) {
    this.wave = waveNum;
    const isMagmaBossWave = waveNum === 3 || waveNum % 3 === 0 && waveNum < 6;
    const isVoidColossusWave = waveNum >= 6 && waveNum % 3 === 0;
    const count = this.mode === "unified_clash" ? Math.min(7, 2 + waveNum) : Math.min(8, 3 + waveNum);
    const pool = waveNum === 1 ? ["ash_stalker", "ember_imp", "venom_crawler"] : waveNum === 2 ? ["ash_stalker", "ember_imp", "venom_crawler", "frost_specter", "obsidian_golem"] : waveNum === 3 ? ["ember_imp", "venom_crawler", "frost_specter", "obsidian_golem", "wraith_knight"] : ["venom_crawler", "frost_specter", "obsidian_golem", "wraith_knight", "shadow_reaper"];
    for (let i = 0; i < count; i++) {
      const arch = pool[Math.floor(Math.random() * pool.length)];
      this.spawnMonster(arch, waveNum, i);
    }
    if (this.mode === "unified_clash") {
      const champ = RIVAL_CHAMPIONS[(waveNum - 1) % RIVAL_CHAMPIONS.length];
      const ang = (waveNum * 1.9 + 0.6) % (Math.PI * 2);
      const spawnR = this.arena.radius - 4.5;
      const rival = this.createFighter(
        this.nextId("unified_rival"),
        champ.avatar,
        Math.cos(ang) * spawnR,
        Math.sin(ang) * spawnR,
        0,
        "enemy",
        Math.min(4, 1 + Math.floor(waveNum / 2)),
        true,
        Math.min(0.9, 0.58 + (waveNum - 1) * 0.06)
      );
      const hpScale = waveNum === 1 ? 0.68 : 0.78 + waveNum * 0.08;
      rival.maxHp = Math.round(rival.maxHp * hpScale);
      rival.hp = rival.maxHp;
      this.fighters.push(rival);
      if (isVoidColossusWave) {
        this.spawnMonster("void_colossus", waveNum, 99);
        this.showBanner(`\u0627\u0644\u0645\u0648\u062C\u0629 ${waveNum}: \u0639\u0645\u0644\u0627\u0642 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 + \u0627\u0644\u0628\u0637\u0644 ${champ.name}!`, 3.2);
      } else if (isMagmaBossWave) {
        this.spawnMonster("magma_boss", waveNum, 99);
        this.showBanner(`\u0627\u0644\u0645\u0648\u062C\u0629 ${waveNum}: \u0633\u064A\u062F \u0627\u0644\u062D\u0645\u0645 + \u0627\u0644\u0628\u0637\u0644 ${champ.name}!`, 3);
      } else {
        this.showBanner(`\u0627\u0644\u0645\u0648\u062C\u0629 ${waveNum} \u2014 \u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u0648\u062D\u0648\u0634 + \u0627\u0644\u0628\u0637\u0644 ${champ.name}!`, 2.5);
      }
      return;
    }
    if (isVoidColossusWave || this.mode === "monster_raid" && waveNum === 6) {
      this.spawnMonster("void_colossus", waveNum, 99);
      this.showBanner("\u062A\u062D\u0630\u064A\u0631: \u0638\u0647\u0631 \u0632\u0639\u064A\u0645 \u0627\u0644\u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u0623\u0639\u0644\u0649 \xAB\u0639\u0645\u0644\u0627\u0642 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A\xBB!", 3.2);
    } else if (isMagmaBossWave) {
      this.spawnMonster("magma_boss", waveNum, 99);
      this.showBanner("\u062A\u062D\u0630\u064A\u0631: \u0638\u0647\u0631 \u0632\u0639\u064A\u0645 \u0627\u0644\u0633\u0627\u062D\u0629 \xAB\u0633\u064A\u062F \u0627\u0644\u062D\u0645\u0645 \u0627\u0644\u0645\u062F\u0631\u0651\u0639\xBB!", 3);
    } else if (this.mode === "free_combat" && waveNum >= 2) {
      const champ = RIVAL_CHAMPIONS[(waveNum - 2) % RIVAL_CHAMPIONS.length];
      const ang = Math.random() * Math.PI * 2;
      const rival = this.createFighter(
        this.nextId("free_rival"),
        champ.avatar,
        Math.cos(ang) * (this.arena.radius - 4),
        Math.sin(ang) * (this.arena.radius - 4),
        0,
        "enemy",
        1,
        true,
        0.62
      );
      rival.maxHp = Math.round(rival.maxHp * 0.72);
      rival.hp = rival.maxHp;
      this.fighters.push(rival);
      this.showBanner(`\u0627\u0644\u0645\u0648\u062C\u0629 ${waveNum} \u2014 \u0627\u0642\u062A\u062D\u0645 \u0627\u0644\u0645\u0642\u0627\u062A\u0644 ${champ.name} \u0627\u0644\u0633\u0627\u062D\u0629!`, 2.6);
    } else {
      this.showBanner(
        this.mode === "monster_raid" ? `\u063A\u0627\u0631\u0629 \u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u0648\u062D\u0648\u0634 \u2014 \u0627\u0644\u0645\u0648\u062C\u0629 ${waveNum} \u0645\u0646 6` : `\u0627\u0644\u0645\u0648\u062C\u0629 ${waveNum} \u2014 \u0627\u0633\u062A\u0639\u062F \u0644\u0644\u0642\u062A\u0627\u0644!`,
        2.2
      );
    }
  }
  spawnMonster(archetype, waveNum, slot) {
    const def = MONSTERS[archetype];
    const ang = Math.random() * Math.PI * 2;
    const dist = this.arena.radius - 3;
    const scaleHp = 1 + (waveNum - 1) * 0.14;
    const hp = Math.round(def.maxHp * scaleHp);
    const x = Math.cos(ang) * dist;
    const z = Math.sin(ang) * dist;
    this.monsters.push({
      id: this.nextId("mon"),
      archetype,
      name: def.name,
      x,
      y: this.getTerrainHeight(x, z),
      z,
      vx: 0,
      vy: 0,
      vz: 0,
      yaw: Math.atan2(-Math.cos(ang), -Math.sin(ang)),
      hp,
      maxHp: hp,
      walkPhase: Math.random() * 5,
      attackTimer: 0,
      attackCooldown: 0.9 + Math.random() * 0.8,
      telegraphTimer: 0,
      telegraphMax: 0.75,
      telegraphRadius: def.isBoss ? 4.8 : 2.9,
      pendingStrike: false,
      hitFlash: 0,
      frozenTimer: 0,
      stunTimer: 0,
      isBoss: def.isBoss,
      flankSlot: slot % 5,
      enraged: false
    });
  }
  finishMatch(victory) {
    if (this.finished) return;
    this.finished = true;
    const mult = this.arena.rewardMultiplier;
    const baseGold = this.mode === "pvp_ranked" ? victory ? 240 : 75 : this.mode === "pvp_local" ? 140 : this.mode === "pvp_online" ? 120 + this.scoreP1 * 90 : this.mode === "unified_clash" ? this.kills * 28 + this.bossKills * 165 + this.scoreP1 * 90 + (victory ? 180 : 50) : this.kills * 26 + this.bossKills * 150 + (victory ? 180 : 40);
    const p1 = this.getPlayer1();
    const lootMult = p1?.statsDerived.lootMultiplier ?? 1;
    const goldEarned = Math.round((baseGold * mult + this.bonusMissionGold) * lootMult);
    const gemsEarned = this.bossKills * 9 + this.missionsDone * 2 + (this.mode === "unified_clash" ? this.scoreP1 * 3 : 0) + (victory && (this.mode === "pvp_ranked" || this.mode === "monster_raid" || this.mode === "unified_clash") ? 10 : 0) + Math.floor(this.wave / 3) * 3;
    const xpEarned = Math.round(
      (this.kills * 24 + this.wave * 35 + this.scoreP1 * 35 + this.missionsDone * 45 + (victory ? 120 : 35)) * mult * lootMult
    );
    const ratingDelta = this.mode === "pvp_ranked" ? victory ? 34 : -16 : this.mode === "pvp_online" ? this.scoreP1 * 18 : this.mode === "unified_clash" ? this.scoreP1 * 14 + (this.wave >= 3 ? 12 : 0) : 0;
    if (victory) audioSynth.playReward();
    const resultArenaId = this.arena.id === "etheria_overworld" ? this.opts.arenaId : this.arena.id;
    this.opts.onFinish({
      mode: this.mode,
      arenaId: resultArenaId,
      victory,
      kills: this.kills,
      bossKills: this.bossKills,
      critsLanded: this.critsLanded,
      fusionCasts: this.fusionCasts,
      secretBossesDefeated: this.secretBossesDefeatedCount,
      worldEventsCompleted: this.worldEventsCompletedCount,
      waveReached: this.wave,
      maxCombo: this.maxCombo,
      damageDealt: Math.round(this.damageDealt),
      durationSec: Math.round(this.time),
      goldEarned,
      gemsEarned,
      xpEarned,
      ratingDelta,
      missionsDone: this.missionsDone,
      monsterKillsByType: { ...this.monsterKillsByType },
      opponentName: this.mode === "pvp_ranked" ? this.rivalChampion.name : void 0,
      p1Score: this.scoreP1,
      p2Score: this.scoreP2
    });
  }
  step(rawDt) {
    if (this.paused || this.finished) return;
    const dt = Math.min(0.05, Math.max(1e-3, rawDt));
    this.fpsSamples = this.fpsSamples * 0.92 + 1 / dt * 0.08;
    if (this.hitstopTimer > 0) {
      this.hitstopTimer -= dt;
      return;
    }
    this.time += dt;
    if (this.bannerTimer > 0) this.bannerTimer -= dt;
    if (this.npcDialogueTimer > 0) {
      this.npcDialogueTimer -= dt;
      if (this.npcDialogueTimer <= 0) this.npcDialogue = null;
    }
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.combo = 0;
    }
    if (this.shakeTimer > 0) this.shakeTimer -= dt;
    if (this.pendingMeteors.length > 0) {
      const nextMeteors = [];
      for (const met of this.pendingMeteors) {
        met.delay -= dt;
        if (met.delay <= 0) {
          const owner = this.fighters.find((f) => f.id === met.ownerId);
          const gy = this.getTerrainHeight(met.x, met.z);
          this.rings.push({
            x: met.x,
            y: gy + 0.08,
            z: met.z,
            radius: 0.4,
            maxRadius: 3.8,
            color: met.color,
            alpha: 0.95,
            filled: true,
            life: 0.4,
            maxLife: 0.4,
            growSpeed: 9.5
          });
          this.spawnBurst(met.x, gy + 1.2, met.z, met.color, 14);
          if (owner) this.applyRadialDamage(owner, met.x, met.z, 3.8, met.damage, 6.5, true);
        } else {
          nextMeteors.push(met);
        }
      }
      this.pendingMeteors = nextMeteors;
    }
    for (const f of this.fighters) {
      this.updateFighter(f, dt);
    }
    for (const m of this.monsters) {
      this.updateMonster(m, dt);
    }
    this.monsters = this.monsters.filter((m) => m.hp > 0);
    if (this.mode === "world_explore") {
      this.overworldRespawnTimer += dt;
      if (this.overworldRespawnTimer >= 5.5 && this.monsters.length < 18) {
        this.overworldRespawnTimer = 0;
        this.spawnOverworldBiomesMonsters(18);
      }
      for (const nodeId of Object.keys(this.nodeRespawns)) {
        if (this.nodeRespawns[nodeId] > 0) {
          this.nodeRespawns[nodeId] = Math.max(0, this.nodeRespawns[nodeId] - dt);
        }
      }
      const exploreP1 = this.getPlayer1();
      if (exploreP1 && exploreP1.hp > 0) {
        this.updateOverworldStreaming(exploreP1.x, exploreP1.z);
        this.updateOverworldExplore(exploreP1, dt);
      }
    } else if (this.mode === "unified_clash" || this.mode === "free_combat" || this.mode === "monster_raid") {
      const hostileFighters = this.fighters.filter((f) => f.team === "enemy" && f.hp > 0);
      if (this.monsters.length === 0 && hostileFighters.length === 0) {
        if (this.mode === "monster_raid" && this.wave >= 6) {
          this.finishMatch(true);
          return;
        }
        this.waveDelayTimer += dt;
        if (this.waveDelayTimer >= 1.8) {
          this.waveDelayTimer = 0;
          this.spawnWave(this.wave + 1);
        }
      }
    }
    if (this.arena.hazardType === "lava_vents") {
      this.hazardTimer -= dt;
      if (this.hazardTimer <= 0) {
        this.hazardTimer = 6.5;
        const ang = Math.random() * Math.PI * 2;
        const dist = 5.5 + Math.random() * (this.arena.radius - 7.5);
        const hx = Math.cos(ang) * dist;
        const hz = Math.sin(ang) * dist;
        this.rings.push({
          x: hx,
          y: 0.08,
          z: hz,
          radius: 0.5,
          maxRadius: 3.1,
          color: "#F97316",
          alpha: 0.9,
          filled: true,
          life: 0.8,
          maxLife: 0.8,
          growSpeed: 3.4
        });
        this.spawnBurst(hx, 0.6, hz, "#FB923C", 10);
        for (const f of this.fighters) {
          if (f.hp > 0 && !f.onHighGround && Math.hypot(f.x - hx, f.z - hz) < 2.8) {
            this.damageFighter(null, f, 15, 4, false);
          }
        }
      }
    }
    this.pickupTimer -= dt;
    if (this.pickupTimer <= 0 && this.pickups.length < 4 && this.mode !== "pvp_online") {
      this.pickupTimer = 9.5;
      const a = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * (this.arena.radius - 6);
      this.pickups.push({
        id: this.nextId("pk"),
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        kind: Math.random() < 0.55 ? "heal" : "energy",
        bobPhase: Math.random() * 6
      });
    }
    const p1 = this.getPlayer1();
    if (p1 && p1.hp > 0) {
      if (p1.onHighGround) {
        this.advanceMissionProgress("highground", dt);
      }
      this.pickups = this.pickups.filter((pk) => {
        if (Math.hypot(p1.x - pk.x, p1.z - pk.z) < 1.65) {
          if (pk.kind === "heal") {
            const amt = Math.round(p1.maxHp * 0.24);
            p1.hp = Math.min(p1.maxHp, p1.hp + amt);
            this.spawnFloatingText(p1.x, p1.y + 2.4, p1.z, `+${amt} \u0635\u062D\u0629`, "#10B981", 1.1);
          } else if (pk.kind === "energy") {
            p1.energy = p1.maxEnergy;
            this.spawnFloatingText(p1.x, p1.y + 2.4, p1.z, "\u0637\u0627\u0642\u0629 \u0643\u0627\u0645\u0644\u0629!", "#38BDF8", 1.1);
          } else {
            this.bonusMissionGold += 30;
            this.spawnFloatingText(p1.x, p1.y + 2.4, p1.z, "+30 \u0630\u0647\u0628", "#F59E0B", 1.1);
          }
          audioSynth.playReward();
          return false;
        }
        return true;
      });
    }
    for (const shrine of this.arena.shrines) {
      const rem = this.shrineCooldowns[shrine.id] || 0;
      if (rem > 0) {
        this.shrineCooldowns[shrine.id] = Math.max(0, rem - dt);
        continue;
      }
      for (const fighter of this.fighters) {
        if (fighter.hp <= 0 || fighter.isRemote) continue;
        if (Math.hypot(fighter.x - shrine.x, fighter.z - shrine.z) < 2.2) {
          this.shrineCooldowns[shrine.id] = 15;
          const baseH = this.getTerrainHeight(shrine.x, shrine.z);
          if (shrine.kind === "heal") {
            const healAmt = Math.round(fighter.maxHp * 0.28);
            fighter.hp = Math.min(fighter.maxHp, fighter.hp + healAmt);
            this.spawnFloatingText(shrine.x, baseH + 2.6, shrine.z, `${shrine.label}: +${healAmt}`, "#10B981", 1.15);
            audioSynth.playReward();
          } else if (shrine.kind === "energy") {
            fighter.energy = fighter.maxEnergy;
            for (let sIdx = 0; sIdx < 4; sIdx++) {
              fighter.slotCooldowns[sIdx] = Math.max(0, fighter.slotCooldowns[sIdx] - 3.5);
            }
            fighter.powerCooldown = fighter.slotCooldowns[0];
            fighter.secondaryCooldown = fighter.slotCooldowns[1];
            this.spawnFloatingText(shrine.x, baseH + 2.6, shrine.z, `${shrine.label}: \u0637\u0627\u0642\u0629!`, "#38BDF8", 1.15);
            audioSynth.playReward();
          } else {
            fighter.overdriveTimer = Math.max(fighter.overdriveTimer, 5.5);
            fighter.overdriveActive = true;
            this.spawnFloatingText(shrine.x, baseH + 2.6, shrine.z, `${shrine.label}: +55% \u0642\u0648\u0629!`, "#F59E0B", 1.2);
            audioSynth.playPower();
          }
          if (fighter.team === "player1") {
            this.advanceMissionProgress("shrine", 1);
          }
          this.rings.push({
            x: shrine.x,
            y: baseH + 0.1,
            z: shrine.z,
            radius: 0.5,
            maxRadius: 3.4,
            color: shrine.color,
            alpha: 0.9,
            life: 0.45,
            maxLife: 0.45,
            growSpeed: 7.2
          });
          this.spawnBurst(shrine.x, baseH + 1.3, shrine.z, shrine.color, 12);
          break;
        }
      }
    }
    this.updateProjectiles(dt);
    this.updateVfx(dt);
    if (this.mode === "pvp_online" && p1) {
      this.onlineSendTimer += dt;
      if (this.onlineSendTimer >= 0.05) {
        this.onlineSendTimer = 0;
        this.opts.onOnlineStateSend?.({
          x: p1.x,
          y: p1.y,
          z: p1.z,
          yaw: p1.yaw,
          animState: p1.animState,
          animTimer: p1.animTime,
          comboStep: p1.comboStep,
          shieldActive: p1.shieldActive,
          overdriveActive: p1.overdriveActive,
          energy: p1.energy
        });
      }
    }
    this.updateCamera(dt);
  }
  updateFighter(f, dt) {
    if (f.hitFlash > 0) f.hitFlash = Math.max(0, f.hitFlash - dt * 4.5);
    if (f.frozenTimer > 0) f.frozenTimer = Math.max(0, f.frozenTimer - dt);
    if (f.stunTimer > 0) f.stunTimer = Math.max(0, f.stunTimer - dt);
    if (f.invulnTimer > 0) f.invulnTimer = Math.max(0, f.invulnTimer - dt);
    if (f.attackCooldown > 0) f.attackCooldown = Math.max(0, f.attackCooldown - dt);
    if (f.heavyCooldown > 0) f.heavyCooldown = Math.max(0, f.heavyCooldown - dt);
    if (f.powerCooldown > 0) f.powerCooldown = Math.max(0, f.powerCooldown - dt);
    if (f.secondaryCooldown > 0) f.secondaryCooldown = Math.max(0, f.secondaryCooldown - dt);
    for (let i = 0; i < 4; i++) {
      if (f.slotCooldowns[i] > 0) f.slotCooldowns[i] = Math.max(0, f.slotCooldowns[i] - dt);
    }
    if (f.dodgeCooldown > 0) f.dodgeCooldown = Math.max(0, f.dodgeCooldown - dt);
    if (f.dodgeTimer > 0) f.dodgeTimer = Math.max(0, f.dodgeTimer - dt);
    if (f.magmaTickTimer > 0) f.magmaTickTimer = Math.max(0, f.magmaTickTimer - dt);
    if (f.shieldTimer > 0) {
      f.shieldTimer -= dt;
      if (f.shieldTimer <= 0) f.shieldActive = false;
    }
    if (f.overdriveTimer > 0) {
      f.overdriveTimer -= dt;
      if (f.overdriveTimer <= 0) f.overdriveActive = false;
    }
    if (f.isRemote || f.hp <= 0) return;
    if (f.team === "player1" && this.bufferedAction) {
      if (this.time > this.bufferedAction.expiresAt) {
        this.bufferedAction = null;
      } else if (this.executeBufferedKind(f, this.bufferedAction.kind)) {
        this.bufferedAction = null;
      }
    }
    f.energy = Math.min(f.maxEnergy, f.energy + f.statsDerived.energyRegen * dt);
    f.animTime += dt;
    const groundY = this.getTerrainHeight(f.x, f.z);
    f.onHighGround = groundY > 0.25;
    let zoneSpeedMult = 1;
    f.terrainNote = f.onHighGround ? "\u0645\u0631\u062A\u0641\u0639 \u062A\u0643\u062A\u064A\u0643\u064A (+12% \u0636\u0631\u0631)" : "";
    if (this.mode === "world_explore" && Math.hypot(f.x, f.z) <= 22) {
      f.hp = Math.min(f.maxHp, f.hp + f.maxHp * 0.045 * dt);
      f.terrainNote = "\u0642\u0631\u064A\u0629 \u0627\u0644\u0645\u0644\u0627\u0630 (\u0623\u0645\u0627\u0646 \u0648\u062A\u062C\u062F\u064A\u062F \u0635\u062D\u0629)";
    }
    for (const tz of this.arena.terrainZones) {
      if (Math.hypot(f.x - tz.x, f.z - tz.z) <= tz.radius) {
        if (tz.kind === "ice_patch" || tz.kind === "rune_pad") {
          zoneSpeedMult = 1.24;
          f.terrainNote = `${tz.label} (+24% \u0633\u0631\u0639\u0629)`;
        } else if (tz.kind === "healing_spring") {
          f.hp = Math.min(f.maxHp, f.hp + f.maxHp * 0.032 * dt);
          f.terrainNote = `${tz.label} (\u062A\u062C\u062F\u064A\u062F \u0635\u062D\u0629)`;
        } else if (tz.kind === "meadow") {
          zoneSpeedMult = 1.1;
          f.terrainNote = `${tz.label} (\u062D\u0631\u0643\u0629 \u0645\u0631\u0646\u0629)`;
        } else if (tz.kind === "water_lake") {
          f.terrainNote = `${tz.label}`;
        } else if (tz.kind === "ash_land") {
          f.terrainNote = `${tz.label} (\u0645\u0646\u0637\u0642\u0629 \u0648\u062D\u0648\u0634 \u0646\u062E\u0628\u0629)`;
        } else if (tz.kind === "magma_pool" && f.y <= groundY + 0.25 && !f.shieldActive) {
          f.terrainNote = "\u062A\u062D\u0630\u064A\u0631: \u0628\u0631\u0643\u0629 \u062D\u0645\u0645!";
          if (f.magmaTickTimer <= 0) {
            f.magmaTickTimer = 1.25;
            this.damageFighter(null, f, 10, 1.5, false);
          }
        }
      }
    }
    const sprintMult = this.mode === "world_explore" && f.team === "player1" && this.sprintActive ? 1.75 : 1;
    const speedMult = (f.frozenTimer > 0 ? 0.5 : 1) * (f.overdriveActive ? 1.15 : 1) * zoneSpeedMult * sprintMult;
    let moveX = 0;
    let moveZ = 0;
    let blocking = false;
    if (f.team === "player1") {
      if (this.keys.has("KeyW") || this.mode !== "pvp_local" && this.keys.has("ArrowUp")) moveZ -= 1;
      if (this.keys.has("KeyS") || this.mode !== "pvp_local" && this.keys.has("ArrowDown")) moveZ += 1;
      if (this.keys.has("KeyA") || this.mode !== "pvp_local" && this.keys.has("ArrowLeft")) moveX -= 1;
      if (this.keys.has("KeyD") || this.mode !== "pvp_local" && this.keys.has("ArrowRight")) moveX += 1;
      if (Math.abs(this.virtualInput.mx) > 0.05 || Math.abs(this.virtualInput.mz) > 0.05) {
        moveX += this.virtualInput.mx;
        moveZ += this.virtualInput.mz;
      }
      blocking = this.keys.has("KeyF");
    } else if (f.team === "player2") {
      if (this.keys.has("ArrowUp")) moveZ -= 1;
      if (this.keys.has("ArrowDown")) moveZ += 1;
      if (this.keys.has("ArrowLeft")) moveX -= 1;
      if (this.keys.has("ArrowRight")) moveX += 1;
      blocking = this.keys.has("KeyM");
    } else if (f.isAi) {
      const aiMove = this.computeAiFighterControl(f, dt);
      moveX = aiMove.mx;
      moveZ = aiMove.mz;
      blocking = aiMove.blocking;
    }
    if (!f.isAi && (moveX !== 0 || moveZ !== 0)) {
      const len = Math.hypot(moveX, moveZ) || 1;
      moveX /= len;
      moveZ /= len;
      const cos = Math.cos(this.camYaw);
      const sin = Math.sin(this.camYaw);
      const rx = moveX * cos + moveZ * sin;
      const rz = -moveX * sin + moveZ * cos;
      moveX = rx;
      moveZ = rz;
    }
    if (f.stunTimer <= 0 && f.dodgeTimer <= 0) {
      if (blocking) {
        f.animState = "block";
        f.vx *= 0.8;
        f.vz *= 0.8;
      } else if (Math.abs(moveX) > 0.01 || Math.abs(moveZ) > 0.01) {
        const sp = f.statsDerived.moveSpeed * speedMult;
        f.vx += (moveX * sp - f.vx) * Math.min(1, dt * 22);
        f.vz += (moveZ * sp - f.vz) * Math.min(1, dt * 22);
        if (f.animState !== "attack" && f.animState !== "heavy" && f.animState !== "power") {
          f.yaw = Math.atan2(moveX, moveZ);
          f.animState = "run";
        }
        f.walkPhase += dt * (sp / 5.8);
      } else {
        f.vx *= Math.pow(0.015, dt);
        f.vz *= Math.pow(0.015, dt);
        if (f.animState === "run" || f.animState === "block") {
          f.animState = "idle";
        }
      }
    } else {
      f.vx *= Math.pow(0.25, dt);
      f.vz *= Math.pow(0.25, dt);
    }
    if (f.animState === "attack" && f.animTime > 0.3 || f.animState === "heavy" && f.animTime > 0.44 || f.animState === "power" && f.animTime > 0.46 || f.animState === "dodge" && f.dodgeTimer <= 0) {
      f.animState = "idle";
    }
    f.x += f.vx * dt;
    f.z += f.vz * dt;
    this.constrainToArena(f);
    const targetGround = this.getTerrainHeight(f.x, f.z);
    if (f.vy > 0 || f.y > targetGround + 0.02) {
      f.vy -= 18 * dt;
      f.y += f.vy * dt;
      if (f.y <= targetGround) {
        f.y = targetGround;
        f.vy = 0;
      }
    } else {
      f.y += (targetGround - f.y) * Math.min(1, dt * 14);
    }
  }
  computeAiFighterControl(ai, dt) {
    const p1 = this.getPlayer1();
    if (!p1 || p1.hp <= 0) return { mx: 0, mz: 0, blocking: false };
    ai.aiDecisionTimer -= dt;
    if (ai.aiDecisionTimer <= 0) {
      ai.aiDecisionTimer = 0.45 + Math.random() * 0.65;
      ai.aiStrafeDir = Math.random() < 0.5 ? -1 : 1;
    }
    if (ai.hp < ai.maxHp * 0.55) {
      for (const sh of this.arena.shrines) {
        if (sh.kind === "heal" && (this.shrineCooldowns[sh.id] || 0) <= 0) {
          const sx = sh.x - ai.x;
          const sz = sh.z - ai.z;
          const sd = Math.hypot(sx, sz) || 1;
          ai.yaw = Math.atan2(sx, sz);
          return { mx: sx / sd, mz: sz / sd, blocking: false };
        }
      }
    } else {
      for (const sh of this.arena.shrines) {
        if (sh.kind === "fury" && (this.shrineCooldowns[sh.id] || 0) <= 0) {
          const sx = sh.x - ai.x;
          const sz = sh.z - ai.z;
          const sd = Math.hypot(sx, sz);
          if (sd < 7.5) {
            ai.yaw = Math.atan2(sx, sz);
            return { mx: sx / (sd || 1), mz: sz / (sd || 1), blocking: false };
          }
        }
      }
    }
    const dx = p1.x - ai.x;
    const dz = p1.z - ai.z;
    const dist = Math.hypot(dx, dz) || 1;
    ai.yaw = Math.atan2(dx, dz);
    const weapon = WEAPONS[ai.avatar.weaponId] || WEAPONS.vanguard_sword;
    const idealDist = weapon.isRanged ? 8.6 : weapon.range * 0.85;
    if (dist < 4.5 && (p1.animState === "heavy" || p1.animState === "power")) {
      if (ai.dodgeCooldown <= 0 && Math.random() < ai.aiDifficulty * 0.68) {
        ai.yaw = Math.atan2(-dz * ai.aiStrafeDir, dx * ai.aiStrafeDir);
        this.triggerDodge(ai);
        return { mx: 0, mz: 0, blocking: false };
      }
      if (Math.random() < ai.aiDifficulty * 0.45) {
        return { mx: 0, mz: 0, blocking: true };
      }
    }
    if (dist < 7.5 && ai.slotCooldowns[0] <= 0 && ai.energy >= 45 && Math.random() < 0.045 * ai.aiDifficulty) {
      this.triggerSkillSlot(ai, 0);
      return { mx: 0, mz: 0, blocking: false };
    }
    if (ai.slotCooldowns[1] <= 0 && ai.energy >= 40 && (ai.hp < ai.maxHp * 0.7 || dist < 6) && Math.random() < 0.035 * ai.aiDifficulty) {
      this.triggerSkillSlot(ai, 1);
      return { mx: 0, mz: 0, blocking: false };
    }
    if (dist <= weapon.range + 0.5) {
      if (ai.heavyCooldown <= 0 && Math.random() < 0.055 * ai.aiDifficulty) {
        this.triggerHeavySkill(ai);
      } else if (ai.attackCooldown <= 0 && Math.random() < 0.16 * ai.aiDifficulty) {
        this.triggerPrimaryAttack(ai);
      }
      return {
        mx: -dz / dist * ai.aiStrafeDir * 0.6,
        mz: dx / dist * ai.aiStrafeDir * 0.6,
        blocking: false
      };
    }
    const dir = dist > idealDist ? 1 : -0.65;
    return {
      mx: dx / dist * dir + -dz / dist * ai.aiStrafeDir * 0.28,
      mz: dz / dist * dir + dx / dist * ai.aiStrafeDir * 0.28,
      blocking: false
    };
  }
  updateMonster(m, dt) {
    if (m.hitFlash > 0) m.hitFlash = Math.max(0, m.hitFlash - dt * 4.5);
    if (m.frozenTimer > 0) m.frozenTimer = Math.max(0, m.frozenTimer - dt);
    if (m.stunTimer > 0) m.stunTimer = Math.max(0, m.stunTimer - dt);
    if (m.attackTimer > 0) m.attackTimer = Math.max(0, m.attackTimer - dt);
    if (m.attackCooldown > 0) m.attackCooldown = Math.max(0, m.attackCooldown - dt);
    const def = MONSTERS[m.archetype] || MONSTERS.ash_stalker;
    const p1 = this.getPlayer1();
    if (!p1 || p1.hp <= 0) return;
    const dx = p1.x - m.x;
    const dz = p1.z - m.z;
    const dist = Math.hypot(dx, dz) || 1;
    const speedMult = (m.frozenTimer > 0 ? 0.42 : 1) * (m.enraged ? 1.25 : 1);
    if (this.mode === "world_explore") {
      const p1InSafeVillage = Math.hypot(p1.x, p1.z) <= 17.5;
      if (dist > 20 || p1InSafeVillage) {
        m.vx *= Math.pow(0.08, dt);
        m.vz *= Math.pow(0.08, dt);
        m.telegraphTimer = 0;
        m.pendingStrike = false;
        const dOrigin = Math.hypot(m.x, m.z);
        if (dOrigin < 19 && dOrigin > 0.1) {
          m.x = m.x / dOrigin * 19.2;
          m.z = m.z / dOrigin * 19.2;
        }
        return;
      }
    }
    if (m.telegraphTimer > 0) {
      m.telegraphTimer -= dt;
      m.vx *= 0.85;
      m.vz *= 0.85;
      if (m.telegraphTimer <= 0 && m.pendingStrike) {
        m.pendingStrike = false;
        m.attackTimer = 0.36;
        if (m.archetype === "venom_crawler") {
          m.vx = dx / dist * 14.5;
          m.vz = dz / dist * 14.5;
        }
        this.rings.push({
          x: m.x,
          y: m.y + 0.08,
          z: m.z,
          radius: 0.5,
          maxRadius: m.telegraphRadius,
          color: def.accentColor,
          alpha: 0.9,
          life: 0.35,
          maxLife: 0.35,
          growSpeed: m.telegraphRadius * 2.8
        });
        this.spawnBurst(m.x, m.y + 0.8, m.z, def.accentColor, 12);
        if (Math.hypot(p1.x - m.x, p1.z - m.z) <= m.telegraphRadius + 0.45) {
          this.damageFighter(null, p1, def.damage, m.isBoss ? 9.5 : 6.5, m.isBoss);
        }
        if (m.archetype === "void_colossus") {
          const baseAng = Math.atan2(dx, dz);
          [-0.35, 0, 0.35].forEach((off) => {
            const a = baseAng + off;
            this.projectiles.push({
              id: this.nextId("mp"),
              ownerId: m.id,
              team: "enemy",
              x: m.x + Math.sin(a) * 1.1,
              y: m.y + 1.5,
              z: m.z + Math.cos(a) * 1.1,
              vx: Math.sin(a) * 12.5,
              vz: Math.cos(a) * 12.5,
              color: def.accentColor,
              coreColor: "#38BDF8",
              radius: 0.34,
              kind: "orb",
              damage: Math.round(def.damage * 0.72),
              knockback: 5,
              life: 2,
              homing: false,
              critical: false
            });
          });
        }
      }
    } else if (m.stunTimer <= 0) {
      m.yaw = Math.atan2(dx, dz);
      if (def.isRanged && dist < 4.2) {
        const sp = def.speed * speedMult * 0.88;
        m.vx += (-(dx / dist) * sp - m.vx) * Math.min(1, dt * 6);
        m.vz += (-(dz / dist) * sp - m.vz) * Math.min(1, dt * 6);
        m.walkPhase += dt * (sp / 4.2);
      } else if (dist > def.attackRange) {
        const flankAng = m.yaw + (m.flankSlot - 2) * (dist > 4.5 ? 0.42 : 0.12);
        const sp = def.speed * speedMult;
        m.vx += (Math.sin(flankAng) * sp - m.vx) * Math.min(1, dt * 6);
        m.vz += (Math.cos(flankAng) * sp - m.vz) * Math.min(1, dt * 6);
        m.walkPhase += dt * (sp / 4.2);
      } else {
        m.vx *= Math.pow(0.08, dt);
        m.vz *= Math.pow(0.08, dt);
        if (m.attackCooldown <= 0) {
          const cdMult = m.enraged ? 0.76 : 1;
          if (def.isRanged) {
            m.attackCooldown = 1.75 * cdMult;
            m.attackTimer = 0.25;
            this.projectiles.push({
              id: this.nextId("mp"),
              ownerId: m.id,
              team: "enemy",
              x: m.x + dx / dist * 0.8,
              y: m.y + 1.2,
              z: m.z + dz / dist * 0.8,
              vx: dx / dist * 12.2,
              vz: dz / dist * 12.2,
              color: m.archetype === "frost_specter" ? "#38BDF8" : "#F97316",
              coreColor: "#FEF08A",
              radius: 0.28,
              kind: "fireball",
              damage: def.damage,
              knockback: 4,
              life: 1.85,
              homing: false,
              critical: false,
              chillEffect: m.archetype === "frost_specter"
            });
          } else if (m.archetype === "obsidian_golem" || m.archetype === "venom_crawler" || m.isBoss) {
            m.telegraphTimer = m.archetype === "venom_crawler" ? 0.45 : m.isBoss ? 0.7 : 0.78;
            m.pendingStrike = true;
            m.attackCooldown = (m.isBoss ? 2 : 2.4) * cdMult;
          } else {
            m.attackCooldown = 1.2 * cdMult;
            m.attackTimer = 0.28;
            if (dist <= def.attackRange + 0.75) {
              this.damageFighter(null, p1, def.damage, 4.2, false);
            }
          }
        }
      }
    }
    for (const other of this.monsters) {
      if (other.id === m.id) continue;
      const sx = m.x - other.x;
      const sz = m.z - other.z;
      const sd = Math.hypot(sx, sz);
      if (sd > 0.01 && sd < 1.48) {
        m.vx += sx / sd * 3.8 * dt;
        m.vz += sz / sd * 3.8 * dt;
      }
    }
    m.x += m.vx * dt;
    m.z += m.vz * dt;
    if (this.mode === "world_explore") {
      const dCenter = Math.hypot(m.x, m.z);
      if (dCenter < 18.8 && dCenter > 0.1) {
        m.x = m.x / dCenter * 18.8;
        m.z = m.z / dCenter * 18.8;
      }
    }
    this.constrainToArena(m);
    const groundY = this.getTerrainHeight(m.x, m.z);
    m.y += (groundY - m.y) * Math.min(1, dt * 12);
  }
  updateOverworldExplore(p1, _dt) {
    const regions = this.arena.regions || [];
    const coord = { cx: Math.round(p1.x / CHUNK_SIZE), cz: Math.round(p1.z / CHUNK_SIZE) };
    const chunkBiome = classifyChunkBiome(coord.cx, coord.cz);
    let matchedRegionName = chunkBiome.name;
    for (const reg of regions) {
      if (Math.hypot(p1.x - reg.x, p1.z - reg.z) <= reg.radius) {
        matchedRegionName = reg.name;
        if (!this.discoveredRegions.has(reg.id)) {
          this.discoveredRegions.add(reg.id);
          this.bonusMissionGold += reg.rewardGold;
          this.opts.onDiscoverRegion?.(reg.id, reg.name, reg.rewardGold, reg.rewardXp);
          audioSynth.playReward();
          this.showBanner(`\u0627\u0643\u062A\u0634\u0641\u062A \u0625\u0642\u0644\u064A\u0645\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B: ${reg.name}! (+${reg.rewardGold} \u0630\u0647\u0628\u060C +${reg.rewardXp} \u062E\u0628\u0631\u0629)`, 3.2);
          this.spawnFloatingText(p1.x, p1.y + 2.6, p1.z, `\u0625\u0642\u0644\u064A\u0645 \u062C\u062F\u064A\u062F: ${reg.name}`, "#38BDF8", 1.2);
        }
        break;
      }
    }
    this.currentRegionName = matchedRegionName;
    for (const ws of this.arena.worldWaystones || []) {
      if (!this.discoveredWaystones.has(ws.id) && Math.hypot(p1.x - ws.x, p1.z - ws.z) <= 10.5) {
        this.discoveredWaystones.add(ws.id);
        audioSynth.playReward();
        this.showBanner(`\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u062D\u062C\u0631 \u0627\u0646\u062A\u0642\u0627\u0644: ${ws.name} (\u0627\u0636\u063A\u0637 [M] \u0644\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u0633\u0631\u064A\u0639)`, 3);
        this.spawnFloatingText(ws.x, 3.4, ws.z, `\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 ${ws.name}`, "#38BDF8", 1.2);
      }
    }
    let best = null;
    let bestDist = Infinity;
    for (const chest of this.streamedChests) {
      if (this.openedChests.has(chest.id)) continue;
      const d = Math.hypot(p1.x - chest.x, p1.z - chest.z);
      if (d <= 4 && d < bestDist) {
        bestDist = d;
        const chestLabel = chest.tier === "mythic" ? "\u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A" : "\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0643\u0646\u0632";
        best = {
          kind: "chest",
          targetId: chest.id,
          label: `\u0627\u0641\u062A\u062D ${chestLabel}`,
          sublabel: `+${chest.gold} \u0630\u0647\u0628 \u0648 ${chest.gems} \u062C\u0648\u0627\u0647\u0631`
        };
      }
    }
    for (const node of this.streamedNodes) {
      if ((this.nodeRespawns[node.id] || 0) > 0) continue;
      const d = Math.hypot(p1.x - node.x, p1.z - node.z);
      if (d <= 3.8 && d < bestDist) {
        bestDist = d;
        best = {
          kind: "node",
          targetId: node.id,
          label: `\u0627\u062C\u0645\u0639 ${node.label}`,
          sublabel: "\u0645\u0648\u0631\u062F \u0644\u062D\u0642\u064A\u0628\u0629 \u0627\u0644\u0646\u0642\u0627\u0628\u0629 \u0648\u0627\u0644\u0639\u0642\u0648\u062F"
        };
      }
    }
    for (const npc of this.arena.worldNpcs || []) {
      const d = Math.hypot(p1.x - npc.x, p1.z - npc.z);
      if (d <= 4.2 && d < bestDist) {
        bestDist = d;
        best = {
          kind: "npc",
          targetId: npc.id,
          label: `\u062A\u062D\u062F\u0651\u062B \u0645\u0639 ${npc.name} (${npc.serviceLabel})`,
          sublabel: npc.title
        };
      }
    }
    for (const portal of this.arena.worldPortals || []) {
      const d = Math.hypot(p1.x - portal.x, p1.z - portal.z);
      if (d <= 4 && d < bestDist) {
        bestDist = d;
        best = {
          kind: "portal",
          targetId: portal.id,
          arenaId: portal.arenaId,
          label: `\u0627\u062F\u062E\u0644 ${portal.label}`,
          sublabel: "\u0627\u0646\u062A\u0642\u0627\u0644 \u0641\u0648\u0631\u064A \u0625\u0644\u0649 \u0633\u0627\u062D\u0629 \u0627\u0644\u0642\u062A\u0627\u0644"
        };
      }
    }
    for (const sb of SECRET_WORLD_BOSSES) {
      if (this.defeatedSecretBossIds.has(sb.id)) continue;
      if (this.monsters.some((m) => m.secretBossId === sb.id && m.hp > 0)) continue;
      const d = Math.hypot(p1.x - sb.x, p1.z - sb.z);
      if (d <= 5.5 && d < bestDist) {
        bestDist = d;
        best = {
          kind: "secret_boss",
          targetId: sb.id,
          label: `\u0627\u0633\u062A\u062F\u0639\u0650 \u0627\u0644\u0632\u0639\u064A\u0645 \u0627\u0644\u0633\u0631\u064A: ${sb.name}`,
          sublabel: `${sb.title} \xB7 \u062C\u0627\u0626\u0632\u0629 +${sb.rewardGold} \u0630\u0647\u0628 \u0648\u0644\u0642\u0628 \u062D\u0635\u0631\u064A`
        };
      }
    }
    for (const evt of WORLD_EVENT_ZONES) {
      if (this.completedWorldEventIds.has(evt.id) || this.activeEventZone) continue;
      const d = Math.hypot(p1.x - evt.x, p1.z - evt.z);
      if (d <= 6.5 && d < bestDist) {
        bestDist = d;
        best = {
          kind: "event_zone",
          targetId: evt.id,
          label: `\u0627\u0628\u062F\u0623 \u0627\u0644\u062D\u062F\u062B \u0627\u0644\u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A: ${evt.name}`,
          sublabel: `${evt.waveCount} \u0645\u0648\u062C\u0627\u062A \xB7 +${evt.rewardGold} \u0630\u0647\u0628 \u0648 +${evt.rewardGems} \u062C\u0648\u0647\u0631\u0629`
        };
      }
    }
    if (this.activeEventZone) {
      const evt = this.activeEventZone.def;
      const remaining = this.monsters.filter((m) => m.hp > 0 && m.eventZoneId === evt.id).length;
      if (remaining === 0) {
        if (this.activeEventZone.wave < this.activeEventZone.waveCount) {
          this.activeEventZone.wave += 1;
          this.spawnWorldEventWave(evt, this.activeEventZone.wave);
          audioSynth.playWorldEventHorn();
          this.showBanner(`${evt.name} \u2014 \u0627\u0644\u0645\u0648\u062C\u0629 ${this.activeEventZone.wave} \u0645\u0646 ${this.activeEventZone.waveCount}!`, 3);
        } else {
          this.completedWorldEventIds.add(evt.id);
          this.worldEventsCompletedCount += 1;
          this.bonusMissionGold += evt.rewardGold;
          this.opts.onCompleteWorldEvent?.(evt);
          audioSynth.playAchievementUnlock();
          this.rings.push({
            x: evt.x,
            y: 0.14,
            z: evt.z,
            radius: 0.8,
            maxRadius: 9.5,
            color: evt.color,
            alpha: 0.98,
            life: 0.65,
            maxLife: 0.65,
            growSpeed: 15,
            isFusion: true,
            secondaryColor: "#FDE047"
          });
          this.spawnFloatingText(p1.x, p1.y + 2.7, p1.z, `\u0627\u0643\u062A\u0645\u0644 \u062D\u062F\u062B: ${evt.name}!`, "#38BDF8", 1.3);
          this.showBanner(
            `\u0627\u0646\u062A\u0635\u0631 \u0627\u0644\u0623\u062B\u064A\u0631! \u0623\u0643\u0645\u0644\u062A ${evt.name} (+${evt.rewardGold} \u0630\u0647\u0628\u060C +${evt.rewardGems} \u062C\u0648\u0647\u0631\u0629\u060C +${evt.rewardMarks} \u0634\u0627\u0631\u0629)`,
            4
          );
          this.activeEventZone = null;
        }
      }
    }
    this.nearbyInteractable = best;
  }
  constrainToArena(ent) {
    const maxR = this.arena.radius - 0.85;
    const dist = Math.hypot(ent.x, ent.z);
    if (dist > maxR) {
      ent.x = ent.x / dist * maxR;
      ent.z = ent.z / dist * maxR;
    }
    for (const pillar of this.arena.pillars) {
      const dx = ent.x - pillar.x;
      const dz = ent.z - pillar.z;
      const d = Math.hypot(dx, dz);
      const minD = pillar.radius + 0.65;
      if (d > 1e-3 && d < minD) {
        ent.x = pillar.x + dx / d * minD;
        ent.z = pillar.z + dz / d * minD;
      }
    }
  }
  updateProjectiles(dt) {
    const alive = [];
    for (const p of this.projectiles) {
      p.life -= dt;
      if (p.life <= 0) continue;
      if (p.homing && p.team === "player1") {
        const target = this.findNearestHostile({ team: p.team, x: p.x, z: p.z });
        if (target && target.dist < 11) {
          const dx = target.x - p.x;
          const dz = target.z - p.z;
          const d = Math.hypot(dx, dz) || 1;
          const sp = Math.hypot(p.vx, p.vz);
          p.vx += (dx / d * sp - p.vx) * dt * 4.8;
          p.vz += (dz / d * sp - p.vz) * dt * 4.8;
        }
      }
      p.x += p.vx * dt;
      p.z += p.vz * dt;
      let hitSolid = false;
      for (const pillar of this.arena.pillars) {
        if (Math.hypot(p.x - pillar.x, p.z - pillar.z) < pillar.radius + p.radius) {
          hitSolid = true;
          this.spawnBurst(p.x, p.y, p.z, p.color, 5);
          break;
        }
      }
      if (hitSolid) continue;
      const ownerFighter = this.fighters.find((f) => f.id === p.ownerId) || null;
      if (p.team !== "enemy") {
        for (const m of this.monsters) {
          if (m.hp <= 0) continue;
          if (Math.hypot(p.x - m.x, p.z - m.z) < (MONSTERS[m.archetype]?.scale || 1) * 0.8 + p.radius) {
            if (ownerFighter) this.damageMonster(ownerFighter, m, p.damage, p.knockback, p.critical);
            hitSolid = true;
            break;
          }
        }
      }
      if (hitSolid) continue;
      for (const f of this.fighters) {
        if (f.id === p.ownerId || f.team === p.team || f.hp <= 0) continue;
        if (Math.hypot(p.x - f.x, p.z - f.z) < 0.85 + p.radius) {
          if (p.chillEffect) f.frozenTimer = Math.max(f.frozenTimer, 1.3);
          this.damageFighter(ownerFighter, f, p.damage, p.knockback, p.critical);
          hitSolid = true;
          break;
        }
      }
      if (!hitSolid) alive.push(p);
    }
    this.projectiles = alive;
  }
  updateVfx(dt) {
    this.slashes = this.slashes.filter((s) => {
      s.life -= dt;
      s.alpha = Math.max(0, s.life / s.maxLife * 0.88);
      return s.life > 0;
    });
    this.rings = this.rings.filter((r) => {
      r.life -= dt;
      r.radius = Math.min(r.maxRadius, r.radius + r.growSpeed * dt);
      r.alpha = Math.max(0, r.life / r.maxLife * 0.9);
      return r.life > 0;
    });
    this.lightnings = this.lightnings.filter((l) => {
      l.life -= dt;
      l.alpha = Math.max(0, l.life / l.maxLife);
      return l.life > 0;
    });
    this.dashTrails = this.dashTrails.filter((d) => {
      d.life -= dt;
      d.alpha = Math.max(0, d.life / d.maxLife * 0.82);
      return d.life > 0;
    });
    this.floatingTexts = this.floatingTexts.filter((ft) => {
      ft.life -= dt;
      ft.y += ft.vy * dt;
      ft.alpha = Math.max(0, ft.life / ft.maxLife);
      return ft.life > 0;
    });
    this.particles = this.particles.filter((pt) => {
      pt.life -= dt;
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.z += pt.vz * dt;
      pt.alpha = Math.max(0, pt.life / pt.maxLife);
      return pt.life > 0;
    });
    const targetMotes = this.quality === "eco" ? 5 : this.quality === "balanced" ? 16 : 26;
    if (this.particles.length < targetMotes && Math.random() < 0.3) {
      this.spawnAmbientMote();
    }
  }
  spawnAmbientMote() {
    const p1 = this.getPlayer1();
    const cx = this.mode === "world_explore" && p1 ? p1.x : 0;
    const cz = this.mode === "world_explore" && p1 ? p1.z : 0;
    const maxR = this.mode === "world_explore" ? 52 : this.arena.radius;
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * maxR;
    const isSnow = this.arena.id === "glacier_spire";
    this.particles.push({
      x: cx + Math.cos(a) * r,
      y: isSnow ? 5 + Math.random() * 4 : 0.4 + Math.random() * 2.5,
      z: cz + Math.sin(a) * r,
      vx: (Math.random() - 0.5) * 0.6,
      vy: isSnow ? -1.1 : 0.7 + Math.random() * 0.6,
      vz: (Math.random() - 0.5) * 0.6,
      size: isSnow ? 4 : 3.2,
      color: this.arena.ambientParticleColor,
      alpha: 0.55,
      life: 2.5 + Math.random() * 2,
      maxLife: 4.5
    });
  }
  spawnBurst(x, y, z, color, count) {
    const actual = this.quality === "eco" ? Math.max(3, Math.floor(count * 0.45)) : count;
    for (let i = 0; i < actual; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 1.8 + Math.random() * 4.5;
      this.particles.push({
        x,
        y,
        z,
        vx: Math.cos(a) * sp,
        vy: 1.5 + Math.random() * 3.8,
        vz: Math.sin(a) * sp,
        size: 3.5 + Math.random() * 3,
        color,
        alpha: 0.95,
        life: 0.35 + Math.random() * 0.3,
        maxLife: 0.65
      });
    }
  }
  spawnFloatingText(x, y, z, text, color, scale = 1) {
    this.floatingTexts.push({
      x: x + (Math.random() - 0.5) * 0.4,
      y,
      z,
      vy: 1.65,
      text,
      color,
      alpha: 1,
      scale,
      life: 0.95,
      maxLife: 0.95
    });
  }
  addCameraShake(duration, intensity) {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    this.shakeTimer = Math.max(this.shakeTimer, duration);
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
  }
  updateCamera(dt) {
    const p1 = this.getPlayer1();
    if (!p1) return;
    let focusX = p1.x;
    let focusZ = p1.z;
    if (this.mode === "pvp_local" || this.mode === "pvp_ranked") {
      const opp = this.fighters.find((f) => f.team !== "player1");
      if (opp) {
        focusX = (p1.x + opp.x) * 0.5;
        focusZ = (p1.z + opp.z) * 0.5;
      }
    }
    let desiredPos = { x: focusX, y: 10, z: focusZ + 12 };
    let desiredTarget = { x: focusX, y: 1.4 + p1.y * 0.4, z: focusZ };
    if (this.cameraView === "third_person") {
      const dist = 10.6;
      const height = 6.2 + p1.y * 0.5;
      desiredPos = {
        x: focusX + Math.sin(this.camYaw) * dist,
        y: height,
        z: focusZ + Math.cos(this.camYaw) * dist
      };
      desiredTarget = { x: focusX, y: 1.6 + p1.y * 0.4, z: focusZ };
      this.camera.fov = 50;
    } else if (this.cameraView === "over_shoulder") {
      const dist = 6.2;
      const height = 3.2 + p1.y * 0.5;
      const sideX = Math.cos(this.camYaw) * 1.15;
      const sideZ = -Math.sin(this.camYaw) * 1.15;
      desiredPos = {
        x: focusX + Math.sin(this.camYaw) * dist + sideX,
        y: height,
        z: focusZ + Math.cos(this.camYaw) * dist + sideZ
      };
      desiredTarget = {
        x: focusX - Math.sin(this.camYaw) * 2.2 + sideX * 0.4,
        y: 1.7 + p1.y * 0.4,
        z: focusZ - Math.cos(this.camYaw) * 2.2 + sideZ * 0.4
      };
      this.camera.fov = 54;
    } else if (this.cameraView === "isometric_3d") {
      const dist = 15.8;
      const height = 12.6 + p1.y * 0.4;
      desiredPos = {
        x: focusX + Math.sin(this.camYaw) * dist,
        y: height,
        z: focusZ + Math.cos(this.camYaw) * dist
      };
      desiredTarget = { x: focusX, y: 1, z: focusZ };
      this.camera.fov = 44;
    } else if (this.cameraView === "top_tactical") {
      const dist = 11.5;
      const height = 21.5 + p1.y * 0.4;
      desiredPos = {
        x: focusX + Math.sin(this.camYaw) * dist,
        y: height,
        z: focusZ + Math.cos(this.camYaw) * dist
      };
      desiredTarget = { x: focusX, y: 0.6, z: focusZ };
      this.camera.fov = 45;
    } else if (this.cameraView === "cinematic_free") {
      const dist = 9;
      const height = 2.85 + p1.y * 0.45;
      desiredPos = {
        x: focusX + Math.sin(this.camYaw) * dist,
        y: height,
        z: focusZ + Math.cos(this.camYaw) * dist
      };
      desiredTarget = { x: focusX, y: 1.85 + p1.y * 0.4, z: focusZ };
      this.camera.fov = 58;
    } else {
      const dist = 13;
      const height = 4 + p1.y * 0.5;
      desiredPos = {
        x: focusX + Math.sin(this.camYaw) * dist,
        y: height,
        z: focusZ + Math.cos(this.camYaw) * dist
      };
      desiredTarget = { x: focusX, y: 1.55 + p1.y * 0.4, z: focusZ };
      this.camera.fov = 46;
    }
    const lerp = 1 - Math.exp(-8.5 * dt);
    this.camera.pos.x += (desiredPos.x - this.camera.pos.x) * lerp;
    this.camera.pos.y += (desiredPos.y - this.camera.pos.y) * lerp;
    this.camera.pos.z += (desiredPos.z - this.camera.pos.z) * lerp;
    this.camera.target.x += (desiredTarget.x - this.camera.target.x) * lerp;
    this.camera.target.y += (desiredTarget.y - this.camera.target.y) * lerp;
    this.camera.target.z += (desiredTarget.z - this.camera.target.z) * lerp;
    if (this.shakeTimer > 0) {
      const mag = this.shakeIntensity * (this.shakeTimer / 0.25);
      this.camera.pos.x += (Math.random() - 0.5) * mag;
      this.camera.pos.y += (Math.random() - 0.5) * mag;
    }
  }
  getRenderPayload() {
    const gatheredNodeIds = Object.entries(this.nodeRespawns).filter(([, rem]) => rem > 0).map(([id]) => id);
    const activeArena = this.mode === "world_explore" ? {
      ...this.arena,
      sceneryProps: this.streamedProps,
      worldNodes: this.streamedNodes,
      worldChests: this.streamedChests,
      worldWaystones: this.streamedWaystones
    } : this.arena;
    return {
      arena: activeArena,
      time: this.time,
      quality: this.quality,
      fighters: this.fighters,
      monsters: this.monsters,
      projectiles: this.projectiles,
      rings: this.rings,
      slashes: this.slashes,
      lightnings: this.lightnings,
      dashTrails: this.dashTrails,
      pickups: this.pickups,
      particles: this.particles,
      floatingTexts: this.floatingTexts,
      shrineCooldowns: { ...this.shrineCooldowns },
      showFloorLabels: true,
      openedChests: Array.from(this.openedChests),
      gatheredNodeIds,
      discoveredWaystoneIds: Array.from(this.discoveredWaystones),
      nearbyInteractable: this.nearbyInteractable ? { label: this.nearbyInteractable.label, kind: this.nearbyInteractable.kind } : null,
      isOverworld: this.mode === "world_explore",
      biomeSkyTint: this.mode === "world_explore" ? this.currentBiomeSkyTint : void 0,
      secretBossShrines: this.mode === "world_explore" ? SECRET_WORLD_BOSSES : void 0,
      defeatedSecretBossIds: Array.from(this.defeatedSecretBossIds),
      worldEventZones: this.mode === "world_explore" ? WORLD_EVENT_ZONES : void 0,
      completedWorldEventIds: Array.from(this.completedWorldEventIds),
      activeEventZoneId: this.activeEventZone?.def.id
    };
  }
  getHudSnapshot() {
    const p1 = this.getPlayer1();
    const opp = this.fighters.find((f) => f.team !== "player1" && f.hp > 0);
    const boss = this.monsters.find((m) => m.isBoss && m.hp > 0);
    const cdr = p1 ? p1.statsDerived.cooldownReduction : 0;
    const netBonus = computeSkillNetworkBonuses(this.unlockedNetworkNodes);
    const slots = p1?.avatar.powerSlots || [
      p1?.avatar.powerId || "inferno_nova",
      p1?.avatar.secondaryPowerId || "holy_sanctuary",
      "thunder_strike",
      "shadow_blink"
    ];
    const calcSlotMax = (sIdx) => {
      const pId = slots[sIdx];
      const lv = this.powerLevels[pId] || 1;
      const factor = Math.max(0.35, 1 - cdr - netBonus.cdrMult - (lv - 1) * 0.06);
      return Number(((POWERS[pId]?.cooldown || 6) * factor).toFixed(1));
    };
    const slotMaxCooldowns = [
      calcSlotMax(0),
      calcSlotMax(1),
      calcSlotMax(2),
      calcSlotMax(3)
    ];
    const slotCooldowns = p1 ? [
      Number(p1.slotCooldowns[0].toFixed(1)),
      Number(p1.slotCooldowns[1].toFixed(1)),
      Number(p1.slotCooldowns[2].toFixed(1)),
      Number(p1.slotCooldowns[3].toFixed(1))
    ] : [0, 0, 0, 0];
    const radarPoints = [];
    if (p1) {
      radarPoints.push({ x: p1.x, z: p1.z, kind: "player" });
    }
    for (const s of this.arena.shrines) {
      const cd = this.shrineCooldowns[s.id] || 0;
      radarPoints.push({
        x: s.x,
        z: s.z,
        kind: cd > 0 ? "shrine_cd" : s.kind === "heal" ? "shrine_heal" : s.kind === "energy" ? "shrine_energy" : "shrine_fury"
      });
    }
    if (this.mode === "world_explore") {
      for (const c of this.streamedChests) {
        if (!this.openedChests.has(c.id)) radarPoints.push({ x: c.x, z: c.z, kind: "chest" });
      }
      for (const nNode of this.streamedNodes) {
        if ((this.nodeRespawns[nNode.id] || 0) <= 0) {
          radarPoints.push({ x: nNode.x, z: nNode.z, kind: "node" });
        }
      }
      for (const ws of this.arena.worldWaystones || []) {
        radarPoints.push({ x: ws.x, z: ws.z, kind: "waystone" });
      }
      for (const pr of this.arena.worldPortals || []) {
        radarPoints.push({ x: pr.x, z: pr.z, kind: "portal" });
      }
      for (const n of this.arena.worldNpcs || []) {
        radarPoints.push({ x: n.x, z: n.z, kind: "npc" });
      }
      for (const sb of SECRET_WORLD_BOSSES) {
        if (!this.defeatedSecretBossIds.has(sb.id)) {
          radarPoints.push({ x: sb.x, z: sb.z, kind: "secret_boss" });
        }
      }
      for (const evt of WORLD_EVENT_ZONES) {
        if (!this.completedWorldEventIds.has(evt.id)) {
          radarPoints.push({ x: evt.x, z: evt.z, kind: "event_zone" });
        }
      }
    }
    for (const m of this.monsters) {
      if (m.hp <= 0) continue;
      if (this.mode === "world_explore" && p1 && Math.hypot(m.x - p1.x, m.z - p1.z) > 180) continue;
      radarPoints.push({ x: m.x, z: m.z, kind: m.isBoss ? "boss" : "monster" });
    }
    for (const f of this.fighters) {
      if (f.team === "player1" || f.hp <= 0) continue;
      radarPoints.push({ x: f.x, z: f.z, kind: "rival" });
    }
    const missionDef = this.getActiveMissionDef();
    const activeSecretBoss = this.monsters.find((m) => Boolean(m.secretBossId) && m.hp > 0);
    const activeEventRem = this.activeEventZone ? this.monsters.filter((m) => m.hp > 0 && m.eventZoneId === this.activeEventZone.def.id).length : 0;
    return {
      hp: p1 ? Math.round(p1.hp) : 0,
      maxHp: p1 ? p1.maxHp : 100,
      energy: p1 ? Math.round(p1.energy) : 0,
      maxEnergy: p1 ? p1.maxEnergy : 100,
      wave: this.wave,
      kills: this.kills,
      combo: this.combo,
      comboTimer: this.comboTimer,
      heavyCd: p1 ? Number(p1.heavyCooldown.toFixed(1)) : 0,
      heavyMaxCd: Number((4.2 * (1 - cdr)).toFixed(1)),
      powerCd: slotCooldowns[0],
      powerMaxCd: slotMaxCooldowns[0],
      secondaryCd: slotCooldowns[1],
      secondaryMaxCd: slotMaxCooldowns[1],
      slotCooldowns,
      slotMaxCooldowns,
      dodgeCd: p1 ? Number(p1.dodgeCooldown.toFixed(1)) : 0,
      sprintActive: this.sprintActive,
      playerX: p1 ? Math.round(p1.x) : 0,
      playerZ: p1 ? Math.round(p1.z) : 0,
      scoreP1: this.scoreP1,
      scoreP2: this.scoreP2,
      opponentName: opp?.name,
      opponentHp: opp ? Math.round(opp.hp) : void 0,
      opponentMaxHp: opp?.maxHp,
      bossName: boss?.name,
      bossHp: boss ? Math.round(boss.hp) : void 0,
      bossMaxHp: boss?.maxHp,
      elapsedSec: Math.floor(this.time),
      bannerText: this.bannerTimer > 0 ? this.bannerText : "",
      fps: Math.round(this.fpsSamples),
      onlineCount: this.fighters.length,
      arenaRadius: this.arena.radius,
      playerYaw: p1 ? p1.yaw : 0,
      radarPoints,
      onHighGround: p1 ? p1.onHighGround : false,
      terrainNote: p1 ? p1.terrainNote : "",
      activeMission: missionDef ? {
        title: missionDef.title,
        progress: Math.min(missionDef.target, Math.floor(this.missionProgress)),
        target: missionDef.target,
        rewardText: missionDef.rewardText
      } : null,
      missionsDone: this.missionsDone,
      consumables: { ...this.localConsumables },
      isOverworld: this.mode === "world_explore",
      currentRegionName: this.mode === "world_explore" ? this.currentRegionName : void 0,
      nearbyInteractable: this.nearbyInteractable ? {
        label: this.nearbyInteractable.label,
        kind: this.nearbyInteractable.kind,
        sublabel: this.nearbyInteractable.sublabel
      } : null,
      npcDialogue: this.npcDialogue,
      discoveredRegionsCount: this.discoveredRegions.size,
      totalRegionsCount: this.arena.regions?.length || 0,
      openedChestsCount: this.openedChests.size,
      totalChestsCount: Math.max(this.arena.worldChests?.length || 0, this.streamedChests.length),
      discoveredWaystonesCount: this.discoveredWaystones.size,
      totalWaystonesCount: this.arena.worldWaystones?.length || 0,
      unlockedSkillSlots: this.unlockedSkillSlots,
      currentChunkKey: this.mode === "world_explore" ? this.currentChunkKey : void 0,
      activeChunksCount: this.mode === "world_explore" ? this.activeChunksCount : void 0,
      discoveredChunksCount: this.chunkStreamer ? this.chunkStreamer.getExploredCount() : void 0,
      currentBiomeColor: this.mode === "world_explore" ? this.currentBiomeColor : void 0,
      activeSecretBossName: activeSecretBoss?.name,
      activeEventZoneName: this.activeEventZone?.def.name,
      activeEventProgress: this.activeEventZone ? `\u0645\u0648\u062C\u0629 ${this.activeEventZone.wave}/${this.activeEventZone.waveCount} \xB7 \u0645\u062A\u0628\u0642\u064A ${activeEventRem}` : void 0
    };
  }
}
