import { AuthModule } from "./auth/auth.module";
import { ContactModule } from "./contact/contact.module";
import { HealthModule } from "./health/health.module";
import { UserModule } from "./user/user.module";

export const Api = [AuthModule, ContactModule, HealthModule, UserModule];
