import { rest } from 'msw';

import { mockUsers } from '../data/users';

export const userHandlers = [
  rest.get('/api/admin/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUsers));
  }),
];
