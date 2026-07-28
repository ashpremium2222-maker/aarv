/* ============================================================
   ASCENT — Personal Growth OS
   Single-file demo app. In-memory state only (no persistence
   between reloads in this preview — see Settings > Export to
   save a snapshot, and the note at the bottom of this file for
   how to wire up real accounts + cloud sync).
   ============================================================ */

/* ---------------- icon set (minimal inline SVGs) ---------------- */
const ICONS = {
  dashboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/></svg>',
  habits:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  goals:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
  planner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
  focus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  journal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  mood:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke-linecap="round"/><path d="M9 9h.01M15 9h.01" stroke-linecap="round" stroke-width="2.4"/></svg>',
  notes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
  analytics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>',
  settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8"/></svg>',
  moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  fire:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s-6 6-6 11a6 6 0 0 0 12 0c0-2-1-3-1-3s-1 2-2.5 2c1-3-1.5-5-1.5-7 0 2-3 3-3 6"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5M8 3h8l-1 7 3 3H6l3-3z"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
  reset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
  droplet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z"/></svg>',
  sparkle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>',
  chevronR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9L5.7 21l1.7-7-5.4-4.7 7.1-.6z"/></svg>',
};
function icon(name,cls){return ICONS[name]||'';}

/* ---------------- utilities ---------------- */
const uid=()=> 'id'+Math.random().toString(36).slice(2,10);
const todayISO=()=> new Date().toISOString().slice(0,10);
function daysAgoISO(n){const d=new Date();d.setDate(d.getDate()-n);return d.toISOString().slice(0,10);}
function fmtDate(iso){return new Date(iso+'T00:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'});}
function fmtDateTime(){return new Date().toLocaleString(undefined,{weekday:'long',month:'long',day:'numeric',hour:'numeric',minute:'2-digit'});}
function escapeHtml(s){return (s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function clamp(n,a,b){return Math.max(a,Math.min(b,n));}

const QUOTES=[
  "Small steps, repeated daily, outrun sudden leaps.",
  "You don't rise to your goals, you fall to your systems.",
  "Discipline is choosing what you want most over what you want now.",
  "Progress is a spiral, not a line — trust the return.",
  "The version of you a year from now is built today.",
  "Rest is part of the work, not a break from it.",
  "Consistency turns intention into identity.",
  "Every habit is a vote for who you're becoming.",
];

/* ---------------- state ---------------- */
const State={
  theme:'dark',
  accent:'gold',
  view:'dashboard',
  user:{name:'Ashtu'},
  xp:0,
  onboarded:false,
  seenOnboarding:false,
  toasts:[],
  water:0, waterGoal:8,
  sleepHrs:0, sleepGoal:8,
  habits:[
    {id:uid(),name:'Morning meditation',icon:'🧘',color:'violet',freq:'daily',streak:6,best:11,history:mkHistory([0,1,2,3,4,6,7,8]),reminder:'7:00 AM'},
    {id:uid(),name:'Read 20 pages',icon:'📚',color:'gold',freq:'daily',streak:3,best:14,history:mkHistory([0,1,2,5,6]),reminder:'9:00 PM'},
    {id:uid(),name:'Strength workout',icon:'🏋️',color:'ember',freq:'3x/week',streak:1,best:5,history:mkHistory([0,3,6]),reminder:'6:30 AM'},
    {id:uid(),name:'No sugar',icon:'🍬',color:'teal',freq:'daily',streak:0,best:9,history:mkHistory([2,3,4,5]),reminder:null},
  ],
  goals:[
    {id:uid(),title:'Launch freelance web dev portfolio',category:'Career',priority:'High',deadline:daysAgoISO(-21),progress:62,milestones:[{t:'Design homepage',done:true},{t:'Collect 3 client testimonials',done:true},{t:'Publish case studies',done:false},{t:'Open for bookings',done:false}],notes:'Focus on local business outreach.'},
    {id:uid(),title:'Run a 10K',category:'Fitness',priority:'Medium',deadline:daysAgoISO(-60),progress:35,milestones:[{t:'Run 5K comfortably',done:true},{t:'Build to 7K',done:false},{t:'Race registration',done:false}],notes:''},
    {id:uid(),title:'Save an emergency fund',category:'Finance',priority:'High',deadline:daysAgoISO(-120),progress:48,milestones:[{t:'1 month expenses saved',done:true},{t:'3 months expenses saved',done:false}],notes:''},
  ],
  tasks:[
    {id:uid(),title:'Follow up with 3 restaurant leads',done:false,priority:'High',due:todayISO(),category:'Work'},
    {id:uid(),title:'Draft weekly review notes',done:false,priority:'Medium',due:todayISO(),category:'Personal'},
    {id:uid(),title:'Book physiotherapy session',done:true,priority:'Low',due:daysAgoISO(1),category:'Health'},
    {id:uid(),title:'Prep internship onboarding deck',done:false,priority:'High',due:daysAgoISO(-2),category:'Work'},
  ],
  journal:[
    {id:uid(),date:todayISO(),mood:'🙂',title:'Steady start',body:'Woke up early, meditation felt easier today. Want to keep the momentum going into the weekend.',type:'Daily'},
    {id:uid(),date:daysAgoISO(2),mood:'😄',title:'Good client call',body:'Landed a promising conversation with a new client. Grateful for the small wins.',type:'Gratitude'},
  ],
  moods:mkMoodHistory(),
  notes:[
    {id:uid(),title:'Portfolio site ideas',body:'Dark hero, case studies with before/after metrics, testimonials carousel.',tags:['work','ideas'],pinned:true,updated:todayISO()},
    {id:uid(),title:'Book list',body:'Atomic Habits (reread), Deep Work, The Almanack of Naval Ravikant.',tags:['learning'],pinned:false,updated:daysAgoISO(4)},
  ],
  focusSessions:mkFocusHistory(),
  focus:{mode:'focus',running:false,secondsLeft:25*60,totalSeconds:25*60,durations:{focus:25*60,short:5*60,long:15*60},ambient:'none',ambientOn:false},
  badges:[
    {id:'b1',name:'First Habit',ic:'🌱',earned:true},
    {id:'b2',name:'7-Day Streak',ic:'🔥',earned:true},
    {id:'b3',name:'Early Bird',ic:'🌅',earned:true},
    {id:'b4',name:'Goal Getter',ic:'🎯',earned:false},
    {id:'b5',name:'30-Day Streak',ic:'💎',earned:false},
    {id:'b6',name:'Journal Keeper',ic:'✍️',earned:true},
    {id:'b7',name:'Deep Focus x10',ic:'🎧',earned:false},
    {id:'b8',name:'Level 10',ic:'👑',earned:false},
  ],
};

function mkHistory(daysAgoArr){
  const set=new Set(daysAgoArr);
  const h={};
  for(let i=0;i<28;i++){ h[daysAgoISO(i)] = set.has(i); }
  return h;
}
function mkMoodHistory(){
  const emojis=['😄','🙂','😐','😔','😄','🙂','🙂'];
  const arr=[];
  for(let i=6;i>=0;i--){arr.push({date:daysAgoISO(i),emoji:emojis[6-i],energy:clamp(5+Math.round(Math.sin(i)*3),1,10),stress:clamp(5+Math.round(Math.cos(i)*3),1,10)});}
  return arr;
}
function mkFocusHistory(){
  const arr=[];
  for(let i=6;i>=0;i--){arr.push({date:daysAgoISO(i),minutes:Math.round(20+Math.random()*90)});}
  return arr;
}

/* ---------------- Supabase session & auto-save ---------------- */
State._userId = null;
State._userEmail = '';
State._loading = true;
let _dataSnapshot = null;
let _saveTimer = null;
let _saveInProgress = false;

function queueSave() {
  if (!State._userId) return;
  if (_saveTimer) clearTimeout(_saveTimer);
  _saveTimer = setTimeout(async () => {
    if (_saveInProgress) return;
    _saveInProgress = true;
    try {
      await saveAllUserData(State._userId, State);
    } catch (err) {
      console.error('Supabase save failed:', err);
    }
    _saveInProgress = false;
  }, 2000);
}

function checkForChangesAndSave() {
  if (!State._userId || State._loading) return;
  const snap = JSON.stringify({
    h: State.habits, g: State.goals, t: State.tasks,
    j: State.journal, m: State.moods, n: State.notes,
    fs: State.focusSessions, x: State.xp,
    w: State.water, sh: State.sleepHrs,
    wg: State.waterGoal, sg: State.sleepGoal,
    u: State.user, th: State.theme,
    a: State.accent, b: State.badges
  });
  if (snap === _dataSnapshot) return;
  _dataSnapshot = snap;
  queueSave();
}

function applyLoadedData(data) {
  if (data.profile) {
    State.user.name = data.profile.name || 'User';
    State.xp = data.profile.xp || 0;
    State.waterGoal = data.profile.water_goal || 8;
    State.sleepGoal = data.profile.sleep_goal || 8;
    State.theme = data.profile.theme || 'dark';
    State.accent = data.profile.accent || 'gold';
    State.water = data.profile.water ?? 0;
    State.sleepHrs = data.profile.sleep_hrs ?? 0;
    State.seenOnboarding = data.profile.seen_onboarding || false;
    if (data.profile.badges) {
      State.badges = typeof data.profile.badges === 'string'
        ? JSON.parse(data.profile.badges)
        : data.profile.badges;
    }
  }
  if (data.habits) State.habits = data.habits;
  if (data.goals) State.goals = data.goals;
  if (data.tasks) State.tasks = data.tasks;
  if (data.journal) State.journal = data.journal;
  if (data.moods) State.moods = data.moods;
  if (data.notes) State.notes = data.notes;
  if (data.focusSessions) State.focusSessions = data.focusSessions;
}

async function saveStateToSupabase() {
  if (!State._userId) return;
  try {
    await saveAllUserData(State._userId, State);
  } catch (err) {
    console.error('Supabase save failed:', err);
  }
}

function level(){return Math.floor(State.xp/200)+1;}
function xpIntoLevel(){return State.xp%200;}
function addXP(n,msg){
  const before=level();
  State.xp+=n;
  const after=level();
  if(msg) toast(msg,'sparkle');
  if(after>before){ toast(`Level up! You're now level ${after}`,'star'); confetti(); }
}

/* ---------------- toast ---------------- */
function toast(msg,ic='check'){
  const host=document.getElementById('toastHost');
  const el=document.createElement('div');
  el.className='toast';
  el.innerHTML=`<span style="color:var(--accent);display:flex;width:16px;height:16px">${icon(ic)}</span><span>${escapeHtml(msg)}</span>`;
  host.appendChild(el);
  setTimeout(()=>{el.style.transition='opacity .3s ease, transform .3s ease';el.style.opacity='0';el.style.transform='translateY(6px)';setTimeout(()=>el.remove(),320);},2600);
}

/* ---------------- confetti ---------------- */
function confetti(){
  const colors=['#5FCB6B','#2E8B4E','#7ED37A','#3FBF8F'];
  for(let i=0;i<28;i++){
    const p=document.createElement('div');
    p.className='confetti-piece';
    const size=6+Math.random()*6;
    p.style.width=size+'px';p.style.height=(size*0.4)+'px';
    p.style.left=(Math.random()*100)+'vw';
    p.style.background=colors[i%colors.length];
    p.style.animationDuration=(1.6+Math.random()*1.2)+'s';
    p.style.opacity='0.9';
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),3000);
  }
}

