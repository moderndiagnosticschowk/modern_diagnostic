import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { getRatesAdmin, getWebContent, addRate, deleteRate, updateRate, addContent, deleteContent, updateContent } from '@/lib/data';
import { Trash2, Edit, Plus, LogOut, Search, Clock, DollarSign, Activity, Settings, FileText, Globe } from 'lucide-react';

interface RateItem {
  id: string;
  test_name: string;
  price: number;
  category: string;
  description: string;
  is_active: boolean;
}

type WebSectionContent = {
  title?: string
  content?: string
  image_url?: string
  button_text?: string
  button_link?: string
}

interface WebContent {
  id: string;
  section: string;
  content: WebSectionContent;
  updated_by: string | null;
  updated_at: string;
}

const Admin = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [rates, setRates] = useState<RateItem[]>([]);
  const [webContent, setWebContent] = useState<WebContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [newRate, setNewRate] = useState({
    test_name: '',
    price: '',
    category: '',
    description: ''
  });

  const [newContent, setNewContent] = useState({
    section: '',
    title: '',
    content: '',
    image_url: '',
    button_text: '',
    button_link: ''
  });

  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);
  const [editingRate, setEditingRate] = useState<RateItem | null>(null);
  const [editRateForm, setEditRateForm] = useState({
    test_name: '',
    price: '',
    category: '',
    description: '',
    is_active: true as boolean
  });

  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<WebContent | null>(null);
  const [editContentForm, setEditContentForm] = useState({
    section: '',
    title: '',
    content: '',
    image_url: '',
    button_text: '',
    button_link: ''
  });

  // Filter rates based on search term
  const filteredRates = rates.filter(rate => 
    rate.test_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get summary statistics
  const totalRates = rates.length;
  const activeRates = rates.filter(rate => rate.is_active).length;
  const categories = [...new Set(rates.map(rate => rate.category))].length;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    fetchData();
  }, [user, isAdmin, navigate]);

  const fetchData = async () => {
    try {
      const [ratesData, contentData] = await Promise.all([
        getRatesAdmin(),
        getWebContent()
      ]);
      setRates(ratesData);
      setWebContent(contentData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRate({
        test_name: newRate.test_name,
        price: parseFloat(newRate.price),
        category: newRate.category,
        description: newRate.description,
        is_active: true
      });

      toast({
        title: "Success",
        description: "Rate added successfully",
      });

      setNewRate({ test_name: '', price: '', category: '', description: '' });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add rate",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRate = async (id: string) => {
    try {
      await deleteRate(id);

      toast({
        title: "Success",
        description: "Rate deleted successfully",
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete rate",
        variant: "destructive",
      });
    }
  };

  const openRateEdit = (rate: RateItem) => {
    setEditingRate(rate);
    setEditRateForm({
      test_name: rate.test_name,
      price: String(rate.price),
      category: rate.category,
      description: rate.description || '',
      is_active: !!rate.is_active
    });
    setIsRateDialogOpen(true);
  };

  const handleUpdateRate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRate) return;
    try {
      await updateRate(editingRate.id, {
        test_name: editRateForm.test_name,
        price: parseFloat(editRateForm.price),
        category: editRateForm.category,
        description: editRateForm.description,
        is_active: editRateForm.is_active
      });
      toast({ title: "Success", description: "Rate updated successfully" });
      setIsRateDialogOpen(false);
      setEditingRate(null);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Failed to update rate", variant: "destructive" });
    }
  };

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const contentData = {
        title: newContent.title,
        content: newContent.content,
        image_url: newContent.image_url,
        button_text: newContent.button_text,
        button_link: newContent.button_link
      };

      await addContent({
        section: newContent.section,
        content: contentData
      });

      toast({
        title: "Success",
        description: "Content added successfully",
      });

      setNewContent({ section: '', title: '', content: '', image_url: '', button_text: '', button_link: '' });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add content",
        variant: "destructive",
      });
    }
  };

  const handleDeleteContent = async (id: string) => {
    try {
      await deleteContent(id);

      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  const openContentEdit = (content: WebContent) => {
    setEditingContent(content);
    setEditContentForm({
      section: content.section,
      title: content.content?.title || '',
      content: content.content?.content || '',
      image_url: content.content?.image_url || '',
      button_text: content.content?.button_text || '',
      button_link: content.content?.button_link || ''
    });
    setIsContentDialogOpen(true);
  };

  const handleUpdateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContent) return;
    try {
      const contentData = {
        title: editContentForm.title,
        content: editContentForm.content,
        image_url: editContentForm.image_url,
        button_text: editContentForm.button_text,
        button_link: editContentForm.button_link
      };
      await updateContent(editingContent.id, {
        section: editContentForm.section,
        content: contentData
      });
      toast({ title: "Success", description: "Content updated successfully" });
      setIsContentDialogOpen(false);
      setEditingContent(null);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Failed to update content", variant: "destructive" });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Professional Header */}
        <div className="bg-card rounded-xl shadow-sm border mb-8 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Modern Diagnostic Center Management</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                <Activity className="w-3 h-3 mr-1" />
                {user?.email}
              </Badge>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tests</p>
                  <p className="text-2xl font-bold text-primary">{totalRates}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-gradient-to-r from-green-500/5 to-green-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Tests</p>
                  <p className="text-2xl font-bold text-green-600">{activeRates}</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-full">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-500/5 to-blue-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold text-blue-600">{categories}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="rates" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Rate Management
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Web Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rates" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Test Rate
                </CardTitle>
                <CardDescription>Add a new diagnostic test or service to your rate list</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleAddRate} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="test_name" className="text-sm font-medium">Test Name *</Label>
                    <Input
                      id="test_name"
                      placeholder="e.g., Complete Blood Count"
                      value={newRate.test_name}
                      onChange={(e) => setNewRate({ ...newRate, test_name: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newRate.price}
                      onChange={(e) => setNewRate({ ...newRate, price: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                    <Select value={newRate.category} onValueChange={(value) => setNewRate({ ...newRate, category: value })} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Blood Test">Blood Test</SelectItem>
                        <SelectItem value="Radiology">Radiology</SelectItem>
                        <SelectItem value="Pathology">Pathology</SelectItem>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Neurology">Neurology</SelectItem>
                        <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                        <SelectItem value="Immunology">Immunology</SelectItem>
                        <SelectItem value="Microbiology">Microbiology</SelectItem>
                        <SelectItem value="Biochemistry">Biochemistry</SelectItem>
                        <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                        <SelectItem value="CT Scan">CT Scan</SelectItem>
                        <SelectItem value="MRI">MRI</SelectItem>
                        <SelectItem value="X-Ray">X-Ray</SelectItem>
                        <SelectItem value="ECG">ECG</SelectItem>
                        <SelectItem value="Echo">Echo</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the test or service"
                      value={newRate.description}
                      onChange={(e) => setNewRate({ ...newRate, description: e.target.value })}
                      className="min-h-[88px] resize-none"
                    />
                  </div>
                  <div className="lg:col-span-2 pt-4">
                    <Button type="submit" size="lg" className="w-full lg:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Test Rate
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Rate Management
                    </CardTitle>
                    <CardDescription>View and manage all diagnostic test rates</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 max-w-sm">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search tests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Test Name</TableHead>
                        <TableHead className="font-semibold">Category</TableHead>
                        <TableHead className="font-semibold">Description</TableHead>
                        <TableHead className="font-semibold text-right">Price</TableHead>
                        <TableHead className="font-semibold text-center">Status</TableHead>
                        <TableHead className="font-semibold text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRates.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            {searchTerm ? 'No tests found matching your search.' : 'No test rates available. Add your first test rate above.'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRates.map((rate) => (
                          <TableRow key={rate.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{rate.test_name}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="font-normal">
                                {rate.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="text-sm text-muted-foreground truncate">
                                {rate.description || 'No description available'}
                              </p>
                            </TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              ₹{rate.price.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant={rate.is_active ? "default" : "secondary"} className="font-normal">
                                {rate.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openRateEdit(rate)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteRate(rate.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Web Content
                </CardTitle>
                <CardDescription>Create and manage website content sections</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleAddContent} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="section" className="text-sm font-medium">Section *</Label>
                    <Input
                      id="section"
                      placeholder="e.g., hero, about, services"
                      value={newContent.section}
                      onChange={(e) => setNewContent({ ...newContent, section: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Section title"
                      value={newContent.title}
                      onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="content" className="text-sm font-medium">Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Main content text"
                      value={newContent.content}
                      onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                      className="min-h-[100px] resize-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image_url" className="text-sm font-medium">Image URL</Label>
                    <Input
                      id="image_url"
                      placeholder="https://example.com/image.jpg"
                      value={newContent.image_url}
                      onChange={(e) => setNewContent({ ...newContent, image_url: e.target.value })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="button_text" className="text-sm font-medium">Button Text</Label>
                    <Input
                      id="button_text"
                      placeholder="Call to action text"
                      value={newContent.button_text}
                      onChange={(e) => setNewContent({ ...newContent, button_text: e.target.value })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="button_link" className="text-sm font-medium">Button Link</Label>
                    <Input
                      id="button_link"
                      placeholder="/contact or https://example.com"
                      value={newContent.button_link}
                      onChange={(e) => setNewContent({ ...newContent, button_link: e.target.value })}
                      className="h-11"
                    />
                  </div>
                  <div className="lg:col-span-2 pt-4">
                    <Button type="submit" size="lg" className="w-full lg:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Content
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Content Management
                </CardTitle>
                <CardDescription>View and manage all website content sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Section</TableHead>
                        <TableHead className="font-semibold">Title</TableHead>
                        <TableHead className="font-semibold">Content</TableHead>
                        <TableHead className="font-semibold">Last Updated</TableHead>
                        <TableHead className="font-semibold text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {webContent.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No website content available. Add your first content section above.
                          </TableCell>
                        </TableRow>
                      ) : (
                        webContent.map((content) => (
                          <TableRow key={content.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">
                              <Badge variant="outline" className="font-normal">
                                {content.section}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              {content.content?.title || 'No title'}
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="text-sm text-muted-foreground truncate">
                                {content.content?.content || 'No content'}
                              </p>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(content.updated_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openContentEdit(content)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteContent(content.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <Dialog open={isRateDialogOpen} onOpenChange={setIsRateDialogOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Test Rate</DialogTitle>
                <DialogDescription>Update details for the selected test</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateRate} className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_test_name">Test Name</Label>
                  <Input id="edit_test_name" value={editRateForm.test_name} onChange={(e) => setEditRateForm({ ...editRateForm, test_name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_price">Price (₹)</Label>
                  <Input id="edit_price" type="number" step="0.01" value={editRateForm.price} onChange={(e) => setEditRateForm({ ...editRateForm, price: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_category">Category</Label>
                  <Input id="edit_category" value={editRateForm.category} onChange={(e) => setEditRateForm({ ...editRateForm, category: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_description">Description</Label>
                  <Textarea id="edit_description" value={editRateForm.description} onChange={(e) => setEditRateForm({ ...editRateForm, description: e.target.value })} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editRateForm.is_active} onCheckedChange={(v) => setEditRateForm({ ...editRateForm, is_active: v })} />
                  <span className="text-sm">Active</span>
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full">Update Rate</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Web Content</DialogTitle>
                <DialogDescription>Update section and content details</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateContent} className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_section">Section</Label>
                  <Input id="edit_section" value={editContentForm.section} onChange={(e) => setEditContentForm({ ...editContentForm, section: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_title">Title</Label>
                  <Input id="edit_title" value={editContentForm.title} onChange={(e) => setEditContentForm({ ...editContentForm, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_content">Content</Label>
                  <Textarea id="edit_content" value={editContentForm.content} onChange={(e) => setEditContentForm({ ...editContentForm, content: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_image_url">Image URL</Label>
                  <Input id="edit_image_url" value={editContentForm.image_url} onChange={(e) => setEditContentForm({ ...editContentForm, image_url: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_button_text">Button Text</Label>
                  <Input id="edit_button_text" value={editContentForm.button_text} onChange={(e) => setEditContentForm({ ...editContentForm, button_text: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_button_link">Button Link</Label>
                  <Input id="edit_button_link" value={editContentForm.button_link} onChange={(e) => setEditContentForm({ ...editContentForm, button_link: e.target.value })} />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full">Update Content</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
