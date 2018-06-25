interface ILoginResult {
  token: string;
  user: {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
  };
}

export async function login(
  username: string,
  password: string,
): Promise<ILoginResult> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password,
    }),
  });

  if (response.status >= 500) {
    throw new Error("An error occured on the server");
  }
  if (response.status === 401) {
    const text = await response.text();
    throw new Error(text);
  }
  return response.json();
}

export async function reAuthenticate(token: string) {
  const response = await fetch("/api/auth/re-auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json();
}
