import { HttpInterceptorFn } from "@angular/common/http";

export const authIntecerptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');

    if (token) {
        const requestClonada = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(requestClonada);
    }
    return next(req);
}