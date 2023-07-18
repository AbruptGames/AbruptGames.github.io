interface BilingualEmailTemplate {
    french: EmailTemplate;
    english: EmailTemplate;
}

interface EmailTemplate {
    subject: string;
    body: string;
}