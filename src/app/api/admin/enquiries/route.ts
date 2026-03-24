import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), '.data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

function verifyApiKey(req: NextRequest): boolean {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return false;
  const provided = req.headers.get('x-api-key') || req.nextUrl.searchParams.get('key');
  if (!provided) return false;
  // Timing-safe comparison
  try {
    return crypto.timingSafeEqual(Buffer.from(key), Buffer.from(provided));
  } catch {
    return false;
  }
}

async function readEnquiries() {
  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  if (!verifyApiKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const enquiries = await readEnquiries();

  // Support ?format=csv
  const format = req.nextUrl.searchParams.get('format');
  if (format === 'csv') {
    const headers = ['id', 'timestamp', 'status', 'fullName', 'organization', 'email', 'phone', 'interestedTier', 'branchCount', 'currentSystem', 'message'];
    const csvRows = [
      headers.join(','),
      ...enquiries.map((e: Record<string, string>) =>
        headers.map((h) => `"${String(e[h] || '').replace(/"/g, '""')}"`).join(',')
      ),
    ];
    return new NextResponse(csvRows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({ total: enquiries.length, enquiries });
}
