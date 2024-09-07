export const replaceVariablesInRequestBody = (
  body: string,
  variables: [string, string][]
) => {
  let processedBody = body;

  variables.forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    processedBody = processedBody.replace(regex, value);
  });

  return processedBody;
};
