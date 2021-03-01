import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, createConnection, getConnection } from 'typeorm';
import { Tenant } from './entities/tenant';

export const TENANT_MANAGER = 'TENANT_MANAGER';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [
    {
      provide: TENANT_MANAGER,
      inject: [REQUEST, Connection],
      scope: Scope.REQUEST,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      useFactory: async (req, connection) => {
        const tenant: Tenant = await connection
          .getRepository(Tenant)
          .findOne({ where: { subDomain: req.subdomains[0] } });
        return getConnection(tenant.firstName);
      },
    },
  ],
  exports: [TENANT_MANAGER],
})
export class TenantManagerModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req, res, next) => {
        console.log(req.subdomains[0]);
        const tenant: Tenant = await this.connection
          .getRepository(Tenant)
          .findOne({ where: { subDomain: req.subdomains[0] } });
        console.log(tenant);

        if (!tenant) {
          throw new BadRequestException('Database Connection Error');
        }

        try {
          console.log('got connection of', tenant.firstName);
          getConnection(tenant.firstName);
          next();
        } catch (e) {
          const createdConnection = await createConnection({
            name: tenant.firstName,
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            authSource: 'admin',
            database: tenant.firstName,
            entities: [Tenant],
            synchronize: true,
          });
          console.log('connection created');

          if (createdConnection) {
            next();
          } else {
            throw new BadRequestException('Database Connection Error');
          }
        }
      })
      .forRoutes('*');
  }
}
