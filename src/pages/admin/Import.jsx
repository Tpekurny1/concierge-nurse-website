import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, ChevronRight, ChevronLeft, Check, AlertTriangle, FileText, X } from 'lucide-react';
import Papa from 'papaparse';
import { supabase } from '../../lib/supabase';

const CRM_FIELDS = [
  { value: '', label: 'Skip this column' },
  { value: 'email', label: 'Email' },
  { value: 'first_name', label: 'First Name' },
  { value: 'last_name', label: 'Last Name' },
  { value: 'phone', label: 'Phone' },
  { value: 'business_name', label: 'Business Name' },
  { value: 'annual_revenue', label: 'Annual Revenue' },
  { value: 'lifecycle_stage', label: 'Lifecycle Stage' },
  { value: 'status', label: 'Status' },
];

const AUTO_MAP = {
  email: 'email', 'e-mail': 'email', 'email address': 'email', email_address: 'email', emailaddress: 'email',
  first_name: 'first_name', 'first name': 'first_name', firstname: 'first_name', 'given name': 'first_name',
  last_name: 'last_name', 'last name': 'last_name', lastname: 'last_name', surname: 'last_name', 'family name': 'last_name',
  phone: 'phone', 'phone number': 'phone', phone_number: 'phone', mobile: 'phone', tel: 'phone',
  business_name: 'business_name', 'business name': 'business_name', business: 'business_name', company: 'business_name', 'company name': 'business_name',
  annual_revenue: 'annual_revenue', 'annual revenue': 'annual_revenue', revenue: 'annual_revenue',
  lifecycle_stage: 'lifecycle_stage', 'lifecycle stage': 'lifecycle_stage', stage: 'lifecycle_stage',
  status: 'status',
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Import() {
  const [step, setStep] = useState(1);
  const [rawData, setRawData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({});
  const [pasteText, setPasteText] = useState('');
  const [validation, setValidation] = useState(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [fileName, setFileName] = useState('');
  const [dragging, setDragging] = useState(false);
  const [parseError, setParseError] = useState('');

  // Tag assignment
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [newTagName, setNewTagName] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    supabase.from('tags').select('*').order('name').then(({ data }) => setTags(data || []));
  }, []);

  function parseCSV(text, name) {
    setParseError('');
    // Strip BOM
    const cleaned = text.replace(/^\uFEFF/, '');

    const result = Papa.parse(cleaned, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: (h) => h.trim(),
    });

    if (result.errors.length > 0 && result.data.length === 0) {
      setParseError('Could not parse CSV. Check the format and try again.');
      return;
    }

    if (result.data.length === 0) {
      setParseError('No data found in the file.');
      return;
    }

    const fields = (result.meta.fields || []).filter((f) => f.length > 0);
    setHeaders(fields);
    setRawData(result.data);
    setFileName(name || 'pasted data');

    // Auto-map columns
    const autoMap = {};
    fields.forEach((h) => {
      const key = h.toLowerCase().trim();
      if (AUTO_MAP[key]) autoMap[h] = AUTO_MAP[key];
    });
    setMapping(autoMap);
    setStep(2);
  }

  function handleFileSelect(file) {
    if (!file) return;
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setParseError('Please upload a .csv file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => parseCSV(e.target.result, file.name);
    reader.readAsText(file);
  }

  function handleFileInput(e) {
    handleFileSelect(e.target.files[0]);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }

  function handlePaste() {
    if (!pasteText.trim()) return;
    parseCSV(pasteText, null);
  }

  function getMappedField(header) {
    return mapping[header] || '';
  }

  function setMappedField(header, field) {
    setMapping((prev) => ({ ...prev, [header]: field }));
  }

  function hasEmailMapping() {
    return Object.values(mapping).includes('email');
  }

  function buildRows() {
    return rawData.map((row) => {
      const mapped = {};
      headers.forEach((h) => {
        const field = mapping[h];
        if (field) mapped[field] = row[h]?.trim() || '';
      });
      return mapped;
    });
  }

  async function handleValidate() {
    const rows = buildRows();
    const valid = [];
    const invalid = [];
    const duplicateRows = [];

    rows.forEach((row, i) => {
      if (!row.email || !isValidEmail(row.email)) {
        invalid.push({ index: i, reason: 'Invalid or missing email', row });
      } else {
        valid.push(row);
      }
    });

    // Check duplicates against database
    const emails = valid.map((r) => r.email.toLowerCase());
    const uniqueEmails = [...new Set(emails)];

    const existingEmails = new Set();
    for (let i = 0; i < uniqueEmails.length; i += 50) {
      const batch = uniqueEmails.slice(i, i + 50);
      const { data } = await supabase.from('contacts').select('email').in('email', batch);
      (data || []).forEach((c) => existingEmails.add(c.email.toLowerCase()));
    }

    const toImport = [];
    const seenEmails = new Set();
    valid.forEach((row) => {
      const email = row.email.toLowerCase();
      if (existingEmails.has(email) || seenEmails.has(email)) {
        duplicateRows.push(row);
      } else {
        seenEmails.add(email);
        toImport.push(row);
      }
    });

    setValidation({ valid: toImport, invalid, duplicates: duplicateRows });
    setStep(4);
  }

  async function handleCreateTag() {
    if (!newTagName.trim()) return;
    const { data } = await supabase.from('tags').insert({ name: newTagName.trim() }).select().single();
    if (data) {
      setTags((prev) => [...prev, data]);
      setSelectedTag(data.id);
      setNewTagName('');
    }
  }

  async function handleImport() {
    setImporting(true);
    setStep(5);
    setProgress(0);

    const rows = validation.valid;
    let imported = 0;
    let errors = 0;
    const importedIds = [];
    const totalBatches = Math.ceil(rows.length / 50);

    for (let i = 0; i < rows.length; i += 50) {
      const batch = rows.slice(i, i + 50).map((row) => ({
        email: row.email.toLowerCase(),
        first_name: row.first_name || null,
        last_name: row.last_name || null,
        phone: row.phone || null,
        business_name: row.business_name || null,
        annual_revenue: row.annual_revenue || null,
        lifecycle_stage: ['Explorer', 'DIYer', 'Builder', 'Established Owner'].includes(row.lifecycle_stage) ? row.lifecycle_stage : 'Explorer',
        status: ['new', 'confirmed', 'unsubscribed', 'bounced'].includes(row.status) ? row.status : 'new',
        source: 'csv_import',
      }));

      const { data, error } = await supabase.from('contacts').insert(batch).select('id');

      if (error) {
        // Fall back to row-by-row
        for (const single of batch) {
          const { data: sData, error: sErr } = await supabase.from('contacts').insert(single).select('id');
          if (sErr) {
            errors++;
          } else if (sData?.[0]) {
            imported++;
            importedIds.push(sData[0].id);
          }
        }
      } else {
        imported += (data || []).length;
        (data || []).forEach((c) => importedIds.push(c.id));
      }

      setProgress(Math.round(((i / 50 + 1) / totalBatches) * 100));
    }

    // Log activity for all imported contacts
    if (importedIds.length > 0) {
      for (let i = 0; i < importedIds.length; i += 50) {
        const actBatch = importedIds.slice(i, i + 50).map((id) => ({
          contact_id: id,
          type: 'import',
          description: `Imported via CSV upload${fileName ? ` (${fileName})` : ''}`,
        }));
        await supabase.from('activity_log').insert(actBatch);
      }
    }

    // Assign tag to all imported contacts
    if (selectedTag && importedIds.length > 0) {
      for (let i = 0; i < importedIds.length; i += 50) {
        const tagBatch = importedIds.slice(i, i + 50).map((id) => ({
          contact_id: id,
          tag_id: selectedTag,
        }));
        await supabase.from('contact_tags').insert(tagBatch);
      }
    }

    setProgress(100);
    setResults({
      total: rawData.length,
      imported,
      skipped: validation.duplicates.length,
      invalid: validation.invalid.length,
      errors,
    });
    setStep(6);
    setImporting(false);
  }

  function reset() {
    setStep(1);
    setRawData([]);
    setHeaders([]);
    setMapping({});
    setPasteText('');
    setParseError('');
    setFileName('');
    setValidation(null);
    setResults(null);
    setProgress(0);
    setSelectedTag('');
    setNewTagName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const stepLabels = ['Upload', 'Preview', 'Map', 'Validate', 'Import', 'Results'];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy mb-8">Import Contacts</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`inline-flex items-center justify-center w-7 h-7 text-xs font-semibold ${
                step > i + 1
                  ? 'bg-green-600 text-white'
                  : step === i + 1
                  ? 'bg-navy text-gold'
                  : 'bg-cream text-charcoal/40 border border-cream-dark'
              }`}
            >
              {step > i + 1 ? <Check size={14} /> : i + 1}
            </span>
            <span className={`text-xs ${step >= i + 1 ? 'text-charcoal font-medium' : 'text-charcoal/40'}`}>{label}</span>
            {i < 5 && <ChevronRight size={14} className="text-charcoal/20" />}
          </div>
        ))}
      </div>

      {/* Step 1: Upload */}
      {step === 1 && (
        <div className="bg-white border border-cream-dark p-8">
          <div className="max-w-lg mx-auto space-y-6">
            {/* Drag and drop zone */}
            <div>
              <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-2">Upload CSV File</label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center p-10 border-2 border-dashed cursor-pointer transition-all duration-200 ${
                  dragging
                    ? 'border-gold bg-gold/5 scale-[1.01]'
                    : 'border-cream-dark hover:border-gold/50 hover:bg-cream/30'
                }`}
              >
                <Upload size={36} className={`mb-3 transition-colors ${dragging ? 'text-gold' : 'text-charcoal/20'}`} />
                {dragging ? (
                  <span className="text-sm text-gold font-semibold">Drop your file here</span>
                ) : (
                  <>
                    <span className="text-sm text-charcoal font-medium">Drag & drop a .csv file here</span>
                    <span className="text-xs text-charcoal/40 mt-1">or click to browse</span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-cream-dark" />
              <span className="text-charcoal/30 text-xs uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-cream-dark" />
            </div>

            {/* Paste area */}
            <div>
              <label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 block mb-2">Paste CSV Data</label>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                rows={6}
                placeholder={"email,first_name,last_name\njohn@example.com,John,Doe\njane@example.com,Jane,Smith"}
                className="w-full px-4 py-3 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors resize-none font-mono"
              />
              <button onClick={handlePaste} disabled={!pasteText.trim()} className="btn-primary text-sm mt-3 disabled:opacity-40">
                Parse CSV
              </button>
            </div>

            {parseError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertTriangle size={16} className="shrink-0" />
                {parseError}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Preview */}
      {step === 2 && (
        <div className="bg-white border border-cream-dark">
          <div className="px-6 py-4 border-b border-cream-dark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={16} className="text-gold" />
              <p className="text-sm text-charcoal">
                <span className="font-semibold">{rawData.length} rows</span> found
                {fileName && <span className="text-charcoal/40"> in {fileName}</span>}
                {' '}— showing first 10:
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark text-left">
                  <th className="px-4 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 w-10">#</th>
                  {headers.map((h) => (
                    <th key={h} className="px-4 py-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark">
                {rawData.slice(0, 10).map((row, i) => (
                  <tr key={i} className="hover:bg-cream/30">
                    <td className="px-4 py-3 text-charcoal/30 text-xs">{i + 1}</td>
                    {headers.map((h) => (
                      <td key={h} className="px-4 py-3 text-slate">{row[h] || <span className="text-charcoal/20 italic">empty</span>}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rawData.length > 10 && (
            <div className="px-6 py-2 text-center text-charcoal/30 text-xs border-t border-cream-dark">
              ... and {rawData.length - 10} more rows
            </div>
          )}
          <div className="px-6 py-4 border-t border-cream-dark flex gap-3">
            <button onClick={reset} className="btn-navy text-sm flex items-center gap-1">
              <ChevronLeft size={14} /> Start Over
            </button>
            <button onClick={() => setStep(3)} className="btn-primary text-sm flex items-center gap-1">
              Next: Map Columns <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Column Mapping */}
      {step === 3 && (
        <div className="bg-white border border-cream-dark p-6">
          <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-2">Map CSV Columns to CRM Fields</h3>
          <p className="text-slate text-sm mb-6">Match each column from your CSV to the correct contact field. Columns mapped to "Skip" will be ignored.</p>

          <div className="space-y-3 max-w-xl">
            {headers.map((h) => {
              const mapped = getMappedField(h);
              return (
                <div key={h} className="flex items-center gap-4">
                  <span className={`text-sm w-44 shrink-0 font-medium ${mapped ? 'text-charcoal' : 'text-charcoal/40'}`}>{h}</span>
                  <ChevronRight size={14} className="text-charcoal/20 shrink-0" />
                  <select
                    value={mapped}
                    onChange={(e) => setMappedField(h, e.target.value)}
                    className={`flex-1 px-4 py-2.5 border bg-white text-sm focus:outline-none focus:border-gold transition-colors ${
                      mapped ? 'border-green-300 text-charcoal' : 'border-cream-dark text-charcoal/40'
                    }`}
                  >
                    {CRM_FIELDS.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                  {mapped && (
                    <Check size={16} className="text-green-500 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {!hasEmailMapping() && (
            <div className="flex items-center gap-2 mt-6 p-3 bg-amber-50 border border-amber-200 text-amber-700 text-sm">
              <AlertTriangle size={16} className="shrink-0" />
              At least one column must be mapped to <strong>Email</strong> to proceed.
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button onClick={() => setStep(2)} className="btn-navy text-sm flex items-center gap-1">
              <ChevronLeft size={14} /> Back
            </button>
            <button onClick={handleValidate} disabled={!hasEmailMapping()} className="btn-primary text-sm flex items-center gap-1 disabled:opacity-40">
              Next: Validate <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Validate + Tag Assignment */}
      {step === 4 && validation && (
        <div className="bg-white border border-cream-dark p-6">
          <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-6">Validation Results</h3>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 bg-green-50 border border-green-200">
              <p className="text-3xl font-bold text-green-700">{validation.valid.length}</p>
              <p className="text-sm text-green-600 mt-1">Ready to import</p>
            </div>
            <div className="p-5 bg-amber-50 border border-amber-200">
              <p className="text-3xl font-bold text-amber-700">{validation.duplicates.length}</p>
              <p className="text-sm text-amber-600 mt-1">Duplicates (will skip)</p>
            </div>
            <div className="p-5 bg-red-50 border border-red-200">
              <p className="text-3xl font-bold text-red-700">{validation.invalid.length}</p>
              <p className="text-sm text-red-600 mt-1">Invalid email (will skip)</p>
            </div>
          </div>

          {/* Tag assignment */}
          <div className="border border-cream-dark p-5 mb-6">
            <h4 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-3">Assign Tag to Imported Contacts (Optional)</h4>
            <p className="text-slate text-xs mb-4">Tag all imported contacts so you can segment them later for campaigns.</p>

            <div className="flex gap-3 items-end flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-2.5 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="">No tag</option>
                  {tags.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-charcoal/30 text-xs">or create:</span>
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="New tag name"
                  className="px-3 py-2.5 border border-cream-dark bg-white text-sm focus:outline-none focus:border-gold transition-colors w-40"
                />
                <button
                  onClick={handleCreateTag}
                  disabled={!newTagName.trim()}
                  className="btn-navy text-sm disabled:opacity-40"
                >
                  Create
                </button>
              </div>
            </div>

            {selectedTag && (
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-block px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider uppercase bg-navy text-gold">
                  {tags.find((t) => t.id === selectedTag)?.name}
                </span>
                <span className="text-xs text-charcoal/40">will be applied to all {validation.valid.length} imported contacts</span>
                <button onClick={() => setSelectedTag('')} className="text-charcoal/30 hover:text-charcoal transition-colors">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="btn-navy text-sm flex items-center gap-1">
              <ChevronLeft size={14} /> Back
            </button>
            <button
              onClick={handleImport}
              disabled={validation.valid.length === 0}
              className="btn-primary text-sm disabled:opacity-40"
            >
              Import {validation.valid.length} Contacts
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Importing with progress */}
      {step === 5 && (
        <div className="bg-white border border-cream-dark p-10">
          <div className="max-w-md mx-auto text-center">
            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h3 className="font-heading text-lg font-bold text-navy mb-2">Importing contacts...</h3>
            <p className="text-slate text-sm mb-6">This may take a moment for large files.</p>

            {/* Progress bar */}
            <div className="w-full bg-cream border border-cream-dark h-3 overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-charcoal/40 text-xs mt-2">{progress}% complete</p>
          </div>
        </div>
      )}

      {/* Step 6: Results */}
      {step === 6 && results && (
        <div className="bg-white border border-cream-dark p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-navy">Import Complete</h3>
              <p className="text-slate text-sm">Your contacts have been imported successfully.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-5 bg-cream border border-cream-dark">
              <p className="text-3xl font-bold text-navy">{results.total}</p>
              <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-charcoal/40 mt-1">Total Rows</p>
            </div>
            <div className="p-5 bg-green-50 border border-green-200">
              <p className="text-3xl font-bold text-green-600">{results.imported}</p>
              <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-green-600/60 mt-1">Imported</p>
            </div>
            <div className="p-5 bg-amber-50 border border-amber-200">
              <p className="text-3xl font-bold text-amber-600">{results.skipped}</p>
              <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-amber-600/60 mt-1">Skipped (Duplicates)</p>
            </div>
            <div className="p-5 bg-red-50 border border-red-200">
              <p className="text-3xl font-bold text-red-600">{results.errors + results.invalid}</p>
              <p className="text-[0.65rem] font-semibold tracking-wider uppercase text-red-600/60 mt-1">Errors / Invalid</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/admin/leads" className="btn-primary text-sm no-underline flex items-center gap-1">
              View Leads <ChevronRight size={14} />
            </Link>
            <button onClick={reset} className="btn-navy text-sm">Import More</button>
          </div>
        </div>
      )}
    </div>
  );
}
