import axios, { AxiosPromise } from "axios";

export default class NetworkService {
    public static authenticatedPost<T = any>(
        url: string,
        body: any,
        token: string
    ) {
        return this.parseAxiosRequest<T>(
            axios.post(url, body, {
                headers: {
                    Authorization: token
                }
            })
        );
    }

    public static authenticatedDelete<T = any>(
        url: string,
        token: string
    ) {
        return this.parseAxiosRequest<T>(
            axios.delete(url, {
                headers: {
                    Authorization: token
                }
            })
        );
    }

    public static authenticatedGet<T = any>(url: string, token: string) {
        const headers = {
            headers: {
                Authorization: token
            }
        };
        return this.parseAxiosRequest<T>(axios.get(url, headers));
    }

    public static get<T = any>(url: string) {
        return this.parseAxiosRequest<T>(axios.get(url));
    }

    private static async parseAxiosRequest<T>(
        request: AxiosPromise<T>
    ): Promise<T> {
        const response = await request;
        if (!response || response.status !== 200 || !response.data) {
            throw new Error(`Bad status ${JSON.stringify(response)}`);
        } else {
            return response.data;
        }
    }
}
