import { Controller, Get } from "@nestjs/common";
import { TenantConsumerService } from "./tenant-consumer-service";

@Controller()
export class TenantConsumerController {
  constructor(private readonly tenantConsumerService: TenantConsumerService) {}

  @Get()
  async getTenant(): Promise<void> {
    const result = await this.tenantConsumerService.findAll();
    console.log("The current tenant is", result[0].firstName);
  }
}