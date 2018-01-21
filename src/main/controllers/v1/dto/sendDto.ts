
export interface ISendDto {
    from: string;
    replyTo?: string;
    to: string;
    cc?: string;
    bcc?: string;
    subject?: string;
    content?: string;
}
