import { createClient } from '@supabase/supabase-js';
import type { StudentSubmission } from '../types';

// These will be provided by Vite env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type ClaimedCase = {
  case_id: string;
  group_name: string;
  created_at: string;
};

// Helper functions for our database operations
export async function claimCase(caseId: string, groupName: string) {
  if (!supabase) return { error: new Error("Supabase not configured") };
  
  // In Supabase, if we set case_id as the primary key, 
  // inserting a duplicate will throw an error, giving us atomic locking.
  const { data, error } = await supabase
    .from('claimed_cases')
    .insert([{ case_id: caseId, group_name: groupName }]);
    
  return { data, error };
}

export async function releaseCase(caseId: string, groupName: string) {
  if (!supabase) return { error: new Error("Supabase not configured") };
  
  const { data, error } = await supabase
    .from('claimed_cases')
    .delete()
    .match({ case_id: caseId, group_name: groupName });
    
  return { data, error };
}

export async function getClaimedCases() {
  if (!supabase) return { data: [], error: null };
  
  const { data, error } = await supabase
    .from('claimed_cases')
    .select('*');
    
  return { data: data as ClaimedCase[] || [], error };
}

export async function saveSubmission(submission: StudentSubmission, groupName: string) {
  if (!supabase) return { error: new Error("Supabase not configured") };
  
  const { data, error } = await supabase
    .from('submissions')
    .insert([{
      id: submission.id,
      group_name: groupName,
      case_id: submission.caseId,
      verdict: submission.verdict,
      data: submission // Store the full object as JSONB
    }]);
    
  return { data, error };
}

export async function getSubmissions() {
  if (!supabase) return { data: [], error: null };
  
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });
    
  // Map back to StudentSubmission objects
  const submissions = (data || []).map(row => row.data as StudentSubmission);
  return { data: submissions, error };
}
