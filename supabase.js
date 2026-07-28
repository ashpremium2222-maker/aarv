/* ============================================================
   ASCENT — Supabase integration
   Auth + data persistence layer (ES module)
   ============================================================ */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kaofacrqwcevsqyywrdi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthb2ZhY3Jxd2NldnNxeXl3cmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNjA2NzYsImV4cCI6MjEwMDgzNjY3Nn0.XdKi2GaUwQXVxe9tiWxG-fSaSELq2lfj3aH0rhcIKfM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

/* ============================================================
   AUTH
   ============================================================ */
window.signUp = async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

window.signIn = async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

window.signOut = async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

window.getSession = function getSession() {
  return supabase.auth.getSession();
};

window.onAuthStateChange = function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
};

window.signInWithGoogle = async function signInWithGoogle() {
  let redirect = window.location.origin;
  if (!redirect.endsWith('/')) redirect += '/';
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirect
    }
  });
  if (error) throw error;
};

/* ============================================================
   DATA LOADING
   ============================================================ */
async function loadProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

async function createProfile(userId, name) {
  const profile = {
    id: userId,
    name: name || 'User',
    xp: 0,
    water_goal: 8,
    sleep_goal: 8,
    water: 0,
    sleep_hrs: 0,
    theme: 'dark',
    accent: 'gold',
    seen_onboarding: false,
    badges: JSON.stringify([
      { id: 'b1', name: 'First Habit', ic: '🌱', earned: false },
      { id: 'b2', name: '7-Day Streak', ic: '🔥', earned: false },
      { id: 'b3', name: 'Early Bird', ic: '🌅', earned: false },
      { id: 'b4', name: 'Goal Getter', ic: '🎯', earned: false },
      { id: 'b5', name: '30-Day Streak', ic: '💎', earned: false },
      { id: 'b6', name: 'Journal Keeper', ic: '✍️', earned: false },
      { id: 'b7', name: 'Deep Focus x10', ic: '🎧', earned: false },
      { id: 'b8', name: 'Level 10', ic: '👑', earned: false }
    ])
  };
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single();
  if (error) throw error;
  return data;
}

window.clearAllUserData = async function clearAllUserData(userId) {
  const tables = ['habits','goals','tasks','journal_entries','mood_logs','notes','focus_sessions'];
  await Promise.all(tables.map(t => supabase.from(t).delete().eq('user_id', userId)));
  const { error: delErr } = await supabase.from('profiles').delete().eq('id', userId);
  if (delErr) throw delErr;
  await createProfile(userId, null);
};

async function loadData(table, userId) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data || [];
}

/* ============================================================
   DATA SAVING
   ============================================================ */
async function saveProfile(userId, updates) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  if (error) throw error;
}

async function upsertRecord(table, record) {
  const { error } = await supabase
    .from(table)
    .upsert(record, { onConflict: 'id' });
  if (error) throw error;
}

async function deleteRecord(table, id) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  if (error) throw error;
}

async function replaceAllRecords(table, userId, records) {
  const { error: delError } = await supabase
    .from(table)
    .delete()
    .eq('user_id', userId);
  if (delError) throw delError;

  if (records.length === 0) return;

  const withUserId = records.map(r => ({ ...r, user_id: userId }));
  const { error: insError } = await supabase
    .from(table)
    .insert(withUserId);
  if (insError) throw insError;
}

/* ============================================================
   FULL DATA LOAD (loads all user data into State)
   ============================================================ */
