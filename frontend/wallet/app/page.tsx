import { fetchTools } from "@/actions/fetch-tools";
// import { ToolList } from "@/components/ToolList";
import { Wallet } from "@/components/Wallet";

export default async function Home() {
  const toolList = await fetchTools(1);
  return (
    <div className="space-y-2">
      {/* <ToolList items={toolList} /> */}
      <Wallet/>
    </div>
  )
}