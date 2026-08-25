import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(req) {
  try {
    const { name, location, service, rating, comment, captchaToken } = await req.json();

    // 1. Verify Cloudflare Turnstile Captcha (Optional: Skips if secret is not set in environment)
    if (process.env.TURNSTILE_SECRET_KEY && captchaToken) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: captchaToken,
        }),
      });
      const captchaResult = await verifyRes.json();
      if (!captchaResult.success) {
        return NextResponse.json({ error: 'Captcha validation failed.' }, { status: 400 });
      }
    }

    // 2. Insert Pending Review into Supabase
    const { data: review, error } = await supabaseAdmin
      .from('reviews')
      .insert([{ name, location, service, rating: Number(rating), comment, is_approved: false }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Review submitted for moderation.' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}