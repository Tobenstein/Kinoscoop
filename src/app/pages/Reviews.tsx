import { useState, useEffect } from 'react';
import { Film, Search, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { StarRating } from '../components/StarRating';
import { supabase } from '../../lib/supabase';

interface Commentary {
  id: number;
  type: string;
  title: string;
  director?: string;
  promotion?: string;
  year?: number;
  poster_url?: string;
  rating?: number;
  published_date: string;
  runtime?: number;
  genre?: string;
  review?: string;
  introduction?: string;
  essay_body?: string;
  list_intro?: string;
  is_featured: boolean;
}

export function Reviews() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);
  const [featuredCommentaries, setFeaturedCommentaries] = useState<Commentary[]>([]);
  const [allCommentaries, setAllCommentaries] = useState<Commentary[]>([]);

  // Fetch commentaries from Supabase
  useEffect(() => {
    const fetchCommentaries = async () => {
      try {
        const { data, error } = await supabase
          .from('commentary')
          .select('*')
          .order('published_date', { ascending: false });

        if (!error && data) {
          setAllCommentaries(data);
          setFeaturedCommentaries(data.filter((c: Commentary) => c.is_featured).slice(0, 4));
        }
      } catch (error) {
        console.log('Using dummy data');
      } finally {
        setLoading(false);
      }
    };

    fetchCommentaries();
  }, []);

  const [movies, setMovies] = useState<any[]>([
    // Dummy data as fallback
    { id: 1, title: "The Dark Knight", director: "Christopher Nolan", year: 2008, posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 4.75, dateWatched: "2026-04-08", runtime: 152, genre: "Action", reviewSnippet: "A masterpiece that transcends the superhero genre...", type: "movie" },
    { id: 2, title: "Parasite", director: "Bong Joon-ho", year: 2019, posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", rating: 5, dateWatched: "2026-04-05", runtime: 132, genre: "Thriller", reviewSnippet: "Brilliant social commentary wrapped in suspenseful storytelling..." },
    { id: 3, title: "Interstellar", director: "Christopher Nolan", year: 2014, posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", rating: 4.5, dateWatched: "2026-04-01", runtime: 169, genre: "Sci-Fi", reviewSnippet: "An epic journey through space and time with stunning visuals..." },

    // March 2026
    { id: 4, title: "The Godfather", director: "Francis Ford Coppola", year: 1972, posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", rating: 5, dateWatched: "2026-03-28", runtime: 175, genre: "Crime", reviewSnippet: "The definitive crime saga. Perfection in every frame..." },
    { id: 5, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", rating: 4.75, dateWatched: "2026-03-25", runtime: 154, genre: "Crime", reviewSnippet: "Tarantino's non-linear masterpiece with unforgettable dialogue..." },
    { id: 6, title: "The Matrix", director: "Lana Wachowski, Lilly Wachowski", year: 1999, posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", rating: 4.75, dateWatched: "2026-03-20", runtime: 136, genre: "Sci-Fi", reviewSnippet: "Revolutionary action and groundbreaking visual effects..." },
    { id: 7, title: "Goodfellas", director: "Martin Scorsese", year: 1990, posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg", rating: 4.5, dateWatched: "2026-03-15", runtime: 145, genre: "Crime", reviewSnippet: "Scorsese's kinetic masterpiece about mob life..." },
    { id: 8, title: "Fight Club", director: "David Fincher", year: 1999, posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", rating: 4.25, dateWatched: "2026-03-10", runtime: 139, genre: "Drama", reviewSnippet: "Dark, twisted, and unforgettable. A cultural phenomenon..." },
    { id: 9, title: "Inception", director: "Christopher Nolan", year: 2010, posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", rating: 4.75, dateWatched: "2026-03-05", runtime: 148, genre: "Sci-Fi", reviewSnippet: "Mind-bending heist film with layers upon layers..." },
    { id: 10, title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994, posterUrl: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg", rating: 5, dateWatched: "2026-03-01", runtime: 142, genre: "Drama", reviewSnippet: "A timeless tale of hope and friendship that never ages..." },

    // February 2026
    { id: 104, title: "Oppenheimer", director: "Christopher Nolan", year: 2023, posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", rating: 5.0, dateWatched: "2026-02-12", runtime: 180, genre: "Drama", reviewSnippet: "Nolan's most ambitious and mature work to date..." },
    { id: 105, title: "The Departed", director: "Martin Scorsese", year: 2006, posterUrl: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg", rating: 4.75, dateWatched: "2026-02-08", runtime: 151, genre: "Crime", reviewSnippet: "A masterclass in tension and paranoia..." },

    // January 2026
    { id: 11, title: "12 Angry Men", director: "Sidney Lumet", year: 1957, posterUrl: "https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg", rating: 5, dateWatched: "2026-01-20", runtime: 96, genre: "Drama", reviewSnippet: "Brilliant courtroom drama showcasing the power of dialogue..." },
    { id: 12, title: "Schindler's List", director: "Steven Spielberg", year: 1993, posterUrl: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", rating: 5, dateWatched: "2026-01-10", runtime: 195, genre: "Drama", reviewSnippet: "Spielberg's most powerful and haunting film..." },

    // December 2025
    { id: 13, title: "The Lord of the Rings: The Return of the King", director: "Peter Jackson", year: 2003, posterUrl: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", rating: 5, dateWatched: "2025-12-25", runtime: 201, genre: "Fantasy", reviewSnippet: "Epic conclusion to the greatest fantasy trilogy..." },
    { id: 14, title: "Forrest Gump", director: "Robert Zemeckis", year: 1994, posterUrl: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", rating: 4.5, dateWatched: "2025-12-15", runtime: 142, genre: "Drama", reviewSnippet: "Heartwarming journey through American history..." },

    // November 2025
    { id: 15, title: "The Silence of the Lambs", director: "Jonathan Demme", year: 1991, posterUrl: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg", rating: 4.75, dateWatched: "2025-11-22", runtime: 118, genre: "Thriller", reviewSnippet: "Chilling psychological thriller with iconic performances..." },
    { id: 16, title: "Saving Private Ryan", director: "Steven Spielberg", year: 1998, posterUrl: "https://image.tmdb.org/t/p/w500/uqx37c8iPBdGqr48W8z2kpwTT1F.jpg", rating: 4.75, dateWatched: "2025-11-10", runtime: 169, genre: "Drama", reviewSnippet: "Unflinching portrayal of war with stunning realism..." },

    // October 2025
    { id: 17, title: "Se7en", director: "David Fincher", year: 1995, posterUrl: "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg", rating: 4.5, dateWatched: "2025-10-28", runtime: 127, genre: "Thriller", reviewSnippet: "Dark, disturbing thriller with an unforgettable ending..." },
    { id: 18, title: "The Prestige", director: "Christopher Nolan", year: 2006, posterUrl: "https://image.tmdb.org/t/p/w500/5MXyQfz8xUP3dIFPTubhTsbFY6N.jpg", rating: 4.5, dateWatched: "2025-10-15", runtime: 130, genre: "Thriller", reviewSnippet: "Intricate tale of rival magicians with shocking twists..." },

    // September 2025
    { id: 19, title: "The Green Mile", director: "Frank Darabont", year: 1999, posterUrl: "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg", rating: 4.75, dateWatched: "2025-09-20", runtime: 189, genre: "Drama", reviewSnippet: "Emotionally powerful prison drama about miracles..." },
    { id: 20, title: "Gladiator", director: "Ridley Scott", year: 2000, posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", rating: 4.5, dateWatched: "2025-09-05", runtime: 155, genre: "Action", reviewSnippet: "Epic historical drama with breathtaking action..." },

    // August 2025
    { id: 21, title: "The Usual Suspects", director: "Bryan Singer", year: 1995, posterUrl: "https://image.tmdb.org/t/p/w500/51xD13W6PKI9Q6B8R96aHN9UGYM.jpg", rating: 4.75, dateWatched: "2025-08-25", runtime: 106, genre: "Crime", reviewSnippet: "Masterfully crafted crime thriller with legendary twist..." },
    { id: 22, title: "Whiplash", director: "Damien Chazelle", year: 2014, posterUrl: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg", rating: 4.5, dateWatched: "2025-08-12", runtime: 107, genre: "Drama", reviewSnippet: "Intense drama about the pursuit of perfection..." },

    // July 2025
    { id: 23, title: "The Lion King", director: "Roger Allers, Rob Minkoff", year: 1994, posterUrl: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg", rating: 4.75, dateWatched: "2025-07-20", runtime: 88, genre: "Animation", reviewSnippet: "Timeless animated classic with unforgettable music..." },
    { id: 24, title: "City of God", director: "Fernando Meirelles", year: 2002, posterUrl: "https://image.tmdb.org/t/p/w500/k7eYdGvlGA5VtAHMZEKvK7DqzKO.jpg", rating: 4.75, dateWatched: "2025-07-08", runtime: 130, genre: "Crime", reviewSnippet: "Raw, visceral portrait of life in Rio's favelas..." },

    // June 2025
    { id: 25, title: "Life Is Beautiful", director: "Roberto Benigni", year: 1997, posterUrl: "https://image.tmdb.org/t/p/w500/74hLDKjD5aGYOotO6esUVaeISa2.jpg", rating: 4.5, dateWatched: "2025-06-22", runtime: 116, genre: "Drama", reviewSnippet: "Beautiful and heartbreaking tale of love and hope..." },
    { id: 26, title: "The Departed", director: "Martin Scorsese", year: 2006, posterUrl: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg", rating: 4.75, dateWatched: "2025-06-10", runtime: 151, genre: "Crime", reviewSnippet: "Scorsese's cat-and-mouse thriller at its finest..." },

    // Continuing back to January 2023 with a selection
    { id: 27, title: "Back to the Future", director: "Robert Zemeckis", year: 1985, posterUrl: "https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg", rating: 4.75, dateWatched: "2025-05-15", runtime: 116, genre: "Sci-Fi", reviewSnippet: "Perfect time-travel adventure with heart..." },
    { id: 28, title: "Spirited Away", director: "Hayao Miyazaki", year: 2001, posterUrl: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", rating: 5, dateWatched: "2025-04-20", runtime: 125, genre: "Animation", reviewSnippet: "Miyazaki's masterpiece of imagination..." },
    { id: 29, title: "Casablanca", director: "Michael Curtiz", year: 1942, posterUrl: "https://image.tmdb.org/t/p/w500/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg", rating: 4.5, dateWatched: "2025-03-12", runtime: 102, genre: "Drama", reviewSnippet: "Timeless romance set against wartime backdrop..." },
    { id: 30, title: "Raiders of the Lost Ark", director: "Steven Spielberg", year: 1981, posterUrl: "https://image.tmdb.org/t/p/w500/ceG9VzoRAVGwivFU403Wc3AHRys.jpg", rating: 4.75, dateWatched: "2025-02-18", runtime: 115, genre: "Action", reviewSnippet: "Perfect adventure film that defined a genre..." },
    { id: 31, title: "Psycho", director: "Alfred Hitchcock", year: 1960, posterUrl: "https://image.tmdb.org/t/p/w500/yz4QVqPx3h1hD1DfqqQkCq3rmxW.jpg", rating: 4.5, dateWatched: "2025-01-25", runtime: 109, genre: "Thriller", reviewSnippet: "Hitchcock's masterpiece of suspense..." },
    { id: 32, title: "The Pianist", director: "Roman Polanski", year: 2002, posterUrl: "https://image.tmdb.org/t/p/w500/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg", rating: 4.75, dateWatched: "2024-12-20", runtime: 150, genre: "Drama", reviewSnippet: "Haunting story of survival during the Holocaust..." },
    { id: 33, title: "Alien", director: "Ridley Scott", year: 1979, posterUrl: "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg", rating: 4.5, dateWatched: "2024-11-15", runtime: 117, genre: "Sci-Fi", reviewSnippet: "Perfect blend of sci-fi and horror..." },
    { id: 34, title: "Apocalypse Now", director: "Francis Ford Coppola", year: 1979, posterUrl: "https://image.tmdb.org/t/p/w500/gQB8Y5RCMkv2zwzFHbUJX3kAhvA.jpg", rating: 5, dateWatched: "2024-10-10", runtime: 147, genre: "Drama", reviewSnippet: "Surreal descent into the madness of war..." },
    { id: 35, title: "Sunset Boulevard", director: "Billy Wilder", year: 1950, posterUrl: "https://image.tmdb.org/t/p/w500/zt8aQ6ksqK0Fnd9T9o0ieMu7c7I.jpg", rating: 4.75, dateWatched: "2024-09-05", runtime: 110, genre: "Drama", reviewSnippet: "Dark Hollywood tale of fame and obsession..." },
    { id: 36, title: "Dr. Strangelove", director: "Stanley Kubrick", year: 1964, posterUrl: "https://image.tmdb.org/t/p/w500/7SixLzxcqezkZEYU8pcHZgbkmjp.jpg", rating: 4.5, dateWatched: "2024-08-12", runtime: 95, genre: "Comedy", reviewSnippet: "Kubrick's satirical masterpiece about nuclear war..." },
    { id: 37, title: "Cinema Paradiso", director: "Giuseppe Tornatore", year: 1988, posterUrl: "https://image.tmdb.org/t/p/w500/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg", rating: 4.75, dateWatched: "2024-07-20", runtime: 155, genre: "Drama", reviewSnippet: "Love letter to cinema and childhood memories..." },
    { id: 38, title: "Paths of Glory", director: "Stanley Kubrick", year: 1957, posterUrl: "https://image.tmdb.org/t/p/w500/eBH853PZ6vy3vJaLeRCh1ViDp60.jpg", rating: 4.5, dateWatched: "2024-06-18", runtime: 88, genre: "Drama", reviewSnippet: "Kubrick's powerful anti-war statement..." },
    { id: 39, title: "The Shining", director: "Stanley Kubrick", year: 1980, posterUrl: "https://image.tmdb.org/t/p/w500/b6ko0IKC8MdYBBPkkA1aBPLe2yz.jpg", rating: 4.75, dateWatched: "2024-05-22", runtime: 146, genre: "Horror", reviewSnippet: "Terrifying descent into madness..." },
    { id: 40, title: "The Great Dictator", director: "Charlie Chaplin", year: 1940, posterUrl: "https://image.tmdb.org/t/p/w500/1QpO9wo7JWecZ4NiBuu625FiY1j.jpg", rating: 4.5, dateWatched: "2024-04-15", runtime: 125, genre: "Comedy", reviewSnippet: "Chaplin's brilliant satire of fascism..." },
    { id: 41, title: "Witness for the Prosecution", director: "Billy Wilder", year: 1957, posterUrl: "https://image.tmdb.org/t/p/w500/3W43J1JqPKxfwTyVzbPT17L9hGt.jpg", rating: 4.5, dateWatched: "2024-03-10", runtime: 116, genre: "Drama", reviewSnippet: "Masterful courtroom drama with shocking twists..." },
    { id: 42, title: "Grave of the Fireflies", director: "Isao Takahata", year: 1988, posterUrl: "https://image.tmdb.org/t/p/w500/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg", rating: 5, dateWatched: "2024-02-14", runtime: 89, genre: "Animation", reviewSnippet: "Devastating anti-war masterpiece..." },
    { id: 43, title: "Rear Window", director: "Alfred Hitchcock", year: 1954, posterUrl: "https://image.tmdb.org/t/p/w500/ILVF0eJxHMddjxeQhswFtpMtqx.jpg", rating: 4.75, dateWatched: "2024-01-20", runtime: 112, genre: "Thriller", reviewSnippet: "Hitchcock at his voyeuristic best..." },
    { id: 44, title: "Vertigo", director: "Alfred Hitchcock", year: 1958, posterUrl: "https://image.tmdb.org/t/p/w500/15uOEfGBLv9ETdDjwYlNxU9iGr7.jpg", rating: 4.5, dateWatched: "2023-12-15", runtime: 128, genre: "Thriller", reviewSnippet: "Haunting tale of obsession and mystery..." },
    { id: 45, title: "M", director: "Fritz Lang", year: 1931, posterUrl: "https://image.tmdb.org/t/p/w500/8zsNAxZLXLqX27mkZfGF9JGWsXd.jpg", rating: 4.5, dateWatched: "2023-11-10", runtime: 117, genre: "Thriller", reviewSnippet: "Groundbreaking early sound thriller..." },
    { id: 46, title: "The Apartment", director: "Billy Wilder", year: 1960, posterUrl: "https://image.tmdb.org/t/p/w500/eLKGfkGUQHFYRIJkVGEd2aJLGul.jpg", rating: 4.75, dateWatched: "2023-10-22", runtime: 125, genre: "Comedy", reviewSnippet: "Witty romantic comedy with depth..." },
    { id: 47, title: "North by Northwest", director: "Alfred Hitchcock", year: 1959, posterUrl: "https://image.tmdb.org/t/p/w500/sGO5x3gN2TlChEjQJp0j03wmpHa.jpg", rating: 4.5, dateWatched: "2023-09-18", runtime: 136, genre: "Thriller", reviewSnippet: "Thrilling Hitchcock adventure with iconic scenes..." },
    { id: 48, title: "Double Indemnity", director: "Billy Wilder", year: 1944, posterUrl: "https://image.tmdb.org/t/p/w500/pDnRJGpUOLLO80TGbPLU4qF9EF.jpg", rating: 4.5, dateWatched: "2023-08-15", runtime: 107, genre: "Thriller", reviewSnippet: "Classic film noir with perfect plotting..." },
    { id: 49, title: "To Kill a Mockingbird", director: "Robert Mulligan", year: 1962, posterUrl: "https://image.tmdb.org/t/p/w500/gZycFUMLx2110dzK3nVmjvqXBNc.jpg", rating: 4.75, dateWatched: "2023-07-10", runtime: 129, genre: "Drama", reviewSnippet: "Powerful drama about justice and morality..." },
    { id: 50, title: "Bicycle Thieves", director: "Vittorio De Sica", year: 1948, posterUrl: "https://image.tmdb.org/t/p/w500/nWI2JSwAHbcGKhvt4hbk5MZXuSo.jpg", rating: 4.5, dateWatched: "2023-06-08", runtime: 89, genre: "Drama", reviewSnippet: "Neorealist masterpiece of desperation..." },
    { id: 51, title: "Singin' in the Rain", director: "Stanley Donen, Gene Kelly", year: 1952, posterUrl: "https://image.tmdb.org/t/p/w500/w03EiJVHP8Un77DTtPQ8x9m8w1r.jpg", rating: 4.75, dateWatched: "2023-05-20", runtime: 103, genre: "Musical", reviewSnippet: "Joyful musical masterpiece..." },
    { id: 52, title: "Some Like It Hot", director: "Billy Wilder", year: 1959, posterUrl: "https://image.tmdb.org/t/p/w500/hVFK1n9jYTfHhOz4NNWiH8M6vDl.jpg", rating: 4.5, dateWatched: "2023-04-12", runtime: 121, genre: "Comedy", reviewSnippet: "Hilarious comedy with perfect timing..." },
    { id: 53, title: "Rashomon", director: "Akira Kurosawa", year: 1950, posterUrl: "https://image.tmdb.org/t/p/w500/vL7Xw04nFMHwnvXRFCmYYAzMUvY.jpg", rating: 4.75, dateWatched: "2023-03-18", runtime: 88, genre: "Drama", reviewSnippet: "Groundbreaking narrative structure..." },
    { id: 54, title: "The Third Man", director: "Carol Reed", year: 1949, posterUrl: "https://image.tmdb.org/t/p/w500/mYvJPPAVAoJx8UaWAM9YJ6bKZio.jpg", rating: 4.5, dateWatched: "2023-02-25", runtime: 104, genre: "Thriller", reviewSnippet: "Atmospheric post-war noir..." },
    { id: 55, title: "On the Waterfront", director: "Elia Kazan", year: 1954, posterUrl: "https://image.tmdb.org/t/p/w500/o3nFddh0oURcKOgVjIWtLLUj3Bz.jpg", rating: 4.5, dateWatched: "2023-01-15", runtime: 108, genre: "Drama", reviewSnippet: "Brando's iconic performance about corruption..." },
  ]);

  const genres = ['all', 'Action', 'Crime', 'Drama', 'Sci-Fi', 'Thriller', 'Animation', 'Comedy', 'Fantasy', 'Horror', 'Musical'];
  const commentaryTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'movie', label: 'Movie' },
    { value: 'tv', label: 'TV Show' },
    { value: 'wrestling', label: 'Wrestling' },
    { value: 'essay', label: 'Essay' },
    { value: 'list', label: 'Article' }
  ];

  // Use commentary data if available, otherwise fallback to movies
  const displayData = allCommentaries.length > 0 ? allCommentaries : movies;

  const filteredCommentaries = displayData
    .filter((item: any) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.director && item.director.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.promotion && item.promotion.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGenre = filterGenre === 'all' || item.genre === filterGenre;
      const matchesType = filterType === 'all' || item.type === filterType;

      return matchesSearch && matchesGenre && matchesType;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case 'date':
          const dateA = a.published_date || a.dateWatched;
          const dateB = b.published_date || b.dateWatched;
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Film className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Film className="w-8 h-8 text-primary" />
          <h1 className="text-3xl text-foreground">Commentary</h1>
        </div>
        <p className="text-muted-foreground">
          Film reviews, TV analysis, wrestling commentary, essays, and articles
        </p>
      </div>

      {/* Featured Commentary */}
      {featuredCommentaries.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl text-foreground mb-4">Featured Commentary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCommentaries.map((commentary) => (
              <div
                key={commentary.id}
                onClick={() => navigate(`/commentary/${commentary.id}`)}
                className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative overflow-hidden aspect-[2/3]">
                  <ImageWithFallback
                    src={commentary.poster_url || "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"}
                    alt={commentary.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    {commentary.rating && (
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={commentary.rating} size={14} />
                      </div>
                    )}
                    <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs inline-block">
                      {commentaryTypes.find(t => t.value === commentary.type)?.label || commentary.type}
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-sm text-foreground mb-1 line-clamp-1">{commentary.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {commentary.type === 'movie' || commentary.type === 'tv'
                      ? `directed by ${commentary.director}`
                      : commentary.type === 'wrestling'
                      ? commentary.promotion
                      : 'Essay'}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {new Date(commentary.published_date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search commentary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {commentaryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Genre Filter */}
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          Showing {filteredCommentaries.length} {filteredCommentaries.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {/* Commentary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCommentaries.map((item: any) => (
          <div
            key={item.id}
            onClick={() => navigate(`/commentary/${item.id}`)}
            className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="relative overflow-hidden aspect-[2/3]">
              <ImageWithFallback
                src={item.poster_url || item.posterUrl || "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                {item.rating && (
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={item.rating} size={14} />
                  </div>
                )}
                {item.type && (
                  <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs inline-block">
                    {commentaryTypes.find(t => t.value === item.type)?.label || item.type}
                  </div>
                )}
              </div>
            </div>

            <div className="p-3">
              <h3 className="text-sm text-foreground mb-1 line-clamp-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {item.type === 'movie' || item.type === 'tv'
                  ? `directed by ${item.director}`
                  : item.type === 'wrestling'
                  ? item.promotion
                  : item.type === 'essay'
                  ? 'Essay'
                  : 'Article'}
              </p>

              {(item.year || item.runtime) && (
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  {item.year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.year}</span>
                    </div>
                  )}
                  {item.runtime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.runtime} min</span>
                    </div>
                  )}
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                {new Date(item.published_date || item.dateWatched).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCommentaries.length === 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-12 text-center">
          <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-foreground mb-2">No commentary found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
