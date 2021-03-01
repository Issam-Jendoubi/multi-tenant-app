import { Module } from '@nestjs/common';
import { TenantManagerModule } from 'src/tenant-manager/tenant-manager.module';
import { TenantConsumerController } from './tenant-consumer-controller';
import { TenantConsumerService } from './tenant-consumer-service';

@Module({
    imports: [
        TenantManagerModule,
      ],
      controllers: [
        TenantConsumerController,
      ],
      providers: [
        TenantConsumerService,
      ]
})
export class TenantConsumerModule {}