/* ---------------- render root ---------------- */
function render(){
  document.body.setAttribute('data-theme',State.theme);
  document.documentElement.style.setProperty('--accent', accentHex(State.accent));
  document.documentElement.style.setProperty('--accent-soft', accentHexSoft(State.accent));
  const app=document.getElementById('app');
  app.innerHTML = sidebarHTML() + mainHTML();
  bindGlobal();
  bindView();
  renderBottomNav();
  checkForChangesAndSave();
}
function accentHex(a){return {gold:'#5FCB6B',teal:'#3FBF8F',violet:'#7ED37A',ember:'#2E8B4E'}[a]||'#5FCB6B';}
function accentHexSoft(a){return {gold:'#9BE3A2',teal:'#86D9BB',violet:'#B7EAB4',ember:'#6FBE8B'}[a]||'#9BE3A2';}

const NAV=[
  {id:'dashboard',label:'Dashboard',icon:'dashboard'},
  {id:'habits',label:'Habits',icon:'habits'},
  {id:'goals',label:'Goals',icon:'goals'},
  {id:'planner',label:'Planner',icon:'planner'},
  {id:'focus',label:'Focus',icon:'focus'},
  {id:'journal',label:'Journal',icon:'journal'},
  {id:'mood',label:'Mood & Wellness',icon:'mood'},
  {id:'notes',label:'Notes',icon:'notes'},
  {id:'analytics',label:'Analytics',icon:'analytics'},
];

function sidebarHTML(){
  return `
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-mark">${icon('star')}</div>
      <div>
        <div class="brand-name">Ascent</div>
        <div class="brand-sub">Growth OS</div>
      </div>
    </div>
    <div class="nav-section-label">Overview</div>
    ${NAV.slice(0,1).map(navItem).join('')}
    <div class="nav-section-label">Grow</div>
    ${NAV.slice(1,7).map(navItem).join('')}
    <div class="nav-section-label">Reflect</div>
    ${NAV.slice(7).map(navItem).join('')}
    <div class="sidebar-footer">
      ${navItem({id:'settings',label:'Settings',icon:'settings'})}
      <div class="row" style="margin:4px 0 0;padding:10px;">
        <div class="avatar">${(State.user.name||'A')[0].toUpperCase()}</div>
        <div class="row-main">
          <div class="row-title">${escapeHtml(State.user.name)}</div>
          <div class="row-meta">Level ${level()} · ${State.xp} XP</div>
        </div>
      </div>
    </div>
  </aside>`;
}
function navItem(n){
  return `<button class="nav-item ${State.view===n.id?'active':''}" data-nav="${n.id}">${icon(n.icon)}<span>${n.label}</span></button>`;
}
function renderBottomNav(){
  let bn=document.querySelector('.bottom-nav');
  const items=['dashboard','habits','goals','focus','mood','settings'];
  const html=items.map(id=>{
    const n=[...NAV,{id:'settings',label:'Settings',icon:'settings'}].find(x=>x.id===id);
    return `<button class="bn-item ${State.view===id?'active':''}" data-nav="${id}">${icon(n.icon)}<span>${n.label.split(' ')[0]}</span></button>`;
  }).join('');
  if(!bn){bn=document.createElement('nav');bn.className='bottom-nav';document.body.appendChild(bn);}
  bn.innerHTML=html;
  bn.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>{State.view=b.dataset.nav;render();}));
}

function mainHTML(){
  const titles={dashboard:'Dashboard',habits:'Habits',goals:'Goals',planner:'Planner',focus:'Focus Center',journal:'Journal',mood:'Mood & Wellness',notes:'Notes',analytics:'Analytics',settings:'Settings'};
  return `
  <div class="main">
    <header class="topbar">
      <h1>${titles[State.view]}</h1>
      <div class="topbar-spacer"></div>
      <div class="search-trigger" id="openCmdk">${icon('search')}<span>Search everything…</span><span class="kbd">Ctrl K</span></div>
      <button class="icon-btn" id="themeToggle" aria-label="Toggle theme" title="Toggle theme">${icon(State.theme==='dark'?'sun':'moon')}</button>
      <button class="icon-btn" id="notifBtn" aria-label="Notifications" title="Notifications">${icon('bell')}</button>
      <div class="avatar" id="avatarBtn" title="${escapeHtml(State.user.name)}">${(State.user.name||'A')[0].toUpperCase()}</div>
    </header>
    <div class="view" id="viewRoot">${viewHTML()}</div>
  </div>`;
}

function viewHTML(){
  switch(State.view){
    case 'dashboard': return viewDashboard();
    case 'habits': return viewHabits();
    case 'goals': return viewGoals();
    case 'planner': return viewPlanner();
    case 'focus': return viewFocus();
    case 'journal': return viewJournal();
    case 'mood': return viewMood();
    case 'notes': return viewNotes();
    case 'analytics': return viewAnalytics();
    case 'settings': return viewSettings();
    default: return '';
  }
}

/* placeholders filled in by subsequent parts of the file */

/* ============================================================
   DASHBOARD
   ============================================================ */
function habitDoneToday(h){return !!h.history[todayISO()];}
function habitsDoneCount(){return State.habits.filter(habitDoneToday).length;}
function overallStreak(){
  let s=0;
  for(let i=0;i<60;i++){
    const d=daysAgoISO(i);
    const any=State.habits.some(h=>h.history[d]);
    if(any) s++; else break;
  }
  return s;
}
function goalsAvgProgress(){
  if(!State.goals.length) return 0;
  return Math.round(State.goals.reduce((a,g)=>a+g.progress,0)/State.goals.length);
}
function tasksToday(){return State.tasks.filter(t=>t.due===todayISO());}
function wellnessScore(){
  const w=clamp(Math.round((State.water/State.waterGoal)*100),0,100);
  const s=clamp(Math.round((State.sleepHrs/State.sleepGoal)*100),0,100);
  const lastMood=State.moods[State.moods.length-1];
  const m=lastMood? Math.round(((lastMood.energy+ (10-lastMood.stress))/20)*100) : 0;
  return Math.round((w+s+m)/3);
}
function productivityScore(){
  const t=State.tasks.length? Math.round(State.tasks.filter(t=>t.done).length/State.tasks.length*100) : 0;
  const h=State.habits.length? Math.round(habitsDoneCount()/State.habits.length*100) : 0;
  return Math.round((t+h)/2);
}
function dailyScore(){return Math.round((wellnessScore()+productivityScore()+goalsAvgProgress())/3);}

function ring(pct,size,stroke,label,num,gradId){
  const r=(size-stroke)/2, c=2*Math.PI*r;
  const off=c*(1-pct/100);
  return `<div class="ring-wrap" style="width:${size}px;height:${size}px;">
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs><linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--gold)"/><stop offset="100%" stop-color="var(--ember)"/>
      </linearGradient></defs>
      <circle class="ring-track" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${stroke}"/>
      <circle class="ring-fill" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${stroke}"
        stroke="url(#${gradId})" stroke-dasharray="${c}" stroke-dashoffset="${off}"/>
    </svg>
    <div class="ring-center"><div class="n">${num}</div><div class="l">${label}</div></div>
  </div>`;
}

