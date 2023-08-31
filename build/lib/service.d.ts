import { IGroup, IRequestAuthLogin, IRequestCreateGroup, IRequestCreateStruct, IRequestCreateTemplate, IRequestCreateTemplateValue, IRequestCreateUser, IRequestInitStruct, IRequestListTemplateValue, IRequestQueryGroup, IRequestRemoveGroup, IRequestRemoveStruct, IRequestRemoveTemplate, IRequestRemoveUser, IRequestResult, IRequestUpdateGroup, IRequestUpdateStruct, IRequestUpdateTemplate, IRequestUpdateUser, IResultAuthLogin, IResultCreateUser, IResultUpdateUser, ITemplate, ITemplateValue, IUser, TLang, TRole, TResource, TGroup } from "./types";
export declare const Lang: Record<string, TLang>;
export declare const Role: Record<string, TRole>;
export declare const Group: Record<string, TGroup>;
export declare const Resource: Record<string, TResource>;
export declare class UniwebService {
    private url;
    private lang;
    private authKey;
    constructor();
    private request;
    private setAuth;
    config: ({ url, lang }: {
        url?: string | undefined;
        lang?: TLang | undefined;
    }) => void;
    auth: {
        login: (input: IRequestAuthLogin) => Promise<IRequestResult<IResultAuthLogin>>;
    };
    manage: {
        user: {
            create: (input: IRequestCreateUser) => Promise<IRequestResult<IResultCreateUser>>;
            update: (input: IRequestUpdateUser) => Promise<IRequestResult<IResultUpdateUser>>;
            remove: (input: IRequestRemoveUser) => Promise<IRequestResult<boolean>>;
            list: () => Promise<IRequestResult<IUser[]>>;
        };
        struct: {
            init: (input: IRequestInitStruct) => Promise<IRequestResult<boolean>>;
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