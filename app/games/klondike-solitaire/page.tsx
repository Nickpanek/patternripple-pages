"use client";

import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import type { Metadata } from "next";
import Link from "next/link";

// ============================================================================
// PATTERN PACK SYSTEM
// ============================================================================
//
// HOW TO ADD YOUR PATTERN DESIGNS:
//
// 1. FILE NAMING:
//    - Save your pattern images as PNG files
//    - Place them in: /public/games/klondike-solitaire/patterns/
//    - Naming convention: [pack-name]_back.png
//      Examples:
//        - plaid_back.png
//        - cowboy_back.png
//        - op_art_back.png
//
// 2. FILE STRUCTURE:
//    /public/games/klondike-solitaire/patterns/
//      ├── plaid_back.png
//      ├── cowboy_back.png
//      └── op_art_back.png
//
// 3. SCALE ADJUSTMENT:
//    - Seamless/Tiled Patterns: Use 100% (default)
//    - Non-seamless/Single Image: Use "cover" or adjust percentage
//    - Edit the `backgroundSize` property in the pack configuration below
//    - Examples:
//      backgroundSize: "100% 100%" - Stretches pattern to fit exactly
//      backgroundSize: "cover" - Scales pattern to cover card (maintains aspect ratio)
//      backgroundSize: "150% 150%" - Makes pattern 1.5x larger (for large patterns)
//
// 4. UPDATING PACKS:
//    - Edit the `themePacks` object below
//    - Set `cardBackImage` to your pattern file path
//    - Adjust `backgroundSize` for your pattern type
//    - Set `backgroundColor` for the overall game background
//    - Add your Stripe product URL to `shopLink`
//
// ============================================================================

type ThemePack = {
  id: string;
  name: string;
  cardBackImage: string;
  backgroundColor: string;
  backgroundSize: string; // CSS background-size value
  shopLink: string;
};

const themePacks: Record<string, ThemePack> = {
  default: {
    id: "default",
    name: "Default (Black)",
    cardBackImage: "", // Solid black, no image
    backgroundColor: "#111",
    backgroundSize: "100% 100%",
    shopLink: "",
  },
  plaid: {
    id: "plaid",
    name: "Plaid Pack",
    cardBackImage: "/games/klondike-solitaire/patterns/plaid_back.png",
    backgroundColor: "#2a1810",
    backgroundSize: "100% 100%", // Adjust this for your plaid pattern
    shopLink: "https://buy.stripe.com/your-plaid-product-link",
  },
  cowboy: {
    id: "cowboy",
    name: "Cowboy Pack",
    cardBackImage: "/games/klondike-solitaire/patterns/cowboy_back.png",
    backgroundColor: "#1a1410",
    backgroundSize: "cover", // Adjust this for your cowboy pattern
    shopLink: "https://buy.stripe.com/your-cowboy-product-link",
  },
  opArt: {
    id: "opArt",
    name: "Op Art Pack",
    cardBackImage: "/games/klondike-solitaire/patterns/op_art_back.png",
    backgroundColor: "#0a0a0a",
    backgroundSize: "100% 100%", // Adjust this for your op art pattern
    shopLink: "https://buy.stripe.com/your-op-art-product-link",
  },
};

// Theme Context
type ThemeContextType = {
  currentTheme: ThemePack;
  setTheme: (packId: string) => void;
  allPacks: ThemePack[];
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

// ============================================================================
// GAME TYPES AND CONSTANTS
// ============================================================================

type Suit = "hearts" | "diamonds" | "clubs" | "spades";
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

type Card = {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
  id: string;
};

type GameState = {
  stock: Card[];
  waste: Card[];
  foundations: Card[][];
  tableau: Card[][];
  moves: number;
  won: boolean;
};

const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const rankValues: Record<Rank, number> = {
  A: 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, J: 11, Q: 12, K: 13,
};

// ============================================================================
// GAME LOGIC FUNCTIONS
// ============================================================================

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        suit,
        rank,
        faceUp: false,
        id: `${suit}-${rank}-${Math.random()}`,
      });
    }
  }
  return deck;
}

