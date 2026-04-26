import { useState, useEffect } from 'react';
import { Save, Plus, X } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { toast } from 'sonner';

interface Challenge {
  id?: number;
  title: string;
  description: string;
  goal: number;
  current: number;
  category: string;
  deadline?: string;
  completed: boolean;
}

export function ChallengesManager() {
  const [loading, setLoading] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const fetchChallenges = async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('id');

      if (error) {
        console.error('Error fetching challenges:', error);
        return;
      }

      if (data && data.length > 0) {
        setChallenges(data);
      } else {
        // Set default challenges if none exist
        setChallenges([
          {
            title: "Century Club",
            description: "Watch 100 movies in 2026",
            goal: 100,
            current: 67,
            category: "Annual",
            deadline: "December 31, 2026",
            completed: false
          },
          {
            title: "Director Deep Dive: Nolan",
            description: "Watch all Christopher Nolan films",
            goal: 12,
            current: 8,
            category: "Director",
            completed: false
          },
          {
            title: "Criterion Collection Explorer",
            description: "Watch 25 Criterion Collection films",
            goal: 25,
            current: 12,
            category: "Collection",
            completed: false
          },
          {
            title: "Oscar Winners Marathon",
            description: "Watch all Best Picture winners from the 1990s",
            goal: 10,
            current: 10,
            category: "Awards",
            completed: true
          },
          {
            title: "Foreign Film Focus",
            description: "Watch 30 non-English language films",
            goal: 30,
            current: 18,
            category: "International",
            completed: false
          },
          {
            title: "Silent Cinema Appreciation",
            description: "Watch 10 silent films",
            goal: 10,
            current: 4,
            category: "Classic",
            completed: false
          }
        ]);
      }
    };

    fetchChallenges();
  }, []);

  const handleSave = async () => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase is not configured');
      return;
    }

    setLoading(true);

    try {
      // Delete all existing challenges
      await supabase.from('challenges').delete().neq('id', 0);

      // Insert all challenges
      const { error } = await supabase
        .from('challenges')
        .insert(challenges.map(c => ({
          title: c.title,
          description: c.description,
          goal: c.goal,
          current: c.current,
          category: c.category,
          deadline: c.deadline || null,
          completed: c.completed
        })));

      if (error) throw error;

      toast.success('Challenges saved successfully!');
    } catch (error: any) {
      toast.error(`Error saving: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addChallenge = () => {
    setChallenges([
      ...challenges,
      {
        title: '',
        description: '',
        goal: 10,
        current: 0,
        category: 'Custom',
        deadline: '',
        completed: false
      }
    ]);
  };

  const removeChallenge = (index: number) => {
    setChallenges(challenges.filter((_, i) => i !== index));
  };

  const updateChallenge = (index: number, field: keyof Challenge, value: any) => {
    const updated = [...challenges];
    updated[index] = { ...updated[index], [field]: value };
    setChallenges(updated);
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <p className="text-muted-foreground">
          Supabase is not configured. Please set up your database to manage challenges.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-foreground">Manage Challenges</h2>
        <button
          onClick={addChallenge}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Challenge
        </button>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg text-foreground">Challenge {index + 1}</h3>
              <button
                onClick={() => removeChallenge(index)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={challenge.title}
                  onChange={(e) => updateChallenge(index, 'title', e.target.value)}
                  placeholder="Challenge title"
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Category</label>
                <input
                  type="text"
                  value={challenge.category}
                  onChange={(e) => updateChallenge(index, 'category', e.target.value)}
                  placeholder="e.g., Annual, Director, Collection"
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-foreground mb-2">Description</label>
                <textarea
                  value={challenge.description}
                  onChange={(e) => updateChallenge(index, 'description', e.target.value)}
                  placeholder="Challenge description"
                  rows={2}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Goal</label>
                <input
                  type="number"
                  value={challenge.goal}
                  onChange={(e) => updateChallenge(index, 'goal', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Current Progress</label>
                <input
                  type="number"
                  value={challenge.current}
                  onChange={(e) => updateChallenge(index, 'current', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Deadline (optional)</label>
                <input
                  type="text"
                  value={challenge.deadline || ''}
                  onChange={(e) => updateChallenge(index, 'deadline', e.target.value)}
                  placeholder="e.g., December 31, 2026"
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`completed-${index}`}
                  checked={challenge.completed}
                  onChange={(e) => updateChallenge(index, 'completed', e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor={`completed-${index}`} className="text-foreground">
                  Mark as completed
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save All Challenges'}
        </button>
      </div>
    </div>
  );
}
