import axios from "axios";
import {
  IGroup,
  IRequestAuthLogin,
  IRequestCreateGroup,
  IRequestCreateStruct,
  IRequestCreateTemplate,
  IRequestCreateTemplateValue,
  IRequestCreateUser,
  IRequestListTemplateValue,
  IRequestQueryGroup,
  IRequestRemoveGroup,
  IRequestRemoveStruct,
  IRequestRemoveTemplate,
  IRequestRemoveUser,
  IRequestResult,
  IRequestUpdateGroup,
  IRequestUpdateStruct,
  IRequestUpdateTemplate,
  IRequestUpdateUser,
  IResultAuthLogin,
  IResultCreateUser,
  IResultUpdateUser,
  ITemplate,
  ITemplateValue,
  IUser,
  TRole,
  TResource,
  TGroup,
  IRequestAuthVerifyEmail,
  IRequestResendVerifyEmail,
  TUserStatus,
  IRequestResetPassword,
  IRequestSetPassword,
  IRequestWeightStruct,
  IResultGetUploadUrl,
  IRequestCreatePublish,
  IPublish,
  IRequestQueryPublish,
  IRequestCancelPublish,
  TPublishStatus,
} from "./types";

export const Role: Record<string, TRole> = {
  admin: 1,
  user: 2,
  super: 3,
};

export const Group: Record<string, TGroup> = {
  list: 1,
};

export const Resource: Record<string, TResource> = {
  text: 1,
  image: 2,
  video: 3,
  rich: 4,
  number: 5,
};

export const UserStatus: Record<string, TUserStatus> = {
  active: 1,
  inactive: 2,
};

export const PublishStatus: Record<string, TPublishStatus> = {
  progress: 0,
  finished: 1,
  canceled: 2,
};

export class UniwebService {
  private url: string = "";
  private lang: string = "en";
  private authKey: string | null = null;

  constructor() {}

