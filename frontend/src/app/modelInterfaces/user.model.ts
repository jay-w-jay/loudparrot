export interface User {
    userName: String;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    password: String;
    active: Boolean;
    admin: Boolean;
    finance: Boolean;
    superAdmin: Boolean;
    company: String;
    dateCreated: Date;
    lastLogin: Date;
    securityQuestion: String;
    securityQuestionAnswer: String;
}