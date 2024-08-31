import { NextRequest, NextResponse } from 'next/server';
import base64 from 'base-64';

export async function POST(
  request: NextRequest,
  { params }: { params: { method: string; url: string; body?: string } }
) {
  return handleRequest(params, 'POST', request);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { method: string; url: string; body?: string } }
) {
  return handleRequest(params, 'PUT', request);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { method: string; url: string; body?: string } }
) {
  return handleRequest(params, 'DELETE', request);
}

async function handleRequest(
  params: { method: string; url: string; body?: string },
  method: string,
  request?: NextRequest
) {
  const decodedUrl = base64.decode(params.url);
  const decodedBody = params.body ? base64.decode(params.body) : undefined;

  const headers: HeadersInit = {};

  const queryParams = request?.url.split('?')[1];
  if (queryParams) {
    const queryPairs = new URLSearchParams(queryParams);
    queryPairs.forEach((value, key) => {
      headers[key] = base64.decode(value);
    });
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
    body: decodedBody,
  };

  try {
    const response = await fetch(decodedUrl, fetchOptions);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
