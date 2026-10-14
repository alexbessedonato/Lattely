import { redirect } from "next/navigation";

export default function Home() {
  redirect("/prototype/homepage?variant=A");
}