function constellationStrip(){
  const pts=[];
  for(let i=6;i>=0;i--){
    const d=daysAgoISO(i);
    const done=State.habits.some(h=>h.history[d]);
    pts.push({d,done});
  }
  const w=560,h=90,pad=30;
  const step=(w-pad*2)/6;
  const coords=pts.map((p,idx)=>{
    const x=pad+step*idx;
    const y= 45 + Math.sin(idx*1.3)*18;
    return {...p,x,y};
  });
  let lines='';
  for(let i=0;i<coords.length-1;i++){
    const a=coords[i],b=coords[i+1];
    const lit=a.done&&b.done;
    lines+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${lit?'var(--gold)':'var(--line)'}" stroke-width="${lit?1.6:1}" />`;
  }
  let dots=coords.map(p=>`<g><circle cx="${p.x}" cy="${p.y}" r="${p.done?5:3.5}" fill="${p.done?'var(--gold)':'var(--surface-3)'}" stroke="${p.done?'var(--ember)':'transparent'}" stroke-width="1"/>
    <text x="${p.x}" y="${h-8}" text-anchor="middle" font-size="9.5" fill="var(--text-lo)" font-family="JetBrains Mono">${new Date(p.d+'T00:00:00').toLocaleDateString(undefined,{weekday:'narrow'})}</text></g>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}">${lines}${dots}</svg>`;
}

function coachTip(){
  const tips=[];
  const dt=tasksToday().filter(t=>!t.done).length;
  if(dt>0) tips.push(`You have ${dt} priorit${dt===1?'y':'ies'} left today — tackle the hardest one first while your focus is fresh.`);
  const undone=State.habits.filter(h=>!habitDoneToday(h));
  if(undone.length) tips.push(`"${undone[0].name}" is still open today. A 2-minute start is usually enough to keep the streak alive.`);
  if(State.water<State.waterGoal) tips.push(`You're at ${State.water}/${State.waterGoal} glasses of water — a good moment for a refill.`);
  if(!State.moods.some(m=>m.date===todayISO())) tips.push(`You haven't logged today's mood yet — it takes ten seconds and sharpens your weekly insights.`);
  if(!tips.length) tips.push(`Everything's on track today. Consider getting ahead on tomorrow, or take a real break — both count as progress.`);
  return tips[Math.floor(Math.random()*tips.length)] || tips[0];
}

function viewDashboard(){
  const h=new Date().getHours();
  const greet= h<12?'Good morning':h<18?'Good afternoon':'Good evening';
  const quote=QUOTES[new Date().getDate()%QUOTES.length];
  const dt=tasksToday();
  return `
  <div class="grid g-12" style="grid-template-columns:1fr;gap:18px;">
    <div class="card" style="display:flex;flex-wrap:wrap;align-items:center;gap:20px;justify-content:space-between;">
      <div>
        <div class="stat-sub mono">${fmtDateTime()}</div>
        <h2 style="font-size:26px;margin-top:4px;">${greet}, ${escapeHtml(State.user.name)}.</h2>
        <p style="color:var(--text-mid);font-size:14px;margin-top:8px;max-width:560px;font-style:italic;">"${quote}"</p>
      </div>
      <div style="display:flex;gap:22px;align-items:center;">
        ${ring(dailyScore(),108,9,'Daily Score',dailyScore(),'gradA')}
      </div>
    </div>
  </div>

  <div class="grid g-4" style="margin-top:18px;">
    <div class="card hoverable">
      <div class="card-title">Productivity</div>
      <div class="stat-num">${productivityScore()}<span style="font-size:16px;color:var(--text-lo);">%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${productivityScore()}%"></div></div>
    </div>
    <div class="card hoverable">
      <div class="card-title">Wellness</div>
      <div class="stat-num">${wellnessScore()}<span style="font-size:16px;color:var(--text-lo);">%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${wellnessScore()}%"></div></div>
    </div>
    <div class="card hoverable">
      <div class="card-title">Streak</div>
      <div class="stat-num" style="display:flex;align-items:center;gap:8px;">${overallStreak()}<span style="color:var(--ember);width:20px;">${icon('fire')}</span></div>
      <div class="stat-sub">days in a row with a habit done</div>
    </div>
    <div class="card hoverable">
      <div class="card-title">Level ${level()}</div>
      <div class="stat-num">${State.xp}<span style="font-size:14px;color:var(--text-lo);"> XP</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${(xpIntoLevel()/200*100)}%"></div></div>
    </div>
  </div>

  <div class="two-col" style="margin-top:18px;">
    <div class="card">
      <div class="card-flex"><div class="card-title">This week's constellation</div><span class="pill gold">${habitsDoneCount()}/${State.habits.length} today</span></div>
      ${constellationStrip()}
    </div>
    <div class="card" style="display:flex;flex-direction:column;">
      <div class="card-title" style="margin-bottom:10px;">AI coach</div>
      <p style="font-size:13.5px;line-height:1.55;color:var(--text-hi);flex:1;">${coachTip()}</p>
      <button class="btn btn-ghost btn-sm" style="margin-top:10px;align-self:flex-start;" id="newTipBtn">${icon('sparkle')} New suggestion</button>
    </div>
  </div>

  <div class="two-col" style="margin-top:18px;">
    <div class="card">
      <div class="card-flex">
        <div class="card-title">Today's priorities</div>
        <button class="btn btn-ghost btn-sm" data-nav="planner">Open planner</button>
      </div>
      ${dt.length? dt.slice(0,5).map(taskRow).join('') : emptyState('No tasks due today','Add one from the Planner to see it here.')}
    </div>
    <div class="card">
      <div class="card-flex">
        <div class="card-title">Habits</div>
        <button class="btn btn-ghost btn-sm" data-nav="habits">View all</button>
      </div>
      ${State.habits.slice(0,4).map(habitRowCompact).join('')}
    </div>
  </div>

  <div class="grid g-3" style="margin-top:18px;">
    <div class="card">
      <div class="card-flex"><div class="card-title">Water intake</div>${icon('droplet')}</div>
      <div class="stat-num">${State.water}<span style="font-size:14px;color:var(--text-lo);">/${State.waterGoal} glasses</span></div>
      <div style="display:flex;gap:6px;margin-top:10px;">
        <button class="btn-icon" id="waterMinus">−</button>
        <div class="progress-bar" style="flex:1;align-self:center;"><div class="progress-fill" style="width:${clamp(State.water/State.waterGoal*100,0,100)}%"></div></div>
        <button class="btn-icon" id="waterPlus">+</button>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Sleep last night</div>
      <div class="stat-num">${State.sleepHrs}<span style="font-size:14px;color:var(--text-lo);">h / ${State.sleepGoal}h goal</span></div>
      <input type="range" min="0" max="12" step="0.5" value="${State.sleepHrs}" id="sleepSlider" style="width:100%;margin-top:10px;">
    </div>
    <div class="card">
      <div class="card-flex"><div class="card-title">Goal progress</div>${icon('goals')}</div>
      <div class="stat-num">${goalsAvgProgress()}<span style="font-size:14px;color:var(--text-lo);">% avg</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${goalsAvgProgress()}%"></div></div>
    </div>
  </div>
  `;
}
function taskRow(t){
  return `<div class="row" data-task="${t.id}">
    <div class="check ${t.done?'done':''}" data-toggle-task="${t.id}">${icon('check')}</div>
    <div class="row-main">
      <div class="row-title ${t.done?'done':''}">${escapeHtml(t.title)}</div>
      <div class="row-meta"><span class="mono">${fmtDate(t.due)}</span><span class="tag">${t.category}</span></div>
    </div>
    <span class="pill ${t.priority==='High'?'ember':t.priority==='Medium'?'gold':'teal'}">${t.priority}</span>
  </div>`;
}
function habitRowCompact(h){
  const done=habitDoneToday(h);
  return `<div class="row">
    <div class="icon-badge" style="background:var(--surface-2);">${h.icon}</div>
    <div class="row-main">
      <div class="row-title">${escapeHtml(h.name)}</div>
      <div class="row-meta"><span>${icon('fire')}</span><span>${h.streak} day streak</span></div>
    </div>
    <div class="check ${done?'done':''}" data-toggle-habit="${h.id}">${icon('check')}</div>
  </div>`;
}
function emptyState(title,sub){
  return `<div class="empty">${icon('sparkle')}<div class="t">${escapeHtml(title)}</div><div>${escapeHtml(sub)}</div></div>`;
}

/* ============================================================
   HABITS
   ============================================================ */
function habitHeatmap(h){
  let cells='';
  for(let i=27;i>=0;i--){
    const d=daysAgoISO(i);
    const done=h.history[d];
    cells+=`<div class="heat-cell" data-lvl="${done?3:0}" title="${d}"></div>`;
  }
  return `<div class="heatmap">${cells}</div>`;
}
function viewHabits(){
  return `
  <div class="card-flex" style="margin-bottom:16px;">
    <div>
      <div class="stat-sub">${State.habits.length} habits · ${habitsDoneCount()} completed today</div>
    </div>
    <button class="btn btn-primary" id="addHabitBtn">${icon('plus')} New habit</button>
  </div>
  <div class="grid g-2">
    ${State.habits.length? State.habits.map(habitCard).join('') : `<div class="card">${emptyState('No habits yet','Add your first habit to start building your streak.')}</div>`}
  </div>`;
}
function habitCard(h){
  const done=habitDoneToday(h);
  const colorMap={gold:'gold',ember:'ember',teal:'teal',violet:'violet'};
  return `
  <div class="card hoverable">
    <div class="card-flex">
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="icon-badge" style="background:var(--surface-2);font-size:20px;">${h.icon}</div>
        <div>
          <div class="row-title">${escapeHtml(h.name)}</div>
          <div class="row-meta"><span class="pill ${colorMap[h.color]}">${h.freq}</span>${h.reminder?`<span class="mono">${h.reminder}</span>`:''}</div>
        </div>
      </div>
      <div class="check ${done?'done':''}" data-toggle-habit="${h.id}" style="width:30px;height:30px;">${icon('check')}</div>
    </div>
    <div style="display:flex;gap:18px;margin:14px 0 10px;">
      <div><div class="stat-num" style="font-size:20px;">${h.streak}</div><div class="stat-sub">current streak</div></div>
      <div><div class="stat-num" style="font-size:20px;">${h.best}</div><div class="stat-sub">best streak</div></div>
    </div>
    ${habitHeatmap(h)}
    <div style="display:flex;gap:8px;margin-top:14px;">
      <button class="btn btn-ghost btn-sm" data-edit-habit="${h.id}">${icon('edit')} Edit</button>
      <button class="btn btn-danger btn-sm" data-del-habit="${h.id}">${icon('trash')}</button>
    </div>
  </div>`;
}

/* ============================================================
   GOALS
   ============================================================ */
function viewGoals(){
  return `
  <div class="card-flex" style="margin-bottom:16px;">
    <div class="stat-sub">${State.goals.length} active goals · ${goalsAvgProgress()}% average progress</div>
    <button class="btn btn-primary" id="addGoalBtn">${icon('plus')} New goal</button>
  </div>
  <div class="grid g-2">
    ${State.goals.length? State.goals.map(goalCard).join('') : `<div class="card">${emptyState('No goals yet','Set your first SMART goal to get moving.')}</div>`}
  </div>`;
}
function daysUntil(iso){
  const diff=Math.ceil((new Date(iso+'T00:00:00')-new Date(todayISO()+'T00:00:00'))/86400000);
  return diff;
}
function goalCard(g){
  const du=daysUntil(g.deadline);
  const doneMs=g.milestones.filter(m=>m.done).length;
  return `
  <div class="card hoverable">
    <div class="card-flex">
      <div>
        <span class="pill violet">${g.category}</span>
        <span class="pill ${g.priority==='High'?'ember':g.priority==='Medium'?'gold':'teal'}">${g.priority}</span>
      </div>
      <span class="stat-sub mono">${du>=0?du+'d left':'overdue'}</span>
    </div>
    <h3 style="font-size:17px;margin:12px 0 8px;">${escapeHtml(g.title)}</h3>
    <div class="progress-bar"><div class="progress-fill" style="width:${g.progress}%"></div></div>
    <div class="stat-sub" style="margin-top:6px;">${g.progress}% complete · ${doneMs}/${g.milestones.length} milestones</div>
    <div class="divider"></div>
    ${g.milestones.map((m,i)=>`
      <div class="row" style="padding:8px 10px;margin-bottom:6px;">
        <div class="check ${m.done?'done':''}" style="width:20px;height:20px;" data-toggle-milestone="${g.id}:${i}">${icon('check')}</div>
        <div class="row-title ${m.done?'done':''}" style="font-size:13px;">${escapeHtml(m.t)}</div>
      </div>`).join('')}
    <div style="display:flex;gap:8px;margin-top:10px;">
      <button class="btn btn-ghost btn-sm" data-edit-goal="${g.id}">${icon('edit')} Edit</button>
      <button class="btn btn-danger btn-sm" data-del-goal="${g.id}">${icon('trash')}</button>
    </div>
  </div>`;
}

/* ============================================================
   PLANNER
   ============================================================ */
function viewPlanner(){
  const pending=State.tasks.filter(t=>!t.done).sort((a,b)=>a.due<b.due?-1:1);
  const done=State.tasks.filter(t=>t.done);
  return `
  <div class="card-flex" style="margin-bottom:16px;">
    <div class="stat-sub">${pending.length} open · ${done.length} completed</div>
    <button class="btn btn-primary" id="addTaskBtn">${icon('plus')} New task</button>
  </div>
  <div class="two-col">
    <div class="card">
      <div class="card-title" style="margin-bottom:10px;">To‑do</div>
      ${pending.length? pending.map(taskRowFull).join('') : emptyState('Nothing pending','Add a task to plan your day.')}
      ${done.length?`<div class="divider"></div><div class="card-title" style="margin-bottom:10px;">Completed</div>${done.map(taskRowFull).join('')}`:''}
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:10px;">By priority</div>
      ${['High','Medium','Low'].map(p=>{
        const items=State.tasks.filter(t=>t.priority===p && !t.done);
        return `<div style="margin-bottom:14px;">
          <div class="row-meta" style="margin-bottom:6px;"><span class="pill ${p==='High'?'ember':p==='Medium'?'gold':'teal'}">${p}</span><span>${items.length}</span></div>
          ${items.length? items.map(t=>`<div class="stat-sub" style="padding:4px 0;">• ${escapeHtml(t.title)}</div>`).join('') : `<div class="stat-sub" style="opacity:.6;">None</div>`}
        </div>`;
      }).join('')}
    </div>
  </div>`;
}
function taskRowFull(t){
  return `<div class="row">
    <div class="check ${t.done?'done':''}" data-toggle-task="${t.id}">${icon('check')}</div>
    <div class="row-main">
      <div class="row-title ${t.done?'done':''}">${escapeHtml(t.title)}</div>
      <div class="row-meta"><span class="mono">${fmtDate(t.due)}</span><span class="tag">${t.category}</span></div>
    </div>
    <span class="pill ${t.priority==='High'?'ember':t.priority==='Medium'?'gold':'teal'}">${t.priority}</span>
    <button class="btn-icon" data-del-task="${t.id}">${icon('trash')}</button>
  </div>`;
}

/* ============================================================
   FOCUS CENTER
   ============================================================ */
let focusTicker=null, audioCtx=null, ambientNodes=null;
function fmtClock(sec){const m=Math.floor(sec/60).toString().padStart(2,'0');const s=Math.floor(sec%60).toString().padStart(2,'0');return `${m}:${s}`;}
function viewFocus(){
  const f=State.focus;
  const pct=100-(f.secondsLeft/f.totalSeconds*100);
  const r=100,stroke=10,c2=2*Math.PI*(r-stroke/2);
  const off=c2*(1-pct/100);
  const totalMin=State.focusSessions.reduce((a,s)=>a+s.minutes,0);
  return `
  <div class="two-col">
    <div class="card" style="text-align:center;padding:36px 20px;">
      <div style="display:flex;gap:8px;justify-content:center;margin-bottom:26px;">
        ${['focus','short','long'].map(m=>`<button class="btn ${f.mode===m?'btn-primary':'btn-ghost'} btn-sm" data-focus-mode="${m}">${m==='focus'?'Focus 25':m==='short'?'Short break':'Long break'}</button>`).join('')}
      </div>
      <div class="timer-ring" style="position:relative;">
        <svg width="240" height="240" viewBox="0 0 240 240" style="transform:rotate(-90deg)">
          <circle cx="120" cy="120" r="${r-stroke/2}" fill="none" stroke="var(--line)" stroke-width="${stroke}"/>
          <circle cx="120" cy="120" r="${r-stroke/2}" fill="none" stroke="url(#gradA)" stroke-width="${stroke}" stroke-linecap="round"
            stroke-dasharray="${c2}" stroke-dashoffset="${off}" style="transition:stroke-dashoffset 1s linear"/>
          <defs><linearGradient id="gradA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--gold)"/><stop offset="100%" stop-color="var(--ember)"/></linearGradient></defs>
        </svg>
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <div class="mono" style="font-size:44px;font-weight:600;">${fmtClock(f.secondsLeft)}</div>
          <div class="stat-sub" style="margin-top:4px;text-transform:capitalize;">${f.mode==='focus'?'deep work':f.mode+' break'}</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:26px;">
        <button class="btn btn-primary" id="focusToggle">${icon(f.running?'pause':'play')} ${f.running?'Pause':'Start'}</button>
        <button class="btn btn-ghost" id="focusReset">${icon('reset')} Reset</button>
      </div>
      <div class="divider"></div>
      <div style="text-align:left;">
        <div class="card-title" style="margin-bottom:10px;">Ambient sound</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${['none','rain','waves','drone'].map(a=>`<button class="btn ${f.ambient===a?'btn-primary':'btn-ghost'} btn-sm" data-ambient="${a}">${a==='none'?'Off':a[0].toUpperCase()+a.slice(1)}</button>`).join('')}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:10px;">Session history</div>
      <div class="stat-num">${totalMin}<span style="font-size:14px;color:var(--text-lo);"> min this week</span></div>
      <div class="chart-bars" style="margin-top:16px;">
        ${State.focusSessions.map(s=>`<div class="chart-bar" style="height:${clamp(s.minutes/120*100,4,100)}%" title="${s.minutes} min"></div>`).join('')}
      </div>
      <div class="chart-labels">${State.focusSessions.map(s=>`<span>${new Date(s.date+'T00:00:00').toLocaleDateString(undefined,{weekday:'narrow'})}</span>`).join('')}</div>
      <div class="divider"></div>
      <div class="card-title" style="margin-bottom:10px;">Deep work mode</div>
      <p class="stat-sub" style="line-height:1.6;">Full-screen focus mode hides every panel but the timer. Website/app blockers connect via your OS or browser extension — placeholder for that integration lives here.</p>
      <button class="btn btn-ghost btn-sm" style="margin-top:10px;" id="deepWorkBtn">${icon('focus')} Enter full-screen focus</button>
    </div>
  </div>`;
}
function focusTick(){
  const f=State.focus;
  if(f.secondsLeft>0){
    f.secondsLeft--;
    const clockEl=document.querySelector('.timer-ring .mono');
    const ringEl=document.querySelector('.timer-ring circle:nth-child(2)');
    if(clockEl) clockEl.textContent=fmtClock(f.secondsLeft);
    if(ringEl){
      const r=95,c2=2*Math.PI*r,pct=100-(f.secondsLeft/f.totalSeconds*100);
      ringEl.setAttribute('stroke-dashoffset', c2*(1-pct/100));
    }
  } else {
    clearInterval(focusTicker); focusTicker=null; f.running=false;
    if(f.mode==='focus'){
      const mins=Math.round(f.totalSeconds/60);
      State.focusSessions.push({date:todayISO(),minutes:mins});
      addXP(30,`Focus session complete — +30 XP`);
      confetti();
    } else {
      toast('Break complete — ready to focus again?','sparkle');
    }
    render();
  }
}
function ensureAudio(){ if(!audioCtx){ try{audioCtx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){} } }
function stopAmbient(){ if(ambientNodes){ try{ambientNodes.forEach(n=>n.stop&&n.stop());}catch(e){} ambientNodes=null; } }
function startAmbient(kind){
  stopAmbient();
  if(kind==='none') return;
  ensureAudio(); if(!audioCtx) return;
  const nodes=[];
  if(kind==='drone'){
    const o=audioCtx.createOscillator(); const g=audioCtx.createGain();
    o.type='sine'; o.frequency.value=110; g.gain.value=0.03;
    o.connect(g); g.connect(audioCtx.destination); o.start(); nodes.push(o);
  } else {
    // simple filtered noise for rain / waves
    const bufferSize=2*audioCtx.sampleRate;
    const buffer=audioCtx.createBuffer(1,bufferSize,audioCtx.sampleRate);
    const data=buffer.getChannelData(0);
    for(let i=0;i<bufferSize;i++) data[i]=Math.random()*2-1;
    const noise=audioCtx.createBufferSource(); noise.buffer=buffer; noise.loop=true;
    const filter=audioCtx.createBiquadFilter();
    filter.type='lowpass'; filter.frequency.value= kind==='rain'?1600:500;
    const g=audioCtx.createGain(); g.gain.value= kind==='rain'?0.05:0.06;
    noise.connect(filter); filter.connect(g); g.connect(audioCtx.destination); noise.start(); nodes.push(noise);
  }
  ambientNodes=nodes;
}

/* ============================================================
   JOURNAL
   ============================================================ */
function viewJournal(){
  const entries=[...State.journal].sort((a,b)=>a.date<b.date?1:-1);
  return `
  <div class="card-flex" style="margin-bottom:16px;">
    <input type="text" placeholder="Search journal…" id="journalSearch" style="max-width:260px;">
    <button class="btn btn-primary" id="addJournalBtn">${icon('plus')} New entry</button>
  </div>
  <div id="journalList">${entries.length? entries.map(journalCard).join('') : emptyState('No entries yet','Write your first reflection.')}</div>`;
}
function journalCard(j){
  return `<div class="card" style="margin-bottom:14px;">
    <div class="card-flex">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:20px;">${j.mood}</span>
        <div>
          <div class="row-title">${escapeHtml(j.title)}</div>
          <div class="row-meta"><span class="mono">${fmtDate(j.date)}</span><span class="tag">${j.type}</span></div>
        </div>
      </div>
      <div style="display:flex;gap:6px;">
        <button class="btn-icon" data-edit-journal="${j.id}">${icon('edit')}</button>
        <button class="btn-icon" data-del-journal="${j.id}">${icon('trash')}</button>
      </div>
    </div>
    <p style="font-size:13.5px;line-height:1.6;margin-top:12px;color:var(--text-mid);">${escapeHtml(j.body)}</p>
  </div>`;
}

/* ============================================================
   MOOD & WELLNESS
   ============================================================ */
function viewMood(){
  const last=State.moods[State.moods.length-1];
  return `
  <div class="two-col">
    <div class="card">
      <div class="card-title" style="margin-bottom:12px;">How are you feeling right now?</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px;">
        ${['😄','🙂','😐','😔','😣'].map(e=>`<button class="btn ${last&&last.emoji===e&&last.date===todayISO()?'btn-primary':'btn-ghost'}" style="font-size:20px;" data-mood-emoji="${e}">${e}</button>`).join('')}
      </div>
      <div class="field">
        <label>Energy level</label>
        <input type="range" min="1" max="10" value="${last?last.energy:5}" id="energyRange">
      </div>
      <div class="field">
        <label>Stress level</label>
        <input type="range" min="1" max="10" value="${last?last.stress:5}" id="stressRange">
      </div>
      <div class="field">
        <label>Notes (optional)</label>
        <textarea id="moodNote" placeholder="What's driving today's mood?"></textarea>
      </div>
      <button class="btn btn-primary" id="saveMoodBtn">${icon('check')} Log mood</button>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:12px;">7-day trend</div>
      <div class="chart-bars">
        ${State.moods.map(m=>`<div class="chart-bar" style="height:${m.energy*10}%" title="Energy ${m.energy}"></div>`).join('')}
      </div>
      <div class="chart-labels">${State.moods.map(m=>`<span>${m.emoji}</span>`).join('')}</div>
      <div class="divider"></div>
      <div class="card-title" style="margin-bottom:8px;">Meditation & mindfulness</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" data-nav="focus">${icon('focus')} Guided breathing (via Focus)</button>
      </div>
      <p class="stat-sub" style="margin-top:10px;">Daily affirmation: <em>"${QUOTES[(new Date().getDate()+3)%QUOTES.length]}"</em></p>
    </div>
  </div>
  <div class="grid g-3" style="margin-top:18px;">
    <div class="card">
      <div class="card-flex"><div class="card-title">Water</div>${icon('droplet')}</div>
      <div class="stat-num">${State.water}/${State.waterGoal}</div>
      <div style="display:flex;gap:6px;margin-top:10px;"><button class="btn-icon" id="waterMinus2">−</button><div class="progress-bar" style="flex:1;align-self:center;"><div class="progress-fill" style="width:${clamp(State.water/State.waterGoal*100,0,100)}%"></div></div><button class="btn-icon" id="waterPlus2">+</button></div>
    </div>
    <div class="card">
      <div class="card-title">Sleep</div>
      <div class="stat-num">${State.sleepHrs}h</div>
      <input type="range" min="0" max="12" step="0.5" value="${State.sleepHrs}" id="sleepSlider2" style="width:100%;margin-top:10px;">
    </div>
    <div class="card">
      <div class="card-title">Wellness score</div>
      <div class="stat-num">${wellnessScore()}%</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${wellnessScore()}%"></div></div>
    </div>
  </div>`;
}

/* ============================================================
   NOTES
   ============================================================ */
function viewNotes(){
  const pinned=State.notes.filter(n=>n.pinned);
  const rest=State.notes.filter(n=>!n.pinned);
  return `
  <div class="card-flex" style="margin-bottom:16px;">
    <input type="text" placeholder="Search notes…" id="notesSearch" style="max-width:260px;">
    <button class="btn btn-primary" id="addNoteBtn">${icon('plus')} New note</button>
  </div>
  ${pinned.length?`<div class="card-title" style="margin-bottom:10px;">Pinned</div><div class="grid g-3" style="margin-bottom:20px;">${pinned.map(noteCard).join('')}</div>`:''}
  <div class="card-title" style="margin-bottom:10px;">All notes</div>
  <div class="grid g-3" id="notesGrid">${rest.length? rest.map(noteCard).join('') : (pinned.length?'':emptyState('No notes yet','Capture your first idea.'))}</div>`;
}
function noteCard(n){
  return `<div class="card hoverable">
    <div class="card-flex">
      <div class="row-title">${escapeHtml(n.title)}</div>
      <button class="btn-icon" data-pin-note="${n.id}" style="color:${n.pinned?'var(--accent)':''}">${icon('pin')}</button>
    </div>
    <p class="stat-sub" style="margin:8px 0 10px;line-height:1.5;">${escapeHtml(n.body).slice(0,140)}${n.body.length>140?'…':''}</p>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">${n.tags.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost btn-sm" data-edit-note="${n.id}">${icon('edit')} Edit</button>
      <button class="btn btn-danger btn-sm" data-del-note="${n.id}">${icon('trash')}</button>
    </div>
  </div>`;
}

/* ============================================================
   ANALYTICS
   ============================================================ */
function viewAnalytics(){
  const habitRate=State.habits.length? Math.round(State.habits.reduce((a,h)=>{
    let done=0; for(let i=0;i<7;i++) if(h.history[daysAgoISO(i)]) done++;
    return a+done/7;
  },0)/State.habits.length*100):0;
  return `
  <div class="grid g-4">
    <div class="card"><div class="card-title">Habit completion (7d)</div><div class="stat-num">${habitRate}%</div></div>
    <div class="card"><div class="card-title">Goal progress</div><div class="stat-num">${goalsAvgProgress()}%</div></div>
    <div class="card"><div class="card-title">Focus (7d)</div><div class="stat-num">${State.focusSessions.reduce((a,s)=>a+s.minutes,0)}<span style="font-size:13px;color:var(--text-lo);">m</span></div></div>
    <div class="card"><div class="card-title">Journal entries</div><div class="stat-num">${State.journal.length}</div></div>
  </div>
  <div class="two-col" style="margin-top:18px;">
    <div class="card">
      <div class="card-title" style="margin-bottom:12px;">Mood & energy (7d)</div>
      <div class="chart-bars">${State.moods.map(m=>`<div class="chart-bar" style="height:${m.energy*10}%"></div>`).join('')}</div>
      <div class="chart-labels">${State.moods.map(m=>`<span>${fmtDate(m.date).split(' ')[1]}</span>`).join('')}</div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:12px;">Focus minutes (7d)</div>
      <div class="chart-bars">${State.focusSessions.map(s=>`<div class="chart-bar" style="height:${clamp(s.minutes/120*100,4,100)}%"></div>`).join('')}</div>
      <div class="chart-labels">${State.focusSessions.map(s=>`<span>${fmtDate(s.date).split(' ')[1]}</span>`).join('')}</div>
    </div>
  </div>
  <div class="card" style="margin-top:18px;">
    <div class="card-title" style="margin-bottom:14px;">Habit heatmaps</div>
    ${State.habits.map(h=>`<div style="margin-bottom:16px;"><div class="row-meta" style="margin-bottom:6px;">${h.icon} ${escapeHtml(h.name)}</div>${habitHeatmap(h)}</div>`).join('')}
  </div>
  <div class="card" style="margin-top:18px;">
    <div class="card-flex"><div class="card-title">AI insight</div>${icon('sparkle')}</div>
    <p style="font-size:13.5px;line-height:1.6;margin-top:8px;">${analyticsInsight(habitRate)}</p>
  </div>`;
}
function analyticsInsight(habitRate){
  if(habitRate>=80) return "You're completing the vast majority of your habits this week — this is exactly the kind of consistency that compounds. Consider raising the bar on one habit.";
  if(habitRate>=50) return "You're keeping pace on about half your habits. Look at which ones keep slipping — reducing friction (smaller version of the habit, better reminder time) usually helps more than willpower.";
  return "Habit completion has dipped this week. That's normal after a busy stretch — pick your single most important habit and protect just that one until momentum returns.";
}

/* ============================================================
   SETTINGS
   ============================================================ */
function viewSettings(){
  return `
  <div class="two-col">
    <div class="card">
      <div class="card-title" style="margin-bottom:14px;">Profile</div>
      <div class="field"><label>Display name</label><input type="text" id="settingsName" value="${escapeHtml(State.user.name)}"></div>
      <div class="field-row">
        <div class="field"><label>Water goal (glasses/day)</label><input type="number" id="settingsWaterGoal" value="${State.waterGoal}" min="1" max="16"></div>
        <div class="field"><label>Sleep goal (hours)</label><input type="number" id="settingsSleepGoal" value="${State.sleepGoal}" min="1" max="12" step="0.5"></div>
      </div>
      <button class="btn btn-primary btn-sm" id="saveProfileBtn">Save changes</button>
      <div class="divider"></div>
      <div class="card-title" style="margin-bottom:12px;">Account</div>
      <div class="row"><div class="row-main"><div class="row-title">Email</div><div class="row-meta mono">${escapeHtml(State._userEmail)}</div></div></div>
      <button class="btn btn-danger btn-sm" id="signOutBtn" style="margin-top:8px;">Sign out</button>
      <div class="divider"></div>
      <div class="card-title" style="margin-bottom:12px;">Appearance</div>
      <div class="row" style="justify-content:space-between;">
        <div class="row-main"><div class="row-title">Theme</div><div class="row-meta">Dark or light interface</div></div>
        <div class="switch ${State.theme==='dark'?'on':''}" id="themeSwitch"></div>
      </div>
      <div style="margin-top:14px;">
        <label>Accent color</label>
        <div style="display:flex;gap:10px;">
          ${['gold','teal','violet','ember'].map(a=>`<div class="accent-dot ${State.accent===a?'sel':''}" data-accent="${a}" style="background:${accentHex(a)}"></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:14px;">Notifications</div>
      ${['Habit reminders','Goal deadlines','Journal prompts','Water reminders','Bedtime reminder'].map(n=>`
        <div class="row" style="justify-content:space-between;"><div class="row-title" style="font-size:13.5px;">${n}</div><div class="switch on" data-notif-toggle></div></div>
      `).join('')}
      <div class="divider"></div>
      <div class="card-title" style="margin-bottom:12px;">Data</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" id="exportBtn">Export data (.json)</button>
        <label class="btn btn-ghost btn-sm" style="cursor:pointer;">Import data<input type="file" id="importFile" accept="application/json" style="display:none;"></label>
        <button class="btn btn-danger btn-sm" id="resetBtn">Reset all data</button>
      </div>
      <div class="divider"></div>
      <div class="card-title" style="margin-bottom:12px;">Achievements</div>
      <div class="badge-grid">
        ${State.badges.map(b=>`<div class="badge ${b.earned?'':'locked'}"><div class="ic">${b.ic}</div><div class="n">${b.name}</div></div>`).join('')}
      </div>
      <div class="divider"></div>
      <p class="stat-sub" style="line-height:1.6;">Language, privacy, security and help center are placeholders in this preview build. Ask me to wire up any of these next.</p>
    </div>
  </div>`;
}

/* ============================================================
   MODAL SYSTEM
   ============================================================ */
function openModal(title,bodyHTML,onMount){
  const host=document.getElementById('modalHost');
  host.innerHTML=`<div class="modal-backdrop" id="modalBackdrop">
    <div class="modal">
      <div class="modal-head"><h3>${title}</h3><button class="icon-btn" id="modalClose">${icon('x')}</button></div>
      <div id="modalBody">${bodyHTML}</div>
    </div>
  </div>`;
  document.getElementById('modalClose').onclick=closeModal;
  document.getElementById('modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')closeModal();});
  if(onMount) onMount(document.getElementById('modalBody'));
}
function closeModal(){ document.getElementById('modalHost').innerHTML=''; }

function modalHabitForm(existing){
  const h=existing||{name:'',icon:'✨',freq:'daily',color:'gold',reminder:''};
  return `
    <div class="field"><label>Habit name</label><input type="text" id="mHabitName" value="${escapeHtml(h.name)}" placeholder="e.g. Drink water first thing"></div>
    <div class="field-row">
      <div class="field"><label>Icon (emoji)</label><input type="text" id="mHabitIcon" value="${h.icon}" maxlength="2"></div>
      <div class="field"><label>Frequency</label>
        <select id="mHabitFreq"><option ${h.freq==='daily'?'selected':''}>daily</option><option ${h.freq==='3x/week'?'selected':''}>3x/week</option><option ${h.freq==='weekly'?'selected':''}>weekly</option></select>
      </div>
    </div>
    <div class="field-row">
      <div class="field"><label>Color</label>
        <select id="mHabitColor">${['gold','ember','teal','violet'].map(c=>`<option value="${c}" ${h.color===c?'selected':''}>${c}</option>`).join('')}</select>
      </div>
      <div class="field"><label>Reminder time (optional)</label><input type="text" id="mHabitReminder" value="${h.reminder||''}" placeholder="7:00 AM"></div>
    </div>
    <button class="btn btn-primary" style="width:100%;" id="mHabitSave">${existing?'Save changes':'Create habit'}</button>`;
}
function openHabitModal(id){
  const existing=id? State.habits.find(h=>h.id===id):null;
  openModal(existing?'Edit habit':'New habit', modalHabitForm(existing), body=>{
    body.querySelector('#mHabitSave').onclick=()=>{
      const name=body.querySelector('#mHabitName').value.trim();
      if(!name) return toast('Give your habit a name');
      const data={name,icon:body.querySelector('#mHabitIcon').value||'✨',freq:body.querySelector('#mHabitFreq').value,color:body.querySelector('#mHabitColor').value,reminder:body.querySelector('#mHabitReminder').value};
      if(existing){ Object.assign(existing,data); toast('Habit updated'); }
      else { State.habits.push({id:uid(),...data,streak:0,best:0,history:{}}); addXP(10,'New habit created — +10 XP'); }
      closeModal(); render();
    };
  });
}

function modalGoalForm(existing){
  const g=existing||{title:'',category:'Career',priority:'Medium',deadline:daysAgoISO(-30),notes:''};
  return `
    <div class="field"><label>Goal title</label><input type="text" id="mGoalTitle" value="${escapeHtml(g.title)}" placeholder="e.g. Launch my website"></div>
    <div class="field-row">
      <div class="field"><label>Category</label><input type="text" id="mGoalCat" value="${escapeHtml(g.category)}"></div>
      <div class="field"><label>Priority</label>
        <select id="mGoalPriority">${['High','Medium','Low'].map(p=>`<option ${g.priority===p?'selected':''}>${p}</option>`).join('')}</select>
      </div>
    </div>
    <div class="field"><label>Deadline</label><input type="date" id="mGoalDeadline" value="${g.deadline}"></div>
    <div class="field"><label>Notes</label><textarea id="mGoalNotes">${escapeHtml(g.notes||'')}</textarea></div>
    <button class="btn btn-primary" style="width:100%;" id="mGoalSave">${existing?'Save changes':'Create goal'}</button>`;
}
function openGoalModal(id){
  const existing=id? State.goals.find(g=>g.id===id):null;
  openModal(existing?'Edit goal':'New goal', modalGoalForm(existing), body=>{
    body.querySelector('#mGoalSave').onclick=()=>{
      const title=body.querySelector('#mGoalTitle').value.trim();
      if(!title) return toast('Give your goal a title');
      const data={title,category:body.querySelector('#mGoalCat').value||'General',priority:body.querySelector('#mGoalPriority').value,deadline:body.querySelector('#mGoalDeadline').value,notes:body.querySelector('#mGoalNotes').value};
      if(existing){ Object.assign(existing,data); toast('Goal updated'); }
      else { State.goals.push({id:uid(),...data,progress:0,milestones:[{t:'Define first milestone',done:false}]}); addXP(15,'New goal set — +15 XP'); }
      closeModal(); render();
    };
  });
}

function modalTaskForm(){
  return `
    <div class="field"><label>Task</label><input type="text" id="mTaskTitle" placeholder="What needs doing?"></div>
    <div class="field-row">
      <div class="field"><label>Priority</label><select id="mTaskPriority"><option>Medium</option><option>High</option><option>Low</option></select></div>
      <div class="field"><label>Due date</label><input type="date" id="mTaskDue" value="${todayISO()}"></div>
    </div>
    <div class="field"><label>Category</label><input type="text" id="mTaskCategory" value="Personal"></div>
    <button class="btn btn-primary" style="width:100%;" id="mTaskSave">Add task</button>`;
}
function openTaskModal(){
  openModal('New task', modalTaskForm(), body=>{
    body.querySelector('#mTaskSave').onclick=()=>{
      const title=body.querySelector('#mTaskTitle').value.trim();
      if(!title) return toast('Give the task a title');
      State.tasks.push({id:uid(),title,done:false,priority:body.querySelector('#mTaskPriority').value,due:body.querySelector('#mTaskDue').value,category:body.querySelector('#mTaskCategory').value||'General'});
      closeModal(); render(); toast('Task added');
    };
  });
}

function modalJournalForm(existing){
  const j=existing||{title:'',mood:'🙂',type:'Daily',body:''};
  return `
    <div class="field"><label>Title</label><input type="text" id="mJTitle" value="${escapeHtml(j.title)}" placeholder="Give today a headline"></div>
    <div class="field-row">
      <div class="field"><label>Mood</label>
        <select id="mJMood">${['😄','🙂','😐','😔','😣'].map(e=>`<option ${j.mood===e?'selected':''}>${e}</option>`).join('')}</select>
      </div>
      <div class="field"><label>Type</label>
        <select id="mJType">${['Daily','Gratitude','Reflection','Morning','Evening'].map(t=>`<option ${j.type===t?'selected':''}>${t}</option>`).join('')}</select>
      </div>
    </div>
    <div class="field"><label>Entry</label><textarea id="mJBody" style="min-height:120px;" placeholder="Write freely…">${escapeHtml(j.body)}</textarea></div>
    <button class="btn btn-primary" style="width:100%;" id="mJSave">${existing?'Save changes':'Save entry'}</button>`;
}
function openJournalModal(id){
  const existing=id? State.journal.find(j=>j.id===id):null;
  openModal(existing?'Edit entry':'New journal entry', modalJournalForm(existing), body=>{
    body.querySelector('#mJSave').onclick=()=>{
      const title=body.querySelector('#mJTitle').value.trim()||'Untitled entry';
      const data={title,mood:body.querySelector('#mJMood').value,type:body.querySelector('#mJType').value,body:body.querySelector('#mJBody').value};
      if(existing){ Object.assign(existing,data); toast('Entry updated'); }
      else { State.journal.push({id:uid(),date:todayISO(),...data}); addXP(15,'Journal entry saved — +15 XP'); }
      closeModal(); render();
    };
  });
}

function modalNoteForm(existing){
  const n=existing||{title:'',body:'',tags:''};
  return `
    <div class="field"><label>Title</label><input type="text" id="mNTitle" value="${escapeHtml(n.title)}"></div>
    <div class="field"><label>Content</label><textarea id="mNBody" style="min-height:120px;">${escapeHtml(n.body)}</textarea></div>
    <div class="field"><label>Tags (comma separated)</label><input type="text" id="mNTags" value="${Array.isArray(n.tags)?n.tags.join(', '):(n.tags||'')}"></div>
    <button class="btn btn-primary" style="width:100%;" id="mNSave">${existing?'Save changes':'Add note'}</button>`;
}
function openNoteModal(id){
  const existing=id? State.notes.find(n=>n.id===id):null;
  openModal(existing?'Edit note':'New note', modalNoteForm(existing), body=>{
    body.querySelector('#mNSave').onclick=()=>{
      const title=body.querySelector('#mNTitle').value.trim()||'Untitled';
      const tags=body.querySelector('#mNTags').value.split(',').map(t=>t.trim()).filter(Boolean);
      const data={title,body:body.querySelector('#mNBody').value,tags};
      if(existing){ Object.assign(existing,data); toast('Note updated'); }
      else { State.notes.push({id:uid(),...data,pinned:false,updated:todayISO()}); }
      closeModal(); render();
    };
  });
}

/* ============================================================
   COMMAND PALETTE
   ============================================================ */
function searchIndex(){
  const items=[];
  NAV.concat([{id:'settings',label:'Settings',icon:'settings'}]).forEach(n=>items.push({group:'Go to',label:n.label,sub:'Page',action:()=>{State.view=n.id;render();}}));
  State.habits.forEach(h=>items.push({group:'Habits',label:h.name,sub:h.freq,action:()=>{State.view='habits';render();}}));
  State.goals.forEach(g=>items.push({group:'Goals',label:g.title,sub:g.category,action:()=>{State.view='goals';render();}}));
  State.tasks.forEach(t=>items.push({group:'Tasks',label:t.title,sub:t.priority,action:()=>{State.view='planner';render();}}));
  State.journal.forEach(j=>items.push({group:'Journal',label:j.title,sub:fmtDate(j.date),action:()=>{State.view='journal';render();}}));
  State.notes.forEach(n=>items.push({group:'Notes',label:n.title,sub:(n.tags||[]).join(', '),action:()=>{State.view='notes';render();}}));
  items.push({group:'Actions',label:'Add new habit',sub:'⌘',action:()=>{State.view='habits';render();setTimeout(()=>openHabitModal(),50);}});
  items.push({group:'Actions',label:'Add new goal',sub:'⌘',action:()=>{State.view='goals';render();setTimeout(()=>openGoalModal(),50);}});
  items.push({group:'Actions',label:'Add new task',sub:'⌘',action:()=>{State.view='planner';render();setTimeout(()=>openTaskModal(),50);}});
  items.push({group:'Actions',label:'Write journal entry',sub:'⌘',action:()=>{State.view='journal';render();setTimeout(()=>openJournalModal(),50);}});
  items.push({group:'Actions',label:'Toggle theme',sub:'⌘',action:toggleTheme});
  return items;
}
let cmdkSel=0;
function openCmdk(){
  const host=document.getElementById('cmdkHost');
  host.innerHTML=`<div class="cmdk-backdrop" id="cmdkBackdrop">
    <div class="cmdk">
      <div class="cmdk-input">${icon('search')}<input type="text" id="cmdkInput" placeholder="Search goals, habits, notes, journal, tasks…" autocomplete="off"></div>
      <div class="cmdk-list" id="cmdkList"></div>
    </div>
  </div>`;
  cmdkSel=0;
  const input=document.getElementById('cmdkInput');
  input.focus();
  renderCmdkList('');
  input.addEventListener('input',()=>renderCmdkList(input.value));
  input.addEventListener('keydown',e=>{
    const list=document.querySelectorAll('.cmdk-item');
    if(e.key==='ArrowDown'){e.preventDefault();cmdkSel=Math.min(cmdkSel+1,list.length-1);highlightCmdk();}
    else if(e.key==='ArrowUp'){e.preventDefault();cmdkSel=Math.max(cmdkSel-1,0);highlightCmdk();}
    else if(e.key==='Enter'){e.preventDefault();list[cmdkSel]&&list[cmdkSel].click();}
    else if(e.key==='Escape'){closeCmdk();}
  });
  document.getElementById('cmdkBackdrop').addEventListener('click',e=>{if(e.target.id==='cmdkBackdrop')closeCmdk();});
}
function highlightCmdk(){
  document.querySelectorAll('.cmdk-item').forEach((el,i)=>el.classList.toggle('sel',i===cmdkSel));
  const sel=document.querySelector('.cmdk-item.sel'); if(sel) sel.scrollIntoView({block:'nearest'});
}
function renderCmdkList(q){
  const all=searchIndex();
  const filtered= q.trim()? all.filter(i=>i.label.toLowerCase().includes(q.toLowerCase())) : all.slice(0,20);
  const groups={};
  filtered.forEach(i=>{(groups[i.group]=groups[i.group]||[]).push(i);});
  const list=document.getElementById('cmdkList');
  let idx=0;
  list.innerHTML= Object.keys(groups).length? Object.entries(groups).map(([g,items])=>`
    <div class="cmdk-group">${g}</div>
    ${items.map(i=>{const html=`<div class="cmdk-item" data-idx="${idx}"><span class="t">${escapeHtml(i.label)}</span><span class="s">${escapeHtml(i.sub||'')}</span></div>`;idx++;return html;}).join('')}
  `).join('') : `<div class="empty" style="padding:30px;">${icon('search')}<div class="t">No matches</div></div>`;
  const flatItems=Object.values(groups).flat();
  list.querySelectorAll('.cmdk-item').forEach((el,i)=>{
    el.addEventListener('click',()=>{ flatItems[i].action(); closeCmdk(); });
  });
  cmdkSel=0; highlightCmdk();
}
function closeCmdk(){ document.getElementById('cmdkHost').innerHTML=''; }

/* ============================================================
   THEME / GLOBAL ACTIONS
   ============================================================ */
function toggleTheme(){ State.theme=State.theme==='dark'?'light':'dark'; render(); }

/* ============================================================
   EVENT BINDING
   ============================================================ */
function bindGlobal(){
  document.querySelectorAll('[data-nav]').forEach(el=>el.addEventListener('click',()=>{State.view=el.dataset.nav;render();}));
  const t=document.getElementById('themeToggle'); if(t) t.onclick=toggleTheme;
  const oc=document.getElementById('openCmdk'); if(oc) oc.onclick=openCmdk;
  const nb=document.getElementById('notifBtn'); if(nb) nb.onclick=()=>toast('You\'re all caught up — no new notifications.','bell');
  const av=document.getElementById('avatarBtn'); if(av) av.onclick=()=>{State.view='settings';render();};
  const fab=document.getElementById('fabBtn'); if(fab){ fab.innerHTML=icon('plus'); fab.onclick=quickAdd; }
}
function quickAdd(){
  const map={habits:openHabitModal,goals:openGoalModal,planner:openTaskModal,journal:openJournalModal,notes:openNoteModal};
  (map[State.view]||openTaskModal)();
}
function bindView(){
  // habit toggles
  document.querySelectorAll('[data-toggle-habit]').forEach(el=>el.addEventListener('click',()=>{
    const h=State.habits.find(x=>x.id===el.dataset.toggleHabit);
    const d=todayISO();
    const wasDone=!!h.history[d];
    h.history[d]=!wasDone;
    if(!wasDone){ h.streak++; h.best=Math.max(h.best,h.streak); addXP(10,`"${h.name}" complete — +10 XP`); }
    else { h.streak=Math.max(0,h.streak-1); }
    render();
  }));
  document.querySelectorAll('[data-edit-habit]').forEach(el=>el.onclick=()=>openHabitModal(el.dataset.editHabit));
  document.querySelectorAll('[data-del-habit]').forEach(el=>el.onclick=()=>{State.habits=State.habits.filter(h=>h.id!==el.dataset.delHabit);render();toast('Habit removed');});
  const addH=document.getElementById('addHabitBtn'); if(addH) addH.onclick=()=>openHabitModal();

  // goal
  document.querySelectorAll('[data-toggle-milestone]').forEach(el=>el.addEventListener('click',()=>{
    const [gid,idx]=el.dataset.toggleMilestone.split(':');
    const g=State.goals.find(x=>x.id===gid);
    g.milestones[idx].done=!g.milestones[idx].done;
    g.progress=Math.round(g.milestones.filter(m=>m.done).length/g.milestones.length*100);
    if(g.progress===100) addXP(40,`Goal "${g.title}" complete! +40 XP`);
    render();
  }));
  document.querySelectorAll('[data-edit-goal]').forEach(el=>el.onclick=()=>openGoalModal(el.dataset.editGoal));
  document.querySelectorAll('[data-del-goal]').forEach(el=>el.onclick=()=>{State.goals=State.goals.filter(g=>g.id!==el.dataset.delGoal);render();toast('Goal removed');});
  const addG=document.getElementById('addGoalBtn'); if(addG) addG.onclick=()=>openGoalModal();

  // tasks
  document.querySelectorAll('[data-toggle-task]').forEach(el=>el.addEventListener('click',()=>{
    const t=State.tasks.find(x=>x.id===el.dataset.toggleTask);
    t.done=!t.done;
    if(t.done) addXP(8,'Task complete — +8 XP');
    render();
  }));
  document.querySelectorAll('[data-del-task]').forEach(el=>el.onclick=()=>{State.tasks=State.tasks.filter(t=>t.id!==el.dataset.delTask);render();});
  const addT=document.getElementById('addTaskBtn'); if(addT) addT.onclick=openTaskModal;

  // dashboard widgets
  bindNum('waterMinus',()=>{State.water=clamp(State.water-1,0,20);render();});
  bindNum('waterPlus',()=>{State.water=clamp(State.water+1,0,20);addXP(2);render();});
  bindNum('waterMinus2',()=>{State.water=clamp(State.water-1,0,20);render();});
  bindNum('waterPlus2',()=>{State.water=clamp(State.water+1,0,20);addXP(2);render();});
  const sl=document.getElementById('sleepSlider'); if(sl) sl.addEventListener('change',()=>{State.sleepHrs=parseFloat(sl.value);render();});
  const sl2=document.getElementById('sleepSlider2'); if(sl2) sl2.addEventListener('change',()=>{State.sleepHrs=parseFloat(sl2.value);render();});
  const tipBtn=document.getElementById('newTipBtn'); if(tipBtn) tipBtn.onclick=render;

  // focus center
  document.querySelectorAll('[data-focus-mode]').forEach(el=>el.onclick=()=>{
    const f=State.focus; f.mode=el.dataset.focusMode; f.totalSeconds=f.durations[f.mode]; f.secondsLeft=f.totalSeconds; f.running=false;
    clearInterval(focusTicker); focusTicker=null; render();
  });
  const ft=document.getElementById('focusToggle'); if(ft) ft.onclick=()=>{
    const f=State.focus; f.running=!f.running;
    if(f.running){ focusTicker=setInterval(focusTick,1000); } else { clearInterval(focusTicker); focusTicker=null; }
    render();
  };
  const fr=document.getElementById('focusReset'); if(fr) fr.onclick=()=>{
    const f=State.focus; clearInterval(focusTicker); focusTicker=null; f.running=false; f.secondsLeft=f.totalSeconds; render();
  };
  document.querySelectorAll('[data-ambient]').forEach(el=>el.onclick=()=>{
    State.focus.ambient=el.dataset.ambient; startAmbient(State.focus.ambient); render();
  });
  const dw=document.getElementById('deepWorkBtn'); if(dw) dw.onclick=()=>{
    const el=document.documentElement;
    if(el.requestFullscreen) el.requestFullscreen().catch(()=>toast('Full-screen not available in this preview window'));
  };

  // journal
  const aj=document.getElementById('addJournalBtn'); if(aj) aj.onclick=()=>openJournalModal();
  document.querySelectorAll('[data-edit-journal]').forEach(el=>el.onclick=()=>openJournalModal(el.dataset.editJournal));
  document.querySelectorAll('[data-del-journal]').forEach(el=>el.onclick=()=>{State.journal=State.journal.filter(j=>j.id!==el.dataset.delJournal);render();});
  const js=document.getElementById('journalSearch');
  if(js && !js.dataset.bound){ js.dataset.bound='1'; js.addEventListener('input',()=>{
    const q=js.value.toLowerCase();
    const filtered=State.journal.filter(j=>j.title.toLowerCase().includes(q)||j.body.toLowerCase().includes(q)).sort((a,b)=>a.date<b.date?1:-1);
    document.getElementById('journalList').innerHTML= filtered.length? filtered.map(journalCard).join('') : emptyState('No matches','Try a different search term.');
    bindJournalCardActions();
  }); }

  // mood
  document.querySelectorAll('[data-mood-emoji]').forEach(el=>el.onclick=()=>{
    document.querySelectorAll('[data-mood-emoji]').forEach(b=>b.classList.remove('btn-primary'));
    document.querySelectorAll('[data-mood-emoji]').forEach(b=>b.classList.add('btn-ghost'));
    el.classList.add('btn-primary'); el.classList.remove('btn-ghost');
    el.dataset.selected='1';
  });
  const saveMood=document.getElementById('saveMoodBtn'); if(saveMood) saveMood.onclick=()=>{
    const sel=document.querySelector('[data-mood-emoji].btn-primary');
    const emoji= sel? sel.dataset.moodEmoji : '🙂';
    const energy=parseInt(document.getElementById('energyRange').value);
    const stress=parseInt(document.getElementById('stressRange').value);
    const existing=State.moods.find(m=>m.date===todayISO());
    if(existing) Object.assign(existing,{emoji,energy,stress});
    else { State.moods.push({date:todayISO(),emoji,energy,stress}); if(State.moods.length>7) State.moods.shift(); }
    addXP(10,'Mood logged — +10 XP');
    render();
  };

  // notes
  const an=document.getElementById('addNoteBtn'); if(an) an.onclick=()=>openNoteModal();
  document.querySelectorAll('[data-edit-note]').forEach(el=>el.onclick=()=>openNoteModal(el.dataset.editNote));
  document.querySelectorAll('[data-del-note]').forEach(el=>el.onclick=()=>{State.notes=State.notes.filter(n=>n.id!==el.dataset.delNote);render();});
  document.querySelectorAll('[data-pin-note]').forEach(el=>el.onclick=()=>{
    const n=State.notes.find(x=>x.id===el.dataset.pinNote); n.pinned=!n.pinned; render();
  });
  const ns=document.getElementById('notesSearch');
  if(ns && !ns.dataset.bound){ ns.dataset.bound='1'; ns.addEventListener('input',()=>{
    const q=ns.value.toLowerCase();
    const filtered=State.notes.filter(n=>!n.pinned&&(n.title.toLowerCase().includes(q)||n.body.toLowerCase().includes(q)));
    document.getElementById('notesGrid').innerHTML= filtered.length? filtered.map(noteCard).join('') : emptyState('No matches','Try a different search term.');
    bindNoteCardActions();
  }); }

  // settings
  const sp=document.getElementById('saveProfileBtn'); if(sp) sp.onclick=()=>{
    State.user.name=document.getElementById('settingsName').value||'You';
    State.waterGoal=parseInt(document.getElementById('settingsWaterGoal').value)||8;
    State.sleepGoal=parseFloat(document.getElementById('settingsSleepGoal').value)||8;
    toast('Profile saved'); render();
  };
  const ts=document.getElementById('themeSwitch'); if(ts) ts.onclick=toggleTheme;
  document.querySelectorAll('[data-accent]').forEach(el=>el.onclick=()=>{State.accent=el.dataset.accent;render();});
  document.querySelectorAll('[data-notif-toggle]').forEach(el=>el.onclick=()=>el.classList.toggle('on'));
  const exp=document.getElementById('exportBtn'); if(exp) exp.onclick=exportData;
  const imp=document.getElementById('importFile'); if(imp) imp.addEventListener('change',importData);
  const rst=document.getElementById('resetBtn'); if(rst) rst.onclick=async()=>{
    if(confirm('Permanently delete ALL your data from the server? This cannot be undone.')){
      try{
        await clearAllUserData(State._userId);
        State.xp=0; State.water=0; State.sleepHrs=0;
        State.habits=[]; State.goals=[]; State.tasks=[];
        State.journal=[]; State.moods=[]; State.notes=[];
        State.focusSessions=[]; State.seenOnboarding=false;
        State.badges=State.badges.map(b=>({...b,earned:false}));
        await saveAllUserData(State._userId, State);
        toast('All data reset');
        await new Promise(r=>setTimeout(r,500));
        location.reload();
      }catch(e){ toast('Reset failed: '+e.message,'error'); }
    }
  };
  const so=document.getElementById('signOutBtn'); if(so) so.onclick=async()=>{
    try{ await signOut(); State._userId=null; showAuth(); }catch(e){ toast('Sign out failed'); }
  };
}
function bindNum(id,fn){ const el=document.getElementById(id); if(el) el.onclick=fn; }
function bindJournalCardActions(){
  document.querySelectorAll('[data-edit-journal]').forEach(el=>el.onclick=()=>openJournalModal(el.dataset.editJournal));
  document.querySelectorAll('[data-del-journal]').forEach(el=>el.onclick=()=>{State.journal=State.journal.filter(j=>j.id!==el.dataset.delJournal);render();});
}
function bindNoteCardActions(){
  document.querySelectorAll('[data-edit-note]').forEach(el=>el.onclick=()=>openNoteModal(el.dataset.editNote));
  document.querySelectorAll('[data-del-note]').forEach(el=>el.onclick=()=>{State.notes=State.notes.filter(n=>n.id!==el.dataset.delNote);render();});
  document.querySelectorAll('[data-pin-note]').forEach(el=>el.onclick=()=>{const n=State.notes.find(x=>x.id===el.dataset.pinNote); n.pinned=!n.pinned; render();});
}

function exportData(){
  const data=JSON.stringify({user:State.user,xp:State.xp,water:State.water,sleepHrs:State.sleepHrs,habits:State.habits,goals:State.goals,tasks:State.tasks,journal:State.journal,notes:State.notes,moods:State.moods},null,2);
  const blob=new Blob([data],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='ascent-export.json'; a.click();
  toast('Export ready — check your downloads');
}
function importData(e){
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const d=JSON.parse(reader.result);
      Object.assign(State,{user:d.user||State.user,xp:d.xp??State.xp,water:d.water??State.water,sleepHrs:d.sleepHrs??State.sleepHrs,habits:d.habits||State.habits,goals:d.goals||State.goals,tasks:d.tasks||State.tasks,journal:d.journal||State.journal,notes:d.notes||State.notes,moods:d.moods||State.moods});
      toast('Data imported'); render(); queueSave();
    }catch(err){ toast('Could not read that file'); }
  };
  reader.readAsText(file);
}

/* ============================================================
   ONBOARDING
   ============================================================ */
const ONB_STEPS=[
  {t:'Welcome to Ascent',d:'One calm home for your habits, goals, focus, mood, and reflection — designed to feel like progress, not pressure.'},
  {t:'Build your constellation',d:'Every habit you complete lights up a point in your daily sky. Watch the pattern grow across the week.'},
  {t:'Your AI coach is always on',d:'Get a fresh, specific nudge each time you open the dashboard — grounded in what you\'ve actually logged.'},
  {t:'Built with love',d:'it took founders 64hours to make this ~ AARV'},
];
let onbStep=0;
function showOnboarding(){
  const host=document.getElementById('onbHost');
  const s=ONB_STEPS[onbStep];
  host.innerHTML=`<div class="onb-backdrop"><div class="onb-card card" style="padding:40px 32px;">
    <div style="width:56px;height:56px;border-radius:16px;margin:0 auto 20px;background:conic-gradient(from 220deg,var(--gold),var(--ember),var(--violet),var(--gold));display:flex;align-items:center;justify-content:center;">${icon('star')}</div>
    <h2 style="font-size:23px;">${s.t}</h2>
    <p style="color:var(--text-mid);margin-top:12px;line-height:1.6;font-size:14px;">${s.d}</p>
    <div class="onb-dots">${ONB_STEPS.map((_,i)=>`<div class="onb-dot ${i===onbStep?'on':''}"></div>`).join('')}</div>
    <div style="display:flex;gap:10px;margin-top:26px;justify-content:center;">
      ${onbStep>0?`<button class="btn btn-ghost" id="onbBack">Back</button>`:''}
      <button class="btn btn-primary" id="onbNext">${onbStep===ONB_STEPS.length-1?'Get started':'Continue'}</button>
    </div>
  </div></div>`;
  const back=document.getElementById('onbBack'); if(back) back.onclick=()=>{onbStep--;showOnboarding();};
  document.getElementById('onbNext').onclick=()=>{
    if(onbStep<ONB_STEPS.length-1){ onbStep++; showOnboarding(); }
    else { host.innerHTML=''; State.seenOnboarding=true; toast(`Welcome, ${State.user.name}! +20 XP`,'sparkle'); addXP(20); render(); }
  };
}

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); openCmdk(); }
  if(e.key==='Escape'){ closeCmdk(); closeModal(); }
});
window.addEventListener('beforeunload',()=>{
  if(State._userId && _dataSnapshot){ saveStateToSupabase(); }
});

/* ============================================================
   AUTH UI
   ============================================================ */
function showAuth(){
  const host=document.getElementById('authHost');
  const main=document.getElementById('authApp');
  host.style.display='flex'; main.style.display='none';
  host.innerHTML=`
  <div class="auth-card card">
    <div class="brand-mark" style="margin:0 auto 16px;">${icon('star')}</div>
    <h2>Ascent</h2>
    <p class="sub">Personal Growth OS</p>
    <div class="auth-tabs">
      <button class="auth-tab on" id="authTabSignIn">Sign In</button>
      <button class="auth-tab" id="authTabSignUp">Sign Up</button>
    </div>
    <div id="authForm">
      <div class="auth-error" id="authError"></div>
      <div class="auth-success" id="authSuccess"></div>
      <div class="field"><label>Email</label><input type="email" id="authEmail" placeholder="you@example.com" autocomplete="email"></div>
      <div class="field"><label>Password</label><input type="password" id="authPassword" placeholder="Min 6 characters" autocomplete="current-password"></div>
      <button class="btn btn-primary" style="width:100%;" id="authSubmit">Sign In</button>
    </div>
    <div class="auth-divider">or</div>
    <button class="auth-google-btn" id="authGoogleBtn">
      <svg viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      Continue with Google
    </button>
    <div id="authLoading" style="display:none;margin-top:16px;"><div class="stat-sub">Loading…</div></div>
  </div>`;
  let isSignIn=true;
  const tabIn=document.getElementById('authTabSignIn');
  const tabUp=document.getElementById('authTabSignUp');
  const submit=document.getElementById('authSubmit');
  const errorEl=document.getElementById('authError');
  const successEl=document.getElementById('authSuccess');
  const loadingEl=document.getElementById('authLoading');
  const emailInput=document.getElementById('authEmail');
  const passwordInput=document.getElementById('authPassword');
  const form=document.getElementById('authForm');
  const googleBtn=document.getElementById('authGoogleBtn');

  function switchTab(toSignIn){
    isSignIn=toSignIn;
    tabIn.classList.toggle('on',isSignIn);
    tabUp.classList.toggle('on',!isSignIn);
    submit.textContent=isSignIn?'Sign In':'Create Account';
    passwordInput.placeholder=isSignIn?'Password':'Password (min 6 characters)';
    errorEl.textContent='';
    successEl.textContent='';
  }
  tabIn.onclick=()=>switchTab(true);
  tabUp.onclick=()=>switchTab(false);
  passwordInput.addEventListener('keydown',e=>{if(e.key==='Enter') submit.click();});
  emailInput.addEventListener('keydown',e=>{if(e.key==='Enter') submit.click();});

  submit.onclick=async()=>{
    const email=emailInput.value.trim();
    const password=passwordInput.value;
    errorEl.textContent=''; successEl.textContent='';
    if(!email||!password){ errorEl.textContent='Please fill in all fields.'; return; }
    if(!isSignIn&&password.length<6){ errorEl.textContent='Password must be at least 6 characters.'; return; }
    submit.disabled=true; submit.classList.add('auth-loading');
    try{
      if(isSignIn){
        await signIn(email,password);
        await initApp();
      } else {
        const data=await signUp(email,password);
        successEl.textContent='Account created! Check your email to confirm, then sign in.';
        switchTab(true);
      }
    }catch(err){
      errorEl.textContent=err.message||'Something went wrong.';
    }
    submit.disabled=false; submit.classList.remove('auth-loading');
  };

  googleBtn.onclick=async()=>{
    try{
      await signInWithGoogle();
    }catch(err){
      errorEl.textContent=err.message||'Google sign in failed.';
    }
  };
}

function showLoading(){
  const host=document.getElementById('authHost');
  const main=document.getElementById('authApp');
  host.style.display='flex'; main.style.display='none';
  host.innerHTML=`<div class="auth-card card" style="text-align:center;"><div class="stat-num" style="margin-bottom:12px;">Ascent</div><div class="stat-sub">Loading your data…</div></div>`;
}

function showApp(){
  const host=document.getElementById('authHost');
  const main=document.getElementById('authApp');
  host.style.display='none'; main.style.display='flex';
}

/* ============================================================
   INIT
   ============================================================ */
async function initApp(){
  showLoading();
  const sessionRes=await getSession();
  const session=sessionRes.data?.session;
  if(!session){ showAuth(); return; }
  State._userId=session.user.id;
  State._userEmail=session.user.email||'';
  try{
    let profile=await loadProfile(State._userId);
    if(!profile){ profile=await createProfile(State._userId, session.user.email?.split('@')[0]||'User'); }
    const allData=await loadAllUserData(State._userId);
    applyLoadedData(allData);
  }catch(err){
    console.error('Data load error:',err);
    State.user.name=State._userEmail.split('@')[0]||'User';
  }
  State._loading=false;
  showApp();
  render();
  if(!State.seenOnboarding) showOnboarding();
}

async function init(){
  State._loading=true;
  // Set up auth listener for session changes
  onAuthStateChange((event, session)=>{
    if(event==='SIGNED_OUT'){ State._userId=null; showAuth(); }
    else if(event==='SIGNED_IN' && session){ State._userId=session.user.id; State._userEmail=session.user.email||''; }
  });
  await initApp();
}
init();
