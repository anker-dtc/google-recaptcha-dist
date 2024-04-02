import { ContextType } from '@nestjs/common';
export type RecaptchaResponseProvider = (req: any) => string | Promise<string>;
export type ScoreValidator = number | ((score: number) => boolean);
export type RecaptchaContextType = ContextType | 'graphql';
