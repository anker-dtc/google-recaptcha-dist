import { GoogleRecaptchaValidationResult } from '../interfaces/google-recaptcha-validation-result';
export declare class RecaptchaVerificationResult {
    readonly action: string;
    readonly score: number;
    readonly hostname: string;
    constructor(result: GoogleRecaptchaValidationResult);
}
