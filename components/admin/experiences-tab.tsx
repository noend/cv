"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExperienceEntry } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowUp, ArrowDown, Edit, Trash2 } from "lucide-react";

interface ExperiencesTabProps {
  experiences: ExperienceEntry[];
  setExperiences: (experiences: ExperienceEntry[]) => void;
  editMode: "visual" | "json";
  setEditMode: (mode: "visual" | "json") => void;
  saving: boolean;
  handleSave: (file: string, data: any) => void;
  handleExperiencesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  addExperience: () => void;
  editExperience: (exp: ExperienceEntry, index: number) => void;
  deleteExperience: (index: number) => void;
  moveExperience: (index: number, direction: "up" | "down") => void;
}

export default function ExperiencesTab({
  experiences,
  setExperiences,
  editMode,
  setEditMode,
  saving,
  handleSave,
  handleExperiencesChange,
  addExperience,
  editExperience,
  deleteExperience,
  moveExperience
}: ExperiencesTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Experiences</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              setEditMode(editMode === "visual" ? "json" : "visual")}
          >
            Switch to {editMode === "visual" ? "JSON" : "Visual"} Editor
          </Button>
          <Button
            onClick={() => handleSave("cv-data.ts", experiences)}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Experiences"}
          </Button>
        </div>
      </div>

      {editMode === "json"
        ? <Textarea
            className="font-mono h-[70vh]"
            value={JSON.stringify(experiences, null, 2)}
            onChange={handleExperiencesChange}
          />
        : <div className="space-y-4">
            <Button onClick={addExperience} className="mb-4">
              <Plus className="mr-2 h-4 w-4" /> Add New Experience
            </Button>

            <div className="grid gap-4">
              {experiences.map((exp, index) =>
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>
                          {exp.title}
                        </CardTitle>
                        <CardDescription>
                          {exp.company} • {exp.dateRange}{" "}
                          {exp.location ? `• ${exp.location}` : ""}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => moveExperience(index, "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => moveExperience(index, "down")}
                          disabled={index === experiences.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => editExperience(exp, index)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteExperience(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.slice(0, 10).map((tag, i) =>
                        <Badge key={i} variant="secondary">
                          {tag}
                        </Badge>
                      )}
                      {exp.tags.length > 10 &&
                        <Badge variant="outline">
                          +{exp.tags.length - 10} more
                        </Badge>}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>}
    </div>
  );
}
