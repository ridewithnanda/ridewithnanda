require('@testing-library/jest-dom');

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock NextRequest and NextResponse
class MockRequest {
  constructor(url, init = {}) {
    this.url = url;
    this.method = init.method || 'GET';
    this._json = init.body ? JSON.parse(init.body) : {};
  }

  async json() {
    return this._json;
  }
}

class MockResponse {
  constructor(body, init = {}) {
    this._body = body;
    this.status = init.status || 200;
  }

  async json() {
    return this._body;
  }
}

jest.mock('next/server', () => ({
  __esModule: true,
  NextRequest: MockRequest,
  NextResponse: {
    json: (body, init) => new MockResponse(body, init || { status: 200 }),
  },
}));

// Mock Supabase
jest.mock('@/lib/supabaseClient', () => ({
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
}));

jest.mock('@/lib/supabaseAdmin', () => {
  const mockData = {
    subscribers: [],
    bookings: [],
    drivers: []
  };

  const createChainableResponse = (data = [], error = null, depth = 0) => {
    if (depth > 2) {
      // Return final result after max depth
      return {
        then: jest.fn().mockImplementation((callback) => Promise.resolve(callback({ data, error })))
      };
    }

    return {
      select: jest.fn().mockReturnValue(createChainableResponse(data, error, depth + 1)),
      eq: jest.fn().mockReturnValue(createChainableResponse(data, error, depth + 1)),
      limit: jest.fn().mockReturnValue(createChainableResponse(data, error, depth + 1)),
      delete: jest.fn().mockReturnValue(createChainableResponse(data, error, depth + 1)),
      then: jest.fn().mockImplementation((callback) => Promise.resolve(callback({ data, error }))),
    };
  };

  const mockFrom = (tableName) => ({
    insert: jest.fn().mockImplementation((data) => {
      mockData[tableName] = [...(mockData[tableName] || []), ...(Array.isArray(data) ? data : [data])];
      return createChainableResponse(mockData[tableName]);
    }),
    select: jest.fn().mockImplementation(() => {
      return createChainableResponse(mockData[tableName] || []);
    }),
    eq: jest.fn().mockReturnValue(createChainableResponse()),
    delete: jest.fn().mockReturnValue(createChainableResponse()),
    limit: jest.fn().mockImplementation((n) => {
      return createChainableResponse((mockData[tableName] || []).slice(0, n));
    }),
    then: jest.fn().mockImplementation((callback) => Promise.resolve(callback({ data: mockData[tableName] || [], error: null })))
  });

  const mock = {
    auth: {
      signOut: jest.fn(),
      signInWithOAuth: jest.fn(),
      getUser: jest.fn(() => ({ data: { user: null }, error: null })),
      getSession: jest.fn(() => ({ data: { session: null }, error: null })),
    },
    from: jest.fn().mockImplementation((table) => mockFrom(table))
  };

  return {
    __esModule: true,
    default: mock,
    supabaseAdmin: mock
  };
});

// Mock fetch and web APIs
const mockHeaders = {
  append: jest.fn(),
  delete: jest.fn(),
  get: jest.fn(),
  has: jest.fn(),
  set: jest.fn(),
  forEach: jest.fn(),
};

const mockCookies = {
  get: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
  getAll: jest.fn(),
};

global.Headers = jest.fn(() => mockHeaders);
global.Request = jest.fn();
global.Response = jest.fn();

jest.mock('next/dist/compiled/@edge-runtime/cookies', () => ({
  RequestCookies: jest.fn().mockImplementation(() => mockCookies),
  ResponseCookies: jest.fn().mockImplementation(() => mockCookies)
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    headers: new global.Headers(),
    status: 200,
  })
);

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      refresh: jest.fn(),
      pathname: '/',
    };
  },
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
  headers: () => new Headers(),
}));

jest.mock('next/headers', () => ({
  headers: () => new Headers(),
  cookies: () => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  }),
}));

jest.mock('@/lib/supabase', () => ({
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
  },
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
}));

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      insert: () => Promise.resolve({ data: null, error: null }),
      select: () => Promise.resolve({ data: [], error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }),
  }),
}));

// Add fetch to global (needed for Next.js API route testing)
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Success' }),
  })
);