import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Shield, 
  Upload, 
  Link as LinkIcon, 
  Activity, 
  Zap, 
  Download, 
  CheckCircle2, 
  Clock,
  Trash2,
  ChevronRight,
  Gem,
  ExternalLink,
  Code2,
  ScrollText,
  Users,
  ShieldCheck,
  Info,
  Scale,
  Database,
  Fingerprint,
  Terminal,
  Award,
  Video,
  FileCheck,
  AlertCircle,
  Plus,
  Music,
  UserCheck,
  Layers,
  Calendar,
  FileJson,
  UserPlus,
  Tag,
  Lock,
  EyeOff,
  Gavel,
  History,
  LayoutGrid,
  Cpu,
  Compass,
  Key,
  AlertTriangle,
  Hexagon,
  Orbit,
  Boxes,
  Globe,
  ArrowUpRight,
  TrendingUp,
  Workflow
} from 'lucide-react';
import JSZip from 'jszip';
import { VideoItem, VideoSourceType, KineticArtifact, ChoreographerClaim, ClaimScope, ProductionSegment, DancerContribution, EcosystemRole, EcosystemLayer, RoleMetadata, UserWallet, LogEntry } from './types';
import { processKineticStamp } from './services/kineticService';

const ROLE_MAP: Record<EcosystemRole, RoleMetadata> = {
  'SYSTEM_ARCHITECT': {
    title: 'System Architect',
    depth: 4,
    color: '#c9a15a',
    permissions: ['ALL'],
    description: 'Full orchestration of the Theatre System and Root Infrastructure.'
  },
  'FOUNDING_FACULTY': {
    title: 'Founding Faculty',
    depth: 3,
    color: '#c9a15a',
    permissions: ['MANIFEST_ADVANCED', 'STAKE_HIGH', 'SHELF_VIEW'],
    description: 'Guardian of choreographic syntax and conceptual frameworks.'
  },
  'STUDENT_CHOREOGRAPHER': {
    title: 'Student Lab',
    depth: 2,
    color: '#8e6d2f',
    permissions: ['MANIFEST_BASIC', 'STAKE_LOW'],
    description: 'Iterative research and development of movement logic.'
  },
  'GUEST_SOLOIST': {
    title: 'Guest Soloist',
    depth: 1,
    color: '#5e4a21',
    permissions: ['VAULT_PRIVATE', 'SOLO_STAMP'],
    description: 'Focus on kinetic aura and sovereign variation identity.'
  }
};

