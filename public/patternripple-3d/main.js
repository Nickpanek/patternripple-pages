import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Game configuration
const CONFIG = {
    gridSize: 3,
    tileSize: 1,
    tileThickness: 0.2,
    tileGap: 0.05,
    patternPath: './assets/pattern1.jpg',
    spoonflowerURL: 'https://www.spoonflower.com' // Update with your actual shop URL
};

// Game state
let scene, camera, renderer, controls;
let tiles = [];
let emptySlot = { x: 2, y: 2 }; // Bottom-right corner
let raycaster, mouse;
let isAnimating = false;
let moveCount = 0;
let textureLoader;

// Initialize the game
init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 5, 8);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Studio Lighting Setup
    setupLighting();

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 2.2;

    // Raycaster for click detection
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Load texture and create puzzle
    textureLoader = new THREE.TextureLoader();
    textureLoader.load(
        CONFIG.patternPath,
        (texture) => {
            document.getElementById('loading').style.display = 'none';
            createPuzzle(texture);
            shufflePuzzle();
        },
        undefined,
        (error) => {
            console.error('Error loading texture:', error);
            document.getElementById('loading').textContent = 'Error loading pattern. Please check assets/pattern1.jpg exists.';
        }
    );

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('click', onTileClick);
    document.getElementById('shuffle-btn').addEventListener('click', shufflePuzzle);

    // Update Spoonflower link
    document.getElementById('spoonflower-btn').href = CONFIG.spoonflowerURL;
}

function setupLighting() {
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // DirectionalLight for strong shadows (main studio light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // PointLight with blue tint for rim lighting effect
    const rimLight = new THREE.PointLight(0x6699ff, 0.8, 20);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    // Additional fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Ground plane to receive shadows
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -CONFIG.tileThickness / 2 - 0.01;
    ground.receiveShadow = true;
    scene.add(ground);
}

function createPuzzle(texture) {
    const totalSize = CONFIG.gridSize * CONFIG.tileSize + (CONFIG.gridSize - 1) * CONFIG.tileGap;
    const startOffset = -totalSize / 2 + CONFIG.tileSize / 2;

    // Create a canvas to generate a bump map from the texture
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 512;

    // Create subtle bump map (simplified - just using the texture as-is)
    const bumpMap = texture.clone();
    bumpMap.needsUpdate = true;

    for (let y = 0; y < CONFIG.gridSize; y++) {
        tiles[y] = [];
        for (let x = 0; x < CONFIG.gridSize; x++) {
            // Skip the empty slot
            if (x === emptySlot.x && y === emptySlot.y) {
                tiles[y][x] = null;
                continue;
            }

            // Create tile geometry
            const geometry = new THREE.BoxGeometry(
                CONFIG.tileSize,
                CONFIG.tileThickness,
                CONFIG.tileSize
            );

            // Clone texture for this tile
            const tileTexture = texture.clone();
            tileTexture.needsUpdate = true;

            // UV mapping to show correct portion of the image
            // We need to map the appropriate 1/9th of the texture
            const uvOffsetX = x / CONFIG.gridSize;
            const uvOffsetY = 1 - (y + 1) / CONFIG.gridSize; // Flip Y
            const uvScaleX = 1 / CONFIG.gridSize;
            const uvScaleY = 1 / CONFIG.gridSize;

            tileTexture.offset.set(uvOffsetX, uvOffsetY);
            tileTexture.repeat.set(uvScaleX, uvScaleY);
            tileTexture.wrapS = THREE.ClampToEdgeWrapping;
            tileTexture.wrapT = THREE.ClampToEdgeWrapping;

            // Create fabric-like material with MeshPhysicalMaterial
            const material = new THREE.MeshPhysicalMaterial({
                map: tileTexture,
                bumpMap: bumpMap.clone(),
                bumpScale: 0.02,
                roughness: 0.7,
                metalness: 0.0,
                sheen: 1.0,
                sheenRoughness: 0.5,
                sheenColor: new THREE.Color(0xffffff),
                clearcoat: 0.1,
                clearcoatRoughness: 0.8
            });

            material.bumpMap.offset.set(uvOffsetX, uvOffsetY);
            material.bumpMap.repeat.set(uvScaleX, uvScaleY);

            const tile = new THREE.Mesh(geometry, material);

            // Position tile
            const posX = startOffset + x * (CONFIG.tileSize + CONFIG.tileGap);
            const posZ = startOffset + y * (CONFIG.tileSize + CONFIG.tileGap);
            tile.position.set(posX, 0, posZ);

            tile.castShadow = true;
            tile.receiveShadow = true;

            // Store grid position
            tile.userData = { gridX: x, gridY: y };

            scene.add(tile);
            tiles[y][x] = tile;
        }
    }
}

function onTileClick(event) {
    if (isAnimating) return;

    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycast to find clicked tile
    raycaster.setFromCamera(mouse, camera);

    const allTiles = tiles.flat().filter(t => t !== null);
    const intersects = raycaster.intersectObjects(allTiles);

    if (intersects.length > 0) {
        const clickedTile = intersects[0].object;
        const { gridX, gridY } = clickedTile.userData;

        // Check if tile is adjacent to empty slot
        if (isAdjacentToEmpty(gridX, gridY)) {
            moveTile(clickedTile, gridX, gridY);
        }
    }
}

