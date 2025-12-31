export interface ShortUrlDto {
  shortUrl: string;
  longUrl: string;
  code: string;
}

export interface CreateShortUrlDto {
  longUrl: string;
}

export interface ShortUrl {
  id: number;
  longUrl: string;
  code: string;
  createdAt: string;
}
