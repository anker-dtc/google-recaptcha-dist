import { HttpService } from '@nestjs/common';
import { GoogleRecaptchaValidatorOptions } from '../interfaces/google-recaptcha-validator-options';
import { GoogleRecaptchaValidationResult } from '../interfaces/google-recaptcha-validation-result';
import { VerifyResponseOptions } from '../interfaces/verify-response-decorator-options';
export declare class GoogleRecaptchaValidator {
    private readonly http;
    private readonly options;
    static GOOGLE_RECAPTCHA_SECRET_MAP: {};
    private readonly defaultNetwork;
    private readonly headers;
    constructor(http: HttpService, options: GoogleRecaptchaValidatorOptions);
    /**
     * @throws GoogleRecaptchaNetworkException
     * @param {VerifyResponseOptions} options
     */
    validate(options: VerifyResponseOptions, headers?: any): Promise<GoogleRecaptchaValidationResult>;
    private verifyResponse;
    private isValidAction;
    private isValidScore;
    private isUseV3;
}
