Basic stuff:

Alright, we’re back in business, so let’s dig in to some minor changes before we get started building our databases.

1. The header that says “Kinoscoop” next to the little filmstrip logo is cute, but let’s replace it with the logo image I’ve uploaded. Keep the filmstrip icon. I like it.

2. I would like to keep track of page views. We should add that to the analytics section of The Batcave (as well, please let me know what analytics data we can keep track of on this kind of site. It will be launched with Vercel).

3. There are some FAQs on the “About Me” page, a touch I really enjoy. I have replaced answers from the ones you have generated to my own answers, as well as added a few new questions. The same goes for the mini-bio on the About Me page, My Watching Philosophy, and the introductory blurb on the Home page (“Hi! I’m a passionate cinephile…”). The new text is below, indicated with quotation marks (the quotation marks are just to help make things a little clearer for you. You do not need to add them to the text on the site). You will have to do a little formatting for the question about rating systems, as I included a quote from Roger Ebert that will need to be given some space and formatted (more or less along APA guidelines). Please make sure that you italicise the names of the movies mentioned in the quote.  Because the answers are a little long, we’ll have to make them collapsible, with the text of the questions still visible. I have not decided what to write in place of “Welcome to my cinema journey”, but change “Exploring worlds one film at a time” to “Where the silver screen is the retina to the mind’s eye...”. Line breaks for all should be intuitive, but we’ll make corrections as needs be.

4. Social media handles; Instagram and Letterboxd are @kinoscoop, Tiktok is @hirerob. I want to add spotify but I don’t know how yet. I don’t have other social media handles, but I will need to retain the ability to add them in the future via The Batcave (code name for admin dashboard, remember), so please make sure the options exist. Similarly, there should be a button that allows users to return to my portfolio (robperry.eu), which should be slightly more distinct from regular social media buttons. There is no universal symbol for a UX designer portfolio, so we may have to get creative. I want it to be accessible without leading users to immediately leave this site. Maybe we also set up a button in About Me under Get in Touch, while also moving the Get In Touch section closer to the mini-bio. 

5. On the front page, change “Currently Watching” to “Now Playing”.

6. Cap “Recently Watched” to 10 entries to keep things lean and clean. All should link to their respective reviews, if applicable. We’re going to make a formatting change, however, by scaling them down and nesting them in the Now Playing box in that empty space, retaining the ability to scroll so we can save some space. In place of Recently Watched will be “The Last 30 Days” which will, of course, show the movies that have played in the last 30 days. 	

7. Formatting change to “Watchlist” at the foot of Home. Let’s change the formatting for the movies in that list to be more consistent with “Recently Watched” (ie. smaller and tighter). We don’t have a star review, and we don’t have a watch date, so we’ll have the four lines as Title/Director/Release year/Country of origin. Use the same fonts and styling as Recently Watched (eg. Country of Origin will be small and italicised). 

8. At the bottom of The Archives, add “Highest Rated” and “Lowest Rated” to go with longest and shortest movies. May have to be in list form.

9. Also in The Archives: On hover, pie charts should have a text list of movies watched. You might have to generate some dummy data for that. 

10. Move The Archives button one space to the right, so Reviews comes immediately after Home.

11. Movie of the Month should link to corresponding review (at least, I should have the option to add a link to the review in The Batcave. There might be some months where I don’t have a review, and we don’t want a dead link, so I should have the option to add it at will). Also, in our settings, I should be able to choose between naming it movie of the month or movie of the week, in case I get busy and energetic or lazy and unfocused.

