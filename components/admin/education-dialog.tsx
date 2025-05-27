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
import { AIEnhancedInput } from '@/components/admin/ai-enhanced-input';

interface EducationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentEducation: { institution: string; degree: string; field: string; dateRange: string; _index?: number } | null;
  setCurrentEducation: (edu: { institution: string; degree: string; field: string; dateRange: string; _index?: number } | null) => void;
  saveEducation: () => void;
}

const EducationDialog: React.FC<EducationDialogProps> = ({
  open,
  setOpen,
  currentEducation,
  setCurrentEducation,
  saveEducation,
}) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {currentEducation?._index !== undefined ? 'Edit Education' : 'Add New Education'}
        </DialogTitle>
        <DialogDescription>
          Enter education details
        </DialogDescription>
      </DialogHeader>
      {currentEducation && (
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="institution" className="text-sm font-medium">Institution</label>            <AIEnhancedInput 
              id="institution" 
              fieldName="educational institution"
              value={currentEducation.institution} 
              onChange={(e) => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="degree" className="text-sm font-medium">Degree</label>            <AIEnhancedInput 
              id="degree" 
              fieldName="academic degree"
              value={currentEducation.degree} 
              onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="field" className="text-sm font-medium">Field of Study</label>            <AIEnhancedInput 
              id="field" 
              fieldName="field of study"
              value={currentEducation.field} 
              onChange={(e) => setCurrentEducation({ ...currentEducation, field: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="dateRange" className="text-sm font-medium">Date Range</label>            <AIEnhancedInput 
              id="dateRange" 
              fieldName="education date range"
              value={currentEducation.dateRange} 
              onChange={(e) => setCurrentEducation({ ...currentEducation, dateRange: e.target.value })}
              placeholder="e.g. 2010 - 2014"
            />
          </div>
        </div>
      )}
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={saveEducation}>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default EducationDialog;
