import type {
  ArenaDef,
  AvatarConfig,
  GraphicsQuality,
  MonsterArchetype,
  OverworldNodeDef,
  SceneryPropDef,
  SecretBossDef,
  WeaponId,
  WorldChestDef,
  WorldEventZoneDef,
  WorldFastTravelDef,
  WorldNpcDef,
  WorldPortalDef,
} from '../types/game';
import { MONSTERS, WEAPONS } from '../data/gameCatalog';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Camera3D {
  pos: Vec3;
  target: Vec3;
  fov: number;
  near: number;
}

interface Face3D {
  points: [number, number][];
  depth: number;
  fill: string;
  stroke?: string;
  lineWidth?: number;
  alpha?: number;
}

export interface RenderFighter {
  id: string;
  name: string;
  avatar: AvatarConfig;
  x: number;
  y: number;
  z: number;
  yaw: number;
  hp: number;
  maxHp: number;
  animState: 'idle' | 'run' | 'attack' | 'heavy' | 'power' | 'dodge' | 'block' | 'hurt' | 'dead';
  animTime: number;
  walkPhase: number;
  comboStep: number;
  hitFlash: number;
  shieldActive: boolean;
  overdriveActive: boolean;
  frozenTimer: number;
  team: 'player1' | 'player2' | 'enemy';
  weaponLevel?: number;
}

export interface RenderMonster {
  id: string;
  archetype: MonsterArchetype;
  name: string;
  x: number;
  y: number;
  z: number;
  yaw: number;
  hp: number;
  maxHp: number;
  walkPhase: number;
  attackTimer: number;
  telegraphTimer: number;
  telegraphRadius: number;
  hitFlash: number;
  frozenTimer: number;
  isBoss: boolean;
}

export interface RenderProjectile {
  id: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vz: number;
  color: string;
  coreColor: string;
  radius: number;
  kind: 'arrow' | 'orb' | 'fireball';
}

export interface RenderRingVfx {
  x: number;
  y: number;
  z: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
  filled?: boolean;
  isFusion?: boolean;
  secondaryColor?: string;
}

export interface RenderSlashVfx {
  x: number;
  y: number;
  z: number;
  yaw: number;
  radius: number;
  arcSpread: number;
  color: string;
  alpha: number;
  tilt: number;
  critical?: boolean;
}

export interface RenderLightningVfx {
  x: number;
  z: number;
  color: string;
  alpha: number;
  seed: number;
}

export interface RenderDashTrail {
  x: number;
  y: number;
  z: number;
  yaw: number;
  color: string;
  alpha: number;
  hScale: number;
}

export interface RenderPickup {
  id: string;
  x: number;
  z: number;
  kind: 'heal' | 'energy' | 'gold';
  bobPhase: number;
}

export interface RenderParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  alpha: number;
}

export interface RenderFloatingText {
  x: number;
  y: number;
  z: number;
  text: string;
  color: string;
  alpha: number;
  scale: number;
}

export interface RenderScenePayload {
  arena: ArenaDef;
  time: number;
  quality: GraphicsQuality;
  fighters: RenderFighter[];
  monsters: RenderMonster[];
  projectiles: RenderProjectile[];
  rings: RenderRingVfx[];
  slashes: RenderSlashVfx[];
  lightnings: RenderLightningVfx[];
  dashTrails?: RenderDashTrail[];
  pickups: RenderPickup[];
  particles: RenderParticle[];
  floatingTexts: RenderFloatingText[];
  shrineCooldowns?: Record<string, number>;
  showFloorLabels?: boolean;
  openedChests?: string[];
  gatheredNodeIds?: string[];
  discoveredWaystoneIds?: string[];
  nearbyInteractable?: { label: string; kind: string } | null;
  isOverworld?: boolean;
  biomeSkyTint?: string;
  secretBossShrines?: SecretBossDef[];
  defeatedSecretBossIds?: string[];
  worldEventZones?: WorldEventZoneDef[];
  completedWorldEventIds?: string[];
  activeEventZoneId?: string;
}

const hexCache = new Map<string, [number, number, number]>();

function parseHex(hex: string): [number, number, number] {
  const cached = hexCache.get(hex);
  if (cached) return cached;
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
  }
  const num = parseInt(clean, 16);
  const rgb: [number, number, number] = isNaN(num)
    ? [120, 130, 145]
    : [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  hexCache.set(hex, rgb);
  return rgb;
}

function shadeColor(
  baseHex: string,
  intensity: number,
  fogHex: string,
  fogFactor: number,
  flashWhite = 0,
  freezeTint = 0,
  rimBoost = 0,
  specularBoost = 0
): string {
  const [r0, g0, b0] = parseHex(baseHex);
  let r = r0 * intensity + rimBoost * 34 + specularBoost * 72;
  let g = g0 * intensity + rimBoost * 54 + specularBoost * 70;
  let b = b0 * intensity + rimBoost * 85 + specularBoost * 64;

  if (freezeTint > 0) {
    r = r * (1 - freezeTint * 0.45) + 96 * freezeTint * 0.45;
    g = g * (1 - freezeTint * 0.45) + 195 * freezeTint * 0.45;
    b = b * (1 - freezeTint * 0.45) + 255 * freezeTint * 0.45;
  }

  if (flashWhite > 0) {
    r = r + (255 - r) * flashWhite;
    g = g + (255 - g) * flashWhite;
    b = b + (255 - b) * flashWhite;
  }

  if (fogFactor > 0.01) {
    const [fr, fg, fb] = parseHex(fogHex);
    r = r + (fr - r) * fogFactor;
    g = g + (fg - g) * fogFactor;
    b = b + (fb - b) * fogFactor;
  }

  return `rgb(${Math.max(0, Math.min(255, r | 0))},${Math.max(0, Math.min(255, g | 0))},${Math.max(0, Math.min(255, b | 0))})`;
}

// Warm directional key light from top-front-right
const LIGHT_LEN = Math.hypot(0.55, 0.78, 0.42);
const LIGHT_DIR: Vec3 = {
  x: 0.55 / LIGHT_LEN,
  y: 0.78 / LIGHT_LEN,
  z: 0.42 / LIGHT_LEN,
};

const BOX_CORNERS: [number, number, number][] = [
  [-0.5, -0.5, -0.5],
  [0.5, -0.5, -0.5],
  [0.5, 0.5, -0.5],
  [-0.5, 0.5, -0.5],
  [-0.5, -0.5, 0.5],
  [0.5, -0.5, 0.5],
  [0.5, 0.5, 0.5],
  [-0.5, 0.5, 0.5],
];

const BOX_FACES: [number, number, number, number][] = [
  [4, 5, 6, 7],
  [1, 0, 3, 2],
  [5, 1, 2, 6],
  [0, 4, 7, 3],
  [7, 6, 2, 3],
  [0, 1, 5, 4],
];

interface PolyOpts {
  unlit?: boolean;
  doubleSided?: boolean;
  stroke?: string;
  lineWidth?: number;
  alpha?: number;
  flashWhite?: number;
  freezeTint?: number;
  depthBias?: number;
  specular?: number;
  rotX?: number;
  rotZ?: number;
}

export class SoftwareRenderer3D {
  private width = 800;
  private height = 500;
  private cx = 400;
  private cy = 250;
  private focal = 520;

  private camPos: Vec3 = { x: 0, y: 8, z: 14 };
  private camTarget: Vec3 = { x: 0, y: 0, z: 0 };
  private right: Vec3 = { x: 1, y: 0, z: 0 };
  private up: Vec3 = { x: 0, y: 1, z: 0 };
  private forward: Vec3 = { x: 0, y: 0, z: -1 };
  private near = 0.45;
  private fogColor = '#1C2230';
  private isOverworld = false;

  private faces: Face3D[] = [];

  public beginFrame(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    camera: Camera3D,
    fogColor: string,
    isOverworld = false
  ) {
    this.width = width;
    this.height = height;
    this.cx = width * 0.5;
    this.cy = height * 0.5;
    this.focal = (height * 0.5) / Math.tan((camera.fov * Math.PI) / 360);
    this.near = camera.near;
    this.camPos = camera.pos;
    this.camTarget = camera.target;
    this.fogColor = fogColor;
    this.isOverworld = isOverworld;
    this.faces.length = 0;

    let fx = camera.target.x - camera.pos.x;
    let fy = camera.target.y - camera.pos.y;
    let fz = camera.target.z - camera.pos.z;
    const fLen = Math.hypot(fx, fy, fz) || 1;
    fx /= fLen;
    fy /= fLen;
    fz /= fLen;
    this.forward = { x: fx, y: fy, z: fz };

    let rx = -fz;
    let ry = 0;
    let rz = fx;
    const rLen = Math.hypot(rx, rz) || 1;
    rx /= rLen;
    rz /= rLen;
    this.right = { x: rx, y: ry, z: rz };

    this.up = {
      x: ry * fz - rz * fy,
      y: rz * fx - rx * fz,
      z: rx * fy - ry * fx,
    };

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
  }

  public toCam(p: Vec3): Vec3 {
    const dx = p.x - this.camPos.x;
    const dy = p.y - this.camPos.y;
    const dz = p.z - this.camPos.z;
    return {
      x: dx * this.right.x + dy * this.right.y + dz * this.right.z,
      y: dx * this.up.x + dy * this.up.y + dz * this.up.z,
      z: dx * this.forward.x + dy * this.forward.y + dz * this.forward.z,
    };
  }

  public project(p: Vec3): { sx: number; sy: number; z: number; scale: number } | null {
    const c = this.toCam(p);
    if (c.z <= this.near) return null;
    const scale = this.focal / c.z;
    return {
      sx: this.cx + c.x * scale,
      sy: this.cy - c.y * scale,
      z: c.z,
      scale,
    };
  }

