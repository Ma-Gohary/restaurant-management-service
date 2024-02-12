import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from "@nestjs/terminus";
import {ApiTags} from "@nestjs/swagger";
// Health check endpoint
@ApiTags('Health Controller')
@Controller("health")
export class HealthController {
  constructor(private readonly health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return await this.health.check([]);
  }
}
