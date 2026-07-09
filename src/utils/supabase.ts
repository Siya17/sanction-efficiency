import { createClient, Session } from '@supabase/supabase-js';
import type { StudentSubmission } from '../types';

// These will be provided by Vite env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Teacher accounts are created by an admin in the Supabase dashboard
// (Authentication > Users > Add user) — there is no self-service sign-up.
export async function signInTeacher(email: string, password: string) {
  if (!supabase) return { error: new Error("Supabase not configured") };

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOutTeacher() {
  if (!supabase) return { error: null };

  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getTeacherSession(): Promise<Session | null> {
  if (!supabase) return null;

  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onTeacherAuthStateChange(callback: (session: Session | null) => void) {
  if (!supabase) {
    return { data: { subscription: { unsubscribe() {} } } };
  }

  return supabase.auth.onAuthStateChange((_event, session) => callback(session));
}

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

// Releases every claimed case at once, e.g. to reset between class sessions.
export async function releaseAllClaims() {
  if (!supabase) return { error: new Error("Supabase not configured") };

  const { error } = await supabase
    .from('claimed_cases')
    .delete()
    .not('case_id', 'is', null); // case_id is required, so this matches every row

  return { error };
}

export async function saveSubmission(submission: StudentSubmission, groupName: string) {
  if (!supabase) return { error: new Error("Supabase not configured") };
  
  submission.groupName = groupName;

  const { error } = await supabase
    .from('submissions')
    .upsert([{
      id: submission.id,
      group_name: groupName,
      case_id: submission.caseId,
      verdict: submission.verdict,
      data: submission,
    }]);

  return { error };
}

export async function deleteSubmission(id: string) {
  if (!supabase) return { error: new Error("Supabase not configured") };

  const { error } = await supabase
    .from('submissions')
    .delete()
    .eq('id', id);

  return { error };
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

// Deletes every submitted verdict, e.g. to completely wipe the board.
export async function deleteAllSubmissions() {
  if (!supabase) return { error: new Error("Supabase not configured") };

  const { error } = await supabase
    .from('submissions')
    .delete()
    .not('id', 'is', null); // id is required, matches all

  return { error };
}
