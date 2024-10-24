export interface JWTPayload {
    sub: number,
    email: string,
    password: string,
    auth_method: string
};