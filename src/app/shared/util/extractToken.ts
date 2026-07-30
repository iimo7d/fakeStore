export type Payload = {
  sub: number;
  user: string;
};

export const extractToken = (token: string): Payload | null => {
  try {
    const payloadBase64 = token?.split('.')[1];
    const propsayloadJson = atob(payloadBase64);
    const payload: Payload = JSON.parse(propsayloadJson);
    return payload;
  } catch {
    console.error('failed to extract token payload');
    return null;
  }
};
