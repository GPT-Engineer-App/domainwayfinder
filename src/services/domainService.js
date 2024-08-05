import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yikgsmwivhpchmupolcw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpa2dzbXdpdmhwY2htdXBvbGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NjU0MDMsImV4cCI6MjAzODQ0MTQwM30.v9J_W-BwYucTY61d-23mSfiDmQhgD7a6oFJzHIwOfnA';
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchDomains = async () => {
  const { data, error } = await supabase
    .from('domains')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const fetchDomainById = async (id) => {
  const { data, error } = await supabase
    .from('domains')
    .select(`
      *,
      perspectives (*)
    `)
    .eq('id', id)
    .single();
  
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

export const addPerspective = async ({ domainId, name, description }) => {
  const { data, error } = await supabase
    .from('perspectives')
    .insert([{ domain_id: domainId, name, description }])
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

export const updatePerspective = async (id, updates) => {
  const { data, error } = await supabase
    .from('perspectives')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deletePerspective = async (id) => {
  const { error } = await supabase
    .from('perspectives')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};
