import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import EmailCampaignForm from '../../components/admin/EmailCampaignForm';

export default function EditEmailCampaign() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('campaigns').select('*').eq('id', id).single();
      setCampaign(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Loading campaign…</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div>
        <p className="text-slate text-sm mb-4">Campaign not found.</p>
        <Link to="/admin/campaigns" className="text-gold text-sm">
          Back to campaigns
        </Link>
      </div>
    );
  }

  return <EmailCampaignForm mode="edit" existingCampaign={campaign} />;
}
