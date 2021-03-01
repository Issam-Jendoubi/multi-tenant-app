import { Inject } from '@nestjs/common';
import { Tenant } from 'src/tenant-manager/entities/tenant';
import { InjectTenant } from 'src/tenant-manager/tenant-decorator';
import { TENANT_MANAGER } from 'src/tenant-manager/tenant-manager.module';

@InjectTenant()
export class TenantConsumerService {
  constructor(@Inject(TENANT_MANAGER) private connection) {}

  async findAll(): Promise<Tenant[]> {
    console.log('current connection:', this.connection.name);
    const repository = await this.connection.getRepository(Tenant);
    return repository.find();
  }
}
