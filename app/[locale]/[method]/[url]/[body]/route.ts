import { NextRequest, NextResponse } from 'next/server';
import base64 from 'base-64';

export async function GRAPHQL(
  request: NextRequest,
  { params }: { params: { method: string; url: string; body?: string } }
) {
  return handleRequest(params, 'POST', request);
}

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { method: string; url: string; body?: string } }
) {
  return handleRequest(params, 'PATCH', request);
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: { method: string; url: string; body?: string } }
) {
  return handleRequest(params, 'OPTIONS', request);
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: { method: string; url: string; body?: string } }
) {
  return handleRequest(params, 'HEAD', request);
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

  const isGraphQL =
    headers['Content-Type'] === 'application/graphql' ||
    decodedUrl.includes('/graphql');

  let fetchOptions: RequestInit;

  if (isGraphQL) {
    fetchOptions = {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: decodedBody,
      }),
    };
  } else {
    fetchOptions = {
      method,
      headers,
      body: decodedBody,
    };
  }

  try {
    const response = await fetch(decodedUrl, fetchOptions);

    const contentType = response.headers.get('content-type') || '';
    let data;

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