  private transformLocal(
    center: Vec3,
    lx: number,
    ly: number,
    lz: number,
    rotY: number,
    rotX = 0,
    rotZ = 0
  ): Vec3 {
    let x = lx;
    let y = ly;
    let z = lz;
    if (rotZ !== 0) {
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);
      const x1 = x * cosZ - y * sinZ;
      const y1 = x * sinZ + y * cosZ;
      x = x1;
      y = y1;
    }
    if (rotX !== 0) {
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;
      y = y1;
      z = z1;
    }
    if (rotY !== 0) {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x2 = x * cosY + z * sinY;
      const z2 = -x * sinY + z * cosY;
      x = x2;
      z = z2;
    }
    return { x: center.x + x, y: center.y + y, z: center.z + z };
  }

  public addPolygon(worldVerts: Vec3[], color: string, opts?: PolyOpts) {
    const n = worldVerts.length;
    if (n < 3) return;

    const camVerts: Vec3[] = new Array(n);
    let sumZ = 0;
    for (let i = 0; i < n; i++) {
      const cv = this.toCam(worldVerts[i]);
      if (cv.z <= this.near) return;
      camVerts[i] = cv;
      sumZ += cv.z;
    }

    const a = worldVerts[0];
    const b = worldVerts[1];
    const c = worldVerts[2];
    const ux = b.x - a.x;
    const uy = b.y - a.y;
    const uz = b.z - a.z;
    const vx = c.x - a.x;
    const vy = c.y - a.y;
    const vz = c.z - a.z;

    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const nLen = Math.hypot(nx, ny, nz);
    if (nLen < 1e-6) return;
    nx /= nLen;
    ny /= nLen;
    nz /= nLen;

    const vxCam = this.camPos.x - a.x;
    const vyCam = this.camPos.y - a.y;
    const vzCam = this.camPos.z - a.z;
    const vLen = Math.hypot(vxCam, vyCam, vzCam) || 1;
    const ndotv = (nx * vxCam + ny * vyCam + nz * vzCam) / vLen;

    if (!opts?.doubleSided && ndotv <= 0) return;

    const points: [number, number][] = new Array(n);
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < n; i++) {
      const cv = camVerts[i];
      const sc = this.focal / cv.z;
      const sx = this.cx + cv.x * sc;
      const sy = this.cy - cv.y * sc;
      points[i] = [sx, sy];
      if (sx < minX) minX = sx;
      if (sx > maxX) maxX = sx;
      if (sy < minY) minY = sy;
      if (sy > maxY) maxY = sy;
    }

    if (maxX < -40 || minX > this.width + 40 || maxY < -40 || minY > this.height + 40) {
      return;
    }

    const avgZ = sumZ / n + (opts?.depthBias ?? 0);
    const fogFactor = this.isOverworld
      ? Math.max(0, Math.min(0.62, (avgZ - 34) / 56))
      : Math.max(0, Math.min(0.62, (avgZ - 26) / 52));

    let fill: string;
    if (opts?.unlit) {
      fill = shadeColor(color, 1.0, this.fogColor, fogFactor * 0.45, opts?.flashWhite ?? 0, opts?.freezeTint ?? 0);
    } else {
      const effNdotV = Math.abs(ndotv);
      const ndotl = Math.max(0, nx * LIGHT_DIR.x + ny * LIGHT_DIR.y + nz * LIGHT_DIR.z);
      const hemi = 0.5 + 0.5 * ny;
      const rim = Math.pow(Math.max(0, 1 - effNdotV), 2.1) * 0.34;
      const specAmt = opts?.specular ? Math.pow(Math.max(0, ndotl), 5) * opts.specular : 0;
      const intensity = 0.46 + ndotl * 0.62 + hemi * 0.16;
      fill = shadeColor(
        color,
        intensity,
        this.fogColor,
        fogFactor,
        opts?.flashWhite ?? 0,
        opts?.freezeTint ?? 0,
        rim,
        specAmt
      );
    }

    this.faces.push({
      points,
      depth: avgZ,
      fill,
      stroke: opts?.stroke,
      lineWidth: opts?.lineWidth,
      alpha: opts?.alpha,
    });
  }

  // Smooth Tapered Cylinder (pillars, tree trunks, cones, fluted columns, hats, plumes)
  public addTaperedCylinder(
    center: Vec3,
    rBottom: number,
    rTop: number,
    height: number,
    rotY: number,
    segs: number,
    color: string,
    opts?: PolyOpts & { capTop?: boolean; capBottom?: boolean }
  ) {
    const halfH = height * 0.5;
    const rotX = opts?.rotX ?? 0;
    const rotZ = opts?.rotZ ?? 0;
    const botRing: Vec3[] = new Array(segs);
    const topRing: Vec3[] = new Array(segs);

    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      botRing[i] = this.transformLocal(center, ca * rBottom, -halfH, sa * rBottom, rotY, rotX, rotZ);
      topRing[i] =
        rTop > 0.002
          ? this.transformLocal(center, ca * rTop, halfH, sa * rTop, rotY, rotX, rotZ)
          : this.transformLocal(center, 0, halfH, 0, rotY, rotX, rotZ);
    }

    for (let i = 0; i < segs; i++) {
      const next = (i + 1) % segs;
      if (rTop > 0.002) {
        this.addPolygon([botRing[next], botRing[i], topRing[i], topRing[next]], color, opts);
      } else {
        this.addPolygon([botRing[next], botRing[i], topRing[i]], color, opts);
      }
    }

    if (opts?.capTop !== false && rTop > 0.002) {
      this.addPolygon(topRing, color, opts);
    }
    if (opts?.capBottom && rBottom > 0.002) {
      const rev = [...botRing].reverse();
      this.addPolygon(rev, color, opts);
    }
  }

  // Sculpted UV-faceted Ellipsoid (smooth heads, pauldrons, crystals, monster bodies)
  public addEllipsoid(
    center: Vec3,
    rx: number,
    ry: number,
    rz: number,
    rotY: number,
    segs: number,
    rings: number,
    color: string,
    opts?: PolyOpts
  ) {
    const rotX = opts?.rotX ?? 0;
    const rotZ = opts?.rotZ ?? 0;
    const ringPts: Vec3[][] = [];

    for (let r = 1; r < rings; r++) {
      const phi = (r / rings) * Math.PI - Math.PI * 0.5;
      const cPhi = Math.cos(phi);
      const sPhi = Math.sin(phi);
      const row: Vec3[] = new Array(segs);
      for (let i = 0; i < segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        row[i] = this.transformLocal(
          center,
          Math.cos(theta) * cPhi * rx,
          sPhi * ry,
          Math.sin(theta) * cPhi * rz,
          rotY,
          rotX,
          rotZ
        );
      }
      ringPts.push(row);
    }

    const botPole = this.transformLocal(center, 0, -ry, 0, rotY, rotX, rotZ);
    const topPole = this.transformLocal(center, 0, ry, 0, rotY, rotX, rotZ);

    const firstRow = ringPts[0];
    const lastRow = ringPts[ringPts.length - 1];
    for (let i = 0; i < segs; i++) {
      const next = (i + 1) % segs;
      this.addPolygon([firstRow[i], firstRow[next], botPole], color, opts);
      this.addPolygon([lastRow[next], lastRow[i], topPole], color, opts);
    }

    for (let r = 0; r < ringPts.length - 1; r++) {
      const rA = ringPts[r];
      const rB = ringPts[r + 1];
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        this.addPolygon([rA[next], rA[i], rB[i], rB[next]], color, opts);
      }
    }
  }

  // Anatomical Capsule Limb (rounded shoulder/hip + tapered forearm/shin)
  public addCapsuleLimb(
    center: Vec3,
    rTop: number,
    rBot: number,
    length: number,
    rotY: number,
    segs: number,
    color: string,
    opts?: PolyOpts
  ) {
    this.addTaperedCylinder(center, rBot, rTop, length, rotY, segs, color, {
      ...opts,
      capTop: true,
      capBottom: true,
    });
    const rotX = opts?.rotX ?? 0;
    const rotZ = opts?.rotZ ?? 0;
    const topCapCenter = this.transformLocal(center, 0, length * 0.45, 0, rotY, rotX, rotZ);
    this.addEllipsoid(topCapCenter, rTop * 1.06, rTop * 0.92, rTop * 1.06, rotY, Math.max(6, segs), 3, color, opts);
  }

  // Sculpted V-Taper Heroic Torso (8-sided chest -> narrower waist)
  public addSculptedTorso(
    center: Vec3,
    chestW: number,
    waistW: number,
    chestD: number,
    height: number,
    rotY: number,
    segs: number,
    color: string,
    opts?: PolyOpts
  ) {
    const rotX = opts?.rotX ?? 0;
    const rotZ = opts?.rotZ ?? 0;
    const hHalf = height * 0.5;
    const levels = [
      { y: -hHalf, rx: waistW * 0.52, rz: chestD * 0.44 },
      { y: 0, rx: (chestW + waistW) * 0.27, rz: chestD * 0.52 },
      { y: hHalf * 0.82, rx: chestW * 0.54, rz: chestD * 0.54 },
      { y: hHalf, rx: chestW * 0.38, rz: chestD * 0.4 },
    ];

    const rings: Vec3[][] = levels.map((lv) => {
      const row: Vec3[] = new Array(segs);
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        row[i] = this.transformLocal(center, Math.cos(a) * lv.rx, lv.y, Math.sin(a) * lv.rz, rotY, rotX, rotZ);
      }
      return row;
    });

    for (let r = 0; r < rings.length - 1; r++) {
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        this.addPolygon([rings[r][next], rings[r][i], rings[r + 1][i], rings[r + 1][next]], color, opts);
      }
    }
    this.addPolygon(rings[rings.length - 1], color, opts);
  }

  // Sleek 3D Ring / Halo / Portal Frame
  public addTorusRing(
    center: Vec3,
    majorR: number,
    minorR: number,
    rotY: number,
    rotX: number,
    segs: number,
    color: string,
    opts?: PolyOpts
  ) {
    const tubeSegs = 4;
    const rings: Vec3[][] = [];
    for (let i = 0; i < segs; i++) {
      const u = (i / segs) * Math.PI * 2;
      const cu = Math.cos(u);
      const su = Math.sin(u);
      const ring: Vec3[] = [];
      for (let j = 0; j < tubeSegs; j++) {
        const v = (j / tubeSegs) * Math.PI * 2;
        const rOff = majorR + Math.cos(v) * minorR;
        const lx = cu * rOff;
        const ly = su * rOff;
        const lz = Math.sin(v) * minorR;
        ring.push(this.transformLocal(center, lx, ly, lz, rotY, rotX, 0));
      }
      rings.push(ring);
    }
    for (let i = 0; i < segs; i++) {
      const ni = (i + 1) % segs;
      for (let j = 0; j < tubeSegs; j++) {
        const nj = (j + 1) % tubeSegs;
        this.addPolygon([rings[i][j], rings[ni][j], rings[ni][nj], rings[i][nj]], color, opts);
      }
    }
  }

  public addBox(center: Vec3, size: Vec3, rotY: number, color: string, opts?: PolyOpts) {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const rotX = opts?.rotX ?? 0;
    const rotZ = opts?.rotZ ?? 0;
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosZ = Math.cos(rotZ);
    const sinZ = Math.sin(rotZ);

    const verts: Vec3[] = new Array(8);
    for (let i = 0; i < 8; i++) {
      let x = BOX_CORNERS[i][0] * size.x;
      let y = BOX_CORNERS[i][1] * size.y;
      let z = BOX_CORNERS[i][2] * size.z;

      if (rotZ !== 0) {
        const x1 = x * cosZ - y * sinZ;
        const y1 = x * sinZ + y * cosZ;
        x = x1;
        y = y1;
      }
      if (rotX !== 0) {
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        y = y1;
        z = z1;
      }
      const x2 = x * cosY + z * sinY;
      const z2 = -x * sinY + z * cosY;

      verts[i] = { x: center.x + x2, y: center.y + y, z: center.z + z2 };
    }

    for (let f = 0; f < 6; f++) {
      const [i0, i1, i2, i3] = BOX_FACES[f];
      this.addPolygon([verts[i0], verts[i1], verts[i2], verts[i3]], color, opts);
    }
  }

  public addPyramid(
    baseCenter: Vec3,
    radius: number,
    height: number,
    rotY: number,
    color: string,
    opts?: PolyOpts
  ) {
    const tip: Vec3 = { x: baseCenter.x, y: baseCenter.y + height, z: baseCenter.z };
    const ring: Vec3[] = [];
    for (let i = 0; i < 4; i++) {
      const a = rotY + (i * Math.PI) / 2 + Math.PI / 4;
      ring.push({
        x: baseCenter.x + Math.cos(a) * radius,
        y: baseCenter.y,
        z: baseCenter.z + Math.sin(a) * radius,
      });
    }
    for (let i = 0; i < 4; i++) {
      const next = (i + 1) % 4;
      this.addPolygon([ring[next], ring[i], tip], color, opts);
    }
  }

  public addOctahedron(
    center: Vec3,
    radius: number,
    height: number,
    rotY: number,
    color: string,
    opts?: PolyOpts
  ) {
    const top: Vec3 = { x: center.x, y: center.y + height * 0.5, z: center.z };
    const bot: Vec3 = { x: center.x, y: center.y - height * 0.5, z: center.z };
    const mid: Vec3[] = [];
    for (let i = 0; i < 4; i++) {
      const a = rotY + (i * Math.PI) / 2;
      mid.push({
        x: center.x + Math.cos(a) * radius,
        y: center.y,
        z: center.z + Math.sin(a) * radius,
      });
    }
    for (let i = 0; i < 4; i++) {
      const next = (i + 1) % 4;
      this.addPolygon([mid[next], mid[i], top], color, opts);
      this.addPolygon([mid[i], mid[next], bot], color, opts);
    }
  }

  public flushFaces(ctx: CanvasRenderingContext2D) {
    this.faces.sort((a, b) => b.depth - a.depth);
    for (let i = 0; i < this.faces.length; i++) {
      const f = this.faces[i];
      ctx.beginPath();
      ctx.moveTo(f.points[0][0], f.points[0][1]);
      for (let j = 1; j < f.points.length; j++) {
        ctx.lineTo(f.points[j][0], f.points[j][1]);
      }
      ctx.closePath();

      if (f.alpha !== undefined && f.alpha < 0.99) {
        ctx.save();
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = f.fill;
        ctx.fill();
        if (f.stroke) {
          ctx.strokeStyle = f.stroke;
          ctx.lineWidth = f.lineWidth ?? 1;
          ctx.stroke();
        }
        ctx.restore();
      } else {
        ctx.fillStyle = f.fill;
        ctx.fill();
        if (f.stroke) {
          ctx.strokeStyle = f.stroke;
          ctx.lineWidth = f.lineWidth ?? 1;
          ctx.stroke();
        }
      }
    }
  }

  private localToWorld(origin: Vec3, yaw: number, lx: number, ly: number, lz: number): Vec3 {
    const cos = Math.cos(yaw);
    const sin = Math.sin(yaw);
    return {
      x: origin.x + lx * cos + lz * sin,
      y: origin.y + ly,
      z: origin.z - lx * sin + lz * cos,
    };
  }

  private getSegCount(quality: GraphicsQuality): number {
    if (quality === 'eco') return 6;
    if (quality === 'balanced') return 8;
    if (quality === 'high') return 10;
    if (quality === 'ultra') return 12;
    return 14;
  }

  private getCullDist(quality: GraphicsQuality): number {
    if (quality === 'eco') return 48;
    if (quality === 'balanced') return 65;
    if (quality === 'high') return 88;
    if (quality === 'ultra') return 112;
    return 138;
  }

  public drawSkyAndBackdrop(
    ctx: CanvasRenderingContext2D,
    arena: ArenaDef,
    camYaw: number,
    quality: GraphicsQuality = 'balanced',
    time = 0,
    biomeSkyTint?: string
  ) {
    const grad = ctx.createLinearGradient(0, 0, 0, this.height);
    grad.addColorStop(0, arena.skyTop);
    grad.addColorStop(0.45, biomeSkyTint || arena.skyMid);
    grad.addColorStop(0.76, arena.skyHorizon);
    grad.addColorStop(1, arena.skyTop);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.width, this.height);

    if (quality !== 'eco') {
      const sunX = this.width * (0.72 - ((camYaw * 0.08) % 0.4));
      const sunY = this.height * 0.21;
      const orbR = Math.min(this.width, this.height) * 0.095;
      const halo = ctx.createRadialGradient(sunX, sunY, orbR * 0.2, sunX, sunY, orbR * 3.8);
      halo.addColorStop(0, `${arena.floorTrim}99`);
      halo.addColorStop(0.45, `${arena.floorTrim}28`);
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(sunX, sunY, orbR * 3.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `${arena.pillarAccent}D9`;
      ctx.beginPath();
      ctx.arc(sunX, sunY, orbR * 0.54, 0, Math.PI * 2);
      ctx.fill();

      if (quality === 'mythic') {
        const moonX = this.width * (0.24 + ((camYaw * 0.06) % 0.25));
        const moonY = this.height * 0.16;
        ctx.save();
        ctx.globalAlpha = 0.72;
        ctx.fillStyle = '#BAE6FD';
        ctx.beginPath();
        ctx.arc(moonX, moonY, orbR * 0.34, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    if (quality === 'high' || quality === 'ultra' || quality === 'mythic') {
      ctx.save();
      ctx.fillStyle = '#E2E8F0';
      const starCount = quality === 'mythic' ? 44 : quality === 'ultra' ? 30 : 18;
      for (let i = 0; i < starCount; i++) {
        const sx = ((i * 173 + camYaw * 90) % this.width + this.width) % this.width;
        const sy = (i * 67) % (this.height * 0.36);
        ctx.globalAlpha = 0.22 + 0.32 * Math.sin(time * 2.2 + i);
        const sz = i % 5 === 0 ? 2.5 : 1.8;
        ctx.fillRect(sx, sy, sz, sz);
      }

      if (quality === 'ultra' || quality === 'mythic') {
        const auroraY = this.height * 0.22;
        const aGrad = ctx.createLinearGradient(0, auroraY - 40, this.width, auroraY + 45);
        aGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        aGrad.addColorStop(0.35, `${arena.pillarAccent}22`);
        aGrad.addColorStop(0.65, `${arena.floorTrim}22`);
        aGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = aGrad;
        ctx.beginPath();
        ctx.moveTo(0, auroraY);
        for (let x = 0; x <= this.width; x += 60) {
          ctx.lineTo(x, auroraY + Math.sin(x * 0.008 + time * 0.6 + camYaw) * 26);
        }
        ctx.lineTo(this.width, auroraY + 65);
        ctx.lineTo(0, auroraY + 65);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    const horizonY = this.height * 0.45;
    const parallax = ((camYaw % (Math.PI * 2)) / (Math.PI * 2)) * this.width;
    ctx.save();
    ctx.fillStyle = 'rgba(8, 12, 20, 0.34)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    const peaks = 14;
    for (let i = -2; i <= peaks + 2; i++) {
      const x = (i / peaks) * this.width - ((parallax * 0.6) % (this.width / peaks));
      const h = 34 + Math.abs(Math.sin(i * 1.9 + arena.radius)) * 78;
      ctx.lineTo(x, horizonY - h);
    }
    ctx.lineTo(this.width, this.height);
    ctx.closePath();
    ctx.fill();

    if (quality !== 'eco') {
      ctx.fillStyle = 'rgba(12, 16, 26, 0.46)';
      ctx.beginPath();
      ctx.moveTo(0, this.height);
      for (let i = -2; i <= peaks + 2; i++) {
        const x = (i / peaks) * this.width - (parallax % (this.width / peaks));
        const h = 16 + Math.abs(Math.cos(i * 2.4 + arena.radius * 0.5)) * 44;
        ctx.lineTo(x, horizonY - h + 14);
      }
      ctx.lineTo(this.width, this.height);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  public drawArenaGround(
    ctx: CanvasRenderingContext2D,
    arena: ArenaDef,
    quality: GraphicsQuality,
    time: number
  ) {
    const R = arena.radius;
    const sides = quality === 'eco' ? 16 : arena.isOverworld ? 26 : 22;
    const focusX = this.camTarget.x;
    const focusZ = this.camTarget.z;

    if (arena.isOverworld || R > 120) {
      // Vast 1400m Overworld: project a camera-centered local terrain disk (135m radius)
      // so vertices never fail behind-camera near clipping!
      const localR = 135;
      const diskPts: [number, number][] = [];
      for (let i = 0; i < sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        const wx = focusX + Math.cos(a) * localR;
        const wz = focusZ + Math.sin(a) * localR;
        const distFromOrigin = Math.hypot(wx, wz);
        const clampedScale = distFromOrigin > R ? R / distFromOrigin : 1;
        const p = this.project({ x: wx * clampedScale, y: 0, z: wz * clampedScale });
        if (p) diskPts.push([p.sx, p.sy]);
      }
      if (diskPts.length >= 3) {
        ctx.beginPath();
        ctx.moveTo(diskPts[0][0], diskPts[0][1]);
        for (let i = 1; i < diskPts.length; i++) ctx.lineTo(diskPts[i][0], diskPts[i][1]);
        ctx.closePath();
        ctx.fillStyle = arena.floorMain;
        ctx.fill();
      }

      // Draw Outer Continent Rim Cliff Segments when player approaches world edge (R = 700m)
      if (Math.hypot(focusX, focusZ) > R - 145) {
        const edgeSegs = 64;
        for (let i = 0; i < edgeSegs; i++) {
          const a0 = (i / edgeSegs) * Math.PI * 2;
          const a1 = ((i + 1) / edgeSegs) * Math.PI * 2;
          const midX = Math.cos((a0 + a1) * 0.5) * R;
          const midZ = Math.sin((a0 + a1) * 0.5) * R;
          if (Math.hypot(midX - focusX, midZ - focusZ) > 140) continue;
          const p0 = this.project({ x: Math.cos(a0) * R, y: 0, z: Math.sin(a0) * R });
          const p1 = this.project({ x: Math.cos(a1) * R, y: 0, z: Math.sin(a1) * R });
          const p2 = this.project({ x: Math.cos(a1) * R * 0.99, y: -3.2, z: Math.sin(a1) * R * 0.99 });
          const p3 = this.project({ x: Math.cos(a0) * R * 0.99, y: -3.2, z: Math.sin(a0) * R * 0.99 });
          if (p0 && p1 && p2 && p3) {
            ctx.beginPath();
            ctx.moveTo(p0.sx, p0.sy);
            ctx.lineTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.lineTo(p3.sx, p3.sy);
            ctx.closePath();
            ctx.fillStyle = arena.platformWall;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(p0.sx, p0.sy);
            ctx.lineTo(p1.sx, p1.sy);
            ctx.strokeStyle = arena.floorTrim;
            ctx.lineWidth = 3;
            ctx.stroke();
          }
        }
      }

      // Subdivided Continental Crossroads (every 22m step so segments never vanish)
      const highways: [number, number][] = [
        [0, -560],
        [390, -390],
        [560, 0],
        [390, 390],
        [0, 560],
        [-390, 390],
        [-560, 0],
        [-390, -390],
      ];
      ctx.save();
      ctx.strokeStyle = 'rgba(214, 191, 148, 0.25)';
      ctx.lineWidth = 6.5;
      for (const [tx, tz] of highways) {
        const len = Math.hypot(tx, tz) || 1;
        const step = 22;
        const count = Math.ceil(len / step);
        for (let s = 0; s < count; s++) {
          const t0 = s / count;
          const t1 = (s + 1) / count;
          const x0 = tx * t0;
          const z0 = tz * t0;
          const x1 = tx * t1;
          const z1 = tz * t1;
          if (Math.hypot((x0 + x1) * 0.5 - focusX, (z0 + z1) * 0.5 - focusZ) > 135) continue;
          const p1 = this.project({ x: x0, y: 0.02, z: z0 });
          const p2 = this.project({ x: x1, y: 0.02, z: z1 });
          if (p1 && p2) {
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    } else {
      if (arena.hazardType === 'lava_vents' && quality !== 'eco') {
        const outerPts: [number, number][] = [];
        for (let i = 0; i < sides; i++) {
          const a = (i / sides) * Math.PI * 2;
          const p = this.project({ x: Math.cos(a) * (R + 8.5), y: -2.5, z: Math.sin(a) * (R + 8.5) });
          if (p) outerPts.push([p.sx, p.sy]);
        }
        if (outerPts.length >= 3) {
          ctx.beginPath();
          ctx.moveTo(outerPts[0][0], outerPts[0][1]);
          for (let i = 1; i < outerPts.length; i++) ctx.lineTo(outerPts[i][0], outerPts[i][1]);
          ctx.closePath();
          ctx.fillStyle = `rgba(234, 88, 12, ${(0.34 + 0.1 * Math.sin(time * 2.5)).toFixed(2)})`;
          ctx.fill();
        }
      }

      // 1. Elevated platform side bevel wall
      const wallTop: Vec3[] = [];
      const wallBot: Vec3[] = [];
      for (let i = 0; i < sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        wallTop.push({ x: Math.cos(a) * R, y: 0, z: Math.sin(a) * R });
        wallBot.push({ x: Math.cos(a) * (R * 0.96), y: -2.8, z: Math.sin(a) * (R * 0.96) });
      }

      for (let i = 0; i < sides; i++) {
        const next = (i + 1) % sides;
        const p0 = this.project(wallTop[i]);
        const p1 = this.project(wallTop[next]);
        const p2 = this.project(wallBot[next]);
        const p3 = this.project(wallBot[i]);
        if (!p0 || !p1 || !p2 || !p3) continue;
        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy);
        ctx.lineTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.lineTo(p3.sx, p3.sy);
        ctx.closePath();
        ctx.fillStyle = arena.platformWall;
        ctx.fill();
      }

      // 2. Main polygon floor disk
      const floorPts: [number, number][] = [];
      for (let i = 0; i < sides; i++) {
        const proj = this.project(wallTop[i]);
        if (proj) floorPts.push([proj.sx, proj.sy]);
      }
      if (floorPts.length >= 3) {
        ctx.beginPath();
        ctx.moveTo(floorPts[0][0], floorPts[0][1]);
        for (let i = 1; i < floorPts.length; i++) ctx.lineTo(floorPts[i][0], floorPts[i][1]);
        ctx.closePath();
        ctx.fillStyle = arena.floorMain;
        ctx.fill();
        ctx.strokeStyle = arena.floorTrim;
        ctx.lineWidth = 3.0;
        ctx.stroke();
      }

      // 3. Decorative stone tiles
      if (quality !== 'eco') {
        const midR = R * 0.72;
        const innerR = R * 0.34;
        for (let i = 0; i < sides; i += 2) {
          const a0 = (i / sides) * Math.PI * 2;
          const a1 = ((i + 1) / sides) * Math.PI * 2;
          const p0 = this.project({ x: Math.cos(a0) * innerR, y: 0.01, z: Math.sin(a0) * innerR });
          const p1 = this.project({ x: Math.cos(a0) * midR, y: 0.01, z: Math.sin(a0) * midR });
          const p2 = this.project({ x: Math.cos(a1) * midR, y: 0.01, z: Math.sin(a1) * midR });
          const p3 = this.project({ x: Math.cos(a1) * innerR, y: 0.01, z: Math.sin(a1) * innerR });
          if (p0 && p1 && p2 && p3) {
            ctx.beginPath();
            ctx.moveTo(p0.sx, p0.sy);
            ctx.lineTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.lineTo(p3.sx, p3.sy);
            ctx.closePath();
            ctx.fillStyle = arena.floorAlt;
            ctx.fill();
          }
        }
      }

      const ringScales = quality === 'eco' ? [0.55] : [0.28, 0.56, 0.84, 0.96];
      for (let rIdx = 0; rIdx < ringScales.length; rIdx++) {
        const rad = R * ringScales[rIdx];
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= sides; i++) {
          const a = (i / sides) * Math.PI * 2;
          const proj = this.project({ x: Math.cos(a) * rad, y: 0.02, z: Math.sin(a) * rad });
          if (!proj) continue;
          if (!started) {
            ctx.moveTo(proj.sx, proj.sy);
            started = true;
          } else {
            ctx.lineTo(proj.sx, proj.sy);
          }
        }
        if (rIdx === 0 && quality !== 'eco') {
          ctx.fillStyle = arena.floorAlt;
          ctx.fill();
        }
        ctx.strokeStyle =
          rIdx === 0 || rIdx === ringScales.length - 1 ? `${arena.floorTrim}88` : 'rgba(255,255,255,0.08)';
        ctx.lineWidth = rIdx === 0 ? 1.8 : 1;
        ctx.stroke();
      }
    }

    // 4. Special Terrain & Biome Zones (cull distant zones smoothly in Overworld)
    for (const tz of arena.terrainZones) {
      if ((arena.isOverworld || R > 120) && Math.hypot(tz.x - focusX, tz.z - focusZ) > tz.radius + 135) continue;
      const segs = quality === 'eco' ? 12 : 20;
      const pts: [number, number][] = [];
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const p = this.project({
          x: tz.x + Math.cos(a) * tz.radius,
          y: 0.03,
          z: tz.z + Math.sin(a) * tz.radius,
        });
        if (p) pts.push([p.sx, p.sy]);
      }
      if (pts.length >= 3) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        const pulse = 0.25 + 0.08 * Math.sin(time * 3.2 + tz.x);
        ctx.fillStyle = tz.color;
        ctx.globalAlpha =
          tz.kind === 'water_lake'
            ? 0.48
            : tz.kind === 'meadow'
              ? 0.22
              : tz.kind === 'ash_land'
                ? 0.26
                : tz.kind === 'magma_pool'
                  ? pulse + 0.16
                  : pulse;
        ctx.fill();
        ctx.globalAlpha = tz.kind === 'meadow' || tz.kind === 'ash_land' ? 0.35 : 0.78;
        ctx.strokeStyle = tz.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    }

    if (arena.hazardType === 'lava_vents' && quality !== 'eco') {
      const pulse = 0.25 + 0.16 * Math.sin(time * 3);
      ctx.strokeStyle = `rgba(249, 115, 22, ${pulse.toFixed(2)})`;
      ctx.lineWidth = 2.4;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + 0.4;
        const p1 = this.project({ x: Math.cos(a) * 4.5, y: 0.03, z: Math.sin(a) * 4.5 });
        const p2 = this.project({ x: Math.cos(a) * (R * 0.88), y: 0.03, z: Math.sin(a) * (R * 0.88) });
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.stroke();
        }
      }
    }
  }

  public addArenaPillars(
    arena: ArenaDef,
    time: number,
    quality: GraphicsQuality,
    shrineCooldowns?: Record<string, number>,
    playerPos?: Vec3
  ) {
    const segs = this.getSegCount(quality);
    const cullDist = this.getCullDist(quality);

    // 0. Smooth Sculpted Octagonal Stepped Platforms
    for (const plat of arena.platforms) {
      if (playerPos && Math.hypot(plat.x - playerPos.x, plat.z - playerPos.z) > cullDist + 18) continue;
      this.addTaperedCylinder(
        { x: plat.x, y: plat.height * 0.45, z: plat.z },
        plat.radius * 1.04,
        plat.radius * 0.98,
        plat.height * 0.9,
        0.39,
        8,
        plat.color
      );
      this.addTaperedCylinder(
        { x: plat.x, y: plat.height - 0.06, z: plat.z },
        plat.radius,
        plat.radius * 0.97,
        0.12,
        0.39,
        8,
        plat.trimColor,
        { unlit: quality === 'high' || quality === 'ultra' || quality === 'mythic' }
      );
    }

    // 1. Sculpted Smooth Pillars & Spires
    for (const pillar of arena.pillars) {
      if (playerPos && Math.hypot(pillar.x - playerPos.x, pillar.z - playerPos.z) > cullDist) continue;
      const base: Vec3 = { x: pillar.x, y: 0, z: pillar.z };
      const r = pillar.radius;
      const h = pillar.height;

      if (pillar.style === 'column') {
        this.addTaperedCylinder({ x: base.x, y: 0.3, z: base.z }, r * 1.25, r * 1.05, 0.6, 0, segs, arena.pillarColor);
        this.addTaperedCylinder({ x: base.x, y: h * 0.5, z: base.z }, r * 0.85, r * 0.72, h, 0, segs, arena.pillarColor);
        this.addTaperedCylinder({ x: base.x, y: h + 0.25, z: base.z }, r * 0.8, r * 1.15, 0.45, 0, segs, arena.pillarColor);
        this.addEllipsoid(
          { x: base.x, y: h + 0.95 + Math.sin(time * 5 + pillar.x) * 0.1, z: base.z },
          r * 0.48,
          r * 0.65,
          r * 0.48,
          time * 1.8,
          segs,
          4,
          arena.pillarAccent,
          { unlit: true }
        );
      } else if (pillar.style === 'obsidian') {
        this.addTaperedCylinder({ x: base.x, y: h * 0.38, z: base.z }, r * 1.12, r * 0.82, h * 0.76, 0.4, 6, arena.pillarColor);
        this.addTaperedCylinder({ x: base.x, y: h * 0.95, z: base.z }, r * 0.82, 0, h * 0.44, 0.4, 6, arena.pillarColor);
        this.addTorusRing({ x: base.x, y: h * 0.52, z: base.z }, r * 0.98, 0.12, 0, Math.PI / 2, 8, arena.pillarAccent, {
          unlit: true,
        });
      } else if (pillar.style === 'ice') {
        this.addTaperedCylinder({ x: base.x, y: h * 0.35, z: base.z }, r * 0.96, r * 0.78, h * 0.7, 0.5, 6, arena.pillarColor, {
          alpha: 0.92,
          specular: 0.5,
        });
        this.addTaperedCylinder({ x: base.x, y: h * 0.95, z: base.z }, r * 0.78, 0, h * 0.54, 0.5, 6, arena.pillarAccent, {
          alpha: 0.9,
          specular: 0.6,
        });
      } else {
        this.addTaperedCylinder({ x: base.x, y: 0.35, z: base.z }, r * 1.2, r * 1.0, 0.7, 0, 6, arena.pillarColor);
        this.addTaperedCylinder({ x: base.x, y: h * 0.5, z: base.z }, r * 0.86, r * 0.58, h * 0.85, 0, 6, arena.pillarColor);
        this.addTaperedCylinder({ x: base.x, y: h * 1.04, z: base.z }, r * 0.58, 0, h * 0.32, 0, 6, arena.pillarAccent, {
          unlit: true,
        });
      }
    }

    // 2. Sculpted Gate Arches
    for (const arch of arena.arches) {
      if (playerPos && Math.hypot(arch.x - playerPos.x, arch.z - playerPos.z) > cullDist) continue;
      const cos = Math.cos(arch.rotY);
      const sin = Math.sin(arch.rotY);
      const halfW = arch.width * 0.5;
      const leftPos = { x: arch.x - cos * halfW, y: arch.height * 0.5, z: arch.z + sin * halfW };
      const rightPos = { x: arch.x + cos * halfW, y: arch.height * 0.5, z: arch.z - sin * halfW };
      this.addTaperedCylinder(leftPos, 0.65, 0.52, arch.height, arch.rotY, segs, arena.pillarColor);
      this.addTaperedCylinder(rightPos, 0.65, 0.52, arch.height, arch.rotY, segs, arena.pillarColor);
      this.addBox(
        { x: arch.x, y: arch.height + 0.4, z: arch.z },
        { x: arch.width + 1.5, y: 0.75, z: 1.1 },
        arch.rotY,
        arena.pillarColor
      );
      this.addEllipsoid(
        { x: arch.x, y: arch.height + 0.52, z: arch.z },
        arch.width * 0.25,
        0.38,
        0.42,
        arch.rotY,
        6,
        3,
        arena.pillarAccent,
        { unlit: true }
      );
    }

    // 3. Perimeter Guard Torches (combat arenas)
    if (quality !== 'eco' && !arena.isOverworld) {
      const rimCount = quality === 'mythic' ? 14 : quality === 'ultra' ? 12 : quality === 'high' ? 10 : 8;
      const rimR = arena.radius - 0.9;
      for (let i = 0; i < rimCount; i++) {
        const a = (i / rimCount) * Math.PI * 2 + 0.38;
        const bx = Math.cos(a) * rimR;
        const bz = Math.sin(a) * rimR;
        if (playerPos && Math.hypot(bx - playerPos.x, bz - playerPos.z) > cullDist) continue;
        this.addTaperedCylinder({ x: bx, y: 0.6, z: bz }, 0.38, 0.28, 1.2, a, 6, arena.pillarColor);
        this.addEllipsoid({ x: bx, y: 1.32, z: bz }, 0.24, 0.28, 0.24, a, 6, 3, arena.pillarAccent, { unlit: true });
      }
    }

    // 4. Interactive Smooth Shrines
    for (const sh of arena.shrines) {
      if (playerPos && Math.hypot(sh.x - playerPos.x, sh.z - playerPos.z) > cullDist) continue;
      let baseH = 0;
      for (const plat of arena.platforms) {
        if (Math.hypot(sh.x - plat.x, sh.z - plat.z) <= plat.radius) {
          baseH = Math.max(baseH, plat.height);
        }
      }
      const cd = shrineCooldowns?.[sh.id] ?? 0;
      const active = cd <= 0;
      this.addTaperedCylinder({ x: sh.x, y: baseH + 0.16, z: sh.z }, 0.95, 0.78, 0.3, 0, 8, arena.pillarColor);
      if (active) {
        const bob = baseH + 1.15 + Math.sin(time * 3.8 + sh.x) * 0.22;
        this.addEllipsoid({ x: sh.x, y: bob, z: sh.z }, 0.38, 0.52, 0.38, time * 2.2, 6, 4, sh.color, {
          unlit: true,
        });
      } else {
        this.addEllipsoid({ x: sh.x, y: baseH + 0.65, z: sh.z }, 0.24, 0.32, 0.24, time, 6, 3, '#475569', {
          alpha: 0.5,
        });
      }
    }
  }

  private addSceneryProp(prop: SceneryPropDef, time: number, quality: GraphicsQuality) {
    const s = prop.scale ?? 1;
    const segs = this.getSegCount(quality);
    const yaw = prop.rotY ?? 0;

    if (prop.kind === 'pine_tree') {
      // Smooth brown trunk + 3 layered emerald pine cones
      this.addTaperedCylinder({ x: prop.x, y: 1.1 * s, z: prop.z }, 0.34 * s, 0.2 * s, 2.2 * s, yaw, segs, '#5C402B');
      this.addTaperedCylinder({ x: prop.x, y: 2.35 * s, z: prop.z }, 1.65 * s, 0.25 * s, 2.1 * s, yaw, segs, '#1E6B47');
      this.addTaperedCylinder({ x: prop.x, y: 3.45 * s, z: prop.z }, 1.25 * s, 0.15 * s, 1.85 * s, yaw, segs, '#248255');
      this.addTaperedCylinder({ x: prop.x, y: 4.45 * s, z: prop.z }, 0.82 * s, 0, 1.45 * s, yaw, segs, '#34A86E');
    } else if (prop.kind === 'cottage') {
      const wall = prop.color || '#D8CFC2';
      const roof = prop.accentColor || '#991B1B';
      this.addBox({ x: prop.x, y: 1.45 * s, z: prop.z }, { x: 3.4 * s, y: 2.9 * s, z: 3.2 * s }, yaw, wall);
      // Warm arched door + glowing window
      this.addBox(
        this.localToWorld({ x: prop.x, y: 0.9 * s, z: prop.z }, yaw, 0, 0, 1.63 * s),
        { x: 0.85 * s, y: 1.75 * s, z: 0.1 },
        yaw,
        '#4A3324'
      );
      this.addBox(
        this.localToWorld({ x: prop.x, y: 1.65 * s, z: prop.z }, yaw, 1.05 * s, 0, 1.63 * s),
        { x: 0.62 * s, y: 0.62 * s, z: 0.08 },
        yaw,
        '#FDE68A',
        { unlit: true }
      );
      // Steep pitched roof cone/pyramid
      this.addPyramid({ x: prop.x, y: 2.9 * s, z: prop.z }, 2.75 * s, 2.1 * s, yaw, roof);
    } else if (prop.kind === 'fountain') {
      this.addTaperedCylinder({ x: prop.x, y: 0.55 * s, z: prop.z }, 2.55 * s, 2.75 * s, 0.7 * s, 0, segs + 2, '#64748B');
      this.addTaperedCylinder({ x: prop.x, y: 0.82 * s, z: prop.z }, 2.25 * s, 2.25 * s, 0.12 * s, 0, segs + 2, '#38BDF8', {
        unlit: true,
        alpha: 0.78,
      });
      this.addTaperedCylinder({ x: prop.x, y: 1.75 * s, z: prop.z }, 0.65 * s, 0.36 * s, 2.2 * s, 0, segs, '#94A3B8');
      this.addTaperedCylinder({ x: prop.x, y: 2.1 * s, z: prop.z }, 1.25 * s, 1.35 * s, 0.28 * s, 0, segs, '#CBD5E1');
      const pulse = 3.25 * s + Math.sin(time * 4) * 0.12;
      this.addEllipsoid({ x: prop.x, y: pulse, z: prop.z }, 0.45 * s, 0.65 * s, 0.45 * s, time * 2, segs, 4, '#38BDF8', {
        unlit: true,
      });
    } else if (prop.kind === 'crystal_cluster') {
      const col = prop.color || '#38BDF8';
      this.addTaperedCylinder({ x: prop.x, y: 1.05 * s, z: prop.z }, 0.52 * s, 0, 2.3 * s, yaw, 6, col, {
        unlit: true,
        alpha: 0.88,
      });
      this.addTaperedCylinder(
        { x: prop.x - 0.5 * s, y: 0.7 * s, z: prop.z + 0.3 * s },
        0.35 * s,
        0,
        1.55 * s,
        yaw,
        6,
        col,
        { rotZ: 0.32, unlit: true, alpha: 0.84 }
      );
      this.addTaperedCylinder(
        { x: prop.x + 0.48 * s, y: 0.65 * s, z: prop.z - 0.25 * s },
        0.34 * s,
        0,
        1.45 * s,
        yaw,
        6,
        col,
        { rotZ: -0.28, unlit: true, alpha: 0.84 }
      );
    } else if (prop.kind === 'boulder') {
      const col = prop.color || '#475569';
      this.addEllipsoid({ x: prop.x, y: 0.65 * s, z: prop.z }, 1.45 * s, 1.05 * s, 1.25 * s, yaw, segs, 4, col);
      this.addEllipsoid({ x: prop.x + 0.8 * s, y: 0.45 * s, z: prop.z + 0.5 * s }, 0.85 * s, 0.65 * s, 0.8 * s, yaw, 6, 3, col);
    } else if (prop.kind === 'ruin_pillar') {
      this.addTaperedCylinder({ x: prop.x, y: 1.5 * s, z: prop.z }, 0.72 * s, 0.58 * s, 3.0 * s, yaw, segs, '#5E6C80');
      this.addTaperedCylinder({ x: prop.x, y: 0.22 * s, z: prop.z }, 0.98 * s, 0.88 * s, 0.44 * s, yaw, segs, '#475569');
    } else if (prop.kind === 'campfire') {
      this.addTorusRing({ x: prop.x, y: 0.16 * s, z: prop.z }, 0.8 * s, 0.18 * s, 0, Math.PI / 2, 8, '#52525B');
      this.addTaperedCylinder(
        { x: prop.x, y: 0.55 * s + Math.sin(time * 9) * 0.06, z: prop.z },
        0.36 * s,
        0,
        1.1 * s,
        time * 3,
        6,
        '#F97316',
        { unlit: true }
      );
    }
  }

  private addWorldChestMesh(chest: WorldChestDef, opened: boolean, time: number, groundY: number) {
    const isMythic = chest.tier === 'mythic';
    const baseCol = opened ? '#374151' : isMythic ? '#3B256B' : '#6B4226';
    const trimCol = opened ? '#6B7280' : isMythic ? '#38BDF8' : '#E6B85C';
    const y = groundY + (opened ? 0 : Math.sin(time * 3.2 + chest.x) * 0.08);
    this.addBox({ x: chest.x, y: y + 0.36, z: chest.z }, { x: 1.15, y: 0.68, z: 0.82 }, 0.3, baseCol);
    this.addTaperedCylinder(
      { x: chest.x, y: y + (opened ? 0.85 : 0.76), z: chest.z },
      0.56,
      0.42,
      0.32,
      0.3,
      6,
      trimCol,
      { unlit: !opened }
    );
    if (!opened) {
      this.addEllipsoid(
        { x: chest.x, y: y + 1.45 + Math.sin(time * 4 + chest.z) * 0.14, z: chest.z },
        0.22,
        0.34,
        0.22,
        time * 2,
        6,
        3,
        trimCol,
        { unlit: true }
      );
    }
  }

  private addWorldPortalMesh(portal: WorldPortalDef, time: number, quality: GraphicsQuality) {
    const segs = quality === 'eco' ? 10 : 14;
    this.addTaperedCylinder({ x: portal.x, y: 0.18, z: portal.z }, 1.9, 1.65, 0.32, 0, 8, '#334155');
    this.addTorusRing({ x: portal.x, y: 2.05, z: portal.z }, 1.5, 0.18, time * 0.7, 0, segs, portal.color, {
      unlit: true,
    });
    this.addEllipsoid({ x: portal.x, y: 2.05, z: portal.z }, 1.15, 1.35, 0.18, time * 0.7, 8, 4, portal.color, {
      unlit: true,
      alpha: 0.42,
    });
  }

  private addWorldNodeMesh(node: OverworldNodeDef, gathered: boolean, time: number, groundY: number) {
    if (gathered) return;
    const o: Vec3 = { x: node.x, y: groundY, z: node.z };
    if (node.kind === 'herb') {
      this.addEllipsoid({ x: o.x, y: o.y + 0.14, z: o.z }, 0.55, 0.1, 0.55, 0, 6, 3, '#15803D');
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + time * 0.4;
        this.addTaperedCylinder(
          { x: o.x + Math.cos(a) * 0.24, y: o.y + 0.38, z: o.z + Math.sin(a) * 0.24 },
          0.16,
          0.02,
          0.55,
          a,
          5,
          '#22C55E',
          { rotZ: 0.35 }
        );
      }
      this.addEllipsoid(
        { x: o.x, y: o.y + 0.68 + Math.sin(time * 3.8 + node.x) * 0.08, z: o.z },
        0.18,
        0.2,
        0.18,
        time * 2,
        6,
        3,
        '#FDE047',
        { unlit: true }
      );
    } else if (node.kind === 'ore') {
      this.addEllipsoid({ x: o.x, y: o.y + 0.42, z: o.z }, 0.72, 0.52, 0.62, node.x, 6, 3, '#475569');
      this.addOctahedron({ x: o.x - 0.18, y: o.y + 0.85, z: o.z + 0.1 }, 0.26, 0.48, 0.4, '#F59E0B', {
        unlit: true,
      });
      this.addOctahedron({ x: o.x + 0.22, y: o.y + 0.76, z: o.z - 0.15 }, 0.2, 0.4, 1.1, '#FBBF24', {
        unlit: true,
      });
    } else {
      const bob = o.y + 1.05 + Math.sin(time * 3.4 + node.z) * 0.14;
      this.addTaperedCylinder({ x: o.x, y: o.y + 0.14, z: o.z }, 0.65, 0.5, 0.28, 0, 6, '#334155');
      this.addOctahedron({ x: o.x, y: bob, z: o.z }, 0.38, 1.05, time * 1.8, '#38BDF8', {
        unlit: true,
        alpha: 0.92,
      });
      this.addTorusRing({ x: o.x, y: bob, z: o.z }, 0.56, 0.06, time * 2.2, Math.PI / 2 - 0.3, 8, '#A855F7', {
        unlit: true,
      });
    }
  }

  private addWorldWaystoneMesh(ws: WorldFastTravelDef, discovered: boolean, time: number, groundY: number) {
    const col = discovered ? '#38BDF8' : '#64748B';
    this.addTaperedCylinder({ x: ws.x, y: groundY + 0.18, z: ws.z }, 1.25, 1.0, 0.36, 0, 8, '#1E293B');
    this.addTaperedCylinder({ x: ws.x, y: groundY + 1.45, z: ws.z }, 0.48, 0.24, 2.3, 0.4, 6, '#334155');
    this.addOctahedron(
      { x: ws.x, y: groundY + 2.95 + Math.sin(time * 2.8) * 0.1, z: ws.z },
      0.34,
      0.72,
      time * 1.4,
      col,
      { unlit: discovered }
    );
    if (discovered) {
      this.addTorusRing({ x: ws.x, y: groundY + 1.9, z: ws.z }, 0.85, 0.06, time * 1.6, Math.PI / 2, 10, '#38BDF8', {
        unlit: true,
      });
    }
  }

  private addWorldNpcMesh(npc: WorldNpcDef, time: number, quality: GraphicsQuality) {
    const segs = this.getSegCount(quality);
    const bob = Math.sin(time * 2.2 + npc.x) * 0.04;
    const o: Vec3 = { x: npc.x, y: bob, z: npc.z };
    const robe = npc.robeColor || '#1E3A5F';
    const accent = npc.accentColor || '#E6B85C';

    // Articulated Peaceful NPC Body + Collar
    this.addTaperedCylinder(this.localToWorld(o, npc.yaw, 0, 0.78, 0), 0.54, 0.34, 1.5, npc.yaw, segs, robe);
    this.addTaperedCylinder(this.localToWorld(o, npc.yaw, 0, 1.38, 0), 0.4, 0.26, 0.38, npc.yaw, segs, accent);
    this.addTaperedCylinder(this.localToWorld(o, npc.yaw, 0, 1.56, 0), 0.14, 0.12, 0.18, npc.yaw, 6, '#E8BA97');
    // Smooth Head & Headpiece
    this.addEllipsoid(this.localToWorld(o, npc.yaw, 0, 1.84, 0), 0.24, 0.26, 0.24, npc.yaw, segs, 4, '#F1C6A3');
    this.addTaperedCylinder(this.localToWorld(o, npc.yaw, 0, 2.04, -0.02), 0.35, 0.06, 0.46, npc.yaw, segs, robe);

    // Role Prop
    if (npc.role === 'blacksmith') {
      const hammer = this.localToWorld(o, npc.yaw, 0.48, 1.05, 0.22);
      this.addTaperedCylinder(hammer, 0.06, 0.05, 1.15, npc.yaw, 6, '#7C4F2B');
      this.addBox(this.localToWorld(o, npc.yaw, 0.48, 1.65, 0.22), { x: 0.38, y: 0.22, z: 0.24 }, npc.yaw, '#94A3B8');
    } else if (npc.role === 'alchemist') {
      this.addEllipsoid(
        this.localToWorld(o, npc.yaw, 0.44, 1.25 + Math.sin(time * 4) * 0.06, 0.26),
        0.18,
        0.22,
        0.18,
        time,
        6,
        3,
        '#34D399',
        { unlit: true }
      );
    } else if (npc.role === 'merchant') {
      this.addBox(this.localToWorld(o, npc.yaw, 0, 1.12, -0.38), { x: 0.65, y: 0.72, z: 0.36 }, npc.yaw, '#92400E');
      this.addEllipsoid(this.localToWorld(o, npc.yaw, 0, 1.56, -0.38), 0.22, 0.16, 0.22, 0, 6, 3, '#FBBF24', {
        unlit: true,
      });
    } else {
      const staffPos = this.localToWorld(o, npc.yaw, 0.46, 1.1, 0.2);
      this.addTaperedCylinder(staffPos, 0.06, 0.05, 2.1, npc.yaw, 6, '#7C4F2B');
      this.addEllipsoid(
        this.localToWorld(o, npc.yaw, 0.46, 2.25 + Math.sin(time * 4) * 0.06, 0.2),
        0.16,
        0.2,
        0.16,
        time * 2,
        6,
        3,
        accent,
        { unlit: true }
      );
    }
  }

  public drawGroundShadow(ctx: CanvasRenderingContext2D, x: number, y: number, z: number, radius: number, alpha = 0.38) {
    const c = this.project({ x, y: Math.max(0.04, y * 0.15 + 0.04), z });
    if (!c) return;
    const heightScale = Math.max(0.55, 1 - y * 0.12);
    const rx = Math.max(4, radius * c.scale * 0.95 * heightScale);
    const ry = Math.max(2, rx * 0.42);
    ctx.save();
    ctx.fillStyle = `rgba(5, 7, 11, ${alpha * heightScale})`;
    ctx.beginPath();
    ctx.ellipse(c.sx, c.sy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private addSecretBossShrineMesh(boss: SecretBossDef, defeated: boolean, time: number) {
    const col = defeated ? '#475569' : boss.accentColor;
    const aura = defeated ? '#64748B' : boss.auraColor;
    this.addTaperedCylinder({ x: boss.x, y: 0.45, z: boss.z }, 2.4, 2.0, 0.9, 0, 8, '#1E293B');
    this.addBox({ x: boss.x, y: 2.1, z: boss.z }, { x: 1.05, y: 2.8, z: 1.05 }, time * 0.18, '#0F172A');
    if (!defeated) {
      const hoverY = 4.35 + Math.sin(time * 3.4) * 0.25;
      this.addEllipsoid({ x: boss.x, y: hoverY, z: boss.z }, 0.55, 0.95, 0.55, time * 2.4, 6, 4, col, {
        unlit: true,
      });
      this.addTorusRing({ x: boss.x, y: hoverY, z: boss.z }, 1.25, 0.14, time * 1.9, Math.PI / 2, 10, aura, {
        unlit: true,
      });
      this.addTaperedCylinder({ x: boss.x, y: 5.5, z: boss.z }, 0.28, 0.04, 8.5, time, 6, aura, {
        unlit: true,
        alpha: 0.34,
      });
    }
  }

  public drawGroundRing(ctx: CanvasRenderingContext2D, ring: RenderRingVfx) {
    const segs = 22;
    ctx.save();
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const p = this.project({
        x: ring.x + Math.cos(a) * ring.radius,
        y: ring.y + 0.06,
        z: ring.z + Math.sin(a) * ring.radius,
      });
      if (!p) continue;
      if (!started) {
        ctx.moveTo(p.sx, p.sy);
        started = true;
      } else {
        ctx.lineTo(p.sx, p.sy);
      }
    }
    ctx.globalAlpha = Math.max(0, Math.min(1, ring.alpha));
    if (ring.filled) {
      ctx.fillStyle = ring.color;
      ctx.fill();
    }
    ctx.strokeStyle = ring.color;
    ctx.lineWidth = ring.isFusion ? 4.2 : 3;
    ctx.stroke();

    if (ring.isFusion && ring.radius > 0.6) {
      ctx.beginPath();
      let startedInner = false;
      const innerR = ring.radius * 0.72;
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const p = this.project({
          x: ring.x + Math.cos(a) * innerR,
          y: ring.y + 0.08,
          z: ring.z + Math.sin(a) * innerR,
        });
        if (!p) continue;
        if (!startedInner) {
          ctx.moveTo(p.sx, p.sy);
          startedInner = true;
        } else {
          ctx.lineTo(p.sx, p.sy);
        }
      }
      ctx.strokeStyle = ring.secondaryColor || '#FEF08A';
      ctx.lineWidth = 2.4;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  public addFighterMesh(fighter: RenderFighter, time: number, quality: GraphicsQuality = 'balanced') {
    const segs = this.getSegCount(quality);
    const av = fighter.avatar;
    const overdriveScale = fighter.overdriveActive ? 1.2 : 1.0;
    const hScale = av.heightScale * overdriveScale;
    const buildWidth =
      (av.build === 'heavy' ? 1.2 : av.build === 'agile' ? 0.86 : 1.0) * av.shoulderScale * overdriveScale;
    const flash = fighter.hitFlash;
    const freeze = fighter.frozenTimer > 0 ? 1 : 0;

    const isMoving = fighter.animState === 'run';
    const isAttack = fighter.animState === 'attack' || fighter.animState === 'heavy';
    const isBlock = fighter.animState === 'block';
    const isDodge = fighter.animState === 'dodge';
    const isDead = fighter.animState === 'dead';

    const stride = isMoving ? Math.sin(fighter.walkPhase * 10) : 0;
    const bob = isMoving ? Math.abs(Math.cos(fighter.walkPhase * 10)) * 0.08 : Math.sin(time * 2.8) * 0.03;

    let rightArmPitch = stride * 0.55;
    let leftArmPitch = -stride * 0.55;
    let torsoTwist = 0;

    if (isAttack) {
      const p = Math.min(1, fighter.animTime / (fighter.animState === 'heavy' ? 0.42 : 0.28));
      const swing = Math.sin(p * Math.PI);
      const dir = fighter.comboStep % 2 === 0 ? 1 : -1;
      rightArmPitch = -1.35 + swing * 2.55;
      torsoTwist = dir * (-0.38 + swing * 0.92);
      leftArmPitch = av.weaponId === 'shadow_daggers' ? -1.05 + Math.cos(p * Math.PI) * 1.95 : -0.35;
    } else if (isBlock) {
      rightArmPitch = -0.95;
      leftArmPitch = -0.95;
    } else if (fighter.animState === 'power') {
      rightArmPitch = -2.25;
      leftArmPitch = -2.25;
    }

    const origin: Vec3 = {
      x: fighter.x,
      y: fighter.y + (isDead ? -0.65 : isDodge ? 0.16 : bob),
      z: fighter.z,
    };
    const bodyYaw = fighter.yaw + torsoTwist;
    const tiltX = isDead ? 1.45 : isDodge ? 0.65 : fighter.animState === 'heavy' ? 0.18 : isMoving ? 0.1 : 0;

    const hipY = 0.84 * hScale;
    const legH = 0.78 * hScale;
    const legR = 0.13 * buildWidth;
    const limbSegs = Math.max(6, segs - 2);

    // 1. Articulated 2-Segment Sculpted Legs (Thigh + Knee Guard + Shin + Sculpted Boot)
    if (quality === 'eco') {
      const leftLegPos = this.localToWorld(origin, fighter.yaw, -0.19 * buildWidth, legH * 0.52, stride * 0.22);
      const rightLegPos = this.localToWorld(origin, fighter.yaw, 0.19 * buildWidth, legH * 0.52, -stride * 0.22);
      this.addCapsuleLimb(leftLegPos, legR * 1.15, legR * 0.85, legH, fighter.yaw, limbSegs, av.primaryColor, {
        rotX: -stride * 0.55 + tiltX * 0.4,
        flashWhite: flash,
        freezeTint: freeze,
      });
      this.addCapsuleLimb(rightLegPos, legR * 1.15, legR * 0.85, legH, fighter.yaw, limbSegs, av.primaryColor, {
        rotX: stride * 0.55 + tiltX * 0.4,
        flashWhite: flash,
        freezeTint: freeze,
      });
    } else {
      for (const side of [-1, 1]) {
        const legSwing = side < 0 ? stride : -stride;
        const hipOffX = side * 0.19 * buildWidth;
        const thighPos = this.localToWorld(origin, fighter.yaw, hipOffX, hipY - legH * 0.25, legSwing * 0.14);
        const kneePos = this.localToWorld(origin, fighter.yaw, hipOffX, hipY - legH * 0.48, legSwing * 0.22);
        const shinPos = this.localToWorld(origin, fighter.yaw, hipOffX, hipY - legH * 0.72, legSwing * 0.2);

        this.addCapsuleLimb(thighPos, legR * 1.18, legR * 0.96, legH * 0.48, fighter.yaw, limbSegs, av.primaryColor, {
          rotX: -legSwing * 0.52 + tiltX * 0.35,
          flashWhite: flash,
          freezeTint: freeze,
        });
        this.addEllipsoid(kneePos, legR * 0.96, legR * 0.92, legR * 1.02, fighter.yaw, limbSegs, 3, av.secondaryColor, {
          flashWhite: flash,
          freezeTint: freeze,
          specular: 0.4,
        });
        this.addCapsuleLimb(shinPos, legR * 0.94, legR * 0.78, legH * 0.46, fighter.yaw, limbSegs, av.primaryColor, {
          rotX: -legSwing * 0.38 + tiltX * 0.25,
          flashWhite: flash,
          freezeTint: freeze,
        });
      }
    }

    this.addEllipsoid(
      this.localToWorld(origin, fighter.yaw, -0.19 * buildWidth, 0.12 * hScale, stride * 0.24 + 0.05),
      legR * 1.15,
      0.12 * hScale,
      legR * 1.6,
      fighter.yaw,
      6,
      3,
      av.secondaryColor,
      { flashWhite: flash, freezeTint: freeze }
    );
    this.addEllipsoid(
      this.localToWorld(origin, fighter.yaw, 0.19 * buildWidth, 0.12 * hScale, -stride * 0.24 + 0.05),
      legR * 1.15,
      0.12 * hScale,
      legR * 1.6,
      fighter.yaw,
      6,
      3,
      av.secondaryColor,
      { flashWhite: flash, freezeTint: freeze }
    );

    // 2. Anatomical V-Taper Sculpted Torso + Collar & Neck
    const torsoH = 0.84 * hScale;
    const torsoW = 0.72 * buildWidth;
    const torsoD =
      (av.armorStyle === 'titan_mail' || av.armorStyle === 'paladin_aegis'
        ? 0.48
        : av.armorStyle === 'plate' || av.armorStyle === 'dragon_scale'
          ? 0.42
          : 0.36) * buildWidth;
    const torsoPos = this.localToWorld(origin, bodyYaw, 0, hipY + torsoH * 0.48, 0);

    this.addSculptedTorso(
      torsoPos,
      torsoW,
      torsoW * 0.74,
      torsoD,
      torsoH,
      bodyYaw,
      segs,
      av.primaryColor,
      { rotX: tiltX, flashWhite: flash, freezeTint: freeze, specular: 0.35 }
    );

    if (
      av.armorStyle === 'plate' ||
      av.armorStyle === 'titan_mail' ||
      av.armorStyle === 'dragon_scale' ||
      av.armorStyle === 'paladin_aegis'
    ) {
      const chestPos = this.localToWorld(origin, bodyYaw, 0, hipY + torsoH * 0.58, torsoD * 0.24);
      this.addEllipsoid(
        chestPos,
        torsoW * 0.42,
        torsoH * 0.28,
        0.16 * buildWidth,
        bodyYaw,
        segs,
        4,
        av.secondaryColor,
        { rotX: tiltX, flashWhite: flash, freezeTint: freeze, specular: 0.55 }
      );
      const corePos = this.localToWorld(origin, bodyYaw, 0, hipY + torsoH * 0.58, torsoD * 0.45);
      this.addEllipsoid(corePos, 0.12 * buildWidth, 0.15 * hScale, 0.1 * buildWidth, bodyYaw + time, 6, 3, av.accentColor, {
        unlit: true,
      });
      if (av.armorStyle === 'dragon_scale') {
        this.addTaperedCylinder(
          this.localToWorld(origin, bodyYaw, 0, hipY + torsoH * 0.74, -torsoD * 0.48),
          0.12 * buildWidth,
          0,
          0.32 * hScale,
          bodyYaw,
          6,
          av.accentColor
        );
      }
      if (av.armorStyle === 'paladin_aegis') {
        this.addTaperedCylinder(
          this.localToWorld(origin, bodyYaw, 0, hipY - 0.04, 0),
          torsoW * 0.56,
          torsoW * 0.46,
          0.38 * hScale,
          bodyYaw,
          segs,
          av.secondaryColor,
          { flashWhite: flash }
        );
      }
    } else if (av.armorStyle === 'mystic' || av.armorStyle === 'nomad_cloak' || av.armorStyle === 'arcane_robe') {
      const robePos = this.localToWorld(origin, bodyYaw, 0, hipY - 0.06, 0);
      this.addTaperedCylinder(robePos, torsoW * 0.58, torsoW * 0.44, 0.56 * hScale, bodyYaw, segs, av.secondaryColor, {
        flashWhite: flash,
        freezeTint: freeze,
      });
      if (av.armorStyle === 'arcane_robe') {
        this.addTorusRing(
          this.localToWorld(origin, bodyYaw, 0, hipY + torsoH * 0.9, -0.05),
          torsoW * 0.42,
          0.09,
          bodyYaw,
          Math.PI / 2 - 0.25,
          segs,
          av.accentColor,
          { unlit: true }
        );
      }
    }

    // Belt ring + Collar
    this.addTaperedCylinder(
      this.localToWorld(origin, bodyYaw, 0, hipY + 0.06 * hScale, 0),
      torsoW * 0.44,
      torsoW * 0.42,
      0.13 * hScale,
      bodyYaw,
      segs,
      av.secondaryColor,
      { flashWhite: flash, freezeTint: freeze }
    );
    this.addTaperedCylinder(
      this.localToWorld(origin, bodyYaw, 0, hipY + torsoH + 0.05 * hScale, 0.01),
      0.14 * buildWidth,
      0.11 * buildWidth,
      0.16 * hScale,
      bodyYaw,
      Math.max(6, limbSegs),
      av.skinTone,
      { flashWhite: flash, freezeTint: freeze }
    );

    // 3. Sculpted Rounded Shoulder Pauldrons & Articulated 2-Segment Arms
    const shoulderY = hipY + torsoH * 0.86;
    const shoulderOffset = torsoW * 0.56;
    const pauldronR =
      (av.armorStyle === 'titan_mail' || av.armorStyle === 'paladin_aegis'
        ? 0.24
        : av.armorStyle === 'plate' || av.armorStyle === 'dragon_scale'
          ? 0.2
          : 0.15) * buildWidth;

    this.addEllipsoid(
      this.localToWorld(origin, bodyYaw, -shoulderOffset, shoulderY, 0),
      pauldronR * 1.15,
      pauldronR,
      pauldronR * 1.1,
      bodyYaw,
      limbSegs,
      4,
      av.secondaryColor,
      { rotZ: 0.25, flashWhite: flash, freezeTint: freeze, specular: 0.45 }
    );
    this.addEllipsoid(
      this.localToWorld(origin, bodyYaw, shoulderOffset, shoulderY, 0),
      pauldronR * 1.15,
      pauldronR,
      pauldronR * 1.1,
      bodyYaw,
      limbSegs,
      4,
      av.secondaryColor,
      { rotZ: -0.25, flashWhite: flash, freezeTint: freeze, specular: 0.45 }
    );

    const armH = 0.68 * hScale;
    const armR = 0.1 * buildWidth;
    if (quality === 'eco') {
      const lArmPos = this.localToWorld(origin, bodyYaw, -shoulderOffset, shoulderY - armH * 0.42, Math.sin(leftArmPitch) * 0.22);
      const rArmPos = this.localToWorld(origin, bodyYaw, shoulderOffset, shoulderY - armH * 0.42, Math.sin(rightArmPitch) * 0.26);
      this.addCapsuleLimb(lArmPos, armR * 1.05, armR * 0.85, armH, bodyYaw, 6, av.skinTone, {
        rotX: leftArmPitch,
        flashWhite: flash,
        freezeTint: freeze,
      });
      this.addCapsuleLimb(rArmPos, armR * 1.05, armR * 0.85, armH, bodyYaw, 6, av.skinTone, {
        rotX: rightArmPitch,
        flashWhite: flash,
        freezeTint: freeze,
      });
    } else {
      for (const side of [-1, 1]) {
        const pitch = side < 0 ? leftArmPitch : rightArmPitch;
        const armX = side * shoulderOffset;
        const upperPos = this.localToWorld(origin, bodyYaw, armX, shoulderY - armH * 0.24, Math.sin(-pitch) * 0.12);
        const elbowPos = this.localToWorld(origin, bodyYaw, armX, shoulderY - armH * 0.46, Math.sin(-pitch) * 0.22);
        const forePos = this.localToWorld(origin, bodyYaw, armX, shoulderY - armH * 0.68, Math.sin(-pitch) * 0.34);

        this.addCapsuleLimb(upperPos, armR * 1.08, armR * 0.9, armH * 0.46, bodyYaw, limbSegs, av.primaryColor, {
          rotX: pitch * 0.85,
          flashWhite: flash,
          freezeTint: freeze,
        });
        this.addEllipsoid(elbowPos, armR * 0.88, armR * 0.85, armR * 0.88, bodyYaw, 6, 3, av.secondaryColor, {
          flashWhite: flash,
          freezeTint: freeze,
        });
        this.addCapsuleLimb(forePos, armR * 0.9, armR * 0.78, armH * 0.44, bodyYaw, limbSegs, av.skinTone, {
          rotX: pitch * 1.08 - 0.15,
          flashWhite: flash,
          freezeTint: freeze,
        });
        // Gauntlet wrist cuff
        this.addEllipsoid(
          this.localToWorld(origin, bodyYaw, armX, shoulderY - armH * 0.82, Math.sin(-pitch) * 0.4),
          armR * 1.02,
          armR * 0.8,
          armR * 1.02,
          bodyYaw,
          6,
          3,
          av.secondaryColor,
          { flashWhite: flash, freezeTint: freeze }
        );
      }
    }

    // 4. Smooth Sculpted Ellipsoid Head & All 9 Helm/Hair Styles
    const headY = hipY + torsoH + 0.3 * hScale;
    const headR = 0.24 * hScale;
    const headPos = this.localToWorld(origin, bodyYaw, 0, headY, 0.02);
    const headColor = av.headStyle === 'spiky_hair' || av.headStyle === 'war_crown' ? av.skinTone : av.helmetColor;

    this.addEllipsoid(headPos, headR, headR * 1.12, headR * 1.04, bodyYaw, segs, 4, headColor, {
      flashWhite: flash,
      freezeTint: freeze,
      specular: 0.25,
    });

    if (av.headStyle === 'tech_visor' || av.headStyle === 'void_mask') {
      const visorPos = this.localToWorld(origin, bodyYaw, 0, headY + 0.02 * hScale, headR * 0.94);
      this.addEllipsoid(visorPos, headR * 0.85, headR * 0.24, 0.06, bodyYaw, 6, 3, av.eyeGlow, { unlit: true });
    } else {
      const eyeL = this.localToWorld(origin, bodyYaw, -0.09 * hScale, headY + 0.03 * hScale, headR * 0.95);
      const eyeR = this.localToWorld(origin, bodyYaw, 0.09 * hScale, headY + 0.03 * hScale, headR * 0.95);
      this.addEllipsoid(eyeL, 0.045 * hScale, 0.032 * hScale, 0.04, bodyYaw, 6, 2, av.eyeGlow, { unlit: true });
      this.addEllipsoid(eyeR, 0.045 * hScale, 0.032 * hScale, 0.04, bodyYaw, 6, 2, av.eyeGlow, { unlit: true });
    }

    if (av.headStyle === 'spiky_hair') {
      this.addTaperedCylinder(
        this.localToWorld(origin, bodyYaw, 0, headY + headR * 0.82, -0.05),
        headR * 1.05,
        0,
        0.38 * hScale,
        bodyYaw,
        6,
        av.helmetColor,
        { rotX: -0.22, flashWhite: flash }
      );
      this.addTaperedCylinder(
        this.localToWorld(origin, bodyYaw, -0.14 * hScale, headY + headR * 0.65, -0.06),
        headR * 0.62,
        0,
        0.3 * hScale,
        bodyYaw,
        5,
        av.helmetColor,
        { rotZ: 0.38, flashWhite: flash }
      );
      this.addTaperedCylinder(
        this.localToWorld(origin, bodyYaw, 0.14 * hScale, headY + headR * 0.65, -0.06),
        headR * 0.62,
        0,
        0.3 * hScale,
        bodyYaw,
        5,
        av.helmetColor,
        { rotZ: -0.38, flashWhite: flash }
      );
    } else if (av.headStyle === 'knight_helm') {
      this.addEllipsoid(
        this.localToWorld(origin, bodyYaw, 0, headY + headR * 1.08, -0.04),
        0.07 * hScale,
        0.14 * hScale,
        headR * 1.15,
        bodyYaw,
        6,
        3,
        av.secondaryColor,
        { flashWhite: flash }
      );
    } else if (av.headStyle === 'shadow_hood') {
      this.addTaperedCylinder(
        this.localToWorld(origin, bodyYaw, 0, headY + 0.08 * hScale, -0.05),
        headR * 1.32,
        headR * 0.72,
        headR * 2.1,
        bodyYaw,
        segs,
        av.helmetColor,
        { rotX: -0.16, flashWhite: flash }
      );
    } else if (av.headStyle === 'war_crown' || av.headStyle === 'royal_crown_helm') {
      this.addTorusRing(
        this.localToWorld(origin, bodyYaw, 0, headY + headR * 0.85, 0),
        headR * 1.05,
        0.05 * hScale,
        bodyYaw,
        Math.PI / 2,
        segs,
        av.secondaryColor
      );
      for (let k = -1; k <= 1; k++) {
        this.addTaperedCylinder(
          this.localToWorld(origin, bodyYaw, k * 0.13 * hScale, headY + headR * 1.15, headR * 0.82),
          0.055 * hScale,
          0,
          0.2 * hScale,
          bodyYaw,
          5,
          av.accentColor,
          { unlit: true }
        );
      }
    } else if (av.headStyle === 'horned_helm') {
      this.addTaperedCylinder(
        this.localToWorld(origin, bodyYaw, -headR * 1.08, headY + headR * 0.65, 0),
        0.08 * hScale,
        0,
        0.46 * hScale,
        bodyYaw,
        6,
        av.secondaryColor,
        { rotZ: 0.42 }
      );
      this.addTaperedCylinder(
        this.localToWorld(origin, bodyYaw, headR * 1.08, headY + headR * 0.65, 0),
        0.08 * hScale,
        0,
        0.46 * hScale,
        bodyYaw,
        6,
        av.secondaryColor,
        { rotZ: -0.42 }
      );
    } else if (av.headStyle === 'phoenix_crest') {
      this.addTaperedCylinder(
        this.localToWorld(origin, bodyYaw, 0, headY + headR * 1.05, -0.06),
        0.08 * hScale,
        0,
        0.42 * hScale,
        bodyYaw,
        6,
        av.accentColor,
        { rotX: -0.35, unlit: true }
      );
      this.addTaperedCylinder(
        this.localToWorld(origin, bodyYaw, -headR * 0.95, headY + headR * 0.72, -0.08),
        0.07 * hScale,
        0,
        0.38 * hScale,
        bodyYaw,
        5,
        av.secondaryColor,
        { rotZ: 0.45 }
      );
      this.addTaperedCylinder(
        this.localToWorld(origin, bodyYaw, headR * 0.95, headY + headR * 0.72, -0.08),
        0.07 * hScale,
        0,
        0.38 * hScale,
        bodyYaw,
        5,
        av.secondaryColor,
        { rotZ: -0.45 }
      );
    } else if (av.headStyle === 'void_mask') {
      this.addEllipsoid(
        this.localToWorld(origin, bodyYaw, 0, headY + headR * 1.45, 0),
        0.1 * hScale,
        0.14 * hScale,
        0.1 * hScale,
        bodyYaw + time * 2,
        6,
        3,
        av.accentColor,
        { unlit: true }
      );
    }

    // 5. Sculpted Flowing Back Gear (All 8 Styles)
    if (av.backGear === 'battle_cape') {
      const capeSway = 0.24 + (isMoving ? 0.35 + Math.sin(fighter.walkPhase * 8) * 0.1 : Math.sin(time * 2) * 0.05);
      const capePos = this.localToWorld(origin, bodyYaw, 0, hipY + torsoH * 0.3, -torsoD * 0.65 - capeSway * 0.22);
      this.addTaperedCylinder(capePos, torsoW * 0.56, torsoW * 0.38, torsoH * 1.38, bodyYaw, 6, av.secondaryColor, {
        rotX: capeSway,
        flashWhite: flash,
      });
    } else if (av.backGear === 'energy_wings' || av.backGear === 'frost_wings') {
      const wingColor = av.backGear === 'frost_wings' ? '#7DD3FC' : av.accentColor;
      const wingFlap = Math.sin(time * 4.5) * 0.16;
      for (const side of [-1, 1]) {
        const wPos = this.localToWorld(origin, bodyYaw, side * 0.62 * buildWidth, shoulderY + 0.18, -torsoD * 0.65);
        this.addEllipsoid(wPos, 0.58 * hScale, 0.2 * hScale, 0.06, bodyYaw, 6, 3, wingColor, {
          rotZ: side * (-0.42 - wingFlap),
          unlit: true,
          alpha: 0.86,
        });
        const wSub = this.localToWorld(origin, bodyYaw, side * 0.44 * buildWidth, shoulderY - 0.06, -torsoD * 0.64);
        this.addEllipsoid(wSub, 0.42 * hScale, 0.14 * hScale, 0.05, bodyYaw, 6, 2, wingColor, {
          rotZ: side * (-0.65 - wingFlap),
          unlit: true,
          alpha: 0.72,
        });
      }
    } else if (av.backGear === 'back_scabbard') {
      const scab = this.localToWorld(origin, bodyYaw, 0, hipY + torsoH * 0.55, -torsoD * 0.58);
      this.addTaperedCylinder(scab, 0.06, 0.08, 1.35 * hScale, bodyYaw, 6, av.secondaryColor, { rotZ: 0.52 });
    } else if (av.backGear === 'flame_halo' || av.backGear === 'arcane_orbit') {
      const count = quality === 'eco' ? 3 : 4;
      for (let i = 0; i < count; i++) {
        const a = time * 2.4 + (i * Math.PI * 2) / count;
        const hp = this.localToWorld(
          origin,
          bodyYaw,
          Math.cos(a) * 0.58 * buildWidth,
          shoulderY + 0.25 + Math.sin(a) * 0.44 * hScale,
          -torsoD * 0.68
        );
        this.addEllipsoid(
          hp,
          0.11 * hScale,
          0.13 * hScale,
          0.11 * hScale,
          time * 3,
          6,
          3,
          av.backGear === 'arcane_orbit' ? '#A78BFA' : av.accentColor,
          { unlit: true }
        );
      }
    } else if (av.backGear === 'war_banner') {
      const pole = this.localToWorld(origin, bodyYaw, -0.18 * buildWidth, shoulderY + 0.45 * hScale, -torsoD * 0.66);
      this.addTaperedCylinder(pole, 0.045, 0.04, 1.8 * hScale, bodyYaw, 6, av.secondaryColor);
      const cloth = this.localToWorld(origin, bodyYaw, -0.18 * buildWidth, shoulderY + 0.82 * hScale, -torsoD * 0.8);
      this.addBox(cloth, { x: 0.52 * hScale, y: 0.82 * hScale, z: 0.06 }, bodyYaw, av.accentColor, { unlit: true });
    }

    // Aura orbiting orbs
    if (av.auraStyle && av.auraStyle !== 'none' && quality !== 'eco' && !isDead) {
      const auraColor =
        av.auraStyle === 'ember_sparks'
          ? '#F97316'
          : av.auraStyle === 'frost_mist'
            ? '#38BDF8'
            : av.auraStyle === 'royal_gold'
              ? '#F59E0B'
              : '#A855F7';
      const moteCount = quality === 'high' ? 3 : 2;
      for (let i = 0; i < moteCount; i++) {
        const a = time * 2.8 + (i * Math.PI * 2) / moteCount;
        const my = origin.y + 0.4 + ((time * 0.9 + i * 0.6) % 1.45) * hScale;
        this.addEllipsoid(
          {
            x: fighter.x + Math.cos(a) * 0.85 * buildWidth,
            y: my,
            z: fighter.z + Math.sin(a) * 0.85 * buildWidth,
          },
          0.08,
          0.11,
          0.08,
          a * 2,
          6,
          2,
          auraColor,
          { unlit: true, alpha: 0.85 }
        );
      }
    }

    // 6. Sculpted 3D Weapon Mesh
    this.addWeaponMesh(
      av.weaponId,
      origin,
      bodyYaw,
      shoulderOffset,
      shoulderY - armH * 0.62,
      rightArmPitch,
      leftArmPitch,
      hScale,
      time,
      fighter.weaponLevel ?? 1
    );

    if (fighter.shieldActive) {
      this.addTorusRing(
        { x: fighter.x, y: fighter.y + 1.15 * hScale, z: fighter.z },
        1.15,
        0.09,
        time * 2.5,
        Math.PI / 2,
        10,
        '#10B981',
        { unlit: true }
      );
    }

    if (fighter.overdriveActive) {
      for (let i = 0; i < 3; i++) {
        const a = time * 4 + (i * Math.PI * 2) / 3;
        this.addEllipsoid(
          {
            x: fighter.x + Math.cos(a) * 1.1,
            y: fighter.y + 0.7 + ((time * 1.6 + i) % 1.4),
            z: fighter.z + Math.sin(a) * 1.1,
          },
          0.12,
          0.22,
          0.12,
          a,
          6,
          3,
          '#F59E0B',
          { unlit: true, alpha: 0.8 }
        );
      }
    }
  }

  private addWeaponMesh(
    weaponId: WeaponId,
    origin: Vec3,
    yaw: number,
    handX: number,
    handY: number,
    rightPitch: number,
    leftPitch: number,
    scale: number,
    time: number,
    weaponLevel: number
  ) {
    const w = WEAPONS[weaponId] || WEAPONS.vanguard_sword;
    const glowBoost = weaponLevel >= 3;
    const handForward = 0.35 + Math.sin(-rightPitch) * 0.35;
    const weaponTilt = rightPitch + 0.95;

    if (weaponId === 'vanguard_sword') {
      const hilt = this.localToWorld(origin, yaw, handX, handY, handForward);
      this.addTaperedCylinder(hilt, 0.16 * scale, 0.14 * scale, 0.12 * scale, yaw, 6, w.hiltColor, { rotX: weaponTilt });
      const blade = this.localToWorld(origin, yaw, handX, handY + Math.cos(weaponTilt) * 0.78 * scale, handForward + Math.sin(weaponTilt) * 0.78 * scale);
      this.addTaperedCylinder(blade, 0.08 * scale, 0.02 * scale, 1.48 * scale, yaw, 6, w.bladeColor, {
        rotX: weaponTilt,
        unlit: glowBoost,
        specular: 0.7,
      });
      if (weaponLevel >= 2) {
        this.addTaperedCylinder(blade, 0.04 * scale, 0.01 * scale, 1.3 * scale, yaw, 4, w.energyColor, {
          rotX: weaponTilt,
          unlit: true,
        });
      }
    } else if (weaponId === 'shadow_daggers') {
      const rPos = this.localToWorld(origin, yaw, handX, handY, handForward + 0.25);
      this.addTaperedCylinder(rPos, 0.06 * scale, 0, 0.76 * scale, yaw, 5, w.bladeColor, {
        rotX: rightPitch + 1.25,
        unlit: glowBoost,
      });
      const lForward = 0.35 + Math.sin(-leftPitch) * 0.35;
      const lPos = this.localToWorld(origin, yaw, -handX, handY, lForward + 0.25);
      this.addTaperedCylinder(lPos, 0.06 * scale, 0, 0.76 * scale, yaw, 5, w.bladeColor, {
        rotX: leftPitch + 1.25,
        unlit: glowBoost,
      });
    } else if (weaponId === 'storm_hammer') {
      const shaft = this.localToWorld(origin, yaw, handX, handY + Math.cos(weaponTilt) * 0.55 * scale, handForward + Math.sin(weaponTilt) * 0.55 * scale);
      this.addTaperedCylinder(shaft, 0.06 * scale, 0.05 * scale, 1.45 * scale, yaw, 6, w.hiltColor, { rotX: weaponTilt });
      const head = this.localToWorld(origin, yaw, handX, handY + Math.cos(weaponTilt) * 1.22 * scale, handForward + Math.sin(weaponTilt) * 1.22 * scale);
      this.addEllipsoid(head, 0.32 * scale, 0.22 * scale, 0.24 * scale, yaw, 6, 4, w.bladeColor, { rotX: weaponTilt, specular: 0.6 });
      this.addTorusRing(head, 0.26 * scale, 0.05 * scale, yaw, weaponTilt, 8, w.energyColor, { unlit: true });
    } else if (weaponId === 'dragon_spear') {
      const pole = this.localToWorld(origin, yaw, handX, handY + Math.cos(weaponTilt) * 0.7 * scale, handForward + Math.sin(weaponTilt) * 0.7 * scale);
      this.addTaperedCylinder(pole, 0.05 * scale, 0.04 * scale, 2.15 * scale, yaw, 6, w.hiltColor, { rotX: weaponTilt });
      const tip = this.localToWorld(origin, yaw, handX, handY + Math.cos(weaponTilt) * 1.82 * scale, handForward + Math.sin(weaponTilt) * 1.82 * scale);
      this.addTaperedCylinder(tip, 0.14 * scale, 0, 0.62 * scale, yaw, 6, w.energyColor, { rotX: weaponTilt, unlit: true });
    } else if (weaponId === 'solar_bow') {
      const bowPos = this.localToWorld(origin, yaw, -handX * 0.85, handY + 0.2 * scale, 0.55);
      this.addTaperedCylinder(bowPos, 0.055 * scale, 0.055 * scale, 1.2 * scale, yaw, 6, w.bladeColor, { rotX: 0.1 });
      const topLimb = this.localToWorld(origin, yaw, -handX * 0.85, handY + 0.78 * scale, 0.38);
      const botLimb = this.localToWorld(origin, yaw, -handX * 0.85, handY - 0.38 * scale, 0.38);
      this.addTaperedCylinder(topLimb, 0.06 * scale, 0.02 * scale, 0.36 * scale, yaw, 5, w.energyColor, { rotX: -0.55, unlit: true });
      this.addTaperedCylinder(botLimb, 0.06 * scale, 0.02 * scale, 0.36 * scale, yaw, 5, w.energyColor, { rotX: 0.55, unlit: true });
    } else if (weaponId === 'void_staff' || weaponId === 'crimson_wand' || weaponId === 'radiant_scepter') {
      const staffH = weaponId === 'crimson_wand' ? 1.32 * scale : 1.85 * scale;
      const staff = this.localToWorld(origin, yaw, handX, handY + 0.5 * scale, handForward + 0.12);
      this.addTaperedCylinder(staff, 0.055 * scale, 0.045 * scale, staffH, yaw, 6, w.hiltColor, { rotX: 0.22 });
      const orbPos = this.localToWorld(
        origin,
        yaw,
        handX,
        handY + (weaponId === 'crimson_wand' ? 1.22 : 1.58) * scale + Math.sin(time * 5) * 0.07,
        handForward + 0.28
      );
      this.addEllipsoid(orbPos, 0.2 * scale, 0.24 * scale, 0.2 * scale, time * 2.8, 6, 4, w.energyColor, { unlit: true });
      if (weaponId === 'radiant_scepter') {
        this.addTorusRing(orbPos, 0.3 * scale, 0.045 * scale, yaw + time, 0.3, 8, w.bladeColor, { unlit: true });
      }
    } else if (weaponId === 'arcane_tome') {
      const tomePos = this.localToWorld(
        origin,
        yaw,
        handX * 1.05,
        handY + 0.45 * scale + Math.sin(time * 4) * 0.08,
        handForward + 0.45
      );
      this.addBox(tomePos, { x: 0.46 * scale, y: 0.14 * scale, z: 0.56 * scale }, yaw + 0.3, w.bladeColor, { rotX: -0.35 });
      this.addEllipsoid(
        { x: tomePos.x, y: tomePos.y + 0.32 * scale, z: tomePos.z },
        0.15 * scale,
        0.18 * scale,
        0.15 * scale,
        time * 3.5,
        6,
        3,
        w.energyColor,
        { unlit: true }
      );
    } else if (weaponId === 'astral_censer') {
      const orbPos = this.localToWorld(
        origin,
        yaw,
        handX * 1.15,
        handY + 0.72 * scale + Math.sin(time * 3.6) * 0.12,
        handForward + 0.36
      );
      this.addEllipsoid(orbPos, 0.22 * scale, 0.25 * scale, 0.22 * scale, time * 2.4, 6, 4, w.energyColor, { unlit: true });
      this.addTorusRing(orbPos, 0.38 * scale, 0.045 * scale, time * 2, 0.6, 8, w.bladeColor, {
        unlit: true,
        alpha: 0.84,
      });
    } else if (weaponId === 'bastion_mace' || weaponId === 'aegis_greatshield') {
      const maceShaft = this.localToWorld(
        origin,
        yaw,
        handX,
        handY + Math.cos(weaponTilt) * 0.45 * scale,
        handForward + Math.sin(weaponTilt) * 0.45 * scale
      );
      this.addTaperedCylinder(maceShaft, 0.05 * scale, 0.045 * scale, 1.05 * scale, yaw, 6, w.hiltColor, { rotX: weaponTilt });
      const maceHead = this.localToWorld(
        origin,
        yaw,
        handX,
        handY + Math.cos(weaponTilt) * 0.96 * scale,
        handForward + Math.sin(weaponTilt) * 0.96 * scale
      );
      this.addEllipsoid(maceHead, 0.2 * scale, 0.22 * scale, 0.2 * scale, yaw, 6, 4, w.energyColor, { unlit: glowBoost });

      const shSize = weaponId === 'aegis_greatshield' ? 1.25 : 0.92;
      const shPos = this.localToWorld(origin, yaw, -handX * 1.12, handY + 0.22 * scale, 0.42);
      this.addEllipsoid(shPos, 0.38 * shSize * scale, 0.52 * shSize * scale, 0.1 * scale, yaw + 0.25, 8, 4, w.bladeColor, {
        specular: 0.5,
      });
      this.addEllipsoid(
        this.localToWorld(origin, yaw, -handX * 1.15, handY + 0.22 * scale, 0.5),
        0.16 * shSize * scale,
        0.24 * shSize * scale,
        0.06 * scale,
        yaw + 0.25,
        6,
        3,
        w.energyColor,
        { unlit: true }
      );
    }
  }

  public addMonsterMesh(m: RenderMonster, time: number, quality: GraphicsQuality = 'balanced') {
    const segs = Math.max(6, this.getSegCount(quality) - 2);
    const def = MONSTERS[m.archetype] || MONSTERS.ash_stalker;
    const s = def.scale;
    const flash = m.hitFlash;
    const freeze = m.frozenTimer > 0 ? 1 : 0;
    const stride = Math.sin(m.walkPhase * 9);
    const bob = Math.abs(Math.cos(m.walkPhase * 9)) * 0.08 * s;
    const origin: Vec3 = { x: m.x, y: m.y + bob, z: m.z };
    const atkLift = m.attackTimer > 0 ? Math.sin(Math.min(1, m.attackTimer * 4) * Math.PI) * 1.1 : 0;

    if (m.archetype === 'ash_stalker') {
      // Sculpted Wolf Beast
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 0.62 * s, 0), 0.34 * s, 0.28 * s, 0.64 * s, m.yaw, segs, 4, def.bodyColor, {
        flashWhite: flash,
        freezeTint: freeze,
      });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 0.82 * s, 0.68 * s), 0.24 * s, 0.22 * s, 0.3 * s, m.yaw, segs, 4, def.bodyColor, {
        flashWhite: flash,
        freezeTint: freeze,
      });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, -0.12 * s, 0.88 * s, 0.9 * s), 0.05 * s, 0.04 * s, 0.04 * s, m.yaw, 5, 2, def.eyeColor, { unlit: true });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0.12 * s, 0.88 * s, 0.9 * s), 0.05 * s, 0.04 * s, 0.04 * s, m.yaw, 5, 2, def.eyeColor, { unlit: true });
      this.addTaperedCylinder(this.localToWorld(origin, m.yaw, 0, 0.95 * s, -0.1 * s), 0.16 * s, 0, 0.42 * s, m.yaw, 6, def.accentColor, { rotX: -0.35 });
      const legs: [number, number][] = [[-0.25, 0.36], [0.25, 0.36], [-0.25, -0.36], [0.25, -0.36]];
      legs.forEach(([lx, lz], idx) => {
        const sw = idx % 2 === 0 ? stride : -stride;
        this.addCapsuleLimb(
          this.localToWorld(origin, m.yaw, lx * s, 0.3 * s, (lz + sw * 0.16) * s),
          0.09 * s,
          0.07 * s,
          0.54 * s,
          m.yaw,
          5,
          def.bodyColor,
          { flashWhite: flash, freezeTint: freeze }
        );
      });
    } else if (m.archetype === 'venom_crawler') {
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 0.42 * s, 0), 0.52 * s, 0.24 * s, 0.58 * s, m.yaw, segs, 4, def.bodyColor, {
        flashWhite: flash,
        freezeTint: freeze,
      });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 0.68 * s, -0.25 * s), 0.26 * s, 0.24 * s, 0.28 * s, time * 2, 6, 3, def.accentColor, { unlit: true });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 0.5 * s, 0.62 * s), 0.26 * s, 0.18 * s, 0.24 * s, m.yaw, 6, 3, def.bodyColor, {
        flashWhite: flash,
        freezeTint: freeze,
      });
      for (const side of [-1, 1]) {
        for (let l = -1; l <= 1; l++) {
          const sw = (l + (side > 0 ? 1 : 0)) % 2 === 0 ? stride : -stride;
          this.addCapsuleLimb(
            this.localToWorld(origin, m.yaw, side * 0.58 * s, 0.24 * s, (l * 0.34 + sw * 0.12) * s),
            0.07 * s,
            0.05 * s,
            0.46 * s,
            m.yaw,
            5,
            def.bodyColor,
            { rotZ: side * 0.85, flashWhite: flash }
          );
        }
      }
    } else if (m.archetype === 'ember_imp' || m.archetype === 'frost_specter') {
      const hoverY = 0.45 + Math.sin(time * 5 + m.x) * 0.16;
      const ho: Vec3 = { x: m.x, y: m.y + hoverY, z: m.z };
      this.addTaperedCylinder(this.localToWorld(ho, m.yaw, 0, 0.68 * s, 0), 0.2 * s, 0.32 * s, 0.72 * s, m.yaw, segs, def.bodyColor, {
        flashWhite: flash,
        freezeTint: freeze,
      });
      this.addEllipsoid(this.localToWorld(ho, m.yaw, 0, 1.24 * s, 0.05 * s), 0.24 * s, 0.25 * s, 0.24 * s, m.yaw, segs, 4, def.bodyColor, {
        flashWhite: flash,
        freezeTint: freeze,
      });
      this.addEllipsoid(this.localToWorld(ho, m.yaw, 0, 1.26 * s, 0.28 * s), 0.14 * s, 0.06 * s, 0.05 * s, m.yaw, 6, 2, def.eyeColor, { unlit: true });
      this.addTaperedCylinder(this.localToWorld(ho, m.yaw, -0.18 * s, 1.48 * s, 0), 0.08 * s, 0, 0.35 * s, m.yaw, 5, def.accentColor, { rotZ: 0.3 });
      this.addTaperedCylinder(this.localToWorld(ho, m.yaw, 0.18 * s, 1.48 * s, 0), 0.08 * s, 0, 0.35 * s, m.yaw, 5, def.accentColor, { rotZ: -0.3 });
      const flap = Math.sin(time * 12) * 0.3;
      this.addEllipsoid(this.localToWorld(ho, m.yaw, -0.52 * s, 0.9 * s, -0.18 * s), 0.36 * s, 0.14 * s, 0.06 * s, m.yaw, 6, 2, def.accentColor, {
        rotZ: 0.32 + flap,
        unlit: m.archetype === 'frost_specter',
      });
      this.addEllipsoid(this.localToWorld(ho, m.yaw, 0.52 * s, 0.9 * s, -0.18 * s), 0.36 * s, 0.14 * s, 0.06 * s, m.yaw, 6, 2, def.accentColor, {
        rotZ: -0.32 - flap,
        unlit: m.archetype === 'frost_specter',
      });
    } else if (m.archetype === 'obsidian_golem') {
      this.addCapsuleLimb(this.localToWorld(origin, m.yaw, -0.32 * s, 0.42 * s, stride * 0.18 * s), 0.22 * s, 0.18 * s, 0.82 * s, m.yaw, 6, def.bodyColor, { flashWhite: flash, freezeTint: freeze });
      this.addCapsuleLimb(this.localToWorld(origin, m.yaw, 0.32 * s, 0.42 * s, -stride * 0.18 * s), 0.22 * s, 0.18 * s, 0.82 * s, m.yaw, 6, def.bodyColor, { flashWhite: flash, freezeTint: freeze });
      this.addSculptedTorso(this.localToWorld(origin, m.yaw, 0, 1.28 * s, 0), 1.2 * s, 0.78 * s, 0.76 * s, 1.0 * s, m.yaw, segs, def.bodyColor, { flashWhite: flash, freezeTint: freeze });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 1.3 * s, 0.4 * s), 0.22 * s, 0.26 * s, 0.16 * s, time * 2, 6, 3, def.accentColor, { unlit: true });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 1.94 * s, 0.08 * s), 0.26 * s, 0.24 * s, 0.26 * s, m.yaw, segs, 4, def.bodyColor, { flashWhite: flash, freezeTint: freeze });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 1.95 * s, 0.32 * s), 0.16 * s, 0.06 * s, 0.05 * s, m.yaw, 6, 2, def.eyeColor, { unlit: true });
      const slamY = 1.05 * s + atkLift * 0.65 * s;
      this.addCapsuleLimb(this.localToWorld(origin, m.yaw, -0.8 * s, slamY, 0.24 * s), 0.24 * s, 0.19 * s, 0.9 * s, m.yaw, 6, def.bodyColor, { rotX: -atkLift, flashWhite: flash, freezeTint: freeze });
      this.addCapsuleLimb(this.localToWorld(origin, m.yaw, 0.8 * s, slamY, 0.24 * s), 0.24 * s, 0.19 * s, 0.9 * s, m.yaw, 6, def.bodyColor, { rotX: -atkLift, flashWhite: flash, freezeTint: freeze });
    } else if (m.archetype === 'wraith_knight' || m.archetype === 'shadow_reaper') {
      const hover = 0.26 + Math.sin(time * 4 + m.z) * 0.1;
      const wo: Vec3 = { x: m.x, y: m.y + hover, z: m.z };
      this.addTaperedCylinder(this.localToWorld(wo, m.yaw, 0, 0.58 * s, 0), 0.52 * s, 0.22 * s, 1.15 * s, m.yaw, segs, def.bodyColor, { flashWhite: flash, freezeTint: freeze });
      this.addSculptedTorso(this.localToWorld(wo, m.yaw, 0, 1.3 * s, 0), 0.78 * s, 0.52 * s, 0.46 * s, 0.65 * s, m.yaw, segs, def.bodyColor, { flashWhite: flash, freezeTint: freeze });
      this.addEllipsoid(this.localToWorld(wo, m.yaw, 0, 1.82 * s, 0), 0.24 * s, 0.26 * s, 0.24 * s, m.yaw, segs, 4, '#181E2C', { flashWhite: flash, freezeTint: freeze });
      this.addEllipsoid(this.localToWorld(wo, m.yaw, 0, 1.84 * s, 0.22 * s), 0.16 * s, 0.05 * s, 0.04 * s, m.yaw, 6, 2, def.eyeColor, { unlit: true });
      this.addTaperedCylinder(
        this.localToWorld(wo, m.yaw, 0.56 * s, 1.22 * s, 0.65 * s),
        0.08 * s,
        0.01 * s,
        1.65 * s,
        m.yaw,
        5,
        def.accentColor,
        { rotX: 1.15 - atkLift * 1.4, unlit: true }
      );
      if (m.archetype === 'shadow_reaper') {
        this.addTaperedCylinder(
          this.localToWorld(wo, m.yaw, 0.45 * s, 1.95 * s, 0.9 * s),
          0.14 * s,
          0,
          0.72 * s,
          m.yaw,
          5,
          def.accentColor,
          { rotZ: 1.4, unlit: true }
        );
      }
    } else {
      // Sculpted Epic Bosses: Magma Behemoth & Void Colossus
      this.addCapsuleLimb(this.localToWorld(origin, m.yaw, -0.35 * s, 0.46 * s, stride * 0.16 * s), 0.22 * s, 0.18 * s, 0.92 * s, m.yaw, 6, def.bodyColor, { flashWhite: flash, freezeTint: freeze });
      this.addCapsuleLimb(this.localToWorld(origin, m.yaw, 0.35 * s, 0.46 * s, -stride * 0.16 * s), 0.22 * s, 0.18 * s, 0.92 * s, m.yaw, 6, def.bodyColor, { flashWhite: flash, freezeTint: freeze });
      this.addSculptedTorso(this.localToWorld(origin, m.yaw, 0, 1.38 * s, 0), 1.25 * s, 0.85 * s, 0.8 * s, 1.1 * s, m.yaw, segs, def.bodyColor, { flashWhite: flash, freezeTint: freeze });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 1.44 * s, 0.42 * s), 0.26 * s, 0.32 * s, 0.18 * s, time * 2.5, 6, 4, def.accentColor, { unlit: true });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, -0.78 * s, 1.8 * s, 0), 0.28 * s, 0.26 * s, 0.28 * s, m.yaw, 6, 4, '#302030', { flashWhite: flash });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0.78 * s, 1.8 * s, 0), 0.28 * s, 0.26 * s, 0.28 * s, m.yaw, 6, 4, '#302030', { flashWhite: flash });
      this.addTaperedCylinder(this.localToWorld(origin, m.yaw, -0.82 * s, 2.15 * s, 0), 0.14 * s, 0, 0.5 * s, m.yaw, 6, def.accentColor, { unlit: true });
      this.addTaperedCylinder(this.localToWorld(origin, m.yaw, 0.82 * s, 2.15 * s, 0), 0.14 * s, 0, 0.5 * s, m.yaw, 6, def.accentColor, { unlit: true });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 2.18 * s, 0.05 * s), 0.28 * s, 0.28 * s, 0.28 * s, m.yaw, segs, 4, def.bodyColor, { flashWhite: flash });
      this.addEllipsoid(this.localToWorld(origin, m.yaw, 0, 2.2 * s, 0.32 * s), 0.18 * s, 0.07 * s, 0.05 * s, m.yaw, 6, 2, def.eyeColor, { unlit: true });
      this.addTaperedCylinder(this.localToWorld(origin, m.yaw, -0.34 * s, 2.58 * s, 0), 0.11 * s, 0, 0.65 * s, m.yaw, 5, def.accentColor, { rotZ: 0.3 });
      this.addTaperedCylinder(this.localToWorld(origin, m.yaw, 0.34 * s, 2.58 * s, 0), 0.11 * s, 0, 0.65 * s, m.yaw, 5, def.accentColor, { rotZ: -0.3 });
      if (m.archetype === 'void_colossus') {
        this.addTorusRing(
          this.localToWorld(origin, m.yaw, 0, 2.85 * s, 0),
          0.46 * s,
          0.08 * s,
          time * 2.5,
          Math.PI / 2,
          10,
          '#38BDF8',
          { unlit: true }
        );
      }
      const cleaver = this.localToWorld(origin, m.yaw, 0.86 * s, 1.45 * s + atkLift * 0.5 * s, 0.75 * s);
      this.addTaperedCylinder(cleaver, 0.16 * s, 0.02 * s, 2.0 * s, m.yaw, 5, def.accentColor, {
        rotX: 1.15 - atkLift * 1.4,
        unlit: true,
      });
    }
  }

  public renderScene(ctx: CanvasRenderingContext2D, width: number, height: number, camera: Camera3D, scene: RenderScenePayload) {
    const camYaw = Math.atan2(camera.pos.x - camera.target.x, camera.pos.z - camera.target.z);
    const isOverworld = Boolean(scene.isOverworld || scene.arena.isOverworld);
    this.beginFrame(ctx, width, height, camera, scene.arena.fogColor, isOverworld);

    const p1 = scene.fighters.find((f) => f.team === 'player1');
    const playerPos = p1 ? { x: p1.x, y: p1.y, z: p1.z } : undefined;

    // 1. Sky & Horizon Mountains (with Chunk Biome Atmosphere Tinting)
    this.drawSkyAndBackdrop(ctx, scene.arena, camYaw, scene.quality, scene.time, scene.biomeSkyTint);

    // 2. Floor, Biome Regions & Terrain Patches
    this.drawArenaGround(ctx, scene.arena, scene.quality, scene.time);

    // 3. Ground Shadows, Telegraph Rings & Manhwa Runic Casting Circles
    const shadowCull = scene.quality === 'eco' || scene.quality === 'balanced' ? 34 : 52;
    if (scene.quality !== 'eco') {
      for (const p of scene.arena.pillars) {
        if (playerPos && Math.hypot(p.x - playerPos.x, p.z - playerPos.z) > shadowCull) continue;
        this.drawGroundShadow(ctx, p.x, 0, p.z, p.radius * 1.35, 0.3);
      }
    }
    for (const f of scene.fighters) {
      if (f.animState !== 'dead') {
        this.drawGroundShadow(ctx, f.x, f.y, f.z, 0.88 * f.avatar.shoulderScale, 0.42);
        if (f.animState === 'power' || f.overdriveActive || f.shieldActive) {
          const runeCol = f.overdriveActive ? '#F59E0B' : f.shieldActive ? '#10B981' : f.avatar.accentColor || '#38BDF8';
          const pulse = 1.45 + Math.sin(scene.time * 9) * 0.14;
          this.drawGroundRing(ctx, {
            x: f.x,
            y: f.y + 0.04,
            z: f.z,
            radius: pulse,
            maxRadius: pulse,
            color: runeCol,
            alpha: f.animState === 'power' ? 0.88 : 0.48,
          });
          if (scene.quality !== 'eco') {
            this.drawGroundRing(ctx, {
              x: f.x,
              y: f.y + 0.05,
              z: f.z,
              radius: pulse * 0.72,
              maxRadius: pulse * 0.72,
              color: f.avatar.primaryColor || runeCol,
              alpha: 0.45,
            });
          }
        }
      }
    }
    for (const m of scene.monsters) {
      if (playerPos && isOverworld && Math.hypot(m.x - playerPos.x, m.z - playerPos.z) > shadowCull) continue;
      const def = MONSTERS[m.archetype] || MONSTERS.ash_stalker;
      this.drawGroundShadow(ctx, m.x, m.y, m.z, 0.9 * def.scale, 0.42);
      if (m.telegraphTimer > 0) {
        this.drawGroundRing(ctx, {
          x: m.x,
          y: m.y + 0.04,
          z: m.z,
          radius: m.telegraphRadius,
          maxRadius: m.telegraphRadius,
          color: 'rgba(239, 68, 68, 0.48)',
          alpha: 0.85,
          filled: true,
        });
      }
    }
    for (const sh of scene.arena.shrines) {
      if (playerPos && isOverworld && Math.hypot(sh.x - playerPos.x, sh.z - playerPos.z) > 48) continue;
      let baseH = 0;
      for (const plat of scene.arena.platforms) {
        if (Math.hypot(sh.x - plat.x, sh.z - plat.z) <= plat.radius) {
          baseH = Math.max(baseH, plat.height);
        }
      }
      const cd = scene.shrineCooldowns?.[sh.id] ?? 0;
      this.drawGroundRing(ctx, {
        x: sh.x,
        y: baseH + 0.04,
        z: sh.z,
        radius: 1.75,
        maxRadius: 1.75,
        color: cd <= 0 ? sh.color : 'rgba(148,163,184,0.35)',
        alpha: cd <= 0 ? 0.75 : 0.35,
      });
    }
    for (const ring of scene.rings) {
      this.drawGroundRing(ctx, ring);
    }

    // 4. Add 3D Solid Meshes
    this.addArenaPillars(scene.arena, scene.time, scene.quality, scene.shrineCooldowns, playerPos);

    // Overworld Scenery Props, NPCs, Resources, Waystones, Treasure Chests, and Portals
    const objCull = this.getCullDist(scene.quality);
    if (isOverworld) {
      if (scene.arena.sceneryProps) {
        for (const prop of scene.arena.sceneryProps) {
          if (playerPos && Math.hypot(prop.x - playerPos.x, prop.z - playerPos.z) > objCull) continue;
          this.addSceneryProp(prop, scene.time, scene.quality);
        }
      }
      if (scene.arena.worldNpcs) {
        for (const npc of scene.arena.worldNpcs) {
          if (playerPos && Math.hypot(npc.x - playerPos.x, npc.z - playerPos.z) > objCull) continue;
          this.addWorldNpcMesh(npc, scene.time, scene.quality);
        }
      }
      if (scene.arena.worldNodes) {
        for (const node of scene.arena.worldNodes) {
          if (playerPos && Math.hypot(node.x - playerPos.x, node.z - playerPos.z) > objCull) continue;
          const gathered = Boolean(scene.gatheredNodeIds?.includes(node.id));
          this.addWorldNodeMesh(node, gathered, scene.time, 0);
        }
      }
      if (scene.arena.worldWaystones) {
        for (const ws of scene.arena.worldWaystones) {
          if (playerPos && Math.hypot(ws.x - playerPos.x, ws.z - playerPos.z) > objCull) continue;
          const discovered = Boolean(scene.discoveredWaystoneIds?.includes(ws.id));
          this.addWorldWaystoneMesh(ws, discovered, scene.time, 0);
        }
      }
      if (scene.arena.worldChests) {
        for (const chest of scene.arena.worldChests) {
          if (playerPos && Math.hypot(chest.x - playerPos.x, chest.z - playerPos.z) > objCull) continue;
          const opened = Boolean(scene.openedChests?.includes(chest.id));
          let gy = 0;
          for (const plat of scene.arena.platforms) {
            if (Math.hypot(chest.x - plat.x, chest.z - plat.z) <= plat.radius) {
              gy = Math.max(gy, plat.height);
            }
          }
          this.addWorldChestMesh(chest, opened, scene.time, gy);
        }
      }
      if (scene.arena.worldPortals) {
        for (const portal of scene.arena.worldPortals) {
          if (playerPos && Math.hypot(portal.x - playerPos.x, portal.z - playerPos.z) > objCull) continue;
          this.addWorldPortalMesh(portal, scene.time, scene.quality);
        }
      }
      if (scene.secretBossShrines) {
        for (const boss of scene.secretBossShrines) {
          if (playerPos && Math.hypot(boss.x - playerPos.x, boss.z - playerPos.z) > objCull + 20) continue;
          const defeated = Boolean(scene.defeatedSecretBossIds?.includes(boss.id));
          this.addSecretBossShrineMesh(boss, defeated, scene.time);
          if (!defeated) {
            this.drawGroundRing(ctx, {
              x: boss.x,
              y: 0.05,
              z: boss.z,
              radius: 4.5 + Math.sin(scene.time * 3.5) * 0.25,
              maxRadius: 4.8,
              color: boss.accentColor,
              alpha: 0.72,
              isFusion: true,
              secondaryColor: '#FEF08A',
            });
          }
        }
      }
      if (scene.worldEventZones) {
        for (const evt of scene.worldEventZones) {
          if (playerPos && Math.hypot(evt.x - playerPos.x, evt.z - playerPos.z) > objCull + 24) continue;
          const completed = Boolean(scene.completedWorldEventIds?.includes(evt.id));
          if (completed) continue;
          const isActive = scene.activeEventZoneId === evt.id;
          this.drawGroundRing(ctx, {
            x: evt.x,
            y: 0.05,
            z: evt.z,
            radius: isActive ? evt.radius * 0.75 : 5.2 + Math.sin(scene.time * 4) * 0.35,
            maxRadius: evt.radius,
            color: evt.color,
            alpha: isActive ? 0.85 : 0.65,
            isFusion: true,
            secondaryColor: '#FFFFFF',
          });
          this.addTaperedCylinder({ x: evt.x, y: 2.2, z: evt.z }, 0.45, 0.08, 4.4, scene.time * 1.5, 6, evt.color, {
            unlit: true,
            alpha: 0.45,
          });
        }
      }
    }

    if (scene.dashTrails && scene.quality !== 'eco') {
      for (const dt of scene.dashTrails) {
        this.addCapsuleLimb(
          { x: dt.x, y: dt.y + 1.0 * dt.hScale, z: dt.z },
          0.26,
          0.22,
          1.45 * dt.hScale,
          dt.yaw,
          6,
          dt.color,
          { unlit: true, alpha: dt.alpha * 0.55 }
        );
      }
    }

    for (const pk of scene.pickups) {
      const py = 0.72 + Math.sin(scene.time * 4.2 + pk.bobPhase) * 0.22;
      const col = pk.kind === 'heal' ? '#10B981' : pk.kind === 'energy' ? '#38BDF8' : '#F59E0B';
      this.addEllipsoid({ x: pk.x, y: py, z: pk.z }, 0.26, 0.34, 0.26, scene.time * 2.8 + pk.bobPhase, 6, 4, col, {
        unlit: true,
      });
    }

    for (const f of scene.fighters) {
      this.addFighterMesh(f, scene.time, scene.quality);
    }

    for (const m of scene.monsters) {
      if (playerPos && isOverworld && Math.hypot(m.x - playerPos.x, m.z - playerPos.z) > objCull) continue;
      this.addMonsterMesh(m, scene.time, scene.quality);
    }

    for (const proj of scene.projectiles) {
      const yaw = Math.atan2(proj.vx, proj.vz);
      if (proj.kind === 'arrow') {
        this.addTaperedCylinder({ x: proj.x, y: proj.y, z: proj.z }, 0.05, 0.01, 1.05, yaw, 5, proj.color, {
          rotX: Math.PI / 2,
          unlit: true,
        });
      } else {
        this.addEllipsoid({ x: proj.x, y: proj.y, z: proj.z }, proj.radius, proj.radius, proj.radius, scene.time * 8, 6, 3, proj.color, {
          unlit: true,
        });
      }
    }

    // 5. Sort & Rasterize all 3D Polygons
    this.flushFaces(ctx);

    // 6. Overlay VFX Ribbons, Lightning & Particles
    for (const s of scene.slashes) {
      this.drawSlashVfx(ctx, s, scene.quality);
    }
    for (const l of scene.lightnings) {
      this.drawLightningVfx(ctx, l);
    }
    for (const pt of scene.particles) {
      const pr = this.project({ x: pt.x, y: pt.y, z: pt.z });
      if (!pr) continue;
      const rad = Math.max(1.5, pt.size * pr.scale * 0.08);
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, pt.alpha));
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pr.sx, pr.sy, rad, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 7. 3D-Projected HP Bars
    for (const m of scene.monsters) {
      if (playerPos && isOverworld && Math.hypot(m.x - playerPos.x, m.z - playerPos.z) > 40) continue;
      const def = MONSTERS[m.archetype] || MONSTERS.ash_stalker;
      const top = this.project({ x: m.x, y: m.y + (def.isBoss ? 3.2 : 2.35) * def.scale, z: m.z });
      if (!top) continue;
      const barW = def.isBoss ? 98 : 54;
      const barH = def.isBoss ? 7 : 5;
      const pct = Math.max(0, Math.min(1, m.hp / m.maxHp));
      ctx.save();
      ctx.fillStyle = 'rgba(10, 13, 18, 0.82)';
      ctx.fillRect(top.sx - barW / 2 - 1, top.sy - barH / 2 - 1, barW + 2, barH + 2);
      ctx.fillStyle = def.isBoss ? '#F97316' : '#EF4444';
      ctx.fillRect(top.sx - barW / 2, top.sy - barH / 2, barW * pct, barH);
      if (def.isBoss) {
        ctx.font = '700 12px Tajawal, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FEF3C7';
        ctx.fillText(m.name, top.sx, top.sy - 9);
      }
      ctx.restore();
    }

    for (const f of scene.fighters) {
      if (f.team === 'player1' || f.animState === 'dead') continue;
      const top = this.project({ x: f.x, y: f.y + 2.55 * f.avatar.heightScale, z: f.z });
      if (!top) continue;
      const barW = 68;
      const barH = 6;
      const pct = Math.max(0, Math.min(1, f.hp / f.maxHp));
      ctx.save();
      ctx.fillStyle = 'rgba(10, 13, 18, 0.85)';
      ctx.fillRect(top.sx - barW / 2 - 1, top.sy - barH / 2 - 1, barW + 2, barH + 2);
      ctx.fillStyle = f.team === 'player2' ? '#38BDF8' : '#EF4444';
      ctx.fillRect(top.sx - barW / 2, top.sy - barH / 2, barW * pct, barH);
      ctx.font = '700 12px Tajawal, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#F8FAFC';
      ctx.fillText(f.name, top.sx, top.sy - 8);
      ctx.restore();
    }

    // 7b. Shrines, Overworld NPCs & Portals Floating Labels
    for (const sh of scene.arena.shrines) {
      if (playerPos && isOverworld && Math.hypot(sh.x - playerPos.x, sh.z - playerPos.z) > 26) continue;
      let baseH = 0;
      for (const plat of scene.arena.platforms) {
        if (Math.hypot(sh.x - plat.x, sh.z - plat.z) <= plat.radius) {
          baseH = Math.max(baseH, plat.height);
        }
      }
      const cd = scene.shrineCooldowns?.[sh.id] ?? 0;
      const p = this.project({ x: sh.x, y: baseH + 2.05, z: sh.z });
      if (!p) continue;
      ctx.save();
      ctx.font = '600 11px Tajawal, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = cd <= 0 ? sh.color : '#94A3B8';
      ctx.fillText(cd <= 0 ? sh.label : `${Math.ceil(cd)}ث`, p.sx, p.sy);
      ctx.restore();
    }

    if (isOverworld) {
      if (scene.arena.worldNpcs) {
        for (const npc of scene.arena.worldNpcs) {
          if (playerPos && Math.hypot(npc.x - playerPos.x, npc.z - playerPos.z) > 34) continue;
          const p = this.project({ x: npc.x, y: 2.75, z: npc.z });
          if (!p) continue;
          ctx.save();
          ctx.font = '700 12px Tajawal, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = npc.accentColor || '#E6B85C';
          ctx.fillText(`${npc.name} · ${npc.serviceLabel} [G]`, p.sx, p.sy);
          ctx.restore();
        }
      }
      if (scene.arena.worldNodes) {
        for (const node of scene.arena.worldNodes) {
          if (scene.gatheredNodeIds?.includes(node.id)) continue;
          if (playerPos && Math.hypot(node.x - playerPos.x, node.z - playerPos.z) > 22) continue;
          const p = this.project({ x: node.x, y: 1.75, z: node.z });
          if (!p) continue;
          ctx.save();
          ctx.font = '700 11px Tajawal, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = node.kind === 'crystal' ? '#38BDF8' : node.kind === 'ore' ? '#FBBF24' : '#34D399';
          ctx.fillText(`${node.label} [G]`, p.sx, p.sy);
          ctx.restore();
        }
      }
      if (scene.arena.worldWaystones) {
        for (const ws of scene.arena.worldWaystones) {
          if (playerPos && Math.hypot(ws.x - playerPos.x, ws.z - playerPos.z) > 32) continue;
          const p = this.project({ x: ws.x, y: 3.6, z: ws.z });
          if (!p) continue;
          ctx.save();
          ctx.font = '700 11px Tajawal, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#38BDF8';
          ctx.fillText(ws.name, p.sx, p.sy);
          ctx.restore();
        }
      }
      if (scene.arena.worldPortals) {
        for (const portal of scene.arena.worldPortals) {
          if (playerPos && Math.hypot(portal.x - playerPos.x, portal.z - playerPos.z) > 34) continue;
          const p = this.project({ x: portal.x, y: 3.9, z: portal.z });
          if (!p) continue;
          ctx.save();
          ctx.font = '700 12px Tajawal, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = portal.color;
          ctx.fillText(portal.label, p.sx, p.sy);
          ctx.restore();
        }
      }
      if (scene.secretBossShrines) {
        for (const boss of scene.secretBossShrines) {
          if (scene.defeatedSecretBossIds?.includes(boss.id)) continue;
          if (playerPos && Math.hypot(boss.x - playerPos.x, boss.z - playerPos.z) > 38) continue;
          const p = this.project({ x: boss.x, y: 5.2, z: boss.z });
          if (!p) continue;
          ctx.save();
          ctx.font = '700 12px Tajawal, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = boss.accentColor;
          ctx.fillText(`مزار سري: ${boss.name} [G]`, p.sx, p.sy);
          ctx.restore();
        }
      }
      if (scene.worldEventZones) {
        for (const evt of scene.worldEventZones) {
          if (scene.completedWorldEventIds?.includes(evt.id)) continue;
          if (playerPos && Math.hypot(evt.x - playerPos.x, evt.z - playerPos.z) > 40) continue;
          const p = this.project({ x: evt.x, y: 4.5, z: evt.z });
          if (!p) continue;
          ctx.save();
          ctx.font = '700 12px Tajawal, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = evt.color;
          ctx.fillText(`منطقة حدث: ${evt.name} [G]`, p.sx, p.sy);
          ctx.restore();
        }
      }
    }

    // 8. Floating Combat Numbers
    for (const ft of scene.floatingTexts) {
      const p = this.project({ x: ft.x, y: ft.y, z: ft.z });
      if (!p) continue;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, ft.alpha));
      ctx.font = `700 ${Math.round(15 * ft.scale)}px Changa, Tajawal, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillText(ft.text, p.sx + 1.5, p.sy + 1.5);
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, p.sx, p.sy);
      ctx.restore();
    }
  }

  private drawSlashVfx(ctx: CanvasRenderingContext2D, s: RenderSlashVfx, quality: GraphicsQuality = 'balanced') {
    const steps = quality === 'eco' ? 7 : 11;
    const outerPts: [number, number][] = [];
    const innerPts: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps - 0.5;
      const a = s.yaw + t * s.arcSpread;
      const yOff = t * s.tilt;
      const pOut = this.project({
        x: s.x + Math.sin(a) * s.radius,
        y: s.y + yOff,
        z: s.z + Math.cos(a) * s.radius,
      });
      const pIn = this.project({
        x: s.x + Math.sin(a) * (s.radius * 0.52),
        y: s.y + yOff * 0.58,
        z: s.z + Math.cos(a) * (s.radius * 0.52),
      });
      if (pOut && pIn) {
        outerPts.push([pOut.sx, pOut.sy]);
        innerPts.push([pIn.sx, pIn.sy]);
      }
    }
    if (outerPts.length < 3) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
    ctx.beginPath();
    ctx.moveTo(outerPts[0][0], outerPts[0][1]);
    for (let i = 1; i < outerPts.length; i++) ctx.lineTo(outerPts[i][0], outerPts[i][1]);
    for (let i = innerPts.length - 1; i >= 0; i--) ctx.lineTo(innerPts[i][0], innerPts[i][1]);
    ctx.closePath();
    ctx.fillStyle = s.color;
    ctx.fill();

    if (quality !== 'eco' || s.critical) {
      ctx.beginPath();
      ctx.moveTo(outerPts[0][0], outerPts[0][1]);
      for (let i = 1; i < outerPts.length; i++) ctx.lineTo(outerPts[i][0], outerPts[i][1]);
      ctx.strokeStyle = s.critical ? '#FEF08A' : '#FFFFFF';
      ctx.lineWidth = s.critical ? 3.4 : 2;
      ctx.stroke();

      if (s.critical) {
        ctx.beginPath();
        ctx.moveTo(innerPts[0][0], innerPts[0][1]);
        for (let i = 1; i < innerPts.length; i++) ctx.lineTo(innerPts[i][0], innerPts[i][1]);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  private drawLightningVfx(ctx: CanvasRenderingContext2D, l: RenderLightningVfx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, l.alpha));
    ctx.strokeStyle = l.color;
    ctx.lineWidth = 3.8;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 7; i++) {
      const y = (1 - i / 7) * 9.5;
      const jitterX = i === 7 ? 0 : Math.sin(l.seed + i * 3.7) * 0.65;
      const jitterZ = i === 7 ? 0 : Math.cos(l.seed + i * 2.9) * 0.65;
      const p = this.project({ x: l.x + jitterX, y, z: l.z + jitterZ });
      if (!p) continue;
      if (!started) {
        ctx.moveTo(p.sx, p.sy);
        started = true;
      } else {
        ctx.lineTo(p.sx, p.sy);
      }
    }
    ctx.stroke();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  public renderAvatarShowcase(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    avatar: AvatarConfig,
    orbitYaw: number,
    time: number,
    previewAction: 'idle' | 'attack' | 'power',
    weaponLevel = 1
  ) {
    const cam: Camera3D = {
      pos: {
        x: Math.sin(orbitYaw) * 5.2,
        y: 2.35,
        z: Math.cos(orbitYaw) * 5.2,
      },
      target: { x: 0, y: 1.25 * avatar.heightScale, z: 0 },
      fov: 42,
      near: 0.4,
    };

    this.beginFrame(ctx, width, height, cam, '#121B2D', false);

    const bg = ctx.createRadialGradient(width * 0.5, height * 0.42, 20, width * 0.5, height * 0.5, Math.max(width, height) * 0.72);
    bg.addColorStop(0, '#1E2D4A');
    bg.addColorStop(0.6, '#121B2D');
    bg.addColorStop(1, '#0A0F1A');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const segs = 18;
    const pedR = 1.65;
    const pedPts: [number, number][] = [];
    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const pr = this.project({ x: Math.cos(a) * pedR, y: 0, z: Math.sin(a) * pedR });
      if (pr) pedPts.push([pr.sx, pr.sy]);
    }
    if (pedPts.length >= 3) {
      ctx.beginPath();
      ctx.moveTo(pedPts[0][0], pedPts[0][1]);
      for (let i = 1; i < pedPts.length; i++) ctx.lineTo(pedPts[i][0], pedPts[i][1]);
      ctx.closePath();
      ctx.fillStyle = '#18243A';
      ctx.fill();
      ctx.strokeStyle = `${avatar.accentColor}AA`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    this.drawGroundShadow(ctx, 0, 0, 0, 0.95 * avatar.shoulderScale, 0.45);

    const animTime = previewAction === 'attack' ? (time * 1.4) % 0.34 : time;
    this.addFighterMesh(
      {
        id: 'preview',
        name: avatar.name,
        avatar,
        x: 0,
        y: 0,
        z: 0,
        yaw: 0,
        hp: 100,
        maxHp: 100,
        animState: previewAction,
        animTime,
        walkPhase: 0,
        comboStep: Math.floor(time * 2) % 3,
        hitFlash: 0,
        shieldActive: previewAction === 'power' && (avatar.powerId === 'crystal_aegis' || avatar.powerId === 'iron_fortress'),
        overdriveActive: previewAction === 'power' && avatar.powerId === 'titan_overdrive',
        frozenTimer: 0,
        team: 'player1',
        weaponLevel,
      },
      time,
      'ultra'
    );

    this.flushFaces(ctx);

    if (previewAction === 'attack') {
      const alpha = Math.max(0, 0.72 - animTime * 2);
      if (alpha > 0.05) {
        this.drawSlashVfx(
          ctx,
          {
            x: 0,
            y: 1.25 * avatar.heightScale,
            z: 0.3,
            yaw: 0,
            radius: 1.9,
            arcSpread: 1.9,
            color: (WEAPONS[avatar.weaponId] || WEAPONS.vanguard_sword).energyColor,
            alpha,
            tilt: 0.35,
          },
          'high'
        );
      }
    } else if (previewAction === 'power') {
      const ringR = 0.6 + ((time * 2.2) % 1.8);
      this.drawGroundRing(ctx, {
        x: 0,
        y: 0.05,
        z: 0,
        radius: ringR,
        maxRadius: 2.4,
        color: avatar.accentColor,
        alpha: Math.max(0.1, 1 - ringR / 2.5),
      });
    }
  }
}
