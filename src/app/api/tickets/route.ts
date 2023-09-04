import { NextRequest, NextResponse } from 'next/server';
import { get_tickets, new_ticket } from './util/tickets';

export async function GET(req: NextRequest) {
  return get_tickets(req);
}

export async function POST(req: NextRequest) {
  let data = await req.json();
  return new_ticket(req, data);
}