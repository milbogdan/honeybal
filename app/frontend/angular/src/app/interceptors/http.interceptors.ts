import { HttpInterceptorFn } from '@angular/common/http';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    withCredentials: true,
  });

  return next(cloned);
};