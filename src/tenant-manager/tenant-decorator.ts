import { applyDecorators, Injectable, Scope } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const InjectTenant = () =>
  applyDecorators(
    Injectable({ scope: Scope.REQUEST })
  );