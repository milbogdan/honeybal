import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";

interface CachedResponse {
  response: HttpResponse<any>;
  expiry: number;
}

const cache = new Map<string, CachedResponse>();

export const CacheInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const defaultCacheTime = 5 * 60 * 1000;  // 5 minuta

  if (req.method !== 'GET') {
    return next(req);
  }

  const cacheKey = req.urlWithParams;
  const now = Date.now();

  const cached = cache.get(cacheKey);
  if (cached && now < cached.expiry) {
    console.log(`Returning cached response for: ${req.url}`);
    console.log(cached.response.body);
    return of(new HttpResponse({ body: cached.response.body, status: 200 }));
  }

  return next(req).pipe(
    tap(response => {
      if (response instanceof HttpResponse) {
        console.log(`Caching response for: ${req.url}`);
        cache.set(cacheKey, { response, expiry: now + defaultCacheTime });
      }
    })
  );
};
