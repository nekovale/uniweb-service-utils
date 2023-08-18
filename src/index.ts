import axios from "axios";
import type {
  IGroup,
  IRequestAuthLogin,
  IRequestCreateGroup,
  IRequestCreateStruct,
  IRequestCreateTemplate,
  IRequestCreateTemplateValue,
  IRequestCreateUser,
  IRequestInitStruct,
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
  IUniwebRequest,
  IUser,
} from "./types";
import { Lang } from "./constants";

export class UniwebRequest {
  private _url: string;
  private _lang: Lang = Lang.EN;
  private _authKey: string | null = null;

  constructor({ url }: IUniwebRequest) {
    this._url = url;
  }

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
        baseURL: this._url,
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": this._lang,
          ...(this._authKey && { Authorization: `Bearer ${this._authKey}` }),
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
        message: err.response?.data.message,
      }));
  }

  private setAuth = ({ key }: { key: string }) => {
    this._authKey = key;
  };

  public setLang = (lang: Lang) => {
    this._lang = lang;
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
  };

  public manage = {
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
    },
    struct: {
      init: (input: IRequestInitStruct) =>
        this.request<boolean>({
          method: "POST",
          endpoint: "/manage/init-struct",
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
          endpoint: "/query/group",
          data: input,
        }),
    },
  };
}

export * from "./types";