const App: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<EcosystemLayer>('STAGEPORT_OS');
  const [activeTab, setActiveTab] = useState<'ingest' | 'credentials' | 'ops' | 'motherboard' | 'map'>('ingest');
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBridging, setIsBridging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [currentRole, setCurrentRole] = useState<EcosystemRole>('STUDENT_CHOREOGRAPHER');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const [wallet, setWallet] = useState<UserWallet>({
    sentientCents: 125000,
    stagecoin: 150,
    streetcred: 1200,
    stakedAmount: 500,
    investmentTier: 'SILVER',
    lastDecay: new Date().toISOString()
  });

  const [claimForm, setClaimForm] = useState<ChoreographerClaim>({
    workTitle: '',
    conceptualAuthor: '',
    primaryChoreographer: '',
    claimType: 'Primary Authorship',
    stakePercentage: 100,
    scope: 'whole-work',
    initiatedAt: new Date().toISOString(),
    nestingDepth: 1,
    accessLevel: 'PUBLIC_REGISTRY',
    perjuryAcknowledgment: false,
    segments: []
  });

  const [sysIntegrity, setSysIntegrity] = useState(99.4);

  // System Integrity Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSysIntegrity(prev => +(prev + (Math.random() * 0.1 - 0.05)).toFixed(2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Log auto-scroll
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // System Log Generator
  const addLog = useCallback((message: string, level: LogEntry['level'] = 'INFO', module: string = 'CORE') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
      module
    };
    setLogs(prev => [...prev.slice(-49), newLog]);
  }, []);

  useEffect(() => {
    addLog('StagePort OS V2.5.4 initialized', 'SYSTEM');
    addLog(`Identity layer synchronized: ${currentRole}`, 'INFO', 'IDENTITY');
  }, []);

  const roleMeta = ROLE_MAP[currentRole];

  const addSegment = () => {
    const newSegment: ProductionSegment = {
      id: Math.random().toString(36).substr(2, 9),
      label: `Sequence ${claimForm.segments.length + 1}`,
      contributor: '',
      startTime: '00:00',
      endTime: '01:00',
      contributionPercentage: 0,
      dancers: []
    };
    setClaimForm(prev => ({...prev, segments: [...prev.segments, newSegment]}));
    addLog(`Added kinetic segment: ${newSegment.label}`, 'INFO', 'MANIFEST');
  };

  const removeSegment = (id: string) => {
    setClaimForm(prev => ({...prev, segments: prev.segments.filter(s => s.id !== id)}));
  };

  const updateSegment = (id: string, updates: Partial<ProductionSegment>) => {
    setClaimForm(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const addDancer = (segId: string) => {
    const d: DancerContribution = { id: Math.random().toString(36).substr(2, 9), name: '', role: 'Ensemble', stake: 0 };
    setClaimForm(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.id === segId ? {...s, dancers: [...s.dancers, d]} : s)
    }));
  };

  const updateDancer = (segId: string, dancerId: string, updates: Partial<DancerContribution>) => {
    setClaimForm(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.id === segId ? {
        ...s,
        dancers: s.dancers.map(d => d.id === dancerId ? {...d, ...updates} : d)
      } : s)
    }));
  };

  const removeDancer = (segId: string, dancerId: string) => {
    setClaimForm(prev => ({
      ...prev,
      segments: prev.segments.map(s => s.id === segId ? {
        ...s,
        dancers: s.dancers.filter(d => d.id !== dancerId)
      } : s)
    }));
  };

  const ingestSource = (type: VideoSourceType, value: string | File) => {
    const isPrivate = claimForm.accessLevel === 'PRIVATE_VAULT';
    const newItem: VideoItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      value,
      name: type === VideoSourceType.URL ? (value as string).split('/').pop()?.split('?')[0] || 'Remote Node' : (value as File).name,
      status: 'pending',
      isPrivate: isPrivate,
      roleContext: currentRole,
      claim: { ...claimForm }
    };
    setVideos(prev => [...prev, newItem]);
    addLog(`Ingested ${type} source: ${newItem.name}`, 'INFO', 'INGEST');
  };

  const startProcessing = async () => {
    if (!claimForm.perjuryAcknowledgment) {
      addLog('Processing blocked: Perjury acknowledgment required', 'WARN', 'SECURITY');
      alert("Liability Acknowledgment Required: You must certify the truth of this kinetic claim.");
      return;
    }
    setIsProcessing(true);
    addLog(`Starting batch process for ${videos.length} signals...`, 'SYSTEM', 'ENGINE');
    
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].status === 'completed') continue;
      setVideos(prev => prev.map((v, idx) => idx === i ? { ...v, status: 'processing' } : v));
      addLog(`Analyzing kinetic dimensions: ${videos[i].name}`, 'INFO', 'ENGINE');
      
      try {
        const result = await processKineticStamp(videos[i]);
        addLog(`Kinetic Proof generated: ${result.liability_seal}`, 'INFO', 'PROOF');
        setVideos(prev => prev.map((v, idx) => idx === i ? { ...v, status: 'completed', result } : v));
        
        setWallet(prev => ({
          ...prev,
          sentientCents: prev.sentientCents - result.sentient_cents_cost,
          stagecoin: prev.stagecoin + result.stagecoin,
          streetcred: prev.streetcred + result.streetcred
        }));
      } catch (error) {
        addLog(`Processing failed for ${videos[i].name}`, 'ERROR', 'ENGINE');
        setVideos(prev => prev.map((v, idx) => idx === i ? { ...v, status: 'error' } : v));
      }
    }
    setIsProcessing(false);
    addLog('Batch processing completed', 'SYSTEM', 'ENGINE');
  };

  const bridgeToChain = async () => {
    const completed = videos.filter(v => v.status === 'completed');
    if (completed.length === 0) {
      addLog('Bridge request failed: No completed artifacts found', 'WARN', 'RELAY');
      return;
    }
    
    setIsBridging(true);
    addLog(`Initiating Bridge Relay for ${completed.length} artifacts...`, 'SYSTEM', 'RELAY');
    
    // Simulate relay delay
    await new Promise(r => setTimeout(r, 2000));
    
    const totalScent = completed.length * 500;
    if (wallet.sentientCents < totalScent) {
      addLog('Insufficient SentientCents for bridge fee', 'ERROR', 'RELAY');
      setIsBridging(false);
      return;
    }

    addLog(`Applying Time-Burn verification...`, 'INFO', 'RELAY');
    addLog(`Minting Stagecoin on Base...`, 'INFO', 'BLOCKCHAIN');
    
    setVideos(prev => prev.map(v => v.status === 'completed' ? { ...v, status: 'bridged' } : v));
    setWallet(prev => ({
      ...prev,
      sentientCents: prev.sentientCents - totalScent,
      stagecoin: prev.stagecoin + (completed.length * 10)
    }));
    
    addLog(`Bridge settlement successful. Hash: 0x${Math.random().toString(16).substr(2, 32)}`, 'SYSTEM', 'RELAY');
    setIsBridging(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex overflow-hidden font-sans selection:bg-[#c9a15a]/30">
      {/* Ecosystem Sidebar */}
      <aside className="w-24 bg-black border-r border-white/5 flex flex-col items-center py-8 gap-10 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => setActiveTab('map')}
          className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center shadow-lg shadow-yellow-900/20 group relative hover:scale-105 transition-transform"
        >
          <Shield className="text-black w-7 h-7" />
          <div className="absolute left-full ml-4 px-3 py-2 bg-[#1a1a1a] border border-[#c9a15a]/30 rounded-xl text-[10px] opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-2xl">
            <p className="font-bold gold-text">Ecosystem Map</p>
          </div>
        </button>
        
        <nav className="flex-1 flex flex-col gap-8">
          <EcosystemIcon active={activeLayer === 'SOLOIST_AURA'} icon={<Fingerprint />} onClick={() => setActiveLayer('SOLOIST_AURA')} label="Layer 1: Soloist Aura" depth={1} />
          <EcosystemIcon active={activeLayer === 'STAGEPORT_OS'} icon={<Cpu />} onClick={() => setActiveLayer('STAGEPORT_OS')} label="Layer 2: StagePort OS" depth={2} />
          <EcosystemIcon active={activeLayer === 'STUDIO_SHELF'} icon={<LayoutGrid />} onClick={() => setActiveLayer('STUDIO_SHELF')} label="Layer 3: Studio Shelf" depth={3} />
          <EcosystemIcon active={activeLayer === 'THEATRE_SYSTEM'} icon={<Globe />} onClick={() => setActiveLayer('THEATRE_SYSTEM')} label="Layer 4: Theatre System" depth={4} />
        </nav>

        <div className="mt-auto px-4 w-full flex flex-col items-center gap-6 pb-4">
           <div className="flex flex-col items-center gap-1 group relative cursor-help">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
              <span className="text-[8px] font-black uppercase text-zinc-600 tracking-tighter">RELAY</span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl text-[10px] opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-2xl">
                 <p className="font-bold text-indigo-400">Gasless Bridge Health: 100%</p>
                 <p className="text-zinc-500 text-[8px]">Relay Wallet: ACTIVE</p>
              </div>
           </div>
           <div className={`w-3 h-3 rounded-full ${sysIntegrity > 99 ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-yellow-500 shadow-[0_0_15px_#eab308]'} transition-all duration-1000 animate-pulse`}></div>
        </div>
      </aside>

      {/* Navigation & Wallet Context */}
      <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col p-6 z-40">
        <div className="mb-10 px-2">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-black mb-1">Architecture</p>
          <h1 className="text-2xl font-serif font-bold gold-text italic tracking-tight">{activeLayer.replace('_', ' ')}</h1>
        </div>

        {/* Wallet Component */}
        <div className="mb-8 p-5 glass rounded-3xl border border-[#c9a15a]/20 shadow-inner">
           <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                 <Key size={12} className="text-[#c9a15a]" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Identity Balance</span>
              </div>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded-md border ${
                wallet.investmentTier === 'SILVER' ? 'border-zinc-400 text-zinc-300' : 'border-[#c9a15a] text-[#c9a15a]'
              }`}>{wallet.investmentTier}</span>
           </div>
           <div className="space-y-3">
              <div className="flex justify-between items-end">
                 <span className="text-[10px] font-bold text-zinc-400 uppercase">Stagecoin</span>
                 <span className="text-xl font-serif font-bold text-white italic">{wallet.stagecoin} Ω</span>
              </div>
              <div className="flex justify-between items-end">
                 <span className="text-[10px] font-bold text-zinc-400 uppercase">SentientCents</span>
                 <span className="text-lg font-mono font-bold text-indigo-400">{wallet.sentientCents.toLocaleString()}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                 <div className="h-full gold-gradient" style={{ width: '45%' }}></div>
              </div>
              <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mt-1">StreetCred: {wallet.streetcred}</p>
           </div>
        </div>

        <div className="space-y-2 mb-10 overflow-y-auto custom-scrollbar pr-2">
           <p className="text-[9px] uppercase font-black text-zinc-700 tracking-[0.2em] mb-3 px-1">Identity Profiles</p>
           {(Object.keys(ROLE_MAP) as EcosystemRole[]).map(role => (
             <RoleButton 
               key={role}
               active={currentRole === role} 
               onClick={() => {
                 setCurrentRole(role);
                 addLog(`Role context changed to: ${ROLE_MAP[role].title}`, 'SYSTEM', 'IDENTITY');
               }} 
               icon={<UserCheck size={14} />} 
               label={ROLE_MAP[role].title} 
               subText={ROLE_MAP[role].description.slice(0, 35) + '...'}
             />
           ))}
        </div>

        <nav className="mt-auto space-y-1">
          <NavButton active={activeTab === 'ingest'} onClick={() => setActiveTab('ingest')} icon={<Zap size={16}/>} label="Command Ingest" />
          <NavButton active={activeTab === 'credentials'} onClick={() => setActiveTab('credentials')} icon={<Award size={16}/>} label="IP Registry" />
          <NavButton active={activeTab === 'motherboard'} onClick={() => setActiveTab('motherboard')} icon={<LayoutGrid size={16}/>} label="The Hub" />
          <NavButton active={activeTab === 'ops'} onClick={() => setActiveTab('ops')} icon={<Terminal size={16}/>} label="Ops Terminal" />
        </nav>
      </aside>

      {/* Main Command Center */}
      <main className="flex-1 overflow-y-auto p-12 custom-scrollbar relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        
        {activeTab === 'ingest' && (
          <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-5xl font-serif font-bold text-white italic leading-tight tracking-tighter">Sovereign Authorship Manifest</h2>
                <div className="flex items-center gap-4 mt-3">
                   <div className="flex items-center gap-2 px-3 py-1 bg-[#c9a15a]/10 border border-[#c9a15a]/20 rounded-lg">
                      <Workflow size={12} className="text-[#c9a15a]" />
                      <span className="text-[#c9a15a] text-[9px] font-black uppercase tracking-[0.2em]">{roleMeta.title}</span>
                   </div>
                   <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Nesting Logic: {roleMeta.depth}.0X</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                 <div className="flex gap-4">
                   <div className="flex items-center gap-2 px-5 py-2.5 bg-black border border-white/10 rounded-2xl shadow-xl">
                      <Lock size={14} className={claimForm.accessLevel === 'PRIVATE_VAULT' ? 'text-indigo-400' : 'text-zinc-700'} />
                      <select 
                        value={claimForm.accessLevel}
                        onChange={(e) => setClaimForm({...claimForm, accessLevel: e.target.value as any})}
                        className="bg-transparent text-[10px] font-black uppercase tracking-widest text-[#c9a15a] outline-none cursor-pointer"
                      >
                        <option value="PUBLIC_REGISTRY">Public Registry</option>
                        <option value="STUDIO_CORRIDOR">Studio Corridor</option>
                        <option value="PRIVATE_VAULT">Private Vault (Ingest Only)</option>
                      </select>
                   </div>
                   <button 
                    onClick={startProcessing} 
                    disabled={isProcessing || videos.length === 0} 
                    className="gold-gradient text-black px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-yellow-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
                   >
                     {isProcessing ? (
                       <div className="flex items-center gap-3">
                         <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                         <span>Generating Proofs...</span>
                       </div>
                     ) : 'Seal Authorship'}
                   </button>
                 </div>
                 <label className="flex items-center gap-3 cursor-pointer group px-2">
                    <input 
                      type="checkbox" 
                      checked={claimForm.perjuryAcknowledgment} 
                      onChange={e => setClaimForm({...claimForm, perjuryAcknowledgment: e.target.checked})}
                      className="w-4 h-4 rounded border-white/10 bg-black text-[#c9a15a] focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-[9px] uppercase font-black tracking-widest text-zinc-600 group-hover:text-red-500 transition-colors">Confirm Liability / Perjury Warnings</span>
                 </label>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Form Section */}
              <div className="lg:col-span-7 space-y-8">
                <section className="glass p-10 rounded-[3rem] relative overflow-hidden border border-[#c9a15a]/20 shadow-2xl">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                    <Shield size={160} className="text-[#c9a15a]" />
                  </div>

                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#c9a15a]/10 flex items-center justify-center">
                        <ShieldCheck className="text-[#c9a15a] w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white italic">Conceptual Framework</h3>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                      <Clock size={14} className="text-zinc-500" />
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        {new Date(claimForm.initiatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                      <InputField label="Conceptual Author (IP OWNER)" value={claimForm.conceptualAuthor} onChange={v => setClaimForm({...claimForm, conceptualAuthor: v})} placeholder="Identity or Canonical Studio ID" />
                      
                      <div className="grid grid-cols-2 gap-6">
                        <InputField label="Work Title" value={claimForm.workTitle} onChange={v => setClaimForm({...claimForm, workTitle: v})} placeholder="e.g. Apollo's Shadow" />
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase font-black tracking-widest text-zinc-600 px-1">Authorship Scope</label>
                          <select 
                            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-xs focus:border-[#c9a15a] outline-none transition-all font-bold text-zinc-300"
                            value={claimForm.scope}
                            onChange={e => setClaimForm({...claimForm, scope: e.target.value as any})}
                          >
                            <option value="conceptual-framework">Conceptual Framework</option>
                            <option value="whole-work">Whole Work</option>
                            <option value="solo">Solo Variation</option>
                            <option value="ensemble">Ensemble Pattern</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-1">
                        <div className="flex items-center gap-2">
                           <Layers size={14} className="text-[#c9a15a]" />
                           <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600">Kinetic Manifest Segments</span>
                        </div>
                        <button onClick={addSegment} className="text-[10px] font-black uppercase text-[#c9a15a] flex items-center gap-1.5 hover:text-white transition-all bg-[#c9a15a]/10 px-3 py-1.5 rounded-lg border border-[#c9a15a]/20">
                          <Plus size={14}/> Add Sequence
                        </button>
                      </div>
                      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-3 custom-scrollbar">
                        {claimForm.segments.length === 0 ? (
                          <div className="p-16 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center opacity-30">
                             <Boxes className="w-12 h-12 mb-4 text-zinc-700" />
                             <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Manifest Segments Defined</p>
                             <p className="text-[8px] text-zinc-600 mt-2 max-w-[200px]">Define specific movement sequences for granular authorship staking.</p>
                          </div>
                        ) : (
                          claimForm.segments.map(segment => (
                            <div key={segment.id} className="p-8 bg-white/[0.01] rounded-[2.5rem] border border-white/5 space-y-6 group/segment hover:border-[#c9a15a]/30 transition-all hover:bg-white/[0.02]">
                               <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-4">
                                     <div className="w-2 h-2 rounded-full bg-[#c9a15a] animate-pulse"></div>
                                     <input 
                                        value={segment.label}
                                        onChange={e => updateSegment(segment.id, { label: e.target.value })}
                                        className="bg-transparent border-none text-base font-black text-white p-0 focus:ring-0 uppercase tracking-widest w-full"
                                      />
                                  </div>
                                  <button onClick={() => removeSegment(segment.id)} className="opacity-0 group-hover/segment:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-lg text-zinc-700 hover:text-red-500">
                                     <Trash2 size={16} />
                                  </button>
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <InputField label="Lead Contributor" value={segment.contributor} onChange={v => updateSegment(segment.id, {contributor: v})} />
                                  <div className="grid grid-cols-2 gap-4">
                                     <InputField label="Start Time" value={segment.startTime} onChange={v => updateSegment(segment.id, {startTime: v})} />
                                     <InputField label="End Time" value={segment.endTime} onChange={v => updateSegment(segment.id, {endTime: v})} />
                                  </div>
                               </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Direct Upload / Source Area */}
                    <div className="pt-10 border-t border-white/5 space-y-6">
                      <div className="flex items-center gap-2 px-1">
                         <Database size={14} className="text-zinc-600" />
                         <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600">Source Provenance Bundle</span>
                      </div>
                      <textarea 
                        value={urlInput}
                        onChange={e => setUrlInput(e.target.value)}
                        placeholder="Paste canonical node URLs (Vimeo, YT, S3) for metadata enrichment..."
                        className="w-full bg-black border border-white/10 rounded-[2rem] p-6 text-xs h-32 focus:border-[#c9a15a] transition-all resize-none font-mono text-zinc-400 placeholder:text-zinc-800"
                      />
                      <div className="grid grid-cols-2 gap-6">
                        <button onClick={() => {if(urlInput) ingestSource(VideoSourceType.URL, urlInput); setUrlInput('')}} className="bg-[#c9a15a]/10 hover:bg-[#c9a15a]/20 border border-[#c9a15a]/20 text-[#c9a15a] py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                          <LinkIcon size={18}/> Ingest Remote Node
                        </button>
                        <button onClick={() => fileInputRef.current?.click()} className="bg-white/5 hover:bg-white/10 border border-white/10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                          <Upload size={18}/> Direct Hardware Upload
                        </button>
                        <input type="file" ref={fileInputRef} hidden multiple onChange={e => e.target.files && Array.from(e.target.files).forEach(f => ingestSource(VideoSourceType.FILE, f))} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar: Queue & Active Processes */}
              <div className="lg:col-span-5 flex flex-col h-[calc(100vh-18rem)]">
                <div className="glass flex-1 rounded-[3rem] border border-white/5 overflow-hidden flex flex-col shadow-2xl relative">
                   <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-[#c9a15a]/10 rounded-xl">
                          <Activity className="text-[#c9a15a] w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-serif font-bold text-white italic">Signal Queue</h3>
                          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">{videos.length} Identified Units</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {videos.some(v => v.status === 'completed' || v.status === 'bridged') && (
                          <button 
                            onClick={bridgeToChain} 
                            disabled={isBridging || !videos.some(v => v.status === 'completed')}
                            className="text-[9px] font-black uppercase text-indigo-400 hover:text-white transition-all bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20 disabled:opacity-30"
                          >
                             {isBridging ? 'Relaying...' : 'Bridge to Base'}
                          </button>
                        )}
                        <button onClick={() => setVideos([])} className="p-2 text-zinc-700 hover:text-red-500 transition-colors">
                           <Trash2 size={16} />
                        </button>
                      </div>
                   </div>
                   
                   <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                      {videos.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-10 py-20">
                           <Database className="w-20 h-20 mb-6 stroke-[1]" />
                           <p className="text-2xl font-serif italic mb-2">Queue Depleted</p>
                           <p className="text-[10px] font-black uppercase tracking-[0.3em]">Awaiting Ingest signal</p>
                        </div>
                      ) : (
                        videos.map(video => (
                          <DetailedVideoArtifact 
                            key={video.id} 
                            video={video} 
                            onRemove={() => setVideos(prev => prev.filter(v => v.id !== video.id))} 
                          />
                        ))
                      )}
                   </div>

                   {/* Quick Status Ticker */}
                   <div className="p-4 bg-black border-t border-white/5 flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-zinc-600">
                      <div className="flex gap-4">
                         <span>RELAY: ACTIVE</span>
                         <span>NODE: BASE_MAINNET</span>
                      </div>
                      <span className="animate-pulse">LATENCY: 42MS</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ops' && (
          <div className="max-w-6xl mx-auto h-[700px] flex flex-col gap-6 animate-in fade-in duration-500">
             <div className="flex justify-between items-end">
                <div>
                   <h2 className="text-4xl font-serif font-bold text-white italic">Ops Terminal</h2>
                   <p className="text-zinc-500 text-sm mt-1">Real-time system arbitration and kinetic audit logs.</p>
                </div>
                <div className="flex gap-4">
                   <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-[10px] font-black uppercase text-zinc-400">Ledger Sync: 100%</span>
                   </div>
                </div>
             </div>

             <div className="flex-1 bg-black rounded-[2.5rem] border border-white/10 p-8 font-mono text-[11px] overflow-hidden flex flex-col shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                   <Terminal size={14} className="text-[#c9a15a]" />
                   <span className="text-zinc-500 uppercase tracking-widest">StagePort_Relay_Kernel v2.5.4</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-4">
                   {logs.map(log => (
                     <div key={log.id} className="flex gap-4 hover:bg-white/[0.02] p-1 rounded transition-colors group">
                        <span className="text-zinc-700 shrink-0">[{log.timestamp}]</span>
                        <span className={`shrink-0 w-16 font-bold ${
                          log.level === 'SYSTEM' ? 'text-indigo-400' : 
                          log.level === 'WARN' ? 'text-yellow-500' : 
                          log.level === 'ERROR' ? 'text-red-500' : 'text-[#c9a15a]'
                        }`}>[{log.level}]</span>
                        <span className="text-zinc-600 shrink-0 w-20">[{log.module}]</span>
                        <span className="text-zinc-300 group-hover:text-white transition-colors">{log.message}</span>
                     </div>
                   ))}
                   <div ref={logEndRef} />
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
                   <span className="text-[#c9a15a]">$</span>
                   <div className="w-2 h-4 bg-[#c9a15a] animate-pulse"></div>
                   <span className="text-zinc-700 italic">Listening for system events...</span>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'motherboard' && (
          <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
             <div className="flex justify-between items-end">
                <div>
                   <h2 className="text-5xl font-serif font-bold text-white italic tracking-tighter">The Command Hub</h2>
                   <p className="text-zinc-500 text-sm mt-2">Unified management of moral capital and relay infrastructure.</p>
                </div>
                <button 
                  onClick={bridgeToChain}
                  disabled={isBridging}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 transition-all flex items-center gap-3"
                >
                   <Orbit size={18} className={isBridging ? 'animate-spin' : ''} />
                   {isBridging ? 'Processing Relay...' : 'Consolidate & Bridge'}
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <MotherboardStat label="Sentient Capacity" value={`${wallet.sentientCents.toLocaleString()}`} sub="Internal Liquid Credit" icon={<Gem size={32}/>} />
                <MotherboardStat label="Stagecoin Pool" value={`${wallet.stagecoin} Ω`} sub="On-Chain Settlement Pool" icon={<Activity size={32}/>} />
                <MotherboardStat label="Staked Stake" value={`${wallet.stakedAmount} Ω`} sub="Reputation Underwriting" icon={<Key size={32}/>} />
                <MotherboardStat label="Ecosystem Cred" value={`${wallet.streetcred}`} sub="Calculated Social Trust" icon={<Users size={32}/>} />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
                <div className="lg:col-span-8 glass p-10 rounded-[3rem] border border-white/5 relative overflow-hidden flex flex-col justify-between h-[500px]">
                   <div className="flex justify-between items-start">
                      <div>
                         <h3 className="text-2xl font-serif font-bold text-white italic">Kinetic Inactivity Decay</h3>
                         <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500 mt-1">Time-Burn Monitor (SCENT Balance)</p>
                      </div>
                      <div className="flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
                         <TrendingUp size={14} className="text-red-500 rotate-180" />
                         <span className="text-red-500 text-[10px] font-black uppercase">Rate: 1.5% / MO</span>
                      </div>
                   </div>

                   {/* Visualization for Decay */}
                   <div className="flex-1 flex items-center justify-center py-10">
                      <div className="relative w-full max-w-lg h-48 flex items-end gap-1">
                         {Array.from({ length: 40 }).map((_, i) => {
                           const height = 40 + (Math.sin(i * 0.2) * 20) + (Math.random() * 20);
                           return (
                             <div 
                               key={i} 
                               className="flex-1 bg-white/5 rounded-t-sm group relative"
                               style={{ height: `${height}%` }}
                             >
                                <div className="absolute inset-0 bg-[#c9a15a] opacity-0 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black rounded border border-white/10 text-[8px] opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                                   E:{i} H:{(height).toFixed(2)}
                                </div>
                             </div>
                           );
                         })}
                         <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-500/20 border-t border-dashed border-red-500/40"></div>
                      </div>
                   </div>

                   <div className="flex justify-between items-center pt-8 border-t border-white/5">
                      <div className="flex gap-8">
                         <div className="space-y-1">
                            <p className="text-[8px] font-black uppercase text-zinc-600">Last Decay Sweep</p>
                            <p className="text-xs font-bold text-zinc-300">24H 12M AGO</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-[8px] font-black uppercase text-zinc-600">Projected Burn (30D)</p>
                            <p className="text-xs font-bold text-red-400">-{ (wallet.sentientCents * 0.015).toFixed(0) } SCENT</p>
                         </div>
                      </div>
                      <button className="text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all underline underline-offset-4 decoration-zinc-800">Review Policies</button>
                   </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                   <div className="bg-[#c9a15a] p-10 rounded-[3rem] h-[240px] flex flex-col justify-between shadow-2xl shadow-yellow-600/10">
                      <div className="flex justify-between items-start">
                         <ArrowUpRight size={40} className="text-black/30" />
                         <span className="text-black font-black text-[10px] uppercase tracking-widest bg-black/5 px-3 py-1 rounded-full">Active Tier</span>
                      </div>
                      <div>
                         <h4 className="text-black text-3xl font-serif font-bold italic leading-tight">Investment Opportunity</h4>
                         <p className="text-black/60 text-[10px] font-black uppercase tracking-widest mt-2">Upgrade to Gold for 0% Relay Fees</p>
                      </div>
                   </div>
                   <div className="glass p-8 rounded-[3rem] border border-white/5 flex flex-col justify-between h-[230px]">
                      <div className="flex justify-between items-start">
                         <ShieldCheck size={32} className="text-green-500/40" />
                         <div className="text-right">
                            <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Liability Seal</p>
                            <p className="text-white font-mono text-xs">CERTIFIED_VAULT</p>
                         </div>
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">
                         Your kinetic identity is actively insured up to <span className="text-white">100,000 Ω</span>. All false claims are subject to immediate capital slashing.
                      </p>
                      <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-[9px] font-black uppercase tracking-widest transition-all mt-2">Update Credentials</button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Other tabs follow similar structure... */}
        {activeTab === 'map' && (
           <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-700">
             {/* Map Content (Keep from existing) */}
             <div className="text-center space-y-4">
                <h2 className="text-6xl font-serif font-bold text-white italic tracking-tighter">Complete Ecosystem Map</h2>
                <p className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] font-black">AVC Systems Studios • Integrated Theatre Architecture</p>
             </div>
             <div className="relative flex justify-center py-20">
                <div className="relative w-[600px] h-[600px] flex items-center justify-center">
                   <div className="absolute w-full h-full rounded-full border border-white/5 bg-white/[0.01] flex items-start justify-center pt-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">Layer 4: Theatre System</span>
                   </div>
                   <div className="absolute w-[80%] h-[80%] rounded-full border border-[#c9a15a]/10 bg-white/[0.02] flex items-start justify-center pt-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9a15a]/40">Layer 3: Studio Shelf</span>
                   </div>
                   <div className="absolute w-[60%] h-[60%] rounded-full border border-[#c9a15a]/30 bg-white/[0.03] flex items-start justify-center pt-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9a15a]/60">Layer 2: StagePort OS</span>
                   </div>
                   <div className="absolute w-[40%] h-[40%] rounded-full border-2 border-[#c9a15a] bg-black shadow-[0_0_50px_rgba(201,161,90,0.1)] flex items-center justify-center text-center p-6">
                      <div>
                        <Fingerprint size={48} className="text-[#c9a15a] mx-auto mb-2 opacity-50" />
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#c9a15a]">Layer 1: Aura</span>
                      </div>
                   </div>
                   <div className="absolute inset-0 animate-[spin_60s_linear_infinite]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-[#c9a15a]/20 to-transparent"></div>
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-[#c9a15a]/20 to-transparent"></div>
                   </div>
                </div>
             </div>
           </div>
        )}
      </main>
    </div>
  );
};

const DetailedVideoArtifact: React.FC<{ video: VideoItem; onRemove: () => void; }> = ({ video, onRemove }) => {
  const isC = video.status === 'completed';
  const isP = video.status === 'processing';
  const isB = video.status === 'bridged';

  return (
    <div className={`transition-all duration-700 border-2 rounded-[2.5rem] overflow-hidden ${
      isB ? 'border-indigo-500/30 bg-indigo-500/5' :
      isC ? 'border-white/10 bg-white/[0.02] shadow-xl' : 
      isP ? 'border-[#c9a15a]/30 bg-[#c9a15a]/5' : 
      'border-white/5 bg-zinc-900/10'
    }`}>
      <div className="p-7 flex items-center justify-between">
        <div className="flex items-center gap-7 flex-1 min-w-0">
          <div className={`w-14 h-14 rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 ${
            isB ? 'bg-indigo-500/20 text-indigo-400' :
            isC ? 'bg-green-500/10 text-green-500' : 
            isP ? 'bg-[#c9a15a]/20 text-[#c9a15a]' : 
            'bg-zinc-800/50 text-zinc-700'
          }`}>
            {isB ? <Orbit size={32} /> : isC ? <CheckCircle2 size={32} /> : isP ? <Zap size={32} className="animate-pulse" /> : <Clock size={32} />}
          </div>
          <div className="min-w-0 flex-1">
             <div className="flex items-center gap-2">
                <h4 className="text-lg font-serif font-bold text-white truncate italic tracking-tight">{video.name}</h4>
                {isB && <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/30 font-black uppercase">On-Chain</span>}
             </div>
             <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">{video.type} INGEST • {video.roleContext}</p>
          </div>
        </div>
        {!isP && !isB && (
          <button onClick={onRemove} className="p-4 text-zinc-800 hover:text-red-500 transition-all hover:bg-red-500/10 rounded-2xl">
            <Trash2 size={24} />
          </button>
        )}
      </div>

      {(isC || isB) && video.result && (
        <div className="px-10 pb-10 space-y-8 animate-in slide-in-from-top-6 duration-1000">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ArtifactStat label="Ingest Cost" value={`${video.result.sentient_cents_cost} C`} sub="Gasless Internal" icon={<Zap size={24} className="opacity-10"/>} />
              <ArtifactStat label="Stagecoin Reward" value={`${isB ? '+25' : `+${video.result.stagecoin}`} Ω`} sub="Minted" icon={<Award size={24} className="opacity-10"/>} />
              <ArtifactStat label="Reputation" value={`+${video.result.streetcred}`} sub="Cred Boost" icon={<Shield size={24} className="opacity-10"/>} />
           </div>
           
           <div className="bg-zinc-950 rounded-[2.5rem] p-10 border border-white/5 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                 <Cpu size={140} className="text-[#c9a15a]" />
              </div>
              
              <div className="flex justify-between items-center text-[10px] border-b border-white/10 pb-4">
                 <div className="flex items-center gap-3">
                    <Fingerprint size={16} className="text-[#c9a15a]" />
                    <span className="text-zinc-500 uppercase font-black tracking-widest">Device Hardware Identity</span>
                 </div>
                 <span className="font-mono text-[#c9a15a] font-bold text-xs">{video.result.device_fingerprint}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                 <DimensionBox label="Angular Velocity Norm" value={video.result.kinetic_dimensions.angular_velocity_norm.toFixed(5)} />
                 <DimensionBox label="Syntax Complexity" value={video.result.kinetic_dimensions.syntax_complexity_index.toFixed(4)} />
              </div>
              
              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-green-500" />
                    <span className="text-zinc-400 font-medium text-xs">Author: <span className="text-white font-bold">{video.claim?.conceptualAuthor || 'ROOT'}</span></span>
                  </div>
                  {isB ? (
                    <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] font-bold">
                       <Orbit size={12} />
                       <span>RELAY_SETTLED_BASE</span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-zinc-700 italic font-mono">{video.result.liability_seal}</span>
                  )}
                </div>
                <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 flex gap-4 items-center">
                   <Info size={16} className="text-zinc-700 shrink-0" />
                   <p className="text-[9px] text-zinc-600 leading-relaxed uppercase tracking-widest font-black">
                      IP ARCHITECTURE VERIFIED. DIMENSIONS REGISTERED TO CANONICAL LEDGER.
                   </p>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// UI Components
const ArtifactStat: React.FC<{ label: string, value: string, sub: string, icon: React.ReactNode }> = ({ label, value, sub, icon }) => (
  <div className="bg-black/50 rounded-[2rem] p-6 border border-white/5 relative overflow-hidden group hover:border-[#c9a15a]/30 transition-all">
    <div className="absolute top-0 right-0 p-4 transition-transform group-hover:scale-110 duration-700">{icon}</div>
    <div className="relative z-10">
      <p className="text-[10px] uppercase font-black text-zinc-600 tracking-widest mb-3">{label}</p>
      <p className="text-3xl font-serif font-bold text-white italic tracking-tight">{value}</p>
      <p className="text-[9px] text-zinc-600 mt-2 font-black uppercase tracking-wider">{sub}</p>
    </div>
  </div>
);

const MotherboardStat: React.FC<{label: string, value: string, sub: string, icon: React.ReactNode}> = ({label, value, sub, icon}) => (
  <div className="bg-white/[0.01] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden group hover:bg-white/[0.03] transition-all">
     <div className="absolute top-0 right-0 p-8 text-[#c9a15a] opacity-10 group-hover:opacity-20 transition-opacity">{icon}</div>
     <p className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em] mb-4">{label}</p>
     <p className="text-5xl font-serif font-bold text-white italic mb-2 tracking-tighter">{value}</p>
     <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{sub}</p>
  </div>
);

const DimensionBox: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-black/40 p-5 rounded-[1.5rem] border border-white/5 group hover:border-[#c9a15a]/40 transition-all">
    <p className="text-[9px] uppercase font-black text-zinc-600 mb-2 tracking-widest">{label}</p>
    <p className="text-xl font-mono font-bold text-[#c9a15a] tracking-tighter">{value}</p>
  </div>
);

const RoleButton: React.FC<{active: boolean, onClick: () => void, icon: React.ReactNode, label: string, subText?: string}> = ({active, onClick, icon, label, subText}) => (
  <button onClick={onClick} className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 group ${active ? 'bg-[#c9a15a] text-black shadow-xl shadow-yellow-900/20' : 'hover:bg-white/5 text-zinc-500'}`}>
    <div className="flex items-center gap-4">
      <div className={`transition-colors ${active ? 'text-black' : 'text-zinc-700 group-hover:text-zinc-400'}`}>
        {icon}
      </div>
      <div>
        <p className={`text-[12px] font-black uppercase tracking-widest leading-tight ${active ? 'text-black' : 'text-zinc-300'}`}>{label}</p>
        <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${active ? 'text-black/60' : 'text-zinc-600'}`}>{subText}</p>
      </div>
    </div>
  </button>
);

const NavButton: React.FC<{active: boolean, onClick: () => void, icon: React.ReactNode, label: string}> = ({active, onClick, icon, label}) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-black text-[11px] uppercase tracking-[0.3em] ${active ? 'bg-[#c9a15a]/10 text-[#c9a15a]' : 'text-zinc-600 hover:text-white hover:bg-white/5'}`}>
    <div className={active ? 'text-[#c9a15a]' : 'text-zinc-700'}>{icon}</div>
    {label}
  </button>
);

