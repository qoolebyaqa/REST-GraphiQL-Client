/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  POST,
  PUT,
  PATCH,
  OPTIONS,
  HEAD,
  DELETE,
} from '@/app/[locale]/[method]/[url]/[body]/route';
import base64 from 'base-64';

global.fetch = jest.fn();

describe('API route handlers', () => {
  const mockResponseJson = jest.fn();

  beforeAll(() => {
    jest.spyOn(NextResponse, 'json').mockImplementation(mockResponseJson);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockRequest = (url: string) =>
    ({
      url,
      headers: {
        get: jest.fn(),
      },
    }) as unknown as NextRequest;

  test.each([
    ['POST', POST],
    ['PUT', PUT],
    ['PATCH', PATCH],
    ['OPTIONS', OPTIONS],
    ['HEAD', HEAD],
    ['DELETE', DELETE],
  ])('handles %s method', async (method, handler) => {
    const encodedUrl = base64.encode('https://example.com/api/test');
    const encodedBody = base64.encode(JSON.stringify({ query: '{ test }' }));

    const request = mockRequest(
      `https://localhost?Content-Type=${base64.encode('application/json')}`
    );

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      headers: {
        get: () => 'application/json',
      },
      json: () => Promise.resolve({ success: true }),
    });

    const response = await handler(request, {
      params: { method, url: encodedUrl, body: encodedBody },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://example.com/api/test',
      expect.objectContaining({
        method,
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          query: '{ test }',
        }),
      })
    );

    expect(mockResponseJson).toHaveBeenCalledWith(
      { success: true },
      { status: 200 }
    );
  });

  test('handles error during fetch', async () => {
    const encodedUrl = base64.encode('https://example.com/api/test');
    const encodedBody = base64.encode(JSON.stringify({ query: '{ test }' }));

    const request = mockRequest(
      `https://localhost?Content-Type=${base64.encode('application/json')}`
    );

    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Fetch failed')
    );

    const response = await POST(request, {
      params: { method: 'POST', url: encodedUrl, body: encodedBody },
    });

    expect(mockResponseJson).toHaveBeenCalledWith(
      { error: expect.any(Error) },
      { status: 500 }
    );
  });

  test('handles non-JSON response', async () => {
    const encodedUrl = base64.encode('https://example.com/api/test');
    const encodedBody = base64.encode('Test body');

    const request = mockRequest(
      `https://localhost?Content-Type=${base64.encode('application/json')}`
    );

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      headers: {
        get: () => 'text/plain',
      },
      text: () => Promise.resolve('Success'),
    });

    const response = await POST(request, {
      params: { method: 'POST', url: encodedUrl, body: encodedBody },
    });

    expect(mockResponseJson).toHaveBeenCalledWith('Success', { status: 200 });
  });
});
