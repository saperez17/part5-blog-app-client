export const ROUTES_NAVIGATION = {
    USERS: 'USERS',
    BLOGS: 'BLOGS'
  };

  export const ROUTES = {
    [ROUTES_NAVIGATION.USERS]: {
      path: [
        '/users',
        '/users/:id'
      ],
      strict: true,
      exact: true,
    },
    [ROUTES_NAVIGATION.BLOGS]: {
      path: [
        '/blogs',
        '/blogs/:blogId',
      ],
      strict: true,
      exact: true,
    },
  };