const EcosystemIcon: React.FC<{active: boolean, icon: React.ReactNode, onClick: () => void, label: string, depth: number}> = ({active, icon, onClick, label, depth}) => (
  <button onClick={onClick} className="group relative flex flex-col items-center">
    <div className={`p-4 rounded-2xl transition-all duration-500 border-2 ${
      active 
        ? 'bg-[#c9a15a] text-black border-[#c9a15a] shadow-[0_0_25px_rgba(201,161,90,0.3)]' 
        : 'text-zinc-700 hover:text-zinc-400 border-transparent hover:border-white/10'
    }`}>
      {icon}
    </div>
    <div className="mt-2 flex gap-0.5">
       {Array.from({length: depth}).map((_, i) => (
         <div key={i} className={`w-1 h-1 rounded-full ${active ? 'bg-[#c9a15a]' : 'bg-zinc-800'}`}></div>
       ))}
    </div>
    <span className="absolute left-full ml-4 px-3 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-2xl">
      {label}
    </span>
  </button>
);

const MapDetailCard: React.FC<{ title: string, body: string, icon: React.ReactNode, color: string }> = ({ title, body, icon, color }) => (
  <div className="glass p-10 rounded-[2.5rem] border-white/5 group hover:border-[#c9a15a]/30 transition-all flex flex-col h-full shadow-2xl">
    <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center`} style={{ backgroundColor: color + '22', color: color }}>
      {icon}
    </div>
    <h3 className="text-2xl font-serif font-bold text-white italic mb-4">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed font-medium">{body}</p>
  </div>
);

const InputField: React.FC<{label: string, value: string, onChange: (v: string) => void, placeholder?: string}> = ({label, value, onChange, placeholder}) => (
  <div className="space-y-2 flex-1">
    <label className="text-[10px] uppercase font-black tracking-widest text-zinc-600 px-1">{label}</label>
    <input 
      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-xs focus:border-[#c9a15a] outline-none transition-all font-bold placeholder:text-zinc-800 text-zinc-300 hover:border-white/20" 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder} 
    />
  </div>
);

export default App;