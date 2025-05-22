'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExperienceEntry } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { X, Plus, ArrowUp, ArrowDown, Edit, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [topSkills, setTopSkills] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<any>({
    name: "",
    title: "",
    location: "",
    email: "",
    about: "",
    socialLinks: {}
  });
  const [isDev, setIsDev] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState<'visual' | 'json'>('visual');
  const [currentExperience, setCurrentExperience] = useState<ExperienceEntry | null>(null);
  const [newSkill, setNewSkill] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    const checkEnv = async () => {
      try {
        setLoading(true);
        // Check if user is authenticated
        const isAuthenticated = document.cookie.includes('admin_authenticated=true');
        if (!isAuthenticated) {
          router.push('/admin/login');
          return;
        }
        
        const res = await fetch('/api/admin');
        
        if (res.status === 403) {
          setIsDev(false);
          setError('Admin panel is only available in development mode');
          return;
        }
        
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await res.json();
        setExperiences(data.experiences);
        setTopSkills(data.topSkills);
        setProfileData(data.profileData || {
          name: "",
          title: "",
          location: "",
          email: "",
          about: "",
          socialLinks: {}
        });
        setIsDev(true);
        setError(null);
      } catch (err) {
        setError('Error loading data. Make sure you are in development mode.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    checkEnv();
  }, [router]);

  const handleSave = async (file: string, data: any) => {
    try {
      setSaving(true);
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file, data }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save data');
      }
      
      toast({
        title: 'Success',
        description: `${file} saved successfully`,
        variant: 'default',
        className: 'bg-green-50 border-green-200 text-green-800',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to save data',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleExperiencesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsed = JSON.parse(e.target.value);
      setExperiences(parsed);
    } catch (err) {
      // Don't update state if JSON is invalid
      console.error('Invalid JSON:', err);
    }
  };

  const handleTopSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsed = JSON.parse(e.target.value);
      setTopSkills(parsed);
    } catch (err) {
      // Don't update state if JSON is invalid
      console.error('Invalid JSON:', err);
    }
  };

  const handleProfileDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsed = JSON.parse(e.target.value);
      setProfileData(parsed);
    } catch (err) {
      // Don't update state if JSON is invalid
      console.error('Invalid JSON:', err);
    }
  };

  const handleProfileFieldChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setProfileData({
      ...profileData,
      socialLinks: {
        ...profileData.socialLinks,
        [platform]: value
      }
    });
  };

  const addExperience = () => {
    const newExperience: ExperienceEntry = {
      title: "New Position",
      company: "Company Name",
      dateRange: "Start Date - End Date",
      location: "",
      description: "Description of your role and responsibilities",
      tags: []
    };
    setCurrentExperience(newExperience);
    setDialogOpen(true);
  };

  const editExperience = (exp: ExperienceEntry, index: number) => {
    setCurrentExperience({...exp, _index: index});
    setDialogOpen(true);
  };

  const saveExperience = () => {
    if (!currentExperience) return;
    
    const index = currentExperience._index;
    const expToSave = {...currentExperience};
    delete expToSave._index;
    
    let newExperiences = [...experiences];
    
    if (index !== undefined) {
      // Edit existing
      newExperiences[index] = expToSave;
      toast({
        title: 'Experience Updated',
        description: `"${expToSave.title}" has been updated`,
        className: 'bg-blue-50 border-blue-200 text-blue-800',
      });
    } else {
      // Add new
      newExperiences.push(expToSave);
      toast({
        title: 'Experience Added',
        description: `"${expToSave.title}" has been added`,
        className: 'bg-green-50 border-green-200 text-green-800',
      });
    }
    
    setExperiences(newExperiences);
    setDialogOpen(false);
    setCurrentExperience(null);
  };

  const deleteExperience = (index: number) => {
    const title = experiences[index].title;
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
    
    toast({
      title: 'Experience Deleted',
      description: `"${title}" has been removed`,
      variant: 'destructive',
    });
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === experiences.length - 1)
    ) {
      return;
    }
    
    const newExperiences = [...experiences];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newExperiences[index], newExperiences[newIndex]] = 
      [newExperiences[newIndex], newExperiences[index]];
    
    setExperiences(newExperiences);
  };

  const addTag = () => {
    if (!currentExperience || !newSkill.trim()) return;
    
    if (!currentExperience.tags.includes(newSkill)) {
      setCurrentExperience({
        ...currentExperience,
        tags: [...currentExperience.tags, newSkill]
      });
    }
    
    setNewSkill('');
  };

  const removeTag = (tag: string) => {
    if (!currentExperience) return;
    
    setCurrentExperience({
      ...currentExperience,
      tags: currentExperience.tags.filter(t => t !== tag)
    });
  };

  const addTopSkill = () => {
    if (!newSkill.trim()) return;
    
    if (!topSkills.includes(newSkill)) {
      setTopSkills([...topSkills, newSkill]);
      toast({
        title: 'Skill Added',
        description: `"${newSkill}" has been added to top skills`,
        className: 'bg-green-50 border-green-200 text-green-800',
      });
    } else {
      toast({
        title: 'Duplicate Skill',
        description: `"${newSkill}" already exists in top skills`,
        variant: 'destructive',
      });
    }
    
    setNewSkill('');
  };

  const removeTopSkill = (skill: string) => {
    setTopSkills(topSkills.filter(s => s !== skill));
    toast({
      title: 'Skill Removed',
      description: `"${skill}" has been removed from top skills`,
      variant: 'destructive',
    });
  };

  const moveTopSkill = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === topSkills.length - 1)
    ) {
      return;
    }
    
    const newSkills = [...topSkills];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newSkills[index], newSkills[newIndex]] = [newSkills[newIndex], newSkills[index]];
    
    setTopSkills(newSkills);
  };

  const generateAutomaticTopSkills = async () => {
    try {
      setSaving(true);
      const res = await fetch('/api/admin?action=generateTopSkills');
      
      if (!res.ok) {
        throw new Error('Failed to generate top skills');
      }
      
      const data = await res.json();
      setTopSkills(data.topSkills);
      
      toast({
        title: 'Top Skills Generated',
        description: 'Top skills have been automatically generated based on experience tags frequency. Page will refresh in 2 seconds.',
        className: 'bg-blue-50 border-blue-200 text-blue-800',
      });
      
      // Refresh the page after a short delay to pull fresh data
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to generate top skills',
        variant: 'destructive',
      });
      setSaving(false);
    }
    // Note: Not setting saving to false here since we're refreshing the page
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!isDev) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertTitle>Development Mode Only</AlertTitle>
          <AlertDescription>
            The admin panel is only available in development mode. Please run the application in development mode to access this feature.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <p className="mb-6 text-muted-foreground">
        Edit your data files here. Changes will be saved to the actual files in the /data directory.
        After editing, you should manually commit these changes to your repository.
      </p>
      
      <Tabs defaultValue="experiences">
        <TabsList className="mb-4">
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="topSkills">Top Skills</TabsTrigger>
          <TabsTrigger value="profileData">Profile Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="experiences" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit Experiences</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setEditMode(editMode === 'visual' ? 'json' : 'visual')}
              >
                Switch to {editMode === 'visual' ? 'JSON' : 'Visual'} Editor
              </Button>
              <Button 
                onClick={() => handleSave('cv-data.ts', experiences)}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Experiences'}
              </Button>
            </div>
          </div>

          {editMode === 'json' ? (
            <Textarea 
              className="font-mono h-[70vh]"
              value={JSON.stringify(experiences, null, 2)}
              onChange={handleExperiencesChange}
            />
          ) : (
            <div className="space-y-4">
              <Button onClick={addExperience} className="mb-4">
                <Plus className="mr-2 h-4 w-4" /> Add New Experience
              </Button>
              
              <div className="grid gap-4">
                {experiences.map((exp, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{exp.title}</CardTitle>
                          <CardDescription>
                            {exp.company} • {exp.dateRange} {exp.location ? `• ${exp.location}` : ''}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => moveExperience(index, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => moveExperience(index, 'down')}
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
                      <p className="text-sm mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.slice(0, 10).map((tag, i) => (
                          <Badge key={i} variant="secondary">{tag}</Badge>
                        ))}
                        {exp.tags.length > 10 && (
                          <Badge variant="outline">+{exp.tags.length - 10} more</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="topSkills" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit Top Skills</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setEditMode(editMode === 'visual' ? 'json' : 'visual')}
              >
                Switch to {editMode === 'visual' ? 'JSON' : 'Visual'} Editor
              </Button>
              <Button 
                variant="default"
                onClick={generateAutomaticTopSkills}
                disabled={saving}
              >
                Automatic Top Skills
              </Button>
              <Button 
                onClick={() => handleSave('topSkills.ts', topSkills)}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Top Skills'}
              </Button>
            </div>
          </div>

          {editMode === 'json' ? (
            <Textarea 
              className="font-mono h-[70vh]"
              value={JSON.stringify(topSkills, null, 2)}
              onChange={handleTopSkillsChange}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Add new skill" 
                  value={newSkill} 
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTopSkill()}
                />
                <Button onClick={addTopSkill}>Add Skill</Button>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    {topSkills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <span>{skill}</span>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => moveTopSkill(index, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => moveTopSkill(index, 'down')}
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="profileData" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit Profile Data</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setEditMode(editMode === 'visual' ? 'json' : 'visual')}
              >
                Switch to {editMode === 'visual' ? 'JSON' : 'Visual'} Editor
              </Button>
              <Button 
                onClick={() => handleSave('profile.ts', profileData)}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Profile Data'}
              </Button>
            </div>
          </div>

          {editMode === 'json' ? (
            <Textarea 
              className="font-mono h-[70vh]"
              value={JSON.stringify(profileData, null, 2)}
              onChange={handleProfileDataChange}
            />
          ) : (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input 
                        id="name" 
                        value={profileData.name || ''} 
                        onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">Title</label>
                      <Input 
                        id="title" 
                        value={profileData.title || ''} 
                        onChange={(e) => handleProfileFieldChange('title', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium">Location</label>
                      <Input 
                        id="location" 
                        value={profileData.location || ''} 
                        onChange={(e) => handleProfileFieldChange('location', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input 
                        id="email" 
                        type="email"
                        value={profileData.email || ''} 
                        onChange={(e) => handleProfileFieldChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="about" className="text-sm font-medium">About</label>
                    <Textarea 
                      id="about" 
                      rows={5}
                      value={profileData.about || ''} 
                      onChange={(e) => handleProfileFieldChange('about', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="linkedin" className="text-sm font-medium">LinkedIn</label>
                      <Input 
                        id="linkedin" 
                        value={profileData.socialLinks?.linkedin || ''} 
                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="github" className="text-sm font-medium">GitHub</label>
                      <Input 
                        id="github" 
                        value={profileData.socialLinks?.github || ''} 
                        onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="twitter" className="text-sm font-medium">Twitter</label>
                      <Input 
                        id="twitter" 
                        value={profileData.socialLinks?.twitter || ''} 
                        onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="other" className="text-sm font-medium">Other</label>
                      <Input 
                        id="other" 
                        value={profileData.socialLinks?.other || ''} 
                        onChange={(e) => handleSocialLinkChange('other', e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input 
                    id="title" 
                    value={currentExperience.title} 
                    onChange={(e) => setCurrentExperience({...currentExperience, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Company</label>
                  <Input 
                    id="company" 
                    value={currentExperience.company} 
                    onChange={(e) => setCurrentExperience({...currentExperience, company: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="dateRange" className="text-sm font-medium">Date Range</label>
                  <Input 
                    id="dateRange" 
                    value={currentExperience.dateRange} 
                    onChange={(e) => setCurrentExperience({...currentExperience, dateRange: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">Location (optional)</label>
                  <Input 
                    id="location" 
                    value={currentExperience.location || ''} 
                    onChange={(e) => setCurrentExperience({...currentExperience, location: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="description" 
                  rows={5}
                  value={currentExperience.description} 
                  onChange={(e) => setCurrentExperience({...currentExperience, description: e.target.value})}
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
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add new tag" 
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
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveExperience}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
