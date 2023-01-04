export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function errorMessage(error: any) {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else {
    message = error + "";
  }
  return `Error: ${message}`;
}
