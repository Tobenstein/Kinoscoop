import { Film, Heart, Star, Mail, Globe, Instagram, Youtube, ChevronDown, User } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { StarRating } from '../components/StarRating';
import { useState } from 'react';

export function About() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Recent Favourites - last 3 favorite movies
  const recentFavourites = [
    {
      title: "Oppenheimer",
      posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      rating: 5.0,
      year: 2023
    },
    {
      title: "Parasite",
      posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      rating: 5.0,
      year: 2019
    },
    {
      title: "The Dark Knight",
      posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: 4.75,
      year: 2008
    }
  ];

  // 10 for All Time - top 10 favorite movies
  const tenForAllTime = [
    {
      title: "The Shawshank Redemption",
      posterUrl: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      rating: 5.0,
      year: 1994
    },
    {
      title: "The Godfather",
      posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      rating: 5.0,
      year: 1972
    },
    {
      title: "Pulp Fiction",
      posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      rating: 5.0,
      year: 1994
    },
    {
      title: "Inception",
      posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      rating: 4.75,
      year: 2010
    },
    {
      title: "Goodfellas",
      posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
      rating: 4.75,
      year: 1990
    },
    {
      title: "Se7en",
      posterUrl: "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
      rating: 4.75,
      year: 1995
    },
    {
      title: "The Silence of the Lambs",
      posterUrl: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
      rating: 4.75,
      year: 1991
    },
    {
      title: "Fight Club",
      posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      rating: 4.5,
      year: 1999
    },
    {
      title: "Forrest Gump",
      posterUrl: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      rating: 4.5,
      year: 1994
    },
    {
      title: "Interstellar",
      posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: 4.5,
      year: 2014
    }
  ];

  const faqs = [
    {
      question: "How do you choose which movies to watch?",
      answer: "I spend a lot of time reading about cinema, falling down rabbit holes and making lists. Sometimes it's a matter of wanting to see what all the fuss is about, sometimes it's finally getting around to pulling the trigger, other times it's just random impulse. I would like to review more current releases, but since this isn't a full time job, I don't feel obligated."
    },
    {
      question: "What's your rating system?",
      answer: (
        <>
          <p className="mb-3">My approach to ratings is two-fold, with both branches being heavily shaped by Roger Ebert's methodology. Where Ebert rated a film on a scale of one to four stars, I go to five because I want to be able to state clearly that a movie is mid. I feel that the five star system helps with this, while also being an allusion to Dave Meltzer's 5-star rating system.</p>
          <p className="mb-3">The stars are intuitive; 5 stars is a masterpiece that deserves a place in whatever Hall of Fame. 4 is strongly recommended, with a few shortcomings. 3 is just average with little to say for itself. 2 is poor with few redeeming qualities. 1 is bad to the point of having no redeeming qualities. 0 is terrible to the point of being a stain on the rich tapestry of the human condition.</p>
          <p className="mb-3">0 stars is different from no rating. There are some films I just don't feel comfortable putting on a scale for whatever reason. For example, while Schindler's List is a tour de force as a piece of art, I don't feel comfortable ascribing a numerical value to most things related to the holocaust.</p>
          <p className="mb-3">Additionally, ratings are relative and contextual, not absolute. As Ebert put it,</p>
          <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
            <p>When you ask a friend if <em>Hellboy</em> is any good, you're not asking if it's any good compared to <em>Mystic River</em>, you're asking if it's any good compared to <em>The Punisher</em>. And my answer would be, on a scale of one to four, if <em>Superman</em> is four, then <em>Hellboy</em> is three and <em>The Punisher</em> is two. In the same way, if <em>American Beauty</em> gets four stars, then <em>The United States of Leland</em> clocks in at about two.</p>
          </blockquote>
          <p className="text-right text-sm mb-3">—Roger Ebert, "Shaolin Soccer", 2004.</p>
          <p>I would rate those movies differently, but I follow the same logic because it's sound. There's no need to reinvent the wheel.</p>
        </>
      )
    },
    {
      question: "Do you accept screeners or promotional materials?",
      answer: "Short answer: yes, but if you ask for my opinion, I will give you my opinion. Constructive criticism is a critical part of the artistic process, and genuine reaction is part of the greater cycle of art."
    },
    {
      question: "Can I suggest a movie for you to watch?",
      answer: "Would you!? I am always looking for new suggestions and ideas. Message me on my socials or the contact page."
    },
    {
      question: "How long have you been watching and reviewing movies?",
      answer: "Some of my earliest and best memories involve standing in like at theatres, wearing out VHS tapes, and dumping on B-movies with friends and family. I've tried writing a few blogs/reviews before, but establishing this site and my socials is my first real effort."
    },
    {
      question: "How are you qualified to be a critic?",
      answer: "I'm not, but if you are capable of expressing an opinion – what you liked or didn't like and why – I think you're qualified to be a critic."
    }
  ];

  const watchingPhilosophy = [
    {
      icon: Heart,
      title: "Passion First",
      description: "I do this because I genuinely love cinema, not for the sake of adding to the endless river of content. The reviews are a natural extension of passion and desire for change within both the film industry, and movie culture."
    },
    {
      icon: Star,
      title: "Critical but Fair",
      description: "I try to appreciate what film-makers are attempting to do, even if it isn't my personal taste. Context matters, as does relativity."
    },
    {
      icon: Film,
      title: "Diversity Matters",
      description: "I make a concerted effort to watch films from different eras, countries, and genres to force myself out of my little bubble. Familiarity breeds contempt."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl text-foreground mb-4">About Kinoscoop</h1>
        <p className="text-xl text-muted-foreground">
          A personal journey through the world of cinema
        </p>
      </div>

      {/* About Me Section */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden mb-12">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="flex items-center justify-center">
            <ImageWithFallback
              src="/profile.jpg"
              alt="Profile"
              className="w-64 h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-2xl text-foreground mb-4">Where to start…</h2>
            <div className="space-y-4 text-foreground">
              <p>
                My mother worked in a locally owned video rental store in the 90s. I would sit with her and stare at the stacks of black shells housing VHS tapes, knowing that I was looking at a wall of worlds. In 2012 I inherited a library of films when her old colleague fled the country and left me the works. I went from a small collection of B-movies to having that wall of worlds all to myself.
              </p>
              <p>
                While I have always been a bit of a cinephile, it wasn't until 2020 that I began to take things seriously. I used the first lockdown to digitise my collection, converting it from a literal closet full of dvd-packed binders to a nice, clean streaming platform. It was a massive step up from the excel sheet and endless piles of discs.
              </p>
              <p>
                Cinephiles can be pretentious dolts – I would know. I have been one. The purpose of this platform is to share my love of the whole cinematic experience with a much lighter touch than I have done during my douchier days. It is also to combat the narrow scope that streaming provides as services like Amazon and Netflix move away from being a platform for entertainment and into content factories primarily designed to market their own brand of soylent green. All in all, I'm just trying to share some of the things I love and offer some food for thought.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Get In Touch Section */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-8 text-center mb-12">
        <h2 className="text-2xl text-foreground mb-4">Get In Touch</h2>
        <p className="text-muted-foreground mb-6">
          Have a movie recommendation or just want to chat about cinema? I'd love to hear from you!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="mailto:contact@kinoscoop.com"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email Me</span>
          </a>
          <a
            href="https://instagram.com/kinoscoop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-secondary transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </a>
          <a
            href="https://letterboxd.com/kinoscoop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-secondary transition-colors"
          >
            <Film className="w-4 h-4" />
            <span>Letterboxd</span>
          </a>
          <a
            href="https://robperry.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-secondary transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Portfolio</span>
          </a>
        </div>
      </div>

      {/* Watching Philosophy */}
      <div className="mb-12">
        <h2 className="text-2xl text-foreground mb-6">My Watching Philosophy</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {watchingPhilosophy.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl shadow-sm border border-border p-6"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics Highlight */}
      <div className="bg-gradient-to-br from-secondary to-accent rounded-xl shadow-sm border border-border p-8 mb-12">
        <h2 className="text-2xl text-foreground mb-6 text-center">By The Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="text-center">
            <p className="text-4xl text-foreground font-bold mb-2">152</p>
            <p className="text-muted-foreground">Movies Watched</p>
          </div>
          <div className="text-center">
            <p className="text-4xl text-foreground font-bold mb-2">87</p>
            <p className="text-muted-foreground">Directors Explored</p>
          </div>
          <div className="text-center">
            <p className="text-4xl text-foreground font-bold mb-2">21</p>
            <p className="text-muted-foreground">Countries Represented</p>
          </div>
          <div className="text-center">
            <p className="text-4xl text-foreground font-bold mb-2">🇫🇷</p>
            <p className="text-muted-foreground">Most Watched Country</p>
          </div>
          <div className="text-center">
            <p className="text-4xl text-foreground font-bold mb-2">12d</p>
            <p className="text-muted-foreground">Total Runtime</p>
          </div>
          <div className="text-center">
            <p className="text-4xl text-foreground font-bold mb-2">4.2</p>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Recent Favourites */}
      <div className="mb-12">
        <h2 className="text-2xl text-foreground mb-6">Recent Favourites</h2>
        <div className="flex gap-6 justify-center">
          {recentFavourites.map((movie, index) => (
            <div
              key={index}
              className="group cursor-pointer flex-shrink-0"
              style={{ width: '200px' }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md mb-3 transition-transform group-hover:scale-105">
                <ImageWithFallback
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="text-foreground mb-1 line-clamp-2">{movie.title}</h3>
              <p className="text-muted-foreground mb-2 text-sm">{movie.year}</p>
              <div className="mb-1">
                <StarRating rating={movie.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10 for All Time */}
      <div className="mb-12">
        <h2 className="text-2xl text-foreground mb-6 text-center">10 for All Time</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {tenForAllTime.map((movie, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md mb-3 transition-transform group-hover:scale-105">
                <ImageWithFallback
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="text-foreground mb-1 line-clamp-2 text-sm">{movie.title}</h3>
              <p className="text-muted-foreground mb-2 text-xs">{movie.year}</p>
              <div className="mb-1">
                <StarRating rating={movie.rating} size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl text-foreground mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-accent/50 transition-colors"
              >
                <h3 className="text-foreground">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openFaqIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaqIndex === index && (
                <div className="px-6 pb-6 text-muted-foreground">
                  {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
