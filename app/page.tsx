export default async function Home() {
  return <main>{process.env.NEXT_PUBLIC_APP_TITLE ?? "מוקד אמון"}</main>;
}
