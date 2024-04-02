import { DynamicModule } from '@nestjs/common';
import { GoogleRecaptchaModuleAsyncOptions, GoogleRecaptchaModuleOptions } from './interfaces/google-recaptcha-module-options';
export declare class GoogleRecaptchaModule {
    static forRoot(options: GoogleRecaptchaModuleOptions): DynamicModule;
    static forRootAsync(options: GoogleRecaptchaModuleAsyncOptions): DynamicModule;
    private static resolveHttpModule;
    private static transformAxiosConfig;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
    private static isGoogleRecaptchaFactory;
}