12. On review pages, I should be able to manually name the medium through which I watched the movie (eg. theatre, streaming, home video, etc. If I choose streaming, a new entry line should appear that allows me to type in the name of the service. No point having a pre-set list of services, since new ones come all the time, so I’ll just enter it manually each time. There should also be a section for me to provide an external link to the IMDB page for whatever I am reviewing. In fact, when I am posting a review, it should give me an option in the template (more on templates to come later) to “Post to recently watched”, adding the posted movie to the front of the line and bumping off the oldest entry in Recently Watched.

13. On About Me, below ‘By The Numbers’, we should add a section for my top 10 titled “10 for All Time” (two rows of five entries, follow the formatting of Recently Watched). We’ll need a data entry point in The Batcave. Just above that, let’s have “Recent Favourites” with 3 entries. 

14. In The Archives, the Total Movies block should have a link that opens an overlay displaying all the movies in question (“Click to see The Archive”). The overlay should be simple, more or less displaying the same formatting as Recently Watched, with whatever styling makes it look best. Here is where it gets complicated; this data should change depending on whether we have selected a specific month or year. This means we have to change some buttons. Our default landing for The Archives should bring us to the present month of the present year. When I click on “This Month” it should open a list of the months of the year and allow me to select the month. The same should apply to This Year (page styling should apply, so no white strip with Times New Roman). This means you’ll have to generate dummy data for each of the months and years. Let’s go back as far as January of 2023 so we have a good amount of variation to work with. All of this should be replaced by the data I add when I upload my CSV file from Letterboxd, which goes back to December of 2019, so I’m trying to get ahead and weed out any potential issues. Total movies, runtime, average rating, directors, etc. should all be updated when we change the month and year. If it looks like this is going to eat up a lot of my credits, or you find yourself confused, let me know and I can just give you my CSV file to harvest.

15. ‘By The Numbers’ will need to change dynamically based on data pulled from the CSV file.

16. Change the name of Reviews to Commentary.


---

Front page intro blurb;
	“Hi! I’m Rob, a writer, designer, and cinephile currently living in Prague. I have been fascinated with film since I was knee-high to a grasshopper, and recently decided it was time to share my passion with someone other than my wife.
	This website is fresh out of the oven, so it might be a little rough around the edges until I can get things smoothed out. In the meantime, have a look at some of my favourite moves, read some commentary, or check out my socials to catch the latest (kino)scoop!”

--

About me blurb:
	“Where to start…

	My mother worked in a locally owned video rental store in the 90s. I would sit with her and stare at the stacks of black shells housing VHS tapes, knowing that I was looking at a wall of worlds. In 2012 I inherited a library of films when her old colleague fled the country and left me the works. I went from a small collection of B-movies to having that wall of worlds all to myself.
	While I have always been a bit of a cinephile, it wasn’t until 2020 that I began to take things seriously. I used the first lockdown to digitise my collection, converting it from a literal closet full of dvd-packed binders to a nice, clean streaming platform. It was a massive step up from the excel sheet and endless piles of discs.
	Cinephiles can be pretentious dolts – I would know. I have been one. The purpose of this platform is to share my love of the whole cinematic experience with a much lighter touch than I have done during my douchier days. It is also to combat the narrow scope that streaming provides as services like Amazon and Netflix move away from being a platform for entertainment and into content factories primarily designed to market their own brand of soylent green. All in all, I’m just trying to share some of the things I love and offer some food for thought.”

--
My Watching Philosophy:

Passion First: I do this because I genuinely love cinema, not for the sake of adding to the endless river of content. The reviews are a natural extension of passion and desire for change within both the film industry, and movie culture. 

Critical but Fair: I try to appreciate what film-makers are attempting to do, even if it isn’t my personal taste. Context matters, as does relativity. 

Diversity Matters: I make a concerted effort to watch films from different eras, countries, and genres to force myself out of my little bubble. Familiarity breeds contempt. 

--

FAQ;

How do you choose which movies to watch?
	“I spend a lot of time reading about cinema, falling down rabbit holes and making lists. Sometimes it’s a matter of wanting to see what all the fuss is about, sometimes it’s finally getting around to pulling the trigger, other times it’s just random impulse. I would like to review more current releases, but since this isn’t a full time job, I don’t feel obligated.”
	

What’s your rating system?
	“My approach to ratings is two-fold, with both branches being heavily shaped by Roger Ebert’s methodology. Where Ebert rated a film on a scale of one to four stars, I go to five because I want to be able to state clearly that a movie is mid. I feel that the five star system helps with this, while also being an allusion to Dave Meltzer’s 5-star rating system.
	The stars are intuitive; 5 stars is a masterpiece that deserves a place in whatever Hall of Fame. 4 is strongly recommended, with a few shortcomings. 3 is just average with little to say for itself. 2 is poor with few redeeming qualities. 1 is bad to the point of having no redeeming qualities. 0 is terrible to the point of being a stain on the rich tapestry of the human condition.
	0 stars is different from no rating. There are some films I just don’t feel comfortable putting on a scale for whatever reason. For example, while Schindler’s List is a tour de force as a piece of art, I don’t feel comfortable ascribing a numerical value to most things related to the holocaust. 
	Additionally, ratings are relative and contextual, not absolute. As Ebert put it, 

	“When you ask a friend if Hellboy is any good, you're not asking if it's any good compared to Mystic River, you're asking if it's any good compared to The Punisher. And my answer would be, on a scale of one to four, if Superman is four, then Hellboy is three and The Punisher is two. In the same way, if American Beauty gets four stars, then The United States of Leland clocks in at about two.”
								-Rober Ebert, “Shaolin Soccer”, 2004.

	I would rate those movies differently, but I follow the same logic because it’s sound. There’s no need to reinvent the wheel.”


Do you accept screeners or promotional materials?
	“Short answer: yes, but if you ask for my opinion, I will give you my opinion. Constructive criticism is a critical part of the artistic process, and genuine reaction is part of the greater cycle of art.”

Can I suggest a movie for you to watch?
	“Would you!? I am always looking for new suggestions and ideas. Message me on my socials or the contact page.”

How long have you been watching and reviewing movies? 
	“Some of my earliest and best memories involve standing in like at theatres, wearing out VHS tapes, and dumping on B-movies with friends and family. I’ve tried writing a few blogs/reviews before, but establishing this site and my socials is my first real effort.”

How are you qualified to be a critic?
	“I’m not, but if you are capable of expressing an opinion – what you liked or didn’t like and why – I think you’re qualified to be a critic.”



That’s all for what I will call “the little bits”. Please let me know if any of this will be facilitated by setting up the databases first, then we can push the updates after they’re ready.