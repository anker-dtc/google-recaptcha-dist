import { ExecutionContext } from '@nestjs/common';
import { ApplicationType } from '../enums/application-type';
export declare class RecaptchaRequestResolver {
    resolve<T = any>(context: ExecutionContext): T;
    /**
     * @deprecated
     */
    resolveByApplicationType<T = any>(context: ExecutionContext, type: ApplicationType): T;
}
