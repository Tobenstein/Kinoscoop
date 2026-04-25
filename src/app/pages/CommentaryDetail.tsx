import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Star, Film, User, Monitor, ExternalLink, MapPin, Trophy } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { StarRating } from '../components/StarRating';
import { supabase } from '../../lib/supabase';

export function CommentaryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commentary, setCommentary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommentary = async () => {
      try {
        const { data, error } = await supabase
          .from('commentary')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCommentary(data);
      } catch (error) {
        console.error('Error fetching commentary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentary();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Film className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!commentary) {
    return (
      <div className="max-w-5xl mx-auto text-center py-12">
        <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl text-foreground mb-2">Commentary not found</h2>
        <Link to="/reviews" className="text-primary hover:underline">
          Back to Commentary
        </Link>
      </div>
    );
  }

  const renderMovieOrTV = () => (
    <>
      {/* Backdrop Header */}
      {commentary.backdrop_url && (
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <ImageWithFallback
            src={commentary.backdrop_url}
            alt={commentary.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      )}

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <div className="sticky top-8">
            {commentary.poster_url && (
              <ImageWithFallback
                src={commentary.poster_url}
                alt={commentary.title}
                className="w-full rounded-lg shadow-lg mb-4"
              />
            )}

            {/* Meta Info */}
            <div className="bg-card rounded-lg border border-border p-4 space-y-3">
              {commentary.director && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.director}</span>
                </div>
              )}

              {commentary.year && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.year}</span>
                </div>
              )}

              {commentary.runtime && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.runtime} minutes</span>
                </div>
              )}

              {commentary.type === 'tv' && commentary.seasons && (
                <div className="flex items-center gap-2 text-sm">
                  <Film className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.seasons} {commentary.seasons === 1 ? 'season' : 'seasons'}, {commentary.episodes} episodes</span>
                </div>
              )}

              {commentary.broadcaster && (
                <div className="flex items-center gap-2 text-sm">
                  <Monitor className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.broadcaster}</span>
                </div>
              )}

              {commentary.genre && (
                <div className="flex items-center gap-2 text-sm">
                  <Film className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.genre}</span>
                </div>
              )}

              {commentary.viewing_medium && (
                <div className="flex items-center gap-2 text-sm">
                  <Monitor className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">
                    {commentary.viewing_medium}
                    {commentary.streaming_service && ` (${commentary.streaming_service})`}
                  </span>
                </div>
              )}

              {commentary.imdb_url && (
                <div className="flex items-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={commentary.imdb_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View on IMDb
                  </a>
                </div>
              )}
            </div>

            {/* Tags */}
            {commentary.tags && commentary.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {commentary.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          {/* Title and Rating */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl text-foreground mb-2">{commentary.title}</h1>
            {commentary.rating && (
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={commentary.rating} size={20} />
                <span className="text-2xl text-foreground font-semibold">{commentary.rating}</span>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Published {new Date(commentary.published_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Synopsis */}
          {commentary.synopsis && (
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl text-foreground mb-3">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed">{commentary.synopsis}</p>
            </div>
          )}

          {/* Cast */}
          {commentary.cast_members && (
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl text-foreground mb-3">Cast</h2>
              <p className="text-muted-foreground">{commentary.cast_members}</p>
            </div>
          )}

          {/* Review */}
          {commentary.review && (
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl text-foreground mb-4">My Review</h2>
              <div className="prose prose-invert max-w-none">
                {commentary.review.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Standout Moments */}
          {commentary.standout_moments && (
            <div className="bg-gradient-to-br from-secondary to-accent rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl text-foreground mb-3">Standout Moments</h2>
              <p className="text-foreground leading-relaxed">{commentary.standout_moments}</p>
            </div>
          )}

          {/* Rewatch Value */}
          {commentary.rewatch && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl text-foreground mb-3">Would I Rewatch?</h2>
              <p className="text-foreground leading-relaxed">{commentary.rewatch}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderWrestling = () => (
    <>
      {/* Backdrop Header */}
      {commentary.backdrop_url && (
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <ImageWithFallback
            src={commentary.backdrop_url}
            alt={commentary.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      )}

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <div className="sticky top-8">
            {commentary.poster_url && (
              <ImageWithFallback
                src={commentary.poster_url}
                alt={commentary.title}
                className="w-full rounded-lg shadow-lg mb-4"
              />
            )}

            {/* Meta Info */}
            <div className="bg-card rounded-lg border border-border p-4 space-y-3">
              {commentary.promotion && (
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.promotion}</span>
                </div>
              )}

              {commentary.year && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.year}</span>
                </div>
              )}

              {commentary.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.location}</span>
                </div>
              )}

              {commentary.runtime && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.runtime} minutes</span>
                </div>
              )}

              {commentary.episodes && (
                <div className="flex items-center gap-2 text-sm">
                  <Film className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{commentary.episodes} {commentary.episodes === 1 ? 'match' : 'matches'}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {commentary.tags && commentary.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {commentary.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl text-foreground mb-2">{commentary.title}</h1>
            <p className="text-sm text-muted-foreground">
              Published {new Date(commentary.published_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Main Event */}
          {commentary.main_event && (
            <div className="bg-gradient-to-br from-secondary to-accent rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl text-foreground mb-3">Main Event</h2>
              <p className="text-foreground text-lg">{commentary.main_event}</p>
            </div>
          )}

          {/* Featured Matches */}
          {commentary.featured_matches && (
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl text-foreground mb-3">Featured Matches</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{commentary.featured_matches}</p>
            </div>
          )}

          {/* Introduction */}
          {commentary.introduction && (
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <div className="prose prose-invert max-w-none">
                {commentary.introduction.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Matches */}
          {commentary.matches && commentary.matches.length > 0 && (
            <div className="space-y-6 mb-6">
              {commentary.matches.map((match: any, index: number) => (
                <div key={index} className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl text-foreground mb-1">{match.title}</h3>
                      {match.stipulation && (
                        <p className="text-sm text-muted-foreground">{match.stipulation}</p>
                      )}
                    </div>
                    {match.rating && (
                      <div className="flex items-center gap-2">
                        <StarRating rating={match.rating} size={16} />
                        <span className="text-foreground font-semibold">{match.rating}</span>
                      </div>
                    )}
                  </div>
                  <div className="prose prose-invert max-w-none">
                    {match.commentary.split('\n\n').map((paragraph: string, pIndex: number) => (
                      <p key={pIndex} className="text-foreground leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Conclusion */}
          {commentary.conclusion && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl text-foreground mb-4">Final Thoughts</h2>
              <div className="prose prose-invert max-w-none">
                {commentary.conclusion.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderEssay = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header Image */}
      {commentary.poster_url && (
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <ImageWithFallback
            src={commentary.poster_url}
            alt={commentary.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl text-foreground mb-4">{commentary.title}</h1>
        {commentary.subtitle && (
          <p className="text-xl text-muted-foreground mb-4">{commentary.subtitle}</p>
        )}
        <p className="text-sm text-muted-foreground">
          Published {new Date(commentary.published_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Essay Body */}
      {commentary.essay_body && (
        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="prose prose-lg prose-invert max-w-none">
            {commentary.essay_body.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index} className="text-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Citations */}
      {commentary.citations && (
        <div className="bg-accent/30 rounded-lg border border-border p-6 mb-8">
          <h2 className="text-lg text-foreground mb-4">Citations</h2>
          <div className="text-sm text-muted-foreground whitespace-pre-line">
            {commentary.citations}
          </div>
        </div>
      )}

      {/* Tags */}
      {commentary.tags && commentary.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {commentary.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const renderList = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header Image */}
      {commentary.poster_url && (
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <ImageWithFallback
            src={commentary.poster_url}
            alt={commentary.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl text-foreground mb-4">{commentary.title}</h1>
        <p className="text-sm text-muted-foreground">
          Published {new Date(commentary.published_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Introduction */}
      {commentary.list_intro && (
        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="prose prose-lg prose-invert max-w-none">
            {commentary.list_intro.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index} className="text-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* List Entries */}
      {commentary.list_entries && commentary.list_entries.length > 0 && (
        <div className="space-y-8 mb-8">
          {commentary.list_entries.map((entry: any, index: number) => (
            <div key={index} className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl text-foreground mb-4">{entry.title}</h2>
                    {entry.image_url && (
                      <div className="mb-4">
                        <ImageWithFallback
                          src={entry.image_url}
                          alt={entry.title}
                          className="w-full rounded-lg"
                        />
                      </div>
                    )}
                    <div className="prose prose-invert max-w-none">
                      {entry.content.split('\n\n').map((paragraph: string, pIndex: number) => (
                        <p key={pIndex} className="text-foreground leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Conclusion */}
      {commentary.list_conclusion && (
        <div className="bg-gradient-to-br from-secondary to-accent rounded-lg border border-border p-8 mb-8">
          <div className="prose prose-lg prose-invert max-w-none">
            {commentary.list_conclusion.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index} className="text-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {commentary.tags && commentary.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {commentary.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/reviews')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Commentary</span>
      </button>

      {commentary.type === 'movie' && renderMovieOrTV()}
      {commentary.type === 'tv' && renderMovieOrTV()}
      {commentary.type === 'wrestling' && renderWrestling()}
      {commentary.type === 'essay' && renderEssay()}
      {commentary.type === 'list' && renderList()}
    </div>
  );
}
