// Vercel Edge Middleware: /admin ve /admin/* yollarını Basic Auth ile korur.
// Gerekli env değişkenleri: ADMIN_USER, ADMIN_PASS

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};

function unauthorized() {
  return new Response('Yetkisiz erişim', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  });
}

// Uzunluk dışında zamanlama farkı sızdırmayan karşılaştırma
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export default function middleware(request) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  // Env değişkenleri tanımlı değilse erişimi kapat
  if (!user || !pass) return unauthorized();

  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');
  if (scheme !== 'Basic' || !encoded) return unauthorized();

  let decoded;
  try {
    decoded = new TextDecoder().decode(
      Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0))
    );
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(':');
  if (sep === -1) return unauthorized();

  const okUser = safeEqual(decoded.slice(0, sep), user);
  const okPass = safeEqual(decoded.slice(sep + 1), pass);
  if (!(okUser && okPass)) return unauthorized();

  // Yanıt döndürülmezse istek normal şekilde devam eder
}
