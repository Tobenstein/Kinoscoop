import { Trophy, Target, CheckCircle, Circle, Calendar, Film } from 'lucide-react';
import { useState } from 'react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  goal: number;
  current: number;
  category: string;
  deadline?: string;
  completed: boolean;
}

export function Challenges() {
  const [challenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Century Club",
      description: "Watch 100 movies in 2026",
      goal: 100,
      current: 67,
      category: "Annual",
      deadline: "December 31, 2026",
      completed: false
    },
    {
      id: 2,
      title: "Director Deep Dive: Nolan",
      description: "Watch all Christopher Nolan films",
      goal: 12,
      current: 8,
      category: "Director",
      completed: false
    },
    {
      id: 3,
      title: "Criterion Collection Explorer",
      description: "Watch 25 Criterion Collection films",
      goal: 25,
      current: 12,
      category: "Collection",
      completed: false
    },
    {
      id: 4,
      title: "Oscar Winners Marathon",
      description: "Watch all Best Picture winners from the 1990s",
      goal: 10,
      current: 10,
      category: "Awards",
      completed: true
    },
    {
      id: 5,
      title: "Foreign Film Focus",
      description: "Watch 30 non-English language films",
      goal: 30,
      current: 18,
      category: "International",
      completed: false
    },
    {
      id: 6,
      title: "Silent Cinema Appreciation",
      description: "Watch 10 silent films",
      goal: 10,
      current: 4,
      category: "Classic",
      completed: false
    }
  ]);

  const [activeMovies] = useState([
    { title: "Tenet", progress: 35 },
    { title: "The Dark Knight Rises", progress: 0 },
    { title: "Dunkirk", progress: 100 },
    { title: "Memento", progress: 100 }
  ]);

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const activeChallenges = challenges.filter(c => !c.completed);
  const completedChallenges = challenges.filter(c => c.completed);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-primary" />
          <h1 className="text-3xl text-foreground">Challenges</h1>
        </div>
        <p className="text-muted-foreground">
          Track your movie-watching goals and achievements
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Active Challenges</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">{activeChallenges.length}</p>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h3 className="text-foreground">Completed</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">{completedChallenges.length}</p>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Film className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Total Movies</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">67</p>
          <p className="text-sm text-muted-foreground">this year</p>
        </div>
      </div>

      {/* Active Challenges */}
      <div className="mb-8">
        <h2 className="text-2xl text-foreground mb-6">Active Challenges</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeChallenges.map((challenge) => {
            const progress = calculateProgress(challenge.current, challenge.goal);
            
            return (
              <div
                key={challenge.id}
                className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                        {challenge.category}
                      </span>
                    </div>
                    <h3 className="text-xl text-foreground mb-2">{challenge.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {challenge.description}
                    </p>
                  </div>
                  <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{challenge.current} / {challenge.goal}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground mt-1">
                    {Math.round(progress)}%
                  </div>
                </div>

                {challenge.deadline && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {challenge.deadline}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Nolan Deep Dive Detail */}
      <div className="bg-gradient-to-br from-secondary to-accent rounded-xl shadow-sm border border-border p-6 mb-8">
        <h2 className="text-2xl text-foreground mb-4">Current Focus: Christopher Nolan Films</h2>
        <p className="text-foreground mb-6">
          Exploring the complete filmography of one of cinema's most innovative directors
        </p>
        
        <div className="space-y-3">
          {activeMovies.map((movie, index) => (
            <div key={index} className="bg-background/20 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-foreground">{movie.title}</span>
                <span className="text-sm text-foreground">
                  {movie.progress === 100 ? '✓' : movie.progress === 0 ? 'Not Started' : `${movie.progress}%`}
                </span>
              </div>
              {movie.progress > 0 && movie.progress < 100 && (
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${movie.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Completed Challenges */}
      {completedChallenges.length > 0 && (
        <div>
          <h2 className="text-2xl text-foreground mb-6">Completed Challenges</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-card rounded-xl shadow-sm border border-border p-6 opacity-75"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        {challenge.category}
                      </span>
                    </div>
                    <h3 className="text-xl text-foreground mb-2">{challenge.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {challenge.description}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>

                <div className="w-full bg-green-500/20 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }} />
                </div>
                <div className="text-right text-sm text-green-400 mt-1">
                  {challenge.goal} / {challenge.goal} completed!
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