function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function dealInitialGame(): GameState {
  const deck = shuffleDeck(createDeck());
  const tableau: Card[][] = [[], [], [], [], [], [], []];

  let deckIndex = 0;
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const card = deck[deckIndex++];
      card.faceUp = row === col;
      tableau[col].push(card);
    }
  }

  const stock = deck.slice(deckIndex).map(c => ({ ...c, faceUp: false }));

  return {
    stock,
    waste: [],
    foundations: [[], [], [], []],
    tableau,
    moves: 0,
    won: false,
  };
}

function isRed(suit: Suit): boolean {
  return suit === "hearts" || suit === "diamonds";
}

function canPlaceOnTableau(card: Card, targetCard: Card | null): boolean {
  if (!targetCard) return card.rank === "K";
  return (
    rankValues[card.rank] === rankValues[targetCard.rank] - 1 &&
    isRed(card.suit) !== isRed(targetCard.suit)
  );
}

function canPlaceOnFoundation(card: Card, foundation: Card[]): boolean {
  if (foundation.length === 0) return card.rank === "A";
  const topCard = foundation[foundation.length - 1];
  return card.suit === topCard.suit && rankValues[card.rank] === rankValues[topCard.rank] + 1;
}

function checkWin(foundations: Card[][]): boolean {
  return foundations.every(f => f.length === 13);
}

// ============================================================================
// CARD COMPONENT
// ============================================================================

type CardProps = {
  card: Card;
  onClick?: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  style?: React.CSSProperties;
};

