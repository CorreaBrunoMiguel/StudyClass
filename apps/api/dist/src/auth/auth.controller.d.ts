import { AuthService } from './auth.service';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    health(): {
        ok: boolean;
    };
    signup(body: any): Promise<{
        accessToken: string;
    }>;
    login(body: any): Promise<{
        accessToken: string;
    }>;
    me(req: any): any;
}
