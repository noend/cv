import { NextRequest, NextResponse } from "next/server";
import { createCanvas, registerFont } from "canvas";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "";
  const fontSize = parseInt(searchParams.get("size") || "26", 10);
  const color = searchParams.get("color") || "#222";
  const bg = searchParams.get("bg") || "transparent";

  // Optionally register a custom font here
  // registerFont('/path/to/font.ttf', { family: 'CustomFont' });

  // Estimate width
  const canvas = createCanvas(1, 1);
  const ctx = canvas.getContext("2d");
  ctx.font = `${fontSize}px sans-serif`;
  const textWidth = ctx.measureText(text).width;
  const padding = 12;
  const width = Math.ceil(textWidth + padding * 2);
  const height = fontSize + padding * 2;

  const outCanvas = createCanvas(width, height);
  const outCtx = outCanvas.getContext("2d");
  if (bg !== "transparent") {
    outCtx.fillStyle = bg;
    outCtx.fillRect(0, 0, width, height);
  }
  outCtx.font = `${fontSize}px sans-serif`;
  outCtx.fillStyle = color;
  outCtx.textBaseline = "top";
  outCtx.fillText(text, padding, padding);

  const buffer = outCanvas.toBuffer("image/png");
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400"
    }
  });
}
