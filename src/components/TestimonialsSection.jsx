import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "GIANNINA FALLA, RN",
    credential: "Concierge Nurse Business Cohort Accelerator Graduate",
    image: "https://imgur.com/byofF8w.jpg",
    quote: "Joining Tracy Pekurny's Nurse Concierge Cohort was one of the best decisions I made. She helped me translate that into a real, structured business.",
  },
  {
    id: 2,
    name: "LACEY RUFF, RN",
    credential: "Accelerator Graduate",
    image: "https://imgur.com/6qzqYae.jpg",
    quote: "I learned the many mistakes I would have made, before even making them — which is worth its weight in gold!",
  },
  {
    id: 3,
    name: "ALLIE ALONZO, RN",
    credential: "Accelerator Graduate",
    image: "https://imgur.com/l6HW4ni.jpg",
    quote: "The way Tracy blends clinical excellence with strategic business insight is truly rare. She equips you to build your business with vision and sustainability.",
  },
  {
    id: 4,
    name: "MICHELE MORRIS, RN",
    credential: "Accelerator Graduate",
    image: "https://imgur.com/jtDLIwr.jpg",
    quote: "Tracy helped me take strategic, aligned actions that are actually growing my business.",
  },
];

function FiveStars() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-navy py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header Block */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="h-[1px] bg-white/20 flex-1 max-w-[200px]" />
          <h2 className="avery-title text-3xl sm:text-4xl lg:text-5xl text-white tracking-widest uppercase">
            TRANSFORMATION STORIES
          </h2>
          <div className="h-[1px] bg-white/20 flex-1 max-w-[200px]" />
        </div>

        <p className="text-center text-white/50 font-body text-xs tracking-widest uppercase mb-20">
          Five-star rated by every cohort graduate
        </p>

        {/* Content Grid: Sticky left photo + scrollable right reviews */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start relative">

          {/* Left Column: Sticky Tracy Image */}
          <div className="hidden lg:block relative sticky top-32">
            <div
              className="w-full aspect-[4/5] bg-cover bg-center max-w-lg shadow-2xl ml-auto"
              style={{ backgroundImage: 'url("https://i.imgur.com/jxBFHqK.jpeg")'}}
            />
          </div>

          {/* Right Column: Scrollable Reviews List */}
          <div className="flex flex-col gap-16">
            {reviews.map((review, index) => (
              <div key={review.id} className="flex flex-col">
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-full bg-cover bg-center mb-10 overflow-hidden border-2 border-gold/30"
                  style={{ backgroundImage: `url("${review.image}")` }}
                />

                {/* Stars */}
                <div className="mb-4">
                  <FiveStars />
                </div>

                {/* Quote */}
                <p className="avery-italic text-[#e8e4db] text-2xl lg:text-3xl leading-[1.3] mb-8 pr-12">
                  "{review.quote}"
                </p>

                {/* Name + Credential */}
                <p className="font-body text-gold text-[0.7rem] uppercase tracking-widest font-medium">
                  {review.name}
                </p>
                <p className="font-body text-white/40 text-[0.65rem] uppercase tracking-wider mt-1 mb-12">
                  {review.credential}
                </p>

                {/* Divider (all except last) */}
                {index !== reviews.length - 1 && (
                  <div className="h-[1px] w-full bg-white/10" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
