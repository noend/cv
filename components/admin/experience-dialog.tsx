import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AIEnhancedInput } from '@/components/admin/ai-enhanced-input';
import { EnhancedEditor } from '@/components/admin/enhanced-editor';
import { X } from 'lucide-react';
import { ExperienceEntry } from '@/types';

interface ExperienceDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentExperience: ExperienceEntry | null;
  setCurrentExperience: (exp: ExperienceEntry | null) => void;
  newSkill: string;
  setNewSkill: (skill: string) => void;
  addTag: () => void;
  removeTag: (tag: string) => void;
  saveExperience: () => void;
}

const ExperienceDialog: React.FC<ExperienceDialogProps> = ({
  open,
  setOpen,
  currentExperience,
  setCurrentExperience,
  newSkill,
  setNewSkill,
  addTag,
  removeTag,
  saveExperience,
}) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {currentExperience?._index !== undefined ? 'Edit Experience' : 'Add New Experience'}
        </DialogTitle>
        <DialogDescription>
          Fill in the details for this experience entry
        </DialogDescription>
      </DialogHeader>
      {currentExperience && (
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <AIEnhancedInput 
                id="title" 
                fieldName="job title"
                value={currentExperience.title} 
                onChange={(e) => setCurrentExperience({ ...currentExperience, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">Company</label>
              <AIEnhancedInput 
                id="company" 
                fieldName="company name"
                value={currentExperience.company} 
                onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">            <div className="space-y-2">
              <label htmlFor="dateRange" className="text-sm font-medium">Date Range</label>
              <AIEnhancedInput 
                id="dateRange" 
                fieldName="date range"
                value={currentExperience.dateRange} 
                onChange={(e) => setCurrentExperience({ ...currentExperience, dateRange: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location (optional)</label>
              <AIEnhancedInput 
                id="location" 
                fieldName="job location"
                value={currentExperience.location || ''} 
                onChange={(e) => setCurrentExperience({ ...currentExperience, location: e.target.value })}
              />
            </div>
          </div>          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <EnhancedEditor 
              value={currentExperience.description} 
              onChange={(value) => setCurrentExperience({ ...currentExperience, description: value })}
              fieldName="job description"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {currentExperience.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">              <AIEnhancedInput 
                placeholder="Add new tag" 
                fieldName="skill tag"
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
              />
              <Button onClick={addTag}>Add</Button>
            </div>
          </div>
        </div>
      )}
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={saveExperience}>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ExperienceDialog;
