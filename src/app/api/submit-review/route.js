import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, location, service, rating, comment, captchaToken } = await req.json();

    // 1. Verify Cloudflare Turnstile Captcha (Optional: Skips if secret is not set in .env.local)
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

    // 3. Generate Approval and Rejection Links
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const secret = process.env.ADMIN_SECRET_KEY;
    const approveUrl = `${siteUrl}/api/review-action?action=approve&id=${review.id}&secret=${secret}`;
    const rejectUrl = `${siteUrl}/api/review-action?action=reject&id=${review.id}&secret=${secret}`;

    // 4. Send Email via Resend
    await resend.emails.send({
      from: 'Logic Ten Reviews <onboarding@resend.dev>', // Free default domain for testing
      to: process.env.ADMIN_EMAIL,
      subject: `New Review Pending Approval from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0;">New Review Submitted</h2>
          <p style="margin: 6px 0; color: #334155;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 6px 0; color: #334155;"><strong>Location:</strong> ${location || 'N/A'}</p>
          <p style="margin: 6px 0; color: #334155;"><strong>Service:</strong> ${service || 'N/A'}</p>
          <p style="margin: 6px 0; color: #334155;"><strong>Rating:</strong> ${'★'.repeat(rating)} (${rating}/5)</p>
          <p style="margin: 6px 0; color: #334155;"><strong>Comment:</strong> "${comment}"</p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          
          <p style="font-size: 14px; color: #64748b; margin-bottom: 16px;">Moderation Action:</p>
          
          <div>
            <a href="${approveUrl}" style="background-color: #16a34a; color: white; padding: 10px 18px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block; margin-right: 10px;">Approve Review</a>
            <a href="${rejectUrl}" style="background-color: #dc2626; color: white; padding: 10px 18px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">Reject Review</a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Review submitted for moderation.' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}