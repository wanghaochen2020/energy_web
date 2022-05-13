export const ENUSMESSAGES = {
  copyright: 'Copyright@Colin Wang',
  deleteConfirm: 'Are you sure to delete it(them)?',
  noData: 'No data',
  resetPasswordConfirm: 'Are you sure to reset password?',
  siteName: 'Enterprise office automatic system',
  passwordMismatch: 'New passwords are different',
  invalidParameters: 'Invalid parameters',
  unauthorized: 'Sorry, you are unauthorized to visit this page.',
  notFound: 'Not found.',
  succeeded: 'Succeeded',
  required: (name) => typeof name === 'string' ? `${name} is required.` : `${name.join(', ')} ${name.length === 1? 'is' : 'are'} required.`,
  invalidFormat: (name) => typeof name === 'string' ? ` ${name} is invalid.` : ` ${name.join(', ')} ${name.length === 1? 'is' : 'are'} invalid.`,
};