function isAdjacentToEmpty(x, y) {
    const dx = Math.abs(x - emptySlot.x);
    const dy = Math.abs(y - emptySlot.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

function moveTile(tile, fromX, fromY) {
    isAnimating = true;
    moveCount++;
    document.getElementById('move-count').textContent = moveCount;

    // Calculate target position (empty slot position)
    const totalSize = CONFIG.gridSize * CONFIG.tileSize + (CONFIG.gridSize - 1) * CONFIG.tileGap;
    const startOffset = -totalSize / 2 + CONFIG.tileSize / 2;

    const targetX = startOffset + emptySlot.x * (CONFIG.tileSize + CONFIG.tileGap);
    const targetZ = startOffset + emptySlot.y * (CONFIG.tileSize + CONFIG.tileGap);

    // Animate with elastic easing using GSAP
    gsap.to(tile.position, {
        x: targetX,
        z: targetZ,
        duration: 0.6,
        ease: "back.out(1.7)", // Elastic/bouncy effect
        onUpdate: () => {
            // Add a subtle lift during movement
            const progress = gsap.getProperty(tile.position, 'progress') || 0;
            tile.position.y = Math.sin(progress * Math.PI) * 0.2;
        },
        onComplete: () => {
            tile.position.y = 0;

            // Update grid state
            tiles[emptySlot.y][emptySlot.x] = tile;
            tiles[fromY][fromX] = null;

            tile.userData.gridX = emptySlot.x;
            tile.userData.gridY = emptySlot.y;

            emptySlot.x = fromX;
            emptySlot.y = fromY;

            isAnimating = false;

            // Check for victory
            if (checkVictory()) {
                onVictory();
            }
        }
    });
}

function checkVictory() {
    // Check if empty slot is in bottom-right and all tiles are in correct positions
    if (emptySlot.x !== CONFIG.gridSize - 1 || emptySlot.y !== CONFIG.gridSize - 1) {
        return false;
    }

    for (let y = 0; y < CONFIG.gridSize; y++) {
        for (let x = 0; x < CONFIG.gridSize; x++) {
            if (x === CONFIG.gridSize - 1 && y === CONFIG.gridSize - 1) continue; // Skip empty slot

            const tile = tiles[y][x];
            if (!tile || tile.userData.gridX !== x || tile.userData.gridY !== y) {
                return false;
            }
        }
    }

    return true;
}

function onVictory() {
    // Remove gaps between tiles for seamless look
    const totalSize = CONFIG.gridSize * CONFIG.tileSize;
    const startOffset = -totalSize / 2 + CONFIG.tileSize / 2;

    tiles.flat().filter(t => t !== null).forEach(tile => {
        const { gridX, gridY } = tile.userData;
        const posX = startOffset + gridX * CONFIG.tileSize;
        const posZ = startOffset + gridY * CONFIG.tileSize;

        gsap.to(tile.position, {
            x: posX,
            z: posZ,
            duration: 0.8,
            ease: "power2.inOut"
        });
    });

    // Show victory overlay
    setTimeout(() => {
        document.getElementById('victory-overlay').classList.add('show');
    }, 1000);
}

function shufflePuzzle() {
    if (isAnimating) return;

    // Hide victory overlay if showing
    document.getElementById('victory-overlay').classList.remove('show');

    // Reset move counter
    moveCount = 0;
    document.getElementById('move-count').textContent = moveCount;

    // Perform random valid moves
    const numMoves = 50 + Math.floor(Math.random() * 50);

    for (let i = 0; i < numMoves; i++) {
        const adjacentTiles = getAdjacentTiles();
        if (adjacentTiles.length > 0) {
            const randomTile = adjacentTiles[Math.floor(Math.random() * adjacentTiles.length)];
            swapWithEmpty(randomTile.x, randomTile.y);
        }
    }

    // Animate tiles to their new positions
    animateTilesToCurrentPositions();
}

function getAdjacentTiles() {
    const adjacent = [];
    const directions = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 }
    ];

    directions.forEach(dir => {
        const x = emptySlot.x + dir.x;
        const y = emptySlot.y + dir.y;
        if (x >= 0 && x < CONFIG.gridSize && y >= 0 && y < CONFIG.gridSize) {
            adjacent.push({ x, y });
        }
    });

    return adjacent;
}

function swapWithEmpty(tileX, tileY) {
    const tile = tiles[tileY][tileX];
    if (!tile) return;

    // Swap in grid
    tiles[emptySlot.y][emptySlot.x] = tile;
    tiles[tileY][tileX] = null;

    // Update userData
    tile.userData.gridX = emptySlot.x;
    tile.userData.gridY = emptySlot.y;

    // Update empty slot
    emptySlot.x = tileX;
    emptySlot.y = tileY;
}

function animateTilesToCurrentPositions() {
    const totalSize = CONFIG.gridSize * CONFIG.tileSize + (CONFIG.gridSize - 1) * CONFIG.tileGap;
    const startOffset = -totalSize / 2 + CONFIG.tileSize / 2;

    tiles.flat().filter(t => t !== null).forEach(tile => {
        const { gridX, gridY } = tile.userData;
        const posX = startOffset + gridX * (CONFIG.tileSize + CONFIG.tileGap);
        const posZ = startOffset + gridY * (CONFIG.tileSize + CONFIG.tileGap);

        gsap.to(tile.position, {
            x: posX,
            z: posZ,
            duration: 0.5,
            ease: "power2.out"
        });
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
