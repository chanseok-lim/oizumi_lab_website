
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const {
        OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET,
    } = process.env;

    if (!code) {
        return NextResponse.json({ error: 'Missing code' }, { status: 400 });
    }

    if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET) {
        return NextResponse.json({ error: 'Missing OAuth credentials' }, { status: 500 });
    }

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: OAUTH_CLIENT_ID,
                client_secret: OAUTH_CLIENT_SECRET,
                code,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: data.error_description || data.error }, { status: 400 });
        }

        // Decap CMS expects a script that sends a message to the opener
        const content = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({
            token: data.access_token,
            provider: 'github',
        })}',
            '*'
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      </script>
    `;

        return new NextResponse(content, {
            headers: { 'Content-Type': 'text/html' },
        });
    } catch (error) {
        console.error('OAuth error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
