/**
 * アルパカモデル用ライティングプリセットデータ
 */

export interface LightPreset {
  name: string;
  emoji: string;
  ambientLight: {
    color: string;
    intensity: number;
  };
  directionalLight: {
    color: string;
    intensity: number;
  };
  spotLights: Array<{
    color: string;
    intensity: number;
    angle: number;
    penumbra: number;
    position: [number, number, number];
  }>;
  background: string;
}

export type LightPresets = {
  [key: string]: LightPreset;
};

const LIGHT_PRESETS: LightPresets = {
  DEFAULT: {
    name: "デフォルト",
    emoji: "💡",
    ambientLight: { color: "#ffffff", intensity: 0.7 },
    directionalLight: { color: "#ffffff", intensity: 0.8 },
    spotLights: [
      { color: "#4477ff", intensity: 500.0, angle: Math.PI / 8, penumbra: 0.5, position: [-3, 5, 2] },
      { color: "#ff77aa", intensity: 500.0, angle: Math.PI / 8, penumbra: 0.5, position: [3, 5, 2] }
    ],
    background: "#000000",
  },
  CYBERPUNK: {
    name: "サイバーパンク",
    emoji: "🌆",
    ambientLight: { color: "#120825", intensity: 0.3 },
    directionalLight: { color: "#ffffff", intensity: 0.2 },
    spotLights: [
      { color: "#ff00dd", intensity: 150.0, angle: Math.PI / 10, penumbra: 0.2, position: [-3, 1, 4] },
      { color: "#00ffff", intensity: 150.0, angle: Math.PI / 10, penumbra: 0.2, position: [3, 1, 4] }
    ],
    background: "#0a0a12",
  },
  APOCALYPSE: {
    name: "ポストアポカリプス",
    emoji: "🔥",
    ambientLight: { color: "#221100", intensity: 0.2 },
    directionalLight: { color: "#ff9933", intensity: 0.4 },
    spotLights: [
      { color: "#ff6600", intensity: 200.0, angle: Math.PI / 6, penumbra: 0.7, position: [-4, 2, -3] },
      { color: "#ffaa22", intensity: 400.0, angle: Math.PI / 7, penumbra: 0.8, position: [4, 3, -3] }
    ],
    background: "#1a0f05",
  },
  RETRO: {
    name: "ハリウッド",
    emoji: "🕺",
    ambientLight: { color: "#ffebcd", intensity: 0.4 },
    directionalLight: { color: "#ffbb77", intensity: 0.5 },
    spotLights: [
      { color: "#ffcc88", intensity: 200.0, angle: Math.PI / 6, penumbra: 0.6, position: [-3, 1, 4] },
      { color: "#ff88aa", intensity: 250.0, angle: Math.PI / 6, penumbra: 0.6, position: [3, 1, 4] }
    ],
    background: "#110a08",
  },
  SPACE: {
    name: "宇宙ステーション",
    emoji: "🚀",
    ambientLight: { color: "#0a0a15", intensity: 0.1 },
    directionalLight: { color: "#ffffff", intensity: 0.1 },
    spotLights: [
      { color: "#ffffff", intensity: 150.0, angle: Math.PI / 12, penumbra: 0.1, position: [0, 6, 0] },
      { color: "#8899ff", intensity: 200.0, angle: Math.PI / 10, penumbra: 0.3, position: [5, 2, 0] }
    ],
    background: "#000005",
  },
  HORROR: {
    name: "ホラー映画",
    emoji: "👻",
    ambientLight: { color: "#334433", intensity: 0.2 },
    directionalLight: { color: "#aaaaaa", intensity: 0.1 },
    spotLights: [
      { color: "#6a5acd", intensity: 200.0, angle: Math.PI / 10, penumbra: 0.2, position: [-3, 5, 2] },
      { color: "#ff0000", intensity: 300.0, angle: Math.PI / 12, penumbra: 0.1, position: [3, 5, 2] }
    ],
    background: "#050505",
  },
  VIDEOGAME: {
    name: "ビデオゲーム",
    emoji: "🎮",
    ambientLight: { color: "#00ffff", intensity: 0.3 },
    directionalLight: { color: "#ffffff", intensity: 0.5 },
    spotLights: [
      { color: "#00ddff", intensity: 300.0, angle: Math.PI / 8, penumbra: 0.4, position: [-2, 5, 5] },
      { color: "#ff9900", intensity: 300.0, angle: Math.PI / 8, penumbra: 0.4, position: [2, 5, 5] }
    ],
    background: "#052035",
  },
  FAIRY: {
    name: "おとぎ話の夜明け",
    emoji: "✨",
    ambientLight: { color: "#c9a0dc", intensity: 0.4 },
    directionalLight: { color: "#ffee77", intensity: 0.3 },
    spotLights: [
      { color: "#ffdd99", intensity: 400.0, angle: Math.PI / 7, penumbra: 0.7, position: [-3, 5, 2] },
      { color: "#ee99ff", intensity: 300.0, angle: Math.PI / 7, penumbra: 0.7, position: [3, 5, 2] }
    ],
    background: "#180a25",
  },
  CLUB: {
    name: "ファイトクラブ",
    emoji: "🤼‍♂️",
    ambientLight: { color: "#110022", intensity: 0.2 },
    directionalLight: { color: "#333333", intensity: 0.1 },
    spotLights: [
      { color: "#ff00aa", intensity: 600.0, angle: Math.PI / 9, penumbra: 0.3, position: [-3, 5, 2] },
      { color: "#0066ff", intensity: 600.0, angle: Math.PI / 9, penumbra: 0.3, position: [3, 5, 2] }
    ],
    background: "#0e0e0e",
  },
};

export default LIGHT_PRESETS; 