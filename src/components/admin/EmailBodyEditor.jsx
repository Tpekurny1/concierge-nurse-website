import { useRef, useState } from 'react';
import { EMAIL_TEMPLATES } from './emailTemplates';

const PERSONALIZATION_TOKENS = ['{firstName}', '{lastName}', '{email}'];

export default function EmailBodyEditor({ value, onChange, rows = 14, onTemplateApplied }) {
  const textareaRef = useRef(null);
  const [view, setView] = useState('code');
  const [templateId, setTemplateId] = useState('');

  function insertToken(token) {
    const el = textareaRef.current;
    if (!el) {
      onChange((value || '') + token);
      return;
    }
    const start = el.selectionStart ?? (value || '').length;
    const end = el.selectionEnd ?? (value || '').length;
    const next = (value || '').slice(0, start) + token + (value || '').slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const caret = start + token.length;
      el.setSelectionRange(caret, caret);
    });
  }

  function applyTemplate(id) {
    setTemplateId(id);
    if (!id) return;
    const tpl = EMAIL_TEMPLATES.find((t) => t.id === id);
    if (!tpl) return;
    if ((value || '').trim() && !window.confirm('Replace current email body with this template?')) {
      setTemplateId('');
      return;
    }
    onChange(tpl.html);
    if (onTemplateApplied) onTemplateApplied(tpl);
    setTemplateId('');
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mr-auto">
          Email Body (HTML)
        </span>
        <select
          value={templateId}
          onChange={(e) => applyTemplate(e.target.value)}
          className="px-3 py-1.5 border border-cream-dark bg-white text-xs focus:outline-none focus:border-gold transition-colors"
        >
          <option value="">Use Template…</option>
          {EMAIL_TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <div className="inline-flex border border-cream-dark">
          <button
            type="button"
            onClick={() => setView('code')}
            className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              view === 'code' ? 'bg-navy text-white' : 'text-charcoal/60 hover:text-navy'
            }`}
          >
            Code
          </button>
          <button
            type="button"
            onClick={() => setView('preview')}
            className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              view === 'preview' ? 'bg-navy text-white' : 'text-charcoal/60 hover:text-navy'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        <span className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40 self-center">
          Insert:
        </span>
        {PERSONALIZATION_TOKENS.map((token) => (
          <button
            key={token}
            type="button"
            onClick={() => insertToken(token)}
            className="px-2 py-1 text-[0.65rem] font-mono border border-cream-dark text-charcoal/70 hover:border-gold hover:text-navy transition-colors"
          >
            {token}
          </button>
        ))}
      </div>

      {view === 'code' ? (
        <textarea
          ref={textareaRef}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors resize-none font-mono"
        />
      ) : (
        <div className="border border-cream-dark bg-cream/40 p-6">
          <div
            className="bg-white border border-cream-dark mx-auto"
            style={{ maxWidth: '600px', minHeight: '300px' }}
            dangerouslySetInnerHTML={{
              __html: value || '<p style="color:#999;padding:24px;">Your email preview will appear here.</p>',
            }}
          />
        </div>
      )}
    </div>
  );
}
