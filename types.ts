export enum VideoSourceType {
  URL = 'URL',
  FILE = 'FILE'
}

export type EcosystemLayer = 'SOLOIST_AURA' | 'STAGEPORT_OS' | 'STUDIO_SHELF' | 'THEATRE_SYSTEM';
export type EcosystemRole = 'FOUNDING_FACULTY' | 'STUDENT_CHOREOGRAPHER' | 'GUEST_SOLOIST' | 'SYSTEM_ARCHITECT';

export interface RoleMetadata {
  title: string;
  depth: number;
  permissions: string[];
  description: string;
  color: string;
}

export type ClaimScope = 'solo' | 'whole-work' | 'ensemble' | 'conceptual-framework';
export type LicenseType = 'CC-BY-NC-ND' | 'FULL_SOVEREIGN' | 'STUDIO_COMMERCIAL' | 'EDUCATIONAL_ONLY';

export interface DancerContribution {
  id: string;
  name: string;
  role: string;
  stake: number;
}

export interface ProductionSegment {
  id: string;
  label: string;
  contributor: string;
  startTime: string;
  endTime: string;
  contributionPercentage: number;
  dancers: DancerContribution[];
}

export interface ChoreographerClaim {
  workTitle: string;
  conceptualAuthor: string;
  primaryChoreographer: string;
  claimType: string;
  stakePercentage: number;
  scope: ClaimScope;
  initiatedAt: string;
  syntaxLexicon?: string;
  segments: ProductionSegment[];
  nestingDepth: number; 
  accessLevel: 'PRIVATE_VAULT' | 'STUDIO_CORRIDOR' | 'PUBLIC_REGISTRY';
  perjuryAcknowledgment: boolean;
  licenseType: LicenseType;
}

export interface VideoItem {
  id: string;
  type: VideoSourceType;
  value: string | File;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error' | 'bridged';
  isPrivate: boolean;
  roleContext: EcosystemRole;
  result?: KineticArtifact;
  claim?: ChoreographerClaim;
}

export interface KineticArtifact {
  video_id: string;
  qft_peaks: number[];
  qrng_seed: string;
  signature: string;
  device_fingerprint: string;
  sc_royalty: string;
  stagecoin: number;
  streetcred: number;
  timestamp: string;
  claim_data?: ChoreographerClaim;
  claim_type: string;
  fingerprint_scope: string;
  kinetic_dimensions: {
    angular_velocity_norm: number;
    spatial_occupancy_ratio: number;
    syntax_complexity_index: number;
  };
  reputation_stake: number; 
  liability_seal: string;
  sentient_cents_cost: number; 
  time_burn_rate: number;
  // Security Enhancements
  encryption_status: 'AES-256-GCM' | 'UNENCRYPTED' | 'HYBRID_RSA';
  zkp_hash: string; // Zero-Knowledge Proof Reference
  watermark_id: string; // Hidden kinetic watermark
  license_seal: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SYSTEM' | 'SECURITY';
  message: string;
  module: string;
}

export interface UserWallet {
  sentientCents: number;
  stagecoin: number;
  streetcred: number;
  lastDecay: string;
  stakedAmount: number;
  investmentTier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  encryptionKeySet: boolean;
}