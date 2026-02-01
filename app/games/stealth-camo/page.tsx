"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ============================================================================
// STEALTH CAMO RUNNER - Pattern Upload Guide
// ============================================================================
//
// PATTERN IMAGES (Camo Swatches):
//   Upload 4 camo pattern images to:
//     /public/games/stealth-camo/patterns/
//
//   Required files:
//     lush_forest.png    - Green woodland camo
//     dense_thicket.png  - Deep green/brown undergrowth camo
//     autumn_oak.png     - Orange/brown fall camo
//     arid_desert.png    - Tan/sand desert camo
//
//   Recommended size: 128x128 px (seamless tile)
//
// BIOME BACKGROUNDS (optional parallax layers):
//   Upload to: /public/games/stealth-camo/biomes/
//
//   Optional files (game generates procedural backgrounds if missing):
//     lush_forest_bg.png
//     dense_thicket_bg.png
//     autumn_oak_bg.png
//     arid_desert_bg.png
//
//   Recommended size: 1920x600 px (will be tiled horizontally)
//
// ============================================================================

// ---------- BIOME & CAMO CONFIG ----------

type BiomeConfig = {
  id: string;
  name: string;
  matchingCamo: string;
  groundColor: number;
  skyColors: [number, number]; // gradient top, bottom
  treeColor: number;
  foliageColor: number;
  patternImage: string;
};

const BIOMES: BiomeConfig[] = [
  {
    id: "lush_forest",
    name: "Lush Forest",
    matchingCamo: "lush_forest",
    groundColor: 0x2d5a1e,
    skyColors: [0x87ceeb, 0xc8e6c9],
    treeColor: 0x4a2f1a,
    foliageColor: 0x2e7d32,
    patternImage: "/games/stealth-camo/patterns/lush_forest.png",
  },
  {
    id: "dense_thicket",
    name: "Dense Thicket",
    matchingCamo: "dense_thicket",
    groundColor: 0x1b3a12,
    skyColors: [0x5f8a6e, 0x2e4a2e],
    treeColor: 0x3b2510,
    foliageColor: 0x1b5e20,
    patternImage: "/games/stealth-camo/patterns/dense_thicket.png",
  },
  {
    id: "autumn_oak",
    name: "Autumn Oak",
    matchingCamo: "autumn_oak",
    groundColor: 0x8b6914,
    skyColors: [0xf5cba7, 0xe8a960],
    treeColor: 0x5d3a1a,
    foliageColor: 0xd4641a,
    patternImage: "/games/stealth-camo/patterns/autumn_oak.png",
  },
  {
    id: "arid_desert",
    name: "Arid Desert",
    matchingCamo: "arid_desert",
    groundColor: 0xc2a65a,
    skyColors: [0x87ceeb, 0xfdebd0],
    treeColor: 0x7a6232,
    foliageColor: 0x8fad5a,
    patternImage: "/games/stealth-camo/patterns/arid_desert.png",
  },
];

const BIOME_DURATION = 10000; // 10 seconds per biome
const DETECTION_RATE = 35; // % per second when mismatched
const DEPLETION_RATE = 20; // % per second when matched
const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
const GROUND_Y = 400;
const SPOONFLOWER_URL =
  "https://www.spoonflower.com/collections/803560-camo-by-angelapanek";

// ---------- PHASER GAME ----------

let phaserGame: any = null;

