'use client';

import GraphiQLClient from '@/components/GraphiQLClient/GraphiQLClient';
import RESTfullClient from '@/components/RESTfullClient/RESTfullClient';
import { useParams, notFound } from 'next/navigation';
import React from 'react';

export default function RESTfullPage() {
  const params = useParams();
  const locale = typeof params.locale === 'string' ? params.locale : 'en';
  const method = typeof params.method === 'string' ? params.method : 'GET';
  const encodedUrl =
    typeof params.encodedUrl === 'string' ? params.encodedUrl : '';
  const encodedBody =
    typeof params.encodedBody === 'string' ? params.encodedBody : '';

  const validRESTMethods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'HEAD',
    'OPTIONS',
  ];
  const isValidMethod =
    validRESTMethods.includes(method) || method === 'GRAPHQL';

  if (!isValidMethod) {
    notFound();
  }

  return method === 'GRAPHQL' ? (
    <GraphiQLClient params={{ method, encodedUrl, encodedBody, locale }} />
  ) : (
    <RESTfullClient params={{ method, encodedUrl, encodedBody, locale }} />
  );
}
