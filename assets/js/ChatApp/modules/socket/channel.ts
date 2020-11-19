import {Channel} from "phoenix";

export const join: (channel: Channel) => Promise<any> = (channel) => {
  return new Promise(
    (resolve, reject) => {
      channel
        .join()
        .receive("ok", (response: any) => {
          resolve(response);
        })
        .receive("error", (response: any) => {
          reject(response)
        });
    }
  );
};