function StealthCamoGame() {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [selectedCamo, setSelectedCamo] = useState<string>("lush_forest");
  const [currentBiome, setCurrentBiome] = useState<string>("lush_forest");
  const [detection, setDetection] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [biomeName, setBiomeName] = useState("Lush Forest");
  const [phaserReady, setPhaserReady] = useState(false);

  // Refs for Phaser scene access
  const selectedCamoRef = useRef(selectedCamo);
  const gameOverRef = useRef(false);
  const detectionRef = useRef(0);
  const scoreRef = useRef(0);
  const setDetectionRef = useRef(setDetection);
  const setScoreRef = useRef(setScore);
  const setGameOverRef = useRef(setGameOver);
  const setCurrentBiomeRef = useRef(setCurrentBiome);
  const setBiomeNameRef = useRef(setBiomeName);

  useEffect(() => {
    selectedCamoRef.current = selectedCamo;
  }, [selectedCamo]);

  useEffect(() => {
    setDetectionRef.current = setDetection;
    setScoreRef.current = setScore;
    setGameOverRef.current = setGameOver;
    setCurrentBiomeRef.current = setCurrentBiome;
    setBiomeNameRef.current = setBiomeName;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let destroyed = false;

    async function initPhaser() {
      const Phaser = (await import("phaser")).default;

      if (destroyed) return;

      // ---------- MAIN SCENE ----------
      class StealthScene extends Phaser.Scene {
        private runner!: Phaser.GameObjects.Container;
        private parallaxLayers: Phaser.GameObjects.TileSprite[] = [];
        private groundTile!: Phaser.GameObjects.TileSprite;
        private biomeIndex = 0;
        private biomeTimer = 0;
        private scrollSpeed = 2;
        private runnerLegs!: Phaser.GameObjects.Rectangle[];
        private legTimer = 0;
        private legPhase = 0;
        private trees: Phaser.GameObjects.Container[] = [];
        private treeTimer = 0;
        private patternSwatches: Map<string, Phaser.Textures.Texture> = new Map();
        private skyBg!: Phaser.GameObjects.Graphics;
        private transitionAlpha = 0;
        private isTransitioning = false;
        private nextBiomeIndex = 0;
        private transitionOverlay!: Phaser.GameObjects.Graphics;

        constructor() {
          super({ key: "StealthScene" });
        }

        preload() {
          // Try to load pattern images - fallback to generated textures
          for (const biome of BIOMES) {
            this.load.image(
              `pattern_${biome.id}`,
              biome.patternImage
            );
          }

          // Error handler for missing images
          this.load.on("loaderror", (fileObj: any) => {
            console.log(`Image not found: ${fileObj.key} - using generated texture`);
          });
        }

        create() {
          // Generate fallback textures for any missing patterns
          for (const biome of BIOMES) {
            if (!this.textures.exists(`pattern_${biome.id}`)) {
              this.generateCamoTexture(biome);
            }
          }

          this.createSky();
          this.createParallaxLayers();
          this.createGround();
          this.createRunner();
          this.createTransitionOverlay();

          setPhaserReady(true);
        }

        generateCamoTexture(biome: BiomeConfig) {
          const size = 128;
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d")!;

          // Base color
          const baseColor = biome.foliageColor;
          const r = (baseColor >> 16) & 0xff;
          const g = (baseColor >> 8) & 0xff;
          const b = baseColor & 0xff;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(0, 0, size, size);

          // Camo blobs
          const blobColors = [
            `rgba(${Math.max(0, r - 40)},${Math.max(0, g - 30)},${Math.max(0, b - 20)},0.7)`,
            `rgba(${Math.min(255, r + 30)},${Math.min(255, g + 20)},${Math.min(255, b + 10)},0.6)`,
            `rgba(${Math.max(0, r - 60)},${Math.max(0, g - 50)},${Math.max(0, b - 40)},0.5)`,
          ];

          for (let i = 0; i < 20; i++) {
            ctx.fillStyle = blobColors[i % blobColors.length];
            ctx.beginPath();
            const cx = Math.random() * size;
            const cy = Math.random() * size;
            const rx = 10 + Math.random() * 25;
            const ry = 8 + Math.random() * 20;
            ctx.ellipse(cx, cy, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
            ctx.fill();
          }

          this.textures.addCanvas(`pattern_${biome.id}`, canvas);
        }

        createSky() {
          this.skyBg = this.add.graphics();
          this.drawSky(BIOMES[0]);
        }

        drawSky(biome: BiomeConfig) {
          this.skyBg.clear();
          const [top, bottom] = biome.skyColors;
          for (let y = 0; y < GROUND_Y; y++) {
            const t = y / GROUND_Y;
            const r = ((top >> 16) & 0xff) * (1 - t) + ((bottom >> 16) & 0xff) * t;
            const g = ((top >> 8) & 0xff) * (1 - t) + ((bottom >> 8) & 0xff) * t;
            const b = (top & 0xff) * (1 - t) + (bottom & 0xff) * t;
            this.skyBg.fillStyle(
              (Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b)
            );
            this.skyBg.fillRect(0, y, GAME_WIDTH, 1);
          }
        }

        createParallaxLayers() {
          // Far layer - light fog/hills
          const farCanvas = document.createElement("canvas");
          farCanvas.width = GAME_WIDTH;
          farCanvas.height = GROUND_Y;
          const farCtx = farCanvas.getContext("2d")!;

          // Draw distant hills
          farCtx.fillStyle = "rgba(100,130,100,0.3)";
          for (let i = 0; i < 5; i++) {
            farCtx.beginPath();
            const x = i * (GAME_WIDTH / 4);
            const h = 80 + Math.random() * 60;
            farCtx.arc(x, GROUND_Y, GAME_WIDTH / 4, 0, Math.PI, true);
            farCtx.fill();
          }

          if (!this.textures.exists("far_layer")) {
            this.textures.addCanvas("far_layer", farCanvas);
          }
          const farSprite = this.add.tileSprite(0, 0, GAME_WIDTH, GROUND_Y, "far_layer");
          farSprite.setOrigin(0, 0);
          farSprite.setAlpha(0.6);
          farSprite.setDepth(1);
          this.parallaxLayers.push(farSprite);

          // Mid layer - medium hills
          const midCanvas = document.createElement("canvas");
          midCanvas.width = GAME_WIDTH;
          midCanvas.height = GROUND_Y;
          const midCtx = midCanvas.getContext("2d")!;
          midCtx.fillStyle = "rgba(60,100,60,0.4)";
          for (let i = 0; i < 6; i++) {
            midCtx.beginPath();
            const x = i * (GAME_WIDTH / 5);
            midCtx.arc(x, GROUND_Y, GAME_WIDTH / 6, 0, Math.PI, true);
            midCtx.fill();
          }

          if (!this.textures.exists("mid_layer")) {
            this.textures.addCanvas("mid_layer", midCanvas);
          }
          const midSprite = this.add.tileSprite(0, 0, GAME_WIDTH, GROUND_Y, "mid_layer");
          midSprite.setOrigin(0, 0);
          midSprite.setAlpha(0.5);
          midSprite.setDepth(2);
          this.parallaxLayers.push(midSprite);
        }

        createGround() {
          const groundCanvas = document.createElement("canvas");
          groundCanvas.width = 64;
          groundCanvas.height = 64;
          const gCtx = groundCanvas.getContext("2d")!;
          const gc = BIOMES[0].groundColor;
          const r = (gc >> 16) & 0xff;
          const g = (gc >> 8) & 0xff;
          const b = gc & 0xff;
          gCtx.fillStyle = `rgb(${r},${g},${b})`;
          gCtx.fillRect(0, 0, 64, 64);
          // Texture noise
          for (let i = 0; i < 100; i++) {
            gCtx.fillStyle = `rgba(0,0,0,${0.05 + Math.random() * 0.1})`;
            gCtx.fillRect(Math.random() * 64, Math.random() * 64, 2, 2);
          }

          if (!this.textures.exists("ground_tex")) {
            this.textures.addCanvas("ground_tex", groundCanvas);
          }
          this.groundTile = this.add.tileSprite(
            0, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - GROUND_Y, "ground_tex"
          );
          this.groundTile.setOrigin(0, 0);
          this.groundTile.setDepth(5);
        }

        createRunner() {
          const container = this.add.container(150, GROUND_Y - 32);
          container.setDepth(10);

          // Body
          const body = this.add.rectangle(0, 0, 20, 28, 0x333333);
          container.add(body);

          // Head
          const head = this.add.circle(0, -20, 8, 0xe0c090);
          container.add(head);

          // Legs
          const leftLeg = this.add.rectangle(-5, 18, 6, 16, 0x555555);
          const rightLeg = this.add.rectangle(5, 18, 6, 16, 0x555555);
          container.add(leftLeg);
          container.add(rightLeg);

          // Arms
          const leftArm = this.add.rectangle(-14, -2, 8, 6, 0x333333);
          const rightArm = this.add.rectangle(14, -2, 8, 6, 0x333333);
          container.add(leftArm);
          container.add(rightArm);

          this.runnerLegs = [leftLeg, rightLeg];
          this.runner = container;
        }

        createTransitionOverlay() {
          this.transitionOverlay = this.add.graphics();
          this.transitionOverlay.setDepth(100);
          this.transitionOverlay.setAlpha(0);
        }

        updateGround(biome: BiomeConfig) {
          const groundCanvas = document.createElement("canvas");
          groundCanvas.width = 64;
          groundCanvas.height = 64;
          const gCtx = groundCanvas.getContext("2d")!;
          const gc = biome.groundColor;
          const r = (gc >> 16) & 0xff;
          const g = (gc >> 8) & 0xff;
          const b = gc & 0xff;
          gCtx.fillStyle = `rgb(${r},${g},${b})`;
          gCtx.fillRect(0, 0, 64, 64);
          for (let i = 0; i < 100; i++) {
            gCtx.fillStyle = `rgba(0,0,0,${0.05 + Math.random() * 0.1})`;
            gCtx.fillRect(Math.random() * 64, Math.random() * 64, 2, 2);
          }

          const key = `ground_${biome.id}`;
          if (this.textures.exists(key)) {
            this.textures.remove(key);
          }
          this.textures.addCanvas(key, groundCanvas);
          this.groundTile.setTexture(key);
        }

        spawnTree(biome: BiomeConfig) {
          const treeContainer = this.add.container(GAME_WIDTH + 50, GROUND_Y);
          treeContainer.setDepth(4);

          // Trunk
          const trunkH = 60 + Math.random() * 80;
          const trunk = this.add.rectangle(
            0, -trunkH / 2, 12 + Math.random() * 8, trunkH, biome.treeColor
          );
          treeContainer.add(trunk);

          // Canopy
          if (biome.id !== "arid_desert") {
            const canopySize = 25 + Math.random() * 35;
            for (let i = 0; i < 3; i++) {
              const leaf = this.add.circle(
                -15 + i * 15 + Math.random() * 10,
                -trunkH - canopySize * 0.3 + Math.random() * 10,
                canopySize * (0.5 + Math.random() * 0.3),
                biome.foliageColor
              );
              leaf.setAlpha(0.7 + Math.random() * 0.3);
              treeContainer.add(leaf);
            }
          } else {
            // Cactus arms for desert
            const armW = 8;
            const armH = 20 + Math.random() * 15;
            const arm1 = this.add.rectangle(-12, -trunkH * 0.6, armW, armH, biome.treeColor);
            const arm2 = this.add.rectangle(12, -trunkH * 0.4, armW, armH, biome.treeColor);
            treeContainer.add(arm1);
            treeContainer.add(arm2);
          }

          this.trees.push(treeContainer);
        }

        update(time: number, delta: number) {
          if (gameOverRef.current) return;

          const dt = delta / 1000;

          // Scroll parallax
          if (this.parallaxLayers[0]) {
            this.parallaxLayers[0].tilePositionX += this.scrollSpeed * 0.3;
          }
          if (this.parallaxLayers[1]) {
            this.parallaxLayers[1].tilePositionX += this.scrollSpeed * 0.6;
          }
          this.groundTile.tilePositionX += this.scrollSpeed * 1.5;

          // Animate runner legs
          this.legTimer += delta;
          if (this.legTimer > 100) {
            this.legTimer = 0;
            this.legPhase = (this.legPhase + 1) % 4;
            const offsets = [
              [-4, 4],
              [-2, 2],
              [4, -4],
              [2, -2],
            ];
            if (this.runnerLegs[0] && this.runnerLegs[1]) {
              this.runnerLegs[0].y = 18 + offsets[this.legPhase][0];
              this.runnerLegs[1].y = 18 + offsets[this.legPhase][1];
            }
          }

          // Slight runner bob
          this.runner.y = GROUND_Y - 32 + Math.sin(time * 0.008) * 2;

          // Move trees
          for (let i = this.trees.length - 1; i >= 0; i--) {
            const tree = this.trees[i];
            tree.x -= this.scrollSpeed * 1.2;
            if (tree.x < -100) {
              tree.destroy();
              this.trees.splice(i, 1);
            }
          }

          // Spawn trees
          this.treeTimer += delta;
          const currentBiomeConfig = BIOMES[this.biomeIndex];
          const spawnInterval = currentBiomeConfig.id === "arid_desert" ? 2500 : 1200;
          if (this.treeTimer > spawnInterval) {
            this.treeTimer = 0;
            this.spawnTree(currentBiomeConfig);
          }

          // Biome timer
          this.biomeTimer += delta;
          if (this.biomeTimer >= BIOME_DURATION) {
            this.biomeTimer = 0;
            this.nextBiomeIndex = (this.biomeIndex + 1) % BIOMES.length;
            this.startBiomeTransition();
          }

          // Handle transition
          if (this.isTransitioning) {
            this.transitionAlpha += dt * 2; // fade in 0.5s
            if (this.transitionAlpha >= 1) {
              // Switch biome
              this.biomeIndex = this.nextBiomeIndex;
              const newBiome = BIOMES[this.biomeIndex];
              this.drawSky(newBiome);
              this.updateGround(newBiome);

              // Clear old trees
              this.trees.forEach((t) => t.destroy());
              this.trees = [];

              setCurrentBiomeRef.current(newBiome.id);
              setBiomeNameRef.current(newBiome.name);
              this.isTransitioning = false;
              this.transitionAlpha = 1;

              // Fade out
              this.tweens.add({
                targets: this.transitionOverlay,
                alpha: 0,
                duration: 500,
                ease: "Power2",
              });
            } else {
              this.transitionOverlay.setAlpha(this.transitionAlpha);
            }
          }

          // Detection meter logic
          const currentBiomeId = BIOMES[this.biomeIndex].id;
          const camo = selectedCamoRef.current;
          let det = detectionRef.current;

          if (camo !== currentBiomeId) {
            det = Math.min(100, det + DETECTION_RATE * dt);
          } else {
            det = Math.max(0, det - DEPLETION_RATE * dt);
          }

          detectionRef.current = det;
          setDetectionRef.current(det);

          // Score
          const newScore = scoreRef.current + dt * 10;
          scoreRef.current = newScore;
          setScoreRef.current(Math.floor(newScore));

          // Game over
          if (det >= 100) {
            gameOverRef.current = true;
            setGameOverRef.current(true);
          }
        }

        startBiomeTransition() {
          this.isTransitioning = true;
          this.transitionAlpha = 0;
          this.transitionOverlay.clear();
          this.transitionOverlay.fillStyle(0x000000, 1);
          this.transitionOverlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
          this.transitionOverlay.setAlpha(0);
        }
      }

      // ---------- CREATE PHASER GAME ----------
      if (phaserGame) {
        phaserGame.destroy(true);
        phaserGame = null;
      }

      phaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        parent: gameContainerRef.current!,
        backgroundColor: "#1a1a1a",
        scene: [StealthScene],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
          default: "arcade",
          arcade: { gravity: { x: 0, y: 0 }, debug: false },
        },
        render: {
          pixelArt: false,
          antialias: true,
        },
      });
    }

    initPhaser();

    return () => {
      destroyed = true;
      if (phaserGame) {
        phaserGame.destroy(true);
        phaserGame = null;
      }
    };
  }, []);

  function restartGame() {
    setGameOver(false);
    setDetection(0);
    setScore(0);
    setSelectedCamo("lush_forest");
    gameOverRef.current = false;
    detectionRef.current = 0;
    scoreRef.current = 0;
    selectedCamoRef.current = "lush_forest";

    if (phaserGame) {
      const scene = phaserGame.scene.getScene("StealthScene");
      if (scene) {
        scene.scene.restart();
      }
    }
  }

  function selectCamo(camoId: string) {
    if (gameOver) return;
    setSelectedCamo(camoId);
    selectedCamoRef.current = camoId;
  }

  // Color swatches (used when pattern images aren't loaded)
  const camoSwatchColors: Record<string, string> = {
    lush_forest: "#2e7d32",
    dense_thicket: "#1b5e20",
    autumn_oak: "#d4641a",
    arid_desert: "#c2a65a",
  };

  const detectionColor =
    detection < 40 ? "#22c55e" : detection < 70 ? "#eab308" : "#ef4444";

  return (
    <div className="min-h-screen bg-[#111] text-gray-200 flex flex-col">
      {/* Header */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-thin tracking-wide text-gray-100">
              Stealth Camo Runner
            </h1>
            <p className="text-xs text-gray-500">
              Match your camo to the biome. Stay hidden.
            </p>
          </div>
          <Link
            href="/games"
            className="text-sm border border-gray-600 text-gray-400 px-3 py-1.5 rounded hover:text-white hover:border-gray-400 transition-colors"
          >
            All Games
          </Link>
        </div>
      </header>

      {/* Detection Meter */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-4">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs text-gray-400 uppercase tracking-widest">
            Detection
          </span>
          <span className="text-xs text-gray-500 ml-auto">
            Biome: <span className="text-gray-300">{biomeName}</span>
          </span>
          <span className="text-xs text-gray-500">
            Score: <span className="text-gray-300 font-mono">{score}</span>
          </span>
        </div>
        <div className="w-full h-4 bg-[#1e1e1e] rounded-full overflow-hidden ring-1 ring-gray-700">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${Math.min(100, detection)}%`,
              backgroundColor: detectionColor,
              boxShadow: detection > 70 ? `0 0 12px ${detectionColor}` : "none",
            }}
          />
        </div>
        {detection > 70 && (
          <p className="text-red-400 text-xs mt-1 animate-pulse">
            WARNING: You are being detected!
          </p>
        )}
      </div>

      {/* Game Canvas */}
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <div
          ref={gameContainerRef}
          className="w-full max-w-4xl aspect-[8/5] bg-[#1a1a1a] rounded-xl overflow-hidden ring-1 ring-gray-700 relative"
        >
          {!phaserReady && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <p className="text-gray-500 text-sm">Loading game engine...</p>
            </div>
          )}
        </div>
      </div>

      {/* Camo Selection Buttons */}
      <div className="max-w-4xl mx-auto w-full px-4 pb-6">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 text-center">
          Select Camo
        </p>
        <div className="grid grid-cols-4 gap-3">
          {BIOMES.map((biome) => {
            const isSelected = selectedCamo === biome.id;
            const isMatch = currentBiome === biome.id;
            return (
              <button
                key={biome.id}
                onClick={() => selectCamo(biome.id)}
                disabled={gameOver}
                className={`
                  relative flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl transition-all
                  ${isSelected
                    ? "ring-2 ring-white bg-[#2a2a2a] scale-105"
                    : "ring-1 ring-gray-700 bg-[#1e1e1e] hover:ring-gray-500"
                  }
                  ${gameOver ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                {/* Swatch */}
                <div
                  className="w-full aspect-square rounded-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${biome.patternImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: camoSwatchColors[biome.id],
                  }}
                />
                <span className="text-[10px] sm:text-xs text-gray-300 leading-tight text-center">
                  {biome.name}
                </span>
                {isSelected && isMatch && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Game Over Overlay */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] rounded-2xl p-8 max-w-md mx-4 text-center ring-1 ring-red-900/50 shadow-2xl">
            <div className="text-6xl font-black text-red-500 mb-2 tracking-wider">
              CAUGHT
            </div>
            <p className="text-gray-400 mb-1">Your cover was blown.</p>
            <p className="text-2xl font-mono text-gray-200 mb-6">
              Score: {score}
            </p>

            <div className="space-y-3">
              <button
                onClick={restartGame}
                className="w-full bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>

              <a
                href={SPOONFLOWER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#6b9f36] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#5a8a2e] transition-colors"
              >
                Field-Ready Gear
              </a>
              <p className="text-[10px] text-gray-500">
                Real camo patterns on fabric, wallpaper &amp; more at Spoonflower
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StealthCamoGame;
