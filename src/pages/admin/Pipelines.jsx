import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const STAGE_COLORS = {
  New: 'border-l-blue-400',
  Contacted: 'border-l-amber-400',
  'Consult Booked': 'border-l-purple-400',
  Enrolled: 'border-l-green-400',
  Completed: 'border-l-green-600',
  'Discovery Call': 'border-l-purple-400',
  'Proposal Sent': 'border-l-orange-400',
  'Active Client': 'border-l-green-500',
  Nurturing: 'border-l-cyan-400',
  Converted: 'border-l-green-500',
  Closed: 'border-l-charcoal/30',
};

// Hardcoded fallback in case the DB stages column is empty/broken
const DEFAULT_PIPELINES = {
  Accelerator: ['New', 'Contacted', 'Consult Booked', 'Enrolled', 'Completed'],
  Consulting: ['New', 'Contacted', 'Discovery Call', 'Proposal Sent', 'Active Client'],
  General: ['New', 'Contacted', 'Nurturing', 'Converted', 'Closed'],
};

function parseStages(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try { return JSON.parse(raw); } catch { return []; }
  }
  return [];
}

export default function Pipelines() {
  const [pipelines, setPipelines] = useState([]);
  const [activePipeline, setActivePipeline] = useState(null);
  const [pipelineContacts, setPipelineContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState('');
  const dragItem = useRef(null);

  // Load pipelines
  useEffect(() => {
    async function init() {
      setLoading(true);

      const { data, error } = await supabase
        .from('pipelines')
        .select('*')
        .order('created_at');

      if (error) {
        setDbError(error.message);
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setDbError('No pipelines found. Run the supabase-pipelines-migration.sql in your Supabase SQL Editor.');
        setLoading(false);
        return;
      }

      const list = data.map((p) => {
        const stages = parseStages(p.stages);
        return {
          ...p,
          stages: stages.length > 0 ? stages : (DEFAULT_PIPELINES[p.name] || []),
        };
      });

      setPipelines(list);
      setActivePipeline(list[0].id);
      setLoading(false);
    }
    init();
  }, []);

  // Load contacts when active pipeline changes
  useEffect(() => {
    if (!activePipeline) return;

    async function loadContacts() {
      const { data } = await supabase
        .from('pipeline_contacts')
        .select('*, contacts(id, first_name, last_name, email, interest, lifecycle_stage)')
        .eq('pipeline_id', activePipeline)
        .order('entered_stage_at', { ascending: true });

      setPipelineContacts(data || []);
    }
    loadContacts();
  }, [activePipeline]);

  function getStages() {
    const p = pipelines.find((pl) => pl.id === activePipeline);
    return p?.stages || [];
  }

  function getContactsInStage(stage) {
    return pipelineContacts.filter((pc) => pc.stage === stage);
  }

  function timeInStage(enteredAt) {
    const diff = Date.now() - new Date(enteredAt).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day';
    return `${days} days`;
  }

  function handleDragStart(pc) {
    dragItem.current = pc;
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  async function handleDrop(e, targetStage) {
    e.preventDefault();
    const pc = dragItem.current;
    if (!pc || pc.stage === targetStage) {
      dragItem.current = null;
      return;
    }

    // Optimistic update
    setPipelineContacts((prev) =>
      prev.map((item) =>
        item.id === pc.id
          ? { ...item, stage: targetStage, entered_stage_at: new Date().toISOString() }
          : item
      )
    );

    await supabase
      .from('pipeline_contacts')
      .update({ stage: targetStage, entered_stage_at: new Date().toISOString() })
      .eq('id', pc.id);

    await supabase.from('activity_log').insert({
      contact_id: pc.contact_id,
      type: 'status_change',
      description: `Moved to "${targetStage}" in ${pipelines.find((p) => p.id === activePipeline)?.name} pipeline`,
      metadata: { pipeline_id: activePipeline, from_stage: pc.stage, to_stage: targetStage },
    });

    dragItem.current = null;
  }

  function handleDragEnd() {
    dragItem.current = null;
  }

  const stages = getStages();

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Loading pipelines...</p>
      </div>
    );
  }

  if (dbError) {
    return (
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy mb-6">Pipelines</h1>
        <div className="bg-red-50 border border-red-200 p-6">
          <p className="text-red-700 text-sm font-semibold mb-2">Pipeline Setup Required</p>
          <p className="text-red-600 text-sm">{dbError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy">Pipelines</h1>
      </div>

      {/* Pipeline tabs */}
      <div className="flex border-b border-cream-dark mb-6">
        {pipelines.map((p) => {
          const count = activePipeline === p.id ? pipelineContacts.length : null;
          return (
            <button
              key={p.id}
              onClick={() => setActivePipeline(p.id)}
              className={`px-5 py-3 text-sm font-semibold transition-colors relative ${
                activePipeline === p.id
                  ? 'text-navy'
                  : 'text-charcoal/40 hover:text-charcoal'
              }`}
            >
              {p.name}
              {count !== null && count > 0 && (
                <span className="ml-2 text-[0.6rem] bg-gold text-navy px-1.5 py-0.5 font-bold">
                  {count}
                </span>
              )}
              {activePipeline === p.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
              )}
            </button>
          );
        })}
      </div>

      {/* Kanban board */}
      {stages.length === 0 ? (
        <p className="text-slate text-sm">No stages configured for this pipeline.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1 min-h-0">
          {stages.map((stage) => {
            const stageContacts = getContactsInStage(stage);
            return (
              <div
                key={stage}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage)}
                className="flex-shrink-0 w-72 flex flex-col"
              >
                {/* Column header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-charcoal/50">
                    {stage}
                  </h3>
                  <span className="text-[0.65rem] font-semibold text-charcoal/30 bg-cream px-2 py-0.5 border border-cream-dark">
                    {stageContacts.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex-1 bg-cream/50 border border-cream-dark p-2 space-y-2 min-h-[200px]">
                  {stageContacts.length === 0 && (
                    <div className="flex items-center justify-center h-20 text-charcoal/20 text-xs">
                      Drop leads here
                    </div>
                  )}
                  {stageContacts.map((pc) => {
                    const c = pc.contacts;
                    if (!c) return null;
                    const name = [c.first_name, c.last_name].filter(Boolean).join(' ');
                    return (
                      <div
                        key={pc.id}
                        draggable
                        onDragStart={() => handleDragStart(pc)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white border border-cream-dark border-l-4 ${STAGE_COLORS[stage] || 'border-l-charcoal/20'} p-3 cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow`}
                      >
                        <Link
                          to={`/admin/leads/${c.id}`}
                          className="no-underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p className="text-navy font-semibold text-sm hover:text-gold transition-colors">
                            {name || <span className="text-slate italic">No name</span>}
                          </p>
                        </Link>
                        <p className="text-slate text-xs mt-0.5 truncate">{c.email}</p>
                        <div className="flex items-center justify-between mt-2">
                          {c.interest && (
                            <span className="text-[0.55rem] font-semibold tracking-wider uppercase text-charcoal/30 truncate max-w-[60%]">
                              {c.interest.replace(/_/g, ' ')}
                            </span>
                          )}
                          <span className="text-[0.55rem] text-charcoal/25 ml-auto shrink-0">
                            {timeInStage(pc.entered_stage_at)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
