import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { EmailMSG } from '@common/constants';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
    constructor(
        private readonly _emailService: EmailService
    ) {}

    @MessagePattern(EmailMSG.CONFIRMATION)
    sendConfirmationEmail(@Payload() { email, confirmationToken }: { email: string, confirmationToken: string}) {
        return this._emailService.sendConfirmationEmail(email, confirmationToken);
    }

}
