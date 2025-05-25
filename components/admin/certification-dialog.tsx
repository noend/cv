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
import { CertificationDialogProps } from '@/types/admin-components';

const CertificationDialog: React.FC<CertificationDialogProps> = ({
  open,
  setOpen,
  currentCertification,
  setCurrentCertification,
  saveCertification,
}) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {currentCertification?._index !== undefined ? 'Edit Certification' : 'Add New Certification'}
        </DialogTitle>
        <DialogDescription>
          Enter certification details
        </DialogDescription>
      </DialogHeader>
      {currentCertification && (
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Certification Name</label>
            <Input 
              id="name" 
              value={currentCertification.name} 
              onChange={(e) => setCurrentCertification({ ...currentCertification, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="issuer" className="text-sm font-medium">Issuing Organization</label>
            <Input 
              id="issuer" 
              value={currentCertification.issuer || ''} 
              onChange={(e) => setCurrentCertification({ ...currentCertification, issuer: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">Date</label>
            <Input 
              id="date" 
              value={currentCertification.date || ''} 
              onChange={(e) => setCurrentCertification({ ...currentCertification, date: e.target.value })}
              placeholder="e.g. June 2023"
            />
          </div>
        </div>
      )}
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={saveCertification}>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default CertificationDialog;
