import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Check, CheckCircle2, AlertTriangle, Loader2, Key, Tag, Webhook, ExternalLink, Copy } from 'lucide-react';

const PRODUCT_DESCRIPTION_DEFAULT =
  'Six-week live cohort building your concierge nursing business — LLC, pricing, operations, marketing, and legal protection.';

export default function StripeSettings() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [secretKey, setSecretKey] = useState('');
  const [publishableKey, setPublishableKey] = useState('');

  const [productName, setProductName] = useState('Method Accelerator Cohort');
  const [productDescription, setProductDescription] = useState(PRODUCT_DESCRIPTION_DEFAULT);
  const [fullAmount, setFullAmount] = useState('');
  const [planAmount, setPlanAmount] = useState('');
  const [planInstallments, setPlanInstallments] = useState('');

  const [saving, setSaving] = useState('');   // which action is saving
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const call = useCallback(async (action, body = {}) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) throw new Error('Not signed in.');
    const res = await fetch('/api/stripe/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ action, ...body }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Request failed (${res.status}).`);
    return data;
  }, []);

  const applyStatus = useCallback((s) => {
    setStatus(s);
    if (!s) return;
    setPublishableKey(s.publishable_key || '');
    setProductName(s.product_name || 'Method Accelerator Cohort');
    setProductDescription(s.product_description || PRODUCT_DESCRIPTION_DEFAULT);
    setFullAmount(s.price_full_cents ? (s.price_full_cents / 100).toString() : '');
    setPlanAmount(s.price_plan_cents ? (s.price_plan_cents / 100).toString() : '');
    setPlanInstallments(s.price_plan_installments ? s.price_plan_installments.toString() : '');
  }, []);

  const loadStatus = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const { settings } = await call('status');
      applyStatus(settings);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, [call, applyStatus]);

  useEffect(() => { loadStatus(); }, [loadStatus]);

  function flash(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3500);
  }

  async function run(key, fn) {
    setSaving(key);
    setError('');
    try {
      await fn();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving('');
    }
  }

  const doSaveKeys = () => run('save_keys', async () => {
    if (!secretKey) throw new Error('Paste your Stripe secret key first.');
    const { settings } = await call('save_keys', { secret_key: secretKey, publishable_key: publishableKey || null });
    applyStatus(settings);
    setSecretKey('');
    flash('Connected to Stripe.');
  });

  const doTest = () => run('test', async () => {
    const { settings } = await call('test_connection');
    applyStatus(settings);
    flash('Connection OK.');
  });

  const doConfigureProduct = () => run('product', async () => {
    const full = parseFloat(fullAmount);
    if (!Number.isFinite(full) || full <= 0) throw new Error('Enter a valid Pay-in-Full amount.');
    const plan = planAmount === '' ? null : parseFloat(planAmount);
    if (plan != null && (!Number.isFinite(plan) || plan <= 0)) throw new Error('Payment-plan amount must be positive or blank.');
    const installments = planInstallments === '' ? null : parseInt(planInstallments, 10);
    if (installments != null && (!Number.isInteger(installments) || installments <= 0)) {
      throw new Error('Installments must be a whole number or blank.');
    }
    const { settings } = await call('configure_product', {
      product_name: productName,
      product_description: productDescription,
      full_cents: Math.round(full * 100),
      plan_cents: plan != null ? Math.round(plan * 100) : null,
      plan_installments: installments,
    });
    applyStatus(settings);
    flash('Product published to Stripe.');
  });

  const doSetupWebhook = () => run('webhook', async () => {
    const { settings } = await call('setup_webhook');
    applyStatus(settings);
    flash('Webhook endpoint created. Secret stored securely.');
  });

  if (loading) {
    return (
      <div className="bg-white border border-cream-dark p-6 flex items-center gap-3">
        <Loader2 size={18} className="text-gold animate-spin" />
        <p className="text-slate text-sm">Loading Stripe settings…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-white border border-cream-dark p-6">
        <div className="bg-red-50 border border-red-200 p-3 text-red-700 text-sm">
          Could not load Stripe settings: {loadError}
        </div>
      </div>
    );
  }

  const connected = !!status?.connected;
  const productReady = connected && !!status?.price_full_id;
  const webhookReady = connected && !!status?.webhook_secret_set;
  const fullyReady = productReady && webhookReady;

  return (
    <div className="bg-white border border-cream-dark p-6 space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-1">Payments (Stripe)</h3>
          <p className="text-charcoal/60 text-xs">
            Connect Stripe, publish the Accelerator product, and the site starts taking enrollments.
          </p>
        </div>
        <ReadinessBadge ready={fullyReady} />
      </div>

      {message && (
        <div className="bg-green-50 border-l-2 border-green-400 p-3 text-green-800 text-xs flex items-center gap-2">
          <CheckCircle2 size={14} /> {message}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-l-2 border-red-400 p-3 text-red-700 text-xs flex items-center gap-2">
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      {/* Step 1: API key */}
      <StepCard
        number="1"
        icon={Key}
        title="Connect Stripe"
        complete={connected}
        summary={
          connected
            ? `${status.livemode ? 'Live mode' : 'Test mode'} · ${status.account_display_name || status.account_id || 'account'} · key ${status.secret_key_last4}`
            : 'Paste the secret key from Tracy\'s Stripe dashboard.'
        }
      >
        <div className="space-y-4">
          <Field
            label="Stripe Secret Key"
            type="password"
            placeholder={connected ? `Currently: ${status.secret_key_last4} (paste a new key to replace)` : 'sk_live_... or sk_test_...'}
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            autoComplete="off"
            hint="From Stripe Dashboard → Developers → API keys. Starts with sk_"
          />
          <Field
            label="Publishable Key (optional)"
            placeholder="pk_live_... or pk_test_..."
            value={publishableKey}
            onChange={(e) => setPublishableKey(e.target.value)}
            autoComplete="off"
            hint="Not required unless you extend checkout into a custom form. Safe to leave blank."
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={doSaveKeys} disabled={saving !== '' || !secretKey} className="btn-primary text-sm">
              {saving === 'save_keys' ? 'Verifying…' : connected ? 'Replace Key' : 'Connect Stripe'}
            </button>
            {connected && (
              <button onClick={doTest} disabled={saving !== ''} className="btn-navy text-sm">
                {saving === 'test' ? 'Testing…' : 'Test Connection'}
              </button>
            )}
          </div>
          {status?.last_connection_test_at && (
            <p className="text-charcoal/50 text-[0.65rem]">
              Last tested {new Date(status.last_connection_test_at).toLocaleString()} ·{' '}
              {status.last_connection_test_ok ? '✓ OK' : `✗ ${status.last_connection_test_error || 'failed'}`}
            </p>
          )}
        </div>
      </StepCard>

      {/* Step 2: Product + prices */}
      <StepCard
        number="2"
        icon={Tag}
        title="Publish the Accelerator product"
        disabled={!connected}
        complete={productReady}
        summary={
          !connected
            ? 'Connect Stripe first.'
            : productReady
              ? `Full: ${fmtUsd(status.price_full_cents)}${status.price_plan_cents ? ` · Plan: ${fmtUsd(status.price_plan_cents)}/mo${status.price_plan_installments ? ` × ${status.price_plan_installments}` : ''}` : ''}`
              : 'Set amounts — creates the product + prices via the Stripe API.'
        }
      >
        <div className="space-y-4">
          <Field label="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <Field
            label="Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            hint="Appears on the Stripe checkout receipt."
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <MoneyField label="Pay-in-Full Amount" placeholder="2497" value={fullAmount} onChange={(e) => setFullAmount(e.target.value)} />
            <MoneyField label="Payment Plan Monthly" placeholder="997 (optional)" value={planAmount} onChange={(e) => setPlanAmount(e.target.value)} />
            <Field
              label="Plan Installments"
              placeholder="3 (optional)"
              value={planInstallments}
              onChange={(e) => setPlanInstallments(e.target.value)}
              hint="Subscription auto-cancels after this many paid invoices."
              inputMode="numeric"
            />
          </div>
          <button onClick={doConfigureProduct} disabled={saving !== '' || !connected} className="btn-primary text-sm disabled:opacity-50">
            {saving === 'product' ? 'Publishing to Stripe…' : productReady ? 'Update Pricing' : 'Publish Product'}
          </button>
          {productReady && (
            <div className="text-[0.65rem] text-charcoal/50 space-y-0.5 pt-2 border-t border-cream-dark">
              <p>Product: <span className="font-mono">{status.product_id}</span></p>
              <p>Full price: <span className="font-mono">{status.price_full_id}</span></p>
              {status.price_plan_id && <p>Plan price: <span className="font-mono">{status.price_plan_id}</span></p>}
            </div>
          )}
        </div>
      </StepCard>

      {/* Step 3: Webhook */}
      <StepCard
        number="3"
        icon={Webhook}
        title="Register the webhook"
        disabled={!connected}
        complete={webhookReady}
        summary={
          !connected
            ? 'Connect Stripe first.'
            : webhookReady
              ? `Endpoint: ${status.webhook_url}`
              : 'One click — creates the webhook in Stripe and stores the signing secret.'
        }
      >
        <div className="space-y-4">
          <p className="text-charcoal/70 text-sm leading-relaxed">
            This creates a webhook endpoint in Stripe pointed at{' '}
            <code className="bg-cream-dark px-1.5 py-0.5 text-[0.75rem]">/api/stripe/webhook</code>{' '}
            and subscribes it to the events we need. The signing secret is stored securely — the server uses it to verify every incoming event.
          </p>
          {webhookReady && (
            <div className="bg-cream-dark border-l-2 border-gold p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-gold text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-1">Endpoint URL</p>
                  <p className="text-charcoal text-xs break-all font-mono">{status.webhook_url}</p>
                </div>
                <CopyMini text={status.webhook_url || ''} />
              </div>
              <p className="text-charcoal/55 text-[0.65rem] mt-2 font-mono">Endpoint ID: {status.webhook_endpoint_id}</p>
            </div>
          )}
          <button onClick={doSetupWebhook} disabled={saving !== '' || !connected} className="btn-primary text-sm disabled:opacity-50">
            {saving === 'webhook' ? 'Creating…' : webhookReady ? 'Regenerate Webhook' : 'Create Webhook Endpoint'}
          </button>
          {webhookReady && (
            <p className="text-charcoal/50 text-[0.65rem]">
              Regenerating deletes the old endpoint in Stripe and issues a new signing secret.
            </p>
          )}
        </div>
      </StepCard>

      {fullyReady && (
        <div className="bg-gold/10 border-l-2 border-gold p-4 flex items-start gap-3">
          <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
          <div>
            <p className="text-navy font-semibold text-sm">You're ready to take enrollments.</p>
            <p className="text-charcoal/70 text-xs mt-1">
              The{' '}
              <a href="/accelerator/enroll" target="_blank" rel="noreferrer" className="text-navy font-semibold underline decoration-gold/60 underline-offset-2 hover:decoration-gold">
                /accelerator/enroll
              </a>{' '}
              page is live, ambassador links will attribute automatically, and Stripe webhooks flow back into the CRM.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────── small helpers ────────────────────── */

function StepCard({ number, icon: Icon, title, summary, complete, disabled, children }) {
  const [open, setOpen] = useState(!complete && !disabled);
  return (
    <div className={`border ${complete ? 'border-green-200 bg-green-50/30' : 'border-cream-dark bg-white'} ${disabled ? 'opacity-60' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${complete ? 'bg-green-500 text-white' : 'bg-navy text-gold'}`}>
          {complete ? <Check size={14} /> : <Icon size={14} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-charcoal/40 mb-0.5">Step {number}</p>
          <p className="font-heading text-base font-bold text-navy mb-1">{title}</p>
          <p className="text-charcoal/60 text-xs">{summary}</p>
        </div>
      </button>
      {open && !disabled && (
        <div className="border-t border-cream-dark p-5 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

function ReadinessBadge({ ready }) {
  if (ready) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.15em] uppercase">
        <CheckCircle2 size={12} /> Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-cream-dark text-charcoal/70 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.15em] uppercase">
      Setup Needed
    </span>
  );
}

function Field({ label, hint, ...rest }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">{label}</span>
      </div>
      <input {...rest} className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors" />
      {hint && <p className="text-[0.65rem] text-charcoal/45 mt-1">{hint}</p>}
    </label>
  );
}

function MoneyField({ label, value, onChange, ...rest }) {
  return (
    <label className="block">
      <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-1">{label}</span>
      <div className="flex items-center border border-cream-dark bg-white focus-within:border-gold transition-colors">
        <span className="pl-3 text-charcoal/45 text-sm">$</span>
        <input
          value={value}
          onChange={onChange}
          inputMode="decimal"
          className="flex-1 px-2 py-3 text-sm bg-transparent focus:outline-none"
          {...rest}
        />
      </div>
    </label>
  );
}

function CopyMini({ text }) {
  const [copied, setCopied] = useState(false);
  async function doCopy() {
    try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <button
      onClick={doCopy}
      className="inline-flex items-center gap-1 bg-navy text-white px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.15em] uppercase hover:bg-navy/85 transition-colors shrink-0"
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function fmtUsd(cents) {
  if (!Number.isFinite(cents)) return '—';
  return `$${(cents / 100).toLocaleString('en-US')}`;
}
