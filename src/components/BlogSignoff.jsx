export default function BlogSignoff({ signoff }) {
  if (!signoff || !signoff.name) return null;

  return (
    <div className="mt-16 pt-10 border-t border-cream-dark">
      <div className="gold-divider mb-6" />
      {signoff.closing_line && (
        <p className="avery-italic text-navy text-xl mb-4">{signoff.closing_line}</p>
      )}
      <div className="flex items-center gap-4">
        {signoff.photo_url && (
          <img
            src={signoff.photo_url}
            alt={signoff.name}
            className="w-16 h-16 rounded-full object-cover border border-cream-dark"
          />
        )}
        <div>
          <p className="font-heading text-lg font-bold text-navy">{signoff.name}</p>
          {signoff.title && <p className="text-slate text-sm">{signoff.title}</p>}
        </div>
      </div>
    </div>
  );
}
