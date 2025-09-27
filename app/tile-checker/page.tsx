"use client";

import Link from "next/link";

export const dynamic = "force-static";

export default function TileCheckerPage() {
  return (
    <main className="min-h-screen p-6 text-white" style={{ background: "#0b0b0c" }}>
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">Tile Checker - React Page</h1>
        <p>This page no longer hosts the static checker to avoid route collisions.</p>
        <p>
          Use the static tool instead:{" "}
          <a href="/checker.html" className="underline">Open checker.html</a>
        </p>
        <p>
          If you linked to <code>/checker</code> before, update those links to <code>/checker.html</code> or keep using this page for any React content you want.
        </p>
      </div>
    </main>
  );
}
