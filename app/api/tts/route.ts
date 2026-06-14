import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    console.log('TTS request for text:', text);

    // Check if API key is set
    const fishKey = process.env.FISH_AUDIO_API_KEY;
    console.log('FISH_AUDIO_API_KEY exists:', !!fishKey);
    console.log('FISH_AUDIO_API_KEY length:', fishKey?.length);

    if (!fishKey) {
      console.error('FISH_AUDIO_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Call Fish.audio API for text-to-speech
    // Note: Fish.audio API may require different endpoint/parameters
    const response = await fetch('https://api.fish.audio/v1/tts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${fishKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voice_id: 'ennead', // Default English voice
        speed: 1.0,
      }),
    });

    console.log('Fish.audio response status:', response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error('Fish.audio API error:', error);
      return NextResponse.json(
        { error: `Failed to generate speech: ${error}` },
        { status: response.status }
      );
    }

    // Fish.audio returns audio directly
    const audioBuffer = await response.arrayBuffer();
    console.log('Audio buffer size:', audioBuffer.byteLength);

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="speech.mp3"',
      },
    });
  } catch (error: unknown) {
    console.error('TTS API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate speech';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
