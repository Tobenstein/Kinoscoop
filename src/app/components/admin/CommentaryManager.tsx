import { useState, useEffect } from 'react';
import { Film, Tv, Award, FileText, List, Plus, Edit, Trash2, Star } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';
import { MovieCommentaryForm } from './MovieCommentaryForm';
import { TVCommentaryForm } from './TVCommentaryForm';
import { WrestlingCommentaryForm } from './WrestlingCommentaryForm';
import { EssayCommentaryForm } from './EssayCommentaryForm';
import { ListCommentaryForm } from './ListCommentaryForm';

type CommentaryType = 'movie' | 'tv' | 'wrestling' | 'essay' | 'list';

interface Commentary {
  id: number;
  type: CommentaryType;
  title: string;
  is_featured: boolean;
  published_date: string;
  genre?: string;
}

export function CommentaryManager() {
  const [commentaries, setCommentaries] = useState<Commentary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState<CommentaryType>('movie');
  const [editingCommentary, setEditingCommentary] = useState<Commentary | null>(null);

  useEffect(() => {
    fetchCommentaries();
  }, []);

  const fetchCommentaries = async () => {
    try {
      const { data, error } = await supabase
        .from('commentary')
        .select('id, type, title, is_featured, published_date, genre')
        .order('published_date', { ascending: false });

      if (error) throw error;
      if (data) setCommentaries(data);
    } catch (error: any) {
      toast.error(`Error fetching commentaries: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this commentary?')) return;

    try {
      const { error } = await supabase
        .from('commentary')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Commentary deleted successfully!');
      fetchCommentaries();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleToggleFeatured = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('commentary')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Commentary ${!currentStatus ? 'featured' : 'unfeatured'}!`);
      fetchCommentaries();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const getTypeIcon = (type: CommentaryType) => {
    switch (type) {
      case 'movie': return <Film className="w-4 h-4" />;
      case 'tv': return <Tv className="w-4 h-4" />;
      case 'wrestling': return <Award className="w-4 h-4" />;
      case 'essay': return <FileText className="w-4 h-4" />;
      case 'list': return <List className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: CommentaryType) => {
    switch (type) {
      case 'movie': return 'Movie';
      case 'tv': return 'TV Show';
      case 'wrestling': return 'Wrestling';
      case 'essay': return 'Essay';
      case 'list': return 'Article';
    }
  };

  const renderForm = () => {
    const formProps = {
      commentary: editingCommentary,
      onClose: () => {
        setShowForm(false);
        setEditingCommentary(null);
        fetchCommentaries();
      }
    };

    switch (selectedType) {
      case 'movie': return <MovieCommentaryForm {...formProps} />;
      case 'tv': return <TVCommentaryForm {...formProps} />;
      case 'wrestling': return <WrestlingCommentaryForm {...formProps} />;
      case 'essay': return <EssayCommentaryForm {...formProps} />;
      case 'list': return <ListCommentaryForm {...formProps} />;
    }
  };

  if (showForm) {
    return renderForm();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-foreground">Commentary Manager</h2>
        <div className="flex items-center gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as CommentaryType)}
            className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          >
            <option value="movie">Movie Review</option>
            <option value="tv">TV Review</option>
            <option value="wrestling">Wrestling Event</option>
            <option value="essay">Essay</option>
            <option value="list">Article/Listicle</option>
          </select>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            Add {getTypeLabel(selectedType)}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-accent">
              <tr>
                <th className="text-left p-4 text-foreground">Type</th>
                <th className="text-left p-4 text-foreground">Title</th>
                <th className="text-left p-4 text-foreground">Genre/Category</th>
                <th className="text-left p-4 text-foreground">Published</th>
                <th className="text-left p-4 text-foreground">Featured</th>
                <th className="text-right p-4 text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {commentaries.map((commentary) => (
                <tr key={commentary.id} className="border-t border-border hover:bg-accent/50">
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-foreground">
                      {getTypeIcon(commentary.type)}
                      <span className="text-sm">{getTypeLabel(commentary.type)}</span>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{commentary.title}</td>
                  <td className="p-4 text-muted-foreground">{commentary.genre || '—'}</td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(commentary.published_date).toLocaleDateString('en-GB')}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleFeatured(commentary.id, commentary.is_featured)}
                      className={`p-1 rounded transition-colors ${
                        commentary.is_featured
                          ? 'text-primary hover:text-primary/80'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Star className={`w-5 h-5 ${commentary.is_featured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingCommentary(commentary);
                          setSelectedType(commentary.type);
                          setShowForm(true);
                        }}
                        className="p-2 text-foreground hover:bg-accent rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(commentary.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {commentaries.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No commentary posts yet. Create your first one!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
