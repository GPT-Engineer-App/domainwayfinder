import { supabase } from '../integrations/supabase';

export const fetchUser = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      work_history:work_history(*),
      education:education(*),
      certifications:certifications(*),
      projects:projects(*),
      skills:skills(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return {
    ...data,
    friends: data.friends || [],
    following: data.following || [],
    followers: data.followers || [],
    preferences: data.preferences || {}
  };
};

export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateUserPreferences = async (id, preferences) => {
  const { data, error } = await supabase
    .from('users')
    .update({ preferences })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateUserSocialConnections = async (id, connectionType, connections) => {
  const { data, error } = await supabase
    .from('users')
    .update({ [connectionType]: connections })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const addWorkHistory = async (userId, workHistory) => {
  const { data, error } = await supabase
    .from('user_work_history')
    .insert({ user_id: userId, ...workHistory })
    .select();

  if (error) throw error;
  return data[0];
};

export const addEducation = async (userId, education) => {
  const { data, error } = await supabase
    .from('user_education')
    .insert({ user_id: userId, ...education })
    .select();

  if (error) throw error;
  return data[0];
};

export const addCertification = async (userId, certification) => {
  const { data, error } = await supabase
    .from('user_certifications')
    .insert({ user_id: userId, ...certification })
    .select();

  if (error) throw error;
  return data[0];
};

export const addProject = async (userId, project) => {
  const { data, error } = await supabase
    .from('user_projects')
    .insert({ user_id: userId, ...project })
    .select();

  if (error) throw error;
  return data[0];
};

export const addSkill = async (userId, skill) => {
  const { data, error } = await supabase
    .from('user_skills')
    .insert({ user_id: userId, ...skill })
    .select();

  if (error) throw error;
  return data[0];
};

export const updateTrustScore = async (userId, score) => {
  const { data, error } = await supabase
    .from('users')
    .update({ trust_score: score })
    .eq('id', userId)
    .select();

  if (error) throw error;
  return data[0];
};

export const sendConnectionRequest = async (senderId, receiverId) => {
  const { data, error } = await supabase
    .from('connection_requests')
    .insert({ sender_id: senderId, receiver_id: receiverId })
    .select();

  if (error) throw error;
  return data[0];
};

export const acceptConnectionRequest = async (requestId) => {
  const { data, error } = await supabase
    .from('connection_requests')
    .update({ status: 'accepted' })
    .eq('id', requestId)
    .select();

  if (error) throw error;
  return data[0];
};

export const updateUserPreferencesTable = async (userId, preferences) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert({ user_id: userId, ...preferences })
    .select();

  if (error) throw error;
  return data[0];
};
