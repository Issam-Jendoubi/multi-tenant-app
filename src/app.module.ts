import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant-manager/entities/tenant';
import { TenantManagerModule } from './tenant-manager/tenant-manager.module';
import { TenantConsumerModule } from './tenant-consumer/tenant-consumer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb://localhost/multi-tenant-app`,
      extra: {
        authSource: 'admin',
      },
      entities: [Tenant],
      synchronize: true,
    }),
    TenantManagerModule,
    TenantConsumerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
