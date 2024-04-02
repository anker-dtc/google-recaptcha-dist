import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GoogleRecaptchaValidator } from '../services/google-recaptcha.validator';
import { GoogleRecaptchaGuardOptions } from '../interfaces/google-recaptcha-guard-options';
import { Reflector } from '@nestjs/core';
import { RecaptchaRequestResolver } from '../services/recaptcha-request.resolver';
export declare class GoogleRecaptchaGuard implements CanActivate {
    private readonly validator;
    private readonly reflector;
    private readonly requestResolver;
    private readonly options;
    constructor(validator: GoogleRecaptchaValidator, reflector: Reflector, requestResolver: RecaptchaRequestResolver, options: GoogleRecaptchaGuardOptions);
    canActivate(context: ExecutionContext): Promise<true | never>;
}