function CardComponent({ card, onClick, draggable, onDragStart, style }: CardProps) {
  const { currentTheme } = useTheme();

  if (!card.faceUp) {
    // Card back with pattern
    const backStyle: React.CSSProperties = {
      backgroundImage: currentTheme.cardBackImage ? `url(${currentTheme.cardBackImage})` : "none",
      backgroundColor: currentTheme.cardBackImage ? "transparent" : "#000",
      backgroundSize: currentTheme.backgroundSize,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      ...style,
    };

    return (
      <div
        className="w-full h-full rounded-lg border-2 border-gray-600 cursor-pointer"
        style={backStyle}
        onClick={onClick}
        draggable={draggable}
        onDragStart={onDragStart}
      />
    );
  }

  // Card face
  const isRedCard = isRed(card.suit);
  const suitSymbols: Record<Suit, string> = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
  };

  return (
    <div
      className={`w-full h-full bg-white rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center cursor-pointer select-none ${
        isRedCard ? "text-red-600" : "text-black"
      }`}
      style={style}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="text-xs absolute top-1 left-1 font-bold leading-none">
        {card.rank}
        <br />
        {suitSymbols[card.suit]}
      </div>
      <div className="text-3xl sm:text-4xl">{suitSymbols[card.suit]}</div>
      <div className="text-xs absolute bottom-1 right-1 font-bold leading-none rotate-180">
        {card.rank}
        <br />
        {suitSymbols[card.suit]}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN GAME COMPONENT
// ============================================================================

function KlondikeSolitaire() {
  const [gameState, setGameState] = useState<GameState>(dealInitialGame());
  const [draggedCards, setDraggedCards] = useState<{ cards: Card[]; source: string } | null>(null);
  const { currentTheme, setTheme, allPacks } = useTheme();

  const newGame = useCallback(() => {
    setGameState(dealInitialGame());
  }, []);

  const drawCard = useCallback(() => {
    setGameState((prev) => {
      if (prev.stock.length === 0) {
        // Reset stock from waste
        return {
          ...prev,
          stock: [...prev.waste].reverse().map(c => ({ ...c, faceUp: false })),
          waste: [],
          moves: prev.moves + 1,
        };
      }

      const newStock = [...prev.stock];
      const drawn = newStock.pop()!;
      drawn.faceUp = true;

      return {
        ...prev,
        stock: newStock,
        waste: [...prev.waste, drawn],
        moves: prev.moves + 1,
      };
    });
  }, []);

  const handleDragStart = (cards: Card[], source: string) => (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedCards({ cards, source });
  };

  const handleDrop = (target: string, targetIndex?: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedCards) return;

    setGameState((prev) => {
      const newState = { ...prev };
      const { cards, source } = draggedCards;

      // Remove cards from source
      if (source.startsWith("tableau-")) {
        const sourceCol = parseInt(source.split("-")[1]);
        const pile = [...newState.tableau[sourceCol]];
        const startIndex = pile.findIndex(c => c.id === cards[0].id);
        newState.tableau[sourceCol] = pile.slice(0, startIndex);

        // Flip last card if needed
        if (newState.tableau[sourceCol].length > 0) {
          const lastCard = newState.tableau[sourceCol][newState.tableau[sourceCol].length - 1];
          lastCard.faceUp = true;
        }
      } else if (source === "waste") {
        newState.waste = newState.waste.slice(0, -1);
      } else if (source.startsWith("foundation-")) {
        const foundIndex = parseInt(source.split("-")[1]);
        newState.foundations[foundIndex] = newState.foundations[foundIndex].slice(0, -1);
      }

      // Add cards to target
      if (target.startsWith("tableau-")) {
        const targetCol = parseInt(target.split("-")[1]);
        const pile = [...newState.tableau[targetCol]];
        const topCard = pile.length > 0 ? pile[pile.length - 1] : null;

        if (canPlaceOnTableau(cards[0], topCard)) {
          newState.tableau[targetCol] = [...pile, ...cards];
          newState.moves++;
        } else {
          // Invalid move, restore original state
          return prev;
        }
      } else if (target.startsWith("foundation-")) {
        if (cards.length === 1) {
          const foundIndex = parseInt(target.split("-")[1]);
          if (canPlaceOnFoundation(cards[0], newState.foundations[foundIndex])) {
            newState.foundations[foundIndex] = [...newState.foundations[foundIndex], cards[0]];
            newState.moves++;

            // Check for win
            if (checkWin(newState.foundations)) {
              newState.won = true;
            }
          } else {
            return prev;
          }
        } else {
          return prev;
        }
      }

      return newState;
    });

    setDraggedCards(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const autoMoveToFoundation = (card: Card, source: string) => {
    setGameState((prev) => {
      for (let i = 0; i < 4; i++) {
        if (canPlaceOnFoundation(card, prev.foundations[i])) {
          const newState = { ...prev };

          // Remove from source
          if (source.startsWith("tableau-")) {
            const col = parseInt(source.split("-")[1]);
            newState.tableau[col] = newState.tableau[col].slice(0, -1);
            if (newState.tableau[col].length > 0) {
              newState.tableau[col][newState.tableau[col].length - 1].faceUp = true;
            }
          } else if (source === "waste") {
            newState.waste = newState.waste.slice(0, -1);
          }

          newState.foundations[i] = [...newState.foundations[i], card];
          newState.moves++;

          if (checkWin(newState.foundations)) {
            newState.won = true;
          }

          return newState;
        }
      }
      return prev;
    });
  };

  return (
    <div
      className="min-h-screen text-gray-200 transition-colors duration-500"
      style={{ backgroundColor: currentTheme.backgroundColor }}
    >
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-sm border-b border-gray-700 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-thin tracking-wide text-gray-100">
                Klondike Solitaire
              </h1>
              <p className="text-sm text-gray-400 mt-1">Moves: {gameState.moves}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Pattern Selector */}
              <select
                value={currentTheme.id}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-2 bg-[#1e1e1e] border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-accent cursor-pointer flex-1 sm:flex-initial"
              >
                {allPacks.map((pack) => (
                  <option key={pack.id} value={pack.id}>
                    {pack.name}
                  </option>
                ))}
              </select>

              {/* Buy Button */}
              {currentTheme.shopLink && (
                <a
                  href={currentTheme.shopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm transition-colors whitespace-nowrap"
                >
                  Buy this Pattern
                </a>
              )}

              {/* New Game Button */}
              <button
                onClick={newGame}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors whitespace-nowrap"
              >
                New Game
              </button>

              <Link
                href="/games"
                className="px-4 py-2 border border-gray-600 hover:border-accent text-gray-300 hover:text-accent rounded-lg text-sm transition-colors whitespace-nowrap"
              >
                Back to Games
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Win Message */}
      {gameState.won && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] border-2 border-accent rounded-2xl p-8 max-w-md w-full text-center">
            <h2 className="text-4xl font-bold text-accent mb-4">🎉 You Won! 🎉</h2>
            <p className="text-gray-300 mb-2">Completed in {gameState.moves} moves</p>
            <button
              onClick={newGame}
              className="mt-6 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg text-lg transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Game Board */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        {/* Top Row: Stock, Waste, and Foundations */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-6">
          {/* Stock */}
          <div className="aspect-[2/3] relative">
            {gameState.stock.length > 0 ? (
              <div className="absolute inset-0">
                <CardComponent
                  card={gameState.stock[gameState.stock.length - 1]}
                  onClick={drawCard}
                />
              </div>
            ) : (
              <div
                onClick={drawCard}
                className="w-full h-full border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-accent transition-colors"
              >
                <span className="text-2xl opacity-50">↻</span>
              </div>
            )}
          </div>

          {/* Waste */}
          <div className="aspect-[2/3] relative">
            {gameState.waste.length > 0 && (
              <div className="absolute inset-0">
                <CardComponent
                  card={gameState.waste[gameState.waste.length - 1]}
                  draggable
                  onDragStart={handleDragStart(
                    [gameState.waste[gameState.waste.length - 1]],
                    "waste"
                  )}
                  onClick={() =>
                    autoMoveToFoundation(
                      gameState.waste[gameState.waste.length - 1],
                      "waste"
                    )
                  }
                />
              </div>
            )}
          </div>

          {/* Spacer */}
          <div />

          {/* Foundations */}
          {gameState.foundations.map((foundation, i) => (
            <div
              key={i}
              className="aspect-[2/3] relative"
              onDrop={handleDrop(`foundation-${i}`)}
              onDragOver={handleDragOver}
            >
              {foundation.length > 0 ? (
                <div className="absolute inset-0">
                  <CardComponent
                    card={foundation[foundation.length - 1]}
                    draggable
                    onDragStart={handleDragStart(
                      [foundation[foundation.length - 1]],
                      `foundation-${i}`
                    )}
                  />
                </div>
              ) : (
                <div className="w-full h-full border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-500">
                  A
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tableau */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4">
          {gameState.tableau.map((pile, colIndex) => (
            <div
              key={colIndex}
              className="min-h-[200px] relative"
              onDrop={handleDrop(`tableau-${colIndex}`)}
              onDragOver={handleDragOver}
            >
              {pile.length === 0 ? (
                <div className="aspect-[2/3] w-full border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-500">
                  K
                </div>
              ) : (
                pile.map((card, cardIndex) => {
                  const canDrag = card.faceUp;
                  const cardsFromHere = pile.slice(cardIndex);

                  return (
                    <div
                      key={card.id}
                      className="absolute w-full aspect-[2/3]"
                      style={{
                        top: `${cardIndex * 1.5}rem`,
                        zIndex: cardIndex,
                      }}
                    >
                      <CardComponent
                        card={card}
                        draggable={canDrag}
                        onDragStart={
                          canDrag
                            ? handleDragStart(cardsFromHere, `tableau-${colIndex}`)
                            : undefined
                        }
                        onClick={
                          canDrag && cardIndex === pile.length - 1
                            ? () => autoMoveToFoundation(card, `tableau-${colIndex}`)
                            : undefined
                        }
                      />
                    </div>
                  );
                })
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto space-y-2">
          <p>
            <strong>How to play:</strong> Drag cards to build sequences in alternating colors on the tableau.
            Build up foundations from Ace to King. Click cards to auto-move to foundations.
          </p>
          <p className="text-xs">
            Change patterns using the dropdown above. Each pattern can be purchased to support the creator!
          </p>
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// THEME PROVIDER & PAGE EXPORT
// ============================================================================

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentPackId, setCurrentPackId] = useState("default");

  const value: ThemeContextType = {
    currentTheme: themePacks[currentPackId],
    setTheme: setCurrentPackId,
    allPacks: Object.values(themePacks),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default function KlondikeSolitairePage() {
  return (
    <ThemeProvider>
      <KlondikeSolitaire />
    </ThemeProvider>
  );
}
