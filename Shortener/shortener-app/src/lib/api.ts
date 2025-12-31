import { CreateShortUrlDto, ShortUrlDto, ShortUrl } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7153';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, `API request failed: ${response.statusText}`);
  }

  return response.json();
}

export async function createShortUrl(dto: CreateShortUrlDto): Promise<ShortUrlDto> {
  return fetchApi<ShortUrlDto>('/shortener', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function getAllShortUrls(): Promise<ShortUrl[]> {
  return fetchApi<ShortUrl[]>('/');
}

export async function getVisitCount(code: string): Promise<number> {
  return fetchApi<number>(`/shortener/${code}/visits`);
}
