import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'API知识站 - AI API 选型与购买教程';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* 装饰背景 */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Logo / Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #3b82f6, #10b981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
            }}
          >
            API
          </div>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
            }}
          >
            API知识站
          </h1>
        </div>
        {/* Tagline */}
        <p
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          AI API 选型、购买教程、测评与本地部署指南
        </p>
        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 48,
          }}
        >
          {['OpenAI', 'Claude', 'DeepSeek', '通义千问', 'Gemini'].map((name) => (
            <div
              key={name}
              style={{
                padding: '10px 24px',
                borderRadius: 24,
                background: 'rgba(255,255,255,0.08)',
                color: '#cbd5e1',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {name}
            </div>
          ))}
        </div>
        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 20,
            color: '#64748b',
          }}
        >
          apiuspro.cn
        </div>
      </div>
    ),
    { ...size },
  );
}
