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

export const addPerspective = async ({ domainId, name, description, files, createdBy }) => {
  // Insert new perspective
  const { data: perspectiveData, error: perspectiveError } = await supabase
    .from('perspectives')
    .insert([{ domain_id: domainId, name, description, created_by: createdBy }])
    .select();

  if (perspectiveError) throw perspectiveError;

  // Insert files associated with the perspective
  if (files && files.length > 0) {
    const { data: fileData, error: fileError } = await supabase
      .from('perspective_files')
      .insert(
        files.map((file) => ({
          perspective_id: perspectiveData[0].id,
          file_name: file.file_name,
          file_url: file.file_url,
        }))
      );

    if (fileError) throw fileError;
  }

  // Fetch the inserted perspective with its files
  const { data: fullPerspectiveData, error: fullPerspectiveError } = await supabase
    .from('perspectives')
    .select(`
      *,
      files:perspective_files(*)
    `)
    .eq('id', perspectiveData[0].id)
    .single();

  if (fullPerspectiveError) throw fullPerspectiveError;

  return fullPerspectiveData;
};

export const incrementPerspectiveViews = async (id) => {
  const { data, error } = await supabase.rpc('increment_perspective_views', { perspective_id: id });
  
  if (error) throw error;
  return data;
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
