// MSW entry point for browser
if (typeof window !== 'undefined') {
  const { worker } = require('./browser');
  worker.start();
}
