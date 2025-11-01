module.exports = {
  supabase: {
    auth: {
      signOut: jest.fn(),
      signInWithOAuth: jest.fn(),
      getUser: jest.fn(() => ({ data: { user: null }, error: null })),
      getSession: jest.fn(() => ({ data: { session: null }, error: null })),
    },
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ data: [], error: null }),
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
      eq: jest.fn(),
      order: jest.fn(),
      limit: jest.fn(),
    })),
  }
};