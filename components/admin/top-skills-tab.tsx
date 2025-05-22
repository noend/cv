"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ArrowUp, ArrowDown } from "lucide-react";

interface TopSkillsTabProps {
  topSkills: string[];
  setTopSkills: (skills: string[]) => void;
  editMode: "visual" | "json";
  setEditMode: (mode: "visual" | "json") => void;
  saving: boolean;
  handleSave: (file: string, data: any) => void;
  handleTopSkillsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  addTopSkill: () => void;
  removeTopSkill: (skill: string) => void;
  moveTopSkill: (index: number, direction: "up" | "down") => void;
  generateAutomaticTopSkills: () => void;
  newSkill: string;
  setNewSkill: (skill: string) => void;
}

export default function TopSkillsTab({
  topSkills,
  setTopSkills,
  editMode,
  setEditMode,
  saving,
  handleSave,
  handleTopSkillsChange,
  addTopSkill,
  removeTopSkill,
  moveTopSkill,
  generateAutomaticTopSkills,
  newSkill,
  setNewSkill
}: TopSkillsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Top Skills</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              setEditMode(editMode === "visual" ? "json" : "visual")}
          >
            Switch to {editMode === "visual" ? "JSON" : "Visual"} Editor
          </Button>
          <Button
            variant="default"
            onClick={generateAutomaticTopSkills}
            disabled={saving}
          >
            Automatic Top Skills
          </Button>
          <Button
            onClick={() => handleSave("topSkills.ts", topSkills)}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Top Skills"}
          </Button>
        </div>
      </div>

      {editMode === "json"
        ? <Textarea
            className="font-mono h-[70vh]"
            value={JSON.stringify(topSkills, null, 2)}
            onChange={handleTopSkillsChange}
          />
        : <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add new skill"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addTopSkill()}
              />
              <Button onClick={addTopSkill}>Add Skill</Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {topSkills.map((skill, index) =>
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md"
                    >
                      <span>
                        {skill}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveTopSkill(index, "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveTopSkill(index, "down")}
                          disabled={index === topSkills.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTopSkill(skill)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>}
    </div>
  );
}
