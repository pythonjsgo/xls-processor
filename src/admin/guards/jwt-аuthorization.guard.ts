import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const jwtToken = request.headers.authorization;
        if (!jwtToken) {
            return false;
        }

        //console.log(this.configService.get('JWT_SECRET'), 'fkjdfdjh')
        try {
            const decoded = this.jwtService.verify(jwtToken, {secret: this.configService.get('JWT_SECRET')})
            request.user = decoded; // Store user information in the request object for later use
            return true;
        } catch (error) {
            return false;
        }
    }
}
