export function makeHealthKey(
  env: "nav1" | "nav2",
  healthType: "nsk" | "api"
): string {
  return `${env}_${healthType}`;
}
