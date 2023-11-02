import { IGroup, IRequestAuthLogin, IRequestCreateGroup, IRequestCreateStruct, IRequestCreateTemplate, IRequestCreateTemplateValue, IRequestCreateUser, IRequestListTemplateValue, IRequestQueryGroup, IRequestRemoveGroup, IRequestRemoveStruct, IRequestRemoveTemplate, IRequestRemoveUser, IRequestResult, IRequestUpdateGroup, IRequestUpdateStruct, IRequestUpdateTemplate, IRequestUpdateUser, IResultAuthLogin, IResultCreateUser, IResultUpdateUser, ITemplate, ITemplateValue, IUser, TRole, TResource, TGroup, IRequestAuthVerifyEmail, IRequestResendVerifyEmail, TUserStatus, IRequestResetPassword, IRequestSetPassword, IRequestWeightStruct, IRequestCreatePublish, IPublish, IRequestQueryPublish, IRequestCancelPublish, TPublishStatus } from "./types";
export declare const Role: Record<string, TRole>;
export declare const Group: Record<string, TGroup>;
export declare const Resource: Record<string, TResource>;
export declare const UserStatus: Record<string, TUserStatus>;
export declare const PublishStatus: Record<string, TPublishStatus>;
export declare class UniwebService {
    private url;
    private lang;
    private authKey;
    constructor();
    private request;
    private setAuth;
    config: ({ url, lang, key, }: {
        url?: string | undefined;
        lang?: string | undefined;
        key?: string | undefined;
    }) => void;
    auth: {
        login: (input: IRequestAuthLogin) => Promise<IRequestResult<IResultAuthLogin>>;
        verifyEmail: (input: IRequestAuthVerifyEmail) => Promise<IRequestResult<IResultAuthLogin>>;
        resetPassword: (input: IRequestResetPassword) => Promise<IRequestResult<boolean>>;
        setPassword: (input: IRequestSetPassword) => Promise<IRequestResult<boolean>>;
    };
    manage: {
        oss: {
            upload: (file: File) => Promise<{
                status: number;
                data: {
                    host: string;
                    key: string;
                };
                message?: undefined;
            } | {
                status: number;
                message: string;
                data?: undefined;
            }>;
        };
        publish: {
            create: (input: IRequestCreatePublish) => Promise<IRequestResult<boolean>>;
            list: () => Promise<IRequestResult<IPublish[]>>;
            get: (input: IRequestQueryPublish) => Promise<IRequestResult<IPublish>>;
            cancel: (input: IRequestCancelPublish) => Promise<IRequestResult<boolean>>;
            validate: () => Promise<IRequestResult<string>>;
        };
        user: {
            create: (input: IRequestCreateUser) => Promise<IRequestResult<IResultCreateUser>>;
            update: (input: IRequestUpdateUser) => Promise<IRequestResult<IResultUpdateUser>>;
            remove: (input: IRequestRemoveUser) => Promise<IRequestResult<boolean>>;
            list: () => Promise<IRequestResult<IUser[]>>;
            resendEmailInvite: (input: IRequestResendVerifyEmail) => Promise<IRequestResult<boolean>>;
        };
        struct: {
            weight: (input: IRequestWeightStruct) => Promise<IRequestResult<boolean>>;
            create: (input: IRequestCreateStruct) => Promise<IRequestResult<boolean>>;
            update: (input: IRequestUpdateStruct) => Promise<IRequestResult<boolean>>;
            remove: (input: IRequestRemoveStruct) => Promise<IRequestResult<boolean>>;
        };
        template: {
            create: (input: IRequestCreateTemplate) => Promise<IRequestResult<boolean>>;
            update: (input: IRequestUpdateTemplate) => Promise<IRequestResult<boolean>>;
            remove: (input: IRequestRemoveTemplate) => Promise<IRequestResult<boolean>>;
            list: () => Promise<IRequestResult<ITemplate[]>>;
            listValue: (input: IRequestListTemplateValue) => Promise<IRequestResult<ITemplateValue[]>>;
            createValue: (input: IRequestCreateTemplateValue) => Promise<IRequestResult<boolean>>;
        };
        group: {
            weight: (input: IRequestWeightStruct) => Promise<IRequestResult<boolean>>;
            create: (input: IRequestCreateGroup) => Promise<IRequestResult<boolean>>;
            update: (input: IRequestUpdateGroup) => Promise<IRequestResult<boolean>>;
            remove: (input: IRequestRemoveGroup) => Promise<IRequestResult<boolean>>;
            get: (input: IRequestQueryGroup) => Promise<IRequestResult<IGroup[]>>;
        };
    };
}
declare const UniwebInstance: UniwebService;
export { UniwebInstance };
//# sourceMappingURL=service.d.ts.map