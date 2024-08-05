import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
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
