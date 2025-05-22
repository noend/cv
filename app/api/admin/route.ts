import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { experiences } from "@/data/cv-data";
import { topSkills } from "@/data/topSkills";
import { userProfile } from "@/data/user-profile";

// Only allow in development mode
const isDev = process.env.NODE_ENV === "development";

export async function GET(request: NextRequest) {
  if (!isDev) {
    return NextResponse.json(
      { error: "Admin API only available in development mode" },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "generateTopSkills") {
    // Generate top skills based on frequency in experiences
    const allTags: string[] = [];
    experiences.forEach((exp) => {
      exp.tags.forEach((tag) => {
        allTags.push(tag);
      });
    });

    // Count occurrences of each tag
    const tagCounts: Record<string, number> = {};
    allTags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    // Sort tags by frequency (most frequent first)
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0])
      .slice(0, 10); // Get top 10 skills

    return NextResponse.json({
      topSkills: sortedTags
    });
  }

  return NextResponse.json({
    experiences,
    topSkills,
    profileData: userProfile // Return as profileData for backward compatibility
  });
}

export async function POST(request: NextRequest) {
  if (!isDev) {
    return NextResponse.json(
      { error: "Admin API only available in development mode" },
      { status: 403 }
    );
  }

  try {
    const { file, data } = await request.json();

    if (!file || !data) {
      return NextResponse.json(
        { error: "Missing file or data parameter" },
        { status: 400 }
      );
    }

    // Validate file path to prevent directory traversal
    const allowedFiles = ["cv-data.ts", "topSkills.ts", "user-profile.ts"];
    if (!allowedFiles.includes(file)) {
      return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "data", file);

    // Format the data as a TypeScript export
    let fileContent = "";
    if (file === "cv-data.ts") {
      fileContent = `import { ExperienceEntry } from "@/types";\n\nexport const experiences: ExperienceEntry[] = ${JSON.stringify(
        data,
        null,
        2
      )};\n`;
    } else if (file === "topSkills.ts") {
      fileContent = `export const topSkills = ${JSON.stringify(
        data,
        null,
        2
      )};\n`;
    } else if (file === "user-profile.ts") {
      fileContent = `import { LanguageProficiency, UserProfile } from "@/types/profile";

export const userProfile: UserProfile = ${JSON.stringify(data, null, 2)};\n`;
    }

    // Write the file
    fs.writeFileSync(filePath, fileContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
