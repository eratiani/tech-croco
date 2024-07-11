import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { inject } from '@angular/core';
function trimErrorString(str: string) {
  const index = str.lastIndexOf(':');
  return str.slice(index);
}
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandler = inject(ErrorHandlerService);

  return next(req).pipe(
    catchError((error) => {
      const newError = `Status Code${trimErrorString(error.message)}`;
      errorHandler.errorMsg$.next({ error: newError });
      return of();
    }),

    tap(() => {
      errorHandler.errorMsg$.next({ error: null });
    })
  );
};
