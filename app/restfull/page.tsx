import RESTfullClient from '@/components/RESTfullClient/RESTfullClient';

export default function RESTfullPage() {
  const params = {
    method: 'GET',
    encodedUrl: '',
    encodedBody: '',
  };

  return (
    <>
      <h1>RESTful Client</h1>
      <RESTfullClient params={params} />
    </>
  );
}
