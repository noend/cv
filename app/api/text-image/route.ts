import { NextRequest, NextResponse } from "next/server";
import { createCanvas, registerFont } from "canvas";
import { userProfile } from "@/data/user-profile";
import path from "path";

// Register the Inter font
registerFont(
  path.join(
    process.cwd(),
    "public",
    "fonts",
    "Inter_VariableFont_opsz_wght.ttf"
  ),
  {
    family: "Inter"
  }
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fieldType = searchParams.get("fieldType");
  const fontSize = parseInt(searchParams.get("size") || "26", 10);
  const color = searchParams.get("color") || "#222";
  const bg = searchParams.get("bg") || "transparent";

  if (!fieldType || (fieldType !== "phone" && fieldType !== "email")) {
    return new NextResponse(
      "Please specify fieldType parameter as either 'phone' or 'email'",
      { status: 400 }
    );
  }

  // Get the specific field value from user profile
  const text = fieldType === "phone" ? userProfile.phone : userProfile.email;

  // Estimate width
  const canvas = createCanvas(1, 1);
  const ctx = canvas.getContext("2d");
  ctx.font = `${fontSize}px Inter`;
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
  outCtx.font = `${fontSize}px Inter`;
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
