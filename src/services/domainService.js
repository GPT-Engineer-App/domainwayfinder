import { supabase } from '../integrations/supabase';

export const fetchDomains = async () => {
  const { data, error } = await supabase
    .from('domains')
    .select(`
      *,
      perspectives:perspectives(id, name)
    `);
  
  if (error) throw error;
  return data.map(domain => ({
    ...domain,
    perspectives: domain.perspectives ? domain.perspectives.length : 0,
    views: domain.views || 0
  }));
};

export const fetchDomainById = async (id) => {
  const { data, error } = await supabase
    .from('domains')
    .select(`
      *,
      perspectives (
        *,
        files:perspective_files(*)
      )
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const incrementDomainViews = async (id) => {
  const { data, error } = await supabase.rpc('increment_domain_views', { domain_id: id });
  
  if (error) throw error;
  return data;
};

export const createDomain = async (domain) => {
  const { data, error } = await supabase
    .from('domains')
    .insert([domain])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const addDomainType = async ({ domainId, name, description, createdBy }) => {
  const { data, error } = await supabase
    .from('domains')
    .update({ 
      type: name,
      description: description,
      updated_by: createdBy
    })
    .eq('id', domainId)
    .select();

  if (error) throw error;
  return data[0];
};

export const updateDomain = async (id, updates) => {
  const { data, error } = await supabase
    .from('domains')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteDomain = async (id) => {
  const { error } = await supabase
    .from('domains')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

export const updateDomainType = async (id, updates) => {
  return updateDomain(id, updates);
};

export const deleteDomainType = async (id) => {
  return updateDomain(id, { type: null, description: null });
};
