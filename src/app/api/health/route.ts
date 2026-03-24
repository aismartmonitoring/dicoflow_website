import { NextResponse } from 'next/server';

export async function GET() {
  // Health check endpoint for Azure monitoring
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: {
      used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
      total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100
    },
    platform: {
      node: process.version,
      platform: process.platform,
      arch: process.arch
    }
  };

  return NextResponse.json(healthData, { status: 200 });
}

export async function HEAD() {
  // Simple health check for monitoring systems
  return new NextResponse(null, { status: 200 });
}