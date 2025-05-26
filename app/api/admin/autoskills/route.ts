import { NextRequest, NextResponse } from "next/server";
import { ExperienceEntry } from "@/types";
import { experiences } from "@/data/cv-data";
import { userProfile } from "@/data/user-profile";

// Only allow in development mode
const isDev = process.env.NODE_ENV === "development";

/**
 * This route analyzes the user's experience and profile data to determine the most frequently used skills.
 * It counts occurrences of each skill/tag across all experiences and returns the most common ones.
 */
export async function POST(request: NextRequest) {
  if (!isDev) {
    return NextResponse.json(
      { error: "Admin API only available in development mode" },
      { status: 403 }
    );
  }

  try {
    // Get experiences from the request body or fallback to the imported data
    const reqBody = await request.json();
    const experienceData: ExperienceEntry[] =
      reqBody.experiences || experiences;

    // Collect all tags from experience entries
    const allTags: string[] = [];
    experienceData.forEach((exp) => {
      if (exp.tags && Array.isArray(exp.tags)) {
        exp.tags.forEach((tag) => {
          allTags.push(tag);
        });
      }
    });

    // Count occurrences of each tag
    const tagCounts: Record<string, number> = {};
    allTags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    // Sort tags by frequency (most frequent first)
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
      .map((entry) => entry[0]); // Extract just the tag names

    // Return the top 10 skills
    return NextResponse.json({
      topSkills: sortedTags.slice(0, 10)
    });
  } catch (error) {
    console.error("Error generating top skills:", error);
    return NextResponse.json(
      { error: "Failed to generate top skills" },
      { status: 500 }
    );
  }
}