  private async request<T>({
    method,
    endpoint,
    data,
  }: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    endpoint: string;
    data?: any;
  }): Promise<IRequestResult<T>> {
    return axios
      .request({
        method,
        url: endpoint,
        baseURL: this.url,
        headers: {
          "Content-Type": "application/json",
          ...(this.lang && { "Accept-Language": this.lang }),
          ...(this.authKey && { Authorization: `Bearer ${this.authKey}` }),
        },
        params: method === "GET" ? data : undefined,
        data: method === "GET" ? undefined : data,
      })
      .then((res) => ({
        status: 200,
        data: res.data,
      }))
      .catch((err) => ({
        status: err.response?.status,
        errors: err.response?.data.errors,
        message: err.response?.data.message,
      }));
  }

  private setAuth = ({ key }: { key: string }) => {
    this.authKey = key;
  };

  public config = ({
    url,
    lang,
    key,
  }: {
    url?: string;
    lang?: string;
    key?: string;
  }) => {
    if (url) this.url = url;
    if (lang) this.lang = lang;
    if (key) this.authKey = key;
  };

  public auth = {
    login: async (input: IRequestAuthLogin) => {
      const result = await this.request<IResultAuthLogin>({
        method: "POST",
        endpoint: "/auth/login",
        data: input,
      });
      if (result.status === 200 && result.data)
        this.setAuth({ key: result.data?.access_token });
      return result;
    },
    verifyEmail: async (input: IRequestAuthVerifyEmail) => {
      const result = await this.request<IResultAuthLogin>({
        method: "POST",
        endpoint: "/auth/verify-email",
        data: input,
      });
      if (result.status === 200 && result.data)
        this.setAuth({ key: result.data?.access_token });
      return result;
    },
    resetPassword: (input: IRequestResetPassword) => {
      return this.request<boolean>({
        method: "POST",
        endpoint: "/auth/reset-password",
        data: input,
      });
    },
    setPassword: (input: IRequestSetPassword) => {
      return this.request<boolean>({
        method: "POST",
        endpoint: "/auth/set-password",
        data: input,
      });
    },
  };

  public manage = {
    oss: {
      upload: async (file: File) => {
        const result = await this.request<IResultGetUploadUrl>({
          method: "GET",
          endpoint: "/manage/get-upload-url",
        });
        if (result && result.data) {
          const fileKey = `${result.data.key}.${file.name.split(".").pop()}`;
          const formData = new FormData();
          formData.append("key", fileKey);
          formData.append("policy", result.data.policy);
          formData.append("OSSAccessKeyId", result.data.accessid);
          formData.append("success_action_status", "200");
          formData.append("Signature", result.data.signature);
          formData.append("file", file);
          const upload = await axios.request({
            method: "POST",
            url: result.data.host,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formData,
          });

          if (upload.status === 200) {
            return {
              status: 200,
              data: {
                host: result.data.host,
                key: fileKey,
              },
            };
          } else {
            return {
              status: upload.status,
              message: upload.statusText,
            };
          }
        } else {
          return {
            status: 500,
            message: "Internal Server Error",
          };
        }
      },
    },
    publish: {
      create: (input: IRequestCreatePublish) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/create-publish",
          data: input,
        }),
      list: () =>
        this.request<IPublish[]>({
          method: "GET",
          endpoint: "/manage/list-publish",
        }),
      get: (input: IRequestQueryPublish) =>
        this.request<IPublish>({
          method: "GET",
          endpoint: "/query/publish",
          data: input,
        }),
      cancel: (input: IRequestCancelPublish) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/cancel-publish",
          data: input,
        }),
      validate: () =>
        this.request<string>({
          method: "GET",
          endpoint: "/manage/validate-publish",
        }),
    },
    user: {
      create: (input: IRequestCreateUser) =>
        this.request<IResultCreateUser>({
          method: "POST",
          endpoint: "/manage/create-user",
          data: input,
        }),
      update: (input: IRequestUpdateUser) =>
        this.request<IResultUpdateUser>({
          method: "POST",
          endpoint: "/manage/update-user",
          data: input,
        }),
      remove: (input: IRequestRemoveUser) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/remove-user",
          data: input,
        }),
      list: () =>
        this.request<IUser[]>({
          method: "GET",
          endpoint: "/manage/list-user",
        }),
      resendEmailInvite: (input: IRequestResendVerifyEmail) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/resend-email-invite",
          data: input,
        }),
    },
    struct: {
      weight: (input: IRequestWeightStruct) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/weight-struct",
          data: input,
        }),
      create: (input: IRequestCreateStruct) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/add-struct",
          data: input,
        }),
      update: (input: IRequestUpdateStruct) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/update-struct",
          data: input,
        }),
      remove: (input: IRequestRemoveStruct) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/remove-struct",
          data: input,
        }),
    },
    template: {
      create: (input: IRequestCreateTemplate) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/create-template",
          data: input,
        }),
      update: (input: IRequestUpdateTemplate) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/update-template",
          data: input,
        }),
      remove: (input: IRequestRemoveTemplate) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/remove-template",
          data: input,
        }),
      list: () =>
        this.request<ITemplate[]>({
          method: "GET",
          endpoint: "/manage/list-template",
        }),
      listValue: (input: IRequestListTemplateValue) =>
        this.request<ITemplateValue[]>({
          method: "GET",
          endpoint: "/manage/list-template-value",
          data: input,
        }),
      createValue: (input: IRequestCreateTemplateValue) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/mutation/create-template-value",
          data: input,
        }),
    },
    group: {
      weight: (input: IRequestWeightStruct) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/mutation/weight-group",
          data: input,
        }),
      create: (input: IRequestCreateGroup) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/mutation/create-group",
          data: input,
        }),
      update: (input: IRequestUpdateGroup) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/mutation/update-group",
          data: input,
        }),
      remove: (input: IRequestRemoveGroup) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/mutation/remove-group",
          data: input,
        }),
      get: (input: IRequestQueryGroup) =>
        this.request<IGroup[]>({
          method: "GET",
          endpoint: "/manage/list-group",
          data: input,
        }),
    },
  };
}

const UniwebInstance = new UniwebService();

export { UniwebInstance };
