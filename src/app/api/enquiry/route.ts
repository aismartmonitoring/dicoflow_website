import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), '.data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readEnquiries() {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeEnquiries(data: unknown[]) {
  await ensureDataDir();
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Simple field validation
function sanitize(str: string): string {
  return String(str).trim().slice(0, 1000);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName, organization, email, phone, interestedTier, branchCount, currentSystem, message } = body;

    // Validate required fields
    if (!fullName || !organization || !email) {
      return NextResponse.json({ error: 'fullName, organization, and email are required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate tier if provided
    const validTiers = ['', 'T1', 'T2', 'T3', 'T4', 'T5'];
    if (interestedTier && !validTiers.includes(interestedTier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    const enquiry = {
      id: crypto.randomUUID(),
      fullName: sanitize(fullName),
      organization: sanitize(organization),
      email: sanitize(email),
      phone: sanitize(phone || ''),
      interestedTier: interestedTier || '',
      branchCount: sanitize(branchCount || '1'),
      currentSystem: sanitize(currentSystem || ''),
      message: sanitize(message || ''),
      timestamp: new Date().toISOString(),
      status: 'new',
    };

    const enquiries = await readEnquiries();
    enquiries.push(enquiry);
    await writeEnquiries(enquiries);

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
