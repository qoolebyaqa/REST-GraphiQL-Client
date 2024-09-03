'use client';

import RESTfullClient from '@/components/RESTfullClient/RESTfullClient';
import { useParams } from 'next/navigation';
import React from 'react';

export default function RESTfullPage() {
  const params = useParams();
  const method = typeof params.method === 'string' ? params.method : 'GET';
  const encodedUrl =
    typeof params.encodedUrl === 'string' ? params.encodedUrl : '';
  const encodedBody =
    typeof params.encodedBody === 'string' ? params.encodedBody : '';
  console.log(method)
  return (
    <RESTfullClient params={{ method, encodedUrl, encodedBody }} />
  );
}
