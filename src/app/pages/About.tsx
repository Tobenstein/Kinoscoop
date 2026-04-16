import { Film, Heart, Star, Mail, Globe, Instagram, Youtube } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
  const faqs = [
    {
      question: "How do you choose what movies to watch?",
      answer: "I try to maintain a balance between new releases, classic cinema, and deep dives into specific directors or genres. I'm always open to recommendations from the community!"
    },
    {
      question: "What's your rating system?",
      answer: "I use a 5-star scale, with half-star increments. A 5-star rating means it's a masterpiece I'll revisit many times. 4+ stars means I highly recommend it. 3+ stars means it's worth watching. Below 3 stars means it had significant issues for me personally."
    },
    {
      question: "Do you accept screeners or promotional content?",
      answer: "I keep this platform independent and watch movies through regular channels (theatres, streaming services, physical media). This ensures my reviews remain unbiased and authentic."
    },
    {
      question: "Can I suggest a movie for you to watch?",
      answer: "Absolutely! I love getting recommendations from fellow film lovers. You can reach me through social media or email."
    },
    {
      question: "How long have you been watching and reviewing movies?",
      answer: "I've been seriously tracking and reviewing movies for about 5 years now, but I've been a passionate film watcher my entire life."
    }
  ];

  const watchingPhilosophy = [
    {
      icon: Heart,
      title: "Passion First",
      description: "I watch movies because I genuinely love cinema, not for content creation. The reviews are a natural extension of that passion."
    },
    {
      icon: Star,
      title: "Critical but Fair",
      description: "I try to appreciate what a film is attempting to do, even if it's not my personal taste. Context matters."
    },
    {
      icon: Film,
      title: "Diverse Viewing",
      description: "I make a conscious effort to watch films from different eras, countries, and genres to broaden my perspective."
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
            <h2 className="text-2xl text-foreground mb-4">Hello, I'm a Cinephile</h2>
            <div className="space-y-4 text-foreground">
              <p>
                Welcome to Kinoscoop, my personal archive of cinematic experiences. Based in Dublin, Ireland, I've been on a journey through the vast landscape of film for over five years now, documenting every step along the way.
              </p>
              <p>
                What started as a simple list of movies watched has evolved into a comprehensive database of reviews, ratings, and reflections. This site is my way of preserving those experiences and sharing them with fellow film enthusiasts.
              </p>
              <p>
                I believe that every film has something to offer, whether it's a technical achievement, an emotional moment, or simply an interesting failure. My goal is to approach each viewing with an open mind and genuine curiosity.
              </p>
            </div>
          </div>
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

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl text-foreground mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl shadow-sm border border-border p-6"
            >
              <h3 className="text-foreground mb-3">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-8 text-center">
        <h2 className="text-2xl text-foreground mb-4">Get In Touch</h2>
        <p className="text-muted-foreground mb-6">
          Have a movie recommendation or just want to chat about cinema? I'd love to hear from you!
        </p>
        <div className="flex justify-center gap-4">
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
        </div>
      </div>
    </div>
  );
}
