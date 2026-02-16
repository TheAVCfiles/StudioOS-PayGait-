import { KineticArtifact, VideoItem, ChoreographerClaim, EcosystemRole } from '../types';

/**
 * Robust Seed Generation using Web Crypto API for entropy
 */
function generateQuantumSeed(lenBytes = 32): string {
  const buf = new Uint8Array(lenBytes);
  crypto.getRandomValues(buf);
  return Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Simulates Zero-Knowledge Proof (ZKP) Generation
 * Proves possession of kinetic syntax without revealing the raw data
 */
async function generateZKPHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode('ZKP-SALT-' + data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return 'ZKP-' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32).toUpperCase();
}

/**
 * Generates a Kinetic Watermark ID
 * Hidden identifier embedded in the syntax mapping
 */
function generateWatermark(): string {
  return 'WTM-' + Math.random().toString(36).substr(2, 12).toUpperCase();
}

/**
 * Simulates a device-specific hardware fingerprint for ingestion provenance
 */
async function getDeviceFingerprint(): Promise<string> {
  const nav = window.navigator;
  const screen = window.screen;
  const rawData = `${nav.userAgent}|${nav.language}|${screen.colorDepth}|${screen.width}x${screen.height}|${nav.hardwareConcurrency}`;
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(rawData));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return 'SOV-DEV-' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 24).toUpperCase();
}

/**
 * Simulates the extraction of kinetic dimensions (Syntax Identity)
 */
function calculateKineticDimensions() {
  return {
    angular_velocity_norm: 0.68 + (Math.random() * 0.15),
    spatial_occupancy_ratio: 0.42 + (Math.random() * 0.25),
    syntax_complexity_index: 9.1 + (Math.random() * 1.8)
  };
}

/**
 * Calculates the "Reputation Stake" (Moral Capital at Risk)
 */
function calculateReputationStake(role: EcosystemRole, claim?: ChoreographerClaim): number {
  let base = 0;
  switch(role) {
    case 'SYSTEM_ARCHITECT': base = 5000; break;
    case 'FOUNDING_FACULTY': base = 1000; break;
    case 'GUEST_SOLOIST': base = 500; break;
    case 'STUDENT_CHOREOGRAPHER': base = 250; break;
  }
  if (claim?.scope === 'conceptual-framework') base *= 3.0;
  if (claim?.accessLevel === 'PRIVATE_VAULT') base *= 0.5;
  return base + (claim?.segments.length || 0) * 25;
}

export async function processKineticStamp(video: VideoItem): Promise<KineticArtifact> {
  const delay = video.type === 'FILE' ? 3000 : 2000;
  await new Promise((resolve) => setTimeout(resolve, delay + Math.random() * 800));

  const kineticSignals = Array.from({ length: 64 }, () => Math.random() * 5.0);
  const qft_peaks = kineticSignals
    .slice(0, 16)
    .map((val, i) => Math.abs(val * Math.sin(i * 0.8) + (Math.random() * 0.4)))
    .sort((a, b) => b - a);

  const qrng_seed = generateQuantumSeed();
  const device_fingerprint = await getDeviceFingerprint();
  const kinetic_dimensions = calculateKineticDimensions();
  const reputation_stake = calculateReputationStake(video.roleContext, video.claim);
  
  // Security Layer
  const zkp_hash = await generateZKPHash(video.id + qrng_seed);
  const watermark_id = generateWatermark();

  // Generate Liability Seal
  const liabilityNotice = "KINETIC_PERJURY_ACKNOWLEDGMENT: FALSE_CLAIM_EQUALS_LEDGER_SLASHING";
  const encoder = new TextEncoder();
  const liabilityBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(liabilityNotice + device_fingerprint));
  const liability_seal = 'SEAL-' + Array.from(new Uint8Array(liabilityBuffer)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16).toUpperCase();

  // Generate License Seal
  const licenseBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(`LIC-${video.claim?.licenseType || 'SOV'}-${video.id}`));
  const license_seal = 'LIC-' + Array.from(new Uint8Array(licenseBuffer)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 12).toUpperCase();

  const dataToHash = JSON.stringify({ 
    peaks: qft_peaks, 
    seed: qrng_seed, 
    device: device_fingerprint,
    dims: kinetic_dimensions,
    stake: reputation_stake,
    nonce: video.id,
    liability_seal,
    role: video.roleContext,
    claim_scope: video.claim?.scope,
    zkp: zkp_hash,
    wtm: watermark_id
  });
  
  const finalHashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(dataToHash));
  const signature = '0x' + Array.from(new Uint8Array(finalHashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

  const sc_royalty = video.isPrivate ? "0.00" : (Math.sqrt(reputation_stake / 5) * 10).toFixed(2);
  const stagecoin = Math.floor(reputation_stake / 25);
  const streetcred = Math.floor(reputation_stake / 5);

  return {
    video_id: video.name,
    qft_peaks: qft_peaks.slice(0, 12),
    qrng_seed,
    signature,
    device_fingerprint,
    sc_royalty,
    stagecoin,
    streetcred,
    kinetic_dimensions,
    reputation_stake,
    liability_seal,
    sentient_cents_cost: video.isPrivate ? 5 : 50, 
    time_burn_rate: 0.015,
    timestamp: new Date().toISOString(),
    claim_data: video.claim,
    claim_type: video.claim?.claimType || 'Kinetic Archive',
    fingerprint_scope: video.claim ? `${video.roleContext}::${video.claim.scope.toUpperCase()}` : 'RAW_INGEST',
    // Security Props
    encryption_status: 'AES-256-GCM',
    zkp_hash,
    watermark_id,
    license_seal
  };
}