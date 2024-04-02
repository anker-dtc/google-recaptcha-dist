import { ContextType } from '@nestjs/common';
export declare type RecaptchaResponseProvider = (req: any) => string | Promise<string>;
export declare type ScoreValidator = number | ((score: number) => boolean);
export declare type RecaptchaContextType = ContextType | 'graphql';
