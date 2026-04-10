export async function POST(request) {
  try {
    const apiKey = process.env.TELECRM_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing TELECRM_API_KEY' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();

    const resp = await fetch('https://api.telecrm.in/enterprise/658abddbf911ed2d692b0cf5/autoupdatelead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const text = await resp.text();
    return new Response(text, {
      status: resp.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Unexpected error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
