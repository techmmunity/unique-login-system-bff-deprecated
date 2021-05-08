import { EmailServiceProxyModule } from "./email-service-proxy/email-service-proxy.module";
import { UserServiceProxyModule } from "./user-service-proxy/user-service-proxy.module";

export const Injectables = [EmailServiceProxyModule, UserServiceProxyModule];