window.loadAllUserData = async function loadAllUserData(userId) {
  const profile = await loadProfile(userId);

  const [habits, goals, tasks, journal, moods, notes, focusSessions] = await Promise.all([
    loadData('habits', userId),
    loadData('goals', userId),
    loadData('tasks', userId),
    loadData('journal_entries', userId),
    loadData('mood_logs', userId),
    loadData('notes', userId),
    loadData('focus_sessions', userId)
  ]);

  return {
    profile,
    habits: habits.map(h => ({
      ...h,
      history: typeof h.history === 'string' ? JSON.parse(h.history) : (h.history || {})
    })),
    goals: goals.map(g => ({
      ...g,
      milestones: typeof g.milestones === 'string' ? JSON.parse(g.milestones) : (g.milestones || [])
    })),
    tasks,
    journal: journal.map(j => ({
      ...j,
      mood: j.mood || '🙂'
    })),
    moods: moods.map(m => ({
      id: m.id,
      date: m.date,
      emoji: m.emoji,
      energy: m.energy,
      stress: m.stress
    })),
    notes: notes.map(n => ({
      ...n,
      tags: typeof n.tags === 'string' ? JSON.parse(n.tags) : (n.tags || [])
    })),
    focusSessions
  };
};

/* ============================================================
   FULL DATA SAVE (saves current State to Supabase)
   ============================================================ */
window.saveAllUserData = async function saveAllUserData(userId, State) {
  await saveProfile(userId, {
    name: State.user.name,
    xp: State.xp,
    water_goal: State.waterGoal,
    sleep_goal: State.sleepGoal,
    water: State.water,
    sleep_hrs: State.sleepHrs,
    theme: State.theme,
    accent: State.accent,
    seen_onboarding: State.seenOnboarding || false,
    badges: JSON.stringify(State.badges)
  });

  await Promise.all([
    replaceAllRecords('habits', userId, State.habits.map(h => ({
      ...h,
      history: JSON.stringify(h.history)
    }))),
    replaceAllRecords('goals', userId, State.goals.map(g => ({
      ...g,
      milestones: JSON.stringify(g.milestones)
    }))),
    replaceAllRecords('tasks', userId, State.tasks),
    replaceAllRecords('journal_entries', userId, State.journal),
    replaceAllRecords('mood_logs', userId, State.moods),
    replaceAllRecords('notes', userId, State.notes.map(n => ({
      ...n,
      tags: JSON.stringify(n.tags)
    }))),
    replaceAllRecords('focus_sessions', userId, State.focusSessions)
  ]);
};

/* ============================================================
   INCREMENTAL SAVE (save individual record changes)
   ============================================================ */
window.saveHabit = async function saveHabit(userId, habit) {
  await upsertRecord('habits', {
    ...habit,
    user_id: userId,
    history: JSON.stringify(habit.history)
  });
};

window.deleteHabit = async function deleteHabit(id) {
  await deleteRecord('habits', id);
};

window.saveGoal = async function saveGoal(userId, goal) {
  await upsertRecord('goals', {
    ...goal,
    user_id: userId,
    milestones: JSON.stringify(goal.milestones)
  });
};

window.deleteGoal = async function deleteGoal(id) {
  await deleteRecord('goals', id);
};

window.saveTask = async function saveTask(userId, task) {
  await upsertRecord('tasks', {
    ...task,
    user_id: userId
  });
};

window.deleteTask = async function deleteTask(id) {
  await deleteRecord('tasks', id);
};

window.saveJournalEntry = async function saveJournalEntry(userId, entry) {
  await upsertRecord('journal_entries', {
    ...entry,
    user_id: userId
  });
};

window.deleteJournalEntry = async function deleteJournalEntry(id) {
  await deleteRecord('journal_entries', id);
};

window.saveMoodLog = async function saveMoodLog(userId, mood) {
  await upsertRecord('mood_logs', {
    ...mood,
    user_id: userId
  });
};

window.saveNote = async function saveNote(userId, note) {
  await upsertRecord('notes', {
    ...note,
    user_id: userId,
    tags: JSON.stringify(note.tags)
  });
};

window.deleteNote = async function deleteNote(id) {
  await deleteRecord('notes', id);
};

window.saveFocusSession = async function saveFocusSession(userId, session) {
  await upsertRecord('focus_sessions', {
    ...session,
    user_id: userId
  });
};

/* ============================================================
   EXPOSE LOAD PROFILE / CREATE PROFILE
   ============================================================ */
window.loadProfile = loadProfile;
window.createProfile = createProfile;
