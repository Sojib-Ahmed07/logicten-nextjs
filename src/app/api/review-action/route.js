import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  const id = searchParams.get('id');
  const secret = searchParams.get('secret');

  if (secret !== process.env.ADMIN_SECRET_KEY) {
    return new NextResponse('Unauthorized access key.', { status: 401 });
  }

  return new NextResponse(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm Review Moderation</title>
      <style>
        body { font-family: sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: #1e293b; border: 1px solid #334155; padding: 32px; border-radius: 16px; text-align: center; max-width: 400px; }
        .btn { display: inline-block; width: 100%; padding: 12px 0; border-radius: 8px; font-weight: bold; border: none; cursor: pointer; text-decoration: none; margin-top: 16px; font-size: 16px; }
        .btn-approve { background: #22c55e; color: white; }
        .btn-reject { background: #ef4444; color: white; }
      </style>
    </head>
    <body>
      <div class="card">
        <h2>Confirm Review ${action === 'approve' ? 'Approval' : 'Rejection'}</h2>
        <p style="color: #94a3b8; font-size: 14px;">Are you sure you want to ${action} this review?</p>
        <form method="POST" action="/api/review-action">
          <input type="hidden" name="action" value="${action}" />
          <input type="hidden" name="id" value="${id}" />
          <input type="hidden" name="secret" value="${secret}" />
          <button type="submit" class="btn ${action === 'approve' ? 'btn-approve' : 'btn-reject'}">
            Yes, ${action === 'approve' ? 'Approve Review' : 'Delete Review'}
          </button>
        </form>
      </div>
    </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const action = formData.get('action');
    const id = formData.get('id');
    const secret = formData.get('secret');

    if (secret !== process.env.ADMIN_SECRET_KEY) {
      return new NextResponse('Unauthorized access key.', { status: 401 });
    }

    if (action === 'approve') {
      await supabaseAdmin.from('reviews').update({ is_approved: true }).eq('id', id);
      return new NextResponse(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; color: #15803d; background-color: #f0fdf4; height: 100vh;">
          <h1 style="font-size: 32px;">✅ Review Approved!</h1>
          <p style="color: #374151;">The review is now live on your website.</p>
        </div>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    if (action === 'reject') {
      await supabaseAdmin.from('reviews').delete().eq('id', id);
      return new NextResponse(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; color: #b91c1c; background-color: #fef2f2; height: 100vh;">
          <h1 style="font-size: 32px;">❌ Review Rejected</h1>
          <p style="color: #374151;">The review has been permanently deleted from the database.</p>
        </div>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    return new NextResponse('Invalid Action', { status: 400 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
}