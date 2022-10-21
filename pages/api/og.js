import { ImageResponse } from '@vercel/og';
import { getRandomColor } from '../../utils/color';

export const config = {
  runtime: 'experimental-edge',
};

const font = fetch(new URL('../../fonts/Inter-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer());

export default async function handler(req) {
  try {
    const fontData = await font;
    const { searchParams: qp } = new URL(req.url);

    const title = qp.get('title');
    const background = qp.get('background');
    const color = qp.get('color');

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: background ?? '#000212',
            fontSize: 60,
            fontWeight: 'bold',
            fontFamily: '"Inter"',
            position: 'relative',
          }}>
          <div
            style={{
              display: 'flex',
              width: '75%',
              backgroundImage: color ?? getRandomColor(),
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              margin: '0 auto',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight: 1.4,
              letterSpacing: 2,
            }}>
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
