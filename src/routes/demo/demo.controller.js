export async function demo(ctx) {
  ctx.body = 'It works!';
}

/**
 * Demo Error Responder: Deliberataly return 500 error for testing.
 */
export async function error(ctx) {
  ctx.status = 500;
  ctx.message = 'App Error (this is intentional)!';
}

/**
 * Demo Error Responder: Deliberataly return 500 error without message for testing.
 */
export async function errorWithoutMessage() {
  // eslint-disable-next-line no-console
  console.log('About to throw an error deliberately, ignore it.');
  throw new Error('');
}
