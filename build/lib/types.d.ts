export type TRole = 1 | 2 | 3;
export type TGroup = 1;
export type TResource = 1 | 2 | 3 | 4;
export type TUserStatus = 1 | 2;
export interface IRequestResult<T> {
    status?: number;
    message?: string;
    data?: T;
}
export interface IRequestResultError {
    statusCode: number;
    message: string;
}
export interface IRequestAuthLogin {
    email: string;
    password: string;
    captchaVerifyParam: string;
}
export interface IResultAuthLogin {
    access_token: string;
    user: {
        id: string;
        username: string;
        email: string;
        role: TRole;
    };
    company: {
        id: string;
        name: string;
        expiredAt: string;
    };
    expires_in: number;
}
export interface IRequestAuthVerifyEmail {
    token: string;
    password: string;
}
export interface IRequestCreateUser {
    username: string;
    email: string;
}
export interface IResultCreateUser {
    id: string;
    username: string;
    email: string;
    role: TRole;
}
export interface IRequestUpdateUser {
    id: string;
    username?: string;
    email?: string;
}
export interface IResultUpdateUser {
    id: string;
    username: string;
    email: string;
    status: TUserStatus;
}
export interface IRequestRemoveUser {
    id: string;
}
export interface IRequestResendVerifyEmail {
    id: string;
}
export interface IRequestInitStruct {
    struct: string;
}
export interface IRequestCreateStruct {
    struct: string;
}
export interface IRequestUpdateStruct {
    struct: string;
}
export interface IRequestRemoveStruct {
    id: string;
}
export interface IRequestCreateTemplate {
    key: string;
    template: string;
}
export interface IRequestCreateResource {
    type: TResource;
    key: string;
    src?: string;
    content?: string;
    document?: string;
    weight?: number;
}
export interface IRequestCreateGroup {
    parentId: string;
    type: TGroup;
    weight: number;
    resource: IRequestCreateResource[];
}
export interface IRequestUpdateGroup {
    id: string;
    weight: number;
    resource: IRequestCreateResource[];
}
export interface IRequestRemoveGroup {
    id: string;
}
export interface IRequestQueryGroup {
    key?: string;
    companyId: string;
}
export interface IResource {
    id: string;
    key: string;
    type: TResource;
    src: string | null;
    content: string | null;
    document: string | null;
    weight: number;
    createdAt: string;
}
export interface IGroup {
    id: string;
    key: string | null;
    type: TGroup;
    title: string | null;
    description: string | null;
    struct: string | null;
    weight: number;
    trunk: boolean;
    resource: IResource[];
    createdAt: string;
}
export interface ITemplateValue {
    id: string;
    value: string;
    createdAt: string;
}
export interface ITemplate {
    id: string;
    key: string;
    template: string;
    createdAt: string;
}
export interface IUser {
    id: string;
    username: string;
    email: string;
    role: TRole;
    createdAt: string;
}
export interface IRequestListTemplateValue {
    key: string;
    offset: number;
    limit: number;
}
export interface IRequestCreateTemplateValue {
    key: string;
    value: string;
    companyId: string;
}
export interface IRequestUpdateTemplate {
    key: string;
    template: string;
}
export interface IRequestRemoveTemplate {
    key: string;
}
//# sourceMappingURL=types.d.ts.map